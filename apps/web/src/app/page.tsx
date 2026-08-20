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

  const whyChooseUs = [
    {
      icon: Plane,
      title: "Bebas Risiko Ketinggalan Pesawat",
      desc: "Hanya 750m (2–3 menit) dari gerbang terminal Bandara Pattimura. Solusi ideal untuk flight subuh dan transit tanpa macet.",
      tag: "Lokasi 750m",
    },
    {
      icon: Clock,
      title: "Check-In Fleksibel 07:00–21:00 WIT",
      desc: "Mendarat pagi jam 09.00 WIT? Langsung masuk kamar jika unit telah siap (*Ready*), tanpa perlu menunggu waktu check-in sore.",
      tag: "Tanpa Ribet",
    },
    {
      icon: ShieldCheck,
      title: "Privasi & Kenyamanan Terjamin",
      desc: "100% dari 8 kamar memiliki kamar mandi pribadi di dalam, kasur higienis, WiFi kencang, dan etalase oleh-oleh khas Maluku di resepsionis.",
      tag: "100% KM Dalam",
    },
  ];

  const previewRooms = [
    {
      id: "101",
      number: "101",
      name: "Kamar AC Superior",
      badge: "Paling Populer",
      price: "275.000",
      dp: "137.500",
      bed: "1 King Bed",
      capacity: "2–3 Orang",
      desc: "Sejuk & nyaman dengan AC dingin, kamar mandi pribadi di dalam, TV LED, dan WiFi kencang.",
      highlights: ["AC Dingin", "KM Dalam", "WiFi Kencang"],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "102",
      number: "102",
      name: "Kamar AC Superior",
      badge: "Lantai 1",
      price: "275.000",
      dp: "137.500",
      bed: "1 King Bed",
      capacity: "2–3 Orang",
      desc: "Kamar tenang & bersih dengan kasur empuk, AC sejuk, dan kamar mandi dalam.",
      highlights: ["AC Dingin", "KM Dalam", "WiFi Kencang"],
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "201",
      number: "201",
      name: "Kamar Kipas Standar",
      badge: "Hemat & Nyaman",
      price: "200.000",
      dp: "100.000",
      bed: "1 Double Bed",
      capacity: "2–3 Orang",
      desc: "Pilihan hemat & bersih dengan sirkulasi udara segar, kamar mandi pribadi di dalam, dan WiFi.",
      highlights: ["Kipas Dinding", "KM Dalam", "WiFi Kencang"],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "202",
      number: "202",
      name: "Kamar Kipas Standar",
      badge: "Lantai 2",
      price: "200.000",
      dp: "100.000",
      bed: "2 Single Bed",
      capacity: "2–3 Orang",
      desc: "Kamar twin bed praktis untuk rekan dinas atau teman perjalanan transit bandara.",
      highlights: ["Kipas Dinding", "KM Dalam", "WiFi Kencang"],
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const previewSouvenirs = [
    {
      name: "Minyak Kayu Putih Namlea (100ml)",
      category: "Herbal Asli",
      price: "Rp 65.000",
      desc: "Penyulingan murni Pulau Buru Namlea. Hangat alami dan aroma menenangkan.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kue Sagu Bagea Kenari Ambon",
      category: "Camilan Khas",
      price: "Rp 35.000",
      desc: "Kue sagu renyah gurih dengan cacahan biji kenari melimpah khas Maluku.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Roti Kenari Khas Maluku",
      category: "Pastry Kering",
      price: "Rp 45.000",
      desc: "Roti panggang kering renyah dengan taburan gula manis dan kenari gurih harum.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kopi Rarobang Rempah Ambon",
      category: "Minuman Khas",
      price: "Rp 40.000",
      desc: "Kopi khas Ambon dengan racikan rempah jahe, cengkeh, dan kenari sangrai.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const faqs = [
    {
      q: "Berapa jarak dari Penginapan Annisa ke Bandara Internasional Pattimura?",
      a: "Sangat dekat, hanya berjarak 750 meter dari terminal bandara. Perjalanan hanya butuh waktu 2–3 menit dengan ojek atau taksi.",
    },
    {
      q: "Apakah jam check-in fleksibel untuk penumpang pesawat pagi / siang?",
      a: "Ya! Kami beroperasi pukul 07:00 – 21:00 WIT dengan check-in fleksibel. Jika kamar sudah siap (Ready), Anda bisa langsung beristirahat tanpa menunggu sore.",
    },
    {
      q: "Bagaimana cara memesan dan sistem pembayaran kamar?",
      a: "Pemesanan dilakukan via WhatsApp dengan transfer DP 50% untuk mengunci kamar. Sisa pembayaran dilunasi saat tiba di lokasi (Tunai, Transfer, atau QRIS).",
    },
    {
      q: "Apakah semua kamar memiliki kamar mandi pribadi di dalam?",
      a: "Benar, 100% dari 8 kamar kami (4 Kamar AC dan 4 Kamar Kipas) memiliki kamar mandi pribadi di dalam lengkap dengan handuk bersih dan air mineral.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      {/* Hero Section: Clean Acrylic Split Screen */}
      <section className="relative pt-24 sm:pt-32 pb-6 sm:pb-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Kolom Kiri: Value, Headline & Trust Badges */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Editorial Location Header (Authentic & Professional) */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
              <span className="text-[11px] uppercase font-black tracking-wider text-purple-700 flex items-center gap-1.5 bg-purple-50/80 px-2.5 py-1 rounded-lg border border-purple-100">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Ambon, Maluku</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs font-bold text-slate-700">750m dari Bandara Pattimura</span>
            </div>

            {/* Crisp Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.16]">
              Penginapan Transit Nyaman Dekat{" "}
              <span className="text-purple-700">Bandara Pattimura</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg">
              Solusi istirahat ideal untuk penerbangan subuh, transit dinas, dan wisata di Ambon.
              Kamar bersih, WiFi kencang, dan <strong>bebas risiko terlambat pesawat</strong>.
            </p>

            {/* 4 Minimalist Highlights Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4 sm:mt-6 max-w-lg">
              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Plane className="w-3.5 h-3.5" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">
                    3 Mnt Bandara
                  </span>
                  <span className="text-[10px] text-slate-500">750m ke terminal</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Bed className="w-3.5 h-3.5" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">8 Unit Kamar</span>
                  <span className="text-[10px] text-slate-500">4 AC &amp; 4 Kipas</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">KM Dalam</span>
                  <span className="text-[10px] text-slate-500">100% Private</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xs">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
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

          {/* Kolom Kanan: Card Foto Kamar Cantik & Booking Widget */}
          <div className="lg:col-span-6">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* Kenapa Memilih Penginapan Annisa? (Semua 3 Kartu Ditampilkan Langsung) */}
      <section className="py-4 sm:py-8 px-4 max-w-6xl mx-auto">
        <div className="mb-3 sm:mb-6 flex items-center justify-between gap-2">
          <div>
            <Badge variant="purple" className="mb-1 text-[10px]">
              Nilai Utama
            </Badge>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Kenapa Memilih Penginapan Annisa?
            </h2>
          </div>
        </div>

        {/* 3 Cards Direct Display (Stack on Mobile, Grid 3-Cols on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-5">
          {whyChooseUs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 transition-all flex items-start gap-3 sm:flex-col sm:justify-between"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shadow-2xs shrink-0 mt-0.5 sm:mt-0 sm:mb-2.5">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <span className="hidden sm:inline-block text-[9px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ringkasan Tipe Kamar (4 Kamar: 1 Full + 1 Half Peek on Mobile Swipe) */}
      <section className="py-4 sm:py-8 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3 sm:mb-6 gap-2">
          <div>
            <Badge variant="purple" className="mb-1 text-[10px]">
              Pilihan Kamar
            </Badge>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Tipe Kamar Transit
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs gap-1 shrink-0 px-3 py-1"
          >
            <Link href="/kamar">
              <span>Semua 8 Kamar</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {/* 1 Card Full + 2nd Card Half Peek on Mobile Swipe (min-w-[76vw]) */}
        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-5 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 no-scrollbar">
          {previewRooms.map((room) => (
            <div
              key={room.id}
              className="snap-center min-w-[76vw] sm:min-w-[280px] md:min-w-0 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between flex-shrink-0 md:flex-shrink"
            >
              <div>
                <div className="relative h-36 sm:h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-slate-900/90 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-purple-700 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                      #{room.number}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4">
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-base text-slate-900 leading-tight">
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
                  <div className="flex flex-wrap gap-1 my-2">
                    {room.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[9px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-1">
                <span className="text-[10px] font-bold text-slate-800">
                  DP: <span className="text-purple-700">Rp {room.dp}</span>
                </span>
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="rounded-lg font-bold text-[10px] bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 shadow-xs h-7"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20Kamar%20${room.number}%20${encodeURIComponent(
                      room.name,
                    )}%20(Rp%20${room.price}/mlm).%20Apakah%20unit%20tersedia?`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    <span>Pesan</span>
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ringkasan Oleh-oleh (2 Full Cards + 1 Half Peek on Mobile Swipe) */}
      <section className="py-4 sm:py-8 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3 sm:mb-6 gap-2">
          <div>
            <Badge variant="purple" className="mb-1 text-[10px]">
              Etalase Lokal
            </Badge>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              Oleh-oleh Khas Maluku
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs gap-1 shrink-0 px-3 py-1"
          >
            <Link href="/oleh-oleh">
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {/* 2 Full Cards + 3rd Card Half Peek on Mobile (min-w-[40vw] max-w-[40vw]) */}
        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-6 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 no-scrollbar">
          {previewSouvenirs.map((item) => (
            <div
              key={item.name}
              className="snap-center min-w-[40vw] max-w-[40vw] sm:min-w-[200px] sm:max-w-none md:min-w-0 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 transition-all overflow-hidden flex flex-col justify-between flex-shrink-0 md:flex-shrink"
            >
              <div>
                <div className="relative h-24 sm:h-36 w-full bg-slate-100 overflow-hidden">
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

                <div className="p-2 sm:p-3.5">
                  <h3 className="font-extrabold text-[11px] sm:text-sm text-slate-900 line-clamp-1 mb-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-base font-black text-purple-700 mb-0.5 leading-none">
                    {item.price}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 line-clamp-1 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-2 sm:p-3.5 pt-0">
                <div className="py-1 px-1.5 rounded bg-slate-50 border border-slate-200/80 text-center text-[8px] sm:text-[9px] font-bold text-purple-900">
                  Tersedia di Resepsionis
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section (Clean Acrylic Accordion) */}
      <section className="py-5 sm:py-8 px-4 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
          <Badge variant="purple" className="mb-1">
            FAQ
          </Badge>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            Pertanyaan Populer
          </h2>
        </div>

        <div className="space-y-2 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 overflow-hidden shadow-2xs transition-all hover:border-purple-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-900 hover:text-purple-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-45 bg-purple-700 text-white" : ""
                    }`}
                  >
                    <Plus className="w-3 h-3" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Location & Directions (Clean Dark Container) */}
      <section className="py-8 sm:py-12 px-4 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-[10px] font-semibold mb-2">
                <MapPin className="w-3 h-3" />
                <span>Titik Lokasi Strategis</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight mb-2">
                Hanya 750m dari Bandara Pattimura
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Penginapan Annisa beralamat dekat dengan akses jalan utama Bandara Internasional
                Pattimura Ambon. Sangat mudah dijangkau dalam waktu 2–3 menit.
              </p>

              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                <div className="flex items-start gap-2">
                  <Navigation className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-[11px]">
                    <strong>Alamat:</strong> Jl. Bandara Pattimura (750m dari Terminal), Ambon.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-[11px]">
                    <strong>WhatsApp:</strong> +62 812-4216-3116 (07:00 – 21:00 WIT)
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="primary"
                size="sm"
                className="w-full sm:w-auto rounded-xl gap-1.5 font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-xs text-xs"
              >
                <a
                  href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </Button>
            </div>

            {/* Embedded Google Maps */}
            <div className="w-full h-44 sm:h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
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
      </section>

      {/* Compact Minimalist Footer */}
      <footer className="bg-slate-950 text-slate-400 py-5 px-4 border-t border-slate-900 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white/10 p-0.5">
              <Image src="/logo-penginapan-annisa.png" alt="Logo" fill className="object-contain" />
            </div>
            <p className="font-bold text-white text-xs">Penginapan Annisa Ambon</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <Link href="/kamar" className="hover:text-white transition">
              Tipe Kamar
            </Link>
            <Link href="/oleh-oleh" className="hover:text-white transition">
              Oleh-oleh
            </Link>
            <Link href="/artikel" className="hover:text-white transition">
              Artikel
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Kontak
            </Link>
          </div>

          <p className="text-[10px] text-slate-500 text-center sm:text-right">
            © 2026 Penginapan Annisa. 750m Bandara Pattimura.
          </p>
        </div>
      </footer>
    </div>
  );
}
