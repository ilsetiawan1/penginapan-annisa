"use client";

import { Button } from "@/components/ui/button";
import type { RoomItem, RoomStatus } from "@/features/rooms/components/admin/room-card";
import {
  CheckCircle2,
  ChevronDown,
  Filter,
  Layers,
  LogOut,
  Phone,
  Search,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

interface LiveRoomMonitoringTableProps {
  rooms: RoomItem[];
  onNavigateTab: (tab: string) => void;
  onCheckInAction: (room: RoomItem) => void;
  onCheckOutAction: (room: RoomItem) => void;
  onMarkCleanAction: (roomCode: string) => void;
}

export function LiveRoomMonitoringTable({
  rooms,
  onNavigateTab,
  onCheckInAction,
  onCheckOutAction,
  onMarkCleanAction,
}: LiveRoomMonitoringTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const counts = useMemo(() => {
    return {
      all: rooms.length,
      occupied: rooms.filter((r) => r.status === "occupied").length,
      ready: rooms.filter((r) => r.status === "ready").length,
      dirty: rooms.filter((r) => r.status === "dirty").length,
      booked: rooms.filter((r) => r.status === "booked").length,
    };
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchStatus =
        statusFilter === "all" ? true : room.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        room.code.toLowerCase().includes(q) ||
        room.typeName.toLowerCase().includes(q) ||
        (room.guestName && room.guestName.toLowerCase().includes(q)) ||
        room.status.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [rooms, statusFilter, searchQuery]);

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case "ready":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Siap Huni
          </span>
        );
      case "occupied":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Terisi
          </span>
        );
      case "dirty":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Perlu Bersih
          </span>
        );
      case "booked":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Booking WA
          </span>
        );
      case "maintenance":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Perbaikan
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Table Header Section */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
              Monitoring Operasional Kamar (Live Matrix)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pantau status 8 unit kamar transit bandara secara real-time beserta data tamu dan aksi cepat resepsionis.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kamar atau tamu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 outline-none focus:bg-white focus:ring-1 focus:ring-purple-200 transition"
            />
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === "all"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>Semua</span>
              <span className="text-[10px] px-1 py-0.2 rounded-full bg-white/20 text-current">
                {counts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("occupied")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === "occupied"
                  ? "bg-purple-700 text-white shadow-2xs"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <span>Terisi</span>
              <span className="text-[10px] px-1 py-0.2 rounded-full bg-purple-200/50 text-current">
                {counts.occupied}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("ready")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === "ready"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <span>Siap Huni</span>
              <span className="text-[10px] px-1 py-0.2 rounded-full bg-emerald-200/50 text-current">
                {counts.ready}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("dirty")}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === "dirty"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              <span>Perlu Bersih</span>
              <span className="text-[10px] px-1 py-0.2 rounded-full bg-amber-200/50 text-current">
                {counts.dirty}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider select-none">
            <tr>
              <th className="px-6 py-4">Unit Kamar ⇅</th>
              <th className="px-6 py-4">Tipe &amp; Fasilitas ⇅</th>
              <th className="px-6 py-4">Status Kamar ⇅</th>
              <th className="px-6 py-4">Tamu / Reservasi ⇅</th>
              <th className="px-6 py-4">Jadwal &amp; Durasi ⇅</th>
              <th className="px-6 py-4">Tarif &amp; Kas ⇅</th>
              <th className="px-6 py-4 text-right">Aksi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredRooms.map((room) => {
              const isOccupied = room.status === "occupied";
              const isReady = room.status === "ready";
              const isDirty = room.status === "dirty";
              const isBooked = room.status === "booked";

              return (
                <tr
                  key={room.code}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Unit Kamar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-700 text-white font-black text-xs flex items-center justify-center shadow-2xs shrink-0">
                        {room.code}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Gedung {room.building}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Transit Bandara
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Tipe & Fasilitas */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">
                        {room.typeName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {room.type === "ac"
                          ? "AC • KM Dalam • TV LED"
                          : "Kipas Angin • KM Luar"}
                      </span>
                    </div>
                  </td>

                  {/* Status Kamar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(room.status)}
                  </td>

                  {/* Tamu / Reservasi */}
                  <td className="px-6 py-4">
                    {room.guestName ? (
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span>{room.guestName}</span>
                          {room.guestPhone && (
                            <a
                              href={`https://wa.me/${room.guestPhone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600 hover:text-emerald-700"
                              title="Chat WhatsApp"
                            >
                              <FaWhatsapp className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {room.guestPhone || "Tamu Transit"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Kamar Kosong
                      </span>
                    )}
                  </td>

                  {/* Jadwal & Durasi */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    {room.checkInDate ? (
                      <div>
                        <span className="font-bold text-slate-800 block">
                          {room.checkInDate}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {room.totalNights ? `${room.totalNights} Malam` : "1 Malam"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">
                        Siap Check-In
                      </span>
                    )}
                  </td>

                  {/* Tarif & Kas */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Rp {room.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">
                        {isOccupied ? "Lunas 100%" : isBooked ? "DP 50%" : "Per Malam"}
                      </span>
                    </div>
                  </td>

                  {/* Aksi Cepat */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1.5">
                      {isReady && (
                        <Button
                          size="sm"
                          onClick={() => onCheckInAction(room)}
                          className="h-8 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs gap-1 shadow-2xs"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Check-In</span>
                        </Button>
                      )}

                      {isOccupied && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onCheckOutAction(room)}
                          className="h-8 px-3 rounded-xl border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-700 font-bold text-xs gap-1"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Check-Out</span>
                        </Button>
                      )}

                      {isDirty && (
                        <Button
                          size="sm"
                          onClick={() => onMarkCleanAction(room.code)}
                          className="h-8 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1 shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Set Bersih</span>
                        </Button>
                      )}

                      {isBooked && (
                        <Button
                          size="sm"
                          onClick={() => onCheckInAction(room)}
                          className="h-8 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Proses Masuk</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
