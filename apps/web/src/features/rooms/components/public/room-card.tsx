"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Bed } from "lucide-react";
import { useState } from "react";
import { RoomDetailModal } from "./room-detail-modal";

export interface RoomItem {
  number: string;
  name: string;
  type: "ac" | "kipas";
  status: "tersedia" | "terisi" | "dipesan";
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
  const [imgError, setImgError] = useState(false);

  const isAvailable = room.status === "tersedia";
  const numericPrice = Number(room.price.replace(/\./g, ""));
  const totalPrice = numericPrice * nights;

  // Pastikan nama kamar tidak mengandung suffix duplikat seperti (AC) atau (Kipas)
  const cleanRoomName = room.name.replace(/\s*\((?:AC|Kipas)\)/gi, "");
  const hasValidImage = Boolean(room.image && room.image.trim() !== "" && !imgError);

  return (
    <>
      <Card
        onClick={() => setIsDetailOpen(true)}
        className="group rounded-3xl bg-white border border-[#e9e8ea] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#e2dffe] hover:shadow-[0px_8px_30px_rgba(226,223,254,0.55)] flex flex-col justify-between cursor-pointer h-full p-0"
      >
        <div>
          {/* Thumbnail Foto */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f4f2f4]">
            {hasValidImage ? (
              <img
                src={room.image}
                alt={cleanRoomName}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-[#86848d] p-4 bg-[#f4f2f4]">
                <Bed className="w-7 h-7 stroke-[1.5] text-[#3c315b]/70" />
                <span className="text-xs font-normal text-[#86848d]">Kamar Siap Huni</span>
              </div>
            )}
          </div>

          {/* Info & Badges */}
          <div className="p-4 sm:p-5">
            {/* Badges Tipe & Ketersediaan */}
            <div className="flex items-center justify-between gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2f4] border border-[#e9e8ea] text-[#3c315b] text-[11px] font-medium">
                {room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}
              </span>

              {room.status === "tersedia" && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Tersedia</span>
                </span>
              )}
              {room.status === "dipesan" && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                  <span>Dipesan</span>
                </span>
              )}
              {room.status === "terisi" && (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                  <span>Terisi</span>
                </span>
              )}
            </div>

            {/* Nama Kamar Bersih */}
            <h3 className="text-base font-medium text-[#1c1c1c] tracking-tight mt-2">
              {cleanRoomName}
            </h3>

            {/* Cuplikan Fasilitas */}
            <p className="text-xs text-[#86848d] leading-relaxed line-clamp-2 mt-1">
              1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.
            </p>
          </div>
        </div>

        {/* Baris Bawah: Harga & Tombol Aksi */}
        <div className="px-4 py-3.5 border-t border-[#e9e8ea] flex items-center justify-between gap-2 mt-auto">
          <div className="whitespace-nowrap shrink-0 flex items-baseline">
            <span className="text-lg font-normal text-[#1c1c1c]">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
            <span className="text-xs text-[#86848d] ml-1">
              {nights > 1 ? `/${nights} malam` : "/malam"}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailOpen(true);
            }}
            aria-label={`Lihat detail ${cleanRoomName}`}
            className="h-8 px-3.5 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white text-xs font-normal inline-flex items-center gap-1 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span>Lihat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>

      {/* Modal Detail Kamar Visual */}
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
