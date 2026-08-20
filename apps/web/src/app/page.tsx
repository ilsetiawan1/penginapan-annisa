"use client";

import {
  ArrowRight,
  Bed,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Gift,
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
      desc: "Kamar sejuk dan tenang dengan AC dingin, kamar mandi pribadi di dalam, TV, dan WiFi kencang.",
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
      badge: "Hemat & Nyaman",
      price: "200.000",
      dp: "100.000",
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      desc: "Pilihan hemat dan bersih dengan sirkulasi udara segar, kamar mandi pribadi di dalam, dan WiFi.",
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
      category: "Herbal Alami",
      price: "Rp 65.000",
      desc: "Penyulingan murni asli Pulau Buru Namlea. Hangat alami dan aroma menenangkan.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kue Sagu Bagea Kenari Ambon",
      category: "Camilan Khas",
      price: "Rp 35.000",
      desc: "Kue sagu renyah gurih berpadu dengan cacahan biji kenari melimpah khas kepulauan Maluku.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Roti Kenari Khas Maluku (1 Kotak)",
      category: "Pastry Kering",
      price: "Rp 45.000",
      desc: "Roti panggang kering renyah dengan taburan gula manis dan kenari gurih harum.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const faqs = [
    {
      q: "Berapa jarak dari Penginapan Annisa ke Bandara Internasional Pattimura?",
      a: "Sangat dekat, hanya berjarak 750 meter dari terminal bandara. Perjalanan hanya butuh waktu 2–3 menit dengan ojek atau taksi.",
    },
    {
      q: "Apakah jam check-in fleksibel untuk penumpang pesawat pagi / siang?",
      a: "Ya, kami beroperasi pukul 07:00 – 21:00 WIT dengan check-in fleksibel. Jika unit kamar sudah siap (Ready), Anda bisa langsung beristirahat tanpa harus menunggu jam 14:00 siang.",
    },
    {
      q: "Bagaimana cara memesan dan sistem pembayaran kamar?",
      a: "Pemesanan dilakukan via WhatsApp dengan transfer DP 50% untuk mengunci unit kamar. Sisa pembayaran dilunasi saat tiba di lokasi (bisa Tunai, Transfer, atau QRIS).",
    },
    {
      q: "Apakah semua kamar memiliki kamar mandi pribadi di dalam?",
      a: "Benar, 100% dari 8 kamar kami (baik 4 Kamar AC maupun 4 Kamar Kipas) memiliki kamar mandi pribadi di dalam kamar lengkap dengan handuk bersih dan air mineral.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      {/* Hero Section: Clean Minimalist Split Screen */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Value, Headline & Trust Chips */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Minimalist Location Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-purple-800 text-xs font-semibold mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>750m dari Bandara Pattimura Ambon</span>
            </div>

            {/* Clean Crisp Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
              Penginapan Transit Nyaman Dekat{" "}
              <span className="text-purple-700">Bandara Pattimura</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              Solusi istirahat ideal untuk penerbangan subuh, transit dinas, dan wisata di Ambon.
              Kamar bersih, WiFi kencang, dan <strong>bebas risiko terlambat pesawat</strong>.
            </p>

            {/* 4 Minimalist Highlights Grid */}
            <div className="grid grid-cols-2 gap-2.5 mt-6 max-w-lg">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Plane className="w-3.5 h-3.5" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">
                    3 Menit Bandara
                  </span>
                  <span className="text-[10px] text-slate-500">750m ke terminal</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Bed className="w-3.5 h-3.5" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">8 Unit Kamar</span>
                  <span className="text-[10px] text-slate-500">4 AC &amp; 4 Kipas</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block leading-tight">KM Dalam</span>
                  <span className="text-[10px] text-slate-500">100% Private</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
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

          {/* Kolom Kanan: Clean Minimalist Booking Card */}
          <div className="lg:col-span-6">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* Clean Minimalist Stat Card Bar */}
      <section className="py-4 sm:py-8 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5">
              <Plane className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-700">750 Meter</p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Jarak ke Bandara</p>
            <p className="text-[11px] text-slate-500">2–3 Menit dari Terminal</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5">
              <Bed className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">8 Kamar</p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Pilihan Lengkap</p>
            <p className="text-[11px] text-slate-500">4 AC &amp; 4 Kipas Standar</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-700">07:00–21:00</p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Jam Buka (WIT)</p>
            <p className="text-[11px] text-slate-500">Check-in Fleksibel</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-700">100%</p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">KM Pribadi</p>
            <p className="text-[11px] text-slate-500">Kamar Mandi Dalam</p>
          </div>
        </div>
      </section>

      {/* Ringkasan Pilihan Kamar (Clean Minimalist Cards) */}
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
            className="rounded-xl border-slate-300 text-slate-800 hover:bg-slate-50 font-bold gap-2 self-start sm:self-auto shrink-0 text-xs sm:text-sm"
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
              className="overflow-hidden p-0 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs text-purple-700 font-semibold mb-3">{room.bed}</p>

                  <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-purple-700">
                        Rp {room.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ malam</span>
                    </div>
                    <span className="inline-block mt-1 text-[11px] sm:text-xs font-bold text-purple-900 bg-purple-100/80 border border-purple-200/60 px-2.5 py-0.5 rounded-full">
                      DP 50%: Rp {room.dp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 sm:mb-5 leading-relaxed">{room.desc}</p>

                  <div className="space-y-2 pt-3 sm:pt-4 border-t border-slate-100">
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
                  className="w-full justify-center gap-2 rounded-xl shadow-xs font-bold text-xs sm:text-sm bg-purple-700 hover:bg-purple-800 text-white py-3"
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

      {/* Ringkasan Oleh-oleh (Clean Minimalist Grid / Mobile Scroll) */}
      <section className="py-10 sm:py-16 px-4 max-w-6xl mx-auto">
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
            className="rounded-xl border-slate-300 text-slate-800 hover:bg-slate-50 font-bold gap-2 self-start sm:self-auto shrink-0 text-xs sm:text-sm"
          >
            <Link href="/oleh-oleh">
              <span>Lihat Semua Oleh-oleh</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 no-scrollbar">
          {previewSouvenirs.map((item) => (
            <Card
              key={item.name}
              className="snap-center min-w-[75vw] sm:min-w-[280px] md:min-w-0 overflow-hidden p-0 rounded-2xl sm:rounded-3xl bg-white hover:border-purple-300 hover:shadow-md transition-all border border-slate-200/90 flex flex-col justify-between flex-shrink-0 md:flex-shrink"
            >
              <div>
                <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/90 px-3 py-1 rounded-full text-[10px] font-bold text-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-lg sm:text-xl font-black text-purple-700 mb-2">{item.price}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <div className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center text-xs font-bold text-purple-900">
                  Tersedia di Resepsionis
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section (Clean Minimalist Accordion) */}
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
                className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-all hover:border-purple-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-base text-slate-900 hover:text-purple-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-45 bg-purple-700 text-white" : ""
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Location & Directions (Clean Dark Container) */}
      <section className="py-12 sm:py-16 px-4 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-semibold mb-3 sm:mb-4">
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
                className="w-full sm:w-auto rounded-xl gap-2 font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-xs text-xs sm:text-sm"
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
              <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      Rute Kilat Bandara ke Annisa
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      Estimasi Waktu: 2–3 Menit (750m)
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 text-[10px] sm:text-[11px] font-bold border border-purple-700/50">
                    Sangat Dekat
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-purple-400" />
                      <span>Terminal Bandara Pattimura</span>
                    </div>
                    <span className="font-bold text-white">0 km</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-700/50 flex items-center justify-between text-purple-300 font-bold">
                    <div className="flex items-center gap-2">
                      <Bed className="w-3.5 h-3.5 text-purple-300" />
                      <span>Penginapan Annisa</span>
                    </div>
                    <span>750 m (Tiba)</span>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps */}
              <div className="w-full h-56 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-lg">
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
      <footer className="bg-slate-950 text-slate-400 py-10 sm:py-12 px-4 border-t border-slate-900 text-xs sm:text-sm">
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
