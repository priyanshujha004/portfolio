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

const GRAPHQL_QUERY = `
  query ($userName: String!) {
    user(login: $userName) {
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection {
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
        totalCommitContributions: json.totalCommitContributions ?? 267,
        totalPullRequestContributions: json.totalPullRequestContributions ?? 14,
        totalRepositories: json.totalRepositories ?? 20,
        longestStreak: longest || 18,
        currentStreak: current || 3,
        isLive: false,
      };
    }
  } catch (e) {
    console.error("Error reading github snapshot:", e);
  }

  return {
    weeks: [],
    totalCommitContributions: 267,
    totalPullRequestContributions: 14,
    totalRepositories: 20,
    longestStreak: 18,
    currentStreak: 3,
    isLive: false,
  };
}

export async function getGithubStats(): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || profile.githubUsername;

  // 1. If GITHUB_TOKEN exists, query the full GraphQL contributions API
  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Priyanshu-Portfolio",
        },
        body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { userName: username } }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data?.user) {
          const collection = json.data.user.contributionsCollection;
          const weeks: Week[] = collection.contributionCalendar.weeks;
          const allDays = weeks.flatMap((w) => w.contributionDays);
          const { longest, current } = calculateStreaks(allDays);

          return {
            weeks,
            totalCommitContributions: collection.totalCommitContributions,
            totalPullRequestContributions: collection.totalPullRequestContributions,
            totalRepositories: json.data.user.repositories.totalCount,
            longestStreak: longest,
            currentStreak: current,
            isLive: true,
          };
        }
      }
    } catch (error) {
      console.warn("GitHub GraphQL query failed, attempting public REST API fallback:", error);
    }
  }

  // 2. Fetch live public repository count and commit search from GitHub public REST API (no auth required)
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
      if (typeof commitData.total_count === "number" && commitData.total_count > 0) {
        base.totalCommitContributions = commitData.total_count;
        base.isLive = true;
      }
    }
  } catch (err) {
    console.warn("Public GitHub REST API fetch failed, serving snapshot:", err);
  }

  return base;
}
