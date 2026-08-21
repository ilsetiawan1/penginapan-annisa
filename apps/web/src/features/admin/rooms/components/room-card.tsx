"use client";

import { CheckCircle2, LogOut, Plus, RotateCw, Sparkles, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";

export type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance";

export interface RoomItem {
  number: string;
  type: "ac" | "kipas";
  typeName: string;
  floor: number;
  price: number;
  status: RoomStatus;
  guestName?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  totalNights?: number;
  totalAmount?: number;
  dpPaid?: number;
  remainingAmount?: number;
}

interface RoomCardProps {
  room: RoomItem;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onMarkClean: (roomNumber: string) => void;
  onFinishMaintenance: (roomNumber: string) => void;
}

export function RoomCard({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";

  return (
    <div
      className={`rounded-3xl border-2 p-4 transition-all flex flex-col justify-between select-none ${
        isReady
          ? "bg-white border-purple-200/90 shadow-2xs hover:border-purple-400"
          : isOccupied
            ? "bg-white border-blue-200/90 shadow-2xs hover:border-blue-400"
            : isDirty
              ? "bg-white border-amber-200/90 shadow-2xs hover:border-amber-400"
              : "bg-white border-rose-200/90 shadow-2xs"
      }`}
    >
      {/* Card Header: Room Number, Status Badge, Price */}
      <div>
        <div className="flex items-start justify-between gap-1 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900">#{room.number}</span>
            {isReady && (
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Siap Pakai
              </span>
            )}
            {isOccupied && (
              <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Terisi
              </span>
            )}
            {isDirty && (
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Perlu Bersih
              </span>
            )}
            {isMaintenance && (
              <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Perbaikan
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-slate-600">
            Rp {(room.price / 1000).toFixed(0)}rb
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium mb-3">
          {room.typeName} (Lt. {room.floor})
        </p>

        {/* Card Body by Status */}
        {isReady && (
          <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 text-center my-2 space-y-1">
            <CheckCircle2 className="w-6 h-6 text-purple-600 mx-auto" />
            <p className="text-xs font-bold text-slate-800">Kamar Kosong &amp; Bersih</p>
            <p className="text-[10px] text-slate-500">Siap menerima tamu transit</p>
          </div>
        )}

        {isOccupied && (
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 my-2 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-slate-900 font-extrabold truncate">{room.guestName}</strong>
              <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                {room.totalNights} Malam
              </span>
            </div>
            {room.guestPhone && (
              <p className="text-[11px] text-slate-600">
                WA: <strong className="text-slate-800">{room.guestPhone}</strong>
              </p>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-blue-100 text-[11px]">
              <span className="text-slate-500">Sisa Bayar:</span>
              <strong className="text-blue-900 font-black">
                Rp {room.remainingAmount?.toLocaleString("id-ID") || 0}
              </strong>
            </div>
          </div>
        )}

        {isDirty && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-center my-2 space-y-1">
            <RotateCw className="w-6 h-6 text-amber-700 mx-auto animate-spin-slow" />
            <p className="text-xs font-bold text-slate-900">Tamu Baru Saja Pulang</p>
            <p className="text-[10px] text-slate-600">Menunggu staf membersihkan sprei &amp; KM</p>
          </div>
        )}

        {isMaintenance && (
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 text-center my-2 space-y-1">
            <Wrench className="w-6 h-6 text-rose-600 mx-auto" />
            <p className="text-xs font-bold text-slate-900">Sedang Perbaikan</p>
            <p className="text-[10px] text-slate-600">Perbaikan AC / Pipa / Lampu</p>
          </div>
        )}
      </div>

      {/* Card Actions (Tablet-Friendly Big Touch Targets >= 44px) */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        {isReady && (
          <Button
            type="button"
            onClick={() => onOpenCheckIn(room)}
            className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-11 gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Check-In Tamu</span>
          </Button>
        )}

        {isOccupied && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={() => onOpenCheckOut(room)}
              className="rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs h-11 gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Check-Out</span>
            </Button>
            <Button
              type="button"
              onClick={() => onOpenReceipt(room)}
              variant="outline"
              className="rounded-xl border-purple-200 hover:bg-purple-50 text-purple-800 font-extrabold text-xs h-11 gap-1 cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-purple-700" />
              <span>Nota WA</span>
            </Button>
          </div>
        )}

        {isDirty && (
          <Button
            type="button"
            onClick={() => onMarkClean(room.number)}
            className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-11 gap-1.5 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tandai Sudah Bersih</span>
          </Button>
        )}

        {isMaintenance && (
          <Button
            type="button"
            onClick={() => onFinishMaintenance(room.number)}
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs h-11 gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Selesai Servis</span>
          </Button>
        )}
      </div>
    </div>
  );
}
