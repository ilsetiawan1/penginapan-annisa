"use client";

import { Check, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";
import { RoomDetailModal } from "./room-detail-modal";

export interface RoomItem {
  number: string;
  name: string;
  type: "ac" | "kipas";
  status: "tersedia" | "terisi";
  price: string; // e.g. "275.000"
  dp: string;
  bed: string;
  capacity: string;
  facilities: string[];
  image: string;
}

interface RoomCardProps {
  room: RoomItem;
  checkInDate?: string;
  nights?: number;
}

export function RoomCard({ room, checkInDate, nights = 1 }: RoomCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const isAvailable = room.status === "tersedia";
  const numericPrice = Number(room.price.replace(/\./g, ""));
  const totalPrice = numericPrice * nights;
  const dpPrice = Math.round(totalPrice * 0.5);

  const formattedDateStr = checkInDate
    ? new Date(checkInDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Hari Ini";

  // URL WhatsApp dengan Draf Pesan Lengkap Otomatis
  const waMessage = `*Halo Penginapan Annisa, saya ingin reservasi kamar:*
• Tipe: *${room.name}*
• Tgl Check-In: *${formattedDateStr}*
• Durasi: *${nights} Malam*
• Estimasi Total: *Rp ${totalPrice.toLocaleString("id-ID")}*
• DP 50%: *Rp ${dpPrice.toLocaleString("id-ID")}*

Apakah kamar ini tersedia di tanggal tersebut? Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <Card
        onClick={() => setIsDetailOpen(true)}
        className="overflow-hidden p-0 rounded-3xl bg-white hover:shadow-xl border border-slate-200/90 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
      >
        <div>
          {/* Foto Kamar 100% Bersih Tanpa Badge Kaku */}
          <div className="relative h-44 sm:h-52 w-full bg-slate-100 overflow-hidden">
            <Image
              src={room.image}
              alt={room.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          {/* Info Konten Kamar */}
          <div className="p-4 sm:p-5 space-y-2 text-left">
            {/* Kategori Tipe & Status Ketersediaan Halus */}
            <div className="flex items-center justify-between text-[11px] font-bold">
              <div className="flex items-center gap-1.5 text-purple-700">
                <Tag className="w-3 h-3 text-purple-600 shrink-0" />
                <span>{room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}</span>
              </div>

              {isAvailable ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Tersedia</span>
                </span>
              ) : (
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                  <span>Terisi</span>
                </span>
              )}
            </div>

            {/* Nama Kamar (Poppins Font) */}
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-purple-700 transition">
              {room.name}
            </h3>

            {/* Deskripsi Fasilitas Singkat & Bersih */}
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
              1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.
            </p>
          </div>
        </div>

        {/* Baris Bawah: Harga & Aksi Reservasi */}
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
          <div>
            <span className="text-base sm:text-lg font-black text-purple-700 leading-none block">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
              {nights > 1 ? `DP 50%: Rp ${dpPrice.toLocaleString("id-ID")}` : `DP 50%: Rp ${room.dp}`}
            </span>
          </div>

          <Button
            asChild
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-3 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
          >
            <a href={waUrl} target="_blank" rel="noreferrer">
              <FaWhatsapp className="w-4 h-4" />
              <span>Pesan Kamar</span>
            </a>
          </Button>
        </div>
      </Card>

      {/* Modal Detail Kamar Visual Ala Hotel Mewah */}
      <RoomDetailModal
        room={room}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        checkInDate={checkInDate}
        nights={nights}
      />
    </>
  );
}
