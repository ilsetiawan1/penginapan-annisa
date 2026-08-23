"use client";

import { Tag } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
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
    <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full shadow-2xs">
      {/* Foto Produk Bersih & Luas */}
      <div className="relative h-40 sm:h-48 w-full bg-slate-100 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Body Info */}
      <div className="p-4 sm:p-5 text-left flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Kategori Oleh-Oleh */}
          <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[11px] mb-1">
            <Tag className="w-3 h-3 text-purple-600 shrink-0" />
            <span className="truncate">{item.categoryLabel}</span>
          </div>

          {/* Nama Produk (Poppins Font) */}
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug line-clamp-1 group-hover:text-purple-700 transition">
            {item.name}
          </h3>

          {/* Deskripsi Singkat */}
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
            {item.desc}
          </p>
        </div>

        {/* Price & Pick-Up Action (Horizontal sejajar persis seperti di Beranda) */}
        <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">
              HARGA DI RESEPSIONIS
            </span>
            <span className="text-base sm:text-lg font-black text-purple-700 leading-tight block mt-0.5">
              {item.price}
            </span>
          </div>

          <Button
            asChild
            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-3 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
          >
            <a href={waUrl} target="_blank" rel="noreferrer">
              <FaWhatsapp className="w-4 h-4" />
              <span>Titip Ambil</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
