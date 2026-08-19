"use client";

import {
  Bed,
  CheckCircle2,
  Clock,
  Coffee,
  HeartHandshake,
  MapPin,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/layout/navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BookingWidget } from "../features/booking/booking-widget";

export default function HomePage() {
  const rooms = [
    {
      id: "ac",
      name: "Kamar AC Superior",
      badge: "4 Unit Tersedia",
      badgeVariant: "purple" as const,
      price: 275000,
      dp: 137500,
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      desc: "Kamar sejuk dan tenang dilengkapi pendingin ruangan (AC), kamar mandi pribadi, TV, dan WiFi kencang. Pilihan utama penumpang transit dan perjalanan dinas.",
      facilities: [
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "kipas",
      name: "Kamar Kipas Standar",
      badge: "4 Unit Tersedia",
      badgeVariant: "amber" as const,
      price: 200000,
      dp: 100000,
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      desc: "Kamar ekonomis yang bersih dan nyaman dengan sirkulasi udara segar, kamar mandi pribadi, dan WiFi gratis. Pilihan hemat terbaik untuk istirahat transit.",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
        "Air Mineral",
      ],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const souvenirs = [
    {
      name: "Minyak Kayu Putih Asli Namlea (100ml)",
      category: "Herbal & Minyak Alami",
      price: "Rp 65.000",
      desc: "Penyulingan murni asli Pulau Buru Namlea. Hangat alami dan aromanya menenangkan.",
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
    {
      name: "Kopi Rarobang Rempah Ambon",
      category: "Minuman Tradisional",
      price: "Rp 40.000",
      desc: "Kopi khas Ambon dengan ramuan jahe merah, cengkeh, kayu manis, dan taburan kenari sangrai.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const articles = [
    {
      title: "Tips Transit Nyaman dan Bebas Ketinggalan Pesawat di Bandara Pattimura",
      slug: "tips-transit-bandara-pattimura",
      category: "Panduan Transit",
      readTime: "3 Menit",
      date: "Agustus 2026",
      desc: "Punya jeda penerbangan beberapa jam atau flight subuh di Ambon? Simak tips istirahat nyaman hanya 750 meter dari terminal.",
    },
    {
      title: "5 Destinasi Wisata Eksotis di Sekitar Ambon yang Bisa Dikunjungi Singkat",
      slug: "wisata-singkat-ambon",
      category: "Wisata Maluku",
      readTime: "4 Menit",
      date: "Agustus 2026",
      desc: "Dari Pantai Liang hingga Pintu Kota, jelajahi pesona alam Ambon Manise di sela-sela jadwal transit penerbangan Anda.",
    },
    {
      title: "Mengenal Minyak Kayu Putih Namlea & Oleh-oleh Wajib Bawa Pulang dari Ambon",
      slug: "oleh-oleh-khas-ambon",
      category: "Kuliner & Oleh-oleh",
      readTime: "3 Menit",
      date: "Agustus 2026",
      desc: "Panduan belanja oleh-oleh khas Maluku yang otentik dan bisa didapatkan langsung di Penginapan Annisa.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Soft Background Decorative Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-200/40 via-purple-100/50 to-pink-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <MapPin className="w-4 h-4 text-purple-600" />
            <span>750 Meter dari Bandara Internasional Pattimura Ambon</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Penginapan Transit Nyaman &amp; Tenang Dekat{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-brand-600 to-indigo-700">
              Bandara Pattimura
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Solusi istirahat ideal untuk penumpang transit penerbangan pagi, pelancong dinas, dan
            wisatawan. Kamar bersih, WiFi kencang, dan{" "}
            <strong>bebas risiko ketinggalan pesawat</strong>.
          </p>

          {/* Key Metric Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-purple-100 shadow-xs">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Check-in Fleksibel 24 Jam</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-purple-100 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Kamar Mandi Dalam di Tiap Kamar</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-purple-100 shadow-xs">
              <Wifi className="w-4 h-4 text-purple-600" />
              <span>Free WiFi High-Speed</span>
            </div>
          </div>
        </div>

        {/* Interactive Booking & Availability Calculator */}
        <div className="mt-10">
          <BookingWidget />
        </div>
      </section>

      {/* Why Choose Annisa Section (Matching Reference Style) */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-brand-50/40 to-white border-y border-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="purple" className="mb-3">
              Keunggulan Kami
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kenyamanan Maksimal untuk Waktu Transit Anda
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Kami merancang setiap layanan agar Anda dapat beristirahat dengan tenang tanpa stres
              mengejar jadwal penerbangan.
            </p>
          </div>

          {/* 3 Main Highlights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="hover:border-purple-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hanya 750m ke Bandara</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hanya butuh waktu 2–3 menit perjalanan menuju terminal keberangkatan Bandara
                Pattimura Ambon. Bebas macet dan aman untuk penerbangan subuh.
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="hover:border-purple-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Check-in Fleksibel 24 Jam</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mendarat pagi jam 09.00 WIT? Anda bisa langsung masuk kamar jika unit telah siap
                (*Ready*), dengan waktu checkout standar esok hari pukul 12.00 WIT.
              </p>
            </Card>

            {/* Card 3 */}
            <Card className="hover:border-purple-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pelayanan Ramah &amp; Aman</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Penginapan keluarga yang bersih, tenang, aman, serta dilengkapi etalase oleh-oleh
                khas Maluku langsung di lokasi penginapan.
              </p>
            </Card>
          </div>

          {/* Stats Bar (Like Reference) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 bg-white rounded-3xl p-6 border border-purple-100 shadow-xs text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-700">750m</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Jarak ke Bandara</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900">8 Kamar</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                4 AC &amp; 4 Kipas
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-600">24 Jam</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Layanan Check-in</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-600">100%</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Kamar Mandi Dalam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Showcase Section */}
      <section id="kamar" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="purple" className="mb-3">
            Pilihan Kamar
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tipe Kamar Penginapan Annisa
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Tersedia total 8 unit kamar berfasilitas lengkap dengan harga terjangkau dan
            transparansi DP 50%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden p-0 border-slate-200/90 hover:border-brand-400 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Room Image */}
                <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={room.badgeVariant}
                      className="bg-white/95 backdrop-blur font-bold shadow-sm"
                    >
                      {room.badge}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-300" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-2xl font-bold text-slate-900">{room.name}</h3>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-brand-700">
                      Rp {room.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ malam</span>
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded-full ml-auto">
                      DP 50%: Rp {room.dp.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">{room.desc}</p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Fasilitas Kamar:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      {room.facilities.map((fac) => (
                        <div key={fac} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2 rounded-2xl shadow-brand-600/20 font-bold text-sm bg-purple-600 hover:bg-purple-700"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20${encodeURIComponent(
                      room.name,
                    )}%20(Rp%20${room.price.toLocaleString("id-ID")}/mlm).%20Apakah%20masih%20tersedia?`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Booking {room.name} via WA</span>
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Souvenirs Showcase Section */}
      <section id="oleh-oleh" className="py-20 px-4 bg-slate-100/70 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="purple" className="mb-3">
              Etalase Produk Lokal
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Oleh-oleh Khas Ambon &amp; Maluku
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Dapatkan produk cinderamata dan makanan khas otentik langsung di lokasi Penginapan
              Annisa tanpa perlu repot keliling kota.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {souvenirs.map((item) => (
              <Card
                key={item.name}
                className="overflow-hidden p-0 bg-white hover:shadow-lg transition-all border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-700">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-base text-slate-900 line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-lg font-extrabold text-brand-700 mb-2">{item.price}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs font-semibold text-slate-600">
                    Tersedia di Resepsionis
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Guide Articles Section */}
      <section id="artikel" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="purple" className="mb-3">
            Artikel &amp; Informasi
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Artikel Wisata &amp; Panduan Transit Ambon
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Informasi berguna seputar bandara, kuliner lokal, dan destinasi wisata di Ambon Manise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <Card
              key={art.slug}
              className="hover:border-purple-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
                  <span className="text-brand-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 hover:text-brand-700 transition leading-snug mb-3">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{art.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-700">
                <span>Baca Selengkapnya</span>
                <span>→</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Location & Directions Section */}
      <section id="lokasi" className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/80 border border-brand-700 text-brand-300 text-xs font-bold mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>Titik Lokasi Strategis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Hanya 750m dari Bandara Pattimura
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Penginapan Annisa beralamat dekat dengan akses jalan utama Bandara Internasional
                Pattimura Ambon. Sangat mudah dijangkau dengan ojek, taksi bandara, atau
                antar-jemput dalam waktu kurang dari 3 menit.
              </p>

              <div className="space-y-3 text-sm text-slate-300 mb-8">
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
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
                className="rounded-2xl gap-2 font-bold bg-purple-600 hover:bg-purple-700"
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

            {/* Visual Location Card */}
            <div className="bg-slate-800/90 p-6 sm:p-8 rounded-3xl border border-slate-700">
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
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                  <span>🛫 Terminal Keberangkatan / Kedatangan</span>
                  <span className="font-bold text-white">0 km</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                  <span>🚗 Jalan Utama Bandara Pattimura</span>
                  <span className="font-bold text-slate-400">~ 400 m</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-brand-900/40 border border-brand-600/50 flex items-center justify-between text-brand-300 font-bold">
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
            <Link href="/#kamar" className="hover:text-white transition">
              Kamar AC & Kipas
            </Link>
            <Link href="/#oleh-oleh" className="hover:text-white transition">
              Oleh-oleh Maluku
            </Link>
            <Link href="/#artikel" className="hover:text-white transition">
              Artikel
            </Link>
            <Link
              href="/dashboard"
              className="text-brand-400 hover:text-brand-300 font-semibold transition"
            >
              Portal Staf ➔
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
