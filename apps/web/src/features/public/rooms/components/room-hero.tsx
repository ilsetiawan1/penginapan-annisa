import Image from "next/image";
import { Bed, Search } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface RoomHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function RoomHero({ searchQuery, onSearchChange }: RoomHeroProps) {
  return (
    <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden">
      <Image
        src="/rooms/JMP-Ambon-baru.webp"
        alt="Jembatan Merah Putih Ambon"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-black/35" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
          <Bed className="w-3.5 h-3.5 text-purple-300" />
          <span>KATALOG 8 UNIT KAMAR TRANSIT</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
          Pilihan Kamar Transit Nyaman
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
          Hanya 750m (2–3 menit) dari Bandara Pattimura. 100% kamar mandi dalam, kasur besar muat 2–3 orang, TV, dan WiFi kencang.
        </p>

        {/* Floating Search Bar */}
        <div className="max-w-xl mx-auto bg-white rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-2 border border-white/80">
          <div className="pl-3.5 sm:pl-4 text-slate-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kode kamar (misal: A1, AC, Kipas)..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium outline-none py-1"
          />
          <Button
            type="button"
            className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 h-9 sm:h-10 shrink-0 shadow-md transition-all cursor-pointer"
          >
            Cari
          </Button>
        </div>
      </div>
    </section>
  );
}
