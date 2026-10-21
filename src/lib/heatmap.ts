export function levelToColor(level: 0 | 1 | 2 | 3 | 4): string {
  const colors = [
    "bg-border",
    "bg-accent-muted/40",
    "bg-accent-muted/70",
    "bg-accent/70",
    "bg-accent",
  ];
  return colors[level];
}
