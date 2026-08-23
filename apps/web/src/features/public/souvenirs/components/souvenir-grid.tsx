"use client";

import { Button } from "../../../../components/ui/button";
import type { SouvenirProduct } from "../data";
import { SouvenirCard } from "./souvenir-card";

interface SouvenirGridProps {
  items: SouvenirProduct[];
  searchQuery: string;
  onReset: () => void;
}

export function SouvenirGrid({ items, searchQuery, onReset }: SouvenirGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-16 sm:pb-20">
      <div className="flex items-center justify-between mt-6 sm:mt-10 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-serif font-black text-slate-950 tracking-tight leading-tight">
            Daftar Produk Oleh-oleh
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
            Semua produk etalase siap diambil langsung di meja resepsionis (750m Bandara Pattimura).
          </p>
        </div>
        <span className="text-[11px] bg-purple-50 text-purple-800 font-bold px-2.5 py-1 rounded-full border border-purple-100 hidden sm:inline-block">
          Tersedia di Resepsionis
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 max-w-md mx-auto">
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Tidak ditemukan produk oleh-oleh dengan kata kunci &quot;{searchQuery}&quot;.
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
        /* Grid Layout: 3 Kolom di Mobile, 4 Kolom di Tablet & Desktop */
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {items.map((item) => (
            <SouvenirCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
