"use client";

import { useEffect, useState } from "react";

export interface StatsResponse {
  profile: { name: string; title: string; location: string };
  staticStats: { projects: number; hackathons: number; communities: number; years: number };
  github: {
    username: string;
    followers: number | null;
    publicRepos: number | null;
    stars: number | null;
  };
  generatedAt: string;
}

export function useStats() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load stats");
        return res.json();
      })
      .then((json: StatsResponse) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
