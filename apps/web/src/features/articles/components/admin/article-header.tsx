"use client";

import { Plus, RotateCw } from "lucide-react";

interface ArticleHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  onAddArticle: () => void;
}

export function ArticleHeader({ onRefresh, isRefreshing, onAddArticle }: ArticleHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
          Kelola Artikel Wisata & Panduan
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Format tabel terstruktur dengan Auto-Scraper berita dan fitur soft delete retensi 30 hari.
        </p>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Segarkan data artikel"
          className="h-9 w-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-60 shadow-2xs"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>

        <button
          type="button"
          onClick={onAddArticle}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-9 px-4 text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Artikel</span>
        </button>
      </div>
    </div>
  );
}
