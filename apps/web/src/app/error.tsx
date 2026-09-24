"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, MessageSquare, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#f8f9fc] flex flex-col items-center justify-between p-4 sm:p-8 md:p-12 relative overflow-hidden font-sans">
      {/* Ambient soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-100/40 via-purple-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Floating Capsule Nav */}
      <header className="w-full max-w-5xl mb-6 sm:mb-10 flex items-center justify-between">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full py-2 px-3 sm:px-5 flex items-center justify-between w-full shadow-sm">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-sm tracking-tighter group-hover:bg-purple-900 transition-colors">
              PA
            </div>
            <span className="font-bold text-slate-900 text-sm hidden sm:inline tracking-tight">
              Penginapan Annisa
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-purple-900 text-white text-xs font-semibold py-1.5 px-4 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Ke Beranda</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Center 500 Hero Card with Grid Background */}
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
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-rose-600 uppercase mb-2 sm:mb-3 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>500 System Error</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3 sm:mb-4">
              Oops! Terjadi Kendala Pada Sistem.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed mb-6 sm:mb-8 max-w-md">
              {error.message ||
                "Terjadi gangguan sementara saat memuat data. Tim kami sedang meninjau. Anda dapat mencoba memuat ulang halaman."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-full shadow-md shadow-slate-950/15 transition-all duration-200 group cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Muat Ulang</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs py-3 px-5 rounded-full transition-all duration-200"
              >
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>

          {/* Right Giant 500 Column */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div className="text-7xl sm:text-9xl md:text-[130px] lg:text-[150px] font-black text-slate-700/80 tracking-tighter select-none leading-none">
              500
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Dark Card / Help Banner */}
      <footer className="w-full max-w-5xl mt-6 sm:mt-10 bg-[#0c0f17] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 relative overflow-hidden border border-slate-800 shadow-xl">
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
          <div className="flex flex-col items-start">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
              Butuh Bantuan Cepat? Hubungi Pengelola Langsung
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Front Desk 24 Jam Siap Membantu
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Lokasi 750m dari Bandara Pattimura Ambon
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20terjadi%20kendala%20sistem%20saat%20saya%20mengakses%20website"
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
