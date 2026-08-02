"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("mx-auto max-w-2xl text-center", className)}
    >
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-terminal-purple">
        {`~/${eyebrow}`}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-[var(--fg)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--fg)]/60">{description}</p>
      )}
    </motion.div>
  );
}
