import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const base =
  "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide transition-colors duration-200";

const variants = {
  primary:
    "border border-accent text-accent px-4 py-2 rounded-subtle hover:bg-accent hover:text-background",
  ghost: "text-text-muted hover:text-accent",
};

export function Button({
  variant = "primary",
  href,
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
