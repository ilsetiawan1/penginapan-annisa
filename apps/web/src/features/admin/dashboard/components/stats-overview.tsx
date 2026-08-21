"use client";

interface StatsOverviewProps {
  readyCount: number;
  occupiedCount: number;
  dirtyCount: number;
  maintenanceCount: number;
}

export function StatsOverview({
  readyCount,
  occupiedCount,
  dirtyCount,
  maintenanceCount,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Ready */}
      <div className="bg-white border-2 border-purple-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-purple-700">
            SIAP PAKAI
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-purple-700">{readyCount}</span>
          <span className="text-xs text-slate-500 font-medium">Kamar Kosong &amp; Bersih</span>
        </div>
      </div>

      {/* Occupied */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-700">
            TERISI
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-blue-700">{occupiedCount}</span>
          <span className="text-xs text-slate-500 font-medium">Tamu Sedang Menginap</span>
        </div>
      </div>

      {/* Dirty */}
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-800">
            PERLU BERSIH
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-amber-700">{dirtyCount}</span>
          <span className="text-xs text-slate-500 font-medium">Menunggu Housekeeping</span>
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-white border-2 border-rose-200 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-700">
            PERBAIKAN
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-rose-700">{maintenanceCount}</span>
          <span className="text-xs text-slate-500 font-medium">Out of Order</span>
        </div>
      </div>
    </div>
  );
}
