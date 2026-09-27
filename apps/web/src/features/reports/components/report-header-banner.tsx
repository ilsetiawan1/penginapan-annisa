"use client";

import { Button } from "@/components/ui/button";
import { Calendar, FileText, RotateCw } from "lucide-react";

interface ReportHeaderBannerProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onExportPdf: () => void;
  isExporting: boolean;
}

export function ReportHeaderBanner({
  selectedMonth,
  onMonthChange,
  onRefresh,
  isRefreshing,
  onExportPdf,
  isExporting,
}: ReportHeaderBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
      <div>
        <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Laporan Keuangan Owner
        </span>
        <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
          Rekapitulasi Pendapatan &amp; Okupansi Kamar
        </h2>
        <p className="text-xs text-slate-500">
          Laporan pendapatan sewa 8 kamar transit dan penjualan oleh-oleh khas Maluku.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Dropdown Filter Laporan Per Bulan */}
        <div className="relative flex items-center">
          <Calendar className="w-4 h-4 text-purple-700 absolute left-3 pointer-events-none" />
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-black text-slate-800 outline-none focus:ring-2 focus:ring-purple-300 transition cursor-pointer appearance-none shadow-2xs"
          >
            <option value="2026-09">September 2026</option>
            <option value="2026-08">Agustus 2026</option>
            <option value="2026-07">Juli 2026</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
            ▼
          </div>
        </div>

        {/* Refresh Action */}
        <button
          type="button"
          onClick={onRefresh}
          title="Perbarui Data Laporan"
          className="p-2.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
          <span className="text-xs font-black hidden sm:inline">Refresh</span>
        </button>

        {/* Ekspor Laporan PDF (Only PDF) */}
        <Button
          type="button"
          onClick={onExportPdf}
          disabled={isExporting}
          className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-10 sm:h-11 px-4 sm:px-5 gap-2 shadow-md cursor-pointer transition"
        >
          <FileText className="w-4 h-4" />
          <span>Ekspor Laporan (PDF)</span>
        </Button>
      </div>
    </div>
  );
}
