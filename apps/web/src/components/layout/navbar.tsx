"use client";

import { Bed, BookOpen, Gift, Home, LayoutDashboard, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/#kamar", label: "Tipe Kamar", icon: Bed },
    { href: "/#oleh-oleh", label: "Oleh-oleh", icon: Gift },
    { href: "/#artikel", label: "Artikel", icon: BookOpen },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <header className="pointer-events-auto max-w-5xl w-full bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-900/5 rounded-full px-4 sm:px-6 h-16 flex items-center justify-between transition-all">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs border border-brand-100 bg-brand-50 flex items-center justify-center transition group-hover:scale-105">
            <Image
              src="/logo-penginapan-annisa.png"
              alt="Logo Penginapan Annisa"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight block tracking-tight group-hover:text-brand-700 transition">
              Penginapan Annisa
            </span>
            <span className="text-[10px] text-brand-600 font-semibold block leading-none">
              Transit 750m Bandara Pattimura
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-brand-700 hover:bg-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-slate-600" />
            <span>Portal Staf</span>
          </Link>

          <Button
            asChild
            variant="primary"
            size="sm"
            className="rounded-full px-4 text-xs font-semibold shadow-brand-600/25"
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
