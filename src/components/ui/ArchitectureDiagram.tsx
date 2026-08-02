import type { ArchitectureDiagram as Diagram, DiagramNodeType } from "@/lib/data/types";

const FONT = "12px var(--font-geist-sans), ui-sans-serif, sans-serif";
const CHAR_W = 6.6;
const MAX_NODE_W = 168;
const LAYER_W = MAX_NODE_W + 44;
const NODE_H = 34;
const NODE_GAP = 14;
const TOP_PAD = 34;
const BOTTOM_PAD = 12;
const SIDE_PAD = 16;

const typeStyles: Record<DiagramNodeType, { fill: string; stroke: string; text: string }> = {
  input: { fill: "rgba(138,226,52,0.08)", stroke: "#8ae234", text: "#8ae234" },
  process: { fill: "rgba(52,226,226,0.08)", stroke: "#34e2e2", text: "#34e2e2" },
  storage: { fill: "rgba(245,121,0,0.08)", stroke: "#f57900", text: "#f57900" },
  output: { fill: "rgba(205,92,255,0.08)", stroke: "#cd5cff", text: "#cd5cff" },
};

function wrap(label: string): string[] {
  const maxChars = Math.max(10, Math.floor((MAX_NODE_W - 18) / CHAR_W));
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length <= maxChars) {
      current = (current + " " + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [label];
}

export default function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  const layerCount = diagram.layers.length;
  const heightPerLayer = diagram.layers.map(
    (layer) => layer.nodes.length * NODE_H + (layer.nodes.length - 1) * NODE_GAP
  );
  const maxLayerHeight = Math.max(...heightPerLayer, 1);
  const width = SIDE_PAD * 2 + layerCount * LAYER_W + 40 * Math.max(0, layerCount - 1);
  const height = TOP_PAD + maxLayerHeight + BOTTOM_PAD;

  return (
    <div className="scrollbar-thin overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
      <div className="mb-2 flex items-center justify-between gap-2 px-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg)]/50">
          {diagram.title}
        </p>
        <div className="flex items-center gap-3 font-mono text-[10px] text-[var(--fg)]/40">
          {(["input", "process", "storage", "output"] as DiagramNodeType[]).map((t) => (
            <span key={t} className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm" style={{ background: typeStyles[t].stroke }} />
              {t}
            </span>
          ))}
        </div>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block min-w-[420px] max-w-full"
        role="img"
        aria-label={diagram.title}
      >
        {diagram.layers.map((layer, li) => {
          const x = SIDE_PAD + li * (LAYER_W + 40);
          const labelY = TOP_PAD - 14;
          return (
            <g key={li}>
              <text x={x} y={labelY} fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill="#a78bba" letterSpacing="1">
                {layer.label.toUpperCase()}
              </text>
              {layer.nodes.map((node, ni) => {
                const lines = wrap(node.label);
                const nodeW = Math.min(MAX_NODE_W, Math.max(116, Math.max(...lines.map((l) => l.length)) * CHAR_W + 18));
                const nodeX = x + (LAYER_W - nodeW) / 2;
                const nodeY = TOP_PAD + ni * (NODE_H + NODE_GAP);
                const style = typeStyles[node.type ?? "process"];
                return (
                  <g key={node.id}>
                    <rect
                      x={nodeX}
                      y={nodeY}
                      width={nodeW}
                      height={NODE_H}
                      rx="8"
                      fill={style.fill}
                      stroke={style.stroke}
                      strokeWidth="1.2"
                    />
                    {lines.map((line, li2) => (
                      <text
                        key={li2}
                        x={nodeX + nodeW / 2}
                        y={nodeY + NODE_H / 2 + (lines.length - 1) * 6 - li2 * 12 + 4}
                        textAnchor="middle"
                        fontFamily={FONT}
                        fontSize="12"
                        fill={style.text}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}
              {li < layerCount - 1 && (
                <line
                  x1={x + LAYER_W + 4}
                  y1={TOP_PAD + maxLayerHeight / 2}
                  x2={x + LAYER_W + 36}
                  y2={TOP_PAD + maxLayerHeight / 2}
                  stroke="#5a4a75"
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrowhead)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#5a4a75" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
