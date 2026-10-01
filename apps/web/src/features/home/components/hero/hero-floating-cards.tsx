import { HeroCard } from "./hero-card";

export function HeroFloatingCards() {
  return (
    <div className="hidden md:flex w-full md:w-1/2 lg:w-7/12 items-center justify-center relative">
      {/* Right Column Staggered Cards Cluster Container */}
      <div className="relative w-full max-w-[500px] lg:max-w-[560px] h-[380px] sm:h-[400px] lg:h-[440px]">
        {/* KARTU 1: KETERANGAN 750 METER (KIRI ATAS) */}
        <div className="w-[215px] lg:w-[240px] absolute top-2 left-2 sm:left-4 z-10">
          <HeroCard type="distance" />
        </div>

        {/* KARTU 2: BANDARA PATTIMURA AMBON (KIRI BAWAH) */}
        <div className="w-[225px] lg:w-[250px] absolute bottom-2 left-8 sm:left-12 z-20">
          <HeroCard type="airport" />
        </div>

        {/* KARTU 3: CTA GOOGLE MAPS (KANAN TENGAH) */}
        <div className="w-[215px] lg:w-[240px] absolute top-14 sm:top-16 right-2 sm:right-4 z-10">
          <HeroCard type="route" />
        </div>
      </div>
    </div>
  );
}
