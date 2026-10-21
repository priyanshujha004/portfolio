export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-border" />
        <div className="h-10 w-2/3 rounded bg-border" />
        <div className="h-4 w-1/2 rounded bg-border" />
      </div>
    </div>
  );
}
