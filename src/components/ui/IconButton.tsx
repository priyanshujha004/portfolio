import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export function IconButton({
  icon: Icon,
  href,
  label,
  external,
  className,
}: {
  icon: IconComponent;
  href: string;
  label: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-subtle border border-border text-text-muted transition-colors duration-200 hover:border-accent hover:text-accent",
        className
      )}
    >
      <Icon size={16} className="" />
    </Link>
  );
}
