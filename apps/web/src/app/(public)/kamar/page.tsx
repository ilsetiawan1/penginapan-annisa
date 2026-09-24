"use client";

import { useState, useEffect } from "react";
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
    name: "Kamar A1 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-ac-101.jpg",
  },
  {
    number: "A2",
    name: "Kamar A2 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-ac-102.jpg",
  },
  {
    number: "A3",
    name: "Kamar A3 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-kipas-201.jpg",
  },
  {
    number: "A4",
    name: "Kamar A4 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-kipas-202.jpg",
  },

  // BANGUNAN B
  {
    number: "B1",
    name: "Kamar B1 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-ac-101.jpg",
  },
  {
    number: "B2",
    name: "Kamar B2 (AC)",
    type: "ac",
    status: "tersedia",
    price: "275.000",
    dp: "137.500",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-ac-102.jpg",
  },
  {
    number: "B3",
    name: "Kamar B3 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-kipas-201.jpg",
  },
  {
    number: "B4",
    name: "Kamar B4 (Kipas)",
    type: "kipas",
    status: "tersedia",
    price: "200.000",
    dp: "100.000",
    bed: "1 Kasur Queen (Double Bed)",
    capacity: "2–3 Tamu",
    facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV Layar Datar", "WiFi Gratis Kencang", "Handuk Bersih"],
    image: "/rooms/room-kipas-202.jpg",
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
  const [rooms, setRooms] = useState<RoomItem[]>(DEFAULT_PUBLIC_ROOMS);

  const { data: dbRooms, isLoading } = useRooms();

  // Sinkronkan data kamar publik dengan Master Room Management (localStorage / server)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const masterRooms = JSON.parse(saved);
        if (Array.isArray(masterRooms) && masterRooms.length > 0) {
          const mapped: RoomItem[] = masterRooms.map((mr: any) => {
            const isAc = mr.type === "ac";
            const priceNum = Number(mr.price) || (isAc ? 275000 : 200000);
            const dpNum = Math.round(priceNum * 0.5);

            // Cek status real-time dari database jika ada
            const matchedDbRoom = (dbRooms || []).find(
              (dbr) => dbr.roomNumber.toUpperCase() === mr.code.toUpperCase(),
            );
            const isReady = matchedDbRoom ? matchedDbRoom.status === "ready" : true;

            return {
              number: mr.code,
              name: mr.name || `Kamar ${mr.code} (${isAc ? "AC" : "Kipas"})`,
              type: isAc ? "ac" : "kipas",
              status: isReady ? "tersedia" : "terisi",
              price: priceNum.toLocaleString("id-ID"),
              dp: dpNum.toLocaleString("id-ID"),
              bed: "1 Kasur Queen (Double Bed)",
              capacity: `${mr.capacity || 2}–3 Tamu`,
              facilities: Array.isArray(mr.facilities) && mr.facilities.length > 0
                ? mr.facilities
                : isAc
                  ? ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV & WiFi"]
                  : ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV & WiFi"],
              image: mr.imageUrl || (isAc ? "/rooms/room-ac-101.jpg" : "/rooms/room-kipas-201.jpg"),
            };
          });

          setRooms(mapped);
          return;
        }
      }

      // Fallback mapping jika localStorage belum ada
      if (dbRooms && dbRooms.length > 0) {
        const mappedFromDb: RoomItem[] = dbRooms.map((r) => {
          const isAc =
            r.roomType?.name?.toLowerCase().includes("ac") ||
            r.roomNumber.startsWith("A") ||
            r.roomTypeId?.toLowerCase().includes("ac");
          const priceNum = r.roomType?.basePrice || (isAc ? 275000 : 200000);
          const dpNum = Math.round(priceNum * 0.5);

          return {
            number: r.roomNumber,
            name: `Kamar ${r.roomNumber} (${isAc ? "AC" : "Kipas"})`,
            type: isAc ? "ac" : "kipas",
            status: r.status === "ready" ? "tersedia" : "terisi",
            price: priceNum.toLocaleString("id-ID"),
            dp: dpNum.toLocaleString("id-ID"),
            bed: "1 Kasur Besar (Double Bed)",
            capacity: "2–3 Tamu",
            facilities: r.roomType?.facilities?.length
              ? r.roomType.facilities
              : isAc
                ? ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "TV", "WiFi Gratis"]
                : ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV", "WiFi Gratis"],
            image:
              r.roomType?.images?.[0]?.imageUrl ||
              (isAc ? "/rooms/room-ac-101.jpg" : "/rooms/room-kipas-201.jpg"),
          };
        });
        setRooms(mappedFromDb);
      }
    } catch {
      // fallback to default
    }
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
      {isLoading && rooms.length === 0 ? (
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
