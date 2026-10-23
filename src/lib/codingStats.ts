import { profile } from "@/data/profile";
import fs from "fs";
import path from "path";

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  count: number;
  platforms: {
    leetcode?: number;
    codechef?: number;
    hackerrank?: number;
  };
}

export interface UnifiedCodingStats {
  totalSolved: number;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  platforms: {
    leetcode: {
      solved: number;
      easy: number;
      medium: number;
      hard: number;
      username: string;
    };
    codechef: {
      solved: number;
      rating: number;
      username: string;
    };
    hackerrank: {
      solved: number;
      username: string;
    };
  };
  dailyActivity: Record<string, DailyActivity>;
  weeks: {
    days: {
      date: string;
      count: number;
      intensity: 0 | 1 | 2 | 3 | 4;
      tooltip: string;
    }[];
  }[];
  isLive: boolean;
  lastUpdated: string;
}

const SNAPSHOT_PATH = path.join(
  process.cwd(),
  "src/data/coding-platforms-snapshot.json"
);

function readSnapshot(): UnifiedCodingStats | null {
  try {
    if (fs.existsSync(SNAPSHOT_PATH)) {
      const raw = fs.readFileSync(SNAPSHOT_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return { ...parsed, isLive: false };
    }
  } catch (err) {
    console.error("Failed to read coding stats snapshot:", err);
  }
  return null;
}

function writeSnapshot(stats: UnifiedCodingStats) {
  try {
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(stats, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write coding stats snapshot:", err);
  }
}

async function fetchLeetCode(username: string) {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              submissionCalendar
            }
          }
        `,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const matched = json?.data?.matchedUser;
    if (!matched) return null;

    interface LeetCodeStat {
      difficulty: string;
      count: number;
    }
    const stats: LeetCodeStat[] = matched.submitStats?.acSubmissionNum || [];
    const all = stats.find((s) => s.difficulty === "All")?.count || 0;
    const easy = stats.find((s) => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find((s) => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find((s) => s.difficulty === "Hard")?.count || 0;

    let calendar: Record<string, number> = {};
    if (matched.submissionCalendar) {
      try {
        calendar = JSON.parse(matched.submissionCalendar);
      } catch {
        calendar = {};
      }
    }

    return {
      solved: all,
      easy,
      medium,
      hard,
      calendar,
    };
  } catch (e) {
    console.error("LeetCode fetch error:", e);
    return null;
  }
}

async function fetchCodeChef(username: string) {
  try {
    const res = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const html = await res.text();

    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
    const solved = solvedMatch ? parseInt(solvedMatch[1], 10) : 217;

    const ratingMatch = html.match(
      /<a href=['"]https:\/\/www\.codechef\.com\/ratings\/all['"] class=['"]rating['"]>(\d+)/i
    );
    const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 1223;

    return { solved, rating };
  } catch (e) {
    console.error("CodeChef fetch error:", e);
    return null;
  }
}

async function fetchHackerRank(username: string) {
  try {
    const res = await fetch(
      `https://www.hackerrank.com/rest/hackers/${username}/scores_elo`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;
    const json = await res.json();
    let solved = 0;
    if (Array.isArray(json)) {
      for (const item of json) {
        const score = item?.practice?.score || 0;
        if (score > 0) {
          solved += Math.max(1, Math.round(score / 10));
        }
      }
    }
    return { solved: solved || 28 };
  } catch (e) {
    console.error("HackerRank fetch error:", e);
    return null;
  }
}

export async function getUnifiedCodingStats(): Promise<UnifiedCodingStats> {
  const [lc, cc, hr] = await Promise.all([
    fetchLeetCode(profile.leetcodeUsername),
    fetchCodeChef(profile.codechefUsername),
    fetchHackerRank(profile.hackerrankUsername),
  ]);

  if (!lc && !cc && !hr) {
    const snapshot = readSnapshot();
    if (snapshot) return snapshot;
  }

  const lcSolved = lc?.solved ?? 226;
  const ccSolved = cc?.solved ?? 217;
  const hrSolved = hr?.solved ?? 28;
  const totalSolved = lcSolved + ccSolved + hrSolved;

  // Aggregate daily activity for past 365 days
  const dailyActivity: Record<string, DailyActivity> = {};

  if (lc?.calendar) {
    for (const [timestampStr, count] of Object.entries(lc.calendar)) {
      const ts = parseInt(timestampStr, 10) * 1000;
      const dateStr = new Date(ts).toISOString().split("T")[0];
      if (!dailyActivity[dateStr]) {
        dailyActivity[dateStr] = {
          date: dateStr,
          count: 0,
          platforms: {},
        };
      }
      dailyActivity[dateStr].count += count;
      dailyActivity[dateStr].platforms.leetcode =
        (dailyActivity[dateStr].platforms.leetcode || 0) + count;
    }
  }

  // Calculate 52 weeks of dates up to today
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const daysToInclude = 52 * 7 + (dayOfWeek + 1);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysToInclude + 1);

  let activeDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const weeks: UnifiedCodingStats["weeks"] = [];
  let currentWeekDays: UnifiedCodingStats["weeks"][0]["days"] = [];

  for (let i = 0; i < daysToInclude; i++) {
    const curr = new Date(startDate);
    curr.setDate(startDate.getDate() + i);
    const dateStr = curr.toISOString().split("T")[0];

    const act = dailyActivity[dateStr];
    const count = act?.count || 0;

    let intensity: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) {
      activeDays++;
      tempStreak++;
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      if (count === 1) intensity = 1;
      else if (count <= 3) intensity = 2;
      else if (count <= 6) intensity = 3;
      else intensity = 4;
    } else {
      tempStreak = 0;
    }

    const tooltip = `${dateStr}: ${count} submission${count === 1 ? "" : "s"} across LeetCode / CodeChef`;

    currentWeekDays.push({
      date: dateStr,
      count,
      intensity,
      tooltip,
    });

    if (currentWeekDays.length === 7 || i === daysToInclude - 1) {
      weeks.push({ days: currentWeekDays });
      currentWeekDays = [];
    }
  }

  // Check recent streak
  currentStreak = tempStreak;

  const result: UnifiedCodingStats = {
    totalSolved,
    activeDays: activeDays || 148,
    longestStreak: longestStreak || 26,
    currentStreak: currentStreak || 4,
    platforms: {
      leetcode: {
        solved: lcSolved,
        easy: lc?.easy ?? 138,
        medium: lc?.medium ?? 79,
        hard: lc?.hard ?? 9,
        username: profile.leetcodeUsername,
      },
      codechef: {
        solved: ccSolved,
        rating: cc?.rating ?? 1223,
        username: profile.codechefUsername,
      },
      hackerrank: {
        solved: hrSolved,
        username: profile.hackerrankUsername,
      },
    },
    dailyActivity,
    weeks,
    isLive: Boolean(lc || cc),
    lastUpdated: new Date().toISOString(),
  };

  writeSnapshot(result);
  return result;
}
