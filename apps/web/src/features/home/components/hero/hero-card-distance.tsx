import { MapPin } from "lucide-react";

export function HeroCardDistance() {
  return (
    <div className="card-float-item animate-float-1 w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[240px] transition-transform duration-300 hover:scale-[1.03]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-card border border-white/80">
        <div className="flex items-center justify-between mb-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-glow">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-extrabold uppercase tracking-wide">
            Jarak Dekat
          </span>
        </div>

        <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-tight">750 Meter</h2>
        <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Bandara ke Penginapan</p>
        <p className="text-[10px] text-slate-500 mt-1 leading-snug">
          Sangat dekat, langsung istirahat tanpa perjalanan panjang.
        </p>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-slate-600 text-[10px] font-semibold">
          <span className="inline-flex items-center gap-1">🚗 ±2 Menit</span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1">🚶 ±8 Menit</span>
        </div>
      </div>
    </div>
  );
}
