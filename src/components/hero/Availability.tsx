export function Availability({
  status = "Open to new opportunities",
}: {
  status?: string;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
      <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
      {status}
    </div>
  );
}
