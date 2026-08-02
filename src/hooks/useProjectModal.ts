"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/data/types";

export function useProjectModal() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const open = useCallback((project: Project) => {
    setSelected(project);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
  }, []);

  return { selected, open, close };
}
