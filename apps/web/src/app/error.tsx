"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console / logger service
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#faf9fc] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-rose-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-rose-900/5 flex flex-col items-center">
        {/* Error Icon Badge */}
        <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30 mb-6">
          <AlertTriangle className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200/60 px-3 py-1 rounded-full mb-3">
          Terjadi Kendala Sistem
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Oops! Terjadi Kesalahan
        </h1>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {error.message ||
            "Sistem sedang mengalami kendala memuat halaman. Silakan coba muat ulang atau kembali ke beranda."}
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold shadow-md shadow-purple-700/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
