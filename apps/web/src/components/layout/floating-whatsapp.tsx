"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { X } from "lucide-react";
import { useCart } from "@/features/public/souvenirs/hooks/use-cart";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const { totalItemsCount } = useCart();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showCloseBadge, setShowCloseBadge] = useState(false);

  const isSouvenirPage = pathname?.includes("/oleh-oleh") || pathname === "/";
  const hasActiveCart = isSouvenirPage && totalItemsCount > 0;

  useEffect(() => {
    // Siklus bergantian:
    // Status dot aktif: 3.5 detik (~3x kedip)
    // Tanda 'X' close aktif: 5 detik
    const timer = setTimeout(() => {
      setShowCloseBadge((prev) => !prev);
    }, showCloseBadge ? 5000 : 3500);

    return () => clearTimeout(timer);
  }, [showCloseBadge]);

  if (isDismissed) return null;

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281242163116";
  const defaultText = encodeURIComponent(
    "Halo Penginapan Annisa, saya ingin tanya ketersediaan kamar transit dekat Bandara Pattimura Ambon.",
  );
  const waUrl = `https://wa.me/${waNumber}?text=${defaultText}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className={`fixed right-4 sm:right-6 z-50 flex items-center group transition-all duration-300 pb-[env(safe-area-inset-bottom,0px)] ${
        hasActiveCart
          ? "bottom-24 sm:bottom-6"
          : "bottom-5 sm:bottom-6"
      }`}
    >
      {/* Tooltip Label */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Chat Resepsionis 24 Jam
      </span>

      <div className="relative">
        {/* Pulsing Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp Penginapan Annisa"
          className="relative w-12 h-12 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/35 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
        </a>

        {/* Dynamic Badge: Alternating between Pulse Status Dot & Close "X" Button */}
        {!showCloseBadge ? (
          <div className="absolute -top-1 -right-1 pointer-events-none">
            <span className="absolute inset-0 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="relative block w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDismissed(true);
            }}
            title="Tutup WhatsApp"
            aria-label="Tutup WhatsApp"
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-900 hover:bg-red-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all animate-in zoom-in-75 duration-200 cursor-pointer z-10"
          >
            <X className="w-2.5 h-2.5 stroke-[3]" />
          </button>
        )}
      </div>
    </aside>
  );
}
