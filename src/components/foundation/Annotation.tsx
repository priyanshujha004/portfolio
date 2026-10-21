import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

// Small inline "// note" style callout, e.g. next to the hero code snippet.
export function Annotation({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] text-accent before:mr-1 before:text-text-muted before:content-['//']",
        className
      )}
    >
      {children}
    </span>
  );
}
