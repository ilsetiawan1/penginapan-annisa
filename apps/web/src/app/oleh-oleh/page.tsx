"use client";

import { CheckCircle2, Gift, Phone, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../../components/layout/navbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function OlehOlehPage() {
  const souvenirs = [
    {
      name: "Minyak Kayu Putih Asli Namlea (100ml)",
      category: "Herbal & Minyak Alami",
      price: "Rp 65.000",
      desc: "Penyulingan murni asli Pulau Buru Namlea. Hangat alami, aroma menenangkan, dan membantu meredakan masuk angin.",
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
      category: "Minutan Tradisional",
      price: "Rp 40.000",
      desc: "Kopi khas Ambon dengan racikan jahe merah, cengkeh, kayu manis, dan taburan kenari sangrai.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Halua Kenari Gula Aren Maluku",
      category: "Camilan Tradisional",
      price: "Rp 38.000",
      desc: "Biji kenari pilihan disangrai dan dibalut karamel gula aren murni khas Saparua Maluku.",
      image:
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Sambal Roa Khas Kepulauan Ambon",
      category: "Bumbu & Sambal",
      price: "Rp 50.000",
      desc: "Sambal ikan asap pedas gurih, pas untuk lauk pelengkap santapan maupun buah tangan.",
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600&auto=format&fit=crop",
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
            Etalase Oleh-oleh Otentik
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Oleh-oleh Khas Ambon &amp; Maluku
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Dapatkan produk cinderamata dan kuliner khas otentik langsung di resepsionis Penginapan
            Annisa. Praktis, siap dibawa terbang tanpa repot belanja keliling kota.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {souvenirs.map((item) => (
            <Card
              key={item.name}
              className="overflow-hidden p-0 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 hover:bg-white/90 hover:border-purple-200/90 hover:shadow-2xl shadow-purple-950/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full bg-purple-50 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="font-bold text-lg text-slate-900 mb-1 leading-snug">
                    {item.name}
                  </h2>
                  <p className="text-2xl font-black text-purple-700 mb-3">{item.price}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="w-full justify-center gap-2 rounded-2xl font-bold text-xs bg-purple-600 hover:bg-purple-700 shadow-purple-600/30"
                >
                  <a
                    href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20membeli%20oleh-oleh%20${encodeURIComponent(
                      item.name,
                    )}%20(${item.price}).%20Apakah%20stok%20tersedia?`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Pesan / Tanya Stok via WA</span>
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
