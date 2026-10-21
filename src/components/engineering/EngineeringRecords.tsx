import { Suspense } from "react";
import { CodolioHeatmap } from "./CodolioHeatmap";
import { GithubHeatmap } from "./GithubHeatmap";
import { HeatmapSkeleton } from "./HeatmapSkeleton";

export function EngineeringRecords() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Suspense fallback={<HeatmapSkeleton />}>
        <CodolioHeatmap />
      </Suspense>
      <Suspense fallback={<HeatmapSkeleton />}>
        <GithubHeatmap />
      </Suspense>
    </div>
  );
}
