"use client";

import type { SouvenirProduct } from "@/features/souvenirs/data";
import { useState } from "react";
import { FloatingCartBar } from "./floating-cart-bar";
import { SouvenirCard } from "./souvenir-card";
import { SouvenirFilter } from "./souvenir-filter";
import { SouvenirOrderModal } from "./souvenir-order-modal";

interface SouvenirGridProps {
  items: SouvenirProduct[];
  searchQuery: string;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
}

export function SouvenirGrid({
  items,
  searchQuery,
  categories,
  activeCategory,
  onCategoryChange,
  onReset,
}: SouvenirGridProps) {
  const [selectedItem, setSelectedItem] = useState<SouvenirProduct | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header: Title di atas & Filter Pills di bawahnya */}
      <div className="mb-8 space-y-3.5">
        <div>
          <h2 className="text-2xl font-normal tracking-tight text-[#1c1c1c]">
            Daftar Produk Oleh-oleh
          </h2>
        </div>

        {/* Filter Kategori Pills (Posisikan di bawah judul) */}
        <SouvenirFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#e9e8ea] p-8 shadow-[0px_4px_20px_rgba(226,223,254,0.3)] max-w-md mx-auto">
          <p className="text-[#86848d] text-sm font-normal">
            Tidak ditemukan produk oleh-oleh dengan kata kunci &quot;{searchQuery}&quot;.
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
        /* Grid Layout: 2 Kolom di Mobile, 3 Kolom di Tablet, 4 Kolom di Desktop (max-w-6xl) */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {items.map((item) => (
            <SouvenirCard key={item.id} item={item} onOpenOrder={(it) => setSelectedItem(it)} />
          ))}
        </div>
      )}

      {/* Modal Interaktif Pemesanan Titip Ambil Langsung */}
      <SouvenirOrderModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />

      {/* Floating Bar Ringkasan Keranjang Belanja */}
      <FloatingCartBar />
    </section>
  );
}
