"use client";

import { Bed, Calendar, PhoneCall, Sparkles, Wind } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function ChannelDistributionCard() {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
      <div>
        <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
          Peminatan Tipe &amp; Saluran
        </h3>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Perbandingan keterisian tipe kamar dan saluran pemesanan
        </p>
      </div>

      {/* 2 Blok Distribusi Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* 1. Tipe Kamar */}
        <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-purple-950 flex items-center gap-1">
              <Bed className="w-3 h-3 text-purple-700" />
              <span>Tipe Kamar</span>
            </span>
            <span className="text-[9px] font-bold text-slate-500">
              8 Unit Total
            </span>
          </div>

          <div className="space-y-1 pt-0.5">
            {/* Tipe AC */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-0.5">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Wind className="w-2.5 h-2.5 text-purple-600" />
                  <span>Kamar AC</span>
                </span>
                <span className="text-[10px] font-black text-purple-950">
                  3/4 (75%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-purple-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-700 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            {/* Tipe Kipas */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-0.5">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  <span>Kamar Kipas</span>
                </span>
                <span className="text-[10px] font-black text-purple-950">
                  2/4 (50%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Saluran Pemesanan */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-emerald-950 flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-700" />
              <span>Saluran Tamu</span>
            </span>
            <span className="text-[9px] font-bold text-emerald-800">
              5 Tamu
            </span>
          </div>

          <div className="space-y-1 pt-0.5">
            {/* WhatsApp */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-0.5">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <FaWhatsapp className="w-2.5 h-2.5 text-emerald-600" />
                  <span>Booking WA</span>
                </span>
                <span className="text-[10px] font-black text-emerald-950">
                  3 (60%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-emerald-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
            </div>

            {/* Walk-in */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-0.5">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-blue-600" />
                  <span>Walk-In</span>
                </span>
                <span className="text-[10px] font-black text-blue-950">
                  2 (40%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
