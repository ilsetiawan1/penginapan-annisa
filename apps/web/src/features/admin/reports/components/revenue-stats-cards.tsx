"use client";

import { ArrowUpRight } from "lucide-react";

export function RevenueStatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* 1. Total Omzet */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Total Omzet Bulan Ini
        </span>
        <p className="text-xl sm:text-2xl font-black text-purple-700 mt-1">
          Rp 18.425.000
        </p>
        <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5 mt-1">
          <ArrowUpRight className="w-3 h-3" /> +14.2% dari bulan lalu
        </span>
      </div>

      {/* 2. Tingkat Keterisian (Okupansi) */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Tingkat Okupansi Kamar
        </span>
        <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
          78.5%
        </p>
        <span className="text-[10px] text-slate-500 font-medium block mt-1">
          Rata-rata 6.2 dari 8 kamar/hari
        </span>
      </div>

      {/* 3. Total Tamu */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Total Tamu Menginap
        </span>
        <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
          68 Tamu
        </p>
        <span className="text-[10px] text-slate-500 font-medium block mt-1">
          Bulan Agustus 2026
        </span>
      </div>

      {/* 4. Omzet Oleh-Oleh */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Penjualan Oleh-Oleh
        </span>
        <p className="text-xl sm:text-2xl font-black text-amber-700 mt-1">
          Rp 2.850.000
        </p>
        <span className="text-[10px] text-slate-500 font-medium block mt-1">
          54 Produk Terjual
        </span>
      </div>
    </div>
  );
}
