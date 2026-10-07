import { Gift, Search } from "lucide-react";
import Image from "next/image";

interface SouvenirHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SouvenirHero({ searchQuery, onSearchChange }: SouvenirHeroProps) {
  return (
    <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/heroes/souvenir-hero.webp"
        alt="Oleh-oleh Khas Ambon Maluku"
        fill
        className="object-cover"
        priority
      />
      {/* Optimized Gradient Overlay for crisp readability & smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c]/70 via-[#1c1c1c]/45 to-[#fdfcfe] backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-10 sm:pt-14">
        {/* Badge Atas */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-normal tracking-wide uppercase mb-4 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-white/90" />
          <span>ETALASE RESEPSIONIS ANNISA</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-white leading-tight">
          Oleh-oleh Khas Ambon &amp; Maluku
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mt-3 font-normal text-center leading-relaxed">
          Minyak kayu putih, minyak cengkeh, dan aneka camilan khas Maluku di meja resepsionis.
        </p>

        {/* Glassmorphism Floating Search Bar */}
        <div className="max-w-xl mx-auto mt-8 flex items-center bg-white/95 backdrop-blur-md border border-[#e9e8ea] rounded-full p-1.5 shadow-[0px_4px_20px_rgba(226,223,254,0.45)]">
          <label htmlFor="souvenir-search-input" className="sr-only">
            Cari produk oleh-oleh khas Ambon
          </label>
          <div className="pl-3.5 sm:pl-4 text-[#86848d]">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#86848d]" />
          </div>
          <input
            id="souvenir-search-input"
            type="text"
            aria-label="Cari produk oleh-oleh khas Ambon"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari oleh-oleh misal: Minyak Kayu Putih, Bagea..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-[#1c1c1c] placeholder:text-[#86848d] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Tombol cari oleh-oleh"
            className="h-9 px-5 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-[#fdfcfe] text-xs font-normal transition-all active:scale-95 cursor-pointer"
          >
            Cari
          </button>
        </div>
      </div>
    </section>
  );
}
