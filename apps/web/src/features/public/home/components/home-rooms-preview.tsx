"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bed,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRoomBookingWhatsAppUrl } from "@/lib/whatsapp";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

const LOCAL_STORAGE_KEY = "annisa_master_rooms_v3";

interface FeaturedRoom {
  id: string;
  name: string;
  typeLabel: string;
  price: string;
  priceNum: number;
  dp: string;
  desc: string;
  image: string;
}

const DEFAULT_3_FEATURED_ROOMS: FeaturedRoom[] = [
  {
    id: "A1",
    name: "Kamar #A1 (AC)",
    typeLabel: "Tipe AC",
    price: "Rp 275.000",
    priceNum: 275000,
    dp: "Rp 137.500",
    desc: "1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.",
    image: "",
  },
  {
    id: "A2",
    name: "Kamar #A2 (AC)",
    typeLabel: "Tipe AC",
    price: "Rp 275.000",
    priceNum: 275000,
    dp: "Rp 137.500",
    desc: "1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.",
    image: "",
  },
  {
    id: "A3",
    name: "Kamar #A3 (Kipas)",
    typeLabel: "Tipe Kipas",
    price: "Rp 200.000",
    priceNum: 200000,
    dp: "Rp 100.000",
    desc: "1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.",
    image: "",
  },
];

