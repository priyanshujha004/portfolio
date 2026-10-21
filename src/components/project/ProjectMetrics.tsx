import type { ProjectMetric } from "@/types/project";

export function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <div className="flex gap-6">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <p className="font-display text-lg text-text-primary">
            {metric.value}
          </p>
          <p className="font-mono text-[10px] uppercase text-text-muted">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}
