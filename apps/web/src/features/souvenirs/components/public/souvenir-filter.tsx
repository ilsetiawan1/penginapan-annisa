"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SouvenirFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function SouvenirFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: SouvenirFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when tapping outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <section className="relative z-30 -mt-5 sm:-mt-6 w-full flex justify-center px-4">
      {/* DESKTOP VIEW: Sleek horizontal pill capsule */}
      <div className="hidden md:inline-flex bg-white/95 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-slate-200/90 items-center justify-center gap-1.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              aria-pressed={isActive}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#7a68b7] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#594791] hover:bg-[#ede8f8]/60"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* MOBILE VIEW: Ultra-clean, smooth dropdown menu without emoji/icon */}
      <div ref={dropdownRef} className="md:hidden relative w-full max-w-xs">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="w-full bg-white/95 backdrop-blur-md rounded-full py-2.5 px-4 shadow-lg border border-[#ddd3f3] flex items-center justify-between gap-2 text-xs font-bold text-slate-800 transition active:scale-[0.98] cursor-pointer"
        >
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-slate-500 font-medium">Kategori:</span>
            <span className="text-[#594791] font-extrabold truncate">{activeCategory}</span>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-[#7a68b7] shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown Options List */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl shadow-[#7a68b7]/15 border border-slate-200/90 py-1.5 px-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${
                      isActive
                        ? "bg-[#7a68b7] text-white shadow-xs"
                        : "text-slate-700 hover:text-[#594791] hover:bg-[#ede8f8]/70"
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
