import { getCodolioStats } from "@/lib/codolio";
import { levelToColor } from "@/lib/heatmap";
import { HeatmapLegend } from "./HeatmapLegend";
import { ActivityStats } from "./ActivityStats";
import { MetadataLabel } from "@/components/foundation/MetadataLabel";

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

export async function CodolioHeatmap() {
  const stats = await getCodolioStats();

  // Only true on the very first deploy, before any snapshot has ever been committed.
  if (!stats) {
    return (
      <div className="rounded-subtle border border-border p-6">
        <MetadataLabel label="Algorithm Archive (Codolio)" className="mb-4" />
        <p className="font-mono text-xs text-text-muted">
          No data yet — run the snapshot script once to seed this.
        </p>
      </div>
    );
  }

  const activityStats = [
    { label: "Problems Solved", value: `${stats.problemsSolved}+` },
    { label: "Contest Rating", value: String(stats.contestRating) },
    { label: "Longest Streak", value: String(stats.longestStreak) },
    { label: "Acceptance Rate", value: `${stats.acceptanceRate}%` },
  ];

  return (
    <div className="rounded-subtle border border-border p-6">
      <div className="mb-1 flex items-center justify-between">
        <MetadataLabel label="Algorithm Archive (Codolio)" />
        <HeatmapLegend />
      </div>
      <p className="mb-4 font-mono text-xs text-text-muted">
        DSA problem solving consistency
      </p>
      <div className="-mx-2 flex gap-[3px] overflow-x-auto px-2 pb-2 md:mx-0 md:px-0 md:pb-0">
        {stats.weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day, j) => (
              <span
                key={j}
                className={`h-2.5 w-2.5 rounded-sm ${levelToColor(toLevel(day.contributionCount))}`}
                title={`${day.date}: ${day.contributionCount} submissions`}
              />
            ))}
          </div>
        ))}
      </div>
      <ActivityStats stats={activityStats} />
      {stats.isStale && (
        <p className="mt-3 font-mono text-[10px] text-text-muted">
          Last synced{" "}
          {stats.lastUpdated
            ? new Date(stats.lastUpdated).toLocaleDateString()
            : "recently"}
        </p>
      )}
    </div>
  );
}
