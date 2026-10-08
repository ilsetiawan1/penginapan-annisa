const HEADER_COLS = ["h-sun", "h-mon", "h-tue", "h-wed", "h-thu", "h-fri", "h-sat"];
const CELL_KEYS = Array.from({ length: 28 }, (_, idx) => `cell-placeholder-${idx + 1}`);

export function BookingCalendarSkeleton() {
  return (
    <div className="w-full space-y-6 pb-6 animate-pulse">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-stretch">
        {/* Kolom Kiri: Kalender Skeleton */}
        <div className="xl:col-span-8 bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="h-6 w-40 bg-slate-200 rounded-lg" />
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-slate-200 rounded-xl" />
              <div className="h-9 w-28 bg-slate-200 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 pt-2">
            {HEADER_COLS.map((colKey) => (
              <div key={colKey} className="h-4 bg-slate-200 rounded mx-auto w-10" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2.5">
            {CELL_KEYS.map((cellKey, i) => (
              <div
                key={cellKey}
                className="h-20 bg-slate-100/80 rounded-xl border border-slate-200/60 p-2 space-y-2"
              >
                <div className="h-3 w-4 bg-slate-200 rounded" />
                {i % 4 === 0 && <div className="h-4 w-full bg-slate-200/70 rounded-md" />}
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Detail Panel Skeleton */}
        <div className="xl:col-span-4 bg-white/80 rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="h-5 w-36 bg-slate-200 rounded-lg" />
          <div className="h-7 w-48 bg-slate-200 rounded-xl" />
          <div className="space-y-3 pt-3">
            <div className="h-28 bg-slate-100 rounded-xl border border-slate-200/60 p-4" />
            <div className="h-28 bg-slate-100 rounded-xl border border-slate-200/60 p-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
