import { cn } from "@/utils/cn";

export function MetadataLabel({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs tracking-widest uppercase text-accent",
        className
      )}
    >
      {index ? `// ${index} ` : ""}
      {label}
    </p>
  );
}
