"use client";

import {
  Bed,
  CheckCircle2,
  Clock,
  Home,
  Phone,
  ShieldCheck,
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

  const allRooms = [
    {
      number: "101",
      name: "Kamar AC Superior #101",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      dp: 137500,
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      facilities: [
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis Kencang",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "102",
      name: "Kamar AC Superior #102",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      dp: 137500,
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      facilities: [
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis Kencang",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "103",
      name: "Kamar AC Superior #103",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      dp: 137500,
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      facilities: [
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis Kencang",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "104",
      name: "Kamar AC Superior #104",
      type: "ac",
      typeName: "Kamar AC Superior",
      floor: 1,
      price: 275000,
      dp: 137500,
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      facilities: [
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis Kencang",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "201",
      name: "Kamar Kipas Standar #201",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      dp: 100000,
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "202",
      name: "Kamar Kipas Standar #202",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      dp: 100000,
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "203",
      name: "Kamar Kipas Standar #203",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      dp: 100000,
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
    },
    {
      number: "204",
      name: "Kamar Kipas Standar #204",
      type: "kipas",
      typeName: "Kamar Kipas Standar",
      floor: 2,
      price: 200000,
      dp: 100000,
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const filtered = allRooms.filter((r) => {
    if (filter === "all") return true;
    return r.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#f8f5fc] text-[#1e1035] selection:bg-purple-200 selection:text-purple-900 pb-20 relative overflow-hidden">
      {/* Ambient Glass Glow Orbs */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-purple-300/35 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-pink-200/30 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-28">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="purple" className="mb-3">
            Katalog Lengkap
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Pilihan 8 Kamar Penginapan Annisa
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Semua kamar dilengkapi kamar mandi pribadi dalam, handuk bersih, TV, dan akses WiFi
            kencang. Hanya 750m (2–3 menit) dari Bandara Pattimura Ambon.
          </p>

          {/* Frosted Glass Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/80 shadow-2xs"
              }`}
            >
              Semua Kamar (8 Unit)
            </button>
            <button
              type="button"
              onClick={() => setFilter("ac")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === "ac"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/80 shadow-2xs"
              }`}
            >
              Kamar AC Superior (4 Unit)
            </button>
            <button
              type="button"
              onClick={() => setFilter("kipas")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === "kipas"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white border border-white/80 shadow-2xs"
              }`}
            >
              Kamar Kipas Standar (4 Unit)
            </button>
          </div>
        </div>

        {/* Glass Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((room) => (
            <Card
              key={room.number}
              className="overflow-hidden p-0 rounded-3xl border border-white/90 bg-white/75 backdrop-blur-xl hover:bg-white/90 hover:border-purple-200/90 hover:shadow-2xl shadow-purple-950/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-purple-50 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-950/85 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      #{room.number}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3 text-purple-300" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="font-bold text-base text-slate-900 mb-1">{room.name}</h2>
                  <p className="text-xs text-purple-700 font-semibold mb-3">
                    Lt. {room.floor} • {room.bed}
                  </p>

                  <div className="mb-4 p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-purple-800">
                        Rp {room.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[11px] text-slate-400">/ malam</span>
                    </div>
                    <span className="inline-block mt-1 text-[11px] font-bold text-purple-900 bg-purple-100/90 border border-purple-200/60 px-2 py-0.5 rounded-full">
                      DP 50%: Rp {room.dp.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-purple-100/50">
                    {room.facilities.slice(0, 4).map((fac) => (
                      <div key={fac} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{fac}</span>
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
                  className="w-full justify-center gap-1.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 shadow-purple-600/30"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20Kamar%20${room.number}%20(${encodeURIComponent(
                      room.typeName,
                    )}%20-%20Rp%20${room.price.toLocaleString("id-ID")}/mlm).%20Apakah%20masih%20tersedia?`}
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
