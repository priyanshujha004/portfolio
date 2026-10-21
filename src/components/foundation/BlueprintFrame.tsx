import { cn } from "@/utils/cn";

// Subtle dotted grid used behind the hero portrait — decorative only, aria-hidden.
export function BlueprintFrame({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-subtle border border-border",
        "bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[length:16px_16px]",
        className
      )}
    />
  );
}
