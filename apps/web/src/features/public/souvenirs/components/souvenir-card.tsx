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
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full shadow-2xs">
      <div>
        {/* Foto Produk Bersih & Luas */}
        <div className="relative h-32 xs:h-36 sm:h-44 md:h-48 w-full bg-slate-100 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Body Info */}
        <div className="p-2.5 sm:p-4 md:p-5 text-left flex-1 flex flex-col justify-between space-y-1 sm:space-y-1.5">
          <div>
            {/* Kategori Oleh-Oleh */}
            <div className="flex items-center gap-1 text-purple-700 font-bold text-[9px] sm:text-[11px] mb-0.5">
              <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-600 shrink-0" />
              <span className="truncate">{item.categoryLabel}</span>
            </div>

            {/* Nama Produk (Poppins Font, 2 baris agar nama terbaca utuh) */}
            <h3 className="font-extrabold text-xs sm:text-sm md:text-base text-slate-900 leading-snug line-clamp-2 min-h-[30px] sm:min-h-[38px] group-hover:text-purple-700 transition">
              {item.name}
            </h3>

            {/* Deskripsi Singkat */}
            <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
              {item.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Baris Bawah: Harga & Aksi WhatsApp (Responsif: Rapi Vertikal di Mobile 2-Col, Horizontal di Layar Besar) */}
      <div className="p-2.5 sm:p-4 md:p-5 pt-0 border-t border-slate-100 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
        <span className="text-xs xs:text-sm sm:text-base md:text-lg font-black text-purple-700 leading-none">
          {item.price}
        </span>

        <Button
          asChild
          className="w-full sm:w-auto rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px] xs:text-[11px] sm:text-xs h-7 xs:h-8 sm:h-9 px-2 sm:px-3 gap-1 sm:gap-1.5 shadow-2xs hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <a href={waUrl} target="_blank" rel="noreferrer">
            <FaWhatsapp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">Titip Ambil</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
