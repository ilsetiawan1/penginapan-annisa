"use client";

interface DashboardStatsGridProps {
  todayRevenue: number;
  totalRooms: number;
  occupiedRooms: number;
  occupancyRate: number;
  posSalesAmount: number;
  posItemsSold: number;
  onNavigateTab: (tab: string) => void;
}

export function DashboardStatsGrid({
  todayRevenue,
  totalRooms,
  occupiedRooms,
  occupancyRate,
  posSalesAmount,
  posItemsSold,
  onNavigateTab,
}: DashboardStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
      {/* 1. PEMASUKAN HARI INI */}
      <button
        type="button"
        onClick={() => onNavigateTab("reports")}
        className="w-full text-left bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between min-h-[136px]"
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-medium text-slate-500">Pemasukan Hari Ini</span>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60 whitespace-nowrap shrink-0">
            PMS + POS
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 w-full">
          <div className="min-w-0">
            <div className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight leading-none flex items-baseline gap-1.5 truncate">
              <span className="font-light text-slate-400 text-lg sm:text-xl">Rp</span>
              <span className="tabular-nums">{todayRevenue.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {todayRevenue > 0 ? (
                <>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    Aktif
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium truncate">
                    transaksi hari ini
                  </span>
                </>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium truncate">
                  Belum ada transaksi
                </span>
              )}
            </div>
          </div>

          <div className="w-20 sm:w-24 h-8 sm:h-9 shrink-0 ml-auto">
            <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible" aria-hidden="true">
              <path
                d="M 0,28 Q 20,25 40,29 T 70,18 T 100,8"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* 2. TINGKAT OKUPANSI KAMAR */}
      <button
        type="button"
        onClick={() => onNavigateTab("matrix")}
        className="w-full text-left bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between min-h-[136px]"
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-medium text-slate-500">Tingkat Okupansi</span>
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60 whitespace-nowrap shrink-0">
            {occupiedRooms}/{totalRooms} Terisi
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 w-full">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight leading-none tabular-nums">
                {occupancyRate}
              </span>
              <span className="font-light text-slate-400 text-lg sm:text-xl">%</span>
              <span className="text-xs text-slate-400 font-normal ml-1 hidden xs:inline truncate">
                kapasitas
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60 shrink-0">
                {occupiedRooms > 0 ? "+12.5%" : "Siap Huni"}
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {occupiedRooms > 0 ? "vs minggu lalu" : "kebersihan prima"}
              </span>
            </div>
          </div>

          <div className="w-20 sm:w-24 h-8 sm:h-9 shrink-0 ml-auto">
            <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible" aria-hidden="true">
              <path
                d="M 0,30 Q 30,28 55,20 T 80,22 T 100,10"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* 3. PENJUALAN KASIR POS */}
      <button
        type="button"
        onClick={() => onNavigateTab("pos")}
        className="w-full text-left bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all cursor-pointer flex flex-col justify-between min-h-[136px] sm:col-span-2 lg:col-span-1"
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-medium text-slate-500">Penjualan Kasir POS</span>
          <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60 whitespace-nowrap shrink-0">
            Oleh-Oleh
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 w-full">
          <div className="min-w-0">
            <div className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight leading-none flex items-baseline gap-1.5 truncate">
              <span className="font-light text-slate-400 text-lg sm:text-xl">Rp</span>
              <span className="tabular-nums">{posSalesAmount.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {posItemsSold > 0 ? `${posItemsSold} item retail terjual` : "0 item retail terjual"}
              </span>
            </div>
          </div>

          <div className="w-20 sm:w-24 h-8 sm:h-9 shrink-0 ml-auto">
            <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible" aria-hidden="true">
              <path
                d="M 0,26 Q 30,26 50,30 T 75,22 T 100,14"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
