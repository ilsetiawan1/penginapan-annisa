"use client";

import {
  ArrowRight,
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
  LogOut,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

interface TodayTasksPanelProps {
  onNavigateTab: (tab: string) => void;
}

export function TodayTasksPanel({ onNavigateTab }: TodayTasksPanelProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider block">
            AGENDA OPERASIONAL HARI INI
          </span>
          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
            Checklist Tugas Resepsionis &amp; Housekeeping
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab("matrix")}
          className="text-xs font-black text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>Buka Status Kamar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Tamu Check-In / Booking Tiba Hari Ini */}
        <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-purple-950 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-700" />
                <span>Kedatangan Hari Ini</span>
              </span>
              <span className="bg-purple-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                1 Booking WA
              </span>
            </div>

            <div className="bg-white rounded-xl p-2.5 border border-purple-100 space-y-1 text-xs">
              <div className="flex items-center justify-between font-extrabold text-slate-900">
                <span>Hendra Pratama</span>
                <span className="text-purple-700 font-black">Kamar #B1</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Estimasi Landing: 14.30 WIT</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                  DP 50% Masuk
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="w-full py-1.5 mt-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pelunasan &amp; Check-In (#B1)</span>
          </button>
        </div>

        {/* 2. Tamu Jadwal Check-Out Hari Ini */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-blue-950 uppercase tracking-wider flex items-center gap-1">
                <LogOut className="w-3 h-3 text-blue-700" />
                <span>Jadwal Check-Out</span>
              </span>
              <span className="bg-blue-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                1 Kamar
              </span>
            </div>

            <div className="bg-white rounded-xl p-2.5 border border-blue-100 space-y-1 text-xs">
              <div className="flex items-center justify-between font-extrabold text-slate-900">
                <span>Budi Santoso</span>
                <span className="text-blue-700 font-black">Kamar #A2</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Batas: 12.00 WIT</span>
                <span className="text-emerald-700 font-bold">Lunas 100% (Rp 0)</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="w-full py-1.5 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Proses Check-Out (#A2)</span>
          </button>
        </div>

        {/* 3. Tugas Housekeeping Bersih Kamar */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Tugas Housekeeping</span>
              </span>
              <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                1 Kamar Kotor
              </span>
            </div>

            <div className="bg-white rounded-xl p-2.5 border border-amber-100 space-y-1 text-xs">
              <div className="flex items-center justify-between font-extrabold text-slate-900">
                <span>Kamar #A3 (Tipe Kipas)</span>
                <span className="text-amber-700 font-black">Perlu Bersih</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Ganti sprei kasur besar &amp; cuci kamar mandi dalam
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="w-full py-1.5 mt-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tandai Bersih (#A3)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
