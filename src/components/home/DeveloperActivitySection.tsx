"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { CombinedStatsPayload } from "@/lib/dynamicStats";

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const HEATMAP_START_DATE = "2024-12-01";

interface MonthMark {
  weekIndex: number;
  label: string;
  span: number;
}

function getMonthMarks(firstDates: string[]): MonthMark[] {
  const marks: MonthMark[] = [];
  let previousMonth = -1;

  for (let i = 0; i < firstDates.length; i++) {
    const dateString = firstDates[i];
    if (!dateString) continue;

    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) continue;

    const month = date.getMonth();

    if (month !== previousMonth) {
      if (marks.length > 0) {
        const previousMark = marks[marks.length - 1];
        previousMark.span = i - previousMark.weekIndex;
      }

      marks.push({
        weekIndex: i,
        label: MONTH_ABBR[month],
        span: 1,
      });

      previousMonth = month;
    }
  }

  if (marks.length > 0) {
    const lastMark = marks[marks.length - 1];
    lastMark.span = firstDates.length - lastMark.weekIndex;
  }

  return marks;
}


/**
 * Avoid displaying adjacent month labels too close together.
 * This is particularly helpful at December–January boundaries.
 */
function shouldShowMonthLabel(
  marks: MonthMark[],
  index: number
): boolean {
  const current = marks[index];
  const next = marks[index + 1];

  if (!current) return false;
  if (!next) return true;

  return next.weekIndex - current.weekIndex >= 4;
}

interface Props {
  stats: CombinedStatsPayload;
}

