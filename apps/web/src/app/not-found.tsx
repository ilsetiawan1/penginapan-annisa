"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, Home, BedDouble } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-between p-4 sm:p-8 md:p-12 relative overflow-hidden font-sans">
      {/* Ambient background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-100/40 via-purple-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Floating Capsule Nav */}
      <header className="w-full max-w-5xl mb-6 sm:mb-10 flex items-center justify-between">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full py-2 px-3 sm:px-5 flex items-center justify-between w-full shadow-sm">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-sm tracking-tighter group-hover:bg-purple-900 transition-colors">
              PA
            </div>
            <span className="font-bold text-slate-900 text-sm hidden sm:inline tracking-tight">
              Penginapan Annisa
            </span>
          </Link>

          {/* Quick Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <Link href="/" className="hover:text-purple-700 transition-colors">
              Beranda
            </Link>
            <Link href="/kamar" className="hover:text-purple-700 transition-colors">
              Kamar
            </Link>
            <Link href="/oleh-oleh" className="hover:text-purple-700 transition-colors">
              Oleh-Oleh
            </Link>
            <Link href="/fasilitas" className="hover:text-purple-700 transition-colors">
              Fasilitas
            </Link>
            <Link href="/kontak" className="hover:text-purple-700 transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-full transition-colors hidden sm:inline-block"
            >
              Log In
            </Link>
            <Link
              href="/kamar"
              className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-purple-900 text-white text-xs font-semibold py-1.5 px-4 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Pesan Kamar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Center 404 Hero Card with Grid Background */}
      <section className="w-full max-w-5xl bg-white/70 backdrop-blur-md border border-slate-200/90 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] p-6 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden shadow-sm my-auto">
        {/* Crisp grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2 sm:mb-3">
              404 Not Found
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3 sm:mb-4">
              Oops! We couldn&apos;t find that page.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed mb-6 sm:mb-8 max-w-md">
              Halaman yang Anda cari tidak dapat ditemukan atau mungkin tautan telah dipindahkan.
              Yuk kembali ke beranda Penginapan Annisa.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full shadow-md shadow-slate-950/15 transition-all duration-200 group"
              >
                <span>Back to Home</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </Link>

              <Link
                href="/kamar"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs py-3 px-5 rounded-full transition-all duration-200"
              >
                <BedDouble className="w-3.5 h-3.5" />
                <span>Lihat Kamar</span>
              </Link>
            </div>
          </div>

          {/* Right Giant 404 Column */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div className="text-7xl sm:text-9xl md:text-[130px] lg:text-[150px] font-black text-slate-700/80 tracking-tighter select-none leading-none">
              404
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Dark Card / Help Banner */}
      <footer className="w-full max-w-5xl mt-6 sm:mt-10 bg-[#0c0f17] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-xl">
        {/* Dark subtle grid texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left info & features */}
          <div className="flex flex-col items-start">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
              Butuh Bantuan Reservasi atau Informasi Kamar?
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                750m dari Bandara Pattimura Ambon
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Layanan Front Desk 24 Jam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Free WiFi & Antar Jemput
              </span>
            </div>
          </div>

          {/* Right action button */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20bertanya%20mengenai%20kamar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full transition-all duration-200 shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hubungi WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
