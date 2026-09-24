"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, RotateCcw, ShieldAlert, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log error for debugging
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main className="h-screen max-h-screen w-screen overflow-hidden bg-[#faf9fc] flex flex-col justify-between items-center p-3 sm:p-5 md:p-6 relative font-sans select-none">
      {/* Ambient soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-gradient-to-b from-rose-100/40 via-purple-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Top Floating Capsule Nav */}
      <header className="w-full max-w-5xl shrink-0">
        <div className="bg-white/80 backdrop-blur-xl border border-purple-100/80 rounded-full py-1.5 px-3 sm:px-4 flex items-center justify-between shadow-xs">
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

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-1.5 px-3.5 rounded-full transition-all duration-200 shadow-xs shadow-purple-900/10"
            >
              <span>Ke Beranda</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Center 500 Hero Card with Grid Background (Contained in Viewport) */}
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
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-rose-700 uppercase mb-2 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200/70">
              <ShieldAlert className="w-3 h-3 text-rose-600" />
              <span>500 System Error</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15] mb-2 sm:mb-3">
              Oops! Terjadi Kendala Pada Sistem.
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 max-w-md">
              Terjadi kendala teknis saat memuat data. Silakan coba muat ulang halaman atau hubungi front desk jika kendala berlanjut.
            </p>

            {/* Collapsible Error Detail for Debugging */}
            {error?.message && (
              <div className="mb-5 w-full max-w-md">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <span>{showDetails ? "Sembunyikan detail teknis" : "Lihat detail teknis"}</span>
                  {showDetails ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
                {showDetails && (
                  <div className="mt-2 p-2.5 bg-slate-100/90 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-700 max-h-24 overflow-y-auto break-all leading-tight">
                    {error.message}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-full shadow-md shadow-purple-900/15 transition-all duration-200 group cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Coba Muat Ulang</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 font-bold text-xs py-2.5 px-4 rounded-full transition-all duration-200"
              >
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>

          {/* Right Giant 500 Column */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div className="text-7xl sm:text-9xl md:text-[120px] lg:text-[140px] font-black text-purple-950/25 tracking-tighter select-none leading-none">
              500
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Dark Card / Help Banner (Compact Height) */}
      <footer className="w-full max-w-5xl shrink-0 bg-slate-950 text-white rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-6 sm:py-3.5 relative overflow-hidden border border-slate-800 shadow-lg">
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
          <div className="flex flex-col items-start">
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Butuh Bantuan Cepat? Hubungi Pengelola Langsung</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300 font-medium">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Front Desk 24 Jam Siap Membantu
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Lokasi 750m dari Bandara Pattimura Ambon
              </span>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <a
              href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20terjadi%20kendala%20sistem%20saat%20saya%20mengakses%20website"
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
