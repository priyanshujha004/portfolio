import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
