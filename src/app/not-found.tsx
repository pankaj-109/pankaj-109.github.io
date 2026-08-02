import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-grid flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-terminal-green">
        <span className="text-terminal-dim">~/</span>404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-[var(--fg)]">
        command not found
      </h1>
      <p className="mt-4 max-w-md font-mono text-sm text-[var(--fg)]/50">
        The route you requested doesn&apos;t exist. Try{" "}
        <span className="text-[var(--primary)]">ls</span> to see what&apos;s in
        this repo.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[var(--primary)] px-5 py-2.5 font-mono text-sm font-medium text-[#140a1f] transition-transform hover:-translate-y-0.5 hover:shadow-glow"
      >
        cd ~
      </Link>
    </div>
  );
}
