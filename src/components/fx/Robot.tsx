"use client";

interface RobotProps {
  mode: "idle" | "overKey" | "typing";
  pressed: boolean;
}

export default function Robot({ mode, pressed }: RobotProps) {
  const overKey = mode === "overKey";
  const typing = mode === "typing";

  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="block drop-shadow-[0_0_8px_rgba(205,92,255,0.35)]"
      style={{
        transform: pressed ? "scaleY(0.82) scaleX(1.08)" : "scale(1)",
        transition: "transform 110ms ease",
      }}
    >
      <line x1="24" y1="9" x2="24" y2="17" stroke="#a78bba" strokeWidth="2" />
      <circle
        cx="24"
        cy="6"
        r="3"
        className={overKey ? "fill-terminal-purple" : "fill-terminal-green"}
        style={
          overKey
            ? { animation: "blink 0.8s step-end infinite" }
            : undefined
        }
      />
      <rect x="4" y="18" width="6" height="13" rx="2" fill="#3a2a55" />
      <rect x="38" y="18" width="6" height="13" rx="2" fill="#3a2a55" />
      <rect
        x="10"
        y="14"
        width="28"
        height="25"
        rx="8"
        fill="#241439"
        stroke="#5a4a75"
        strokeWidth="2"
      />
      <rect x="13" y="18" width="22" height="17" rx="6" fill="#1a0a28" />
      <g className="robot-eyes">
        <rect
          x="15"
          y="21"
          width="6"
          height={typing ? 5 : 9}
          rx="3"
          className={overKey ? "fill-[var(--primary)]" : "fill-terminal-cyan"}
          style={{ transition: "height 120ms ease, fill 120ms ease" }}
        />
        <rect
          x="27"
          y="21"
          width="6"
          height={typing ? 5 : 9}
          rx="3"
          className={overKey ? "fill-[var(--primary)]" : "fill-terminal-cyan"}
          style={{ transition: "height 120ms ease, fill 120ms ease" }}
        />
      </g>
      <path
        d="M20 32 h8"
        stroke={overKey ? "#cd5cff" : "#8ae234"}
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transition: "stroke 120ms ease" }}
      />
      <rect x="17" y="40" width="5" height="4" rx="1" fill="#3a2a55" />
      <rect x="26" y="40" width="5" height="4" rx="1" fill="#3a2a55" />
    </svg>
  );
}
