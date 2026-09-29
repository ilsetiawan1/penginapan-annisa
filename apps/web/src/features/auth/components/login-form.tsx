"use client";

import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    await login({ email: email.trim(), password });
  };

  return (
    <div className="w-full max-w-[390px] bg-white/75 backdrop-blur-2xl border border-white/90 rounded-[32px] p-7 sm:p-9 shadow-[0_24px_64px_rgba(147,51,234,0.12)] transition-all">
      {/* Icon Badge Minimalist (Sesuai Referensi) */}
      <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-white flex items-center justify-center mx-auto text-slate-800 mb-4 shadow-purple-200/50">
        <LogIn className="w-6 h-6 text-slate-700" />
      </div>

      {/* Header Teks */}
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Sign in with email
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-[270px] mx-auto leading-relaxed">
          Sistem operasional dan manajemen kamar Penginapan Annisa.
        </p>
      </div>

      {/* Form Input: Hanya Email dan Password */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Input Email */}
        <div className="relative flex items-center">
          <Mail className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            id="internal-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-11 pr-4 py-3 bg-white/60 focus:bg-white/95 border border-white/80 focus:border-slate-400 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none transition-all shadow-2xs"
          />
        </div>

        {/* Input Password */}
        <div className="relative flex items-center">
          <Lock className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            id="internal-password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-11 pr-11 py-3 bg-white/60 focus:bg-white/95 border border-white/80 focus:border-slate-400 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none transition-all shadow-2xs"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Tombol Submit Minimalist Gelap */}
        <button
          type="submit"
          disabled={isLoading || !email.trim() || !password}
          className="w-full mt-4 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-slate-900/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Memverifikasi...</span>
            </>
          ) : (
            <span>Get Started</span>
          )}
        </button>

        {/* Quick Autofill Pills (Hanya Tampil di Mode Development / Localhost) */}
        {process.env.NODE_ENV !== "production" && (
          <div className="pt-2 flex items-center justify-center gap-1.5">
            <span className="text-[10px] text-slate-400 font-medium">Isi Cepat:</span>
            <button
              type="button"
              onClick={() => {
                setEmail("owner@penginapan-annisa.com");
                setPassword("owner123");
              }}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                email === "owner@penginapan-annisa.com"
                  ? "bg-purple-100 text-purple-900 border-purple-300 shadow-2xs"
                  : "bg-white/60 hover:bg-white text-slate-600 border-white/80"
              }`}
            >
              👑 Owner
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("staff@penginapan-annisa.com");
                setPassword("staff123");
              }}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                email === "staff@penginapan-annisa.com"
                  ? "bg-purple-100 text-purple-900 border-purple-300 shadow-2xs"
                  : "bg-white/60 hover:bg-white text-slate-600 border-white/80"
              }`}
            >
              🛎️ Staf
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
