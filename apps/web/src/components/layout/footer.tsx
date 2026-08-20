import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#faf9fc] via-[#f1eaff] to-[#ebdffc] text-slate-800 pt-10 sm:pt-14 pb-6 px-4 border-t border-purple-200/60">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        {/* Top Grid: Location + Maps + Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Brand & Direct Location Guide */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-200/80 shadow-2xs">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-purple-50 p-0.5 border border-purple-200 shrink-0">
                  <Image
                    src="/logo-penginapan-annisa.png"
                    alt="Logo Penginapan Annisa"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-950 leading-tight">
                    Penginapan Annisa Ambon
                  </h3>
                  <p className="text-[11px] text-purple-700 font-semibold">
                    Transit Nyaman • 750m Bandara Pattimura
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                📍 <strong>Alamat:</strong> Jl. Bandara Pattimura, Tawiri, Ambon, Maluku.
                Hanya 2–3 menit berjalan kaki atau berkendara dari gerbang utama terminal kedatangan &amp; keberangkatan.
              </p>

              <div className="space-y-1.5 text-xs text-slate-700 bg-purple-50/70 rounded-xl p-3 border border-purple-100 mb-3">
                <p className="font-bold text-purple-950 text-[11px]">PETUNJUK ARAH CEPAT:</p>
                <p>1. Keluar gerbang bandara ➔ jalan 500m ke arah jalan utama.</p>
                <p>2. Belok kanan di gapura Tawiri ➔ penginapan berada 250m di sebelah kiri.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-100 text-xs">
              <span className="text-slate-500 font-medium">WhatsApp CS 24 Jam:</span>
              <a
                href="https://wa.me/6281242163116"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-purple-800 hover:text-purple-950 inline-flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0812-4216-3116</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-purple-200/80 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-700" />
                <span className="font-extrabold text-xs text-slate-900">
                  Peta Lokasi Google Maps
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold text-purple-700 hover:underline"
              >
                Buka di Google Maps ➔
              </a>
            </div>

            <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden border border-purple-100 shadow-inner">
              <iframe
                title="Peta Lokasi Penginapan Annisa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.654877797746!2d128.0901237758778!3d-3.700344443422477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce845b58309df%3A0xe5a3c032a13f7076!2sBandar%20Udara%20Internasional%20Pattimura!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Nav Links & Copyright */}
        <div className="pt-6 border-t border-purple-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
            <Link href="/" className="hover:text-purple-800 transition">
              Beranda
            </Link>
            <Link href="/kamar" className="hover:text-purple-800 transition">
              Tipe Kamar
            </Link>
            <Link href="/oleh-oleh" className="hover:text-purple-800 transition">
              Etalase Oleh-oleh
            </Link>
            <Link href="/artikel" className="hover:text-purple-800 transition">
              Artikel &amp; Wisata
            </Link>
            <Link href="/contact" className="hover:text-purple-800 transition">
              Kontak
            </Link>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-right">
            © 2026 Penginapan Annisa. 750m dari Bandara Pattimura Ambon. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
