import { HeroContent, HeroFloatingCards, HeroScrollDown } from "./hero";

export function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] bg-white overflow-hidden flex flex-col justify-between select-none">
      {/* Latar Belakang Peta dengan hero-section.png & Pola Grid Halus */}
      <div className="absolute inset-0 map-canvas-bg z-0 pointer-events-none" />
      <div className="absolute inset-0 map-grid-overlay z-0 pointer-events-none" />

      {/* Smooth Bottom Fade Transition to next section (#faf9fc) */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/60 to-transparent pointer-events-none z-10" />

      {/* MAIN CONTAINER: Split 2-Kolom di Tablet & Desktop (Teks Kiri, Kartu Kanan) */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between pt-16 md:pt-20 pb-20 md:pb-12 gap-6 lg:gap-10">
        {/* KOLOM KIRI: Teks & CTA (Center di mobile, Kiri di tablet & desktop) */}
        <HeroContent />

        {/* KOLOM KANAN: Floating Cards (Hidden di mobile, Kanan di tablet & desktop) */}
        <HeroFloatingCards />
      </div>

      {/* TOMBOL SCROLL DOWN (Bounce halus, auto-scroll ke pilihan kamar, hilang saat scroll manual) */}
      <HeroScrollDown />
    </section>
  );
}
