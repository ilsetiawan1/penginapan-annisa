"use client";

import { Bed, BookOpen, Gift, Home, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../ui/button";

export function Navbar() {
  const pathname = usePathname();
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
    { href: "/kamar", label: "Tipe Kamar", icon: Bed },
    { href: "/oleh-oleh", label: "Oleh-oleh", icon: Gift },
    { href: "/artikel", label: "Artikel", icon: BookOpen },
    { href: "/contact", label: "Kontak", icon: MapPin },
  ];

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
      {/* Floating Capsule Header: Transparent Putih Blur (Top) -> Transparent Black Blur (Scrolled) */}
      <header
        className={`w-full max-w-5xl rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/20 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/25 text-white"
            : "bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg text-white"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-2xs">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo Penginapan Annisa"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight block leading-tight group-hover:text-purple-200 transition whitespace-nowrap">
              Penginapan Annisa
            </span>
            <span className="text-[10px] text-purple-200 font-semibold block leading-none whitespace-nowrap">
              750m Bandara Pattimura
            </span>
          </div>
        </Link>

        {/* Desktop Center Navigation (Tampil pada Desktop lg: 1024px+ agar tidak sesak di Tablet Portrait) */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-full border backdrop-blur-md transition-colors ${
            isScrolled
              ? "bg-white/10 border-white/15"
              : "bg-white/15 border-white/20"
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
                    ? isScrolled
                      ? "bg-purple-700 text-white shadow-xs"
                      : "bg-white text-purple-950 shadow-xs"
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
          {/* Booking CTA Button (Hidden on Mobile) */}
          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex rounded-full w-auto h-8 sm:h-9 px-3.5 sm:px-4 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-xs items-center justify-center shrink-0 transition"
            title="Pilih dan Pesan Kamar Transit"
          >
            <Link href="/kamar">
              <Bed className="w-3.5 h-3.5 mr-1.5" />
              <span>Pesan Kamar</span>
            </Link>
          </Button>

          {/* Hamburger Menu Toggle (Tampil di Mobile & Tablet Portrait < 1024px) */}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/30 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Dropdown Navigation Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[-1] pointer-events-auto animate-in fade-in duration-200"
          />

          {/* Frosted Transparent Modal Drawer Card */}
          <div className="w-full max-w-sm sm:max-w-md mt-2 p-3.5 sm:p-4 bg-slate-950/25 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl sm:rounded-3xl pointer-events-auto transition-all animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-white">
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
                        ? "bg-purple-700 text-white shadow-xs"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-white" : "text-purple-300"}`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/15 px-2 flex items-center justify-between text-[11px] sm:text-xs text-slate-200 font-semibold">
              <span>Buka 06:00 – 22:00 WIT</span>
              <span className="text-purple-300 font-extrabold">
                750m Bandara
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
