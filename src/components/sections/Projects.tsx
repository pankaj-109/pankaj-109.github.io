"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FILTERS, useProjectFilters } from "@/hooks/useProjectFilters";
import { useProjectModal } from "@/hooks/useProjectModal";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { active, setActive, filtered } = useProjectFilters();
  const { selected, open, close } = useProjectModal();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="projects"
        title="Featured Projects"
        description="A curated set of things I have designed, built, and shipped — from AI voice agents to automated infrastructure."
      />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActive(filter.id)}
            aria-pressed={active === filter.id}
            className={cn(
              "rounded-full px-4 py-1.5 font-mono text-sm transition-colors",
              active === filter.id
                ? "bg-[var(--primary)] text-[#140a1f]"
                : "border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]/70 hover:border-[var(--primary)] hover:text-[var(--fg)]"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center font-mono text-sm text-[var(--fg)]/50">
          no projects match this filter yet
        </p>
      ) : (
        <motion.div
          layout
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={open} />
          ))}
        </motion.div>
      )}

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
