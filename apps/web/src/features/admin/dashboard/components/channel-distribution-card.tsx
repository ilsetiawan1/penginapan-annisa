"use client";

import { Bed, Calendar, PhoneCall, Sparkles, Wind } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export function ChannelDistributionCard() {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
      <div>
        <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider block">
          DISTRIBUSI OPERASIONAL
        </span>
        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
          Peminatan Tipe Kamar &amp; Saluran
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Performa okupansi berdasarkan tipe unit dan cara pemesanan tamu
        </p>
      </div>

      {/* 2 Blok Distribusi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 1. Tipe Kamar (AC Dingin vs Kipas Angin) */}
        <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-purple-950 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-purple-700" />
              <span>Tipe Kamar</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500">8 Unit Total</span>
          </div>

          <div className="space-y-1.5 pt-1">
            {/* Tipe AC */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Wind className="w-3 h-3 text-purple-600" />
                  <span>Kamar Tipe AC</span>
                </span>
                <span className="text-xs font-black text-purple-950">3/4 Terisi (75%)</span>
              </div>
              <div className="w-full h-2 bg-purple-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-purple-700 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>

            {/* Tipe Kipas */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Kamar Tipe Kipas</span>
                </span>
                <span className="text-xs font-black text-purple-950">2/4 Terisi (50%)</span>
              </div>
              <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Saluran Pemesanan (Walk-In vs WhatsApp) */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-emerald-950 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>Saluran Tamu</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800">5 Reservasi Aktif</span>
          </div>

          <div className="space-y-1.5 pt-1">
            {/* WhatsApp Booking */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <FaWhatsapp className="w-3 h-3 text-emerald-600" />
                  <span>Booking via WhatsApp</span>
                </span>
                <span className="text-xs font-black text-emerald-950">3 Tamu (60%)</span>
              </div>
              <div className="w-full h-2 bg-emerald-200/70 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>

            {/* Langsung di Lokasi (Walk-in) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-700 font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span>Datang Langsung (Walk-In)</span>
                </span>
                <span className="text-xs font-black text-blue-950">2 Tamu (40%)</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
