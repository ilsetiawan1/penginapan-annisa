"use client";

import { Check, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
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
  roomNumber = "A1",
  roomPrice = 200000,
  roomTypeName = "Kamar Standar",
  onConfirm,
}: CheckInModalProps) {
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [nights, setNights] = useState<number>(1);
  const [dpPaid, setDpPaid] = useState<number>(() =>
    Math.round((roomPrice || 200000) * 0.5),
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "qris" | "transfer"
  >("cash");

  const safePrice = roomPrice || 200000;
  const totalAmount = safePrice * nights;
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
      <DialogContent className="max-w-4xl w-[94vw] max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-purple-100/90">
        {/* Header Modal Bersih & Modern */}
        <div className="flex items-start justify-between pb-3 border-b border-purple-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 border border-purple-200/80 text-[11px] font-extrabold text-purple-900">
                Check-In Walk-In
              </span>
              <span className="text-xs font-bold text-slate-500">
                Tarif:{" "}
                <span className="text-purple-700 font-extrabold">
                  Rp {safePrice.toLocaleString("id-ID")}
                </span>
                /malam
              </span>
            </div>
            <DialogTitle className="text-lg sm:text-xl font-serif font-black text-slate-900 tracking-tight leading-tight">
              Check-In Kamar #{roomNumber} ({roomTypeName})
            </DialogTitle>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Tamu langsung tiba di meja resepsionis Penginapan Annisa.
            </p>
          </div>
        </div>

        {/* Form Formulir Clean 2-Kolom Lebih Lebar & Kompak */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* ====================================================
                KOLOM KIRI: IDENTITAS TAMU & DURASI
                ==================================================== */}
            <div className="space-y-3">
              {/* Input Nama Tamu */}
              <div className="space-y-1">
                <label
                  htmlFor="checkin-guest-name"
                  className="text-xs font-bold text-slate-700 block whitespace-nowrap"
                >
                  Nama Lengkap Tamu{" "}
                  <span className="text-purple-700 font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-purple-700">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="checkin-guest-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#f8f7fc] border border-purple-150/90 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100/50 transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
              </div>

              {/* Input WhatsApp Tamu */}
              <div className="space-y-1">
                <label
                  htmlFor="checkin-guest-phone"
                  className="text-xs font-bold text-slate-700 block whitespace-nowrap"
                >
                  Nomor WhatsApp Tamu
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-purple-700">
                    <FaWhatsapp className="w-4 h-4" />
                  </div>
                  <input
                    id="checkin-guest-phone"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#f8f7fc] border border-purple-150/90 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100/50 transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
                <span className="text-[10px] text-slate-400 block pl-1">
                  Untuk pengiriman nota kuitansi digital via WhatsApp.
                </span>
              </div>

              {/* Durasi Menginap */}
              <div className="space-y-1">
                <label
                  htmlFor="checkin-nights"
                  className="text-xs font-bold text-slate-700 block whitespace-nowrap"
                >
                  Lama Menginap
                </label>
                <select
                  id="checkin-nights"
                  value={nights}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setNights(val);
                    setDpPaid(Math.round(safePrice * val * 0.5));
                  }}
                  className="w-full bg-[#f8f7fc] border border-purple-150/90 rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-purple-600 transition cursor-pointer"
                >
                  <option value={1}>1 Malam (Transit Standar)</option>
                  <option value={2}>2 Malam</option>
                  <option value={3}>3 Malam</option>
                  <option value={4}>4 Malam</option>
                  <option value={5}>5 Malam</option>
                </select>
              </div>
            </div>

            {/* ====================================================
                KOLOM KANAN: PEMBAYARAN, METODE & RINGKASAN
                ==================================================== */}
            <div className="space-y-3">
              {/* Uang Diterima / DP (Tanpa Text Wrap) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                  <label
                    htmlFor="checkin-dp"
                    className="text-xs font-bold text-slate-700 whitespace-nowrap shrink-0 block"
                  >
                    Uang Diterima / DP (Rp)
                  </label>
                  {/* Preset Pills */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setDpPaid(Math.round(totalAmount * 0.5))}
                      className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200/60 hover:bg-purple-100 cursor-pointer transition whitespace-nowrap"
                    >
                      DP 50%
                    </button>
                    <button
                      type="button"
                      onClick={() => setDpPaid(totalAmount)}
                      className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-700 text-white shadow-2xs hover:bg-purple-800 cursor-pointer transition whitespace-nowrap"
                    >
                      Lunas 100%
                    </button>
                    <button
                      type="button"
                      onClick={() => setDpPaid(0)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer transition whitespace-nowrap"
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
                  className="w-full bg-[#f8f7fc] border border-purple-150/90 rounded-2xl px-4 py-2 text-sm font-black text-purple-900 outline-none focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100/50 transition"
                />
              </div>

              {/* Metode Pembayaran Pill Switcher */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block whitespace-nowrap">
                  Metode Pembayaran
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f4f2f8] rounded-2xl border border-purple-100">
                  {(["cash", "qris", "transfer"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                        paymentMethod === m
                          ? "bg-purple-700 text-white shadow-2xs"
                          : "text-slate-600 hover:text-purple-900"
                      }`}
                    >
                      {m === "cash"
                        ? "Tunai"
                        : m === "qris"
                          ? "QRIS"
                          : "Transfer"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box Ringkasan Transaksi Tri-Color */}
              <div className="bg-[#faf9fd] border border-purple-100/90 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Total ({nights} Malam):
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {remainingAmount === 0
                      ? "Status Pelunasan:"
                      : "Sisa Bayar saat Out:"}
                  </span>
                  <strong
                    className={`text-xs sm:text-sm font-black ${
                      remainingAmount === 0
                        ? "text-purple-700"
                        : "text-amber-700"
                    }`}
                  >
                    {remainingAmount === 0
                      ? "Lunas 100% ✨"
                      : `Rp ${remainingAmount.toLocaleString("id-ID")}`}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Tombol Aksi */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-purple-50">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-purple-200/80 bg-white hover:bg-purple-50 text-slate-700 font-bold text-xs h-9 px-5 transition cursor-pointer"
            >
              Batal
            </button>
            <Button
              type="submit"
              className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-9 px-6 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Konfirmasi Check-In</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
