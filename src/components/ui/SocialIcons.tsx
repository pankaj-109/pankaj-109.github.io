"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

interface SocialConfig {
  label: string;
  href: string;
  external: boolean;
  glow: string;
  gradient: [string, string, string];
  floatDuration: number;
}

const socials: SocialConfig[] = [
  {
    label: "Email",
    href: `mailto:${profile.socials.email}`,
    external: false,
    glow: "rgba(34,211,238,0.55)",
    gradient: ["#164e63", "#22d3ee", "#a5f3fc"],
    floatDuration: 3.4,
  },
  {
    label: "GitHub",
    href: profile.socials.github,
    external: true,
    glow: "rgba(203,213,225,0.5)",
    gradient: ["#334155", "#94a3b8", "#f1f5f9"],
    floatDuration: 4,
  },
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
    external: true,
    glow: "rgba(10,102,194,0.6)",
    gradient: ["#003e73", "#0a66c2", "#7fc8ff"],
    floatDuration: 3.1,
  },
];

function SocialGlyph({ label }: { label: string }) {
  if (label === "Email") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a5f3fc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  if (label === "GitHub") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#e2e8f0" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export default function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 [perspective:600px] ${className ?? ""}`}>
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target={social.external ? "_blank" : undefined}
          rel={social.external ? "noreferrer" : undefined}
          aria-label={social.label}
          animate={{ y: [0, -7, 0] }}
          transition={{
            y: {
              duration: social.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.14, rotateX: 14, rotateY: -10 }}
          whileTap={{ scale: 0.94 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ boxShadow: `0 10px 24px -12px ${social.glow}` }}
        >
          <span
            className="absolute inset-0 rounded-2xl opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(145deg, ${social.gradient[0]}, ${social.gradient[1]} 55%, ${social.gradient[2]})`,
            }}
          />
          <span
            className="absolute inset-[2px] rounded-2xl transition-transform duration-300 group-hover:translate-y-[2px]"
            style={{
              background: `linear-gradient(160deg, ${social.gradient[2]}22 0%, ${social.gradient[1]} 45%, ${social.gradient[0]} 100%)`,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.35)",
            }}
          />
          <span className="relative flex h-full w-full items-center justify-center drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
            <SocialGlyph label={social.label} />
          </span>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 font-mono text-[10px] text-[var(--fg)]/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {social.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
