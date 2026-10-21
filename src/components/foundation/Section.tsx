import { Container } from "./Container";
import { MetadataLabel } from "./MetadataLabel";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export function Section({
  index,
  label,
  className,
  children,
}: {
  index?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-24", className)}>
      <Container>
        {label && (
          <MetadataLabel index={index} label={label} className="mb-8" />
        )}
        {children}
      </Container>
    </section>
  );
}
