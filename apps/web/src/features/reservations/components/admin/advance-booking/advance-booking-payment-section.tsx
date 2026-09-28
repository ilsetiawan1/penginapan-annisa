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
            className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
          >
            DP 50%
          </button>
          <button
            type="button"
            onClick={() => setDpPaid(totalAmount)}
            className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
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
          className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-2.5 py-1.5 text-xs font-black text-purple-800 outline-none"
        />

        {/* Pilihan Metode DP */}
        <div className="grid grid-cols-3 gap-1">
          {(["transfer", "qris", "cash"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPaymentMethod(m)}
              className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex items-center justify-center gap-1 ${
                paymentMethod === m
                  ? "bg-purple-700 text-white shadow-2xs"
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

      {/* Tombol Aksi (Batal & Simpan Jadwal) Naik Rapi Sejajar */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-xl h-9 px-4 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-9 px-5 gap-1.5 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Menyimpan ke DB...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Simpan Jadwal Booking WA</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
