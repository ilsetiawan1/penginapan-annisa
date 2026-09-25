"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col justify-center items-center p-6 relative font-sans text-slate-900 select-none">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-50/50 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-100/30 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* Minimalist Top Nav */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center max-w-6xl mx-auto w-full z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-slate-800 tracking-tight group-hover:text-purple-700 transition-colors">Penginapan Annisa</span>
            <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">RMS System</span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 mt-12 z-10">
        
        {/* Left Side: Error Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 mb-6 shadow-sm">
            <SearchX className="w-6 h-6 text-purple-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            404 <span className="text-purple-600">Not Found</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-500 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
            Halaman yang Anda tuju tidak tersedia atau tautan telah dipindahkan. Yuk kembali menjelajahi fasilitas & kamar transit Penginapan Annisa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start w-full sm:w-auto mt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-md shadow-purple-600/20 active:scale-95 whitespace-nowrap"
            >
              <span>KEMBALI KE BERANDA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Side: Abstract Minimalist Graphic */}
        <div className="hidden md:flex flex-1 items-center justify-center relative">
          <div className="w-72 h-72 rounded-full border border-purple-100 absolute" />
          <div className="w-56 h-56 rounded-full border border-purple-100 absolute rotate-45 border-dashed" />
          <div className="w-40 h-40 bg-gradient-to-tr from-purple-100 to-white rounded-full shadow-lg shadow-purple-900/5 relative flex items-center justify-center border border-purple-50">
            <span className="text-6xl font-black text-purple-200 tracking-tighter">404</span>
          </div>
        </div>
      </div>
    </main>
  );
}
