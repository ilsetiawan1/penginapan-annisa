import { InternalBackground } from "@/features/auth/components/internal-background";
import { LoginForm } from "@/features/auth/components/login-form";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Internal Portal — Penginapan Annisa",
  description: "Akses portal internal operasional Penginapan Annisa Pattimura Ambon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalLoginPage() {
  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Custom Ambient Background: Purple - Lavender - White Gradient */}
      <InternalBackground />

      {/* Top Branding Header */}
      <header className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/90 text-xs font-bold text-slate-800 shadow-sm shadow-purple-950/5 transition-all cursor-pointer"
          title="Kembali ke Website Tamu"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
          <span>Kembali</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[11px] font-semibold text-slate-700 shadow-2xs">
          <Image
            src="/logo-penginapan-annisa.png"
            alt="Logo"
            width={16}
            height={16}
            className="rounded-full object-cover"
          />
          <span>Penginapan Annisa • Internal</span>
        </div>
      </header>

      {/* Centered Glassmorphism Card */}
      <div className="relative z-10 my-auto">
        <LoginForm />
      </div>

      {/* Subtle Security Notice Footer */}
      <footer className="relative z-10 mt-auto pt-6 pb-4 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Akses khusus staf resepsionis dan pemilik Penginapan Annisa Ambon.
        </p>
      </footer>
    </main>
  );
}
