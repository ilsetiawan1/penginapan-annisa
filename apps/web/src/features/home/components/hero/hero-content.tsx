import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left my-auto md:my-0 w-full md:w-1/2 lg:w-5/12 max-w-xl md:max-w-none">
      {/* Subtle Location Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ede8f8] text-[#594791] border border-[#ddd3f3] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-3">
        <span>Lokasi Strategis</span>
        <span className="text-[#7a68b7]">•</span>
        <span>Dekat Bandara</span>
      </div>

      {/* Headline (Menggunakan Font Serif Elegant) */}
      <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-950 leading-[1.22] md:leading-[1.18]">
        Hanya 750 Meter dari Bandara Pattimura ke Penginapan
      </h1>

      {/* Deskripsi Singkat */}
      <p className="mt-3.5 sm:mt-4 text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xs sm:max-w-md md:max-w-lg leading-relaxed">
        Akses super dekat, praktis, dan bebas macet langsung dari Bandara Internasional Pattimura Ambon.
      </p>

      {/* CTA Button: Lihat Kamar (Warna Lavender Selaras Navbar) */}
      <div className="mt-6 sm:mt-8">
        <Link
          href="/rooms"
          aria-label="Lihat pilihan unit kamar transit"
          className="inline-flex items-center gap-2.5 bg-[#7a68b7] hover:bg-[#6c59aa] text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-full shadow-lg shadow-[#7a68b7]/25 hover:shadow-xl hover:shadow-[#7a68b7]/30 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 group border border-[#6c59aa]/40 cursor-pointer"
        >
          <span>Lihat Kamar</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
