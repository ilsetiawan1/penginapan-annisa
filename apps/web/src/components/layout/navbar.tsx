"use client";

import { useSettings } from "@/features/settings/hooks/use-settings";
import { Bed, BookOpen, Gift, Home, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { data: settings } = useSettings();
  const lodgingName = settings?.lodging_name || "Penginapan Annisa";
  const airportDistance = settings?.airport_distance || "750m Bandara Pattimura";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/rooms", label: "Tipe Kamar", icon: Bed },
    { href: "/souvenirs", label: "Oleh-oleh", icon: Gift },
    { href: "/articles", label: "Artikel", icon: BookOpen },
    { href: "/contact", label: "Kontak", icon: MapPin },
  ];

  const isLightPage =
    (pathname.startsWith("/articles/") && pathname !== "/articles") || pathname === "/";
  const isLightMode = isLightPage || isScrolled;

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
      {/* Floating Capsule Header: Top Hero Glass -> Frosted Pearl Glass on scroll / light pages */}
      <header
        className={`w-full max-w-5xl rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          isLightMode
            ? "bg-white/90 backdrop-blur-xl border border-[#e2dcf2]/90 shadow-xl shadow-[#7a68b7]/10 text-slate-800"
            : "bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg text-white"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
        >
          <div
            className={`relative w-8 h-8 rounded-full overflow-hidden border flex items-center justify-center shrink-0 shadow-2xs ${
              isLightMode ? "bg-[#f4f1fa] border-[#e2dcf2]" : "bg-white/20 border-white/30"
            }`}
          >
            <Image
              src="/logo-penginapan-annisa.png"
              alt={`Logo ${lodgingName}`}
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span
              className={`font-extrabold text-xs sm:text-sm tracking-tight block leading-tight transition whitespace-nowrap ${
                isLightMode
                  ? "text-slate-900 group-hover:text-[#594791]"
                  : "text-white group-hover:text-stone-200"
              }`}
            >
              {lodgingName}
            </span>
            <span
              className={`text-[10px] font-semibold block leading-none whitespace-nowrap ${
                isLightMode ? "text-[#7a68b7]" : "text-stone-300"
              }`}
            >
              {airportDistance}
            </span>
          </div>
        </Link>

        {/* Desktop Center Navigation (Tampil pada Desktop lg: 1024px+ agar tidak sesak di Tablet Portrait) */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-full border backdrop-blur-md transition-colors ${
            isLightMode ? "bg-[#ede8f8]/60 border-[#ddd3f3]/80" : "bg-white/15 border-white/20"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? isLightMode
                      ? "bg-white text-[#594791] shadow-xs border border-[#ddd3f3]"
                      : "bg-white text-stone-950 shadow-xs"
                    : isLightMode
                      ? "text-slate-600 hover:text-[#594791] hover:bg-white/80"
                      : "text-white/90 hover:text-white hover:bg-white/20"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Booking CTA Button (Hidden on Mobile) — Soothing Lavender Combination */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex rounded-full w-auto h-8 sm:h-9 px-3.5 sm:px-4 text-xs font-bold items-center justify-center shrink-0 transition-all bg-[#7a68b7] hover:bg-[#6c59aa] text-white shadow-md shadow-[#7a68b7]/20 border border-[#6c59aa]/40 cursor-pointer active:scale-95"
            title="Pilih dan Pesan Kamar Transit"
          >
            <Link href="/rooms">
              <Bed className="w-3.5 h-3.5 mr-1.5" />
              <span>Pesan Kamar</span>
            </Link>
          </Button>

          {/* Hamburger Menu Toggle (Tampil di Mobile & Tablet Portrait < 1024px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
              isLightMode
                ? "bg-[#ede8f8] hover:bg-[#ddd3f3] text-[#594791] border-[#ddd3f3]"
                : "bg-white/20 hover:bg-white/30 text-white border-white/30"
            }`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-4 h-4 ${isLightMode ? "text-[#594791]" : "text-white"}`} />
            ) : (
              <Menu className={`w-4 h-4 ${isLightMode ? "text-[#594791]" : "text-white"}`} />
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

          {/* Frosted Modal Drawer Card */}
          <div
            className={`w-full max-w-sm sm:max-w-md mt-2 p-3.5 sm:p-4 backdrop-blur-xl border shadow-2xl rounded-2xl sm:rounded-3xl pointer-events-auto transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-50 ${
              isLightMode
                ? "bg-white/95 border-[#e2dcf2] text-slate-800 shadow-xl shadow-[#7a68b7]/15"
                : "bg-slate-950/85 border-white/20 text-white"
            }`}
          >
            <div className="space-y-1.5 sm:space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#7a68b7] text-white shadow-xs"
                        : isLightMode
                          ? "bg-white text-slate-700 hover:bg-[#f4f1fa] hover:text-[#594791] border border-[#e2dcf2]/80"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isActive ? "text-white" : isLightMode ? "text-[#7a68b7]" : "text-stone-300"
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div
              className={`mt-3 pt-2.5 border-t px-2 flex items-center justify-between text-[11px] sm:text-xs font-semibold ${
                isLightMode ? "border-[#e2dcf2] text-slate-600" : "border-white/15 text-slate-200"
              }`}
            >
              <span>Buka 06:00 – 22:00 WIT</span>
              <span
                className={
                  isLightMode ? "text-[#7a68b7] font-extrabold" : "text-stone-300 font-extrabold"
                }
              >
                750m Bandara
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
