import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto lg:my-0 pt-20 sm:pt-28 md:pt-32 lg:pt-36 pb-12 lg:pb-0 px-4 max-w-4xl mx-auto">
      {/* Headline (Menggunakan Font Serif Elegant) */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-black tracking-tight text-slate-950 max-w-2xl sm:max-w-3xl leading-[1.25]">
        Hanya 750 Meter dari Bandara Pattimura ke Penginapan
      </h1>

      {/* Deskripsi Singkat */}
      <p className="mt-3.5 sm:mt-4 text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xs sm:max-w-md md:max-w-xl leading-relaxed">
        Akses super dekat, praktis, dan bebas macet langsung dari Bandara Internasional Pattimura Ambon.
      </p>

      {/* CTA Button: Lihat Kamar dengan animasi bounce */}
      <div className="mt-6 sm:mt-8 animate-bounce">
        <Link
          href="/rooms"
          aria-label="Lihat pilihan unit kamar transit"
          className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group border border-slate-800"
        >
          <span>Lihat Kamar</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
