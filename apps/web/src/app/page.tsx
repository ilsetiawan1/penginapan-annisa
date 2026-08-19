"use client";

import {
  ArrowRight,
  Bed,
  CheckCircle2,
  Clock,
  Gift,
  HeartHandshake,
  MapPin,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/layout/navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { BookingWidget } from "../features/booking/booking-widget";

export default function HomePage() {
  const previewRooms = [
    {
      id: "ac",
      name: "Kamar AC Superior",
      badge: "4 Unit Tersedia",
      badgeVariant: "purple" as const,
      price: 275000,
      dp: 137500,
      capacity: "2–3 Orang",
      bed: "1 Double Bed (King Size)",
      desc: "Kamar sejuk dan tenang dilengkapi AC dingin, kamar mandi pribadi dalam, TV, dan WiFi kencang. Pilihan utama transit penerbangan pagi.",
      facilities: ["AC Dingin", "Kamar Mandi Dalam", "WiFi Kencang", "TV LED"],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "kipas",
      name: "Kamar Kipas Standar",
      badge: "4 Unit Tersedia",
      badgeVariant: "purple" as const,
      price: 200000,
      dp: 100000,
      capacity: "2–3 Orang",
      bed: "1 Double / 2 Single Bed",
      desc: "Kamar ekonomis yang bersih dan nyaman dengan sirkulasi udara segar, kamar mandi pribadi dalam, dan WiFi gratis. Pilihan hemat terbaik.",
      facilities: ["Kipas Angin Dinding", "Kamar Mandi Dalam", "WiFi Gratis", "TV"],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const previewSouvenirs = [
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
  ];

  const previewArticles = [
    {
      title: "Tips Transit Nyaman dan Bebas Ketinggalan Pesawat di Bandara Pattimura",
      slug: "tips-transit-bandara-pattimura",
      category: "Panduan Transit",
      readTime: "3 Menit",
      desc: "Punya jeda penerbangan beberapa jam atau flight subuh di Ambon? Simak tips istirahat nyaman hanya 750 meter dari terminal.",
    },
    {
      title: "5 Destinasi Wisata Eksotis di Sekitar Ambon yang Bisa Dikunjungi Singkat",
      slug: "wisata-singkat-ambon",
      category: "Wisata Maluku",
      readTime: "4 Menit",
      desc: "Dari Pantai Liang hingga Pintu Kota, jelajahi pesona alam Ambon Manise di sela-sela jadwal transit penerbangan Anda.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Soft Background Decorative Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-purple-200/50 via-purple-100/60 to-pink-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

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

          {/* Category Filter Pills (Reference Style) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 border border-purple-100 text-slate-700 hover:border-purple-300 hover:text-purple-700 shadow-xs transition"
            >
              <Bed className="w-3.5 h-3.5 text-purple-600" />
              <span>Semua Kamar (8 Unit)</span>
            </Link>
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 border border-purple-100 text-slate-700 hover:border-purple-300 hover:text-purple-700 shadow-xs transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Kamar AC Superior (Rp 275rb)</span>
            </Link>
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 border border-purple-100 text-slate-700 hover:border-purple-300 hover:text-purple-700 shadow-xs transition"
            >
              <Wind className="w-3.5 h-3.5 text-purple-600" />
              <span>Kamar Kipas Standar (Rp 200rb)</span>
            </Link>
            <Link
              href="/oleh-oleh"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 border border-purple-100 text-slate-700 hover:border-purple-300 hover:text-purple-700 shadow-xs transition"
            >
              <Gift className="w-3.5 h-3.5 text-purple-600" />
              <span>Oleh-oleh Maluku</span>
            </Link>
          </div>
        </div>

        {/* Interactive Booking & Availability Calculator */}
        <div className="mt-10">
          <BookingWidget />
        </div>
      </section>

      {/* Mengapa Memilih Kami Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-brand-50/40 to-white border-y border-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="purple" className="mb-3">
              Keunggulan Kami
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mengapa Memilih Penginapan Annisa?
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Kami merancang setiap layanan agar Anda dapat beristirahat dengan tenang tanpa stres
              mengejar jadwal penerbangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Ringkasan Pilihan Kamar Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="purple" className="mb-2">
              Pilihan Kamar Transit
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tipe Kamar Penginapan Annisa
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Tersedia 4 Kamar AC Superior dan 4 Kamar Kipas Standar dengan DP transparan 50%.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-purple-200 text-purple-700 hover:bg-purple-50 font-bold gap-2 self-start sm:self-auto shrink-0"
          >
            <Link href="/kamar">
              <span>Lihat Semua 8 Kamar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {previewRooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden p-0 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all flex flex-col justify-between bg-white"
            >
              <div>
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
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                    <span>{room.capacity}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{room.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-purple-700">
                      Rp {room.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ malam</span>
                    <span className="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded-full ml-auto">
                      DP 50%: Rp {room.dp.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">{room.desc}</p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
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

              <div className="p-6 pt-0 flex gap-3">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2 rounded-2xl shadow-purple-600/20 font-bold text-sm bg-purple-600 hover:bg-purple-700"
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

      {/* Ringkasan Etalase Oleh-oleh Section */}
      <section className="py-20 px-4 bg-purple-50/30 border-t border-purple-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="purple" className="mb-2">
                Etalase Produk Lokal
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Oleh-oleh Khas Ambon &amp; Maluku
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Cinderamata dan makanan khas otentik tersedia langsung di resepsionis Penginapan
                Annisa.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-purple-200 text-purple-700 hover:bg-purple-50 font-bold gap-2 self-start sm:self-auto shrink-0"
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
                className="overflow-hidden p-0 bg-white hover:shadow-lg transition-all border-purple-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-900/85 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-base text-slate-900 line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xl font-black text-purple-700 mb-2">{item.price}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="py-2 px-3 rounded-xl bg-purple-50/60 border border-purple-100 text-center text-xs font-semibold text-purple-700">
                    Tersedia di Resepsionis
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ringkasan Artikel Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="purple" className="mb-2">
              Artikel &amp; Informasi
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Artikel Wisata &amp; Panduan Transit
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Tips transit bandara, kuliner khas, dan tempat wisata menarik di Ambon.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-purple-200 text-purple-700 hover:bg-purple-50 font-bold gap-2 self-start sm:self-auto shrink-0"
          >
            <Link href="/artikel">
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previewArticles.map((art) => (
            <Card
              key={art.slug}
              className="hover:border-purple-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between bg-white border-purple-100"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
                  <span className="text-purple-800 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 hover:text-purple-700 transition leading-snug mb-3">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{art.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                <Link href="/artikel" className="hover:underline flex items-center gap-1 font-bold">
                  <span>Baca Selengkapnya</span>
                  <span>→</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Location & Directions Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
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
                Pattimura Ambon. Sangat mudah dijangkau dengan ojek, taksi bandara, atau
                antar-jemput dalam waktu kurang dari 3 menit.
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
                className="rounded-2xl gap-2 font-bold bg-purple-600 hover:bg-purple-700 shadow-purple-600/25"
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
                <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-600/50 flex items-center justify-between text-purple-300 font-bold">
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
