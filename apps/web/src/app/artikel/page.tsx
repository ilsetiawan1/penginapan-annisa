"use client";

import { BookOpen, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "../../components/layout/navbar";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";

export default function ArtikelPage() {
  const articles = [
    {
      title: "Tips Transit Nyaman dan Bebas Ketinggalan Pesawat di Bandara Pattimura",
      slug: "tips-transit-bandara-pattimura",
      category: "Panduan Transit",
      readTime: "3 Menit",
      date: "19 Agustus 2026",
      desc: "Punya jeda penerbangan beberapa jam atau flight subuh di Ambon? Simak tips istirahat nyaman hanya 750 meter dari terminal tanpa stres macet.",
    },
    {
      title: "5 Destinasi Wisata Eksotis di Sekitar Ambon yang Bisa Dikunjungi Singkat",
      slug: "wisata-singkat-ambon",
      category: "Wisata Maluku",
      readTime: "4 Menit",
      date: "18 Agustus 2026",
      desc: "Dari Pantai Liang hingga Pintu Kota, jelajahi pesona alam Ambon Manise di sela-sela jadwal transit penerbangan Anda.",
    },
    {
      title: "Mengenal Minyak Kayu Putih Namlea & Oleh-oleh Wajib Bawa Pulang dari Ambon",
      slug: "oleh-oleh-khas-ambon",
      category: "Kuliner & Oleh-oleh",
      readTime: "3 Menit",
      date: "15 Agustus 2026",
      desc: "Panduan belanja oleh-oleh khas Maluku yang otentik, mulai dari minyak kayu putih asli Pulau Buru hingga aneka camilan sagu kenari.",
    },
    {
      title: "Panduan Lengkap Jam Operasional & Transportasi Bandara Internasional Pattimura",
      slug: "panduan-transportasi-bandara-pattimura",
      category: "Panduan Transit",
      readTime: "3 Menit",
      date: "10 Agustus 2026",
      desc: "Informasi mengenai akses transportasi taksi bandara, ojek, dan rute kilat 2–3 menit menuju Penginapan Annisa.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5fc] text-[#1e1035] selection:bg-purple-200 selection:text-purple-900 pb-20 relative overflow-hidden">
      {/* Ambient Glass Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-300/35 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-pink-200/30 rounded-full blur-[130px] -z-10 pointer-events-none" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" className="mb-3">
            Artikel &amp; Panduan
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Artikel Wisata &amp; Informasi Transit
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Kumpulan panduan praktis penerbangan, wisata kuliner khas Maluku, dan tips transit
            bandara Ambon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <Card
              key={art.slug}
              className="p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 hover:bg-white/90 hover:border-purple-200/90 hover:shadow-2xl shadow-purple-950/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
                  <span className="text-purple-900 font-bold bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/90 shadow-2xs">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h2 className="font-bold text-xl text-slate-900 hover:text-purple-700 transition leading-snug mb-3">
                  {art.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{art.desc}</p>
              </div>

              <div className="pt-4 border-t border-purple-100/50 flex items-center justify-between text-xs font-semibold text-purple-700">
                <span>{art.date}</span>
                <span className="hover:underline flex items-center gap-1 font-bold">
                  Baca Selengkapnya ➔
                </span>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
