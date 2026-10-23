import { getGithubStats, type GithubStats } from "./github";
import { getUnifiedCodingStats, type UnifiedCodingStats } from "./codingStats";
import { profile } from "@/data/profile";

export interface CombinedStatsPayload {
  github: {
    publicRepos: number;
    totalCommits: number;
    pullRequests: number;
    longestStreak: number;
    isLive: boolean;
    weeks: GithubStats["weeks"];
  };
  coding: UnifiedCodingStats;
  profile: typeof profile;
}

export async function getCombinedStats(): Promise<CombinedStatsPayload> {
  const [gh, coding] = await Promise.all([
    getGithubStats(),
    getUnifiedCodingStats(),
  ]);

  return {
    github: {
      publicRepos: gh.totalRepositories ?? 20,
      totalCommits: gh.totalCommitContributions ?? 267,
      pullRequests: gh.totalPullRequestContributions ?? 14,
      longestStreak: gh.longestStreak ?? 18,
      isLive: Boolean(gh.isLive),
      weeks: gh.weeks,
    },
    coding,
    profile,
  };
}
