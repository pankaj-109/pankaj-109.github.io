import type { Tool } from "@/lib/data/tools";

function ToolGlyph({ name }: { name: string }) {
  switch (name) {
    case "VS Code":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#4fc3f7" aria-hidden="true">
          <path d="M15.554 1.365 7.88 8.5 3.1 5.2a.87.87 0 0 0-1.11.05L.35 6.94a.87.87 0 0 0 0 1.28L3.9 11.5.35 14.28a.87.87 0 0 0 0 1.28l1.64 1.69a.87.87 0 0 0 1.11.05l4.78-3.3 7.674 7.135a1 1 0 0 0 1.44-.1l3.33-3.42a1 1 0 0 0 0-1.38L14.33 11.5l9.92-8.88a1 1 0 0 0 0-1.38l-3.33-3.42a1.37 1.37 0 0 0-1.376-.442z" />
        </svg>
      );
    case "Discord":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#8b9cf8" aria-hidden="true">
          <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.07.07 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
    case "Git":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#f87171" aria-hidden="true">
          <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.467 2.865l2.764 2.764a1.84 1.84 0 0 1 2.327 2.34l2.663 2.663a1.84 1.84 0 0 1 1.9.464 1.846 1.846 0 0 1-2.61 2.61 1.84 1.84 0 0 1-.47-1.905l-2.482-2.482v6.529a1.849 1.849 0 0 1 1.21 3.002 1.849 1.849 0 1 1-3.22-1.109V7.976a1.848 1.848 0 0 1-1.207-2.984L8.467 3.748.452 11.771a1.55 1.55 0 0 0 0 2.188l10.479 10.478a1.55 1.55 0 0 0 2.188 0l10.427-10.427a1.55 1.55 0 0 0 0-2.188z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#e2e8f0" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "Kubuntu":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e879f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "PyCharm":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#a7f3d0" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M7.5 8.2h3.1c1.3 0 2.2.8 2.2 2s-.9 2-2.2 2H9.4v2.4H7.5V8.2zm1.9 1.6v1.2h1c.5 0 .9-.2.9-.6s-.4-.6-.9-.6h-1zM14 13.9h3v1h-3z" fill="#120a1f" />
        </svg>
      );
    case "Postman":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#ff8a4d" aria-hidden="true">
          <path d="M16.6 1.2 8 10l3.4 3.3L3 20.6l3.4 3.3 8.4-8.4 3.8-3.7a3.2 3.2 0 0 0-2-10.6z" />
          <circle cx="16.9" cy="7.2" r="1.6" fill="#120a1f" />
        </svg>
      );
    case "Docker":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#38bdf8" aria-hidden="true">
          <path d="M1 14h1.7v1.6H1V14zm3.1 0h1.7v1.6H4.1V14zm3.1 0H9v1.6H7.2V14zm3.1 0h1.7v1.6h-1.7V14zm3.2 0H16v1.6h-2.5V14zm3.2 0h1.6c.3-1.9-1.6-3-1.6-3s-1.7 1.1-1.1 3h1.1zm2-1.4c.4-.5 1.4-1.1 1.4-1.1s-.4-1.4-1.6-2c0 0-1.3 1.3-.8 2.4.3.4.7.6 1 .7zM0 16.2C0 19.8 2.2 21 4.4 21c3.5 0 4.6-2 8.6-2 3.9 0 4.6 2 8.6 2 1.1 0 2.4-.2 2.4-1.4v-.4H0v-.8z" />
        </svg>
      );
    case "Vercel":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#e2e8f0" aria-hidden="true">
          <path d="M12 2 22 21H2L12 2z" />
        </svg>
      );
    case "Terminal":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    default:
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a78bba" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />
        </svg>
      );
  }
}

export default function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div
      className="group/tool relative flex w-[180px] shrink-0 select-none flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-4 backdrop-blur-md transition-colors duration-300"
      style={
        {
          "--tool-accent": tool.accent,
          "--tool-glow": tool.glow,
          borderColor: "color-mix(in srgb, var(--tool-accent) 30%, transparent)",
          background:
            "linear-gradient(150deg, color-mix(in srgb, var(--tool-accent) 16%, rgba(24,16,39,0.7)) 0%, rgba(24,16,39,0.85) 55%, color-mix(in srgb, var(--tool-accent) 10%, rgba(24,16,39,0.8)) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 26px -16px rgba(0,0,0,0.8)",
        } as React.CSSProperties
      }
    >
      <span
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, var(--tool-glow), transparent)`,
        }}
      />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-black/30 transition-shadow duration-300 group-hover/tool:shadow-[0_0_18px_-2px_var(--tool-glow)]">
        <ToolGlyph name={tool.name} />
      </span>
      <span className="font-mono text-xs font-medium text-[var(--fg)]/80">
        {tool.name}
      </span>
    </div>
  );
}
