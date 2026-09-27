"use client";

import { useState, useEffect, useMemo } from "react";
import type { RoomItem } from "@/features/public/rooms/components/room-card";
import { RoomFilter } from "@/features/public/rooms/components/room-filter";
import { RoomGrid } from "@/features/public/rooms/components/room-grid";
import { RoomHero } from "@/features/public/rooms/components/room-hero";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

const LOCAL_STORAGE_KEY = "annisa_master_rooms_v3";

const DEFAULT_PUBLIC_ROOMS: RoomItem[] = [
  // BANGUNAN A
  {
    number: "A1",
    name: "Kamar #A1 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
  {
    number: "A2",
    name: "Kamar #A2 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
  {
    number: "A3",
    name: "Kamar #A3 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
  {
    number: "A4",
    name: "Kamar #A4 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },

  // BANGUNAN B
  {
    number: "B1",
    name: "Kamar #B1 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
  {
    number: "B2",
    name: "Kamar #B2 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
  {
    number: "B3",
    name: "Kamar #B3 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
  {
    number: "B4",
    name: "Kamar #B4 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "",
  },
];

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas" | "tersedia">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [nights, setNights] = useState<number>(1);

  // Ambil data kamar langsung dari database server (PostgreSQL & Cloudflare R2)
  const { data: dbRooms } = useRooms();

  // Bersihkan sisa localStorage lama agar tidak pernah meracuni cache browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  // Data kamar 100% tersinkronisasi secara murni dengan database server (Single Source of Truth)
  const rooms: RoomItem[] = useMemo(() => {
    if (!dbRooms || dbRooms.length === 0) {
      return DEFAULT_PUBLIC_ROOMS;
    }

    return dbRooms.map((r: any) => {
      const isAc =
        r.roomType?.name?.toLowerCase().includes("ac") ||
        (r.roomNumber?.startsWith("A") &&
          !r.roomType?.name?.toLowerCase().includes("kipas"));
      const priceNum = Number(r.roomType?.basePrice) || (isAc ? 275000 : 200000);
      const dpNum = Math.round(priceNum * 0.5);

      const rawImg = r.imageUrl;
      const cleanImg =
        rawImg &&
        !rawImg.includes("/rooms/room-") &&
        !rawImg.startsWith("/images/")
          ? rawImg
          : "";

      return {
        number: r.roomNumber,
        name: `Kamar #${r.roomNumber} (${isAc ? "AC" : "Kipas"})`,
        type: isAc ? "ac" : "kipas",
        status: r.status === "ready" ? "tersedia" : "terisi",
        price: priceNum.toLocaleString("id-ID"),
        dp: dpNum.toLocaleString("id-ID"),
        bed: r.roomType?.bedType || "1 Kasur Queen (Double Bed)",
        capacity: `${r.roomType?.capacity || 2}–3 Tamu`,
        facilities:
          Array.isArray(r.roomType?.facilities) && r.roomType.facilities.length > 0
            ? r.roomType.facilities
            : isAc
              ? [
                  "AC Dingin Nyaman",
                  "Kamar Mandi Dalam Pribadi",
                  "Shower Air Hangat",
                  "TV & WiFi",
                ]
              : [
                  "Kipas Angin Dinding",
                  "Kamar Mandi Dalam Pribadi",
                  "TV & WiFi",
                ],
        image: cleanImg,
      };
    });
  }, [dbRooms]);


  const filteredRooms = rooms.filter((r) => {
    const matchCategory =
      filter === "all"
        ? true
        : filter === "tersedia"
          ? r.status === "tersedia"
          : r.type === filter;

    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full">
      <RoomHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <RoomFilter
        checkInDate={checkInDate}
        onCheckInDateChange={setCheckInDate}
        nights={nights}
        onNightsChange={setNights}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <RoomGrid
        rooms={filteredRooms}
        searchQuery={searchQuery}
        checkInDate={checkInDate}
        nights={nights}
        onReset={() => {
          setSearchQuery("");
          setFilter("all");
          setNights(1);
        }}
      />
    </div>
  );
}
