export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-subtle border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted">
      #{children}
    </span>
  );
}
