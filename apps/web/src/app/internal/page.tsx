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
    <main className="min-h-screen w-full bg-slate-50/80 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8">
      {/* Top Header Bar */}
      <header className="self-start max-w-5xl w-full mx-auto mb-4">
        <Link
          href="/"
          className="text-xs text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Tamu</span>
        </Link>
      </header>

      {/* Main Bento Card (Floating Card Terpusat) */}
      <div className="w-full max-w-5xl bg-white border border-slate-200/80 rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 grid grid-cols-1 md:grid-cols-12 gap-4 my-auto items-stretch">
        {/* Sisi Kiri: Visual Showcase Banner (Broken White Theme) */}
        <div className="md:col-span-5 hidden md:flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-slate-200/70 relative overflow-hidden">
          {/* Atas */}
          <div className="relative z-10">
            <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-white rounded-full border border-slate-200 text-slate-700 shadow-2xs">
              PMS OPERASIONAL
            </span>
          </div>

          {/* Tengah: Preview Dashboard Image */}
          <div className="relative z-10 my-auto py-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="/images/auth/preview-dashboard.png"
                alt="PMS Dashboard Preview"
                width={800}
                height={550}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Bawah (Status Operasional Bersih) */}
          <div className="relative z-10 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Aktif • Wilayah Maluku (WIT)</span>
          </div>
        </div>

        {/* Sisi Kanan: Form Login */}
        <div className="md:col-span-7 flex flex-col justify-center px-6 sm:px-10 py-8">
          {/* Header Form */}
          <Image
            src="/images/branding/logo.png"
            alt="Logo Penginapan Annisa"
            width={44}
            height={44}
            priority
            className="rounded-xl mb-4 shadow-2xs"
          />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Masuk Portal</h1>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Gunakan kredensial resmi staf atau pemilik Penginapan Annisa.
          </p>

          <LoginForm />
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <footer className="text-center">
        <p className="text-[11px] text-slate-400 mt-4">
          © Penginapan Annisa Ambon • Hak Cipta Dilindungi
        </p>
      </footer>
    </main>
  );
}
