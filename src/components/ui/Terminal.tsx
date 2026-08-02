"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { experience } from "@/lib/data/experience";

type Tone = "cmd" | "out" | "ok" | "err" | "accent" | "muted";

interface Line {
  id: number;
  tone: Tone;
  content: string;
  prefix?: string;
}

const PROMPT = `${profile.shortName}@kubuntu:~$`;

const bootScript: Array<{ delay: number; line: Line }> = [
  { delay: 200, line: { id: 0, tone: "muted", content: "Booting P.A.N.K.U. kernel v3.14 ..." } },
  { delay: 900, line: { id: 1, tone: "ok", content: "[ OK ] Loaded full-stack modules" } },
  { delay: 1400, line: { id: 2, tone: "ok", content: "[ OK ] Loaded AI/ML engine" } },
  { delay: 1900, line: { id: 3, tone: "muted", content: "Starting terminal session for " + profile.name + " ..." } },
  { delay: 2600, line: { id: 4, tone: "out", content: `Welcome back, ${profile.name}. Type "help" to get started.` } },
];

function buildHelpLines(from: number): Line[] {
  const commands: Array<[string, string]> = [
    ["help", "show this list"],
    ["about", "who I am"],
    ["skills", "my stack"],
    ["projects", "featured work"],
    ["experience", "milestones & internships"],
    ["contact", "reach me"],
    ["links", "social profiles"],
    ["neofetch", "system info"],
    ["clear", "wipe the screen"],
    ["sudo ...", "nice try"],
  ];
  const header = "Available commands:";
  return [
    { id: from, tone: "accent", content: header },
    ...commands.map(([cmd, desc], i) => ({
      id: from + 1 + i,
      tone: "out" as Tone,
      content: `  ${cmd.padEnd(14)} ${desc}`,
      prefix: "▸ ",
    })),
  ];
}

function handleCommand(raw: string): Line[] {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const base = 0;

  switch (cmd.toLowerCase()) {
    case "help":
      return buildHelpLines(base);
    case "about":
      return [
        { id: base, tone: "accent", content: profile.name + " — " + profile.title },
        { id: base + 1, tone: "out", content: profile.tagline },
        { id: base + 2, tone: "muted", content: `📍 ${profile.location}   ✉ ${profile.email}` },
      ];
    case "whoami":
      return [{ id: base, tone: "ok", content: `${profile.name} :: ${profile.title}` }];
    case "skills":
      return [
        { id: base, tone: "accent", content: "Primary stack:" },
        { id: base + 1, tone: "out", content: "  React · Next.js · TypeScript · Node.js · Express · Tailwind CSS" },
        { id: base + 2, tone: "out", content: "  Python · FastAPI · LLMs · Whisper · PostgreSQL · Docker" },
      ];
    case "projects":
      return [
        { id: base, tone: "accent", content: "Featured projects (see /projects):" },
        ...projects.map((p, i) => ({
          id: base + 1 + i,
          tone: "out" as Tone,
          content: `  ${p.icon} ${p.title} — ${p.tagline}`,
          prefix: "▸ ",
        })),
      ];
    case "experience":
      return [
        { id: base, tone: "accent", content: "Milestones:" },
        ...experience.map((e, i) => ({
          id: base + 1 + i,
          tone: "out" as Tone,
          content: `  ${e.period.padEnd(12)} ${e.role} @ ${e.org}`,
          prefix: "▸ ",
        })),
      ];
    case "contact":
      return [
        { id: base, tone: "out", content: `  email   : ${profile.email}` },
        { id: base + 1, tone: "out", content: `  github  : ${profile.socials.github}` },
        { id: base + 2, tone: "out", content: `  linkedin: ${profile.socials.linkedin}` },
        { id: base + 3, tone: "muted", content: "  Tip: scroll to the contact form and say hi" },
      ];
    case "links":
      return [
        { id: base, tone: "out", content: `  github  : ${profile.socials.github}` },
        { id: base + 1, tone: "out", content: `  linkedin: ${profile.socials.linkedin}` },
        { id: base + 2, tone: "out", content: `  email   : ${profile.email}` },
      ];
    case "neofetch":
      return [
        { id: base, tone: "out", content: "        .-~~~-." },
        { id: base + 1, tone: "out", content: "   .- ~ ~-(       )_ _          " + profile.shortName + "@kubuntu" },
        { id: base + 2, tone: "out", content: "  (               _,-'          ─────────────" },
        { id: base + 3, tone: "out", content: "   ~-.___        '-'              OS: Kubuntu 24.04 LTS" },
        { id: base + 4, tone: "out", content: "        '---~~--._                Host: Full-Stack Dev Rig" },
        { id: base + 5, tone: "out", content: "                  ~-__           Kernel: v3.14-faststack" },
        { id: base + 6, tone: "out", content: "                      ~-._       Uptime: " + `${Math.floor(Math.random() * 100) + 1}h ${Math.floor(Math.random() * 60)}m` },
        { id: base + 7, tone: "out", content: "                                  Shell: panku-zsh" },
        { id: base + 8, tone: "out", content: "                                  Resolution: 3840x2160" },
        { id: base + 9, tone: "out", content: "                                  Memory: 64GiB RAM" },
      ];
    case "ls":
      return [
        { id: base, tone: "out", content: "projects/  experience/  leadership/  sandbox/  contact/" },
      ];
    case "cat":
      return [
        { id: base, tone: "out", content: `Here's my resume: ${profile.resumeUrl}` },
      ];
    case "echo":
      return [{ id: base, tone: "out", content: args.join(" ") || "" }];
    case "theme":
      return [
        { id: base, tone: "out", content: "Theme: kubuntu-dark (Plasma Aurora)" },
        { id: base + 1, tone: "muted", content: "Accent: #cd5cff · Active: ✓" },
      ];
    case "sudo":
      return [
        { id: base, tone: "err", content: `Permission denied: ${profile.shortName} is not in the sudoers file.` },
        { id: base + 1, tone: "muted", content: "(This incident will be reported to the nearest human.)" },
      ];
    case "clear":
      return [{ id: base, tone: "cmd", content: "__CLEAR__" }];
    case "":
      return [];
    default:
      return [
        { id: base, tone: "err", content: `command not found: ${cmd}` },
        { id: base + 1, tone: "muted", content: `Try "help" for a list of commands.` },
      ];
  }
}

