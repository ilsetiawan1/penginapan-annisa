"use client";

import type { ArticleCategory } from "@annisa/types";
import { AlertTriangle, Newspaper, Search, Trash2 } from "lucide-react";

interface ArticleFilterProps {
  activeTab: "active" | "trash";
  onTabChange: (tab: "active" | "trash") => void;
  activeCount: number;
  trashCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories?: ArticleCategory[];
}

export function ArticleFilter({
  activeTab,
  onTabChange,
  activeCount,
  trashCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = [],
}: ArticleFilterProps) {
  return (
    <div className="space-y-4">
      {/* 1 Row Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Tab Switcher: Segmented Control Halus */}
        <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/70 shrink-0">
          <button
            type="button"
            onClick={() => onTabChange("active")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all cursor-pointer ${
              activeTab === "active"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Artikel Aktif</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "active"
                  ? "bg-slate-100 text-slate-800 font-bold"
                  : "bg-slate-200/70 text-slate-600"
              }`}
            >
              {activeCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("trash")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all cursor-pointer ${
              activeTab === "trash"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Sampah</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === "trash"
                  ? "bg-rose-100 text-rose-700 font-bold"
                  : "bg-slate-200/70 text-slate-600"
              }`}
            >
              {trashCount}
            </span>
          </button>
        </div>

        {/* Search & Category Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 md:max-w-xl md:justify-end">
          {/* Input Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul artikel..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all h-9"
            />
          </div>

          {/* Dropdown Kategori */}
          <div className="shrink-0 w-full sm:w-44">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all cursor-pointer h-9"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Banner Khusus Tab Sampah */}
      {activeTab === "trash" && (
        <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="font-semibold text-amber-950 block">
              Kebijakan Soft Delete Retensi 30 Hari
            </strong>
            <p className="text-[11px] text-amber-800/90 leading-relaxed">
              Artikel di bawah ini dapat dipulihkan kembali ke website dalam waktu 30 hari sejak
              dihapus. Setelah melewati 30 hari, sistem otomatis menghapus artikel ini secara
              permanen dari database.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
