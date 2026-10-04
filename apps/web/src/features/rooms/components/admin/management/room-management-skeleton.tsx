export function RoomManagementSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* BANGUNAN A SKELETON */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <div className="h-5 w-36 bg-slate-200 rounded-md" />
          </div>
          <div className="h-4 w-28 bg-slate-100 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`mgmt-skel-a-${i}`}
              className="bg-white rounded-3xl border-2 border-slate-100 p-4 shadow-2xs space-y-3 min-h-[220px] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-2xl bg-slate-200" />
                  <div className="w-7 h-7 rounded-xl bg-slate-100" />
                </div>
                <div className="h-28 w-full bg-slate-100 rounded-2xl" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
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
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <div className="h-5 w-36 bg-slate-200 rounded-md" />
          </div>
          <div className="h-4 w-28 bg-slate-100 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`mgmt-skel-b-${i}`}
              className="bg-white rounded-3xl border-2 border-slate-100 p-4 shadow-2xs space-y-3 min-h-[220px] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-2xl bg-slate-200" />
                  <div className="w-7 h-7 rounded-xl bg-slate-100" />
                </div>
                <div className="h-28 w-full bg-slate-100 rounded-2xl" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
              <div className="h-8 w-full bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
