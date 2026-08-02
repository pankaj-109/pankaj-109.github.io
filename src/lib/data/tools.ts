export interface Tool {
  name: string;
  accent: string;
  glow: string;
}

export const toolsRowA: Tool[] = [
  { name: "VS Code", accent: "#007ACC", glow: "#38bdf8" },
  { name: "Discord", accent: "#5865F2", glow: "#818cf8" },
  { name: "Git", accent: "#F05033", glow: "#fb7185" },
  { name: "GitHub", accent: "#e2e8f0", glow: "#cbd5e1" },
  { name: "Kubuntu", accent: "#cd5cff", glow: "#e879f9" },
  { name: "PyCharm", accent: "#8fd59e", glow: "#34d399" },
];

export const toolsRowB: Tool[] = [
  { name: "Postman", accent: "#FF6C37", glow: "#fb923c" },
  { name: "Docker", accent: "#2496ED", glow: "#38bdf8" },
  { name: "Vercel", accent: "#e2e8f0", glow: "#94a3b8" },
  { name: "Terminal", accent: "#8ae234", glow: "#a3e635" },
];
