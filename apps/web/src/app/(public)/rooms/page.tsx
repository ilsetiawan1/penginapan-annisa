"use client";

import type { RoomItem } from "@/features/rooms/components/public/room-card";
import { RoomFilter } from "@/features/rooms/components/public/room-filter";
import { RoomGrid } from "@/features/rooms/components/public/room-grid";
import { RoomHero } from "@/features/rooms/components/public/room-hero";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { useEffect, useMemo, useState } from "react";

const LOCAL_STORAGE_KEY = "annisa_master_rooms_v3";

const DEFAULT_PUBLIC_ROOMS: RoomItem[] = [
  // BANGUNAN A
  {
    number: "A1",
    name: "Kamar #A1",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "Shower Air Hangat",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
  {
    number: "A2",
    name: "Kamar #A2",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "Shower Air Hangat",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
  {
    number: "A3",
    name: "Kamar #A3",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
  {
    number: "A4",
    name: "Kamar #A4",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },

  // BANGUNAN B
  {
    number: "B1",
    name: "Kamar #B1",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "Shower Air Hangat",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
  {
    number: "B2",
    name: "Kamar #B2",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "Shower Air Hangat",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
  {
    number: "B3",
    name: "Kamar #B3",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
  {
    number: "B4",
    name: "Kamar #B4",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih",
    ],
    image: "",
  },
];

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas" | "tersedia">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  });
  const [nights, setNights] = useState<number>(1);

  // Hitung tanggal check-out berdasarkan tanggal check-in dan durasi malam
  const checkOutDate = useMemo(() => {
    if (!checkInDate) return undefined;
    const [y, m, d] = checkInDate.split("-").map(Number);
    const out = new Date(y, m - 1, d + nights);
    return `${out.getFullYear()}-${String(out.getMonth() + 1).padStart(2, "0")}-${String(out.getDate()).padStart(2, "0")}`;
  }, [checkInDate, nights]);

  // Ambil data kamar langsung dari database server dengan parameter tanggal check-in & check-out
  const { data: dbRooms } = useRooms({ checkInDate, checkOutDate });

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
        (r.roomNumber?.startsWith("A") && !r.roomType?.name?.toLowerCase().includes("kipas"));
      const priceNum = Number(r.roomType?.basePrice) || (isAc ? 275000 : 200000);
      const dpNum = Math.round(priceNum * 0.5);

      const rawImg = r.imageUrl;
      const cleanImg =
        rawImg && !rawImg.includes("/rooms/room-") && !rawImg.startsWith("/images/") ? rawImg : "";

      // Kamar berstatus tersedia HANYA JIKA tidak ada reservasi aktif pada rentang tanggal yang dipilih
      const isAvailable = r.isAvailable !== undefined ? r.isAvailable : r.status === "ready";

      return {
        number: r.roomNumber,
        name: `Kamar #${r.roomNumber}`,
        type: isAc ? "ac" : "kipas",
        status: isAvailable ? "tersedia" : "terisi",
        price: priceNum.toLocaleString("id-ID"),
        dp: dpNum.toLocaleString("id-ID"),
        bed: r.roomType?.bedType || "1 Kasur Queen (Double Bed)",
        capacity: `${r.roomType?.capacity || 2}–3 Tamu`,
        facilities:
          Array.isArray(r.roomType?.facilities) && r.roomType.facilities.length > 0
            ? r.roomType.facilities
            : isAc
              ? ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV & WiFi"]
              : ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV & WiFi"],
        image: cleanImg,
      };
    });
  }, [dbRooms]);

  const filteredRooms = rooms.filter((r) => {
    const matchCategory =
      filter === "all" ? true : filter === "tersedia" ? r.status === "tersedia" : r.type === filter;

    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full bg-[#fdfcfe]">
      <RoomHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <RoomFilter
        checkInDate={checkInDate}
        onCheckInDateChange={setCheckInDate}
        nights={nights}
        onNightsChange={setNights}
      />
      <RoomGrid
        rooms={filteredRooms}
        searchQuery={searchQuery}
        checkInDate={checkInDate}
        nights={nights}
        activeFilter={filter}
        onFilterChange={setFilter}
        onReset={() => {
          setSearchQuery("");
          setFilter("all");
          setNights(1);
        }}
      />
    </div>
  );
}
