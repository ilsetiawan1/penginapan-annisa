"use client";

import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "../../components/layout/navbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f9f7fd] text-[#1e1035] selection:bg-purple-200 selection:text-purple-900 pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-28">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="purple" className="mb-3">
            Informasi Kontak &amp; Lokasi
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Hubungi &amp; Temukan Kami
          </h1>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Kami siap melayani kebutuhan kamar transit dan istirahat Anda 24 jam. Lokasi sangat
            dekat dari Bandara Pattimura Ambon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Card 1: WhatsApp & Telepon */}
          <Card className="p-6 sm:p-8 bg-white rounded-3xl border border-purple-100 shadow-xl shadow-purple-950/5 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 mb-1">WhatsApp &amp; Telepon</h2>
              <p className="text-xs text-slate-500 mb-4">
                Layanan cepat 24 jam untuk reservasi kamar &amp; informasi transit.
              </p>
              <p className="text-xl font-black text-purple-700 font-mono mb-4">0812-4216-3116</p>
            </div>
            <Button
              asChild
              variant="primary"
              size="md"
              className="w-full justify-center gap-2 rounded-2xl font-bold text-xs bg-purple-600 hover:bg-purple-700 shadow-purple-600/25"
            >
              <a
                href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20reservasi"
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>
            </Button>
          </Card>

          {/* Card 2: Alamat & Titik Lokasi */}
          <Card className="p-6 sm:p-8 bg-white rounded-3xl border border-purple-100 shadow-xl shadow-purple-950/5 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 mb-1">Alamat Penginapan</h2>
              <p className="text-xs text-slate-500 mb-2">
                Hanya 750m dari Terminal Bandara Internasional Pattimura.
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold mb-4">
                Jl. Bandara Pattimura, Ambon, Maluku (2–3 menit perjalanan dari bandara).
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="md"
              className="w-full justify-center gap-2 rounded-2xl font-bold text-xs border-purple-200 text-purple-900 hover:bg-purple-50 shadow-2xs"
            >
              <a href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7" target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 text-purple-600" />
                <span>Buka Google Maps</span>
              </a>
            </Button>
          </Card>

          {/* Card 3: Waktu Operasional */}
          <Card className="p-6 sm:p-8 bg-white rounded-3xl border border-purple-100 shadow-xl shadow-purple-950/5 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 mb-1">Jam Operasional</h2>
              <p className="text-xs text-slate-500 mb-3">
                Siap menerima tamu kapan saja sesuai jadwal penerbangan.
              </p>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <p>
                  <strong>Check-in:</strong> Fleksibel 24 Jam
                </p>
                <p>
                  <strong>Check-out:</strong> 12:00 WIT
                </p>
                <p>
                  <strong>Resepsionis:</strong> Buka 24 Jam Setiap Hari
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-purple-50 text-[11px] text-purple-800 font-bold bg-purple-50/70 p-2.5 rounded-xl text-center">
              Layanan Transit Aman &amp; Nyaman
            </div>
          </Card>
        </div>

        {/* Embedded Full Interactive Google Map */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-purple-100 shadow-xl shadow-purple-950/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg text-slate-950">Peta Navigasi Interaktif</h2>
              <p className="text-xs text-slate-500">
                Gunakan peta di bawah ini untuk melihat posisi tepat Penginapan Annisa dari Bandara
                Pattimura.
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
              750m dari Bandara
            </span>
          </div>

          <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-purple-100 shadow-inner">
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
      </main>
    </div>
  );
}
