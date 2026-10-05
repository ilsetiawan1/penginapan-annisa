"use client";

import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setErrorMessage(null);
    try {
      await login({ email: email.trim(), password });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Email atau kata sandi yang Anda masukkan salah.";
      setErrorMessage(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="w-full space-y-4">
      {/* Feedback Alert: Render kotak notifikasi hanya jika ada error autentikasi */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span className="leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {/* Field Email */}
      <div>
        <label
          htmlFor="internal-email"
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          Email
        </label>
        <input
          id="internal-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          placeholder="nama@email.com"
          className="h-11 px-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 transition-colors w-full text-slate-900 outline-none"
        />
      </div>

      {/* Field Password */}
      <div>
        <label
          htmlFor="internal-password"
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          Kata Sandi
        </label>
        <div className="relative w-full">
          <input
            id="internal-password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="••••••••"
            className="h-11 pl-3.5 pr-10 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 transition-colors w-full text-slate-900 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={isLoading || !email.trim() || !password}
        className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-xs mt-2 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Memverifikasi...</span>
          </>
        ) : (
          <span>Masuk Sistem</span>
        )}
      </button>
    </form>
  );
}
