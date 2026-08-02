import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--primary-soft)] px-2.5 py-1 font-mono text-xs text-[var(--primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
