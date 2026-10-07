import { Search } from "lucide-react";
import Image from "next/image";

interface RoomHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function RoomHero({ searchQuery, onSearchChange }: RoomHeroProps) {
  return (
    <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden bg-[#fdfcfe]">
      <Image
        src="/images/heroes/room-hero.webp"
        alt="Jembatan Merah Putih Ambon"
        fill
        className="object-cover"
        priority
      />
      {/* Top dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c]/75 via-[#1c1c1c]/45 to-transparent pointer-events-none" />

      {/* Seamless bottom fade transition to canvas (#fdfcfe) eliminating all lines/seams */}
      <div className="absolute inset-x-0 -bottom-1 h-32 sm:h-44 bg-gradient-to-t from-[#fdfcfe] via-[#fdfcfe]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-10 sm:pt-14">
        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.025em] text-white leading-tight text-center">
          Pilihan Kamar Transit Nyaman
        </h1>

        {/* Glassmorphism Floating Search Bar */}
        <div className="max-w-xl mx-auto mt-8 flex items-center bg-white/95 backdrop-blur-md border border-[#e9e8ea] rounded-full p-1.5 shadow-[0px_4px_20px_rgba(226,223,254,0.45)]">
          <label htmlFor="room-search-input" className="sr-only">
            Cari unit kamar
          </label>
          <div className="pl-3.5 sm:pl-4 text-[#86848d]">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#86848d]" />
          </div>
          <input
            id="room-search-input"
            type="text"
            aria-label="Cari unit kamar"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kamar misal: A1, Tipe AC, Kipas..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-[#1c1c1c] placeholder:text-[#86848d] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Tombol cari kamar"
            className="h-9 px-5 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-[#fdfcfe] text-xs font-normal transition-all active:scale-95 cursor-pointer"
          >
            Cari
          </button>
        </div>
      </div>
    </section>
  );
}
