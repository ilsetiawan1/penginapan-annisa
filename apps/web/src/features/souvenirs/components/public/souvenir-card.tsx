"use client";

import { Card } from "@/components/ui/card";
import type { Souvenir } from "@annisa/types";
import { Plus } from "lucide-react";
import Image from "next/image";

interface SouvenirCardProps {
  item: Souvenir;
  onOpenOrder?: (item: Souvenir) => void;
}

export function SouvenirCard({ item, onOpenOrder }: SouvenirCardProps) {
  return (
    <Card
      onClick={() => onOpenOrder?.(item)}
      className="group rounded-2xl sm:rounded-3xl bg-white border border-[#e9e8ea] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#e2dffe] hover:shadow-[0px_8px_30px_rgba(226,223,254,0.55)] flex flex-col justify-between p-2.5 sm:p-4 cursor-pointer h-full"
    >
      <div>
        {/* Thumbnail Produk Bersih Tanpa Border Kaku */}
        <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#fcfbfa]">
          <Image
            src={item.imageUrl || "/images/placeholder-product.webp"}
            alt={item.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Judul Produk (Maksimal 2 Baris + Elipsis, Tanpa Subtitle Origin) */}
        <div className="mt-1 sm:mt-1.5">
          <h3 className="text-xs sm:text-sm font-medium text-[#1c1c1c] line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug mt-1">
            {item.name}
          </h3>
        </div>
      </div>

      {/* Baris Bawah: Harga & Tombol Icon + */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#e9e8ea]">
        <span className="text-xs sm:text-sm font-medium text-[#1c1c1c] tracking-tight whitespace-nowrap mt-0.5">
          Rp {item.price.toLocaleString("id-ID")}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenOrder?.(item);
          }}
          aria-label={`Pesan ${item.name}`}
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </button>
      </div>
    </Card>
  );
}
