"use client";

import { Bed, BookOpen, Gift, Home, MapPin, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/kamar", label: "Tipe Kamar", icon: Bed },
    { href: "/oleh-oleh", label: "Oleh-oleh", icon: Gift },
    { href: "/artikel", label: "Artikel", icon: BookOpen },
    { href: "/contact", label: "Kontak", icon: MapPin },
  ];

  return (
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
      {/* Floating Capsule Header */}
      <header className="w-full max-w-5xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm rounded-full px-3 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo Penginapan Annisa"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight block leading-tight group-hover:text-purple-700 transition">
              Penginapan Annisa
            </span>
            <span className="text-[10px] text-purple-700 font-semibold block leading-none">
              750m Bandara Pattimura
            </span>
          </div>
        </Link>

        {/* Desktop Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white text-purple-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* WA Button: Icon Only on Mobile, Icon + Text on Desktop */}
          <Button
            asChild
            variant="primary"
            size="sm"
            className="rounded-full w-8 h-8 sm:w-auto sm:h-auto p-0 sm:px-4 sm:py-1.5 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-xs flex items-center justify-center shrink-0"
            title="Chat WhatsApp Resmi"
          >
            <a
              href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20ketersediaan%20kamar%20transit"
              target="_blank"
              rel="noreferrer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline sm:ml-1.5">WhatsApp</span>
            </a>
          </Button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center border border-slate-200 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-purple-700" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="w-full max-w-sm mt-2 p-3 bg-white/98 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-2xl pointer-events-auto transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-purple-50 text-purple-800 border border-purple-100"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-700" : "text-slate-500"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2.5 border-t border-slate-100 px-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Buka 07:00 – 21:00 WIT</span>
            <span className="text-purple-700 font-bold">750m Bandara</span>
          </div>
        </div>
      )}
    </div>
  );
}
