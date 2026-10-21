import { cn } from "@/utils/cn";

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={!!active}
      className={cn(
        "rounded-subtle border px-3 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors duration-200",
        active
          ? "border-accent text-accent"
          : "border-border text-text-muted hover:border-accent hover:text-accent"
      )}
    >
      {children}
    </button>
  );
}
