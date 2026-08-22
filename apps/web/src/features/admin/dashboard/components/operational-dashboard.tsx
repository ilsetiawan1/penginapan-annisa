"use client";

import {
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Gift,
  LayoutDashboard,
  LogOut,
  Plus,
  RotateCw,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
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
      toast.success("Data dashboard operasional telah diperbarui!");
    }, 400);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Header Banner & Filter Periode */}
      <div className="bg-white p-3.5 sm:p-4.5 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
              PUSAT KONTROL OPERASIONAL
            </span>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">
              Penginapan Annisa Ambon
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Ringkasan Produktivitas &amp; Tugas Harian
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pantau keterisian 8 kamar, agenda check-in/out, dan tugas housekeeping secara real-time.
          </p>
        </div>

        {/* Filter Tanggal / Periode & Refresh */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => setSelectedPeriod("today")}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                selectedPeriod === "today"
                  ? "bg-purple-700 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Hari Ini
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod("week")}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                selectedPeriod === "week"
                  ? "bg-purple-700 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Minggu Ini
            </button>
            <button
              type="button"
              onClick={() => setSelectedPeriod("month")}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                selectedPeriod === "month"
                  ? "bg-purple-700 text-white shadow-2xs"
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
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center justify-center"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards (KPI Operasional Tanpa Angka Uang) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Okupansi Hari Ini */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-3xl p-4 border border-purple-200/90 shadow-2xs hover:shadow-md hover:border-purple-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[11px] font-black text-purple-700 uppercase tracking-wider">
              TINGKAT OKUPANSI
            </span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black group-hover:scale-110 transition">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">75%</span>
              <span className="text-[11px] font-bold text-emerald-600">6/8 Unit</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              3 Terisi • 1 Booking WA • 4 Siap
            </p>
          </div>
        </div>

        {/* KPI 2: Tamu Tiba Hari Ini */}
        <div
          onClick={() => onNavigateTab("bookings")}
          className="bg-white rounded-3xl p-4 border border-blue-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[11px] font-black text-blue-700 uppercase tracking-wider">
              TIBA HARI INI
            </span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black group-hover:scale-110 transition">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">1 Tamu</span>
              <span className="text-[11px] font-bold text-purple-700">Booking WA</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Kamar #B1 (Hendra Pratama)
            </p>
          </div>
        </div>

        {/* KPI 3: Jadwal Check-Out */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-3xl p-4 border border-amber-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-wider">
              CHECK-OUT HARI INI
            </span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black group-hover:scale-110 transition">
              <LogOut className="w-4 h-4" />
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">1 Kamar</span>
              <span className="text-[11px] font-bold text-slate-500">Maks 12.00</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Kamar #A2 (Budi Santoso)
            </p>
          </div>
        </div>

        {/* KPI 4: Tugas Housekeeping */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-white rounded-3xl p-4 border border-rose-200/90 shadow-2xs hover:shadow-md hover:border-rose-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[11px] font-black text-rose-700 uppercase tracking-wider">
              HOUSEKEEPING
            </span>
            <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-black group-hover:scale-110 transition">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-rose-700">1 Kamar</span>
              <span className="text-[11px] font-bold text-slate-500">Perlu Bersih</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Kamar #A3 (Ganti sprei &amp; cuci)
            </p>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Ribbon (Akses Cepat Meja Depan) */}
      <div className="bg-purple-900 text-white rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm leading-tight text-white">
              Pintasan Operasional Meja Depan
            </h4>
            <p className="text-xs text-purple-200">
              Akses instan ke matriks 8 kamar, reservasi WhatsApp, atau kasir etalase.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-950 text-xs font-black transition cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Bed className="w-4 h-4 text-purple-700" />
            <span>Lihat Status 8 Kamar</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab("bookings")}
            className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-black transition cursor-pointer shadow-xs flex items-center gap-1.5 border border-white/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Jadwal Booking WA</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab("pos")}
            className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-black transition cursor-pointer shadow-xs flex items-center gap-1.5 border border-white/20"
          >
            <Gift className="w-4 h-4" />
            <span>Kasir Oleh-Oleh</span>
          </button>
        </div>
      </div>

      {/* 4. Agenda Tugas Hari Ini (Today Tasks Panel) */}
      <TodayTasksPanel onNavigateTab={onNavigateTab} />

      {/* 5. Dua Kolom Grafik Produktivitas & Distribusi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <OccupancyTrendChart />
        <ChannelDistributionCard />
      </div>
    </div>
  );
}
