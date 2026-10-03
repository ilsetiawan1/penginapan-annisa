"use client";

import { Calendar, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { RoomItem } from "./room-card";

interface RoomDetailGuestSectionProps {
  room: RoomItem;
}

export function formatIndoDate(dateStr?: string | Date, timeFallback?: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  const formatted = d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return timeFallback ? `${formatted}, ${timeFallback}` : formatted;
}

export function RoomDetailGuestSection({ room }: RoomDetailGuestSectionProps) {
  const isBooked = room.status === "booked";

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Informasi Tamu</span>
        </span>
        <span className="bg-white border border-slate-200/80 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
          {isBooked ? "Booking WA" : "Tamu Menginap"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px] mb-0.5">Nama Tamu</span>
          <span className="text-slate-900 font-semibold text-sm">
            {room.guestName || (isBooked ? "Tamu Booking WA" : "Tamu In-House")}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px] mb-0.5">Kontak WhatsApp</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-medium">
              {room.guestPhone || "0812-0000-0000"}
            </span>
            {room.guestPhone && (
              <a
                href={`https://wa.me/${room.guestPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors"
                title="Chat WhatsApp"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
        <div>
          <span className="text-slate-400 text-[11px] block">Durasi &amp; Periode:</span>
          <span className="text-slate-900 font-medium">
            {room.totalNights || 1} Malam ({formatIndoDate(room.checkInDate, "14:00 WIT")} –{" "}
            {formatIndoDate(room.checkOutDate, "12:00 WIT")})
          </span>
        </div>
      </div>
    </div>
  );
}
