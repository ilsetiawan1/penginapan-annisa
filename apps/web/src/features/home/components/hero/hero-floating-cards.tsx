import { HeroCard } from "./hero-card";

export function HeroFloatingCards() {
  return (
    <div className="hidden lg:block relative z-10 w-full flex-1">
      {/* Desktop absolute positioning container */}
      <div className="w-full max-w-7xl mx-auto px-4 relative h-full">
        {/* KARTU 1: KETERANGAN 750 METER (KIRI) */}
        <div className="w-full max-w-[240px] absolute left-6 xl:left-12 top-[56%] -translate-y-1/2">
          <HeroCard type="distance" />
        </div>

        {/* KARTU 2: BANDARA PATTIMURA AMBON (TENGAH BAWAH) */}
        <div className="w-full max-w-[250px] absolute bottom-5 xl:bottom-8 left-1/2 -translate-x-1/2">
          <HeroCard type="airport" />
        </div>

        {/* KARTU 3: CTA GOOGLE MAPS (KANAN) */}
        <div className="w-full max-w-[240px] absolute right-6 xl:right-12 top-[50%] -translate-y-1/2">
          <HeroCard type="route" />
        </div>
      </div>
    </div>
  );
}
