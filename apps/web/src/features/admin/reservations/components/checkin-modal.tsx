"use client";

import { Check, Phone, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

export interface CheckInFormData {
  roomNumber: string;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalAmount: number;
  dpPaid: number;
  remainingAmount: number;
  paymentMethod: "cash" | "qris" | "transfer";
}

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomNumber: string;
  roomPrice: number;
  roomTypeName: string;
  onConfirm: (data: CheckInFormData) => void;
}

export function CheckInModal({
  isOpen,
  onClose,
  roomNumber,
  roomPrice,
  roomTypeName,
  onConfirm,
}: CheckInModalProps) {
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [nights, setNights] = useState<number>(1);
  const [dpPaid, setDpPaid] = useState<number>(() => Math.round(roomPrice * 0.5));
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "transfer">("cash");

  const totalAmount = roomPrice * nights;
  const remainingAmount = Math.max(0, totalAmount - dpPaid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const today = new Date();
    const outDate = new Date(today);
    outDate.setDate(today.getDate() + nights);

    onConfirm({
      roomNumber,
      guestName,
      guestPhone: guestPhone || "0812-xxxx-xxxx",
      checkInDate: today.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      checkOutDate: outDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      totalNights: nights,
      totalAmount,
      dpPaid,
      remainingAmount,
      paymentMethod,
    });

    setGuestName("");
    setGuestPhone("");
    setNights(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200">
        {/* Header Ramping */}
        <DialogHeader className="text-left pb-1 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Check-In Tamu
              </span>
              <span className="text-xs font-bold text-slate-500">
                Tarif:{" "}
                <strong className="text-purple-700">
                  Rp {roomPrice.toLocaleString("id-ID")}/malam
                </strong>
              </span>
            </div>
            <DialogTitle className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              Check-In Kamar #{roomNumber} ({roomTypeName})
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Form 2 Kolom Landscape (Tetap Kelihatan Semua Saat Keyboard Tablet Terbuka) */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
            {/* ====================================================
                KOLOM KIRI: DATA IDENTITAS TAMU & DURASI
                ==================================================== */}
            <div className="space-y-2.5">
              {/* Input Nama Tamu */}
              <div className="space-y-0.5">
                <label
                  htmlFor="checkin-guest-name"
                  className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  Nama Lengkap Tamu *
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-3 py-1.5 transition-all">
                  <User className="w-4 h-4 text-purple-700 shrink-0" />
                  <input
                    id="checkin-guest-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Input Nomor WhatsApp */}
              <div className="space-y-0.5">
                <label
                  htmlFor="checkin-guest-phone"
                  className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  No. WhatsApp Tamu (Untuk Nota Digital)
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-3 py-1.5 transition-all">
                  <Phone className="w-4 h-4 text-purple-700 shrink-0" />
                  <input
                    id="checkin-guest-phone"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Durasi Menginap */}
              <div className="space-y-0.5">
                <label
                  htmlFor="checkin-nights"
                  className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  Lama Menginap
                </label>
                <select
                  id="checkin-nights"
                  value={nights}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setNights(val);
                    setDpPaid(Math.round(roomPrice * val * 0.5));
                  }}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
                >
                  <option value={1}>1 Malam (Transit)</option>
                  <option value={2}>2 Malam</option>
                  <option value={3}>3 Malam</option>
                  <option value={4}>4 Malam</option>
                  <option value={5}>5 Malam</option>
                </select>
              </div>
            </div>

            {/* ====================================================
                KOLOM KANAN: PEMBAYARAN, RINGKASAN & AKSI
                ==================================================== */}
            <div className="space-y-2.5">
              {/* Uang Diterima & Tombol Pintasan 1-Klik */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="checkin-dp"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Uang Diterima / DP (Rp)
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setDpPaid(Math.round(totalAmount * 0.5))}
                      className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
                    >
                      DP 50%
                    </button>
                    <button
                      type="button"
                      onClick={() => setDpPaid(totalAmount)}
                      className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                    >
                      Lunas 100%
                    </button>
                    <button
                      type="button"
                      onClick={() => setDpPaid(0)}
                      className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      Rp 0
                    </button>
                  </div>
                </div>
                <input
                  id="checkin-dp"
                  type="number"
                  value={dpPaid}
                  onChange={(e) => setDpPaid(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-3 py-1.5 text-xs font-black text-purple-700 outline-none"
                />
              </div>

              {/* Metode Pembayaran */}
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">
                  Metode Pembayaran
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["cash", "qris", "transfer"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`py-1.5 rounded-xl text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                        paymentMethod === m
                          ? "bg-purple-700 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {m === "cash" ? "💵 Tunai" : m === "qris" ? "📱 QRIS" : "🏦 Transfer"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kotak Ringkasan Tagihan */}
              <div className="bg-purple-50/90 border border-purple-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Total ({nights} Malam):
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {remainingAmount === 0 ? "Status Pelunasan:" : "Sisa Bayar saat Out:"}
                  </span>
                  <strong
                    className={`text-xs sm:text-sm font-black ${
                      remainingAmount === 0 ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {remainingAmount === 0
                      ? "LUNAS 100% ✨"
                      : `Rp ${remainingAmount.toLocaleString("id-ID")}`}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Tombol Aksi */}
          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-1 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-9 px-4 text-xs font-bold text-slate-600 cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-9 px-5 gap-1.5 shadow-md cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Konfirmasi Check-In</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
