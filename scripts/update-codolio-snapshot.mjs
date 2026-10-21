import fs from "fs";
import path from "path";

const token = process.env.CODOLIO_TOKEN;
const username = process.env.CODOLIO_USERNAME;
const outPath = path.join(process.cwd(), "src/data/codolio-snapshot.json");

if (!token || !username) {
  console.error("Missing CODOLIO_TOKEN or CODOLIO_USERNAME.");
  process.exit(1);
}

const res = await fetch(`https://api.codolio.com/user/${username}/stats`, {
  headers: { Authorization: token },
});

if (!res.ok) {
  console.error(`Codolio fetch failed with status ${res.status}. Snapshot left unchanged.`);
  process.exit(1);
}

const json = await res.json();

const snapshot = {
  weeks: json.heatmap?.weeks ?? [],
  problemsSolved: json.totalProblemsSolved ?? 0,
  contestRating: json.contestRating ?? 0,
  longestStreak: json.longestStreak ?? 0,
  currentStreak: json.currentStreak ?? 0,
  acceptanceRate: json.acceptanceRate ?? 0,
  lastUpdated: new Date().toISOString(),
};

fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
console.log("Codolio snapshot updated successfully.");