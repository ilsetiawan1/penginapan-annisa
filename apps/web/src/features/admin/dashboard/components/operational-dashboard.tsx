"use client";

import {
  Bed,
  Calendar,
  CheckCircle2,
  Gift,
  LayoutDashboard,
  LogOut,
  RotateCw,
  Sparkles,
  TrendingUp,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChannelDistributionCard } from "./channel-distribution-card";
import { OccupancyTrendChart } from "./occupancy-trend-chart";
import { TodayTasksPanel } from "./today-tasks-panel";

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
      toast.success("Data dashboard operasional telah di-refresh!");
    }, 300);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* 1. Header Toolbar Ringkas (Mobile-First) */}
      <div className="bg-white p-3 sm:py-2.5 sm:px-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Dashboard Operasional
          </h2>
          <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-full">
            8 Kamar Transit
          </span>
        </div>

        {/* Filter Periode & Refresh */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/70 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setSelectedPeriod("today")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                selectedPeriod === "today"
                  ? "bg-purple-700 text-white shadow-2xs font-extrabold"
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
                  ? "bg-purple-700 text-white shadow-2xs font-extrabold"
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
                  ? "bg-purple-700 text-white shadow-2xs font-extrabold"
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
            className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards Ringkas (2 Col Mobile, 4 Col Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* KPI 1: Okupansi */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-purple-200/90 shadow-2xs hover:shadow-md hover:border-purple-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider">
              OKUPANSI
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">75%</span>
            <span className="text-[10px] font-bold text-emerald-600">6/8 Unit</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            3 Terisi • 1 WA • 4 Siap
          </p>
        </div>

        {/* KPI 2: Tiba Hari Ini */}
        <div
          onClick={() => onNavigateTab("bookings")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-blue-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-wider">
              TIBA HARI INI
            </span>
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">1 Tamu</span>
            <span className="text-[10px] font-bold text-purple-700">Booking WA</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            #B1 (Hendra Pratama)
          </p>
        </div>

        {/* KPI 3: Jadwal Check-Out */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-amber-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">
              CHECK-OUT
            </span>
            <LogOut className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900">1 Kamar</span>
            <span className="text-[10px] font-bold text-slate-500">Maks 12.00</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            #A2 (Budi Santoso)
          </p>
        </div>

        {/* KPI 4: Housekeeping */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-rose-200/90 shadow-2xs hover:shadow-md hover:border-rose-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-rose-700 uppercase tracking-wider">
              HOUSEKEEPING
            </span>
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-rose-700">1 Kamar</span>
            <span className="text-[10px] font-bold text-slate-500">Kotor</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            #A3 (Ganti sprei &amp; cuci)
          </p>
        </div>
      </div>

      {/* 3. Quick Navigation Ribbon (Ramping & Mobile-Friendly) */}
      <div className="bg-purple-900 text-white rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shadow-xs">
        <span className="text-xs font-black text-white shrink-0 hidden md:inline">
          Pintasan Cepat:
        </span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-purple-950 text-[11px] font-extrabold transition cursor-pointer shadow-xs flex items-center gap-1 shrink-0"
          >
            <Bed className="w-3.5 h-3.5 text-purple-700" />
            <span>Status 8 Kamar</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("bookings")}
            className="px-3 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white text-[11px] font-extrabold transition cursor-pointer shadow-xs flex items-center gap-1 border border-white/20 shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Jadwal Booking WA</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab("pos")}
            className="px-3 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white text-[11px] font-extrabold transition cursor-pointer shadow-xs flex items-center gap-1 border border-white/20 shrink-0"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Kasir Oleh-Oleh</span>
          </button>
        </div>
      </div>

      {/* 4. Agenda Tugas Hari Ini (Checklist Ringkas) */}
      <TodayTasksPanel onNavigateTab={onNavigateTab} />

      {/* 5. Grafik Produktivitas & Distribusi (2 Kolom di Desktop/Tablet) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <OccupancyTrendChart />
        <ChannelDistributionCard />
      </div>
    </div>
  );
}
