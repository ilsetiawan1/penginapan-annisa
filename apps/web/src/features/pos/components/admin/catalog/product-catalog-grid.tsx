"use client";

import type { Souvenir } from "@annisa/types";
import { Loader2, PackageOpen, RotateCw, Search, X } from "lucide-react";
import Link from "next/link";
import { ProductCardItem } from "./product-card-item";

export interface ProductCategoryOption {
  id: string;
  name: string;
}

interface ProductCatalogGridProps {
  products: Souvenir[];
  totalProducts: number;
  isLoading: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  categories: ProductCategoryOption[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  cart: Record<string, number>;
  onAdd: (product: Souvenir) => void;
  onRestock: (product: Souvenir) => void;
}

export function ProductCatalogGrid({
  products,
  totalProducts,
  isLoading,
  isRefreshing,
  onRefresh,
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  cart,
  onAdd,
  onRestock,
}: ProductCatalogGridProps) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Katalog Produk</h3>
          <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
            {products.length} dari {totalProducts} produk
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <label className="relative flex-1 sm:w-60 min-w-[160px]">
            <span className="sr-only">Cari produk</span>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama produk..."
              className="w-full h-9 pl-9 pr-8 rounded-xl border border-slate-200/80 bg-slate-50 focus:bg-white focus:border-slate-400 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition"
            />
            {search && (
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

          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter kategori produk"
            className="h-9 px-3 rounded-xl border border-slate-200/80 bg-white text-xs font-medium text-slate-700 focus:border-slate-400 outline-none cursor-pointer shrink-0"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onRefresh}
            title="Muat ulang katalog"
            aria-label="Muat ulang katalog"
            className="h-9 w-9 shrink-0 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-slate-900" : ""}`} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 flex flex-col items-center gap-2 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-xs">Memuat stok produk…</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCardItem
              key={product.id}
              product={product}
              inCart={cart[product.id] ?? 0}
              onAdd={onAdd}
              onRestock={onRestock}
            />
          ))}
        </div>
      ) : (
        <div className="py-14 flex flex-col items-center text-center gap-2 border border-dashed border-slate-200 rounded-xl">
          <PackageOpen className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
          <h4 className="text-sm font-semibold text-slate-800">
            {search || selectedCategory !== "all"
              ? "Produk tidak ditemukan"
              : "Belum ada produk oleh-oleh"}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs">
            {search || selectedCategory !== "all"
              ? "Tidak ada produk yang cocok dengan kriteria filter saat ini."
              : "Tambahkan produk dan stok terlebih dahulu di menu Kelola Oleh-Oleh."}
          </p>
          {!search && selectedCategory === "all" && (
            <Link
              href="/admin/master-souvenirs"
              className="mt-1 text-xs font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-600"
            >
              Buka Kelola Oleh-Oleh
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
