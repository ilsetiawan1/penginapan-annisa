import { Bed, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";

interface RoomHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function RoomHero({ searchQuery, onSearchChange }: RoomHeroProps) {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] lg:h-[460px] flex items-center justify-center overflow-hidden">
      <Image
        src="/rooms/JMP-Ambon-baru.webp"
        alt="Jembatan Merah Putih Ambon"
        fill
        className="object-cover"
        priority
      />
      {/* Top dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-transparent" />
      {/* Smooth Bottom White Fade Transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/85 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-12 sm:pt-16">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-2 shadow-sm">
          <Bed className="w-3 h-3 text-purple-300" />
          <span>KATALOG 8 UNIT KAMAR</span>
        </div>

        <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight leading-tight mb-1.5 drop-shadow-md">
          Pilihan Kamar Transit Nyaman
        </h1>

        <p className="text-[11px] sm:text-sm text-slate-200 font-normal max-w-lg mx-auto leading-relaxed drop-shadow-sm mb-4 sm:mb-6 hidden xs:block">
          8 unit kamar bersih &amp; terawat, 100% kamar mandi dalam, 750m dari Bandara Pattimura.
        </p>

        {/* Floating Search Bar */}
        <div className="max-w-md sm:max-w-lg mx-auto bg-white rounded-full p-1 sm:p-1.5 shadow-2xl flex items-center gap-2 border border-white/80">
          <div className="pl-3 text-slate-400">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kamar (A1, AC, Kipas)..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium outline-none py-0.5"
          />
          <Button
            type="button"
            className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 sm:px-5 py-1.5 h-8 sm:h-9 shrink-0 shadow-md transition-all cursor-pointer"
          >
            Cari
          </Button>
        </div>
      </div>
    </section>
  );
}
