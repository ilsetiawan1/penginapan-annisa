import { ExternalLink, Navigation } from "lucide-react";

export function HeroCardRoute() {
  return (
    <div className="card-float-item animate-float-3 w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[240px] transition-transform duration-300 hover:scale-[1.03]">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-card border border-white/80">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Navigation className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-xs">Petunjuk Arah Rute</h2>
            <span className="text-[9.5px] text-slate-500 block leading-tight">Navigasi Langsung</span>
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
