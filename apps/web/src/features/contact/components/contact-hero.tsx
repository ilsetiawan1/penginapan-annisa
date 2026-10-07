import { MapPin, Navigation } from "lucide-react";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative w-full h-[280px] sm:h-[320px] md:h-[320px] lg:h-[330px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/heroes/contact-hero.webp"
        alt="Lanskap Ambon - Penginapan Annisa"
        fill
        className="object-cover"
        priority
      />
      {/* Light Phantom Standard Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c]/70 via-[#1c1c1c]/45 to-[#fdfcfe] backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-10 sm:pt-12">
        {/* Badge Atas */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-normal tracking-wide uppercase mb-2 sm:mb-2.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-white/90" />
          <span>PENGINAPAN ANNISA AMBON</span>
        </div>

        {/* Headline Sans-Serif */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.025em] text-white leading-tight text-center">
          Hubungi Kami
        </h1>

        {/* Subheadline */}
        <p className="text-xs sm:text-sm text-white/90 max-w-lg mx-auto mt-1.5 font-normal text-center leading-relaxed">
          Hanya 750 meter atau 2–3 menit dari Bandara Pattimura. Resepsionis kami siap melayani
          reservasi dan pertanyaan Anda.
        </p>

        {/* Tombol Aksi Buka Google Maps */}
        <div className="flex items-center justify-center mt-3.5 sm:mt-4">
          <a
            href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
            target="_blank"
            rel="noreferrer"
            className="w-fit h-9 px-5 sm:px-6 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs font-normal inline-flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-white/90" />
            <span>Buka Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
