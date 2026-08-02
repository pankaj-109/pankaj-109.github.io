import type { Project } from "./types";

export const githubUrl = "https://github.com/pankaj-109";

export const projects: Project[] = [
  {
    slug: "panku-voice-agent",
    title: "P.A.N.K.U. Voice Agent",
    tagline: "Custom AI Voice Assistant & System Control",
    description:
      "A hands-free voice agent that understands natural speech, controls your system, and speaks back — built on speech-to-text, an LLM reasoning core, and text-to-speech synthesis.",
    longDescription: [
      "P.A.N.K.U. is a hands-free conversational assistant designed to feel like a natural teammate. It captures audio, transcribes it in real time, feeds the transcript through a large-language-model reasoning core with function-calling, executes system-control actions, and replies with synthesized speech.",
      "The architecture is built around an event-driven audio pipeline so latency stays low: wake-word detection gates the recording loop, streaming transcription feeds the LLM, and tool calls are validated before execution. Everything runs locally-first, with a thin cloud API layer for heavy inference.",
    ],
    icon: "PA",
    category: "ai",
    tags: ["Python", "Whisper", "LLM", "System Control", "TTS"],
    year: "2025",
    status: "production",
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Source", href: githubUrl },
    ],
    highlights: [
      "Sub-second wake-word to response on mid-range hardware",
      "Typed tool-calling schema for safe system-control actions",
      "Pluggable TTS engine with voice selection",
    ],
    architecture: {
      title: "Real-time voice agent pipeline",
      layers: [
        {
          label: "Input Layer",
          nodes: [
            { id: "mic", label: "Mic / Audio Stream", type: "input" },
            { id: "wake", label: "Wake-Word Engine", type: "input" },
          ],
        },
        {
          label: "Transcription",
          nodes: [{ id: "stt", label: "Whisper STT", type: "process" }],
        },
        {
          label: "Reasoning Core",
          nodes: [
            { id: "llm", label: "LLM Orchestrator", type: "process" },
            { id: "tools", label: "System Tool Registry", type: "process" },
            { id: "mem", label: "Conversation Memory", type: "storage" },
          ],
        },
        {
          label: "Output Layer",
          nodes: [
            { id: "tts", label: "TTS Engine", type: "output" },
            { id: "speaker", label: "Speaker Output", type: "output" },
          ],
        },
      ],
    },
    meta: {
      role: "Creator & Lead Developer",
      duration: "Ongoing",
      stack: ["Python", "Whisper", "LLM", "System Control", "TTS"],
    },
  },
  {
    slug: "ai-career-buddy",
    title: "AI Career Buddy",
    tagline: "AI Career Guidance & Resume Evaluator",
    description:
      "An AI copilot that guides students from resume review to interview prep — generating role-specific roadmaps, evaluating resumes, and running mock interviews.",
    longDescription: [
      "AI Career Buddy turns generic career advice into a tailored experience. Users pick a target role and current skill level, and the app evaluates their resume, flags gaps, generates a step-by-step roadmap, and runs interactive mock interviews with instant feedback.",
      "The frontend is a React dashboard; the backend orchestrates multi-step LLM calls with structured outputs so results are consistent and easy to render. Conversation context is stored per session, letting the buddy remember earlier coaching conversations.",
    ],
    icon: "CB",
    category: "ai",
    tags: ["React", "Next.js", "LLM", "Resume Parser", "Tailwind CSS"],
    year: "2024",
    status: "hackathon",
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Source", href: githubUrl },
    ],
    highlights: [
      "Role-specific roadmap generator with resume skill-gap analysis",
      "Automated resume evaluation with structured feedback",
      "Interactive mock interviews with instant scoring",
    ],
    architecture: {
      title: "Coaching copilot data flow",
      layers: [
        {
          label: "Client",
          nodes: [
            { id: "ui", label: "React Dashboard", type: "input" },
            { id: "form", label: "Resume / Goal Upload", type: "input" },
          ],
        },
        {
          label: "API",
          nodes: [{ id: "api", label: "Next.js API Routes", type: "process" }],
        },
        {
          label: "Intelligence",
          nodes: [
            { id: "llm", label: "LLM Orchestration", type: "process" },
            { id: "prompt", label: "Prompt Registry", type: "storage" },
          ],
        },
        {
          label: "Persistence",
          nodes: [
            { id: "db", label: "Session Store", type: "storage" },
            { id: "out", label: "Roadmap / Feedback", type: "output" },
          ],
        },
      ],
    },
    meta: {
      role: "Full-Stack Developer",
      duration: "48 hours (hackathon)",
      stack: ["Next.js", "React", "TypeScript", "LLM", "Tailwind CSS"],
    },
  },
  {
    slug: "gate-pass-system",
    title: "Automated Gate Pass System",
    tagline: "Computer Vision Local Gate Pass Scanner",
    description:
      "A digitized campus gate-pass workflow powered by computer vision — students request passes, wardens approve in-app, and a local CV scanner validates QR codes at the gate.",
    longDescription: [
      "The gate pass system replaces paper slips with an automated, vision-assisted approval chain. Students submit leave requests with details and duration; the request routes to the right approver based on rules; an approved pass materializes as a time-boxed, tamper-evident QR code.",
      "At the gate, a local computer-vision scanner detects and decodes the pass in real time, cross-checks expiry and identity, and logs the entry. Status changes propagate in real time so students, wardens, and security always see the same truth.",
    ],
    icon: "GP",
    category: "automation",
    tags: ["Computer Vision", "React", "Node.js", "PostgreSQL", "QR Code"],
    year: "2024",
    status: "prototype",
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Source", href: githubUrl },
    ],
    highlights: [
      "Local CV scanner decodes and validates passes at the gate",
      "Role-based approval workflow (student → warden → security)",
      "Time-boxed QR passes with expiry and identity checks",
    ],
    architecture: {
      title: "Vision-assisted approval system",
      layers: [
        {
          label: "Clients",
          nodes: [
            { id: "student", label: "Student Portal", type: "input" },
            { id: "warden", label: "Warden Console", type: "input" },
            { id: "security", label: "CV Gate Scanner", type: "input" },
          ],
        },
        {
          label: "API",
          nodes: [
            { id: "api", label: "Node.js REST API", type: "process" },
            { id: "auth", label: "Auth & Roles", type: "process" },
          ],
        },
        {
          label: "Vision",
          nodes: [
            { id: "cv", label: "OpenCV Detection", type: "process" },
            { id: "qr", label: "QR Decode + Verify", type: "process" },
          ],
        },
        {
          label: "Data",
          nodes: [
            { id: "db", label: "PostgreSQL", type: "storage" },
            { id: "ws", label: "Realtime Events", type: "output" },
          ],
        },
      ],
    },
    meta: {
      role: "Full-Stack Developer",
      duration: "2 months",
      stack: ["Python", "OpenCV", "React", "Node.js", "PostgreSQL"],
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
