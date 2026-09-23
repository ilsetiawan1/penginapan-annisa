"use client";

import { FaWhatsapp } from "react-icons/fa6";

export function FloatingWhatsApp() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281242163116";
  const defaultText = encodeURIComponent(
    "Halo Penginapan Annisa, saya ingin tanya ketersediaan kamar transit dekat Bandara Pattimura Ambon.",
  );
  const waUrl = `https://wa.me/${waNumber}?text=${defaultText}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-26 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center group pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* Tooltip Label */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Chat Resepsionis 24 Jam
      </span>

      {/* Pulsing Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Penginapan Annisa"
        className="relative w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/35 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </aside>
  );
}
