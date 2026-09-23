import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Login PMS — Penginapan Annisa",
  description: "Masuk ke Property Management System (PMS) Penginapan Annisa Ambon.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#f3f2f7] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Website Tamu
        </Link>
        <span className="text-[11px] font-medium text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
          PMS v1.0 • 8 Kamar
        </span>
      </div>

      {/* Login Card Component */}
      <LoginForm />

      {/* Security notice footer */}
      <p className="mt-8 text-[11px] text-slate-400 text-center">
        Akses khusus staf resepsionis dan pemilik Penginapan Annisa Pattimura Ambon.
      </p>
    </main>
  );
}
