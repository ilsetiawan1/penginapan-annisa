"use client";

import { Calendar, Moon, Sparkles } from "lucide-react";

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
  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-4xl mx-auto px-3 sm:px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-4 shadow-xl border border-white/80 space-y-3">
        {/* Baris 1: Pemilih Tanggal Check-In & Lama Menginap (Estimator Booking) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
          {/* Input Tanggal Check-In */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-1.5 focus-within:border-purple-600 transition">
            <label
              htmlFor="kamar-checkin-date"
              className="text-[10px] font-black text-slate-400 uppercase tracking-wider block"
            >
              📅 Rencana Check-In
            </label>
            <input
              id="kamar-checkin-date"
              type="date"
              value={checkInDate}
              onChange={(e) => onCheckInDateChange(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 outline-none cursor-pointer"
            />
          </div>

          {/* Selector Lama Menginap */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-1.5 focus-within:border-purple-600 transition">
            <label
              htmlFor="kamar-nights"
              className="text-[10px] font-black text-slate-400 uppercase tracking-wider block"
            >
              🌙 Lama Menginap
            </label>
            <select
              id="kamar-nights"
              value={nights}
              onChange={(e) => onNightsChange(Number(e.target.value))}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 outline-none cursor-pointer"
            >
              <option value={1}>1 Malam (Transit)</option>
              <option value={2}>2 Malam</option>
              <option value={3}>3 Malam</option>
              <option value={4}>4 Malam</option>
              <option value={5}>5 Malam</option>
            </select>
          </div>

          {/* Indikator Estimasi Cepat */}
          <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-2 sm:p-2.5 text-center flex flex-col justify-center">
            <span className="text-[10px] font-bold text-purple-700 block">
              DP Otomatis: <strong>50% Transfer</strong>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Pelunasan 50% saat tiba di lokasi
            </span>
          </div>
        </div>

        {/* Baris 2: Filter Kategori Tipe Kamar */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
            Pilihan Tipe Kamar:
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => onFilterChange("all")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === "tersedia"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              🟢 Siap Dipesan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
