"use client";

import {
  ArrowRight,
  Bed,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  Flag,
  Hourglass,
  LogOut,
  RotateCw,
  Sparkles,
  TrendingUp,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { OccupancyTrendChart } from "./occupancy-trend-chart";

interface OperationalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function OperationalDashboard({ onNavigateTab }: OperationalDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard diperbarui!");
    }, 250);
  };

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* 1. Header Toolbar Ringkas & Minimalis */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs sm:text-base font-black text-slate-900 tracking-tight shrink-0">
          Dashboard Operasional
        </h2>

        {/* Filter Periode & Refresh */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 text-[10px] sm:text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setSelectedPeriod("today")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                selectedPeriod === "today"
                  ? "bg-purple-700 text-white shadow-2xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hari Ini
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod("week")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                selectedPeriod === "week"
                  ? "bg-purple-700 text-white shadow-2xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 Hari
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod("month")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                selectedPeriod === "month"
                  ? "bg-purple-700 text-white shadow-2xs font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bulan Ini
            </button>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh Data Dashboard"
            className="p-1 sm:p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards (Taskora Aesthetic: Rounded 3D Soft Icon Box on Left + Stat on Right) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* KPI 1: Okupansi (Purple Theme) */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-purple-50/40 hover:bg-purple-50/80 border border-purple-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Tingkat Okupansi
            </span>
            <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none block my-0.5 sm:my-1">
              75%
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 leading-tight truncate">
              <span>↑</span> <span>6/8 Unit Terisi</span>
            </span>
          </div>
        </div>

        {/* KPI 2: Tiba Hari Ini (Emerald Theme) */}
        <div
          onClick={() => onNavigateTab("bookings")}
          className="bg-emerald-50/40 hover:bg-emerald-50/80 border border-emerald-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Tiba Hari Ini
            </span>
            <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none block my-0.5 sm:my-1">
              1 Tamu
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 flex items-center gap-0.5 leading-tight truncate">
              <span>↑</span> <span>Booking WA (#B1)</span>
            </span>
          </div>
        </div>

        {/* KPI 3: Jadwal Check-Out (Amber Theme) */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-amber-50/40 hover:bg-amber-50/80 border border-amber-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <Hourglass className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Jadwal Check-Out
            </span>
            <span className="text-lg sm:text-2xl font-black text-slate-900 leading-none block my-0.5 sm:my-1">
              1 Kamar
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 flex items-center gap-0.5 leading-tight truncate">
              <span>→</span> <span>Maks 12.00 (#A2)</span>
            </span>
          </div>
        </div>

        {/* KPI 4: Housekeeping (Rose Theme) */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-rose-50/40 hover:bg-rose-50/80 border border-rose-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <Flag className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Housekeeping
            </span>
            <span className="text-lg sm:text-2xl font-black text-rose-600 leading-none block my-0.5 sm:my-1">
              1 Kamar
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-rose-600 flex items-center gap-0.5 leading-tight truncate">
              <span>↓</span> <span>Perlu Bersih (#A3)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Dua Kolom Seimbang: Trend Okupansi (Kiri) & Agenda Operasional Harian (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5">
        {/* Kiri: Grafik Trend Okupansi 7 Hari (Col 7 di Desktop) */}
        <div className="lg:col-span-7">
          <OccupancyTrendChart />
        </div>

        {/* Kanan: Agenda Ringkas Hari Ini (Col 5 di Desktop) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs space-y-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              Agenda Hari Ini
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab("matrix")}
              className="text-[11px] font-black text-purple-700 hover:text-purple-900 flex items-center gap-0.5 cursor-pointer"
            >
              <span>Status Kamar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* List Ringkas 3 Aktivitas Utama */}
          <div className="space-y-2">
            {/* 1. Kedatangan */}
            <div
              onClick={() => onNavigateTab("matrix")}
              className="p-2 sm:p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/80 flex items-center justify-between gap-2 hover:bg-purple-100/70 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-purple-700 text-white flex items-center justify-center font-black text-[10px] shrink-0">
                  #B1
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-black text-slate-900 block truncate">
                    Hendra Pratama
                  </span>
                  <span className="text-[10px] text-purple-800 font-bold block">
                    Kedatangan WA • Landing 14.30 WIT
                  </span>
                </div>
              </div>
              <span className="bg-purple-700 text-white text-[9px] font-black px-2 py-0.5 rounded-md shrink-0">
                Check-In
              </span>
            </div>

            {/* 2. Check-Out */}
            <div
              onClick={() => onNavigateTab("matrix")}
              className="p-2 sm:p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-2 hover:bg-blue-100/70 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0">
                  #A2
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-black text-slate-900 block truncate">
                    Budi Santoso
                  </span>
                  <span className="text-[10px] text-blue-800 font-bold block">
                    Jadwal Check-Out • Maks 12.00 WIT
                  </span>
                </div>
              </div>
              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shrink-0">
                Check-Out
              </span>
            </div>

            {/* 3. Housekeeping */}
            <div
              onClick={() => onNavigateTab("matrix")}
              className="p-2 sm:p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-2 hover:bg-amber-100/70 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-[10px] shrink-0">
                  #A3
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-black text-slate-900 block truncate">
                    Kamar Kipas
                  </span>
                  <span className="text-[10px] text-amber-800 font-bold block">
                    Perlu Bersih &amp; Ganti Sprei
                  </span>
                </div>
              </div>
              <span className="bg-amber-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shrink-0">
                Bersihkan
              </span>
            </div>
          </div>

          {/* Distribusi Tipe Kamar Ringkas di Bawahnya */}
          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Tipe AC: <strong className="text-purple-950 font-black">3/4 Terisi</strong></span>
            <span>•</span>
            <span>Tipe Kipas: <strong className="text-purple-950 font-black">2/4 Terisi</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
