"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, CheckCircle2, Home, MapPin, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="h-screen max-h-screen w-screen overflow-hidden bg-[#faf9fc] flex flex-col justify-between items-center p-3 sm:p-5 md:p-6 relative font-sans select-none">
      {/* Ambient background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-b from-purple-200/40 via-purple-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Floating Capsule Nav (Matching Public View) */}
      <header className="w-full max-w-5xl shrink-0">
        <div className="bg-white/80 backdrop-blur-xl border border-purple-100/80 rounded-full py-1.5 px-3 sm:px-4 flex items-center justify-between shadow-xs">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-purple-50 border border-purple-200/80 flex items-center justify-center shrink-0">
              <Image
                src="/logo-penginapan-annisa.png"
                alt="Logo Penginapan Annisa"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900 tracking-tight block leading-tight group-hover:text-purple-700 transition">
                Penginapan Annisa
              </span>
              <span className="text-[10px] text-purple-700 font-medium block leading-none">
                750m Bandara Pattimura
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-purple-700 transition-colors">
              Beranda
            </Link>
            <Link href="/kamar" className="hover:text-purple-700 transition-colors">
              Tipe Kamar
            </Link>
            <Link href="/oleh-oleh" className="hover:text-purple-700 transition-colors">
              Oleh-Oleh
            </Link>
            <Link href="/contact" className="hover:text-purple-700 transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-600 hover:text-purple-700 px-2.5 py-1 rounded-full transition-colors hidden sm:inline-block"
            >
              Masuk
            </Link>
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-1.5 px-3.5 rounded-full transition-all duration-200 shadow-xs shadow-purple-900/10"
            >
              <Bed className="w-3 h-3" />
              <span>Pesan Kamar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Center 404 Hero Card with Grid Background (Contained in Viewport) */}
      <section className="w-full max-w-5xl my-auto bg-white/85 backdrop-blur-xl border border-purple-100 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-sm flex flex-col justify-center">
        {/* Crisp grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Content Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-purple-700 uppercase mb-2 bg-purple-50 border border-purple-200/70 px-3 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-purple-600" />
              404 Not Found
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15] mb-2 sm:mb-3">
              Oops! Halaman Tidak Ditemukan.
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 max-w-md">
              Halaman yang Anda tuju tidak tersedia atau tautan telah dipindahkan.
              Yuk kembali menjelajahi fasilitas & kamar transit Penginapan Annisa.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-full shadow-md shadow-purple-900/15 transition-all duration-200 group"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform ml-0.5">
                  <ArrowRight className="w-2.5 h-2.5 text-white" />
                </span>
              </Link>

              <Link
                href="/kamar"
                className="inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 font-bold text-xs py-2.5 px-4 rounded-full transition-all duration-200"
              >
                <Bed className="w-3.5 h-3.5 text-purple-700" />
                <span>Lihat Tipe Kamar</span>
              </Link>
            </div>
          </div>

          {/* Right Giant 404 Column */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div className="text-7xl sm:text-9xl md:text-[120px] lg:text-[140px] font-black text-purple-950/25 tracking-tighter select-none leading-none">
              404
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Dark Card / Help Banner (Compact Height) */}
      <footer className="w-full max-w-5xl shrink-0 bg-slate-950 text-white rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-6 sm:py-3.5 relative overflow-hidden border border-slate-800 shadow-lg">
        {/* Dark subtle grid texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left info & features */}
          <div className="flex flex-col items-start">
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Butuh Bantuan Reservasi Kamar?</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                750m dari Bandara Pattimura
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Front Desk 24 Jam
              </span>
            </div>
          </div>

          {/* Right action button */}
          <div className="flex items-center shrink-0">
            <a
              href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20bertanya%20informasi%20kamar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs py-2 px-4 rounded-full transition-all duration-200 shadow-xs"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hubungi WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
