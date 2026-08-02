"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/data/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const statusStyles: Record<Project["status"], string> = {
  production: "bg-terminal-green/15 text-terminal-green",
  hackathon: "bg-terminal-orange/15 text-terminal-orange",
  prototype: "bg-terminal-cyan/15 text-terminal-cyan",
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl scrollbar-thin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-6 pb-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl" aria-hidden="true">
                  {project.icon}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--fg)]">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-[var(--fg)]/50">
                    {project.tagline}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 font-mono text-sm text-[var(--fg)]/70 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                x
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-xs ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
                <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--fg)]/60">
                  {project.year}
                </span>
              </div>

              <div className="space-y-3">
                {project.longDescription.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-[var(--fg)]/70"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-terminal-purple">
                  highlights
                </p>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--fg)]/70"
                    >
                      <span className="mt-0.5 text-terminal-cyan">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg)]/40">
                    role
                  </p>
                  <p className="mt-1 text-sm text-[var(--fg)]">
                    {project.meta.role}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg)]/40">
                    duration
                  </p>
                  <p className="mt-1 text-sm text-[var(--fg)]">
                    {project.meta.duration}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg)]/40">
                    stack
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {project.meta.stack.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-sm text-[var(--fg)]/80 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}

              <ArchitectureDiagram diagram={project.architecture} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
