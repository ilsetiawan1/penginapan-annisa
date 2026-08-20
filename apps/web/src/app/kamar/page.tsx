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
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas">("all");

  const rooms = [
    {
      number: "A1",
      name: "Kamar A1 — Tipe AC",
      type: "ac",
      status: "ready",
      badge: "Siap Huni",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
      status: "ready",
      badge: "Siap Huni",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
      status: "ready",
      badge: "Siap Huni",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
      status: "ready",
      badge: "Siap Huni",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
    {
      number: "B1",
      name: "Kamar B1 — Tipe AC",
      type: "ac",
      status: "ready",
      badge: "Siap Huni",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
      status: "ready",
      badge: "Siap Huni",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
      status: "ready",
      badge: "Siap Huni",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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
      status: "ready",
      badge: "Siap Huni",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
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

  const filtered = rooms.filter((r) => {
    if (filter === "all") return true;
    return r.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-28 sm:pt-32">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-purple-700 block mb-1">
            Katalog 8 Unit
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Pilihan Kamar Transit
          </h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Semua kamar ber-toilet dalam pribadi, TV, WiFi gratis, kasur besar, dan handuk bersih.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === "all"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              Semua (8)
            </button>
            <button
              type="button"
              onClick={() => setFilter("ac")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === "ac"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200/80"
              }`}
            >
              Tipe AC (4)
            </button>
            <button
              type="button"
              onClick={() => setFilter("kipas")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === "kipas"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200/80"
              }`}
            >
              Tipe Kipas (4)
            </button>
          </div>
        </div>

        {/* 8 Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
                  {/* Status Badge (Ready / Siap Huni) */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{room.badge}</span>
                    </span>
                  </div>
                  {/* Room Number Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                      #{room.number}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                        {room.name}
                      </h3>
                      <p className="text-xs text-purple-700 font-semibold mt-0.5">{room.bed}</p>
                    </div>
                  </div>

                  <div className="my-3 flex items-baseline justify-between border-y border-slate-100 py-2">
                    <div>
                      <span className="text-lg font-black text-purple-700">Rp {room.price}</span>
                      <span className="text-[10px] text-slate-500 font-medium"> / malam</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      DP: <span className="text-purple-700">Rp {room.dp}</span>
                    </span>
                  </div>

                  {/* Facilities list */}
                  <ul className="space-y-1.5 mb-4">
                    {room.facilities.map((fac) => (
                      <li key={fac} className="flex items-center text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 mr-2 shrink-0" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom WhatsApp Booking CTA */}
              <div className="p-4 sm:p-5 pt-0">
                <Button
                  asChild
                  variant="primary"
                  className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold gap-2 text-xs h-10 shadow-xs"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20Kamar%20${room.number}%20${encodeURIComponent(
                      room.name,
                    )}%20(Rp%20${room.price}/mlm).%20Apakah%20unit%20tersedia?`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Pesan via WhatsApp</span>
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
