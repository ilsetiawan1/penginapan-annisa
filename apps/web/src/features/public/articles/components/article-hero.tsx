import { BookOpen, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";

interface ArticleHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ArticleHero({ searchQuery, onSearchChange }: ArticleHeroProps) {
  return (
    <section className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden">
      <Image
        src="/artikel/bermain-perahu-di-pantai-liang.jpg"
        alt="Pantai Liang Ambon"
        fill
        className="object-cover"
        priority
      />
      {/* Top dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-transparent" />
      {/* Smooth Bottom White Fade Transition */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-purple-300" />
          <span>BLOG PENGINAPAN ANNISA</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
          Inspirasi Liburan &amp; Tips Wisata
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
          Temukan panduan wisata pantai eksotis, rekomendasi kuliner khas
          Maluku, dan tips transit nyaman di Ambon...
        </p>

        {/* Floating Search Bar */}
        <div className="max-w-2xl mx-auto bg-white rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-2 border border-white/80">
          <div className="pl-3.5 sm:pl-4 text-slate-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari artikel atau destinasi..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium outline-none py-1"
          />
          <Button
            type="button"
            className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2 h-9 sm:h-10 shrink-0 shadow-md transition-all cursor-pointer"
          >
            Cari
          </Button>
        </div>
      </div>
    </section>
  );
}
