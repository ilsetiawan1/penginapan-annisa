"use client";

import { useState } from "react";
import { Footer } from "../../components/layout/footer";
import { Navbar } from "../../components/layout/navbar";
import type { RoomItem } from "../../features/public/rooms/components/room-card";
import { RoomFilter } from "../../features/public/rooms/components/room-filter";
import { RoomGrid } from "../../features/public/rooms/components/room-grid";
import { RoomHero } from "../../features/public/rooms/components/room-hero";

// 8 UNIT KAMAR RESMI PENGINAPAN ANNISA (SESUAI PRD & TRD)
const ROOMS_DATA: RoomItem[] = [
  // BANGUNAN A
  {
    number: "A1",
    name: "Kamar A1 — Tipe AC",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-ac-101.jpg",
  },
  {
    number: "A2",
    name: "Kamar A2 — Tipe AC",
    type: "ac",
    status: "terisi",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-ac-102.jpg",
  },
  {
    number: "A3",
    name: "Kamar A3 — Tipe Kipas",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-kipas-201.jpg",
  },
  {
    number: "A4",
    name: "Kamar A4 — Tipe Kipas",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-kipas-202.jpg",
  },

  // BANGUNAN B
  {
    number: "B1",
    name: "Kamar B1 — Tipe AC",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-ac-101.jpg",
  },
  {
    number: "B2",
    name: "Kamar B2 — Tipe AC",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "AC Dingin Nyaman",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-ac-102.jpg",
  },
  {
    number: "B3",
    name: "Kamar B3 — Tipe Kipas",
    type: "kipas",
    status: "terisi",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-kipas-201.jpg",
  },
  {
    number: "B4",
    name: "Kamar B4 — Tipe Kipas",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Besar (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: [
      "Kipas Angin Dinding",
      "Kamar Mandi Dalam Pribadi",
      "TV Layar Datar",
      "WiFi Gratis Kencang",
      "Handuk Bersih & Air Mineral",
    ],
    image: "/rooms/room-kipas-202.jpg",
  },
];

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas" | "tersedia">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [nights, setNights] = useState<number>(1);

  const filteredRooms = ROOMS_DATA.filter((r) => {
    const matchCategory =
      filter === "all" ? true : filter === "tersedia" ? r.status === "tersedia" : r.type === filter;

    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />
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
      <Footer />
    </div>
  );
}
