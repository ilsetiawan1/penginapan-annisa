"use client";

import { Card } from "@/components/ui/card";
import type { SouvenirProduct } from "@/features/souvenirs/data";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export type SouvenirItem = SouvenirProduct;

interface SouvenirCardProps {
  item: SouvenirProduct;
  onOpenOrder?: (item: SouvenirProduct) => void;
}

export function SouvenirCard({ item, onOpenOrder }: SouvenirCardProps) {
  return (
    <Card
      onClick={() => onOpenOrder?.(item)}
      className="group rounded-3xl bg-white border border-[#e9e8ea] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#e2dffe] hover:shadow-[0px_8px_30px_rgba(226,223,254,0.55)] flex flex-col justify-between p-4 cursor-pointer h-full"
    >
      <div>
        {/* Thumbnail Produk Bersih Tanpa Border Kaku */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#fcfbfa]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Kategori & Judul (Tanpa Paragraf Deskripsi) */}
        <div className="mt-3">
          <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2f4] border border-[#e9e8ea] text-[#3c315b] text-[11px] font-medium inline-block">
            {item.categoryLabel}
          </span>

          <h3 className="text-sm sm:text-base font-medium text-[#1c1c1c] line-clamp-1 mt-2">
            {item.name}
          </h3>
        </div>
      </div>

      {/* Baris Bawah: Harga & Tombol Pesan */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#e9e8ea]">
        <span className="text-base font-semibold text-[#1c1c1c] whitespace-nowrap">
          {item.price}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenOrder?.(item);
          }}
          aria-label={`Pesan ${item.name}`}
          className="bg-[#3c315b] hover:bg-[#2d2445] text-white text-xs font-normal px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Pesan</span>
        </button>
      </div>
    </Card>
  );
}
