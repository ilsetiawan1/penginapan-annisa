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

  // Inisialisasi langsung dari localStorage secara instan (0 milidetik jeda)
  const [rooms, setRooms] = useState<RoomItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const masterRooms = JSON.parse(saved);
          if (Array.isArray(masterRooms) && masterRooms.length > 0) {
            return masterRooms.map((mr: any) => {
              const isAc = mr.type === "ac";
              const priceNum = Number(mr.price) || (isAc ? 275000 : 200000);
              const dpNum = Math.round(priceNum * 0.5);

              return {
                number: mr.code,
                name: mr.name || `Kamar #${mr.code} (${isAc ? "AC" : "Kipas"})`,
                type: isAc ? "ac" : "kipas",
                status: "tersedia",
                price: priceNum.toLocaleString("id-ID"),
                dp: dpNum.toLocaleString("id-ID"),
                bed: "1 Kasur Queen (Double Bed)",
                capacity: `${mr.capacity || 2}–3 Tamu`,
                facilities: Array.isArray(mr.facilities) && mr.facilities.length > 0
                  ? mr.facilities
                  : isAc
                    ? ["AC Dingin Nyaman", "Kamar Mandi Dalam Pribadi", "Shower Air Hangat", "TV & WiFi"]
                    : ["Kipas Angin Dinding", "Kamar Mandi Dalam Pribadi", "TV & WiFi"],
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
    return DEFAULT_PUBLIC_ROOMS;
  });

  const { data: dbRooms, refetch: refetchRooms } = useRooms();

  // Sinkronkan data ketersediaan kamar dan foto dari database server (Cloudflare R2)
  useEffect(() => {
    if (!dbRooms || dbRooms.length === 0) return;

    setRooms((prevRooms) =>
      prevRooms.map((r) => {
        const matchedDb = dbRooms.find(
          (dbr: any) => dbr.roomNumber?.toUpperCase() === r.number.toUpperCase(),
        );
        if (matchedDb) {
          const dbImg = (matchedDb as any).imageUrl;
          const cleanDbImg =
            dbImg &&
            !dbImg.includes("/rooms/room-") &&
            !dbImg.startsWith("/images/")
              ? dbImg
              : "";

          return {
            ...r,
            status: matchedDb.status === "ready" ? "tersedia" : "terisi",
            image: cleanDbImg || "",
          };
        }
        return r;
      }),
    );
  }, [dbRooms]);

  // Dengarkan perubahan saat tab mendapat fokus atau ada update localStorage dari admin
  useEffect(() => {
    const syncFromLocalStorage = () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const masterRooms = JSON.parse(saved);
          if (Array.isArray(masterRooms) && masterRooms.length > 0) {
            setRooms((prev) =>
              prev.map((r) => {
                const match = masterRooms.find(
                  (mr: any) => mr.code?.toUpperCase() === r.number.toUpperCase(),
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
                    image: cleanImg || "",
                  };
                }
                return r;
              }),
            );
          }
        }
      } catch {
        // ignore
      }
    };

    const onWindowFocus = () => {
      refetchRooms();
      syncFromLocalStorage();
    };

    window.addEventListener("focus", onWindowFocus);
    window.addEventListener("storage", syncFromLocalStorage);
    return () => {
      window.removeEventListener("focus", onWindowFocus);
      window.removeEventListener("storage", syncFromLocalStorage);
    };
  }, [refetchRooms]);


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
