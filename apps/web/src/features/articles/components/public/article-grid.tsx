"use client";

import { ChevronDown } from "lucide-react";
import { ArticleCard, type ArticleItem } from "./article-card";
import { ArticleFilter } from "./article-filter";

interface ArticleGridProps {
  articles: ArticleItem[];
  searchQuery: string;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  sortOrder?: "newest" | "oldest";
  onSortChange?: (order: "newest" | "oldest") => void;
}

export function ArticleGrid({
  articles,
  searchQuery,
  categories,
  activeCategory,
  onCategoryChange,
  onReset,
  sortOrder = "newest",
  onSortChange,
}: ArticleGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header: Heading & Urutan di atas, Filter Pills tepat di bawahnya */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-normal tracking-tight text-[#1c1c1c]">Artikel Terbaru</h2>
            <p className="text-xs text-[#86848d] mt-0.5">
              Panduan wisata, kuliner, dan tips transit nyaman di sekitar Kota Ambon &amp; Bandara
              Pattimura.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#86848d] border border-[#e9e8ea] bg-white rounded-full px-3.5 py-1.5 shadow-2xs shrink-0 self-start sm:self-auto">
            <span className="font-normal">URUTKAN:</span>
            <button
              type="button"
              onClick={() => onSortChange?.(sortOrder === "newest" ? "oldest" : "newest")}
              className="text-[#3c315b] font-medium flex items-center gap-1 cursor-pointer hover:text-[#2d2445] transition-colors"
            >
              <span>{sortOrder === "oldest" ? "Terlama" : "Terbaru"}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Kategori Pills di bawah heading */}
        <ArticleFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* Articles Grid or Empty State */}
      {articles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#e9e8ea] p-8 shadow-[0px_4px_20px_rgba(226,223,254,0.3)] max-w-md mx-auto">
          <p className="text-[#86848d] text-sm font-normal">
            Tidak ditemukan artikel dengan kata kunci &quot;{searchQuery}&quot;.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-4 px-5 py-2 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white text-xs font-normal transition-all active:scale-95 cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}
    </section>
  );
}
