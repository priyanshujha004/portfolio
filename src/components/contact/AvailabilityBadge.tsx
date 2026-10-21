export function AvailabilityBadge({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
      <span className="font-mono text-xs text-text-muted">{children}</span>
    </div>
  );
}
