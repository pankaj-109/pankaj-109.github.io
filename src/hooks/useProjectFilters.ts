"use client";

import { useMemo, useState } from "react";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/data/types";

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI/ML" },
  { id: "automation", label: "Automation" },
];

export function useProjectFilters() {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo<Project[]>(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return { active, setActive, filtered };
}