export function DeveloperActivitySection({ stats }: Props) {
  const [activeTab, setActiveTab] = useState<"coding" | "github">("coding");
  const scrollRef = useRef<HTMLDivElement>(null);

  const codingStats = stats.coding;
  const ghStats = stats.github;

  const codingWeeks = useMemo(
    () =>
      codingStats.weeks
        .map((week) => ({
          ...week,
          days: week.days.filter(
            (day) => day.date >= HEATMAP_START_DATE
          ),
        }))
        .filter((week) => week.days.length > 0),
    [codingStats.weeks]
  );

  const githubWeeks = useMemo(
    () =>
      ghStats.weeks
        .map((week) => ({
          ...week,
          contributionDays: week.contributionDays.filter(
            (day) => day.date >= HEATMAP_START_DATE
          ),
        }))
        .filter((week) => week.contributionDays.length > 0),
    [ghStats.weeks]
  );

  const codingMonths = useMemo(
    () =>
      getMonthMarks(
        codingWeeks.map((week) => week.days[0]?.date ?? "")
      ),
    [codingWeeks]
  );

  const githubMonths = useMemo(
    () =>
      getMonthMarks(
        githubWeeks.map(
          (week) => week.contributionDays[0]?.date ?? ""
        )
      ),
    [githubWeeks]
  );


  const activeMonths =
    activeTab === "coding" ? codingMonths : githubMonths;

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollLeft = element.scrollWidth;
    }
  }, [activeTab]);

  const failedSources = codingStats.sources
    ? (
      Object.entries(codingStats.sources) as [
        string,
        "live" | "failed",
      ][]
    )
      .filter(([, status]) => status === "failed")
      .map(([name]) => name)
    : [];

  return (
    <section className="border-t border-[#1F1F1F] py-8">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Developer Activity
          </h2>

          <p className="mt-0.5 text-xs text-[#A3A3A3]">
            {codingStats.isLive ? "Live" : "Cached"} Heatmaps

            {failedSources.length > 0 && (
              <span className="ml-2 text-yellow-600/80">
                · {failedSources.join(", ")} unavailable
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded border border-[#2A2A2A] bg-[#0A0A0A] p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("coding")}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${activeTab === "coding"
              ? "bg-white !text-black"
              : "text-[#A3A3A3] hover:text-white"
              }`}
          >
            Coding Platforms
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("github")}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${activeTab === "github"
              ? "bg-white !text-black"
              : "text-[#A3A3A3] hover:text-white"
              }`}
          >
            GitHub Activity
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] p-4 sm:p-5">
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-[2px]">
            {activeTab === "coding"
              ? codingWeeks.map((week, weekIndex) => {
                const markIndex = activeMonths.findIndex(
                  (month) => month.weekIndex === weekIndex
                );
                const mark =
                  markIndex >= 0 ? activeMonths[markIndex] : undefined;

                return (
                  <div
                    key={weekIndex}
                    className="flex shrink-0 flex-col"
                    style={{
                      width: "9px",
                      marginLeft: mark && weekIndex > 0 ? "3px" : "0px",
                    }}
                  >
                    <div className="relative mb-1 h-3.5">
                      {mark && (
                        <span
                          className="absolute top-0 whitespace-nowrap font-mono text-[10px] leading-none text-[#A3A3A3]"
                          style={{
                            left: `${(mark.span * 11 - 2) / 2}px`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          {mark.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      {week.days.filter((day) => {
                        const today = new Date();
                        const currentDate = new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          today.getDate()
                        );
                        const dayDate = new Date(`${day.date}T00:00:00`);
                        return dayDate <= currentDate;
                      }).map((day, dayIndex) => {
                        let background = "bg-[#161B22]";

                        if (day.intensity === 1) {
                          background = "bg-[#0E4429]";
                        } else if (day.intensity === 2) {
                          background = "bg-[#006D32]";
                        } else if (day.intensity === 3) {
                          background = "bg-[#26A641]";
                        } else if (day.intensity === 4) {
                          background = "bg-[#39D353]";
                        }

                        return (
                          <div
                            key={dayIndex}
                            title={day.tooltip}
                            className={`cursor-pointer rounded-[2px] transition-all hover:ring-1 hover:ring-white ${background}`}
                            style={{ width: "9px", height: "9px" }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })
              : githubWeeks.map((week, weekIndex) => {
                const markIndex = activeMonths.findIndex(
                  (month) => month.weekIndex === weekIndex
                );
                const mark =
                  markIndex >= 0 ? activeMonths[markIndex] : undefined;

                return (
                  <div
                    key={weekIndex}
                    className="flex shrink-0 flex-col"
                    style={{
                      width: "9px",
                      marginLeft: mark && weekIndex > 0 ? "3px" : "0px",
                    }}
                  >
                    <div className="relative mb-1 h-3.5">
                      {mark && (
                        <span
                          className="absolute top-0 whitespace-nowrap font-mono text-[10px] leading-none text-[#A3A3A3]"
                          style={{
                            left: `${(mark.span * 11 - 2) / 2}px`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          {mark.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      {week.contributionDays.map((day, dayIndex) => {
                        const count = day.contributionCount;
                        let background = "bg-[#161B22]";

                        if (count === 1) {
                          background = "bg-[#0E4429]";
                        } else if (count <= 3 && count > 1) {
                          background = "bg-[#006D32]";
                        } else if (count <= 6 && count > 3) {
                          background = "bg-[#26A641]";
                        } else if (count > 6) {
                          background = "bg-[#39D353]";
                        }

                        return (
                          <div
                            key={dayIndex}
                            title={`${day.date}: ${count} GitHub contribution${count === 1 ? "" : "s"
                              }`}
                            className={`cursor-pointer rounded-[2px] transition-all hover:ring-1 hover:ring-white ${background}`}
                            style={{ width: "9px", height: "9px" }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mt-2 flex flex-col justify-between gap-3 border-t border-[#1F1F1F] pt-3 text-xs text-[#A3A3A3] sm:flex-row sm:items-center">
          {activeTab === "coding" ? (
            <div>
              <span className="font-medium text-white">
                {codingStats.totalSolved}
              </span>{" "}
              questions solved across platforms ·{" "}
              <span className="font-medium text-white">
                {codingStats.activeDays}
              </span>{" "}
              active days
            </div>
          ) : (
            <div>
              <span className="font-medium text-white">
                {ghStats.totalCommits}
              </span>{" "}
              commits in the last year ·{" "}
              <span className="font-medium text-white">
                {ghStats.publicRepos}
              </span>{" "}
              public repositories
            </div>
          )}

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#141414]" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#2A2A2A]" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#555555]" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-[#999999]" />
            <span className="h-2.5 w-2.5 rounded-[2px] bg-white" />
            <span>More</span>
          </div>
        </div>

        {activeTab === "coding" && (
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-[#1A1A1A] pt-3 text-[11px] text-[#A3A3A3]">
            <span className="text-white">Platforms:</span>

            {codingStats.sources?.leetcode === "failed" ? (
              <span className="rounded border border-[#222222] bg-[#141414] px-2 py-0.5 text-yellow-700/70">
                LeetCode: unavailable
              </span>
            ) : (
              <span className="rounded border border-[#222222] bg-[#141414] px-2 py-0.5">
                LeetCode:{" "}
                <strong className="font-medium text-white">
                  {codingStats.platforms.leetcode.solved}
                </strong>{" "}
                ({codingStats.platforms.leetcode.easy}E ·{" "}
                {codingStats.platforms.leetcode.medium}M ·{" "}
                {codingStats.platforms.leetcode.hard}H)
              </span>
            )}

            {codingStats.sources?.codechef === "failed" ? (
              <span className="rounded border border-[#222222] bg-[#141414] px-2 py-0.5 text-yellow-700/70">
                CodeChef: unavailable
              </span>
            ) : (
              <span className="rounded border border-[#222222] bg-[#141414] px-2 py-0.5">
                CodeChef:{" "}
                <strong className="font-medium text-white">
                  {codingStats.platforms.codechef.solved}
                </strong>{" "}
                (Rating: {codingStats.platforms.codechef.rating})
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
