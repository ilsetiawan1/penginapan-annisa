"use client";

import { Tag } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";
import type { SouvenirProduct } from "../data";

export type SouvenirItem = SouvenirProduct;

interface SouvenirCardProps {
  item: SouvenirProduct;
}

export function SouvenirCard({ item }: SouvenirCardProps) {
  const waText = `Halo Resepsionis Penginapan Annisa, saya ingin pesan/titip oleh-oleh:
• Produk: *${item.name}*
• Kategori: *${item.categoryLabel}*
• Asal: *${item.origin}*
• Harga: *${item.price}*
• Pengambilan: *Self Pick-Up di Resepsionis Annisa (750m Bandara Pattimura)*

Apakah stoknya tersedia untuk saya ambil saat transit? Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <Card className="overflow-hidden p-0 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group h-full">
      <div>
        {/* Foto Produk Bersih & Luas */}
        <div className="relative h-28 xs:h-36 sm:h-44 md:h-48 w-full bg-slate-100 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info Konten Produk */}
        <div className="p-2.5 sm:p-4 md:p-4.5 space-y-1 sm:space-y-2 text-left">
          {/* Kategori Oleh-Oleh */}
          <div className="flex items-center gap-1 text-purple-700 font-bold text-[9px] sm:text-[11px] leading-tight">
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600 shrink-0" />
            <span className="truncate">{item.categoryLabel}</span>
          </div>

          {/* Nama Produk (Poppins Font) */}
          <h3 className="font-extrabold text-[11px] xs:text-xs sm:text-sm md:text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition">
            {item.name}
          </h3>

          {/* Deskripsi Singkat */}
          <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 hidden xs:block">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Harga & Tombol Titip Ambil via WhatsApp */}
      <div className="p-2.5 sm:p-4 md:p-4.5 pt-0 border-t border-slate-100 mt-1 flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-baseline justify-between gap-1 pt-1.5 sm:pt-2">
          <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase leading-none hidden sm:inline-block">
            DI RESEPSIONIS
          </span>
          <span className="text-xs xs:text-sm sm:text-base md:text-lg font-black text-purple-700 leading-none">
            {item.price}
          </span>
        </div>

        <Button
          asChild
          className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] sm:text-xs h-7 xs:h-8 sm:h-9 px-2 gap-1 sm:gap-1.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
        >
          <a href={waUrl} target="_blank" rel="noreferrer">
            <FaWhatsapp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">Titip Ambil</span>
          </a>
        </Button>
      </div>
    </Card>
  );
}
