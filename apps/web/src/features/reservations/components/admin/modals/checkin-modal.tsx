"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReservations } from "@/features/reservations/hooks/use-reservations";
import { formatPhoneWithSpaces } from "@/lib/whatsapp";
import { whatsAppPhoneSchema } from "@annisa/types";
import { AlertCircle, Banknote, Check, Landmark, Phone, QrCode, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ==========================================
// DATE HELPER UTILITIES (WIT / Asia/Jayapura)
// ==========================================
function getTodayWitIso(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jayapura",
  }).format(new Date());
}

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

function calcNights(inIso: string, outIso: string): number {
  const inD = parseIsoDate(inIso);
  const outD = parseIsoDate(outIso);
  const diffTime = outD.getTime() - inD.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

function toDateIso(val: string | Date): string {
  if (!val) return "";
  const d = typeof val === "string" ? new Date(val) : val;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(d);
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
    timeZone: "Asia/Jayapura",
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
  const todayIso = getTodayWitIso();

  const { data: reservationsResponse } = useReservations();

  // Ambil semua reservasi aktif untuk unit kamar ini
  const activeRoomReservations = useMemo(() => {
    const items = reservationsResponse?.items;
    if (!items || !Array.isArray(items)) return [];

    return items
      .filter((r) => {
        const matchRoom =
          (roomId && r.roomId === roomId) ||
          (r.room?.roomNumber && r.room.roomNumber.toUpperCase() === roomNumber.toUpperCase());
        const isActive = r.status !== "cancelled" && r.status !== "checked_out";
        return matchRoom && isActive;
      })
      .map((r) => ({
        id: r.id,
        code: r.code,
        guestName: r.guest?.name || "Tamu",
        checkInIso: toDateIso(r.checkInDate),
        checkOutIso: toDateIso(r.checkOutDate),
      }))
      .filter((r) => Boolean(r.checkInIso && r.checkOutIso))
      .sort((a, b) => a.checkInIso.localeCompare(b.checkInIso));
  }, [reservationsResponse?.items, roomId, roomNumber]);

  const [checkInDate, setCheckInDate] = useState<string>(todayIso);
  const [checkOutDate, setCheckOutDate] = useState<string>(() => addDays(todayIso, 1));
  const [nights, setNights] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "transfer">("cash");

  // Cari reservasi terdekat berikutnya dari tanggal check-in
  const nextUpcomingReservation = useMemo(() => {
    return activeRoomReservations.find((r) => r.checkInIso >= checkInDate) || null;
  }, [activeRoomReservations, checkInDate]);

  const maxCheckOutDate = nextUpcomingReservation ? nextUpcomingReservation.checkInIso : undefined;

  // Cek apakah rentang tanggal yang dipilih bertabrakan / beririsan dengan jadwal booking
  const hasCollision = useMemo(() => {
    if (!checkInDate || !checkOutDate) return false;
    if (maxCheckOutDate && checkOutDate > maxCheckOutDate) return true;
    return activeRoomReservations.some((r) => {
      return checkInDate < r.checkOutIso && checkOutDate > r.checkInIso;
    });
  }, [checkInDate, checkOutDate, maxCheckOutDate, activeRoomReservations]);

  // Tamu walk-in di resepsionis WAJIB LUNAS (100%)
  const totalAmount = safePrice * nights;
  const dpPaid = totalAmount;
  const remainingAmount = 0;

  // Reset saat modal dibuka untuk kamar tertentu
  useEffect(() => {
    if (isOpen) {
      const nowIso = getTodayWitIso();
      setCheckInDate(nowIso);

      const upcoming = activeRoomReservations.find((r) => r.checkInIso >= nowIso);
      const defaultNext = addDays(nowIso, 1);
      if (upcoming && defaultNext > upcoming.checkInIso) {
        setCheckOutDate(upcoming.checkInIso);
        setNights(calcNights(nowIso, upcoming.checkInIso));
      } else {
        setCheckOutDate(defaultNext);
        setNights(1);
      }
      setGuestName("");
      setGuestPhone("");
      setPhoneError(null);
      setPaymentMethod("cash");
    }
  }, [isOpen, activeRoomReservations]);

  const handleCheckInDateChange = (newIn: string) => {
    const clampedIn = newIn < todayIso ? todayIso : newIn;
    setCheckInDate(clampedIn);

    const upcoming = activeRoomReservations.find((r) => r.checkInIso >= clampedIn);
    let nextOut = checkOutDate;
    if (nextOut <= clampedIn) {
      nextOut = addDays(clampedIn, 1);
    }
    if (upcoming && nextOut > upcoming.checkInIso) {
      nextOut = upcoming.checkInIso;
    }
    setCheckOutDate(nextOut);
    setNights(calcNights(clampedIn, nextOut));
  };

  const handleCheckOutDateChange = (newOut: string) => {
    const minOut = addDays(checkInDate, 1);
    let validOut = newOut < minOut ? minOut : newOut;
    if (maxCheckOutDate && validOut > maxCheckOutDate) {
      validOut = maxCheckOutDate;
    }
    setCheckOutDate(validOut);
    setNights(calcNights(checkInDate, validOut));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || hasCollision) return;

    const cleanPhone = guestPhone.replace(/\D/g, "");
    if (cleanPhone) {
      const phoneValidation = whatsAppPhoneSchema.safeParse(cleanPhone);
      if (!phoneValidation.success) {
        setPhoneError(
          phoneValidation.error.issues[0]?.message ||
            "Nomor WhatsApp hanya boleh berisi angka (9–15 digit)",
        );
        return;
      }
    }

    onConfirm({
      roomId,
      roomNumber,
      guestName: guestName.trim(),
      guestPhone: cleanPhone || "081200000000",
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
    setPhoneError(null);
    setNights(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[95vw] bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 text-slate-900">
        {/* Header Modal Clean Minimalist */}
        <DialogHeader className="text-left pb-3 border-b border-slate-100">
          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Check-In Kamar #{roomNumber}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {roomTypeName} • Isi data tamu dan konfirmasi pembayaran
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Section Jadwal & Tarif (1 Card Ringkas) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="checkin-date-in"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Tgl Check-In
                </label>
                <input
                  id="checkin-date-in"
                  type="date"
                  required
                  min={todayIso}
                  value={checkInDate}
                  onChange={(e) => handleCheckInDateChange(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#3c315b] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="checkin-date-out"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Tgl Check-Out
                </label>
                <input
                  id="checkin-date-out"
                  type="date"
                  required
                  min={addDays(checkInDate, 1)}
                  max={maxCheckOutDate}
                  value={checkOutDate}
                  onChange={(e) => handleCheckOutDateChange(e.target.value)}
                  className={`w-full bg-white border ${
                    hasCollision ? "border-rose-300 ring-1 ring-rose-200" : "border-slate-200"
                  } focus:border-[#3c315b] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 outline-none transition-colors`}
                />
              </div>
            </div>

            {/* Helper teks jika ada booking mendatang */}
            {nextUpcomingReservation && checkOutDate === nextUpcomingReservation.checkInIso && (
              <div className="text-xs text-amber-800 bg-amber-50/90 border border-amber-200/80 rounded-xl p-2.5 font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Perhatian:</strong> Tamu berikutnya check-in tanggal{" "}
                  {formatIdDate(nextUpcomingReservation.checkInIso)}. Kamar wajib check-out maks
                  pukul 11:30 WIT untuk pembersihan linen.
                </span>
              </div>
            )}
            {nextUpcomingReservation && checkOutDate < nextUpcomingReservation.checkInIso && (
              <p className="text-[11px] text-amber-700 font-medium">
                Maks. check-out: {formatIdDate(nextUpcomingReservation.checkInIso)} (sudah dipesan
                tamu lain)
              </p>
            )}

            {/* Pesan Validasi Inline Pencegah Tabrakan */}
            {hasCollision && (
              <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200/80 rounded-xl p-2.5 font-medium">
                Kamar sudah memiliki reservasi pada rentang tanggal tersebut
              </div>
            )}

            {/* Ringkasan Tarif & Tagihan */}
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <div className="text-slate-500">
                <span>Rp {safePrice.toLocaleString("id-ID")}</span>
                <span className="mx-1">×</span>
                <span className="font-semibold text-slate-700">{nights} Malam</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-medium mr-1.5">Total Tagihan:</span>
                <strong className="text-sm sm:text-base font-bold text-slate-900">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </strong>
              </div>
            </div>
          </div>

          {/* Section Data Tamu */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="checkin-guest-name"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Nama Tamu
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-[#3c315b] focus-within:bg-white rounded-xl px-3 py-2 transition-all">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    id="checkin-guest-name"
                    type="text"
                    required
                    placeholder="Nama Tamu"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="checkin-guest-phone"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  No. WhatsApp
                </label>
                <div
                  className={`flex items-center gap-2 bg-slate-50 border ${
                    phoneError ? "border-rose-400 ring-1 ring-rose-200" : "border-slate-200"
                  } focus-within:border-[#3c315b] focus-within:bg-white rounded-xl px-3 py-2 transition-all`}
                >
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    id="checkin-guest-phone"
                    type="tel"
                    placeholder="08XX XXXX XXXX"
                    value={guestPhone}
                    onChange={(e) => {
                      setGuestPhone(formatPhoneWithSpaces(e.target.value));
                      setPhoneError(null);
                    }}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-rose-600 font-medium pl-1">{phoneError}</p>
                )}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 pl-1">
              Nomor WhatsApp digunakan untuk pengiriman nota kuitansi digital otomatis.
            </p>
          </div>

          {/* Section Metode Pembayaran */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">
              Metode Pembayaran (Lunas di Tempat)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "cash", label: "Tunai", icon: Banknote },
                  { id: "qris", label: "QRIS", icon: QrCode },
                  { id: "transfer", label: "Transfer", icon: Landmark },
                ] as const
              ).map(({ id, label, icon: Icon }) => {
                const isActive = paymentMethod === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isActive
                        ? "bg-[#3c315b] text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full h-11 px-5 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer border-slate-200"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={!guestName.trim() || hasCollision}
              className="bg-[#3c315b] hover:bg-[#2d2445] text-white rounded-full h-11 px-6 text-xs sm:text-sm font-medium shadow-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
