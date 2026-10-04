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
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor="adv-dp"
          className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
        >
          Nominal DP Ditransfer
        </label>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setDpPaid(Math.round(totalAmount * 0.5))}
            className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80 cursor-pointer transition-colors"
          >
            DP 50%
          </button>
          <button
            type="button"
            onClick={() => setDpPaid(totalAmount)}
            className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 cursor-pointer transition-colors"
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
                  ? "bg-slate-900 text-white shadow-2xs"
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
          className="rounded-xl h-9 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm h-9 px-5 gap-1.5 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
