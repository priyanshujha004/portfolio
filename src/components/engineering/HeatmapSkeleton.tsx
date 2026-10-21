export function HeatmapSkeleton() {
  return (
    <div className="animate-pulse rounded-subtle border border-border p-6">
      <div className="mb-4 h-4 w-1/3 rounded bg-border" />
      <div className="h-32 rounded bg-border/50" />
    </div>
  );
}
