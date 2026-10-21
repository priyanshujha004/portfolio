import { levelToColor } from "@/lib/heatmap";

export function HeatmapLegend() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((level) => (
        <span
          key={level}
          className={`h-2.5 w-2.5 rounded-sm ${levelToColor(level as 0 | 1 | 2 | 3 | 4)}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}
