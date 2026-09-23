"use client";

import { useState } from "react";
import type { RoomItem } from "@/features/public/rooms/components/room-card";
import { RoomFilter } from "@/features/public/rooms/components/room-filter";
import { RoomGrid } from "@/features/public/rooms/components/room-grid";
import { RoomHero } from "@/features/public/rooms/components/room-hero";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas" | "tersedia">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [nights, setNights] = useState<number>(1);

  const { data: dbRooms, isLoading } = useRooms();

  // Map API rooms to UI RoomItem format
  const rooms: RoomItem[] = (dbRooms || []).map((r) => {
    const isAc =
      r.roomType?.name?.toLowerCase().includes("ac") ||
      r.roomNumber.startsWith("A") ||
      r.roomTypeId?.toLowerCase().includes("ac");
    const priceNum = r.roomType?.basePrice || (isAc ? 275000 : 200000);
    const dpNum = Math.round(priceNum * 0.5);

    return {
      number: r.roomNumber,
      name: `Kamar ${r.roomNumber}`,
      type: isAc ? "ac" : "kipas",
      status: r.status === "ready" ? "tersedia" : "terisi",
      price: priceNum.toLocaleString("id-ID"),
      dp: dpNum.toLocaleString("id-ID"),
      bed: "1 Kasur Besar (Double Bed)",
      capacity: "2–3 Tamu",
      facilities: r.roomType?.facilities?.length
        ? r.roomType.facilities
        : isAc
          ? [
              "AC Dingin Nyaman",
              "Kamar Mandi Dalam Pribadi",
              "TV Layar Datar",
              "WiFi Gratis Kencang",
              "Handuk Bersih & Air Mineral",
            ]
          : [
              "Kipas Angin Dinding",
              "Kamar Mandi Dalam Pribadi",
              "TV Layar Datar",
              "WiFi Gratis Kencang",
              "Handuk Bersih & Air Mineral",
            ],
      image:
        r.roomType?.images?.[0]?.imageUrl ||
        (isAc
          ? `/rooms/room-ac-${r.roomNumber.toLowerCase()}.jpg`
          : `/rooms/room-kipas-${r.roomNumber.toLowerCase()}.jpg`),
    };
  });



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
      {isLoading ? (
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-slate-200/80 rounded-3xl" />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
