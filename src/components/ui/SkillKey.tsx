"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SkillKeyProps {
  label: string;
  color: string;
  className?: string;
}

export default function SkillKey({ label, color, className }: SkillKeyProps) {
  return (
    <motion.div
      data-cursor-key
      whileHover={{ y: 4, rotateX: 10, rotateY: -8, scale: 1.02 }}
      whileTap={{ y: 6, rotateX: 16, rotateY: -10, scaleY: 0.96, scaleX: 1.03 }}
      transition={{ type: "spring", stiffness: 480, damping: 20 }}
      style={{ "--key-color": color } as CSSProperties}
      className={cn(
        "skill-key group relative select-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-mono text-sm font-medium text-[var(--fg)]/85",
        className
      )}
    >
      <span className="pointer-events-none absolute left-2.5 top-1.5 text-[9px] uppercase tracking-widest text-[var(--fg)]/30">
        {label.slice(0, 1)}
      </span>
      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 50% 100%, ${color}26, transparent 60%)`,
        }}
      />
      <span className="relative">{label}</span>
    </motion.div>
  );
}
