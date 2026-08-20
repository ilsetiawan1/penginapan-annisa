import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { HeroSection } from "../features/public/home/components/hero-section";
import { BookingProcessSection } from "../features/public/home/components/booking-process-section";
import { HomeRoomsPreview } from "../features/public/home/components/home-rooms-preview";
import { HomeSouvenirsPreview } from "../features/public/home/components/home-souvenirs-preview";
import { FaqSection } from "../features/public/home/components/faq-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      <main className="w-full flex flex-col">
        {/* ====================================================
            BLOCK 1: HERO SECTION & BOOKING FORM (100vh on Desktop)
            Background: Pattimura Airport Hero with Ambient Dark Overlay
            ==================================================== */}
        <HeroSection />

        {/* ====================================================
            BLOCK 1.5: 3-STEP BOOKING PROCESS (Curved Wave Timeline)
            ==================================================== */}
        <BookingProcessSection />

        {/* ====================================================
            BLOCK 2: PILIHAN UNIT KAMAR TRANSIT (Natural Flow)
            Background: Clean Canvas (#faf9fc)
            ==================================================== */}
        <section className="relative w-full bg-[#faf9fc] pb-12 sm:pb-16 px-4">
          <div className="max-w-6xl mx-auto w-full">
            <HomeRoomsPreview />
          </div>
        </section>

        {/* ====================================================
            BLOCK 3: ETALASE OLEH-OLEH + BANTUAN FAQ (Natural Flow)
            Background: Smooth Lavender #D8B4FE Ambient Mix Blur Gradient
            ==================================================== */}
        <section className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#d8b4fe]/30 via-40% via-[#d8b4fe]/40 via-60% to-[#faf9fc] py-12 sm:py-16 px-4 overflow-hidden">
          {/* Ambient Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[300px] sm:h-[420px] bg-[#d8b4fe]/35 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto w-full space-y-8 sm:space-y-10 relative z-10">
            <HomeSouvenirsPreview />
            <FaqSection />
          </div>
        </section>
      </main>

      {/* ====================================================
          BLOCK 4: UNIFIED FOOTER (LOCATION, MAPS & COPYRIGHT)
          ==================================================== */}
      <Footer />
    </div>
  );
}
