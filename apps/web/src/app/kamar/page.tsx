"use client";

import {
  Bed,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Moon,
  Phone,
  Plane,
  Sparkles,
  Users,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "../../components/layout/navbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas">("all");

  const rooms = [
    {
      number: "101",
      name: "Kamar 101 — AC Superior",
      type: "ac",
      floor: 1,
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 Double Bed (King Size)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk & Perlengkapan Mandi",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "102",
      name: "Kamar 102 — AC Superior",
      type: "ac",
      floor: 1,
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 Double Bed (King Size)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk & Perlengkapan Mandi",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "103",
      name: "Kamar 103 — AC Superior",
      type: "ac",
      floor: 1,
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 Double Bed (King Size)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk & Perlengkapan Mandi",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "104",
      name: "Kamar 104 — AC Superior",
      type: "ac",
      floor: 1,
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 Double Bed (King Size)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk & Perlengkapan Mandi",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "201",
      name: "Kamar 201 — Kipas Standar",
      type: "kipas",
      floor: 2,
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "1 Double Bed / 2 Single Bed",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "202",
      name: "Kamar 202 — Kipas Standar",
      type: "kipas",
      floor: 2,
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "1 Double Bed / 2 Single Bed",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "203",
      name: "Kamar 203 — Kipas Standar",
      type: "kipas",
      floor: 2,
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "1 Double Bed / 2 Single Bed",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "204",
      name: "Kamar 204 — Kipas Standar",
      type: "kipas",
      floor: 2,
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "1 Double Bed / 2 Single Bed",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis Kencang",
        "TV Layar Datar",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const filtered = rooms.filter((r) => {
    if (filter === "all") return true;
    return r.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-28">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="purple" className="mb-2">
            Katalog 8 Unit Kamar
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Pilihan Kamar Transit
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Semua kamar dilengkapi kamar mandi dalam pribadi, WiFi gratis, dan handuk bersih.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === "all"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              Semua Kamar (8)
            </button>
            <button
              type="button"
              onClick={() => setFilter("ac")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === "ac"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200/80"
              }`}
            >
              AC Superior (4)
            </button>
            <button
              type="button"
              onClick={() => setFilter("kipas")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === "kipas"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200/80"
              }`}
            >
              Kipas Standar (4)
            </button>
          </div>
        </div>

        {/* 8 Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((room) => (
            <Card
              key={room.number}
              className="overflow-hidden p-0 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      #{room.number}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="font-bold text-base text-slate-900 mb-0.5">{room.name}</h2>
                  <p className="text-[11px] text-purple-700 font-semibold mb-3">{room.bed}</p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-purple-700">Rp {room.price}</span>
                      <span className="text-[10px] text-slate-500 font-medium">/ malam</span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold text-purple-900 bg-purple-100/80 px-2 py-0.5 rounded-full">
                      DP 50%: Rp {room.dp}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    {room.facilities.map((fac) => (
                      <div key={fac} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                        <span className="text-[11px]">{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="w-full justify-center gap-1.5 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-xs"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20booking%20${encodeURIComponent(
                      room.name,
                    )}%20(Rp%20${room.price}/mlm).%20Apakah%20unit%20tersedia?`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Booking Kamar #{room.number}</span>
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
