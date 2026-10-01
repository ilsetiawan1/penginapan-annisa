import { ExternalLink, MapPin, Navigation, Plane } from "lucide-react";
import Image from "next/image";

export type HeroCardType = "distance" | "airport" | "route";

interface HeroCardProps {
  type: HeroCardType;
  className?: string;
}

export function HeroCard({ type, className = "" }: HeroCardProps) {
  if (type === "distance") {
    return (
      <div
        className={`card-float-item animate-float-1 w-full max-w-[240px] transition-transform duration-300 hover:scale-[1.03] ${className}`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-card border border-white/80">
          <div className="flex items-center justify-between mb-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-glow">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-extrabold uppercase tracking-wide">
              Jarak Dekat
            </span>
          </div>

          <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-tight">
            750 Meter
          </h2>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">
            Bandara ke Penginapan
          </p>
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

  if (type === "airport") {
    return (
      <div
        className={`card-float-item animate-float-2 w-full max-w-[250px] transition-transform duration-300 hover:scale-[1.03] ${className}`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-card border border-white/80">
          <div className="relative w-full h-20 sm:h-22 rounded-xl overflow-hidden mb-2 bg-slate-100">
            <Image
              src="/home/bg-pattimura-airport.jpg"
              alt="Bandara Internasional Pattimura Ambon"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute top-1.5 right-1.5 bg-slate-900/85 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8.5px] font-semibold text-white flex items-center gap-1">
              <Plane className="w-2.5 h-2.5 text-sky-400" />
              <span>Bandara</span>
            </span>
          </div>

          <div className="px-0.5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xs text-slate-900 truncate">
                Bandara Pattimura
              </h2>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 text-[8.5px] font-bold border border-amber-200">
                AMQ
              </span>
            </div>
            <p className="text-[9.5px] text-slate-600 font-medium truncate">
              Laha, Teluk Ambon, Maluku
            </p>

            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Titik Jemput
              </span>
              <span className="text-slate-500 font-medium">Paling Terdekat</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Type === "route"
  return (
    <div
      className={`card-float-item animate-float-3 w-full max-w-[240px] transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-card border border-white/80">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Navigation className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-xs">
              Petunjuk Arah Rute
            </h2>
            <span className="text-[9.5px] text-slate-500 block leading-tight">
              Navigasi Langsung
            </span>
          </div>
        </div>

        <p className="text-[10px] text-slate-600 mb-2.5 leading-snug">
          Buka panduan rute akurat dari Bandara langsung ke penginapan.
        </p>

        <a
          href="https://maps.app.goo.gl/7Cj1A5xjo5JQp3ZA9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka rute navigasi Google Maps ke Penginapan Annisa"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-black text-white text-[10.5px] font-semibold py-2 px-3 rounded-xl transition shadow-sm hover:shadow-md active:scale-95 group"
        >
          <span>Buka Google Maps</span>
          <ExternalLink className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </a>
      </div>
    </div>
  );
}
