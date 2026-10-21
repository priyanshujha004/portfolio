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
}

const QUERY = `
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

export async function getGithubStats(): Promise<GithubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;
  if (!token || !username) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { userName: username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const json = await res.json();
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
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return null;
  }
}
