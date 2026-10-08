"use client";

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
      {/* Section Header: Heading & Urutan sejajar, Filter Pills di bawahnya */}
      <div className="mb-8 space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between sm:justify-start gap-3 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#1c1c1c]">
              Artikel Terbaru
            </h2>

            {/* Badge Filter: Terbaru & Terlama */}
            <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs">
              <button
                type="button"
                onClick={() => onSortChange?.("newest")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  sortOrder === "newest"
                    ? "bg-[#3c315b] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Terbaru
              </button>
              <button
                type="button"
                onClick={() => onSortChange?.("oldest")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  sortOrder === "oldest"
                    ? "bg-[#3c315b] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Terlama
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-600">
            Panduan wisata, kuliner, dan tips transit nyaman di sekitar Kota Ambon &amp; Bandara
            Pattimura.
          </p>
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
