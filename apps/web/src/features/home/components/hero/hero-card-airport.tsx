import { Plane } from "lucide-react";
import Image from "next/image";

export function HeroCardAirport() {
  return (
    <div className="card-float-item animate-float-2 w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[250px] transition-transform duration-300 hover:scale-[1.03]">
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
            <h2 className="font-bold text-xs text-slate-900 truncate">Bandara Pattimura</h2>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 text-[8.5px] font-bold border border-amber-200">
              AMQ
            </span>
          </div>
          <p className="text-[9.5px] text-slate-600 font-medium truncate">Laha, Teluk Ambon, Maluku</p>

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
