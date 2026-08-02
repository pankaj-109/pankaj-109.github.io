import { profile } from "@/lib/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-sm text-[var(--fg)]/50 sm:flex-row">
        <p>
          <span className="text-terminal-green">✔</span> {profile.name} ©{" "}
          {year}
        </p>
        <p className="flex items-center gap-1">
          Built with <span className="text-[var(--primary)]">Next.js</span> ·
          <span className="text-terminal-orange">Tailwind</span> ·
          <span className="text-terminal-cyan">Framer Motion</span>
        </p>
        <p>
          <span className="text-terminal-purple">~/</span>kubuntu forever
        </p>
      </div>
    </footer>
  );
}
