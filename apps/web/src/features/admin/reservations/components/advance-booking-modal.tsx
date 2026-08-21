"use client";

import { Calendar, Check, Phone, Plus, User } from "lucide-react";
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

export interface AdvanceBookingData {
  id: string;
  roomCode: string; // "A1" - "B4"
  roomTypeName: string;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  totalAmount: number;
  dpPaid: number;
  remainingAmount: number;
  paymentMethod: "transfer" | "qris" | "cash";
  notes?: string;
  status: "confirmed" | "checked_in" | "cancelled";
}

interface AdvanceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AdvanceBookingData) => void;
}

const ROOM_OPTIONS = [
  { code: "A1", building: "A", name: "Kamar #A1 (Bangunan A - Tipe AC)", price: 275000 },
  { code: "A2", building: "A", name: "Kamar #A2 (Bangunan A - Tipe AC)", price: 275000 },
  { code: "A3", building: "A", name: "Kamar #A3 (Bangunan A - Tipe Kipas)", price: 200000 },
  { code: "A4", building: "A", name: "Kamar #A4 (Bangunan A - Tipe Kipas)", price: 200000 },
  { code: "B1", building: "B", name: "Kamar #B1 (Bangunan B - Tipe AC)", price: 275000 },
  { code: "B2", building: "B", name: "Kamar #B2 (Bangunan B - Tipe AC)", price: 275000 },
  { code: "B3", building: "B", name: "Kamar #B3 (Bangunan B - Tipe Kipas)", price: 200000 },
  { code: "B4", building: "B", name: "Kamar #B4 (Bangunan B - Tipe Kipas)", price: 200000 },
];

export function AdvanceBookingModal({ isOpen, onClose, onConfirm }: AdvanceBookingModalProps) {
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>("A1");
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    // Default 7 hari ke depan
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [nights, setNights] = useState<number>(1);

  const selectedRoom = ROOM_OPTIONS.find((r) => r.code === selectedRoomCode) || ROOM_OPTIONS[0];
  const totalAmount = selectedRoom.price * nights;
  const [dpPaid, setDpPaid] = useState<number>(() => Math.round(selectedRoom.price * 0.5));
  const remainingAmount = Math.max(0, totalAmount - dpPaid);
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "qris" | "cash">("transfer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const inDateObj = new Date(checkInDate);
    const outDateObj = new Date(inDateObj);
    outDateObj.setDate(inDateObj.getDate() + nights);

    const formattedIn = inDateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedOut = outDateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    onConfirm({
      id: `BK-${Date.now().toString().slice(-4)}`,
      roomCode: selectedRoom.code,
      roomTypeName:
        selectedRoom.code.startsWith("A1") ||
        selectedRoom.code.startsWith("A2") ||
        selectedRoom.code.startsWith("B1") ||
        selectedRoom.code.startsWith("B2")
          ? "Tipe AC"
          : "Tipe Kipas",
      guestName,
      guestPhone,
      checkInDate: formattedIn,
      checkOutDate: formattedOut,
      nights,
      totalAmount,
      dpPaid,
      remainingAmount,
      paymentMethod,
      status: "confirmed",
    });

    setGuestName("");
    setGuestPhone("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200">
        <DialogHeader className="text-left pb-1 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Booking Mendatang (Advance Booking)
            </span>
            <DialogTitle className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              Catat Reservasi WhatsApp (Jadwal Masa Depan)
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* 2 Kolom Landscape */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
            {/* ====================================================
                KOLOM KIRI: PILIH KAMAR & JADWAL TANGGAL
                ==================================================== */}
            <div className="space-y-2.5">
              {/* Pilihan Kamar */}
              <div className="space-y-0.5">
                <label
                  htmlFor="adv-room"
                  className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  Pilih Unit Kamar yang Dipesan *
                </label>
                <select
                  id="adv-room"
                  value={selectedRoomCode}
                  onChange={(e) => {
                    setSelectedRoomCode(e.target.value);
                    const room = ROOM_OPTIONS.find((r) => r.code === e.target.value);
                    if (room) setDpPaid(Math.round(room.price * nights * 0.5));
                  }}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
                >
                  {ROOM_OPTIONS.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name} — Rp {r.price.toLocaleString("id-ID")}/malam
                    </option>
                  ))}
                </select>
              </div>

              {/* Tanggal Check-In di Masa Depan & Durasi */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label
                    htmlFor="adv-date"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Tgl Check-In Tamu *
                  </label>
                  <input
                    id="adv-date"
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="adv-nights"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Lama Menginap
                  </label>
                  <select
                    id="adv-nights"
                    value={nights}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setNights(val);
                      setDpPaid(Math.round(selectedRoom.price * val * 0.5));
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

              {/* Nama Tamu */}
              <div className="space-y-0.5">
                <label
                  htmlFor="adv-name"
                  className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  Nama Lengkap Pemesan *
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-3 py-1.5">
                  <User className="w-4 h-4 text-purple-700 shrink-0" />
                  <input
                    id="adv-name"
                    type="text"
                    required
                    placeholder="Contoh: Pak Hendra Pratama"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* ====================================================
                KOLOM KANAN: WHATSAPP, DP MASUK & METODE TRANSFER
                ==================================================== */}
            <div className="space-y-2.5">
              {/* WhatsApp Tamu */}
              <div className="space-y-0.5">
                <label
                  htmlFor="adv-phone"
                  className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                >
                  No. WhatsApp Tamu *
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-3 py-1.5">
                  <Phone className="w-4 h-4 text-purple-700 shrink-0" />
                  <input
                    id="adv-phone"
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* DP Ditransfer & Pintasan */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="adv-dp"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Nominal DP Ditransfer (Rp)
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
                  </div>
                </div>
                <input
                  id="adv-dp"
                  type="number"
                  value={dpPaid}
                  onChange={(e) => setDpPaid(Number(e.target.value))}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-purple-600 rounded-xl px-3 py-1.5 text-xs font-black text-purple-700 outline-none"
                />
              </div>

              {/* Metode Pembayaran DP */}
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">
                  Metode DP Diterima
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["transfer", "qris", "cash"] as const).map((m) => (
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
                      {m === "transfer" ? "🏦 Transfer" : m === "qris" ? "📱 QRIS" : "💵 Tunai"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rincian Ringkas */}
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
                    Sisa Pelunasan di Lokasi:
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-amber-700">
                    Rp {remainingAmount.toLocaleString("id-ID")}
                  </strong>
                </div>
              </div>
            </div>
          </div>

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
              <span>Simpan Jadwal Booking WA</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
