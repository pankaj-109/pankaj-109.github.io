export type DiagramNodeType = "input" | "process" | "storage" | "output";

export interface DiagramNode {
  id: string;
  label: string;
  type?: DiagramNodeType;
}

export interface DiagramLayer {
  label: string;
  nodes: DiagramNode[];
}

export interface ArchitectureDiagram {
  title: string;
  layers: DiagramLayer[];
}

export type ProjectCategory = "ai" | "fullstack" | "automation";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  title: string;
  tagline: string;
  description: string;
  longDescription: string[];
  icon: string;
  tags: string[];
  year: string;
  status: "production" | "hackathon" | "prototype";
  links: ProjectLink[];
  highlights: string[];
  architecture: ArchitectureDiagram;
  meta: {
    role: string;
    duration: string;
    stack: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  type: "work" | "hackathon" | "ambassador";
  period: string;
  description: string;
  tags: string[];
}

export interface LeadershipItem {
  id: string;
  role: string;
  club: string;
  period: string;
  description: string;
  points: string[];
}

export interface ProfileStats {
  projects: number;
  hackathons: number;
  communities: number;
  years: number;
}
