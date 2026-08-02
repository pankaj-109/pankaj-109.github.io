"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data/experience";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const dotColors = {
  work: "bg-terminal-green",
  hackathon: "bg-terminal-cyan",
  ambassador: "bg-terminal-purple",
} as const;

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="experience"
        title="Milestones & Experience"
        description="The roles, competitions, and internships that shaped how I build — from campus ambassador work to hackathon sprints and production software."
      />

      <div className="relative mt-16 ml-2 border-l-2 border-[var(--border)] pl-8">
        {experience.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative pb-10 last:pb-0"
          >
            <span
              className={cn(
                "absolute top-1.5 -left-10 h-3 w-3 rounded-full ring-4 ring-[var(--background)]",
                dotColors[item.type]
              )}
            />
            <p className="font-mono text-xs text-[var(--fg)]/50">{item.period}</p>
            <h3 className="mt-1 text-base font-bold text-[var(--fg)]">
              {item.role}
              <span className="ml-2 text-[var(--primary)]">{item.org}</span>
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--fg)]/60">
              {item.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--border)] bg-[var(--primary-soft)] px-2 py-0.5 font-mono text-[10px] text-[var(--primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
