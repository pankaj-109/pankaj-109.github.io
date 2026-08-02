"use client";

import { motion } from "framer-motion";
import Terminal from "@/components/ui/Terminal";
import TypeWriter from "@/components/ui/TypeWriter";
import ProfileImage from "@/components/ui/ProfileImage";
import SocialIcons from "@/components/ui/SocialIcons";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { profile } from "@/lib/data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--primary)] opacity-[0.13] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[420px] rounded-full bg-terminal-cyan opacity-[0.07] blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <ProfileImage />

          <p className="mt-8 font-mono text-sm text-terminal-green">
            <span className="text-terminal-dim">~/</span>whoami
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-[var(--fg)] sm:text-5xl">
            {profile.name.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-terminal-purple to-terminal-cyan bg-clip-text text-transparent">
              {profile.name.split(" ")[1]}
            </span>
          </h1>
          <div className="mt-4 font-mono text-xl text-[var(--fg)]/80 sm:text-2xl">
            <TypeWriter words={profile.roles} />
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg)]/60">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#projects"
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 font-mono text-sm font-medium text-[#140a1f] transition-transform hover:-translate-y-0.5 hover:shadow-glow"
            >
              view projects
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 font-mono text-sm text-[var(--fg)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              get in touch
            </a>
          </div>

          <div className="mt-8">
            <SocialIcons />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" viewport={viewportOnce}>
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
