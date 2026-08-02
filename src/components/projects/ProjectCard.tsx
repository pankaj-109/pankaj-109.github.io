"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/data/types";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const statusStyles = {
  production: {
    label: "live",
    className: "border-terminal-green/40 bg-terminal-green/10 text-terminal-green",
  },
  hackathon: {
    label: "hackathon",
    className: "border-terminal-cyan/40 bg-terminal-cyan/10 text-terminal-cyan",
  },
  prototype: {
    label: "prototype",
    className: "border-terminal-orange/40 bg-terminal-orange/10 text-terminal-orange",
  },
} as const;

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const status = statusStyles[project.status];
  const demo = project.links.find((l) => l.label === "Live Demo") ?? project.links[0];
  const source = project.links.find((l) => l.label.includes("Source")) ?? project.links[1];

  return (
    <motion.div
      variants={fadeUp}
      layout
      className={cn(
        "group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)]/60 p-6 backdrop-blur",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-glow-strong"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary-soft)] to-terminal-cyan/10 font-mono text-base font-bold text-[var(--primary)] ring-1 ring-[var(--border)]">
          {project.icon}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs",
            status.className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status.label}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-[var(--fg)]">{project.title}</h3>
      <p className="mt-1 font-mono text-xs text-[var(--primary)]">{project.tagline}</p>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--fg)]/60">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
          {demo && (
            <a
              href={demo.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-2 font-mono text-xs font-medium text-[#140a1f] transition-transform hover:-translate-y-0.5 hover:shadow-glow"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
          {source && (
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3.5 py-2 font-mono text-xs text-[var(--fg)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source on GitHub
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="ml-auto rounded-lg border border-[var(--border)] px-3.5 py-2 font-mono text-xs text-[var(--fg)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
