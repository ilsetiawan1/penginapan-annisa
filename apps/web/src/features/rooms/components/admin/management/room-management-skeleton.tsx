export function RoomManagementSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-pulse">
      {/* BANGUNAN A SKELETON */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-200" />
            <div className="h-4 w-24 bg-slate-200 rounded-md" />
          </div>
          <div className="h-4 w-28 bg-slate-100 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`mgmt-skel-a-${i}`}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 space-y-2.5 min-h-[200px] flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-200" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
                <div className="w-full h-32 bg-slate-100 rounded-lg shrink-0 my-2" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
              <div className="h-8 w-full bg-slate-100 rounded-lg" />
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
          <div className="h-4 w-28 bg-slate-100 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`mgmt-skel-b-${i}`}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 space-y-2.5 min-h-[200px] flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-200" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
                <div className="w-full h-32 bg-slate-100 rounded-lg shrink-0 my-2" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
              <div className="h-8 w-full bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
