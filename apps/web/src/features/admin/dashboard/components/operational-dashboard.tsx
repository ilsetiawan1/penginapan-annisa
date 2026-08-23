"use client";

import {
  ArrowRight,
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
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
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Dashboard Operasional
          </h2>
          <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-full">
            8 Kamar
          </span>
        </div>

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

      {/* 2. Top 4 Metric Cards (Clean, Compact, 2 Kolom di Mobile & 4 Kolom di Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* KPI 1: Okupansi */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-purple-200/80 shadow-2xs hover:shadow-xs hover:border-purple-400 transition cursor-pointer flex flex-col justify-between"
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
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-blue-200/80 shadow-2xs hover:shadow-xs hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
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
            #B1 • Hendra Pratama
          </p>
        </div>

        {/* KPI 3: Jadwal Check-Out */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-amber-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400 transition cursor-pointer flex flex-col justify-between"
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
            #A2 • Budi Santoso
          </p>
        </div>

        {/* KPI 4: Housekeeping */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-2xl p-3 sm:p-3.5 border border-rose-200/80 shadow-2xs hover:shadow-xs hover:border-rose-400 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-rose-700 uppercase tracking-wider">
              HOUSEKEEPING
            </span>
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-rose-700">1 Kamar</span>
            <span className="text-[10px] font-bold text-slate-500">Perlu Bersih</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            #A3 • Ganti sprei kasur
          </p>
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
