import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const submissions = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissions.get(ip);

  if (!entry) {
    submissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (now >= entry.resetAt) {
    submissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function pruneExpired(): void {
  const now = Date.now();
  submissions.forEach((entry, ip) => {
    if (now >= entry.resetAt) {
      submissions.delete(ip);
    }
  });
}

interface ResendPayload {
  from: string;
  to: string;
  subject: string;
  text: string;
}

async function sendEmail(payload: ResendPayload): Promise<void> {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
  }
}

export async function POST(request: NextRequest) {
  pruneExpired();

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages. Try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Validation failed", errors: null },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO) {
    await sendEmail({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
  } else {
    console.info("Contact email not sent: RESEND_API_KEY or CONTACT_TO not configured.");
  }

  return NextResponse.json({
    ok: true,
    message: "Message sent. Thanks for reaching out!",
  });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed" },
    { status: 405 }
  );
}
