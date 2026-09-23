"use client";

import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { Lock, Mail, ShieldCheck, UserCheck, ArrowRight } from "lucide-react";

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("owner@penginapan-annisa.com");
  const [password, setPassword] = useState("owner123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await login({ email, password });
  };

  const setDemoCredentials = (role: "owner" | "staff") => {
    if (role === "owner") {
      setEmail("owner@penginapan-annisa.com");
      setPassword("owner123");
    } else {
      setEmail("staff@penginapan-annisa.com");
      setPassword("staff123");
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple-950/10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-purple-700 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-700/30 mb-4">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Login Staff & Owner PMS
        </h1>
        <p className="text-xs text-slate-500 mt-1.5">
          Sistem Manajemen Operasional 8 Kamar Penginapan Annisa
        </p>
      </div>

      {/* Quick Demo Credentials Switcher */}
      <div className="mb-6 p-3 bg-purple-50/80 border border-purple-100 rounded-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-700 mb-2 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5" />
          Pilih Akun Demo Cepat:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDemoCredentials("owner")}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
              email.includes("owner")
                ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                : "bg-white text-purple-900 border-purple-200 hover:bg-purple-100"
            }`}
          >
            👑 Owner (Pemilik)
          </button>
          <button
            type="button"
            onClick={() => setDemoCredentials("staff")}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
              email.includes("staff")
                ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                : "bg-white text-purple-900 border-purple-200 hover:bg-purple-100"
            }`}
          >
            🛎️ Staf Resepsionis
          </button>
        </div>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Alamat Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@penginapan-annisa.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Kata Sandi
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all bg-slate-50/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-purple-700/25 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? (
            "Memverifikasi Akses..."
          ) : (
            <>
              Masuk ke Dashboard PMS
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
