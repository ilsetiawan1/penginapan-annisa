import { ChevronDown } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { ArticleCard, type ArticleItem } from "./article-card";

interface ArticleGridProps {
  articles: ArticleItem[];
  searchQuery: string;
  onReset: () => void;
}

export function ArticleGrid({
  articles,
  searchQuery,
  onReset,
}: ArticleGridProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-2 pb-16 sm:pb-20">
      {/* Section Header with Sort Option */}
      <div className="flex items-center justify-between mt-6 sm:mt-10 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-serif font-black text-slate-950 tracking-tight leading-tight">
            Artikel Terbaru
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
            Panduan wisata, kuliner, dan tips transit nyaman di sekitar Kota
            Ambon &amp; Bandara Pattimura.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer hover:text-purple-700 transition">
          <span>URUTKAN:</span>
          <span className="text-purple-700 font-bold flex items-center gap-0.5">
            Terbaru <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm font-medium">
            Tidak ditemukan artikel dengan kata kunci &quot;{searchQuery}&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="mt-3 rounded-full text-xs font-bold cursor-pointer"
          >
            Reset Pencarian
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}
    </section>
  );
}
