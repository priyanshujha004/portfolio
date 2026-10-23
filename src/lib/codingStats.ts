import { profile } from "@/data/profile";

export interface DailyActivity {
  date: string;
  count: number;
  platforms: {
    leetcode?: number;
    codechef?: number;
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
  };
  /** Which platforms returned live data and which failed. */
  sources: {
    leetcode: "live" | "failed";
    codechef: "live" | "failed";
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

type LeetCodeResult = {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  calendar: Record<string, number>;
};

type CodeChefResult = {
  solved: number;
  rating: number;
  calendar: Record<string, number>;
};

const REVALIDATE_SECONDS = 3600;
const FETCH_TIMEOUT_MS = 8000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function asNonNegativeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }
  return null;
}

function dateKey(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;

  // Already YYYY-MM-DD
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // CodeChef uses YYYY-M-D (no zero-padding)
  if (typeof value === "string" && /^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
    const [y, m, d] = value.split("-");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

/**
 * Normalize whatever a platform returns for its activity calendar into
 * { "YYYY-MM-DD": count } records.
 *
 * Handles:
 * - JSON-encoded strings (LeetCode `submissionCalendar`)
 * - Objects keyed by Unix timestamps in seconds (LeetCode)
 * - Arrays of { date, value } objects (CodeChef `userDailySubmissionsStats`)
 * - Plain { "YYYY-MM-DD": count } objects
 */
function normalizeCalendar(value: unknown): Record<string, number> {
  const calendar: Record<string, number> = {};

  const add = (dateValue: unknown, countValue: unknown) => {
    const key = dateKey(dateValue);
    const count = asNonNegativeNumber(countValue);
    if (!key || count === null || count === 0) return;
    calendar[key] = (calendar[key] ?? 0) + count;
  };

  // JSON string (LeetCode submissionCalendar)
  if (typeof value === "string") {
    try {
      return normalizeCalendar(JSON.parse(value));
    } catch {
      return calendar;
    }
  }

  // Array of { date, value } (CodeChef) or { date, count } etc.
  if (Array.isArray(value)) {
    for (const item of value) {
      if (!item || typeof item !== "object") continue;
      const rec = item as Record<string, unknown>;
      const dateVal = rec.date ?? rec.timestamp ?? rec.day;
      const countVal = rec.value ?? rec.count ?? rec.submissions ?? rec.total;
      if (typeof dateVal === "number" && dateVal > 1_000_000_000) {
        add(new Date(dateVal * 1000).toISOString().slice(0, 10), countVal);
      } else {
        add(dateVal, countVal);
      }
    }
    return calendar;
  }

  // Plain object — keys may be Unix timestamps (LeetCode) or date strings
  if (value && typeof value === "object") {
    for (const [key, countValue] of Object.entries(
      value as Record<string, unknown>
    )) {
      if (/^\d{10}$/.test(key)) {
        // Unix timestamp in seconds
        add(
          new Date(Number(key) * 1000).toISOString().slice(0, 10),
          countValue
        );
      } else {
        add(key, countValue);
      }
    }
  }

  return calendar;
}

function fetchWithTimeout(
  url: string,
  init: RequestInit & { next?: { revalidate: number } }
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

function getIntensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ---------------------------------------------------------------------------
// LeetCode — public GraphQL API
//
// Endpoint : https://leetcode.com/graphql
// Fields   : solved counts by difficulty, submissionCalendar (Unix ts → count)
// Range    : last ~12 months of calendar data
// ---------------------------------------------------------------------------

async function fetchLeetCode(
  username: string
): Promise<LeetCodeResult | null> {
  try {
    const response = await fetchWithTimeout("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              submissionCalendar
            }
          }
        `,
        variables: { username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const matched = json?.data?.matchedUser;
    if (!matched) return null;

    const stats = matched.submitStats?.acSubmissionNum ?? [];

    const getCount = (difficulty: string) =>
      asNonNegativeNumber(
        stats.find(
          (item: { difficulty: string; count: number }) =>
            item.difficulty === difficulty
        )?.count
      ) ?? 0;

    return {
      solved: getCount("All"),
      easy: getCount("Easy"),
      medium: getCount("Medium"),
      hard: getCount("Hard"),
      calendar: normalizeCalendar(matched.submissionCalendar),
    };
  } catch (error) {
    console.error("Failed to fetch LeetCode stats:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// CodeChef — HTML scrape of www.codechef.com/users/<username>
//
// Available data:
//   Rating   — Drupal.settings JSON → date_versus_rating.all[last].rating
//   Solved   — "Total Problems Solved: N" heading in page HTML
//   Heatmap  — userDailySubmissionsStats JS variable
//              Format : [{ date: "YYYY-M-D", value: N }, ...]
//              Range  : all recorded activity since account creation (sparse)
//
// The third-party API (codechef-api.vercel.app) is on a paid/disabled plan.
// We scrape the official page directly — no authentication required.
// ---------------------------------------------------------------------------

async function fetchCodeChef(
  username: string
): Promise<CodeChefResult | null> {
  try {
    const response = await fetchWithTimeout(
      `https://www.codechef.com/users/${encodeURIComponent(username)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (!response.ok) return null;

    const html = await response.text();

    // 1. Rating — last entry in date_versus_rating array inside Drupal.settings
    let rating = 0;
    const settingsMatch = html.match(
      /jQuery\.extend\(Drupal\.settings,\s*(\{[\s\S]*?\})\s*\);/
    );
    if (settingsMatch) {
      try {
        const settings = JSON.parse(settingsMatch[1]) as Record<
          string,
          unknown
        >;
        const allContests = (
          settings.date_versus_rating as {
            all?: { rating?: string | number }[];
          }
        )?.all;
        if (Array.isArray(allContests) && allContests.length > 0) {
          const raw = allContests[allContests.length - 1]?.rating;
          rating = asNonNegativeNumber(raw) ?? 0;
        }
      } catch {
        // Parse failure — keep rating = 0
      }
    }

    // 2. Solved count — "Total Problems Solved: N" heading
    let solved = 0;
    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
    if (solvedMatch) {
      solved = parseInt(solvedMatch[1], 10);
    }

    // 3. Heatmap — userDailySubmissionsStats JS variable
    //    Format: [{ date: "YYYY-M-D", value: N }, ...]
    let calendar: Record<string, number> = {};
    const heatmapMatch = html.match(
      /userDailySubmissionsStats\s*=\s*(\[[\s\S]*?\]);/
    );
    if (heatmapMatch) {
      try {
        const raw = JSON.parse(heatmapMatch[1]) as unknown;
        calendar = normalizeCalendar(raw);
      } catch {
        // Keep calendar empty on parse error
      }
    }

    // Treat as failed if we couldn't extract any meaningful data
    if (solved === 0 && rating === 0 && Object.keys(calendar).length === 0) {
      return null;
    }

    return { solved, rating, calendar };
  } catch (error) {
    console.error("Failed to fetch CodeChef stats:", error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Unified stats aggregation
// ---------------------------------------------------------------------------

export async function getUnifiedCodingStats(): Promise<UnifiedCodingStats> {
  const [leetcode, codechef] = await Promise.all([
    fetchLeetCode(profile.leetcodeUsername),
    fetchCodeChef(profile.codechefUsername),
  ]);

  // Build per-day merged activity map
  const dailyActivity: Record<string, DailyActivity> = {};

  const mergeCalendar = (
    calendar: Record<string, number>,
    platform: "leetcode" | "codechef"
  ) => {
    for (const [date, count] of Object.entries(calendar)) {
      if (!dailyActivity[date]) {
        dailyActivity[date] = { date, count: 0, platforms: {} };
      }
      dailyActivity[date].count += count;
      dailyActivity[date].platforms[platform] =
        (dailyActivity[date].platforms[platform] ?? 0) + count;
    }
  };

  if (leetcode) mergeCalendar(leetcode.calendar, "leetcode");
  if (codechef) mergeCalendar(codechef.calendar, "codechef");

  // Generate calendar weeks from Jan 1 2024 through the Saturday of the current week.
  // This covers all LeetCode and CodeChef data available for this profile.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // advance to Saturday

  // Start from the Sunday on or before Jan 1 2024
  const startDate = new Date(2024, 0, 1); // Jan 1 2024
  startDate.setDate(startDate.getDate() - startDate.getDay()); // rewind to Sunday

  const weeks: UnifiedCodingStats["weeks"] = [];
  let activeDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let runningStreak = 0;

  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const weekDays: UnifiedCodingStats["weeks"][number]["days"] = [];

    for (let day = 0; day < 7; day++) {
      const date = getDateString(cursor);
      const activity = dailyActivity[date];
      const count = activity?.count ?? 0;

      if (cursor <= today) {
        if (count > 0) {
          activeDays++;
          runningStreak++;
          longestStreak = Math.max(longestStreak, runningStreak);
        } else {
          runningStreak = 0;
        }
      }

      const platformParts = [
        activity?.platforms.leetcode
          ? `LeetCode: ${activity.platforms.leetcode}`
          : null,
        activity?.platforms.codechef
          ? `CodeChef: ${activity.platforms.codechef}`
          : null,
      ].filter(Boolean);

      weekDays.push({
        date,
        count,
        intensity: getIntensity(count),
        tooltip: `${date}: ${count} submission${count === 1 ? "" : "s"}${
          platformParts.length ? ` (${platformParts.join(", ")})` : ""
        }`,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push({ days: weekDays });
  }

  // Current streak — count backwards from today (or yesterday if today is inactive)
  const todayKey = getDateString(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateString(yesterday);

  const hasActivityToday = (dailyActivity[todayKey]?.count ?? 0) > 0;
  const hasActivityYesterday = (dailyActivity[yesterdayKey]?.count ?? 0) > 0;

  if (hasActivityToday || hasActivityYesterday) {
    const streakCursor = new Date(hasActivityToday ? today : yesterday);
    while ((dailyActivity[getDateString(streakCursor)]?.count ?? 0) > 0) {
      currentStreak++;
      streakCursor.setDate(streakCursor.getDate() - 1);
    }
  }

  const leetcodeSolved = leetcode?.solved ?? 0;
  const codechefSolved = codechef?.solved ?? 0;

  return {
    // totalSolved sums unique-platform counts. LeetCode and CodeChef have
    // separate problem sets so there is no double-counting between them.
    totalSolved: leetcodeSolved + codechefSolved,
    activeDays,
    longestStreak,
    currentStreak,
    platforms: {
      leetcode: {
        solved: leetcodeSolved,
        easy: leetcode?.easy ?? 0,
        medium: leetcode?.medium ?? 0,
        hard: leetcode?.hard ?? 0,
        username: profile.leetcodeUsername,
      },
      codechef: {
        solved: codechefSolved,
        rating: codechef?.rating ?? 0,
        username: profile.codechefUsername,
      },
    },
    sources: {
      leetcode: leetcode ? "live" : "failed",
      codechef: codechef ? "live" : "failed",
    },
    dailyActivity,
    weeks,
    isLive: Boolean(leetcode || codechef),
    lastUpdated: new Date().toISOString(),
  };
}