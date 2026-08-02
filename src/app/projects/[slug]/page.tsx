import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import Badge from "@/components/ui/Badge";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

const statusMap = {
  production: { label: "live", className: "text-terminal-green" },
  hackathon: { label: "hackathon", className: "text-terminal-cyan" },
  prototype: { label: "prototype", className: "text-terminal-orange" },
} as const;

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const status = statusMap[project.status];

  return (
    <div className="bg-grid min-h-screen pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/#projects"
          className="font-mono text-sm text-[var(--fg)]/50 transition-colors hover:text-[var(--primary)]"
        >
          <span className="text-terminal-dim">← </span>back to projects
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] text-2xl">
              {project.icon}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-[var(--fg)] sm:text-4xl">
                  {project.title}
                </h1>
                <span className={`font-mono text-xs ${status.className}`}>
                  ● {status.label}
                </span>
              </div>
              <p className="mt-1 font-mono text-sm text-[var(--fg)]/50">
                {project.tagline}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 font-mono text-sm font-medium text-[#140a1f] transition-transform hover:-translate-y-0.5 hover:shadow-glow"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </header>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-[var(--fg)]/70">
          {project.longDescription.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-terminal-purple">
            ~/architecture
          </h2>
          <div className="mt-4">
            <ArchitectureDiagram diagram={project.architecture} />
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-terminal-purple">
              ~/highlights
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--fg)]/70">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-terminal-green">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-terminal-purple">
              ~/meta
            </h2>
            <dl className="mt-4 space-y-3 font-mono text-sm">
              <div className="flex gap-2">
                <dt className="text-[var(--fg)]/40">role</dt>
                <dd className="text-[var(--fg)]/80">: {project.meta.role}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[var(--fg)]/40">duration</dt>
                <dd className="text-[var(--fg)]/80">: {project.meta.duration}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.meta.stack.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
