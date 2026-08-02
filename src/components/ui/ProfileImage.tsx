"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function ProfileImage({
  src = "/profile.jpg",
  alt = "Pankaj Kumar",
  className,
}: ProfileImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div className="absolute -inset-5 animate-pulse-slow rounded-full bg-cyan-500/25 blur-2xl" />
      <div className="group relative h-40 w-40 sm:h-48 sm:w-48">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-purple-500 opacity-80 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_45px_-6px_rgba(34,211,238,0.8)]" />
        <div className="relative h-full w-full rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-purple-500 p-[3px] transition-transform duration-300 group-hover:scale-[1.06]">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[var(--card)]">
            {failed ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/25 to-purple-600/25 font-mono text-3xl font-bold tracking-widest text-cyan-300">
                PK
              </div>
            ) : (
              <Image
                src={src}
                alt={alt}
                width={192}
                height={192}
                priority
                onError={() => setFailed(true)}
                className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
