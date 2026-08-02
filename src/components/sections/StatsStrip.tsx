"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { useStats } from "@/hooks/useStats";

function formatNum(n: number | null): string {
  if (n === null) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function StatsStrip() {
  const { data, loading } = useStats();

  const items: Array<[string, string | number, string]> = data
    ? [
        ["gh://followers", formatNum(data.github.followers), "text-terminal-green"],
        ["gh://stars", formatNum(data.github.stars), "text-terminal-cyan"],
        ["projects", data.staticStats.projects, "text-terminal-purple"],
        ["hackathons", data.staticStats.hackathons, "text-terminal-orange"],
        ["communities", data.staticStats.communities, "text-terminal-yellow"],
        ["years", data.staticStats.years, "text-[var(--primary)]"],
      ]
    : [];

  return (
    <div className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <div className="flex items-center gap-2 font-mono text-sm text-[var(--fg)]/40">
            <span className="inline-block h-2 w-2 animate-pulse-slow rounded-full bg-terminal-green" />
            fetching live metrics from /api/stats ...
          </div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {items.map(([label, value, color]) => (
              <div key={label} className="text-center">
                <p className={`font-mono text-2xl font-bold ${color}`}>{value}</p>
                <p className="mt-1 font-mono text-xs text-[var(--fg)]/40">
                  <span className="text-terminal-dim">./</span>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
