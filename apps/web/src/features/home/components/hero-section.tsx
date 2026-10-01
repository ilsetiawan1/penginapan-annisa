import { HeroContent, HeroFloatingCards } from "./hero";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90dvh] sm:min-h-[100dvh] lg:h-[100dvh] bg-white overflow-hidden flex flex-col justify-center lg:justify-between select-none">
      {/* Latar Belakang Peta dengan hero-section.png & Pola Grid Halus */}
      <div className="absolute inset-0 map-canvas-bg z-0 pointer-events-none" />
      <div className="absolute inset-0 map-grid-overlay z-0 pointer-events-none" />

      {/* Smooth Bottom Fade Transition to next section (#faf9fc) */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/60 to-transparent pointer-events-none z-10" />

      {/* HEADER / HERO CONTENT (Judul, Subtitle, CTA Button) */}
      <HeroContent />

      {/* AREA FLOATING CARDS (Hanya tampil di Desktop/Layar Lebar) */}
      <HeroFloatingCards />
    </section>
  );
}
