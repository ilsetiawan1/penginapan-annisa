"use client";

import {
  BedDouble,
  CircleDollarSign,
  PackageCheck,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface DashboardKpiCardsProps {
  todayRevenue: number;
  totalRooms: number;
  occupiedRooms: number;
  occupancyRate: number;
  posSalesAmount: number;
  posItemsSold: number;
  onNavigateTab: (tab: string) => void;
}

export function DashboardKpiCards({
  todayRevenue,
  totalRooms,
  occupiedRooms,
  occupancyRate,
  posSalesAmount,
  posItemsSold,
  onNavigateTab,
}: DashboardKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
      {/* 1. PEMASUKAN HARI INI */}
      <div
        onClick={() => onNavigateTab("reports")}
        className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">Pemasukan Hari Ini</span>
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CircleDollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-end justify-between gap-2">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              Rp {todayRevenue.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              {todayRevenue > 0 ? (
                <>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <TrendingUp className="w-3 h-3" />
                    Aktif
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">hari ini</span>
                </>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium">
                  Belum ada transaksi hari ini
                </span>
              )}
            </div>
          </div>

          {/* Mini Sparkline Curve (Green) */}
          <div className="w-24 h-10 shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="revenue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 Q20,32 35,22 T70,16 T100,5"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,35 Q20,32 35,22 T70,16 T100,5 L100,40 L0,40 Z"
                fill="url(#revenue-grad)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. TINGKAT OKUPANSI KAMAR */}
      <div
        onClick={() => onNavigateTab("matrix")}
        className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">Tingkat Okupansi Kamar</span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BedDouble className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-end justify-between gap-2">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none flex items-baseline gap-2">
              <span>{occupancyRate}%</span>
              <span className="text-xs font-bold text-slate-400">
                {occupiedRooms > 0
                  ? `${occupiedRooms}/${totalRooms} Terisi`
                  : `${totalRooms} Kamar Siap Huni`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <TrendingUp className="w-3 h-3" />
                {occupiedRooms > 0 ? "+12.5%" : "Siap Terima Tamu"}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {occupiedRooms > 0 ? "vs minggu lalu" : "kebersihan prima"}
              </span>
            </div>
          </div>

          {/* Mini Sparkline Curve (Teal/Emerald) */}
          <div className="w-24 h-10 shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="occupancy-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,30 Q25,38 45,20 T75,12 T100,6"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,30 Q25,38 45,20 T75,12 T100,6 L100,40 L0,40 Z"
                fill="url(#occupancy-grad)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. PENJUALAN POS OLEH-OLEH */}
      <div
        onClick={() => onNavigateTab("pos")}
        className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">Penjualan Kasir POS</span>
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-end justify-between gap-2">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none flex items-baseline gap-2">
              <span>Rp {posSalesAmount.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              {posItemsSold > 0 ? (
                <>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    <PackageCheck className="w-3 h-3" />
                    {posItemsSold} Produk Terjual
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">hari ini</span>
                </>
              ) : (
                <span className="text-[11px] text-slate-400 font-medium">
                  Belum ada penjualan hari ini
                </span>
              )}
            </div>
          </div>

          {/* Mini Sparkline Curve (Purple) */}
          <div className="w-24 h-10 shrink-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="pos-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,28 Q30,12 50,22 T80,8 T100,4"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,28 Q30,12 50,22 T80,8 T100,4 L100,40 L0,40 Z"
                fill="url(#pos-grad)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
