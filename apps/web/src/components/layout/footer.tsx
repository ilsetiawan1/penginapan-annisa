import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-700 py-8 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-purple-50 p-0.5 border border-purple-100 shrink-0">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo Penginapan Annisa"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
              Penginapan Annisa Ambon
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Penginapan transit nyaman hanya 750m dari Bandara Pattimura.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600">
          <Link href="/" className="hover:text-purple-700 transition">
            Beranda
          </Link>
          <Link href="/kamar" className="hover:text-purple-700 transition">
            Tipe Kamar
          </Link>
          <Link href="/oleh-oleh" className="hover:text-purple-700 transition">
            Oleh-oleh
          </Link>
          <Link href="/artikel" className="hover:text-purple-700 transition">
            Artikel
          </Link>
          <Link href="/contact" className="hover:text-purple-700 transition">
            Kontak
          </Link>
        </nav>

        {/* WhatsApp CS Link */}
        <div className="text-center md:text-right text-xs">
          <a
            href={`https://wa.me/${ANNISA_WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full border border-purple-100 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WA: 0812-4216-3116</span>
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-medium text-center sm:text-left">
        <p>© 2026 Penginapan Annisa. Hak Cipta Dilindungi.</p>
        <p>Buka 06:00 – 22:00 WIT • Tawiri, Ambon, Maluku</p>
      </div>
    </footer>
  );
}
