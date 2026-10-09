import { Navigation } from "lucide-react";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative w-full h-[280px] sm:h-[320px] md:h-[320px] lg:h-[330px] flex items-center justify-center overflow-hidden bg-[#1c1a24]">
      <Image
        src="/images/heroes/contact-hero.webp"
        alt="Lanskap Ambon - Penginapan Annisa"
        fill
        className="object-cover"
        priority
      />
      {/* Top dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c]/75 via-[#1c1c1c]/45 to-transparent pointer-events-none" />

      {/* Seamless bottom fade transition to canvas (#fdfcfe) eliminating all lines/seams */}
      <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-gradient-to-t from-[#fdfcfe] via-[#fdfcfe]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-10 sm:pt-12">
        {/* Headline Sans-Serif */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.025em] text-white leading-tight text-center">
          Hubungi Kami
        </h1>

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
