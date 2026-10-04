"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Banknote, Landmark, Loader2, QrCode } from "lucide-react";
import { useState } from "react";
import type { PaymentMethod } from "../../../hooks/use-pos-register";

interface PosCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  totalItems: number;
  isPending: boolean;
  onConfirm: (method: PaymentMethod, cashReceived?: number) => Promise<boolean>;
}

const METHODS: { id: PaymentMethod; label: string; icon: typeof Banknote }[] = [
  { id: "cash", label: "Tunai", icon: Banknote },
  { id: "transfer", label: "Transfer", icon: Landmark },
  { id: "qris", label: "QRIS", icon: QrCode },
];

export function PosCheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  totalItems,
  isPending,
  onConfirm,
}: PosCheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [cash, setCash] = useState("");

  const cashValue = Number(cash) || 0;
  const change = cashValue - totalAmount;
  const cashShort = method === "cash" && cashValue < totalAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await onConfirm(method, method === "cash" ? cashValue : undefined);
    if (ok) {
      setCash("");
      setMethod("cash");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-2xl p-5">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Pembayaran</DialogTitle>
          <DialogDescription className="text-xs">
            {totalItems} item · Stok terpotong otomatis setelah transaksi disimpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex items-baseline justify-between">
            <span className="text-xs text-slate-500">Total tagihan</span>
            <strong className="text-xl font-semibold text-slate-900 tabular-nums">
              Rp {totalAmount.toLocaleString("id-ID")}
            </strong>
          </div>

          <fieldset className="grid grid-cols-3 gap-2">
            <legend className="sr-only">Metode pembayaran</legend>
            {METHODS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                aria-pressed={method === id}
                className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  method === id
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200/80 text-slate-600 hover:border-slate-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </fieldset>

          {method === "cash" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="pos-cash" className="text-xs font-medium text-slate-700">
                  Uang diterima
                </label>
                <button
                  type="button"
                  onClick={() => setCash(String(totalAmount))}
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Uang pas
                </button>
              </div>
              <div className="relative flex items-center rounded-xl border border-slate-200/80 bg-white focus-within:border-slate-400 transition-colors overflow-hidden">
                <span className="pl-3.5 text-xs font-semibold text-slate-400 select-none">Rp</span>
                <input
                  id="pos-cash"
                  type="text"
                  inputMode="numeric"
                  value={cash ? Number(cash).toLocaleString("id-ID") : ""}
                  onChange={(e) => setCash(e.target.value.replace(/\D/g, ""))}
                  placeholder="0"
                  className="w-full h-10 pl-2 pr-3 bg-transparent text-sm font-semibold text-slate-900 tabular-nums outline-none"
                />
              </div>

              <div
                className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs tabular-nums transition-colors ${
                  cashShort
                    ? "bg-rose-50 text-rose-700 border-rose-200/70"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200/70"
                }`}
              >
                <span className="font-medium">
                  {cashShort ? "Kekurangan Bayar" : "Uang Kembalian"}
                </span>
                <strong className="text-sm font-semibold">
                  Rp {Math.abs(change).toLocaleString("id-ID")}
                </strong>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-xl border border-slate-200/80 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending || cashShort}
              className="flex-[2] h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Simpan Transaksi
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
