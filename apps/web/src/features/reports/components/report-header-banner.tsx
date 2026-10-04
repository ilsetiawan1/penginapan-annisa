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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Rekapitulasi Pendapatan &amp; Okupansi
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Rekapitulasi pendapatan sewa 8 unit kamar transit dan kasir oleh-oleh.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Dropdown Filter Laporan Per Bulan */}
        <div className="relative flex items-center">
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            aria-label="Pilih bulan laporan"
            className="h-10 pl-9 pr-8 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-slate-400 transition cursor-pointer appearance-none"
          >
            <option value="2026-10">Oktober 2026</option>
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
          aria-label="Perbarui Data Laporan"
          className="h-10 px-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 transition cursor-pointer flex items-center gap-1.5"
        >
          <RotateCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin text-slate-900" : "text-slate-500"}`}
          />
          <span className="text-xs font-semibold hidden sm:inline">Refresh</span>
        </button>

        {/* Ekspor Laporan PDF */}
        <Button
          type="button"
          onClick={onExportPdf}
          disabled={isExporting}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs h-10 px-4 gap-2 cursor-pointer transition shadow-none"
        >
          <FileText className="w-4 h-4" />
          <span>Ekspor Laporan (PDF)</span>
        </Button>
      </div>
    </div>
  );
}
