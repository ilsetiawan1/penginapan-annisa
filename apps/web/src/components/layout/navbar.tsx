"use client";

import { useSettings } from "@/features/settings/hooks/use-settings";
import { Bed, BookOpen, Gift, Home, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { data: settings } = useSettings();
  const lodgingName = settings?.lodging_name || "Penginapan Annisa";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/rooms", label: "Tipe Kamar", icon: Bed },
    { href: "/souvenirs", label: "Oleh-oleh", icon: Gift },
    { href: "/articles", label: "Artikel", icon: BookOpen },
    { href: "/contact", label: "Kontak", icon: MapPin },
  ];

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
      {/* Floating Capsule Header */}
      <header className="w-full max-w-5xl rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300 bg-[#fdfcfe]/90 backdrop-blur-md border border-[#e9e8ea] shadow-[0px_4px_20px_rgba(226,223,254,0.4)]">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#e9e8ea] bg-[#f4f2f4] flex items-center justify-center shrink-0 shadow-2xs">
            <Image
              src="/images/branding/logo.png"
              alt={`Logo ${lodgingName}`}
              fill
              sizes="32px"
              className="object-contain p-0.5"
              priority
            />
          </div>
          <span className="font-sans font-medium text-base sm:text-lg text-[#1c1c1c] tracking-tight transition group-hover:text-[#3c315b] whitespace-nowrap leading-none">
            {lodgingName}
          </span>
        </Link>

        {/* Desktop Center Navigation (Tampil pada Desktop lg: 1024px+) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-[#e9e8ea] bg-[#f4f2f4]/60 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "bg-[#f4f2f4] text-[#3c315b] font-medium rounded-full px-3.5 py-1.5 text-xs tracking-tight shadow-xs transition-colors"
                    : "text-xs font-normal text-[#1c1c1c] tracking-tight hover:text-[#3c315b] transition-colors px-3.5 py-1.5 rounded-full"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Booking CTA Button (Hidden on Mobile) */}
          <Link
            href="/rooms"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-[#3c315b] hover:bg-[#2d2445] text-[#fdfcfe] font-light text-xs tracking-wide rounded-full px-5 py-2.5 shadow-[0px_0px_14px_rgba(226,223,254,0.85)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title="Pilih dan Pesan Kamar Transit"
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Pesan Kamar</span>
          </Link>

          {/* Hamburger Menu Toggle (Mobile & Tablet Portrait < 1024px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border border-[#e9e8ea] bg-[#f4f2f4] hover:bg-[#e9e8ea] text-[#3c315b] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#3c315b]" />
            ) : (
              <Menu className="w-4 h-4 text-[#3c315b]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Dropdown Navigation Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            role="presentation"
            onClick={() => setIsMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsMobileMenuOpen(false);
            }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[-1] pointer-events-auto animate-in fade-in duration-200"
          />

          {/* Drawer Card (Width disamakan persis max-w-5xl dengan navbar) */}
          <div className="w-full max-w-5xl mt-2 rounded-3xl bg-[#fdfcfe] border border-[#e9e8ea] shadow-xl p-4 sm:p-5 pointer-events-auto transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            <div className="space-y-1.5 sm:space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 sm:py-3 transition-colors text-xs ${
                      isActive
                        ? "bg-[#f4f2f4] text-[#3c315b] font-medium rounded-2xl"
                        : "text-[#1c1c1c] hover:bg-[#f4f2f4]/60 rounded-2xl transition-colors font-normal"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isActive ? "text-[#3c315b]" : "text-[#86848d]"
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#e9e8ea] px-2 flex items-center justify-between text-[11px] text-[#86848d]">
              <span>Buka 06:00 – 22:00 WIT</span>
              <span>750m Bandara</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
