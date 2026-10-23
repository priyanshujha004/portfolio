"use client";

import { useState } from "react";
import type { CombinedStatsPayload } from "@/lib/dynamicStats";

interface Props {
  stats: CombinedStatsPayload;
}

export function DeveloperActivitySection({ stats }: Props) {
  const [activeTab, setActiveTab] = useState<"coding" | "github">("coding");

  const codingStats = stats.coding;
  const ghStats = stats.github;

  const months = [
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];

  return (
    <section className="py-8 border-t border-[#1F1F1F]">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Developer Activity
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-0.5">
            Real Time Heatmaps
          </p>
        </div>

        {/* Minimal Monochromatic Switcher */}
        <div className="flex items-center gap-1 bg-[#0A0A0A] border border-[#2A2A2A] p-0.5 rounded">
          <button
            type="button"
            onClick={() => setActiveTab("coding")}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${activeTab === "coding"
              ? "bg-white !text-black"
              : "text-[#A3A3A3] hover:text-white"
              }`}
          >
            Coding Platforms
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${activeTab === "github"
              ? "bg-white !text-black"
              : "text-[#A3A3A3] hover:text-white"
              }`}
          >
            GitHub Activity
          </button>
        </div>
      </div>

      {/* Heatmap Card */}
      <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-4 sm:p-5">
        {/* Month Labels */}
        <div className="grid grid-cols-12 text-[11px] text-[#A3A3A3] mb-2 font-mono text-center">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          {activeTab === "coding" ? (
            <div className="flex gap-[3px] min-w-[620px]">
              {codingStats.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px] flex-1">
                  {week.days.map((day, dIdx) => {
                    let bg = "bg-[#141414]";
                    if (day.intensity === 1) bg = "bg-[#2A2A2A]";
                    else if (day.intensity === 2) bg = "bg-[#555555]";
                    else if (day.intensity === 3) bg = "bg-[#999999]";
                    else if (day.intensity === 4) bg = "bg-[#FFFFFF]";

                    return (
                      <div
                        key={dIdx}
                        title={day.tooltip}
                        className={`aspect-square w-full rounded-[2px] ${bg} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-[3px] min-w-[620px]">
              {ghStats.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px] flex-1">
                  {week.contributionDays.map((day, dIdx) => {
                    let bg = "bg-[#141414]";
                    const c = day.contributionCount;
                    if (c === 1) bg = "bg-[#2A2A2A]";
                    else if (c <= 3) bg = "bg-[#555555]";
                    else if (c <= 6) bg = "bg-[#999999]";
                    else if (c > 6) bg = "bg-[#FFFFFF]";

                    return (
                      <div
                        key={dIdx}
                        title={`${day.date}: ${day.contributionCount} GitHub contribution${day.contributionCount === 1 ? "" : "s"
                          }`}
                        className={`aspect-square w-full rounded-[2px] ${bg} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Legend and Metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-2 border-t border-[#1F1F1F] text-xs text-[#A3A3A3]">
          {activeTab === "coding" ? (
            <div>
              <span className="text-white font-medium">
                {codingStats.totalSolved}
              </span>{" "}
              questions solved across platforms ·{" "}
              <span className="text-white font-medium">
                {codingStats.activeDays}
              </span>{" "}
              active days
            </div>
          ) : (
            <div>
              <span className="text-white font-medium">
                {ghStats.totalCommits}
              </span>{" "}
              commits in the last year ·{" "}
              <span className="text-white font-medium">
                {ghStats.publicRepos}
              </span>{" "}
              public repositories
            </div>
          )}

          {/* Monochromatic Legend */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#141414]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2A2A2A]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#555555]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#999999]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FFFFFF]" />
            <span>More</span>
          </div>
        </div>

        {/* Platform Breakdown Pills */}
        {activeTab === "coding" && (
          <div className="flex flex-wrap items-center gap-2 pt-3 mt-2 border-t border-[#1A1A1A] text-[11px] text-[#A3A3A3]">
            <span className="text-white">Platforms:</span>
            <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#222222]">
              LeetCode:{" "}
              <strong className="text-white font-medium">
                {codingStats.platforms.leetcode.solved}
              </strong>{" "}
              ({codingStats.platforms.leetcode.easy}E ·{" "}
              {codingStats.platforms.leetcode.medium}M ·{" "}
              {codingStats.platforms.leetcode.hard}H)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#222222]">
              CodeChef:{" "}
              <strong className="text-white font-medium">
                {codingStats.platforms.codechef.solved}
              </strong>{" "}
              (Rating: {codingStats.platforms.codechef.rating})
            </span>
            <span className="px-2 py-0.5 rounded bg-[#141414] border border-[#222222]">
              HackerRank:{" "}
              <strong className="text-white font-medium">
                {codingStats.platforms.hackerrank.solved}
              </strong>{" "}
              solved
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
