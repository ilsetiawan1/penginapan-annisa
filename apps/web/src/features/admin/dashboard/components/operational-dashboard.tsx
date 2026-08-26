"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Gift,
  RotateCw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";

interface OperationalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function OperationalDashboard({ onNavigateTab }: OperationalDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [chartView, setChartView] = useState<"weekly" | "monthly">("weekly");

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
      toast.success("Dashboard operasional diperbarui!");
    }, 250);
  };

  const handleCheckIn = (guestName: string, roomNumber: string) => {
    toast.success(`Check-In berhasil untuk ${guestName} (${roomNumber})!`);
  };

  const handleCheckOut = (guestName: string, roomNumber: string) => {
    toast.success(`Check-Out selesai untuk ${guestName} (${roomNumber})!`);
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER SECTION: Greeting di Kiri + Date & Clock Capsule di Kanan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            Ringkasan Operasional
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Pantau status 8 kamar, kedatangan tamu bandara, dan kas masuk harian.
          </p>
        </div>

        {/* Date & Real-time Live Clock Pill + Refresh Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-purple-100/90 shadow-2xs text-xs font-bold text-slate-700">
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

      {/* 2. 12-COLUMN MODERN GRID LAYOUT (Batas Bawah Rata Mengikuti Housekeeping dengan items-stretch) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        {/* ========================================================= */}
        {/* KOLOM KIRI (lg:col-span-4): HERO CARD & KPI OPERASIONAL */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* HERO CARD UNGU (Persis Kartu VISA Hijau di Referensi, versi Ungu Elegan Annisa) */}
          <div
            onClick={() => onNavigateTab("reports")}
            className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-950 text-white rounded-3xl p-6 shadow-xl shadow-purple-950/15 relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all duration-300 min-h-[190px]"
          >
            {/* Ornamen Glow Halus di Sudut */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-purple-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-200 block">
                  Pemasukan Hari Ini
                </span>
                <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none text-white mb-2">
                Rp 1.275.000
              </div>
              <p className="text-xs text-purple-200 font-medium">
                Sewa Kamar + Penjualan Etalase Oleh-oleh
              </p>
            </div>

            <div className="relative z-10 pt-4 mt-2 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                6/8 Kamar Terisi (75%)
              </span>
              <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-extrabold text-white">
                8 Unit
              </span>
            </div>
          </div>

          {/* KPI 1: Tiba Hari Ini (Booking WA) */}
          <div
            onClick={() => onNavigateTab("bookings")}
            className="bg-white rounded-3xl p-5 md:p-6 border border-purple-100/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Tiba Hari Ini (WA)
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  1 Tamu Booking
                </h3>
                <p className="text-xs text-purple-700 font-bold mt-0.5">
                  #B1 Hendra P. • Landing 14.30 WIT
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 transition" />
          </div>

          {/* KPI 2: Housekeeping / Kebersihan (Penentu Batas Bawah) */}
          <div
            onClick={() => onNavigateTab("matrix")}
            className="bg-white rounded-3xl p-5 md:p-6 border border-purple-100/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Housekeeping
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  1 Kamar Siap Bersih
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Kamar #A3 • Ganti Sprei &amp; Handuk
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 transition" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* KOLOM TENGAH (lg:col-span-4): GRAFIK KAPSUL & RASIO TIPE */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* GRAFIK BATANG KAPSUL 7 HARI */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Tren Okupansi 7 Hari
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Rata-rata: <span className="text-purple-700 font-bold">75.0%</span> (8 Kamar Total)
                </p>
              </div>

              {/* Pill Switcher Mingguan / Bulanan */}
              <div className="flex items-center bg-[#f4f2f8] p-0.5 rounded-full border border-purple-100 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setChartView("weekly")}
                  className={`px-3 py-1 rounded-full transition cursor-pointer ${
                    chartView === "weekly"
                      ? "bg-purple-700 text-white shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-purple-900"
                  }`}
                >
                  Mingguan
                </button>
                <button
                  type="button"
                  onClick={() => setChartView("monthly")}
                  className={`px-3 py-1 rounded-full transition cursor-pointer ${
                    chartView === "monthly"
                      ? "bg-purple-700 text-white shadow-2xs font-extrabold"
                      : "text-slate-500 hover:text-purple-900"
                  }`}
                >
                  Bulanan
                </button>
              </div>
            </div>

            {/* Visual Kapsul 7 Hari (Sen - Min) Bergaris Lembut */}
            <div className="h-36 flex items-end justify-between gap-1.5 sm:gap-2 pt-2 px-1">
              {[
                { day: "Sen", occ: 62.5, count: "5/8" },
                { day: "Sel", occ: 75.0, count: "6/8" },
                { day: "Rab", occ: 87.5, count: "7/8" },
                { day: "Kam", occ: 62.5, count: "5/8" },
                { day: "Jum", occ: 100.0, count: "8/8", highlight: true },
                { day: "Sab", occ: 87.5, count: "7/8" },
                { day: "Min", occ: 75.0, count: "6/8", today: true },
              ].map((bar) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  {/* Capsule Track & Fill */}
                  <div className="w-full max-w-[28px] h-full bg-[#f4f2f8] rounded-full p-0.5 flex flex-col justify-end overflow-hidden relative">
                    <div
                      style={{ height: `${bar.occ}%` }}
                      className={`w-full rounded-full transition-all duration-500 ${
                        bar.highlight
                          ? "bg-gradient-to-t from-purple-800 to-purple-600 shadow-md shadow-purple-900/20"
                          : bar.today
                          ? "bg-purple-700"
                          : "bg-purple-300 group-hover:bg-purple-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      bar.today ? "text-purple-900 font-black" : "text-slate-400"
                    }`}
                  >
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* STATUS KETERISIAN TIPE KAMAR (Menyesuaikan Tinggi agar Rata Bawah dengan Housekeeping) */}
          <div className="flex-1 bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
                    Rasio Keterisian Tipe
                  </h4>
                  <span className="text-sm font-extrabold text-slate-900">Distribusi Keterisian Unit</span>
                </div>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  6 / 8 Terisi
                </span>
              </div>

              {/* Tipe AC */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-700" />
                    Tipe AC (4 Unit)
                  </span>
                  <span className="text-purple-700 font-black">3 Terisi • 1 Kosong (75%)</span>
                </div>
                <div className="w-full h-3 bg-[#f4f2f8] rounded-full overflow-hidden p-0.5">
                  <div className="w-3/4 h-full bg-purple-700 rounded-full" />
                </div>
              </div>

              {/* Tipe Kipas */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Tipe Kipas (4 Unit)
                  </span>
                  <span className="text-purple-700 font-black">2 Terisi • 2 Kosong (50%)</span>
                </div>
                <div className="w-full h-3 bg-[#f4f2f8] rounded-full overflow-hidden p-0.5">
                  <div className="w-2/4 h-full bg-purple-400 rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>8 Kamar Transit Standar Sama</span>
              <span className="text-purple-700 font-bold">2 Kamar Tersedia</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* KOLOM KANAN (lg:col-span-4): ETALASE POS & AGENDA TAMU */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* WIDGET ETALASE KASIR POS / TITIP AMBIL */}
          <div
            onClick={() => onNavigateTab("pos")}
            className="bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Kasir &amp; Oleh-Oleh
                </span>
                <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none mb-1">
                Rp 285.000
              </div>
              <p className="text-xs text-slate-500 font-medium">5 Produk Terjual Hari Ini</p>
            </div>

            <div className="pt-3 mt-3 border-t border-purple-50 flex items-center justify-between text-xs">
              <span className="text-purple-700 font-extrabold">2 Titip Ambil Siap</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
            </div>
          </div>

          {/* TABEL AKTIVITAS TAMU & AGENDA HARI INI (Menyesuaikan Tinggi agar Rata Bawah dengan Housekeeping) */}
          <div className="flex-1 bg-white rounded-3xl p-6 border border-purple-100/90 shadow-2xs flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Agenda &amp; Transaksi Hari Ini
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateTab("matrix")}
                  className="text-xs font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Semua Kamar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {/* Row 1: Hendra Pratama */}
                <div className="p-3 rounded-2xl bg-[#faf9fd] border border-purple-50 flex items-center justify-between gap-2 hover:bg-purple-50/50 transition">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-purple-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                      B1
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">Hendra Pratama</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Landing 14.30 WIT • DP 50%</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleCheckIn("Hendra Pratama", "#B1")}
                    className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-[11px] h-7 px-3 shrink-0 cursor-pointer shadow-2xs"
                  >
                    Check-In
                  </Button>
                </div>

                {/* Row 2: Budi Santoso */}
                <div className="p-3 rounded-2xl bg-[#faf9fd] border border-purple-50 flex items-center justify-between gap-2 hover:bg-purple-50/50 transition">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center shrink-0 border border-purple-200/60">
                      A2
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">Budi Santoso</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Maks 12.00 WIT • Lunas</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCheckOut("Budi Santoso", "#A2")}
                    className="rounded-full border border-purple-200 bg-white hover:bg-purple-50 text-purple-900 font-bold text-[11px] h-7 px-3 shrink-0 cursor-pointer"
                  >
                    Check-Out
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-[11px] text-slate-400">
              <span>Status Pembayaran Terverifikasi</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Resepsionis Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
