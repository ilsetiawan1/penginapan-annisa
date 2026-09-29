"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRoomAvailabilityInquiryUrl, getRoomBookingWhatsAppUrl } from "@/lib/whatsapp";
import { Bed, Check, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
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

  // URL WhatsApp dengan Draf Pesan Bersih & Elegan
  const waUrl = getRoomBookingWhatsAppUrl({
    roomName: room.name,
    price: room.price,
    checkInDate: formattedDateStr,
    nights,
    total: totalPrice.toLocaleString("id-ID"),
    dp: dpPrice.toLocaleString("id-ID"),
  });

  const waInquiryUrl = getRoomAvailabilityInquiryUrl({
    roomName: room.name,
    dateStr: formattedDateStr,
    nights,
  });

  return (
    <>
      <Card
        onClick={() => setIsDetailOpen(true)}
        className="overflow-hidden p-0 rounded-3xl bg-white hover:shadow-xl border border-slate-200/90 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full"
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
              <div className="w-full h-full bg-gradient-to-br from-purple-50 via-purple-100/40 to-slate-100 flex flex-col items-center justify-center gap-2 text-purple-700/60 p-4">
                <Bed className="w-8 h-8 stroke-[1.5] text-purple-600/70" />
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
              <div className="flex items-center gap-1.5 text-purple-700">
                <Tag className="w-3 h-3 text-purple-600 shrink-0" />
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
              {nights > 1
                ? `DP 50%: Rp ${dpPrice.toLocaleString("id-ID")}`
                : `DP 50%: Rp ${room.dp}`}
            </span>
          </div>

          {isAvailable ? (
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
          ) : (
            <Button
              asChild
              variant="outline"
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-xs h-9 px-2.5 gap-1.5 cursor-pointer shrink-0"
            >
              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-600" />
                <span>Kamar Terisi</span>
              </a>
            </Button>
          )}
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
