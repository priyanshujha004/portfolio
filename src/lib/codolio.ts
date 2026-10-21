import fs from "fs";
import path from "path";

interface CodolioDay {
  date: string;
  contributionCount: number;
}

export interface CodolioStats {
  weeks: { contributionDays: CodolioDay[] }[];
  problemsSolved: number;
  contestRating: number;
  longestStreak: number;
  currentStreak: number;
  acceptanceRate: number;
  lastUpdated?: string;
  isStale?: boolean;
}

const snapshotPath = path.join(process.cwd(), "src/data/codolio-snapshot.json");

function readSnapshot(): CodolioStats | null {
  try {
    const raw = fs.readFileSync(snapshotPath, "utf8");
    return { ...JSON.parse(raw), isStale: true };
  } catch {
    return null;
  }
}

export async function getCodolioStats(): Promise<CodolioStats | null> {
  const token = process.env.CODOLIO_TOKEN;
  const username = process.env.CODOLIO_USERNAME;

  if (!token || !username) return readSnapshot();

  try {
    const res = await fetch(`https://api.codolio.com/user/${username}/stats`, {
      headers: { Authorization: token },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Codolio API responded ${res.status}`);
    const json = await res.json();

    return {
      weeks: json.heatmap?.weeks ?? [],
      problemsSolved: json.totalProblemsSolved ?? 0,
      contestRating: json.contestRating ?? 0,
      longestStreak: json.longestStreak ?? 0,
      currentStreak: json.currentStreak ?? 0,
      acceptanceRate: json.acceptanceRate ?? 0,
      isStale: false,
    };
  } catch (error) {
    console.error(
      "Codolio live fetch failed, serving last known snapshot:",
      error
    );
    return readSnapshot();
  }
}
