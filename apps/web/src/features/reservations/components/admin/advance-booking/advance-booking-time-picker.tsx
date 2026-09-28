"use client";

import { Clock } from "lucide-react";

interface AdvanceBookingTimePickerProps {
  landingTime: string;
  setLandingTime: (val: string) => void;
}

const PRESET_TIMES = [
  { time: "14:30", label: "14.30 Siang" },
  { time: "18:00", label: "18.00 Sore" },
  { time: "21:00", label: "21.00 Malam" },
  { time: "06:00", label: "06.00 Subuh" },
];

export function AdvanceBookingTimePicker({
  landingTime,
  setLandingTime,
}: AdvanceBookingTimePickerProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor="adv-landing-time"
          className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
        >
          Estimasi Jam Tiba / Landing (Opsional)
        </label>
        <span className="text-[9px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
          {landingTime
            ? `Landing ${landingTime.replace(":", ".")} WIT`
            : "Belum Ditentukan (Bebas)"}
        </span>
      </div>

      <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5 transition">
        <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
        <input
          id="adv-landing-time"
          type="time"
          value={landingTime}
          onChange={(e) => setLandingTime(e.target.value)}
          className="bg-transparent text-xs font-black text-slate-900 outline-none cursor-pointer flex-1"
        />
        <span className="text-[10px] font-black text-purple-900 bg-purple-100/90 px-2 py-0.5 rounded-md border border-purple-200 shrink-0">
          WIT
        </span>
        {landingTime && (
          <button
            type="button"
            onClick={() => setLandingTime("")}
            className="text-[10px] font-black text-slate-400 hover:text-rose-600 px-1 transition cursor-pointer"
            title="Kosongkan jam tiba (opsional)"
          >
            ✕
          </button>
        )}
      </div>

      {/* Preset Pilihan Jam Landing Cepat */}
      <div className="flex flex-wrap items-center gap-1 pt-0.5">
        <span className="text-[9px] text-slate-400 font-bold shrink-0">Preset Cepat:</span>
        {PRESET_TIMES.map((preset) => (
          <button
            key={preset.time}
            type="button"
            onClick={() => setLandingTime(preset.time)}
            className={`text-[9px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
              landingTime === preset.time
                ? "bg-purple-700 text-white border-purple-700 shadow-2xs"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {preset.label}
          </button>
        ))}
        {landingTime && (
          <button
            type="button"
            onClick={() => setLandingTime("")}
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-md text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            Hapus Jam
          </button>
        )}
      </div>
    </div>
  );
}
