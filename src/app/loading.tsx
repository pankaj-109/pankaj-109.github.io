export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-sm text-[var(--fg)]/50">
        <span className="inline-block h-3 w-3 animate-pulse-slow rounded-full bg-terminal-purple" />
        loading ~/portfolio ...
      </div>
    </div>
  );
}
