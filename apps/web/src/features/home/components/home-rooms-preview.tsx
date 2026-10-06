"use client";

import { Button } from "@/components/ui/button";
import { SkewedCarousel, type SkewedCarouselItem } from "@/components/ui/skewed-carousel";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { getRoomBookingWhatsAppUrl } from "@/lib/whatsapp";
import type { Room } from "@annisa/types";
import { ArrowRight, Bed, Tag } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface FeaturedRoom extends SkewedCarouselItem {
  id: string;
  title: string;
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
    title: "Kamar #A1",
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
    title: "Kamar #A2",
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
    title: "Kamar #A3",
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
  const { data: dbRooms } = useRooms();

  // Sinkronkan 3 kamar unggulan secara langsung dari database backend
  const rooms: FeaturedRoom[] = useMemo(() => {
    if (!dbRooms || dbRooms.length === 0) {
      return DEFAULT_3_FEATURED_ROOMS;
    }

    return dbRooms.slice(0, 3).map((r: Room) => {
      const isAc =
        r.roomType?.name?.toLowerCase().includes("ac") ||
        (r.roomNumber?.startsWith("A") && !r.roomType?.name?.toLowerCase().includes("kipas"));
      const priceNum = Number(r.roomType?.basePrice) || (isAc ? 275000 : 200000);
      const dpNum = Math.round(priceNum * 0.5);

      const rawImg = r.imageUrl;
      const cleanImg =
        rawImg && !rawImg.includes("/rooms/room-") && !rawImg.startsWith("/images/") ? rawImg : "";

      return {
        id: r.roomNumber,
        title: `Kamar #${r.roomNumber}`,
        name: `Kamar #${r.roomNumber} (${isAc ? "AC" : "Kipas"})`,
        typeLabel: isAc ? "Tipe AC" : "Tipe Kipas",
        price: `Rp ${priceNum.toLocaleString("id-ID")}`,
        priceNum,
        dp: `Rp ${dpNum.toLocaleString("id-ID")}`,
        desc:
          r.roomType?.description ||
          "1 Kasur besar muat 2–3 tamu, kamar mandi dalam pribadi, TV, dan WiFi kencang.",
        image: cleanImg,
      };
    });
  }, [dbRooms]);

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6 bg-[#fdfcfe]">
      {/* Centered Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2f4] text-[#3c315b] border border-[#e9e8ea] text-[11px] font-medium tracking-wide mb-2.5">
          <span>PILIHAN KAMAR TRANSIT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1c1c1c] tracking-[-0.025em] leading-tight">
          Unit Kamar Bersih &amp; Terawat
        </h2>
        <p className="text-xs sm:text-sm text-[#86848d] mt-2 max-w-md mx-auto leading-relaxed font-normal">
          100% kamar mandi dalam pribadi, kasur besar muat 2–3 tamu, pendingin ruangan, dan WiFi
          gratis kencang.
        </p>
      </div>

      {/* Skewed 3D Carousel Showcase */}
      <div className="relative max-w-5xl mx-auto px-2 sm:px-4">
        <SkewedCarousel<FeaturedRoom>
          items={rooms}
          cardWidth={280}
          mobileCardWidth={215}
          aspect={1.32}
          step={294}
          mobileStep={118}
          skew={5}
          mobileSkew={3}
          sideScale={0.65}
          mobileSideScale={0.72}
          autoPlay={3000}
          renderCard={(room, isCenter) => (
            <div className="h-full w-full flex flex-col justify-between bg-white text-left select-none">
              {/* Foto Kamar / Placeholder (Lebih Panjang & Dominan) */}
              <div className="relative flex-1 min-h-0 w-full bg-[#f4f2f4] overflow-hidden">
                {room.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#faf8fd] via-[#ede8f8]/60 to-[#f4f2f4] flex flex-col items-center justify-center gap-1.5 text-[#3c315b]/60 p-4">
                    <Bed className="w-8 h-8 stroke-[1.5]" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86848d]">
                      {room.name}
                    </span>
                  </div>
                )}

                {/* Badge Tipe Kamar */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#e9e8ea] text-[#3c315b] text-[9px] sm:text-[10px] font-medium shadow-xs">
                  <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#3c315b]" />
                  <span>{room.typeLabel}</span>
                </div>
              </div>

              {/* Body Info (Tanpa Deskripsi Panjang) */}
              <div className="p-3 sm:p-4 shrink-0 flex flex-col gap-2 sm:gap-2.5">
                <div>
                  <h3 className="font-medium text-xs sm:text-sm text-[#1c1c1c] leading-snug line-clamp-1">
                    {room.name}
                  </h3>
                </div>

                {/* Baris Harga & Aksi WhatsApp */}
                <div className="pt-2 sm:pt-2.5 border-t border-[#e9e8ea] flex items-center justify-between gap-1.5 sm:gap-2">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-[#1c1c1c] leading-none block">
                      {room.price}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#86848d] font-normal mt-0.5 block">
                      DP 50%: {room.dp}
                    </span>
                  </div>

                  {isCenter ? (
                    <Button
                      asChild
                      className="rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white font-medium text-[11px] sm:text-xs h-7 sm:h-8 px-3 sm:px-4 gap-1 sm:gap-1.5 shadow-[0px_0px_12px_rgba(226,223,254,0.85)] cursor-pointer shrink-0 transition-all duration-200 hover:scale-105 active:scale-95"
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
                        <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Pesan</span>
                      </a>
                    </Button>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f4f2f4] border border-[#e9e8ea] flex items-center justify-center text-[#86848d] shrink-0">
                      <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Link ke Halaman Katalog Lengkap */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3c315b] hover:text-[#2d2445] hover:underline transition"
        >
          <span>Lihat Semua Kamar</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
