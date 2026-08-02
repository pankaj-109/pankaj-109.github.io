"use client";

import { useEffect, useRef, useState } from "react";
import { ParticleEngine } from "@/lib/fx/particleEngine";
import { languages } from "@/lib/fx/languages";
import { useRafLoop } from "@/hooks/useRafLoop";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new ParticleEngine(canvas, languages, { count: 64 });
    engineRef.current = engine;

    if (reduceMotion) {
      engine.drawStatic();
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
    }

    setAnimating(true);
    const onVisibility = () => engine.setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useRafLoop((dt) => engineRef.current?.frame(dt), animating);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
