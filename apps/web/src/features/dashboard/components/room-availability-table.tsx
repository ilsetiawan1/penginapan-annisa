"use client";

import type { Room } from "@annisa/types";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

interface RoomAvailabilityTableProps {
  rooms?: Room[];
  onNavigateTab: (tab: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
  occupied: {
    label: "Terisi (Occupied)",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotClass: "bg-emerald-500 animate-pulse",
  },
  ready: {
    label: "Siap Huni (Ready)",
    badgeClass: "bg-[#faf9fc] text-slate-600 border-[#e2dcf2]",
    dotClass: "bg-blue-500",
  },
  dirty: {
    label: "Perlu Bersih (Dirty)",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-500",
  },
  booked: {
    label: "Booking WA",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-200",
    dotClass: "bg-teal-500",
  },
};

const FILTER_OPTIONS = [
  { id: "all", label: "Semua Status" },
  { id: "occupied", label: "Terisi (Occupied)" },
  { id: "ready", label: "Siap Huni (Ready)" },
  { id: "dirty", label: "Perlu Bersih (Dirty)" },
];

export function RoomAvailabilityTable({ rooms = [], onNavigateTab }: RoomAvailabilityTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredRooms = rooms.filter((r) => statusFilter === "all" || r.status === statusFilter);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Ketersediaan Kamar Hari Ini
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ringkasan status 8 unit kamar Penginapan Annisa
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#e2dcf2] text-slate-600 hover:bg-[#faf9fc] transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {FILTER_OPTIONS.find((f) => f.id === statusFilter)?.label || "Filter Status"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl border border-[#e2dcf2] shadow-lg py-1 z-30">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setStatusFilter(opt.id);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      statusFilter === opt.id
                        ? "bg-[#ede8f8] text-[#594791] font-bold"
                        : "text-slate-600 hover:bg-[#faf9fc]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("matrix")}
            className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
          >
            Kelola Semua Kamar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#faf9fc] text-slate-400 font-semibold border-b border-[#e2dcf2]/60 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4 sm:px-5">Nomor Kamar</th>
              <th className="py-3 px-4 sm:px-5">Tipe Kamar</th>
              <th className="py-3 px-4 sm:px-5">Tamu Saat Ini</th>
              <th className="py-3 px-4 sm:px-5">Durasi / Checkout</th>
              <th className="py-3 px-4 sm:px-5">Status Kamar</th>
              <th className="py-3 px-4 sm:px-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2dcf2]/60 font-medium text-slate-700">
            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400">
                  Tidak ada kamar dengan filter status ini.
                </td>
              </tr>
            ) : (
              filteredRooms.map((room) => {
                const conf = STATUS_CONFIG[room.status] || STATUS_CONFIG.ready;
                return (
                  <tr key={room.id} className="hover:bg-[#faf9fc] transition-colors">
                    <td className="py-3.5 px-4 sm:px-5 font-bold text-slate-900">
                      Kamar #{room.roomNumber}
                    </td>
                    <td className="py-3.5 px-4 sm:px-5 text-slate-500">
                      {room.roomType?.name ||
                        (room.building === "A"
                          ? "Standard Transit (AC + Fan)"
                          : "Standard Transit Double")}
                    </td>
                    <td className="py-3.5 px-4 sm:px-5">
                      {room.status === "occupied" && room.guestName ? (
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#ede8f8] text-[#594791] text-[10px] font-bold flex items-center justify-center">
                            {room.guestName.charAt(0).toUpperCase()}
                          </span>
                          <span className="text-slate-900 font-semibold">{room.guestName}</span>
                        </div>
                      ) : room.status === "booked" ? (
                        <span className="text-slate-600 font-semibold">
                          {room.guestName || "Booking Reservasi WA"}
                        </span>
                      ) : (
                        <span className="text-slate-400">Kosong (Siap Huni)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 sm:px-5 text-slate-500">
                      {room.status === "occupied"
                        ? "12:00 WIT (Hari ini/Besok)"
                        : room.status === "dirty"
                          ? "Checkout selesai"
                          : "Tersedia sekarang"}
                    </td>
                    <td className="py-3.5 px-4 sm:px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${conf.badgeClass}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${conf.dotClass}`} />
                        {conf.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-5 text-right">
                      <button
                        type="button"
                        onClick={() => onNavigateTab("matrix")}
                        className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-[#594791] hover:bg-[#ede8f8] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {room.status === "ready"
                          ? "Check-in"
                          : room.status === "dirty"
                            ? "Bersihkan"
                            : "Detail"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
