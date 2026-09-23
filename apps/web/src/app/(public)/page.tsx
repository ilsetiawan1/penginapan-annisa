import { BookingProcessSection } from "@/features/public/home/components/booking-process-section";
import { FaqSection } from "@/features/public/home/components/faq-section";
import { HeroSection } from "@/features/public/home/components/hero-section";
import { HomeRoomsPreview } from "@/features/public/home/components/home-rooms-preview";
import { HomeSouvenirsPreview } from "@/features/public/home/components/home-souvenirs-preview";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION & BOOKING FORM */}
      <HeroSection />

      {/* 2. 3-STEP BOOKING PROCESS */}
      <BookingProcessSection />

      {/* 3. PILIHAN UNIT KAMAR TRANSIT */}
      <section className="relative w-full bg-[#faf9fc] pb-12 sm:pb-16 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <HomeRoomsPreview />
        </div>
      </section>

      {/* 4. ETALASE OLEH-OLEH + BANTUAN FAQ */}
      <section className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#d8b4fe]/30 via-40% via-[#d8b4fe]/40 via-60% to-[#faf9fc] py-12 sm:py-16 px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[300px] sm:h-[420px] bg-[#d8b4fe]/35 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto w-full space-y-8 sm:space-y-10 relative z-10">
          <HomeSouvenirsPreview />
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
