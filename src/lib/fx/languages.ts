export interface GlyphConfig {
  glyph: string;
  color: string;
  glow: string;
  weight?: number;
}

export const languages: GlyphConfig[] = [
  { glyph: "Python", color: "#4b8bbe", glow: "#ffd43b", weight: 3 },
  { glyph: "Java", color: "#f89820", glow: "#5382a1", weight: 2 },
  { glyph: "React", color: "#61dafb", glow: "#61dafb", weight: 2 },
  { glyph: "C++", color: "#659ad2", glow: "#659ad2", weight: 2 },
  { glyph: "Linux", color: "#f2e8ff", glow: "#f97316", weight: 2 },
  { glyph: "AI/ML", color: "#cd5cff", glow: "#34e2e2", weight: 3 },
];

export const skillColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  React: "#61dafb",
  "Next.js": "#e2e8f0",
  "Node.js": "#83cd29",
  Express: "#9aa0a6",
  Python: "#3776ab",
  "C++": "#659ad2",
  Java: "#f89820",
  Linux: "#f97316",
  FastAPI: "#009688",
  "Tailwind CSS": "#38bdf8",
  PostgreSQL: "#336791",
  LLMs: "#cd5cff",
  Whisper: "#4b8bbe",
  Docker: "#2496ed",
  Git: "#f05033",
  "Framer Motion": "#ff6b6b",
};

export function skillColor(name: string): string {
  return skillColors[name] ?? "#cd5cff";
}
