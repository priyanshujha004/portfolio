import fs from "fs";
import path from "path";
import { profile } from "@/data/profile";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

export interface GithubStats {
  weeks: Week[];
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalRepositories: number;
  longestStreak: number;
  currentStreak: number;
  isLive?: boolean;
}

// Accepts from/to so we can query multiple year-ranges for 2024-present data.
const GRAPHQL_QUERY = `
  query ($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

function calculateStreaks(days: ContributionDay[]) {
  let longest = 0;
  let running = 0;

  for (const day of days) {
    running = day.contributionCount > 0 ? running + 1 : 0;
    longest = Math.max(longest, running);
  }

  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) current++;
    else break;
  }

  return { longest, current };
}

function readSnapshot(): GithubStats {
  try {
    const snapshotPath = path.join(
      process.cwd(),
      "src/data/github-snapshot.json"
    );
    if (fs.existsSync(snapshotPath)) {
      const raw = fs.readFileSync(snapshotPath, "utf8");
      const json = JSON.parse(raw);
      const allDays = (json.weeks as Week[]).flatMap((w) => w.contributionDays);
      const { longest, current } = calculateStreaks(allDays);
      return {
        weeks: json.weeks,
        totalCommitContributions: json.totalCommitContributions ?? 0,
        totalPullRequestContributions: json.totalPullRequestContributions ?? 0,
        totalRepositories: json.totalRepositories ?? 0,
        longestStreak: longest,
        currentStreak: current,
        isLive: false,
      };
    }
  } catch (e) {
    console.error("Error reading github snapshot:", e);
  }

  return {
    weeks: [],
    totalCommitContributions: 0,
    totalPullRequestContributions: 0,
    totalRepositories: 0,
    longestStreak: 0,
    currentStreak: 0,
    isLive: false,
  };
}

/** Fetch a single year-range of contributions via GitHub GraphQL API. */
async function fetchContributionRange(
  token: string,
  username: string,
  from: string,
  to: string
): Promise<{
  weeks: Week[];
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalRepositories: number;
} | null> {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Priyanshu-Portfolio",
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { userName: username, from, to },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const user = json.data?.user;
    if (!user) return null;

    const collection = user.contributionsCollection;
    return {
      weeks: collection.contributionCalendar.weeks,
      totalCommitContributions: collection.totalCommitContributions,
      totalPullRequestContributions: collection.totalPullRequestContributions,
      totalRepositories: user.repositories.totalCount,
    };
  } catch {
    return null;
  }
}

export async function getGithubStats(): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || profile.githubUsername;

  // 1. If GITHUB_TOKEN exists, query yearly ranges from 2024 to present
  if (token) {
    try {
      const now = new Date();
      const currentYear = now.getFullYear();
      const ranges: { from: string; to: string }[] = [];

      for (let year = 2024; year <= currentYear; year++) {
        ranges.push({
          from: `${year}-01-01T00:00:00Z`,
          to:
            year === currentYear
              ? now.toISOString()
              : `${year}-12-31T23:59:59Z`,
        });
      }

      const results = await Promise.all(
        ranges.map((r) =>
          fetchContributionRange(token, username, r.from, r.to)
        )
      );

      // Merge results — deduplicate boundary weeks by first-day date
      const seenWeekStarts = new Set<string>();
      const mergedWeeks: Week[] = [];
      let totalCommits = 0;
      let totalPRs = 0;
      let totalRepos = 0;

      for (const result of results) {
        if (!result) continue;
        totalCommits += result.totalCommitContributions;
        totalPRs += result.totalPullRequestContributions;
        totalRepos = result.totalRepositories; // same across queries

        for (const week of result.weeks) {
          const key = week.contributionDays[0]?.date;
          if (key && !seenWeekStarts.has(key)) {
            seenWeekStarts.add(key);
            mergedWeeks.push(week);
          }
        }
      }

      // Sort chronologically
      mergedWeeks.sort((a, b) =>
        (a.contributionDays[0]?.date ?? "").localeCompare(
          b.contributionDays[0]?.date ?? ""
        )
      );

      const allDays = mergedWeeks.flatMap((w) => w.contributionDays);
      const { longest, current } = calculateStreaks(allDays);

      return {
        weeks: mergedWeeks,
        totalCommitContributions: totalCommits,
        totalPullRequestContributions: totalPRs,
        totalRepositories: totalRepos,
        longestStreak: longest,
        currentStreak: current,
        isLive: true,
      };
    } catch (error) {
      console.warn(
        "GitHub multi-year GraphQL query failed, attempting fallback:",
        error
      );
    }
  }

  // 2. Fallback — snapshot + public REST API (no auth required)
  const base = readSnapshot();
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "User-Agent": "Priyanshu-Portfolio",
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      if (typeof userData.public_repos === "number") {
        base.totalRepositories = userData.public_repos;
        base.isLive = true;
      }
    }

    // Attempt commit count search via public commit search API
    const commitSearchRes = await fetch(
      `https://api.github.com/search/commits?q=author:${username}`,
      {
        headers: {
          "User-Agent": "Priyanshu-Portfolio",
          Accept: "application/vnd.github.cloak-preview+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (commitSearchRes.ok) {
      const commitData = await commitSearchRes.json();
      if (
        typeof commitData.total_count === "number" &&
        commitData.total_count > 0
      ) {
        base.totalCommitContributions = commitData.total_count;
        base.isLive = true;
      }
    }
  } catch (err) {
    console.warn(
      "Public GitHub REST API fetch failed, serving snapshot:",
      err
    );
  }

  return base;
}
