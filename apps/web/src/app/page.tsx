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
      q: "Apakah jam check-in fleksibel untuk penumpang pesawat subuh / pagi?",
      a: "Ya! Kami melayani check-in fleksibel 24 jam. Jika unit kamar sudah siap (Ready), Anda bisa langsung beristirahat tanpa harus menunggu jam 14:00 siang.",
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
    <div className="min-h-screen bg-[#f9f7fd] text-[#1e1035] selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      {/* Hero Section with Dataluz Atmospheric Glow */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Soft Lavender Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-300/40 via-purple-200/30 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400/20 blur-3xl -z-10 rounded-full pointer-events-none" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-300/20 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Pill Badge (Reference Style) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
            <span>750 Meter dari Bandara Internasional Pattimura Ambon</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Penginapan Transit Nyaman &amp; Tenang Dekat{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700">
              Bandara Pattimura
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Solusi istirahat ideal untuk penumpang transit penerbangan pagi, dinas, dan wisata.
            Kamar bersih, WiFi kencang, dan <strong>bebas risiko ketinggalan pesawat</strong>.
          </p>

          {/* Category Quick Filter Pills (Reference Style) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-purple-200 text-purple-950 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-xs transition duration-200"
            >
              <Bed className="w-3.5 h-3.5" />
              <span>Semua Kamar (8 Unit)</span>
            </Link>
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-purple-200 text-purple-950 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-xs transition duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kamar AC Superior (Rp 275rb)</span>
            </Link>
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-purple-200 text-purple-950 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-xs transition duration-200"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Kamar Kipas Standar (Rp 200rb)</span>
            </Link>
            <Link
              href="/oleh-oleh"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-purple-200 text-purple-950 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-xs transition duration-200"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Oleh-oleh Khas Ambon</span>
            </Link>
          </div>
        </div>

        {/* Interactive Availability & Booking Calculator */}
        <div className="mt-10">
          <BookingWidget />
        </div>
      </section>

      {/* Mengapa Memilih Penginapan Annisa */}
      <section className="py-20 px-4 bg-white/70 border-y border-purple-100/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="purple" className="mb-2">
              Keunggulan Utama
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Mengapa Memilih Penginapan Annisa?
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Layanan ramah dan lokasi terbaik untuk waktu istirahat yang tenang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 bg-white rounded-3xl border border-purple-100 hover:border-purple-300 hover:shadow-xl shadow-purple-900/5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hanya 750m ke Bandara</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hanya butuh waktu 2–3 menit perjalanan menuju terminal Bandara Pattimura Ambon.
                Bebas macet dan aman untuk jadwal terbang subuh.
              </p>
            </Card>

            <Card className="p-8 bg-white rounded-3xl border border-purple-100 hover:border-purple-300 hover:shadow-xl shadow-purple-900/5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Check-in Fleksibel 24 Jam</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tiba pagi jam 09.00 WIT? Anda bisa langsung masuk kamar jika unit telah siap
                (*Ready*), tanpa perlu menunggu sore hari.
              </p>
            </Card>

            <Card className="p-8 bg-white rounded-3xl border border-purple-100 hover:border-purple-300 hover:shadow-xl shadow-purple-900/5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Pelayanan Ramah &amp; Nyaman
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Penginapan bersih, aman, tenang, serta dilengkapi etalase oleh-oleh khas Maluku
                langsung di resepsionis.
              </p>
            </Card>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 bg-white rounded-3xl p-6 border border-purple-100 shadow-xs text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-700">750m</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Jarak ke Bandara</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900">8 Kamar</p>
              <p className="text-xs text-slate-500 font-medium mt-1">4 AC &amp; 4 Kipas</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-700">24 Jam</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Layanan Check-in</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-700">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Kamar Mandi Dalam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ringkasan Pilihan Kamar (Dataluz Card Style) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="purple" className="mb-2">
              Pilihan Kamar Transit
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Tipe Kamar Penginapan Annisa
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Tersedia 4 Kamar AC Superior dan 4 Kamar Kipas Standar dengan DP transparan 50%.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-purple-200 text-purple-900 hover:bg-purple-50 font-bold gap-2 self-start sm:self-auto shrink-0 shadow-2xs"
          >
            <Link href="/kamar">
              <span>Lihat Semua 8 Kamar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {previewRooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden p-0 rounded-3xl border border-purple-100 hover:border-purple-300 hover:shadow-2xl shadow-purple-900/5 transition-all flex flex-col justify-between bg-white"
            >
              <div>
                <div className="relative h-56 w-full bg-purple-50 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-900/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {room.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{room.name}</h3>
                  <p className="text-xs text-purple-700 font-semibold mb-4">{room.bed}</p>

                  <div className="mb-6 p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-purple-800">Rp {room.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/ malam</span>
                    </div>
                    <span className="inline-block mt-1 text-xs font-bold text-purple-900 bg-purple-200/80 px-2.5 py-0.5 rounded-full">
                      DP 50%: Rp {room.dp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">{room.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-purple-50">
                    <span className="block text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      Fasilitas Termasuk:
                    </span>
                    <div className="space-y-2 text-xs text-slate-700">
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

              <div className="p-7 pt-0">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2 rounded-2xl shadow-purple-600/30 font-bold text-sm bg-purple-600 hover:bg-purple-700"
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

      {/* Ringkasan Oleh-oleh Khas Ambon */}
      <section className="py-20 px-4 bg-white/70 border-t border-purple-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="purple" className="mb-2">
                Etalase Produk Lokal
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Oleh-oleh Khas Ambon &amp; Maluku
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Cinderamata dan kuliner khas otentik tersedia langsung di resepsionis Penginapan
                Annisa.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-purple-200 text-purple-900 hover:bg-purple-50 font-bold gap-2 self-start sm:self-auto shrink-0 shadow-2xs"
            >
              <Link href="/oleh-oleh">
                <span>Lihat Semua Oleh-oleh</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewSouvenirs.map((item) => (
              <Card
                key={item.name}
                className="overflow-hidden p-0 rounded-3xl bg-white hover:shadow-xl shadow-purple-900/5 transition-all border border-purple-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-purple-50 overflow-hidden">
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

                  <div className="p-6">
                    <h3 className="font-bold text-base text-slate-900 line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xl font-black text-purple-700 mb-2">{item.price}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="py-2.5 px-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-center text-xs font-bold text-purple-900">
                    Tersedia di Resepsionis
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Matching Dataluz Accordion Design) */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="purple" className="mb-2">
            Pusat Informasi
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Jawaban lengkap seputar fasilitas, lokasi, dan reservasi di Penginapan Annisa.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-purple-100 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-purple-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "rotate-45 bg-purple-600 text-white" : ""
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Location & Directions */}
      <section className="py-16 px-4 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950 border border-purple-700 text-purple-300 text-xs font-bold mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>Titik Lokasi Strategis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Hanya 750m dari Bandara Pattimura
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Penginapan Annisa beralamat dekat dengan akses jalan utama Bandara Internasional
                Pattimura Ambon. Sangat mudah dijangkau dalam waktu kurang dari 3 menit.
              </p>

              <div className="space-y-3 text-sm text-slate-300 mb-8">
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Alamat:</strong> Jl. Bandara Pattimura (750m dari Terminal), Ambon,
                    Maluku.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>WhatsApp Resmi:</strong> +62 812-4216-3116 (Respon Cepat 24 Jam)
                  </span>
                </div>
              </div>

              <Button
                asChild
                variant="primary"
                size="lg"
                className="rounded-2xl gap-2 font-bold bg-purple-600 hover:bg-purple-700 shadow-purple-600/30"
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

            {/* Visual Route Card */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-purple-900/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white">Rute Kilat Bandara ➔ Annisa</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Estimasi Waktu Tempuh: 2–3 Menit</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                  Sangat Dekat
                </span>
              </div>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>🛫 Terminal Keberangkatan / Kedatangan</span>
                  <span className="font-bold text-white">0 km</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>🚗 Jalan Utama Bandara Pattimura</span>
                  <span className="font-bold text-slate-400">~ 400 m</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-950 border border-purple-600/50 flex items-center justify-between text-purple-300 font-bold">
                  <span>🏨 Penginapan Annisa</span>
                  <span>750 m (Tiba)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800 text-xs sm:text-sm">
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
            <Link
              href="/dashboard"
              className="text-purple-400 hover:text-purple-300 font-semibold transition"
            >
              Portal Staf ➔
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
