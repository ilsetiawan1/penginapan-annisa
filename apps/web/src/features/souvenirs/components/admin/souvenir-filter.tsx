"use client";

import type { SouvenirCategory } from "@annisa/types";
import { AlertTriangle, Package, Search, Trash2, X } from "lucide-react";

interface SouvenirFilterProps {
  activeTab: "active" | "trash";
  onTabChange: (tab: "active" | "trash") => void;
  activeCount: number;
  trashCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: SouvenirCategory[];
}

export function SouvenirFilter({
  activeTab,
  onTabChange,
  activeCount,
  trashCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: SouvenirFilterProps) {
  return (
    <div className="space-y-3 w-full">
      {/* 1 Inline Row: Tab Segments, Search Bar, and Category Dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
        {/* Tab Switcher: Produk Aktif vs Sampah (Clean neutral slate segmented control, non-black) */}
        <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200/70 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onTabChange("active")}
            className={`flex-1 sm:flex-initial px-3 h-8 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "active"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Produk Aktif</span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                activeTab === "active"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-slate-200/70 text-slate-500"
              }`}
            >
              {activeCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("trash")}
            className={`flex-1 sm:flex-initial px-3 h-8 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "trash"
                ? "bg-white text-slate-900 font-semibold shadow-2xs"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Sampah</span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                activeTab === "trash"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-slate-200/70 text-slate-500"
              }`}
            >
              {trashCount}
            </span>
          </button>
        </div>

        {/* Input Search Produk (identik dengan kasir POS) */}
        <label className="relative flex-1 w-full min-w-[200px]">
          <span className="sr-only">Cari produk</span>
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full h-9 pl-9 pr-8 rounded-xl border border-slate-200/80 bg-slate-50 focus:bg-white focus:border-slate-400 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Hapus pencarian"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </label>

        {/* Dropdown Select Kategori (identik dengan kasir POS) */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter kategori produk"
          className="h-9 px-3 rounded-xl border border-slate-200/80 bg-white text-xs font-medium text-slate-700 focus:border-slate-400 outline-none cursor-pointer shrink-0 w-full sm:w-auto"
        >
          <option value="all">Semua Kategori</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Banner Khusus Tab Sampah */}
      {activeTab === "trash" && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block">Kebijakan Soft Delete Retensi 30 Hari</strong>
            <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
              Produk di bawah ini dapat dipulihkan kembali ke katalog aktif dalam waktu 30 hari
              sejak dihapus. Setelah melewati 30 hari, sistem akan menghapus data ini secara
              permanen dari database.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
