export function EmptyState({ message }: { message: string }) {
  return (
    <p className="py-16 text-center font-mono text-sm text-text-muted">
      {message}
    </p>
  );
}
