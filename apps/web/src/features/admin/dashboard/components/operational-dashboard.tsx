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
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jayapura",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jayapura",
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      setTimeStr(`${new Intl.DateTimeFormat("id-ID", timeOptions).format(now)} WIT`);
      setDateStr(new Intl.DateTimeFormat("id-ID", dateOptions).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard diperbarui!");
    }, 250);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Header Toolbar Ala Referensi: Title di Kiri + Date/Time Pill di Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            Ringkasan Operasional
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pantau status 8 kamar, kedatangan tamu bandara, dan kas masuk harian.
          </p>
        </div>

        {/* Date & Real-time Live Clock Pill + Refresh Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-purple-100/90 shadow-2xs text-xs font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-purple-700 shrink-0" />
            <span className="text-slate-900 font-extrabold">{dateStr || "Hari Ini"}</span>
            <span className="text-purple-200 font-bold">•</span>
            <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
            <span className="text-purple-900 font-black">{timeStr || "Memuat WIT..."}</span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh Data Dashboard"
            className="w-9 h-9 rounded-full border border-purple-100 bg-white hover:bg-purple-50 text-purple-700 flex items-center justify-center transition cursor-pointer shadow-2xs shrink-0"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards (Taskora Aesthetic diselaraskan dengan Warna Status Operasional) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* KPI 1: Okupansi (Purple Theme) */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-purple-50/40 hover:bg-purple-50/80 border border-purple-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-purple-300/60 shrink-0 group-hover:scale-105 transition-transform">
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

        {/* KPI 2: Tiba Hari Ini (Warna Ungu - Sesuai Status Booking WA) */}
        <div
          onClick={() => onNavigateTab("bookings")}
          className="bg-purple-50/40 hover:bg-purple-50/80 border border-purple-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center shadow-md shadow-purple-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Tiba Hari Ini
            </span>
            <span className="text-lg sm:text-2xl font-black text-purple-950 leading-none block my-0.5 sm:my-1">
              1 Tamu
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-purple-700 flex items-center gap-0.5 leading-tight truncate">
              <span>↑</span> <span>Booking WA (#B1)</span>
            </span>
          </div>
        </div>

        {/* KPI 3: Jadwal Check-Out (Warna Biru - Sesuai Status Terisi & Tombol Check-Out) */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-blue-50/40 hover:bg-blue-50/80 border border-blue-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Jadwal Check-Out
            </span>
            <span className="text-lg sm:text-2xl font-black text-blue-950 leading-none block my-0.5 sm:my-1">
              1 Kamar
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 flex items-center gap-0.5 leading-tight truncate">
              <span>→</span> <span>Maks 12.00 (#A2)</span>
            </span>
          </div>
        </div>

        {/* KPI 4: Housekeeping (Warna Kuning/Amber - Sesuai Status Perlu Bersih/Kotor) */}
        <div
          onClick={() => onNavigateTab("matrix")}
          className="bg-amber-50/40 hover:bg-amber-50/80 border border-amber-100/80 rounded-3xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-300/60 shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate leading-tight">
              Housekeeping
            </span>
            <span className="text-lg sm:text-2xl font-black text-amber-900 leading-none block my-0.5 sm:my-1">
              1 Kamar
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 flex items-center gap-0.5 leading-tight truncate">
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
