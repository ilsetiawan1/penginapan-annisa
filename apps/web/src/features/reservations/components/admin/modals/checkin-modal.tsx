"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Banknote, Calendar, Check, Landmark, Phone, QrCode, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";

// ==========================================
// DATE HELPER UTILITIES
// ==========================================
function toIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDays(iso: string, days: number): string {
  const d = parseIsoDate(iso);
  d.setDate(d.getDate() + days);
  return toIsoDate(d);
}

function formatIdDate(isoOrDate: string | Date): string {
  if (!isoOrDate) return "";
  const d =
    typeof isoOrDate === "string"
      ? isoOrDate.includes("T")
        ? new Date(isoOrDate)
        : parseIsoDate(isoOrDate)
      : isoOrDate;
  if (Number.isNaN(d.getTime())) return String(isoOrDate);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ==========================================
// INTERFACES & PROPS
// ==========================================
export interface CheckInFormData {
  roomId?: string;
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
  roomId?: string;
  roomNumber: string;
  roomPrice: number;
  roomTypeName: string;
  onConfirm: (data: CheckInFormData) => void;
}

export function CheckInModal({
  isOpen,
  onClose,
  roomId,
  roomNumber = "A1",
  roomPrice = 200000,
  roomTypeName = "Kamar Standar",
  onConfirm,
}: CheckInModalProps) {
  const safePrice = roomPrice || 200000;
  const todayIso = toIsoDate(new Date());

  const [checkInDate, setCheckInDate] = useState<string>(todayIso);
  const [nights, setNights] = useState<number>(1);
  const [checkOutDate, setCheckOutDate] = useState<string>(() => addDays(todayIso, 1));
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "transfer">("cash");

  // Tamu walk-in di resepsionis WAJIB LUNAS (100%)
  const totalAmount = safePrice * nights;
  const dpPaid = totalAmount;
  const remainingAmount = 0;

  // Reset saat modal dibuka untuk kamar tertentu
  useEffect(() => {
    if (isOpen) {
      const nowIso = toIsoDate(new Date());
      setCheckInDate(nowIso);
      setNights(1);
      setCheckOutDate(addDays(nowIso, 1));
      setGuestName("");
      setGuestPhone("");
      setPaymentMethod("cash");
    }
  }, [isOpen]);

  const handleNightsChange = (val: number) => {
    setNights(val);
    setCheckOutDate(addDays(checkInDate, val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    onConfirm({
      roomId,
      roomNumber,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim() || "081200000000",
      checkInDate: formatIdDate(checkInDate),
      checkOutDate: formatIdDate(checkOutDate),
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
      <DialogContent className="max-w-4xl w-[96vw] max-h-[94vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-900">
        {/* Header Modal Bersih & Modern (Serasi dengan Modal Booking WA) */}
        <DialogHeader className="text-left pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Check-In Walk-In • Tamu di Resepsionis
              </span>
              <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
                • 750m dari Bandara Pattimura
              </span>
            </div>
            <DialogTitle className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
              Check-In Kamar #{roomNumber} • {roomTypeName}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-0.5">
              Tamu langsung tiba di meja resepsionis. Pembayaran wajib lunas 100% sebelum serah
              kunci.
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Form Formulir 2-Kolom Seimbang */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* ================================================
                KOLOM KIRI (5/12): JADWAL MENGINAP & RINCIAN TARIF
                ================================================ */}
            <div className="lg:col-span-5 bg-[#faf8fe] rounded-2xl p-3.5 sm:p-4 border border-purple-100/90 shadow-2xs space-y-3">
              {/* Info Unit Kamar & Tarif */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-purple-100/80">
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                    Unit Kamar Dipilih
                  </span>
                  <strong className="text-sm font-black text-purple-950 block">
                    Kamar #{roomNumber}
                  </strong>
                  <span className="text-[11px] text-slate-500 font-medium">{roomTypeName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                    Tarif Kamar
                  </span>
                  <span className="text-xs font-black text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md inline-block">
                    Rp {safePrice.toLocaleString("id-ID")}/malam
                  </span>
                </div>
              </div>

              {/* Tanggal Check-In & Check-Out */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label
                    htmlFor="checkin-date-in"
                    className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Tgl Check-In
                  </label>
                  <input
                    id="checkin-date-in"
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => {
                      setCheckInDate(e.target.value);
                      setCheckOutDate(addDays(e.target.value, nights));
                    }}
                    className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1.5 text-xs font-black text-slate-900 outline-none"
                  />
                  <span className="text-[9px] text-emerald-700 font-bold block">
                    ● Hari Ini (Tiba Langsung)
                  </span>
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="checkin-date-out"
                    className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Tgl Check-Out
                  </label>
                  <input
                    id="checkin-date-out"
                    type="date"
                    required
                    min={addDays(checkInDate, 1)}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1.5 text-xs font-black text-slate-900 outline-none"
                  />
                  <span className="text-[9px] text-slate-400 font-medium block">Pkl 12:00 WIT</span>
                </div>
              </div>

              {/* Selector Durasi Malam */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="checkin-dur"
                    className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Durasi Menginap
                  </label>
                  <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                    {nights} Malam
                  </span>
                </div>
                <select
                  id="checkin-dur"
                  value={nights}
                  onChange={(e) => handleNightsChange(Number(e.target.value))}
                  className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none cursor-pointer"
                >
                  <option value={1}>
                    1 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 1))})
                  </option>
                  <option value={2}>
                    2 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 2))})
                  </option>
                  <option value={3}>
                    3 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 3))})
                  </option>
                  <option value={4}>
                    4 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 4))})
                  </option>
                  <option value={5}>
                    5 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 5))})
                  </option>
                  <option value={7}>7 Malam (1 Minggu)</option>
                  <option value={14}>14 Malam (2 Minggu)</option>
                </select>
              </div>

              {/* Rangkuman Biaya & Waktu Check-In/Out */}
              <div className="bg-white p-2.5 rounded-xl border border-purple-200/90 text-xs shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-purple-950">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>
                      {formatIdDate(checkInDate)} – {formatIdDate(checkOutDate)}
                    </span>
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Wajib Lunas
                  </span>
                </div>

                <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
                      Total Tagihan • {nights} Malam
                    </span>
                    <strong className="text-sm font-black text-purple-950">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
                      Status Pelunasan
                    </span>
                    <strong className="text-sm font-black text-emerald-700">Lunas 100%</strong>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Check-in: Sekarang</span>
                  <span>•</span>
                  <span>Check-out: Pkl 12:00 WIT</span>
                </div>
              </div>
            </div>

            {/* ================================================
                KOLOM KANAN (7/12): IDENTITAS TAMU & PEMBAYARAN LUNAS
                ================================================ */}
            <div className="lg:col-span-7 space-y-3">
              {/* Data Tamu: Nama & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label
                    htmlFor="checkin-guest-name"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Nama Lengkap Tamu
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5">
                    <User className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <input
                      id="checkin-guest-name"
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="checkin-guest-phone"
                    className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
                  >
                    Nomor WhatsApp Tamu
                  </label>
                  <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 focus-within:border-purple-600 rounded-xl px-2.5 py-1.5">
                    <Phone className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <input
                      id="checkin-guest-phone"
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 pl-1">
                Nomor WhatsApp digunakan untuk pengiriman nota kuitansi digital otomatis.
              </p>

              {/* Pembayaran Walk-In: Wajib Lunas (Tanpa opsi DP) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">
                    Pembayaran Walk-In (Wajib Lunas)
                  </span>
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    ✓ Lunas 100% di Tempat
                  </span>
                </div>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                        Nominal Diterima
                      </span>
                      <strong className="text-base sm:text-lg font-black text-purple-950">
                        Rp {totalAmount.toLocaleString("id-ID")}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 font-medium block">
                        Sisa Tagihan:
                      </span>
                      <strong className="text-xs font-black text-emerald-700">Rp 0 (Lunas)</strong>
                    </div>
                  </div>

                  {/* Pilihan Metode Pembayaran */}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-black text-slate-600 block uppercase tracking-wider mb-1.5">
                      Pilih Metode Pembayaran:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["cash", "qris", "transfer"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`py-2 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            paymentMethod === m
                              ? "bg-purple-700 text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {m === "cash" && <Banknote className="w-3.5 h-3.5 shrink-0" />}
                          {m === "qris" && <QrCode className="w-3.5 h-3.5 shrink-0" />}
                          {m === "transfer" && <Landmark className="w-3.5 h-3.5 shrink-0" />}
                          <span>{m === "cash" ? "Tunai" : m === "qris" ? "QRIS" : "Transfer"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi (Batal & Konfirmasi Check-In) Naik Sejajar */}
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
                  disabled={!guestName.trim()}
                  className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-9 px-5 gap-1.5 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  <span>Konfirmasi Check-In & Serahkan Kunci</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
