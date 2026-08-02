"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const HTML_SNIPPET = `<div class="wrap">
  <div class="blob"></div>
  <div class="card">
    <span class="tag">kubuntu</span>
    <h1>Simple by default, powerful when needed.</h1>
    <p>plasma · konsole · kate</p>
  </div>
</div>

<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: "Segoe UI", sans-serif;
    background: radial-gradient(circle at 20% 20%, #2b1a3d, #0a0612 70%);
    overflow: hidden;
  }
  .wrap { position: relative; }
  .blob {
    position: absolute;
    inset: -30% -20%;
    background: linear-gradient(120deg, #cd5cff, #34e2e2);
    filter: blur(60px);
    opacity: 0.45;
    animation: spin 8s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .card {
    position: relative;
    background: rgba(24, 16, 39, 0.85);
    border: 1px solid #2c1d44;
    border-radius: 16px;
    padding: 32px 40px;
    max-width: 360px;
    color: #f2e8ff;
    backdrop-filter: blur(8px);
  }
  .tag {
    display: inline-block;
    color: #cd5cff;
    font-family: monospace;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  h1 { margin-top: 10px; font-size: 22px; line-height: 1.3; }
  p { margin-top: 8px; color: #f2e8ff66; font-family: monospace; font-size: 12px; }
</style>`;

const JS_SNIPPET = `const fruits = ["plum", "grape", "kiwi"];

const shout = (s) => s.toUpperCase();
fruits.forEach((f, i) => {
  console.log(i + 1 + ": " + shout(f));
});

const totalChars = fruits.reduce((acc, f) => acc + f.length, 0);
console.log("total chars: " + totalChars);

const doubled = fruits.map((f) => f.repeat(2));
doubled.join(" | ");`;

interface JsOutput {
  value: string;
  logs: string[];
  error: string | null;
}

function formatArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.message;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

export default function Sandbox() {
  const [tab, setTab] = useState<"html" | "js">("html");
  const [htmlCode, setHtmlCode] = useState(HTML_SNIPPET);
  const [jsCode, setJsCode] = useState(JS_SNIPPET);
  const [runId, setRunId] = useState(0);
  const [output, setOutput] = useState<JsOutput | null>(null);

  function runJs() {
    const logs: string[] = [];
    const source = jsCode.replace(/console\.log/g, "__capture__");
    try {
      const fn = new Function("__capture__", source);
      const result = fn((...args: unknown[]) => {
        logs.push(args.map(formatArg).join(" "));
      });
      setOutput({
        value: result === undefined ? "(no return value)" : formatArg(result),
        logs,
        error: null,
      });
    } catch (err) {
      setOutput({
        value: "",
        logs,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return (
    <section id="sandbox" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="sandbox"
        title="Interactive Sandbox"
        description="A safe, client-side playground for tinkering with HTML/CSS and JavaScript right in the browser."
      />

      <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xl glass">
        <div className="flex items-center gap-1 border-b border-[var(--border)] bg-[var(--surface)] px-4 pt-3">
          {(
            [
              { id: "html", label: "html/css" },
              { id: "js", label: "javascript" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-t-lg px-4 py-2 font-mono text-sm transition-colors",
                tab === t.id
                  ? "border border-b-0 border-[var(--border)] bg-[var(--card)] text-[var(--primary)]"
                  : "text-[var(--fg)]/50 hover:text-[var(--fg)]"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {tab === "html" ? (
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--fg)]/40">
                  editor
                </p>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  spellCheck={false}
                  className="h-64 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-sm outline-none focus:border-[var(--primary)]"
                />
              </div>
              <button
                type="button"
                onClick={() => setRunId((n) => n + 1)}
                className="rounded-lg border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--fg)]/80 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                run
              </button>
              <iframe
                key={runId}
                title="html output"
                sandbox="allow-scripts"
                srcDoc={htmlCode}
                className="h-64 w-full rounded-lg border border-[var(--border)] bg-white"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--fg)]/40">
                  editor
                </p>
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  spellCheck={false}
                  className="h-64 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-sm outline-none focus:border-[var(--primary)]"
                />
              </div>
              <button
                type="button"
                onClick={runJs}
                className="rounded-lg border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--fg)]/80 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                run
              </button>
              <div className="rounded-lg border border-[var(--border)] bg-terminal-bg p-4 font-mono text-sm text-terminal-fg">
                <p className="mb-2 uppercase tracking-widest text-terminal-dim text-xs">
                  output
                </p>
                {output === null ? (
                  <p className="text-terminal-dim">press run to execute</p>
                ) : (
                  <div className="space-y-1">
                    {output.logs.map((log, i) => (
                      <p key={i} className="text-terminal-green">
                        {log}
                      </p>
                    ))}
                    {output.error && (
                      <p className="text-terminal-red">{output.error}</p>
                    )}
                    <p className="pt-2 text-terminal-dim">
                      → {output.value}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