export default function Terminal({ className }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    bootScript.forEach((step) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, step.line]);
        }, step.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (raw: string) => {
    const cleaned = raw.trim();
    const promptLine: Line = { id: idRef.current++, tone: "cmd", content: cleaned, prefix: PROMPT + " " };
    setLines((prev) => [...prev, promptLine]);

    if (cleaned) {
      setHistory((prev) => [...prev, cleaned]);
    }
    setHistIndex(-1);

    const output = handleCommand(cleaned);
    if (output.length === 1 && output[0].content === "__CLEAR__") {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        ...output.map((l) => ({ ...l, id: idRef.current++ })),
      ]);
    }
  };

  const toneClass: Record<Tone, string> = {
    cmd: "text-terminal-green",
    out: "text-terminal-fg",
    ok: "text-terminal-green",
    err: "text-terminal-red",
    accent: "text-terminal-purple",
    muted: "text-terminal-dim",
  };

  return (
    <div
      className={cn(
        "terminal-glow overflow-hidden rounded-xl border border-[var(--border)] bg-terminal-bg text-left",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-terminal-red" />
        <span className="h-3 w-3 rounded-full bg-terminal-yellow" />
        <span className="h-3 w-3 rounded-full bg-terminal-green" />
        <div className="ml-4 flex flex-1 items-center gap-2 font-mono text-xs text-terminal-dim">
          <span className="text-terminal-purple">◆</span>
          <span>{profile.shortName}@kubuntu</span>
          <span className="hidden sm:inline">— P.A.N.K.U. Terminal</span>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="scrollbar-thin h-[380px] space-y-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed sm:h-[420px]"
      >
        {lines.map((line) => (
          <div key={line.id} className="whitespace-pre-wrap break-words">
            {line.prefix && (
              <span className="text-terminal-dim">{line.prefix}</span>
            )}
            <span className={toneClass[line.tone]}>{line.content}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="whitespace-pre text-terminal-dim">{PROMPT} </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                runCommand(input);
                setInput("");
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const idx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
                if (history[idx] !== undefined) {
                  setHistIndex(idx);
                  setInput(history[idx]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const idx = histIndex + 1;
                if (idx < history.length) {
                  setHistIndex(idx);
                  setInput(history[idx]);
                } else {
                  setHistIndex(-1);
                  setInput("");
                }
              }
            }}
            className="flex-1 bg-transparent font-mono text-[13px] text-terminal-fg caret-terminal-green outline-none"
            aria-label="terminal input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
