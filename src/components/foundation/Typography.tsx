import { cn } from "@/utils/cn";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type Variant =
  | "display"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body"
  | "body-muted"
  | "mono";

const variantStyles: Record<Variant, string> = {
  display: "font-display text-5xl md:text-6xl leading-[1.1] text-text-primary",
  "heading-lg":
    "font-display text-3xl md:text-4xl leading-tight text-text-primary",
  "heading-md": "font-body font-semibold text-xl text-text-primary",
  "heading-sm": "font-body font-semibold text-base text-text-primary",
  body: "font-body text-base leading-relaxed text-text-primary",
  "body-muted": "font-body text-base leading-relaxed text-text-muted",
  mono: "font-mono text-xs tracking-wide uppercase text-text-muted",
};

interface TypographyProps<T extends ElementType> {
  as?: T;
  variant: Variant;
  className?: string;
  children: ReactNode;
}

export function Typography<T extends ElementType = "p">({
  as,
  variant,
  className,
  children,
  ...rest
}: TypographyProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component = as || "p";
  return (
    <Component className={cn(variantStyles[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
