"use client";

import type { RoomItem } from "./room-card";

interface RoomCardBodyProps {
  room: RoomItem;
  onOpenDetail?: (room: RoomItem) => void;
}

export function RoomCardBody({ room, onOpenDetail }: RoomCardBodyProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(room)}
      className={`p-3 sm:p-3.5 space-y-2 text-left ${
        onOpenDetail
          ? "cursor-pointer hover:bg-slate-50/60 transition rounded-xl"
          : ""
      }`}
      title="Klik untuk lihat rincian lengkap kamar"
    >
      {/* Baris Nomor Kamar, Nama Tipe, & Tarif */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-950 border border-purple-200 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
            #{room.code}
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
              {room.typeName}
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold">
              Rp {(room.price / 1000).toFixed(0)}rb / malam
            </span>
          </div>
        </div>
      </div>

      {/* Garis Pemisah Halus (Dashed Line) */}
      <div className="border-t border-dashed border-slate-200 my-1" />

      {/* Rincian Operasional Kamar */}
      <div className="min-h-[48px] flex flex-col justify-center">
        {/* JIKA KAMAR TERSEDIA (KOSONG & BERSIH) */}
        {isReady && (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2 text-center">
            <p className="text-[11px] font-black text-emerald-950 leading-tight">
              Kamar Bersih &amp; Siap Ditempati
            </p>
            <p className="text-[9px] text-emerald-700 font-semibold mt-0.5">
              Klik tombol Check-In saat tamu tiba
            </p>
          </div>
        )}

        {/* JIKA KAMAR TERISI */}
        {isOccupied && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 space-y-0.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px]">Tamu:</span>
              <strong className="text-slate-900 font-black truncate max-w-[120px]">
                {room.guestName}
              </strong>
            </div>
            <div className="flex items-center justify-between pt-0.5 border-t border-slate-200/70 text-[10px]">
              <span className="text-slate-500">Tagihan:</span>
              <strong className="text-blue-900 font-black">
                {room.remainingAmount && room.remainingAmount > 0
                  ? `Sisa Rp ${room.remainingAmount.toLocaleString("id-ID")}`
                  : "Lunas 100% (Rp 0)"}
              </strong>
            </div>
          </div>
        )}

        {/* JIKA KAMAR TERBOOKING WA */}
        {isBooked && (
          <div className="bg-purple-50/80 border border-purple-200/80 rounded-xl p-2 space-y-0.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-purple-900 font-extrabold text-[11px] truncate">
                {room.guestName}
              </span>
              <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                DP Masuk
              </span>
            </div>
            <div className="flex items-center justify-between pt-0.5 border-t border-purple-200/60 text-[10px]">
              <span className="text-slate-500">Sisa Pelunasan:</span>
              <strong className="text-purple-950 font-black">
                Rp{" "}
                {room.remainingAmount?.toLocaleString("id-ID") ||
                  (room.price / 2).toLocaleString("id-ID")}
              </strong>
            </div>
          </div>
        )}

        {/* JIKA KAMAR PERLU BERSIH */}
        {isDirty && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2 text-center">
            <p className="text-[10px] font-extrabold text-amber-950 leading-tight">
              Menunggu Housekeeping
            </p>
            <p className="text-[9px] text-amber-800/80 mt-0.5">
              Ganti sprei &amp; cuci kamar mandi
            </p>
          </div>
        )}

        {/* JIKA KAMAR SEDANG PERBAIKAN */}
        {isMaintenance && (
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-2 text-center">
            <p className="text-[10px] font-extrabold text-rose-950 leading-tight">
              Sedang Diperbaiki Teknisi
            </p>
            <p className="text-[9px] text-rose-800/80 mt-0.5">
              Pengecekan fasilitas / servis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
