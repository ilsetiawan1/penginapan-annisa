import Image from "next/image";
import { Gift, Search } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface SouvenirHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SouvenirHero({ searchQuery, onSearchChange }: SouvenirHeroProps) {
  return (
    <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden">
      <Image
        src="/oleh-oleh/hero-oleh-oleh.jpg"
        alt="Oleh-oleh Khas Ambon Maluku"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-black/35" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-purple-300" />
          <span>ETALASE RESEPSIONIS ANNISA</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
          Oleh-oleh Khas Ambon &amp; Maluku
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
          Dapatkan produk cinderamata, minyak kayu putih Namlea murni, dan camilan khas otentik langsung di resepsionis Penginapan Annisa.
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
            placeholder="Cari oleh-oleh (misal: Minyak Kayu Putih, Bagea)..."
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
