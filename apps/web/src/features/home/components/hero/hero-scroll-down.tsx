"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroScrollDown() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Sembunyikan tombol scroll down ketika hero di-scroll melewati 40px
      if (window.scrollY > 40) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToRooms = () => {
    const target = document.getElementById("pilihan-kamar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleScrollToRooms}
        aria-label="Scroll ke Pilihan Kamar"
        className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-hidden"
      >
        {/* Lingkaran dengan Chevron Down beranimasi bounce lambat & halus */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300/80 bg-white/90 backdrop-blur-md shadow-xs group-hover:shadow-md group-hover:border-[#7a68b7]/50 flex items-center justify-center transition-all duration-300 animate-bounce-slow">
          <ChevronDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500 group-hover:text-[#7a68b7] transition-colors" />
        </div>

        {/* Label Teks Scroll Down */}
        <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-slate-500 group-hover:text-[#7a68b7] transition-colors select-none">
          Scroll Down
        </span>
      </button>
    </div>
  );
}
