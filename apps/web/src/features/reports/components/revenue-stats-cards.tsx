"use client";

import { ArrowUpRight } from "lucide-react";

interface RevenueStatsCardsProps {
  totalOmzet?: number;
  occupancyRate?: number;
  totalGuests?: number;
  souvenirOmzet?: number;
  souvenirItems?: number;
  monthLabel?: string;
}

export function RevenueStatsCards({
  totalOmzet = 18425000,
  occupancyRate = 78.5,
  totalGuests = 68,
  souvenirOmzet = 2850000,
  souvenirItems = 54,
  monthLabel = "Bulan Ini",
}: RevenueStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* 1. Total Omzet */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Total Omzet {monthLabel}
        </span>
        <p className="text-xl sm:text-2xl font-black text-purple-700 mt-1">
          Rp {totalOmzet.toLocaleString("id-ID")}
        </p>
        <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5 mt-1">
          <ArrowUpRight className="w-3 h-3" /> Rekap terverifikasi
        </span>
      </div>

      {/* 2. Tingkat Keterisian (Okupansi) */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Tingkat Okupansi Kamar
        </span>
        <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{occupancyRate}%</p>
        <span className="text-[10px] text-slate-500 font-medium block mt-1">
          Rata-rata {Math.round((occupancyRate / 100) * 8 * 10) / 10} dari 8 kamar/hari
        </span>
      </div>

      {/* 3. Total Tamu */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Total Tamu Menginap
        </span>
        <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{totalGuests} Tamu</p>
        <span className="text-[10px] text-slate-500 font-medium block mt-1">
          Periode {monthLabel}
        </span>
      </div>

      {/* 4. Omzet Oleh-Oleh */}
      <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-3xl shadow-2xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          Penjualan Oleh-Oleh
        </span>
        <p className="text-xl sm:text-2xl font-black text-amber-700 mt-1">
          Rp {souvenirOmzet.toLocaleString("id-ID")}
        </p>
        <span className="text-[10px] text-slate-500 font-medium block mt-1">
          {souvenirItems} Produk Terjual
        </span>
      </div>
    </div>
  );
}
