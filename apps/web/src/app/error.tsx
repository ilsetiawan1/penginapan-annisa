"use client";

import { RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-slate-50/60 flex flex-col justify-between items-center p-6 sm:p-10 font-sans">
      {/* Header Atas */}
      <header className="flex flex-col items-center">
        <Image
          src="/images/branding/logo.png"
          alt="Logo Penginapan Annisa"
          width={36}
          height={36}
          priority
          className="rounded-xl shadow-2xs mb-2"
        />
        <span className="text-xs font-semibold text-slate-800 tracking-tight">
          Penginapan Annisa
        </span>
      </header>

      {/* Konten Tengah (Wadah Card Bersih) */}
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 text-center shadow-xl shadow-slate-100 my-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-6">
          500 • Terjadi Kendala Sistem
        </span>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Terjadi kesalahan pada sistem
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
          Sistem mengalami kendala saat memproses permintaan Anda. Silakan coba muat ulang halaman.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col w-full">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-slate-900 hover:bg-slate-800 text-white h-11 rounded-xl text-sm font-medium w-full flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>

          <Link
            href="/"
            className="border border-slate-200 text-slate-700 hover:bg-slate-50 h-11 rounded-xl text-sm font-medium w-full inline-flex items-center justify-center mt-2.5 transition-all shadow-2xs"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Footer Bawah */}
      <footer className="text-center">
        <p className="text-[11px] text-slate-400">
          © Penginapan Annisa Ambon • Layanan Tamu &amp; Reservasi
        </p>
      </footer>
    </main>
  );
}
