import { NextResponse } from "next/server";
import { profile } from "@/lib/data/profile";
import { staticStats } from "@/lib/data/stats";
import { fetchGitHubStats } from "@/lib/api/github";

export async function GET() {
  const github = await fetchGitHubStats();

  return NextResponse.json({
    profile: {
      name: profile.name,
      title: profile.title,
      location: profile.location,
    },
    staticStats,
    github,
    generatedAt: new Date().toISOString(),
  });
}
