export default function Loading() {
  return (
    <div className="py-24 space-y-6 animate-pulse">
      <div className="h-4 w-28 rounded bg-[#1F1F1F]" />
      <div className="h-8 w-1/2 rounded bg-[#1F1F1F]" />
      <div className="space-y-3 pt-4">
        <div className="h-4 w-full rounded bg-[#141414]" />
        <div className="h-4 w-5/6 rounded bg-[#141414]" />
        <div className="h-4 w-4/6 rounded bg-[#141414]" />
      </div>
    </div>
  );
}
