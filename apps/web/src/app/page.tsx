"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bed,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Plane,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "../components/layout/navbar";
import { Button } from "../components/ui/button";
import { BookingWidget } from "../features/booking/booking-widget";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whyChooseUs = [
    {
      icon: Plane,
      title: "Bebas Risiko Terlambat",
      desc: "Hanya 750m (2–3 menit) dari gerbang terminal Bandara Pattimura. Sangat aman untuk penerbangan subuh.",
      tag: "750m Bandara",
    },
    {
      icon: Clock,
      title: "Check-In Fleksibel",
      desc: "Buka 07:00–21:00 WIT. Tiba pagi bisa langsung masuk jika unit telah siap (Ready).",
      tag: "07:00–21:00 WIT",
    },
    {
      icon: ShieldCheck,
      title: "100% Kamar Mandi Dalam",
      desc: "Semua kamar ber-toilet pribadi, kasur bersih, WiFi kencang, dan etalase oleh-oleh di resepsionis.",
      tag: "Privasi Terjaga",
    },
  ];

  const previewRooms = [
    {
      id: "101",
      number: "101",
      name: "Tipe AC",
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      capacity: "2–3 Orang",
      highlights: ["AC Dingin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-ac-101.jpg",
    },
    {
      id: "102",
      number: "102",
      name: "Tipe AC",
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      capacity: "2–3 Orang",
      highlights: ["AC Dingin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-ac-102.jpg",
    },
    {
      id: "201",
      number: "201",
      name: "Tipe Kipas",
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      capacity: "2–3 Orang",
      highlights: ["Kipas Angin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-kipas-201.jpg",
    },
    {
      id: "202",
      number: "202",
      name: "Tipe Kipas",
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Org)",
      capacity: "2–3 Orang",
      highlights: ["Kipas Angin", "KM Dalam", "TV", "WiFi"],
      image: "/rooms/room-kipas-202.jpg",
    },
  ];

  const previewSouvenirs = [
    {
      name: "Minyak Kayu Putih Namlea",
      category: "Herbal Asli",
      price: "Rp 65.000",
      desc: "Penyulingan murni Pulau Buru Namlea.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kue Sagu Bagea Kenari",
      category: "Camilan Khas",
      price: "Rp 35.000",
      desc: "Renyah gurih dengan biji kenari melimpah.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Roti Kenari Khas Maluku",
      category: "Pastry Kering",
      price: "Rp 45.000",
      desc: "Panggang kering renyah bertabur kenari.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kopi Rarobang Rempah",
      category: "Minuman Khas",
      price: "Rp 40.000",
      desc: "Kopi rempah jahe & kenari sangrai.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const faqs = [
    {
      q: "Berapa jarak ke Bandara Pattimura?",
      a: "Hanya 750 meter dari terminal bandara (2–3 menit perjalanan).",
    },
    {
      q: "Apakah check-in fleksibel untuk pesawat pagi?",
      a: "Ya, kami beroperasi 07:00–21:00 WIT. Bisa langsung check-in jika kamar siap.",
    },
    {
      q: "Bagaimana cara booking kamar?",
      a: "Pemesanan via WhatsApp dengan transfer DP 50%. Sisa pelunasan saat tiba di lokasi.",
    },
    {
      q: "Apakah semua kamar memiliki kamar mandi dalam?",
      a: "Ya, 100% dari 8 kamar kami memiliki kamar mandi pribadi di dalam.",
    },
  ];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-purple-200 selection:text-purple-900 font-sans">
      <Navbar />

      {/* ====================================================
          BLOCK 1: HERO SECTION (WHITE CANVAS)
          ==================================================== */}
      <section className="relative w-full bg-[#faf9fc] pt-24 sm:pt-32 pb-8 sm:pb-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Kolom Kiri: Value, Headline & Trust Badges */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              {/* Interactive Google Maps Route Link */}
              <a
                href="https://maps.app.goo.gl/Dzvo8bawqgoMmova9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 hover:border-purple-300 hover:bg-purple-50/60 text-slate-800 hover:text-purple-950 text-xs font-bold transition-all shadow-2xs group mb-3 sm:mb-4 w-fit"
              >
                <span className="w-5 h-5 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                  <MapPin className="w-3 h-3" />
                </span>
                <span>Rute ke Bandara di Google Maps</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* Crisp Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.15]">
                Penginapan Transit Nyaman Dekat{" "}
                <span className="text-purple-700">Bandara Pattimura</span>
              </h1>

              {/* Concise Subtitle */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-lg">
                Solusi istirahat ideal untuk penerbangan subuh, transit dinas, dan wisata di Ambon.
                Bersih, tenang, dan bebas macet.
              </p>

              {/* 4 Minimalist Highlights Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4 sm:mt-5 max-w-lg">
                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Plane className="w-3.5 h-3.5" />
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">3 Mnt Bandara</span>
                    <span className="text-[10px] text-slate-500">750m ke terminal</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Bed className="w-3.5 h-3.5" />
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">8 Unit Kamar</span>
                    <span className="text-[10px] text-slate-500">4 AC &amp; 4 Kipas</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">KM Dalam</span>
                    <span className="text-[10px] text-slate-500">100% Private</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">07:00–21:00 WIT</span>
                    <span className="text-[10px] text-slate-500">Check-in Fleksibel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Card Foto Kamar Cantik & Booking Widget */}
            <div className="lg:col-span-6">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================================
          BLOCK 2: KEUNGGULAN + PILIHAN UNIT (PURPLE CANVAS DENGAN SEAMLESS BLUR GRADIENT WASH)
          Fades smoothly from #faf9fc (White) into #f1eaff (Purple) and melts back into #faf9fc (White)
          ========================================================================================= */}
      <div className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#f1eaff] via-15% via-[#f1eaff] via-85% to-[#faf9fc] py-10 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14">
          {/* 2.1 Section Keunggulan / Nilai Utama */}
          <div>
            <div className="mb-3.5 sm:mb-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-800 block mb-0.5">
                Keunggulan
              </span>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                Kenapa Memilih Penginapan Annisa?
              </h2>
            </div>

            {/* 3 Cards Direct Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-200/80 shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all flex items-start gap-2.5 sm:flex-col sm:justify-between group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shadow-2xs shrink-0 mt-0.5 sm:mt-0 sm:mb-2 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {item.title}
                        </h3>
                        <span className="hidden sm:inline-block text-[9px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2.2 Section Pilihan Unit / Tipe Kamar */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-5 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-800 block mb-0.5">
                  Pilihan Unit
                </span>
                <h2 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                  Tipe Kamar Transit
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-purple-200 bg-white/90 text-slate-800 hover:bg-white font-bold text-[10px] sm:text-xs gap-1 shrink-0 px-2.5 py-1 h-7"
              >
                <Link href="/kamar">
                  <span>Semua 8 Kamar</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>

            {/* 1 Card Full + 2nd Card Half Peek on Mobile Swipe (min-w-[76vw]) */}
            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-4 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 no-scrollbar">
              {previewRooms.map((room) => (
                <div
                  key={room.id}
                  className="snap-center min-w-[76vw] sm:min-w-[260px] md:min-w-0 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-200/80 shadow-2xs hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between flex-shrink-0 md:flex-shrink"
                >
                  <div>
                    <div className="relative h-32 sm:h-40 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-slate-900/90 text-white px-2 py-0.5 rounded-full text-[8px] font-bold">
                          {room.badge}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="bg-purple-700 text-white px-2 py-0.5 rounded-full text-[8px] font-bold">
                          #{room.number}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <div>
                          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                            {room.name}
                          </h3>
                          <p className="text-[10px] text-purple-700 font-semibold mt-0.5">{room.bed}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs sm:text-base font-black text-purple-700">Rp {room.price}</p>
                          <span className="text-[8px] text-slate-500 font-medium">/ malam</span>
                        </div>
                      </div>

                      {/* Compact Highlights Pills */}
                      <div className="flex flex-wrap gap-1 my-1.5">
                        {room.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[8px] sm:text-[9px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-1">
                    <span className="text-[10px] font-bold text-slate-800">
                      DP: <span className="text-purple-700">Rp {room.dp}</span>
                    </span>
                    <Button
                      asChild
                      variant="primary"
                      size="sm"
                      className="rounded-lg font-bold text-[10px] bg-purple-700 hover:bg-purple-800 text-white px-2.5 py-1 shadow-xs h-6 sm:h-7"
                    >
                      <a
                        href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20Kamar%20${room.number}%20${encodeURIComponent(
                          room.name,
                        )}%20(Rp%20${room.price}/mlm).%20Apakah%20unit%20tersedia?`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Phone className="w-2.5 h-2.5 mr-1" />
                        <span>Pesan</span>
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          BLOCK 3: ETALASE + BANTUAN FAQ (WHITE CANVAS)
          ==================================================== */}
      <div className="relative w-full bg-[#faf9fc] py-8 sm:py-14 px-4">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14">
          {/* 3.1 Section Etalase Oleh-oleh */}
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-5 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-700 block mb-0.5">
                  Etalase
                </span>
                <h2 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                  Oleh-oleh Khas Maluku
                </h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-[10px] sm:text-xs gap-1 shrink-0 px-2.5 py-1 h-7"
              >
                <Link href="/oleh-oleh">
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>

            {/* 2 Full Cards + 3rd Card Half Peek on Mobile (min-w-[40vw] max-w-[40vw]) */}
            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-2 sm:gap-4 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 no-scrollbar">
              {previewSouvenirs.map((item) => (
                <div
                  key={item.name}
                  className="snap-center min-w-[40vw] max-w-[40vw] sm:min-w-[200px] sm:max-w-none md:min-w-0 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between flex-shrink-0 md:flex-shrink"
                >
                  <div>
                    <div className="relative h-24 sm:h-32 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-1.5 left-1.5">
                        <span className="bg-slate-900/90 text-white px-1.5 py-0.5 rounded text-[8px] font-bold">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3">
                      <h3 className="font-extrabold text-[11px] sm:text-xs text-slate-900 line-clamp-1 mb-0.5">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-black text-purple-700 mb-0.5 leading-none">
                        {item.price}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 sm:p-3 pt-0">
                    <div className="py-1 px-1.5 rounded bg-purple-50 border border-purple-100 text-center text-[8px] sm:text-[9px] font-bold text-purple-900">
                      Tersedia di Resepsionis
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3.2 Section Bantuan FAQ */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-3 sm:mb-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-700 block mb-0.5">
                Bantuan
              </span>
              <h2 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                Pertanyaan Umum
              </h2>
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 overflow-hidden shadow-2xs transition-all hover:border-purple-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between gap-2.5 font-bold text-xs text-slate-900 hover:text-purple-700 transition cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-transform ${
                          isOpen ? "rotate-45 bg-purple-700 text-white" : ""
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-1.5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================================
          BLOCK 4: UNIFIED FOOTER SECTION (PURPLE CANVAS DENGAN SEAMLESS BLUR GRADIENT WASH)
          Fades smoothly from #faf9fc (White) into #f1eaff (Purple) and deepens towards copyright
          ========================================================================================= */}
      <footer className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#f1eaff] to-[#ebdffc] pt-10 sm:pt-16 pb-6 px-4 text-slate-900">
        <div className="max-w-5xl mx-auto">
          {/* Top Half: Lokasi & Embedded Google Maps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-800 block mb-1">
                Lokasi Transit
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight mb-2">
                750m ke Bandara Pattimura
              </h2>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="text-[11px] font-medium text-slate-800">
                    Jl. Bandara Pattimura (2–3 mnt ke Terminal)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="text-[11px] font-medium text-slate-800">
                    WA: +62 812-4216-3116 (07:00 – 21:00 WIT)
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="primary"
                size="sm"
                className="w-full sm:w-auto rounded-xl gap-1.5 font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-xs text-xs h-8"
              >
                <a
                  href="https://maps.app.goo.gl/Dzvo8bawqgoMmova9"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </Button>
            </div>

            {/* Embedded Google Maps */}
            <div className="w-full h-40 sm:h-48 rounded-2xl overflow-hidden border border-purple-200/90 shadow-sm bg-white">
              <iframe
                title="Google Maps Lokasi Penginapan Annisa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1990.7403357162448!2d128.08762133246853!3d-3.7047467933343032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce7a259d48e1b%3A0x304cec63773e589e!2sPenginapan%20Annisa!5e0!3m2!1sid!2sid!4v1787149833837!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Soft Divider */}
          <div className="border-t border-purple-200/80 my-6 sm:my-8" />

          {/* Bottom Half: Brand Logo, Nav Links & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-purple-50 p-0.5 border border-purple-200">
                <Image src="/logo-penginapan-annisa.png" alt="Logo" fill className="object-contain" />
              </div>
              <p className="font-bold text-slate-900 text-xs">Penginapan Annisa Ambon</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] font-medium">
              <Link href="/kamar" className="text-slate-600 hover:text-purple-700 transition">
                Tipe Kamar
              </Link>
              <Link href="/oleh-oleh" className="text-slate-600 hover:text-purple-700 transition">
                Oleh-oleh
              </Link>
              <Link href="/artikel" className="text-slate-600 hover:text-purple-700 transition">
                Artikel
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-purple-700 transition">
                Kontak
              </Link>
            </div>

            <p className="text-[10px] text-slate-500 text-center sm:text-right">
              © 2026 Penginapan Annisa • 750m Bandara Pattimura
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
