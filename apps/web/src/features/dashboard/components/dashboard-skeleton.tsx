const STAT_KEYS = ["stat-1", "stat-2", "stat-3", "stat-4"];

export function DashboardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
          <div className="h-4 w-72 bg-slate-200/80 rounded" />
        </div>
        <div className="h-10 w-28 bg-slate-200 rounded-xl" />
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_KEYS.map((statKey) => (
          <div
            key={statKey}
            className="h-28 bg-white/80 rounded-2xl p-4 border border-slate-200/80 space-y-3"
          >
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-7 w-32 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Chart & Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        <div className="lg:col-span-8 h-80 bg-white/80 rounded-2xl p-5 border border-slate-200/80" />
        <div className="lg:col-span-4 h-80 bg-white/80 rounded-2xl p-5 border border-slate-200/80" />
      </div>

      {/* Table Skeleton */}
      <div className="h-64 bg-white/80 rounded-2xl p-5 border border-slate-200/80" />
    </div>
  );
}
