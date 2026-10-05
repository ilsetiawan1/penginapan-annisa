"use client";

import { Plus, RotateCcw } from "lucide-react";

interface SouvenirHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  onAddProduct: () => void;
}

export function SouvenirHeader({
  onRefresh,
  isRefreshing = false,
  onAddProduct,
}: SouvenirHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Kelola Produk Oleh-Oleh
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Format tabel terstruktur untuk memantau stok fisik POS kasir, harga, foto, dan retensi
          sampah 30 hari.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Muat ulang data produk"
          className="h-9 w-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer disabled:opacity-60"
        >
          <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-slate-900" : ""}`} />
        </button>

        <button
          type="button"
          onClick={onAddProduct}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium px-4 h-9 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </button>
      </div>
    </div>
  );
}
