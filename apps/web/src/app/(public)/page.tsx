import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  BookingProcessSection,
  FaqSection,
  HeroSection,
  HomeRoomsPreview,
  HomeSouvenirsPreview,
} from "@/features/home";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION & BOOKING FORM */}
      <HeroSection />

      {/* 2. 3-STEP BOOKING PROCESS */}
      <ScrollReveal delay={50}>
        <BookingProcessSection />
      </ScrollReveal>

      {/* 3. PILIHAN UNIT KAMAR TRANSIT (TARGET AUTO SCROLL DARI HERO) */}
      <section
        id="pilihan-kamar"
        className="relative w-full bg-[#faf9fc] pb-12 sm:pb-16 px-4 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <ScrollReveal delay={60}>
            <HomeRoomsPreview />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. ETALASE OLEH-OLEH + BANTUAN FAQ */}
      <section className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#d8b4fe]/30 via-40% via-[#d8b4fe]/40 via-60% to-[#faf9fc] py-12 sm:py-16 px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[300px] sm:h-[420px] bg-[#d8b4fe]/35 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto w-full space-y-12 sm:space-y-16 relative z-10">
          <ScrollReveal delay={60}>
            <HomeSouvenirsPreview />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <FaqSection />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

