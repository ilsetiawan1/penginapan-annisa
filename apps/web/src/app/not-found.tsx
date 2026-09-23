"use client";

import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf9fc] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-purple-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-purple-900/5 flex flex-col items-center">
        {/* Icon Badge */}
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-6 animate-bounce">
          <Compass className="w-10 h-10" />
        </div>

        {/* 404 Heading */}
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-200/60 px-3 py-1 rounded-full mb-3">
          Error 404 — Tersesat di Ambon
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          Yuk kembali ke beranda Penginapan Annisa.
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold shadow-md shadow-purple-700/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Ke Beranda
          </Link>
          <Link
            href="/kamar"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200/80 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Lihat Kamar
          </Link>
        </div>
      </div>

      {/* Footer minimal info */}
      <p className="mt-8 text-xs text-slate-400">
        Penginapan Annisa • 750m dari Bandara Pattimura Ambon
      </p>
    </main>
  );
}
