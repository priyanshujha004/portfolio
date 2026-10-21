import { Clock } from "lucide-react";

export function ReadingTime({ value }: { value: string }) {
  return (
    <span className="flex items-center gap-1 font-mono text-[11px] text-text-muted">
      <Clock size={11} /> {value}
    </span>
  );
}
