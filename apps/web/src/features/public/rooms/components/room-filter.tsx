"use client";

import { Calendar, Moon } from "lucide-react";

interface RoomFilterProps {
  checkInDate: string;
  onCheckInDateChange: (date: string) => void;
  nights: number;
  onNightsChange: (nights: number) => void;
  activeFilter: "all" | "ac" | "kipas" | "tersedia";
  onFilterChange: (filter: "all" | "ac" | "kipas" | "tersedia") => void;
}

export function RoomFilter({
  checkInDate,
  onCheckInDateChange,
  nights,
  onNightsChange,
  activeFilter,
  onFilterChange,
}: RoomFilterProps) {
  const formattedDate = checkInDate
    ? new Date(checkInDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Pilih Tanggal";

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-4xl mx-auto px-3 sm:px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-xl border border-white/80 space-y-2 sm:space-y-3">
        {/* Baris 1: Date & Duration (2 Kolom Berdampingan dengan Desain Modern Traveloka/Airbnb Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
          {/* Box Tanggal Check-In */}
          <div className="relative bg-slate-50 border border-slate-200/90 rounded-2xl px-3 py-1.5 focus-within:border-purple-600 transition flex items-center justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                TGL CHECK-IN
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                {formattedDate}
              </span>
            </div>
            <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
            <input
              id="kamar-checkin-date"
              type="date"
              value={checkInDate}
              onChange={(e) => onCheckInDateChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
          </div>

          {/* Box Lama Menginap */}
          <div className="relative bg-slate-50 border border-slate-200/90 rounded-2xl px-3 py-1.5 focus-within:border-purple-600 transition flex items-center justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                LAMA MENGINAP
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                {nights} Malam {nights === 1 ? "(Transit)" : ""}
              </span>
            </div>
            <Moon className="w-4 h-4 text-purple-700 shrink-0" />
            <select
              id="kamar-nights"
              value={nights}
              onChange={(e) => onNightsChange(Number(e.target.value))}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            >
              <option value={1}>1 Malam (Transit)</option>
              <option value={2}>2 Malam</option>
              <option value={3}>3 Malam</option>
              <option value={4}>4 Malam</option>
              <option value={5}>5 Malam</option>
            </select>
          </div>

          {/* Indikator DP 50% (Hanya tampil di tablet/desktop agar tampilan mobile sangat ringkas) */}
          <div className="hidden sm:flex bg-purple-50/80 border border-purple-100 rounded-2xl p-2 text-center flex-col justify-center">
            <span className="text-[10px] font-bold text-purple-700 block">
              DP Otomatis: <strong>50% Transfer</strong>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Pelunasan 50% saat tiba di lokasi
            </span>
          </div>
        </div>

        {/* Baris 2: Filter Kategori Tipe Kamar (Horizontal Scrollable Strip) */}
        <div className="flex items-center gap-1.5 pt-0.5 border-t border-slate-100/90 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:text-purple-700"
            }`}
          >
            Semua (8 Unit)
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("ac")}
            className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === "ac"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:text-purple-700"
            }`}
          >
            Tipe AC (Rp 275rb)
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("kipas")}
            className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === "kipas"
                ? "bg-purple-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:text-purple-700"
            }`}
          >
            Tipe Kipas (Rp 200rb)
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("tersedia")}
            className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === "tersedia"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            🟢 Siap Dipesan
          </button>
        </div>
      </div>
    </section>
  );
}
