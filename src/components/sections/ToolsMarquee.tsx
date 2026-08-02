import { toolsRowA, toolsRowB } from "@/lib/data/tools";
import type { Tool } from "@/lib/data/tools";
import ToolBadge from "@/components/ui/ToolBadge";

function fill(tools: Tool[], min = 12): Tool[] {
  const out: Tool[] = [];
  while (out.length < min) out.push(...tools);
  return out;
}

function MarqueeRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const half = fill(tools);
  const track = [...half, ...half];
  const anim = reverse
    ? "animate-[marquee-reverse_44s_linear_infinite]"
    : "animate-[marquee_38s_linear_infinite]";

  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`flex w-max gap-4 will-change-transform ${anim} hover:[animation-play-state:paused]`}>
        {track.map((tool, i) => (
          <div key={`${tool.name}-${i}`} className="hover:scale-[1.04] transition-transform duration-300">
            <ToolBadge tool={tool} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ToolsMarquee() {
  return (
    <section aria-label="Tools marquee" className="relative space-y-5 py-10">
      <p className="px-6 text-center font-mono text-xs uppercase tracking-[0.35em] text-[var(--fg)]/40">
        <span className="text-terminal-dim">~/</span>my toolbox
      </p>
      <div className="space-y-5">
        <MarqueeRow tools={toolsRowA} />
        <MarqueeRow tools={toolsRowB} reverse />
      </div>
    </section>
  );
}
