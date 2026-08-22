"use client";

import {
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  LogOut,
  Plus,
  Sparkles,
  User,
  Wifi,
  Wind,
  Wrench,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import type { RoomItem } from "./room-card";

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomItem | null;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenSettlement?: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomDetailModal({
  isOpen,
  onClose,
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenSettlement,
  onOpenReceipt,
  onMarkClean,
  onFinishMaintenance,
}: RoomDetailModalProps) {
  if (!isOpen || !room) return null;

  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  const total = room.totalAmount || room.price;
  const dp = room.dpPaid || (isBooked ? Math.round(total * 0.5) : isOccupied ? total : 0);
  const remaining =
    room.remainingAmount !== undefined
      ? room.remainingAmount
      : isBooked
        ? total - dp
        : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col justify-between">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-base border border-white/30">
              #{room.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 bg-white/20 px-2 py-0.5 rounded-md">
                  Bangunan {room.building}
                </span>
                <span className="text-xs font-bold text-slate-200">
                  Rp {(room.price / 1000).toFixed(0)}rb / malam
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight mt-0.5">
                {room.typeName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-4 sm:p-5 space-y-3.5 text-left max-h-[75vh] overflow-y-auto">
          {/* Status Badge Strip */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500">Status Operasional:</span>
            {isReady && (
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>TERSEDIA (KOSONG &amp; BERSIH)</span>
              </span>
            )}
            {isOccupied && (
              <span className="bg-blue-100 text-blue-900 border border-blue-300 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>TERISI ({room.totalNights || 1} MALAM)</span>
              </span>
            )}
            {isBooked && (
              <span className="bg-purple-100 text-purple-950 border border-purple-300 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-purple-700" />
                <span>TERBOOKING WHATSAPP (DP 50%)</span>
              </span>
            )}
            {isDirty && (
              <span className="bg-amber-100 text-amber-950 border border-amber-300 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>PERLU BERSIH (HOUSEKEEPING)</span>
              </span>
            )}
            {isMaintenance && (
              <span className="bg-rose-100 text-rose-950 border border-rose-300 text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
                <Wrench className="w-3.5 h-3.5 text-rose-600" />
                <span>SEDANG PERBAIKAN / SERVIS</span>
              </span>
            )}
          </div>

          {/* Rincian Tamu (Jika Terisi atau Booking WA) */}
          {(isOccupied || isBooked) && (
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 space-y-2">
              <span className="text-[10px] font-black text-purple-900 uppercase tracking-wider block">
                👤 Data Tamu / Pemesan
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Nama Lengkap:</span>
                  <strong className="text-slate-900 font-extrabold text-sm">
                    {room.guestName || "Hendra Pratama"}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">No. WhatsApp:</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <strong className="text-slate-900 font-bold">
                      {room.guestPhone || "081399881122"}
                    </strong>
                    {room.guestPhone && (
                      <a
                        href={`https://wa.me/${room.guestPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200 transition"
                        title="Chat WhatsApp"
                      >
                        <FaWhatsapp className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 text-[10px]">Durasi Menginap:</span>
                  <strong className="text-purple-950 font-bold block">
                    {room.totalNights || 1} Malam ({room.checkInDate || "22 Agu"} – {room.checkOutDate || "23 Agu"})
                  </strong>
                </div>
                <span className="bg-white border border-purple-200 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {isBooked ? "Tamu Booking WA" : "Tamu Menginap"}
                </span>
              </div>
            </div>
          )}

          {/* Rincian Finansial & Pembayaran */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 text-xs">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
              💳 Rincian Pembayaran
            </span>
            <div className="flex items-center justify-between text-slate-600">
              <span>Total Tarif Sewa ({room.totalNights || 1} Malam):</span>
              <strong className="text-slate-900">Rp {total.toLocaleString("id-ID")}</strong>
            </div>

            {isBooked && (
              <>
                <div className="flex items-center justify-between text-emerald-800">
                  <span>DP 50% yang Sudah Masuk:</span>
                  <strong className="text-emerald-700 font-bold">- Rp {dp.toLocaleString("id-ID")}</strong>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-sm text-purple-950">
                  <span>SISA WAJIB SAAT TIBA:</span>
                  <span className="text-purple-900 font-black">
                    Rp {remaining.toLocaleString("id-ID")}
                  </span>
                </div>
              </>
            )}

            {isOccupied && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-sm">
                <span className="text-slate-700">Status Tagihan:</span>
                <span className={remaining > 0 ? "text-rose-700" : "text-emerald-700"}>
                  {remaining > 0 ? `Sisa Rp ${remaining.toLocaleString("id-ID")}` : "Lunas 100% (Rp 0)"}
                </span>
              </div>
            )}

            {isReady && (
              <div className="pt-1 text-slate-500 text-[11px]">
                <span>Tarif Standar: <strong>Rp {room.price.toLocaleString("id-ID")} / malam</strong> (DP 50% = Rp {(room.price * 0.5).toLocaleString("id-ID")})</span>
              </div>
            )}
          </div>

          {/* Fasilitas Kamar */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Fasilitas Kamar:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Bed className="w-3 h-3 text-purple-700" />
                <span>1 Kasur Besar (Muat 2–3 Tamu)</span>
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                {room.type === "ac" ? <Wind className="w-3 h-3 text-purple-700" /> : <Clock className="w-3 h-3 text-purple-700" />}
                <span>{room.type === "ac" ? "AC Dingin" : "Kipas Angin Dinding"}</span>
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Wifi className="w-3 h-3 text-purple-700" />
                <span>WiFi Gratis Kencang</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl text-xs font-bold h-10 px-4 cursor-pointer"
          >
            Tutup
          </Button>

          <div className="flex items-center gap-2">
            {isReady && (
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCheckIn(room);
                }}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black h-10 px-5 gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Check-In Tamu Sekarang</span>
              </Button>
            )}

            {isBooked && (
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenSettlement) onOpenSettlement(room);
                }}
                className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black h-10 px-5 gap-1.5 cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Pelunasan &amp; Serahkan Kunci</span>
              </Button>
            )}

            {isOccupied && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onClose();
                    onOpenReceipt(room);
                  }}
                  className="rounded-xl border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold h-10 px-3.5 gap-1 cursor-pointer"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  <span>Kirim Nota WA</span>
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCheckOut(room);
                  }}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black h-10 px-5 gap-1.5 cursor-pointer shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Check-Out</span>
                </Button>
              </>
            )}

            {isDirty && (
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onMarkClean(room.code);
                }}
                className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black h-10 px-5 gap-1.5 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tandai Selesai Bersih</span>
              </Button>
            )}

            {isMaintenance && (
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onFinishMaintenance(room.code);
                }}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black h-10 px-5 gap-1.5 cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai Perbaikan</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
