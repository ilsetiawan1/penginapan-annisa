"use client";

import { Button } from "@/components/ui/button";
import { Banknote, Check, Landmark, QrCode } from "lucide-react";

interface AdvanceBookingPaymentSectionProps {
  dpPaid: number;
  setDpPaid: (val: number) => void;
  totalAmount: number;
  paymentMethod: "transfer" | "qris" | "cash";
  setPaymentMethod: (m: "transfer" | "qris" | "cash") => void;
  isPending: boolean;
  isSubmitDisabled: boolean;
  onClose: () => void;
}

export function AdvanceBookingPaymentSection({
  dpPaid,
  setDpPaid,
  totalAmount,
  paymentMethod,
  setPaymentMethod,
  isPending,
  isSubmitDisabled,
  onClose,
}: AdvanceBookingPaymentSectionProps) {
  const isLunas = totalAmount > 0 && dpPaid >= totalAmount;
  const isDp = !isLunas;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor="adv-dp" className="text-xs font-semibold text-slate-800 block">
          Nominal DP Ditransfer
        </label>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setDpPaid(Math.round(totalAmount * 0.5))}
            className={`text-[10px] px-2.5 py-0.5 rounded-lg border cursor-pointer transition-colors ${
              isDp
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200/80 font-medium"
            }`}
          >
            DP 50%
          </button>
          <button
            type="button"
            onClick={() => setDpPaid(totalAmount)}
            className={`text-[10px] px-2.5 py-0.5 rounded-lg border cursor-pointer transition-colors ${
              isLunas
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold shadow-2xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200/80 font-medium"
            }`}
          >
            Lunas 100%
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
        <input
          id="adv-dp"
          type="number"
          value={dpPaid}
          onChange={(e) => setDpPaid(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none transition"
        />

        {/* Pilihan Metode DP */}
        <div className="grid grid-cols-3 gap-1">
          {(["transfer", "qris", "cash"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPaymentMethod(m)}
              className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1 ${
                paymentMethod === m
                  ? "bg-[#3c315b] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {m === "transfer" && <Landmark className="w-3 h-3 shrink-0" />}
              {m === "qris" && <QrCode className="w-3 h-3 shrink-0" />}
              {m === "cash" && <Banknote className="w-3 h-3 shrink-0" />}
              <span>{m === "transfer" ? "Transfer" : m === "qris" ? "QRIS" : "Tunai"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tombol Aksi (Batal & Simpan Jadwal) */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 h-11 px-5 text-sm font-medium cursor-pointer"
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="bg-[#3c315b] hover:bg-[#2d2445] text-white font-medium rounded-full h-11 px-6 text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Menyimpan ke DB...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Simpan Reservasi</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
