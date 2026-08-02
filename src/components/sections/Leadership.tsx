"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { leadership } from "@/lib/data/leadership";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="leadership"
        title="Code Astra Coding Club"
        description="As presentation lead and core team member, I turn complex ideas into sessions people follow, mentor junior members through their first pull requests, and help steer a community of 150+ builders."
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/60 backdrop-blur"
      >
        <div className="border-b border-[var(--border)] px-6 py-3">
          <p className="font-mono text-xs text-terminal-green">~/code-astra</p>
        </div>
        <div className="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-[var(--fg)]">Code Astra Coding Club</h3>
            <p className="mt-1 font-mono text-xs text-[var(--fg)]/50">
              150+ members · hackathons, contests & study groups
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-terminal-purple/40 bg-terminal-purple/10 px-3 py-1 font-mono text-xs text-terminal-purple sm:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            active
          </span>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {leadership.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)]/60 p-6 backdrop-blur transition-colors hover:border-[var(--primary)]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-bold text-[var(--fg)]">{item.role}</h3>
              <p className="font-mono text-xs text-[var(--fg)]/50">{item.period}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-[var(--primary)]">{item.club}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg)]/60">{item.description}</p>
            <ul className="mt-4 space-y-2">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 font-mono text-xs leading-relaxed text-[var(--fg)]/60"
                >
                  <span className="mt-0.5 shrink-0 text-terminal-dim">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
