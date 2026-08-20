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
    <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <header className="w-full max-w-5xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
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

        {/* Clean Center Navigation */}
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

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="rounded-full px-4 py-1.5 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-xs"
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
