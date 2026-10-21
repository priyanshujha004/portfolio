import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export function Grid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-12 gap-6", className)}>{children}</div>
  );
}
