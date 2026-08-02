"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  words: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  className?: string;
}

export default function TypeWriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 35,
  holdTime = 1600,
  className,
}: TypeWriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: NodeJS.Timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>{text}</span>
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-0.5 animate-[blink_1s_step-end_infinite] bg-terminal-green" />
    </span>
  );
}
