"use client";

import { Clock, ExternalLink, MapPin, Navigation, Phone, Plane, ShieldCheck } from "lucide-react";
import { Navbar } from "../../components/layout/navbar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-24 pb-8 flex flex-col justify-center">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <Badge variant="purple" className="mb-2">
            Kontak &amp; Lokasi
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Hubungi Penginapan Annisa
          </h1>
          <p className="text-slate-600 mt-1 text-xs sm:text-sm">
            Hanya 750 meter (2–3 menit) dari Bandara Internasional Pattimura Ambon.
          </p>
        </div>

        {/* Clean Minimalist Unified Box */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Contact & Hours Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* WhatsApp Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none mb-1">
                      WhatsApp &amp; Telepon
                    </span>
                    <span className="text-sm sm:text-base font-black text-slate-900 font-mono">
                      0812-4216-3116
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-xs"
                >
                  <a
                    href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20reservasi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat WA
                  </a>
                </Button>
              </div>

              {/* Address Item */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none mb-1">
                    Alamat Lengkap
                  </span>
                  <p className="font-semibold text-slate-800 leading-snug">
                    Jl. Bandara Pattimura (750m dari Terminal Keberangkatan), Ambon, Maluku.
                  </p>
                </div>
              </div>

              {/* Operating Hours Item */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none mb-1">
                    Jam Operasional &amp; Check-In
                  </span>
                  <div className="space-y-0.5 text-slate-700 font-medium">
                    <p>
                      <strong>Jam Operasional:</strong> 07:00 – 21:00 WIT
                    </p>
                    <p>
                      <strong>Check-In:</strong> Fleksibel (07:00 – 21:00 WIT)
                    </p>
                    <p>
                      <strong>Check-Out Standar:</strong> 12:00 WIT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Direction CTA */}
            <Button
              asChild
              variant="outline"
              size="md"
              className="w-full justify-center gap-2 rounded-xl font-bold text-xs border-slate-300 text-slate-800 hover:bg-slate-50"
            >
              <a href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7" target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 text-purple-700" />
                <span>Buka Petunjuk Arah di Google Maps App</span>
              </a>
            </Button>
          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7 h-[300px] sm:h-[380px] lg:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200">
            <iframe
              title="Google Maps Lokasi Penginapan Annisa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1990.7403357162448!2d128.08762133246853!3d-3.7047467933343032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce7a259d48e1b%3A0x304cec63773e589e!2sPenginapan%20Annisa!5e0!3m2!1sid!2sid!4v1787149833837!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
