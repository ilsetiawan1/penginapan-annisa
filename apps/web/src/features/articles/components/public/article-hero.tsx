import { BookOpen, Search } from "lucide-react";
import Image from "next/image";

interface ArticleHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ArticleHero({ searchQuery, onSearchChange }: ArticleHeroProps) {
  return (
    <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/heroes/article-hero.webp"
        alt="Pantai Liang Ambon Maluku"
        fill
        className="object-cover"
        priority
      />
      {/* Light Phantom Optimized Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c]/70 via-[#1c1c1c]/45 to-[#fdfcfe] backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-10 sm:pt-14">
        {/* Badge Atas */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-normal tracking-wide uppercase mb-4 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-white/90" />
          <span>BLOG PENGINAPAN ANNISA</span>
        </div>

        {/* Headline Editorial Sans-Serif */}
        <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.025em] text-white leading-tight text-center">
          Inspirasi Liburan &amp; Tips Wisata
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mt-3 font-normal text-center leading-relaxed">
          Temukan panduan wisata pantai eksotis, rekomendasi kuliner khas Maluku, dan tips transit
          nyaman di Ambon.
        </p>

        {/* Glassmorphism Floating Search Bar */}
        <div className="max-w-xl mx-auto mt-8 flex items-center bg-white/95 backdrop-blur-md border border-[#e9e8ea] rounded-full p-1.5 shadow-[0px_4px_20px_rgba(226,223,254,0.45)]">
          <label htmlFor="article-search-input" className="sr-only">
            Cari artikel atau destinasi wisata
          </label>
          <div className="pl-3.5 sm:pl-4 text-[#86848d]">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#86848d]" />
          </div>
          <input
            id="article-search-input"
            type="text"
            aria-label="Cari artikel atau destinasi wisata"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari artikel atau destinasi wisata..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-[#1c1c1c] placeholder:text-[#86848d] focus:outline-none"
          />
          <button
            type="button"
            aria-label="Tombol cari artikel"
            className="bg-[#3c315b] hover:bg-[#2d2445] text-white rounded-full px-5 py-2 text-xs font-normal transition-all active:scale-95 cursor-pointer shrink-0"
          >
            Cari
          </button>
        </div>
      </div>
    </section>
  );
}
