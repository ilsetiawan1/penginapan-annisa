"use client";

import { Bed, BookOpen, Gift, Home, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/kamar", label: "Tipe Kamar", icon: Bed },
    { href: "/oleh-oleh", label: "Oleh-oleh", icon: Gift },
    { href: "/artikel", label: "Artikel", icon: BookOpen },
    { href: "/contact", label: "Kontak", icon: MapPin },
  ];

  return (
    <div className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-4 flex justify-center pointer-events-none">
      <header className="pointer-events-auto max-w-5xl w-full bg-white/75 backdrop-blur-2xl border border-white/80 shadow-xl shadow-purple-950/5 rounded-full px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-all">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs border border-white/80 bg-purple-50/80 backdrop-blur-md flex items-center justify-center transition group-hover:scale-105">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo Penginapan Annisa"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-base text-slate-950 leading-tight block tracking-tight group-hover:text-purple-700 transition">
              Penginapan Annisa
            </span>
            <span className="text-[9px] sm:text-[10px] text-purple-700 font-bold block leading-none mt-0.5">
              Transit 750m Bandara Pattimura
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Glass Capsule) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white/70 shadow-2xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-purple-950 hover:bg-white/90 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold shadow-purple-600/30 bg-purple-600 hover:bg-purple-700"
          >
            <a
              href="https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20ketersediaan%20kamar%20transit"
              target="_blank"
              rel="noreferrer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </Button>
        </div>
      </header>
    </div>
  );
}
