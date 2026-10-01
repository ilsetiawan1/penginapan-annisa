import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left my-auto md:my-0 w-full md:w-1/2 lg:w-5/12 max-w-xl md:max-w-none">
      {/* Headline (Menggunakan Font Serif Elegant) */}
      <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-950 leading-[1.22] md:leading-[1.18]">
        Hanya 750 Meter dari Bandara Pattimura ke Penginapan
      </h1>

      {/* Deskripsi Singkat */}
      <p className="mt-3.5 sm:mt-4 text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xs sm:max-w-md md:max-w-lg leading-relaxed">
        Akses super dekat, praktis, dan bebas macet langsung dari Bandara Internasional Pattimura Ambon.
      </p>

      {/* CTA Button: Lihat Kamar */}
      <div className="mt-6 sm:mt-8">
        <Link
          href="/rooms"
          aria-label="Lihat pilihan unit kamar transit"
          className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 group border border-slate-800"
        >
          <span>Lihat Kamar</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
