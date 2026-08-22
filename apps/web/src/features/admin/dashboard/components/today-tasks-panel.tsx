"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  LogOut,
  Sparkles,
} from "lucide-react";

interface TodayTasksPanelProps {
  onNavigateTab: (tab: string) => void;
}

export function TodayTasksPanel({ onNavigateTab }: TodayTasksPanelProps) {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
          Checklist Tugas Hari Ini
        </h3>

        <button
          type="button"
          onClick={() => onNavigateTab("matrix")}
          className="text-[11px] font-black text-purple-700 hover:text-purple-900 flex items-center gap-0.5 hover:underline cursor-pointer"
        >
          <span>Status Kamar</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
        {/* 1. Tamu Tiba Hari Ini */}
        <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-2.5 sm:p-3 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-purple-950 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-700" />
                <span>Kedatangan</span>
              </span>
              <span className="bg-purple-700 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md">
                1 Booking WA
              </span>
            </div>

            <div className="bg-white rounded-lg p-2 border border-purple-100 space-y-0.5 text-xs">
              <div className="flex items-center justify-between font-extrabold text-slate-900">
                <span>Hendra Pratama</span>
                <span className="text-purple-700 font-black">#B1</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Landing 14.30 WIT</span>
                <span className="text-emerald-700 font-bold">DP Masuk</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="w-full py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-black text-[11px] transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Pelunasan &amp; Check-In (#B1)</span>
          </button>
        </div>

        {/* 2. Jadwal Check-Out Hari Ini */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 sm:p-3 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-blue-950 uppercase tracking-wider flex items-center gap-1">
                <LogOut className="w-3 h-3 text-blue-700" />
                <span>Check-Out</span>
              </span>
              <span className="bg-blue-700 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md">
                1 Kamar
              </span>
            </div>

            <div className="bg-white rounded-lg p-2 border border-blue-100 space-y-0.5 text-xs">
              <div className="flex items-center justify-between font-extrabold text-slate-900">
                <span>Budi Santoso</span>
                <span className="text-blue-700 font-black">#A2</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Maks 12.00 WIT</span>
                <span className="text-emerald-700 font-bold">Lunas 100%</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
          >
            <LogOut className="w-3 h-3" />
            <span>Proses Check-Out (#A2)</span>
          </button>
        </div>

        {/* 3. Tugas Housekeeping Bersih Kamar */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 sm:p-3 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Housekeeping</span>
              </span>
              <span className="bg-amber-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-md">
                1 Kotor
              </span>
            </div>

            <div className="bg-white rounded-lg p-2 border border-amber-100 space-y-0.5 text-xs">
              <div className="flex items-center justify-between font-extrabold text-slate-900">
                <span>Kamar #A3 (Kipas)</span>
                <span className="text-amber-700 font-black">Perlu Bersih</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">
                Ganti sprei &amp; cuci kamar mandi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-black text-[11px] transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
          >
            <Sparkles className="w-3 h-3" />
            <span>Tandai Bersih (#A3)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
