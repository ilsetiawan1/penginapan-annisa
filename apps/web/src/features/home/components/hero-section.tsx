"use client";

import { useHeroActions } from "@/features/home/hooks";
import { ArrowRight, Navigation } from "lucide-react";
import Image from "next/image";
import { TimelineDesktop, TimelineMobile } from "./timeline";

export function HeroSection() {
  const { handleScrollToRooms } = useHeroActions();

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-48 md:pb-32 lg:pt-52 lg:pb-36 overflow-hidden">
      {/* Background Image: home-hero.webp */}
      <Image
        src="/images/heroes/home-hero.webp"
        alt="Pantai Ambon & Transit Bandara Pattimura"
        fill
        priority
        className="object-cover object-center pointer-events-none"
      />

      {/* Light Phantom Soft Frosted Overlay for text readability */}
      <div className="absolute inset-0 bg-white/70 sm:bg-white/60 pointer-events-none" />

      {/* Ambient Soft Lavender Glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#e2dffe]/35 rounded-full blur-3xl select-none" />

      {/* Seamless Bottom Fade Transition to next section (#fdfcfe) */}
      <div className="absolute inset-x-0 -bottom-1 h-36 sm:h-48 bg-gradient-to-t from-[#fdfcfe] via-[#fdfcfe]/90 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10 w-full my-auto">
        {/* 1. Headline Utama */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.025em] text-[#1c1c1c] leading-[1.12] max-w-4xl text-center">
          Transit Praktis &amp; Istirahat Tenang Dekat Bandara.
        </h1>

        {/* 2. Subheadline (Disembunyikan di Mobile, Tampil di Tablet dan Desktop) */}
        <p className="hidden sm:block text-sm md:text-sm lg:text-base text-[#86848d] mt-5 max-w-xl sm:max-w-3xl md:max-w-3xl lg:max-w-4xl leading-relaxed text-center font-normal">
          <span className="sm:block">
            Pilihan hunian transit 2–3 menit dari Bandara Pattimura Ambon.{" "}
          </span>
          <span className="sm:block">
            Kamar bersih siap pakai, pendingin ruangan, kamar mandi dalam, dan pemesanan instan via
            WhatsApp.
          </span>
        </p>

        {/* 3. Tombol Aksi (Eksplorasi Pilihan Kamar & Buka Google Maps) */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleScrollToRooms}
            aria-label="Eksplorasi pilihan kamar transit"
            className="h-11 px-8 py-3 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white text-sm font-normal shadow-[0px_0px_16px_rgba(226,223,254,0.9)] inline-flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Eksplorasi Pilihan Kamar</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka Google Maps ke Penginapan Annisa"
            className="h-11 px-6 rounded-full border border-white/60 bg-white/20 hover:bg-white/35 backdrop-blur-md text-[#1c1c1c] text-sm font-normal shadow-xs transition-all duration-200 inline-flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Navigation className="w-4 h-4 text-[#3c315b]" />
            <span>Buka Google Maps</span>
          </a>
        </div>

        {/* 4. Komponen Alur Reservasi: Desktop & Mobile terpisah */}
        <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-16">
          <TimelineDesktop />
          <TimelineMobile />
        </div>
      </div>
    </section>
  );
}
