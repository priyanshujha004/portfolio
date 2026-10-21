import { getGithubStats } from "@/lib/github";
import { levelToColor } from "@/lib/heatmap";
import { HeatmapLegend } from "./HeatmapLegend";
import { ActivityStats } from "./ActivityStats";
import { MetadataLabel } from "@/components/foundation/MetadataLabel";

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function GithubHeatmap() {
  const stats = await getGithubStats();

  if (!stats) {
    return (
      <div className="rounded-subtle border border-border p-6">
        <MetadataLabel label="Development Archive (GitHub)" className="mb-4" />
        <p className="font-mono text-xs text-text-muted">
          Live data unavailable — check GITHUB_TOKEN / GITHUB_USERNAME.
        </p>
      </div>
    );
  }

  const activityStats = [
    { label: "Commits", value: `${stats.totalCommitContributions}+` },
    { label: "Repositories", value: String(stats.totalRepositories) },
    {
      label: "Pull Requests",
      value: String(stats.totalPullRequestContributions),
    },
    { label: "Longest Streak", value: String(stats.longestStreak) },
  ];

  return (
    <div className="rounded-subtle border border-border p-6">
      <div className="mb-1 flex items-center justify-between">
        <MetadataLabel label="Development Archive (GitHub)" />
        <HeatmapLegend />
      </div>
      <p className="mb-4 font-mono text-xs text-text-muted">
        Code contribution consistency
      </p>
      <div className="-mx-2 flex gap-[3px] overflow-x-auto px-2 pb-2 md:mx-0 md:px-0 md:pb-0">
        {stats.weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day, j) => (
              <span
                key={j}
                className={`h-2.5 w-2.5 rounded-sm ${levelToColor(toLevel(day.contributionCount))}`}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <ActivityStats stats={activityStats} />
    </div>
  );
}
