"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global critical error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-3xl p-8 shadow-xl flex flex-col items-center">
          <div className="w-16 h-16 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Gangguan Sistem Kritis
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Aplikasi mengalami kendala teknis tak terduga. Silakan muat ulang.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}
