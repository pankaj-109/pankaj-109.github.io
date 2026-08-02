"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data/profile";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socials = [
  { label: "github", href: profile.socials.github },
  { label: "linkedin", href: profile.socials.linkedin },
  { label: "email", href: `mailto:${profile.socials.email}` },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setStatus("error");
      setError("Name is required.");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    if (trimmedMessage.length < 10) {
      setStatus("error");
      setError("Message must be at least 10 characters.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (res.status === 429) {
        setStatus("error");
        setError("Rate limit exceeded. Please wait a moment and try again.");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setError("Something went wrong on the server. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-sm outline-none focus:border-[var(--primary)]";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="contact"
        title="Say Hello"
        description="Have a project in mind, a role to fill, or just want to talk shop? Drop a message and I will get back to you."
      />

      <div className="mx-auto mt-10 max-w-2xl">
        {status === "success" ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-8 text-center glass">
            <p className="font-mono text-terminal-green">✔ Message sent</p>
            <p className="mt-2 text-sm text-[var(--fg)]/60">
              Thanks for reaching out. I will reply soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-6 glass sm:p-8"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--fg)]/50"
                >
                  name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--fg)]/50"
                >
                  email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-[var(--fg)]/50"
                >
                  message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={inputClass}
                />
              </div>
            </div>

            {status === "error" && error && (
              <p className="mt-4 rounded-lg border border-terminal-red/30 bg-terminal-red/10 px-3 py-2 font-mono text-sm text-terminal-red">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 w-full rounded-lg bg-[var(--primary)] px-5 py-3 font-mono text-sm font-medium text-[#140a1f] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "sending..." : "send message"}
            </button>
          </form>
        )}

        <div className="mt-8 grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)]/60 p-6 glass sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg)]/40">
              email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 block font-mono text-sm text-[var(--fg)]/80 transition-colors hover:text-[var(--primary)]"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg)]/40">
              location
            </p>
            <p className="mt-1 font-mono text-sm text-[var(--fg)]/80">
              {profile.location}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg)]/40">
              socials
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-sm text-[var(--fg)]/70 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
