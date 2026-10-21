interface HeatmapStat {
  label: string;
  value: string;
}

export function ActivityStats({ stats }: { stats: HeatmapStat[] }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-xl text-text-primary">{stat.value}</p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
