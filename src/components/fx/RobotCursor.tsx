"use client";

import { useEffect, useRef, useState } from "react";
import Robot from "./Robot";

type CursorMode = "idle" | "overKey" | "typing";

export default function RobotCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const modeRef = useRef<CursorMode>("idle");
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("idle");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wantsMotion = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    if (!finePointer || !wantsMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const el = ref.current;
    let visible = false;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const show = () => {
      visible = true;
      if (el) el.style.opacity = "1";
    };
    const hide = () => {
      visible = false;
      if (el) el.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      show();
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      if (visible) {
        x += (targetX - x) * 0.22;
        y += (targetY - y) * 0.22;
        if (el) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-20%, -20%)`;
        }
        const elAt = document.elementFromPoint(targetX, targetY) as HTMLElement | null;
        let next: CursorMode = "idle";
        if (elAt) {
          if (elAt.closest("input, textarea")) next = "typing";
          else if (elAt.closest("[data-cursor-key]")) next = "overKey";
        }
        if (next !== modeRef.current) {
          modeRef.current = next;
          setMode(next);
        }
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] opacity-0 will-change-transform"
    >
      <Robot mode={mode} pressed={pressed} />
    </div>
  );
}
