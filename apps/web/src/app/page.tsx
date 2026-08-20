import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { HeroSection } from "../features/public/home/components/hero-section";
import { ValuesSection } from "../features/public/home/components/values-section";
import { HomeRoomsPreview } from "../features/public/home/components/home-rooms-preview";
import { HomeSouvenirsPreview } from "../features/public/home/components/home-souvenirs-preview";
import { FaqSection } from "../features/public/home/components/faq-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      <main className="w-full flex flex-col">
        {/* ====================================================
            BLOCK 1: HERO SECTION & BOOKING CALCULATOR (100vh on Desktop)
            Background: Clean White Canvas (#faf9fc)
            ==================================================== */}
        <HeroSection />

        {/* ====================================================
            BLOCK 2: KEUNGGULAN + PILIHAN UNIT (100vh on Desktop Large)
            Background: Soft Purple Atmosphere with Gradient Blur
            ==================================================== */}
        <section className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#f1eaff] via-15% via-[#f1eaff] via-85% to-[#faf9fc] py-10 sm:py-14 xl:min-h-screen xl:h-screen xl:py-0 flex flex-col justify-center px-4">
          <div className="max-w-6xl mx-auto w-full">
            <ValuesSection />
            <HomeRoomsPreview />
          </div>
        </section>

        {/* ====================================================
            BLOCK 3: ETALASE OLEH-OLEH + BANTUAN FAQ (100vh on Desktop Large)
            Background: Clean White Canvas (#faf9fc)
            ==================================================== */}
        <section className="relative w-full bg-[#faf9fc] py-10 sm:py-14 xl:min-h-screen xl:h-screen xl:py-0 flex flex-col justify-center px-4">
          <div className="max-w-6xl mx-auto w-full space-y-6 sm:space-y-8">
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
