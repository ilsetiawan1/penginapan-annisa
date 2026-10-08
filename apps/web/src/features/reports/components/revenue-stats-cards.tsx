"use client";

import { Calendar, ChevronDown, Download, RotateCw, Search, X } from "lucide-react";

interface RevenueStatsCardsProps {
  totalOmzet?: number;
  roomRevenue?: number;
  souvenirOmzet?: number;
  souvenirItems?: number;
  occupancyRate?: number;
  totalGuests?: number;
  monthLabel?: string;
  selectedMonth?: string;
  onMonthChange?: (month: string) => void;
  searchQuery?: string;
  onSearchChange?: (search: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onExportPdf?: () => void;
  isExporting?: boolean;
}

export function RevenueStatsCards({
  totalOmzet = 0,
  roomRevenue = 0,
  souvenirOmzet = 0,
  souvenirItems = 0,
  occupancyRate = 0,
  totalGuests = 0,
  monthLabel = "Bulan Ini",
  selectedMonth,
  onMonthChange,
  searchQuery = "",
  onSearchChange,
  onRefresh,
  isRefreshing = false,
  onExportPdf,
  isExporting = false,
}: RevenueStatsCardsProps) {
  const avgRoomsPerDay = Math.round((occupancyRate / 100) * 8 * 10) / 10;

  return (
    <div className="space-y-3.5 w-full">
      {/* Header Toolbar: Pencarian Nama Tamu & Aksi (Bulan, PDF, Refresh) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Input Pencarian Nama Tamu */}
        <div className="relative flex-1 max-w-full sm:max-w-xs md:max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Cari nama tamu..."
            aria-label="Cari nama tamu"
            className="w-full h-9 pl-9 pr-8 bg-white hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#3c315b] transition shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              aria-label="Hapus pencarian"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Dropdown Filter Laporan Per Bulan */}
          {selectedMonth && onMonthChange && (
            <div className="relative flex items-center">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                aria-label="Pilih bulan laporan"
                className="h-9 pl-8 pr-7 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 outline-none focus:border-slate-400 transition cursor-pointer appearance-none shadow-2xs"
              >
                <option value="2026-10">Oktober 2026</option>
                <option value="2026-09">September 2026</option>
                <option value="2026-08">Agustus 2026</option>
                <option value="2026-07">Juli 2026</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Tombol Ekspor PDF */}
          {onExportPdf && (
            <button
              type="button"
              onClick={onExportPdf}
              disabled={isExporting}
              title="Unduh Laporan PDF"
              aria-label="Unduh Laporan PDF"
              className="h-9 px-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Download
                className={`w-3.5 h-3.5 text-slate-500 ${isExporting ? "animate-bounce" : ""}`}
              />
              <span>PDF</span>
            </button>
          )}

          {/* Tombol Refresh */}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Perbarui Data Laporan"
              aria-label="Perbarui Data Laporan"
              className="h-9 w-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition shadow-2xs cursor-pointer disabled:opacity-60"
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-slate-900" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Grid 4 Kartu Metrik Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* 1. Total Pendapatan (Kamar + Souvenir) */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Pendapatan
          </span>
          <div className="text-2xl sm:text-3xl font-light text-slate-900 tabular-nums mt-1 tracking-tight flex items-baseline">
            <span className="font-light text-slate-400 text-lg sm:text-xl mr-1.5">Rp</span>
            <span>{totalOmzet.toLocaleString("id-ID")}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium mt-2">
            Kamar &amp; Kasir Oleh-Oleh · {monthLabel}
          </span>
        </div>

        {/* 2. Pendapatan Kamar */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Pendapatan Kamar
          </span>
          <div className="text-2xl sm:text-3xl font-light text-slate-900 tabular-nums mt-1 tracking-tight flex items-baseline">
            <span className="font-light text-slate-400 text-lg sm:text-xl mr-1.5">Rp</span>
            <span>{roomRevenue.toLocaleString("id-ID")}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium mt-2 tabular-nums">
            {totalGuests} Tamu Menginap
          </span>
        </div>

        {/* 3. Penjualan Oleh-Oleh */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Penjualan Oleh-Oleh
          </span>
          <div className="text-2xl sm:text-3xl font-light text-slate-900 tabular-nums mt-1 tracking-tight flex items-baseline">
            <span className="font-light text-slate-400 text-lg sm:text-xl mr-1.5">Rp</span>
            <span>{souvenirOmzet.toLocaleString("id-ID")}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium mt-2 tabular-nums">
            {souvenirItems} Produk Terjual
          </span>
        </div>

        {/* 4. Tingkat Okupansi Kamar */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Tingkat Okupansi
          </span>
          <div className="text-2xl sm:text-3xl font-light text-slate-900 tabular-nums mt-1 tracking-tight flex items-baseline">
            <span>{occupancyRate}</span>
            <span className="font-light text-slate-400 text-lg sm:text-xl ml-0.5">%</span>
          </div>
          <span className="text-xs text-slate-500 font-medium mt-2 tabular-nums">
            Rata-rata {avgRoomsPerDay} dari 8 kamar/hari
          </span>
        </div>
      </div>
    </div>
  );
}
