"use client";

import {
  ArrowRight,
  Bed,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gift,
  HeartHandshake,
  HelpCircle,
  MapPin,
  Navigation,
  Phone,
  Plane,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "../components/layout/navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { BookingWidget } from "../features/booking/booking-widget";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const previewRooms = [
    {
      id: "ac",
      name: "Kamar AC Superior",
      badge: "Paling Populer",
      price: "275.000",
      dp: "137.500",
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      desc: "Kamar sejuk dan tenang dengan AC dingin, kamar mandi dalam, TV, dan WiFi kencang.",
      facilities: [
        "AC Dingin & Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis High-Speed",
        "TV LED Layar Datar",
        "Handuk & Perlengkapan Mandi",
        "Air Mineral Gratis",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "kipas",
      name: "Kamar Kipas Standar",
      badge: "Paling Hemat",
      price: "200.000",
      dp: "100.000",
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      desc: "Pilihan hemat dan bersih dengan sirkulasi udara segar, kamar mandi dalam, dan WiFi.",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis High-Speed",
        "TV Layar Datar",
        "Handuk Bersih",
        "Air Mineral Gratis",
      ],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const previewSouvenirs = [
    {
      name: "Minyak Kayu Putih Asli Namlea (100ml)",
      category: "Herbal & Minyak Alami",
      price: "Rp 65.000",
      desc: "Penyulingan murni asli Pulau Buru Namlea. Hangat alami dan aroma menenangkan.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kue Sagu Bagea Kenari Ambon",
      category: "Camilan Tradisional",
      price: "Rp 35.000",
      desc: "Kue sagu renyah gurih berpadu dengan cacahan biji kenari melimpah khas kepulauan Maluku.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Roti Kenari Khas Maluku (1 Kotak)",
      category: "Pastry & Roti Kering",
      price: "Rp 45.000",
      desc: "Roti panggang kering renyah dengan taburan gula manis dan kenari gurih harum.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const faqs = [
    {
      q: "Berapa jarak dari Penginapan Annisa ke Bandara Internasional Pattimura?",
      a: "Sangat dekat, hanya berjarak 750 meter dari terminal keberangkatan/kedatangan bandara. Perjalanan hanya butuh waktu 2–3 menit dengan ojek atau taksi.",
    },
    {
      q: "Apakah jam check-in fleksibel untuk penumpang pesawat pagi / siang?",
      a: "Ya! Kami beroperasi pukul 07:00 – 21:00 WIT dengan check-in fleksibel. Jika unit kamar sudah siap (Ready), Anda bisa langsung beristirahat tanpa harus menunggu jam 14:00 siang.",
    },
    {
      q: "Bagaimana cara memesan dan sistem pembayaran kamar?",
      a: "Pemesanan dilakukan via WhatsApp dengan transfer DP 50% untuk mengunci kamar. Sisa pembayaran dilunasi saat Anda tiba di lokasi (bisa Tunai, Transfer, atau QRIS).",
    },
    {
      q: "Apakah semua kamar memiliki kamar mandi pribadi di dalam?",
      a: "Benar, 100% dari 8 kamar kami (baik 4 Kamar AC maupun 4 Kamar Kipas) memiliki kamar mandi pribadi di dalam kamar lengkap dengan handuk bersih dan air mineral.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5fc] text-[#1e1035] selection:bg-purple-200 selection:text-purple-900 relative overflow-hidden">
      {/* Ambient Glassmorphism Background Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-indigo-200/35 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <Navbar />

      {/* Hero Section: 2-Column Split Screen (Desktop) / Fluid Stack (Mobile) */}
      <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Kolom Kiri: Value, Headline & Trust Badges (7 Cols on LG) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Frosted Glass Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 text-purple-950 text-xs font-bold mb-3 sm:mb-4 shadow-xs w-fit">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>750m dari Bandara Pattimura Ambon</span>
            </div>

            {/* Balanced Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.16]">
              Penginapan Transit Nyaman Dekat{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700">
                Bandara Pattimura
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg">
              Solusi istirahat ideal untuk penerbangan subuh, transit dinas, dan wisata di Ambon.
              Kamar bersih, WiFi kencang, dan <strong>bebas risiko terlambat pesawat</strong>.
            </p>

            {/* 4 Quick Feature Highlights (Glass Chips) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-5 sm:mt-6 max-w-lg">
              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Plane className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">
                    3 Menit Bandara
                  </span>
                  <span className="text-[10px] text-slate-500">750m ke terminal</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">8 Unit Kamar</span>
                  <span className="text-[10px] text-slate-500">4 AC &amp; 4 Kipas</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">KM Dalam</span>
                  <span className="text-[10px] text-slate-500">100% Private</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">
                    07:00–21:00 WIT
                  </span>
                  <span className="text-[10px] text-slate-500">Check-in Fleksibel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Card Foto Kamar Cantik & Booking Widget (6 Cols on LG) */}
          <div className="lg:col-span-6">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* Mengapa Memilih Penginapan Annisa (Mobile Swipe Carousel / Desktop Grid) */}
      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <Badge variant="purple" className="mb-2">
              Keunggulan Utama
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Mengapa Memilih Penginapan Annisa?
            </h2>
            <p className="text-slate-600 mt-1.5 text-xs sm:text-base">
              Layanan ramah dan lokasi terbaik untuk waktu istirahat yang tenang.
            </p>
          </div>

          {/* Mobile Swipe Container (Flex Row) / Desktop 3-Cols Grid */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 no-scrollbar">
            <Card className="snap-center min-w-[82vw] sm:min-w-[320px] md:min-w-0 p-6 sm:p-8 bg-white/75 backdrop-blur-xl border border-white/90 hover:bg-white/95 hover:border-purple-200/80 shadow-xl shadow-purple-950/5 group flex flex-col justify-between flex-shrink-0 md:flex-shrink">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100/90 text-purple-700 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                  <Plane className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Hanya 750m ke Bandara
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hanya butuh waktu 2–3 menit perjalanan menuju terminal Bandara Pattimura Ambon.
                  Bebas macet dan aman untuk jadwal terbang subuh.
                </p>
              </div>
            </Card>

            <Card className="snap-center min-w-[82vw] sm:min-w-[320px] md:min-w-0 p-6 sm:p-8 bg-white/75 backdrop-blur-xl border border-white/90 hover:bg-white/95 hover:border-purple-200/80 shadow-xl shadow-purple-950/5 group flex flex-col justify-between flex-shrink-0 md:flex-shrink">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100/90 text-purple-700 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Check-in Fleksibel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Operasional pukul 07:00 – 21:00 WIT. Mendarat pagi jam 09.00 WIT? Anda bisa
                  langsung masuk kamar jika unit telah siap (*Ready*).
                </p>
              </div>
            </Card>

            <Card className="snap-center min-w-[82vw] sm:min-w-[320px] md:min-w-0 p-6 sm:p-8 bg-white/75 backdrop-blur-xl border border-white/90 hover:bg-white/95 hover:border-purple-200/80 shadow-xl shadow-purple-950/5 group flex flex-col justify-between flex-shrink-0 md:flex-shrink">
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100/90 text-purple-700 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Pelayanan Ramah &amp; Nyaman
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Penginapan bersih, aman, tenang, serta dilengkapi etalase oleh-oleh khas Maluku
                  langsung di resepsionis.
                </p>
              </div>
            </Card>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="block md:hidden text-center text-[10px] font-bold text-purple-800 mt-1">
            <span>← Geser kartu untuk lihat lainnya →</span>
          </div>

          {/* Frosted Glass Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 sm:mt-10 bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/90 shadow-lg shadow-purple-950/5 text-center">
            <div>
              <p className="text-2xl sm:text-4xl font-black text-purple-700">750m</p>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                Jarak ke Bandara
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-slate-900">8 Kamar</p>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                4 AC &amp; 4 Kipas
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-purple-700">07–21</p>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">
                Jam Buka (WIT)
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-purple-700">100%</p>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">KM Dalam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ringkasan Pilihan Kamar (Glassmorphic Cards) */}
      <section className="py-10 sm:py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <Badge variant="purple" className="mb-2">
              Pilihan Kamar Transit
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Tipe Kamar Penginapan Annisa
            </h2>
            <p className="text-slate-600 mt-1.5 text-xs sm:text-base">
              Tersedia 4 Kamar AC Superior dan 4 Kamar Kipas Standar dengan DP transparan 50%.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-white/90 bg-white/70 backdrop-blur-md text-purple-900 hover:bg-white font-bold gap-2 self-start sm:self-auto shrink-0 shadow-sm text-xs sm:text-sm"
          >
            <Link href="/kamar">
              <span>Lihat Semua 8 Kamar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {previewRooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden p-0 rounded-3xl border border-white/90 bg-white/75 backdrop-blur-xl hover:bg-white/90 hover:border-purple-200/90 hover:shadow-2xl shadow-purple-950/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 sm:h-56 w-full bg-purple-50 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-950/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs text-purple-700 font-semibold mb-3">{room.bed}</p>

                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-purple-800">
                        Rp {room.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ malam</span>
                    </div>
                    <span className="inline-block mt-1 text-[11px] sm:text-xs font-bold text-purple-900 bg-purple-100/90 border border-purple-200/60 px-2.5 py-0.5 rounded-full">
                      DP 50%: Rp {room.dp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 sm:mb-5 leading-relaxed">{room.desc}</p>

                  <div className="space-y-2 pt-3 sm:pt-4 border-t border-purple-100/50">
                    <span className="block text-[10px] sm:text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      Fasilitas Termasuk:
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {room.facilities.map((fac) => (
                        <div key={fac} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7 pt-0">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2 rounded-2xl shadow-purple-600/30 font-bold text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 py-3"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20${encodeURIComponent(
                      room.name,
                    )}%20(Rp%20${room.price}/mlm).%20Apakah%20masih%20tersedia?`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Pesan {room.name} via WA</span>
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Ringkasan Oleh-oleh (Mobile Swipe Carousel / Desktop Grid) */}
      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <Badge variant="purple" className="mb-2">
                Etalase Produk Lokal
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Oleh-oleh Khas Ambon &amp; Maluku
              </h2>
              <p className="text-slate-600 mt-1.5 text-xs sm:text-base">
                Cinderamata dan kuliner khas otentik tersedia langsung di resepsionis Penginapan
                Annisa.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/90 bg-white/70 backdrop-blur-md text-purple-900 hover:bg-white font-bold gap-2 self-start sm:self-auto shrink-0 shadow-sm text-xs sm:text-sm"
            >
              <Link href="/oleh-oleh">
                <span>Lihat Semua Oleh-oleh</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Swipe Container (Flex Row) / Desktop 3-Cols Grid */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 no-scrollbar">
            {previewSouvenirs.map((item) => (
              <Card
                key={item.name}
                className="snap-center min-w-[75vw] sm:min-w-[280px] md:min-w-0 overflow-hidden p-0 rounded-3xl bg-white/75 backdrop-blur-xl hover:bg-white/90 hover:shadow-2xl shadow-purple-950/5 transition-all border border-white/90 flex flex-col justify-between flex-shrink-0 md:flex-shrink"
              >
                <div>
                  <div className="relative h-44 sm:h-48 w-full bg-purple-50 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-950/85 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-lg sm:text-xl font-black text-purple-700 mb-2">
                      {item.price}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <div className="py-2.5 px-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 text-center text-xs font-bold text-purple-900 shadow-2xs">
                    Tersedia di Resepsionis
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="block md:hidden text-center text-[10px] font-bold text-purple-800 mt-1">
            <span>← Geser oleh-oleh untuk lihat lainnya →</span>
          </div>
        </div>
      </section>

      {/* FAQ Section (Glass Accordion) */}
      <section className="py-10 sm:py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <Badge variant="purple" className="mb-2">
            Pusat Informasi
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 mt-1.5 text-xs sm:text-base">
            Jawaban lengkap seputar fasilitas, lokasi, dan reservasi di Penginapan Annisa.
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 overflow-hidden shadow-sm transition-all hover:bg-white/90"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-base text-slate-900 hover:text-purple-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-45 bg-purple-600 text-white" : ""
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-50/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Location & Directions (Glass Container on Dark Slate) */}
      <section className="py-12 sm:py-16 px-4 bg-slate-950/90 text-white backdrop-blur-xl relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/80 text-purple-300 text-xs font-bold mb-3 sm:mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>Titik Lokasi Strategis</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
                Hanya 750m dari Bandara Pattimura
              </h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-5 sm:mb-6">
                Penginapan Annisa beralamat dekat dengan akses jalan utama Bandara Internasional
                Pattimura Ambon. Sangat mudah dijangkau dalam waktu kurang dari 3 menit.
              </p>

              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-300 mb-6 sm:mb-8">
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Alamat:</strong> Jl. Bandara Pattimura (750m dari Terminal), Ambon,
                    Maluku.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>WhatsApp Resmi:</strong> +62 812-4216-3116 (07:00 – 21:00 WIT)
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-2xl gap-2 font-bold bg-purple-600 hover:bg-purple-700 shadow-purple-600/30 text-xs sm:text-sm"
              >
                <a
                  href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                </a>
              </Button>
            </div>

            {/* Visual Route & Embedded Google Maps */}
            <div className="space-y-4">
              <div className="bg-slate-900/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-purple-900/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      Rute Kilat Bandara ke Annisa
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      Estimasi Waktu: 2–3 Menit (750m)
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] sm:text-[11px] font-bold">
                    Sangat Dekat
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-purple-400" />
                      <span>Terminal Bandara Pattimura</span>
                    </div>
                    <span className="font-bold text-white">0 km</span>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-purple-950/70 border border-purple-600/50 flex items-center justify-between text-purple-300 font-bold">
                    <div className="flex items-center gap-2">
                      <Bed className="w-3.5 h-3.5 text-purple-300" />
                      <span>Penginapan Annisa</span>
                    </div>
                    <span>750 m (Tiba)</span>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps */}
              <div className="w-full h-56 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-900/60 shadow-xl">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 sm:py-12 px-4 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-0.5">
              <Image src="/logo-penginapan-annisa.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Penginapan Annisa Ambon</p>
              <p className="text-[11px] text-slate-500">
                © 2026 Penginapan Annisa. All rights reserved.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/kamar" className="hover:text-white transition">
              Tipe Kamar
            </Link>
            <Link href="/oleh-oleh" className="hover:text-white transition">
              Oleh-oleh Maluku
            </Link>
            <Link href="/artikel" className="hover:text-white transition">
              Artikel
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Kontak &amp; Peta
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
