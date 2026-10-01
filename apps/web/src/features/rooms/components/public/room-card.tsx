"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Bed, Check, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <>
      <Card
        onClick={() => setIsDetailOpen(true)}
        className="overflow-hidden p-0 rounded-3xl bg-white hover:shadow-xl border border-slate-200/90 hover:border-[#ddd3f3] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
      >
        <div>
          {/* Foto Kamar Bersih atau Placeholder Elegan */}
          <div className="relative h-44 sm:h-52 w-full bg-slate-100 overflow-hidden">
            {room.image ? (
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#faf8fd] via-[#ede8f8]/60 to-slate-100 flex flex-col items-center justify-center gap-2 text-[#7a68b7]/60 p-4">
                <Bed className="w-8 h-8 stroke-[1.5] text-[#7a68b7]/70" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {room.name}
                </span>
              </div>
            )}
          </div>

          {/* Info Konten Kamar */}
          <div className="p-4 sm:p-5 space-y-2 text-left">
            {/* Kategori Tipe & Status Ketersediaan Halus */}
            <div className="flex items-center justify-between text-[11px] font-bold">
              <div className="flex items-center gap-1.5 text-[#7a68b7]">
                <Tag className="w-3 h-3 text-[#7a68b7] shrink-0" />
                <span>{room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}</span>
              </div>

              {isAvailable ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Tersedia</span>
                </span>
              ) : (
                <span className="text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                  <span>Terisi di Tgl Ini</span>
                </span>
              )}
            </div>

            {/* Nama Kamar */}
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-[#594791] transition">
              {room.name}
            </h3>

            {/* Deskripsi Fasilitas Singkat & Bersih */}
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2">
              1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.
            </p>
          </div>
        </div>

        {/* Baris Bawah: Harga Bersih & Bernapas + Aksi Lihat Kamar Minimalis */}
        <div className="px-3.5 sm:px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Kontainer Harga Terproteksi dari Line-Break */}
          <div className="whitespace-nowrap shrink-0 flex items-baseline">
            <span className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#594791] transition-colors">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium ml-1">
              /malam
            </span>
          </div>

          {/* Tombol Aksi Minimalis dengan shrink-0 */}
          <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-600 group-hover:text-[#594791] bg-slate-50 group-hover:bg-[#ede8f8] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/80 group-hover:border-[#ddd3f3] transition-all shrink-0">
            <span>Lihat Kamar</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
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
