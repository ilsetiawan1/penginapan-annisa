export function RoomMatrixSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-pulse">
      {/* BANGUNAN A SKELETON */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-200" />
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
          </div>
          <div className="h-5 w-20 bg-slate-100 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`skel-a-${i}`}
              className="bg-white/80 p-5 rounded-2xl border border-slate-200/60 shadow-2xs space-y-4 min-h-[175px] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-10 bg-slate-200 rounded" />
                  <div className="h-5 w-16 bg-slate-100 rounded-full" />
                </div>
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-8 w-full bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* BANGUNAN B SKELETON */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-200" />
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
          </div>
          <div className="h-5 w-20 bg-slate-100 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`skel-b-${i}`}
              className="bg-white/80 p-5 rounded-2xl border border-slate-200/60 shadow-2xs space-y-4 min-h-[175px] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-10 bg-slate-200 rounded" />
                  <div className="h-5 w-16 bg-slate-100 rounded-full" />
                </div>
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-8 w-full bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