export function HomeRoomsPreview() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rooms, setRooms] = useState<FeaturedRoom[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const masterRooms = JSON.parse(saved);
          if (Array.isArray(masterRooms) && masterRooms.length > 0) {
            return masterRooms.slice(0, 3).map((mr: any) => {
              const isAc = mr.type === "ac";
              const priceNum = Number(mr.price) || (isAc ? 275000 : 200000);
              const dpNum = Math.round(priceNum * 0.5);

              return {
                id: mr.code,
                name: mr.name || `Kamar #${mr.code} (${isAc ? "AC" : "Kipas"})`,
                typeLabel: isAc ? "Tipe AC" : "Tipe Kipas",
                price: `Rp ${priceNum.toLocaleString("id-ID")}`,
                priceNum,
                dp: `Rp ${dpNum.toLocaleString("id-ID")}`,
                desc:
                  mr.description ||
                  "1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.",
                image:
                  mr.imageUrl &&
                  !mr.imageUrl.includes("/rooms/room-") &&
                  !mr.imageUrl.startsWith("/images/")
                    ? mr.imageUrl
                    : "",
              };
            });
          }
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_3_FEATURED_ROOMS;
  });

  const { data: dbRooms } = useRooms();

  useEffect(() => {
    try {
      let currentRooms = rooms;
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const masterRooms = JSON.parse(saved);
        if (Array.isArray(masterRooms) && masterRooms.length > 0) {
          currentRooms = masterRooms.slice(0, 3).map((mr: any) => {
            const isAc = mr.type === "ac";
            const priceNum = Number(mr.price) || (isAc ? 275000 : 200000);
            const dpNum = Math.round(priceNum * 0.5);

            return {
              id: mr.code,
              name: mr.name || `Kamar #${mr.code} (${isAc ? "AC" : "Kipas"})`,
              typeLabel: isAc ? "Tipe AC" : "Tipe Kipas",
              price: `Rp ${priceNum.toLocaleString("id-ID")}`,
              priceNum,
              dp: `Rp ${dpNum.toLocaleString("id-ID")}`,
              desc:
                mr.description ||
                "1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.",
              image:
                mr.imageUrl &&
                !mr.imageUrl.includes("/rooms/room-") &&
                !mr.imageUrl.startsWith("/images/")
                  ? mr.imageUrl
                  : "",
            };
          });
        }
      }

      // Sinkronkan foto dari database backend (Cloudflare R2) jika tersedia
      if (dbRooms && dbRooms.length > 0) {
        currentRooms = currentRooms.map((cr) => {
          const matchedDb = dbRooms.find(
            (dbr: any) => dbr.roomNumber?.toUpperCase() === cr.id.toUpperCase(),
          );
          if (matchedDb && (matchedDb as any).imageUrl) {
            const dbImg = (matchedDb as any).imageUrl;
            if (
              dbImg &&
              !dbImg.includes("/rooms/room-") &&
              !dbImg.startsWith("/images/")
            ) {
              return { ...cr, image: dbImg };
            }
          }
          return cr;
        });
      }

      setRooms(currentRooms);
    } catch {
      // fallback
    }
  }, [dbRooms]);

  // Dengarkan perubahan saat tab mendapat fokus atau ada update localStorage dari admin
  useEffect(() => {
    const syncLocal = () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const masterRooms = JSON.parse(saved);
          if (Array.isArray(masterRooms) && masterRooms.length > 0) {
            setRooms((prev) =>
              prev.map((r) => {
                const match = masterRooms.find(
                  (mr: any) => mr.code?.toUpperCase() === r.id.toUpperCase(),
                );
                if (match) {
                  const cleanImg =
                    match.imageUrl &&
                    !match.imageUrl.includes("/rooms/room-") &&
                    !match.imageUrl.startsWith("/images/")
                      ? match.imageUrl
                      : "";
                  return {
                    ...r,
                    image: cleanImg || r.image,
                  };
                }
                return r;
              }),
            );
          }
        }
      } catch {}
    };

    window.addEventListener("focus", syncLocal);
    window.addEventListener("storage", syncLocal);
    return () => {
      window.removeEventListener("focus", syncLocal);
      window.removeEventListener("storage", syncLocal);
    };
  }, []);


  const count = rooms.length || 3;
  const REPEAT_COUNT = 40;
  const loopTrack = Array.from({ length: REPEAT_COUNT }, () => rooms).flat();
  const initialIndex = Math.floor(REPEAT_COUNT / 2) * count;
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const activeDotIndex = ((currentIndex % count) + count) % count;

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const CARD_WIDTH = 280; // px
  const CARD_GAP = 20; // px
  const TOTAL_CARD_UNIT = CARD_WIDTH + CARD_GAP; // 300px

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6">
      {/* Centered Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <span className="text-[11px] font-black uppercase tracking-widest text-purple-700 block mb-1.5">
          PILIHAN KAMAR TRANSIT
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-tight">
          Unit Kamar Bersih &amp; Terawat
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          100% kamar mandi dalam pribadi, kasur besar muat 2–3 tamu, TV layar
          datar, dan WiFi gratis kencang.
        </p>
      </div>

      {/* 3D Smooth Sliding Carousel Track */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-12">
        {/* Tombol Navigasi Kiri */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Kamar Sebelumnya"
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-purple-700 hover:scale-110 shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Tombol Navigasi Kanan */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Kamar Berikutnya"
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-purple-700 hover:scale-110 shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden py-4 sm:py-6">
          <div
            className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{
              transform: `translateX(calc(50% - ${
                currentIndex * TOTAL_CARD_UNIT + CARD_WIDTH / 2
              }px))`,
            }}
          >
            {loopTrack.map((room, index) => {
              const isCenter = index === currentIndex;
              const isAdjacent = Math.abs(index - currentIndex) === 1;

              return (
                <div
                  key={`${room.id}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[260px] sm:w-[280px] shrink-0 mx-2.5 transition-all duration-500 cursor-pointer ${
                    isCenter
                      ? "scale-105 sm:scale-110 z-20 opacity-100"
                      : isAdjacent
                        ? "scale-95 sm:scale-100 z-10 opacity-75 blur-[0.5px]"
                        : "scale-90 opacity-40 blur-[1px]"
                  }`}
                >
                  <div
                    className={`rounded-2xl sm:rounded-3xl bg-white overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isCenter
                        ? "border-2 border-purple-400/90 shadow-xl shadow-purple-950/10"
                        : "border border-slate-200/80 shadow-sm"
                    }`}
                  >
                    {/* Foto Kamar Bersih atau Placeholder */}
                    <div className="relative h-36 sm:h-44 w-full bg-slate-100 overflow-hidden">
                      {room.image ? (
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-50 via-purple-100/40 to-slate-100 flex flex-col items-center justify-center gap-1.5 text-purple-700/60 p-4">
                          <Bed className="w-8 h-8 stroke-[1.5]" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {room.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body Info */}
                    <div className="p-3 sm:p-4 text-left flex-1 flex flex-col justify-between space-y-1.5">
                      <div>
                        {/* Kategori Tipe Kamar */}
                        <div className="flex items-center gap-1 text-purple-700 font-bold text-[10px] sm:text-[11px] mb-0.5">
                          <Tag className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="truncate">{room.typeLabel}</span>
                        </div>

                        {/* Nama Kamar */}
                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1">
                          {room.name}
                        </h3>

                        {/* Deskripsi Singkat */}
                        <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                          {room.desc}
                        </p>
                      </div>

                      {/* Baris Harga & Aksi WhatsApp */}
                      <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-base sm:text-lg font-black text-purple-700 leading-none block">
                            {room.price}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                            DP 50%: {room.dp}
                          </span>
                        </div>

                        {isCenter ? (
                          <Button
                            asChild
                            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-3.5 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
                          >
                            <a
                              href={getRoomBookingWhatsAppUrl({
                                roomNumber: room.id,
                                roomName: room.name,
                                price: room.price.replace("Rp ", ""),
                              })}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Bed className="w-4 h-4" />
                              <span>Pesan</span>
                            </a>
                          </Button>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                            <Bed className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots Slider Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 sm:mt-3">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              type="button"
              onClick={() => {
                const diff = idx - activeDotIndex;
                setCurrentIndex((prev) => prev + diff);
              }}
              aria-label={`Lihat ${room.name}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeDotIndex
                  ? "w-6 h-2 bg-purple-700 shadow-xs"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Link ke Katalog Lengkap */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/kamar"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-purple-700 hover:text-purple-900 hover:underline transition"
        >
          <span>Lihat Seluruh 8 Unit Kamar di Halaman Katalog Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
