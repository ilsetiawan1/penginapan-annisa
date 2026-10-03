"use client";

import { RoomCardActions } from "./room-card-actions";
import { RoomCardBody } from "./room-card-body";
import { RoomCardStatusHeader } from "./room-card-status-header";

export type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance" | "booked";

export interface RoomItem {
  code: string; // "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"
  id?: string;
  building: "A" | "B";
  type: "ac" | "kipas";
  typeName: string; // "Kamar Tipe AC" | "Kamar Tipe Kipas"
  price: number;
  status: RoomStatus;
  facilities?: string[];
  capacity?: number;
  bedType?: string;
  description?: string;
  guestName?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  totalNights?: number;
  totalAmount?: number;
  dpPaid?: number;
  remainingAmount?: number;
  paymentStatus?: string; // "paid" | "dp_paid" | "unpaid"
  reservationId?: string;
  reservationCode?: string;
  notes?: string;
}

interface RoomCardProps {
  room: RoomItem;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onOpenSettlement?: (room: RoomItem) => void;
  onOpenDetail?: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomCard({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onOpenSettlement,
  onOpenDetail,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between h-full group">
      <div>
        {/* 1. Header: Nomor Kamar, Status Badge, Nama Tipe & Tarif */}
        <RoomCardStatusHeader room={room} onOpenDetail={onOpenDetail} />

        {/* 2. Body: Kondisi Kamar / Rincian Tamu */}
        <RoomCardBody room={room} onOpenDetail={onOpenDetail} />
      </div>

      {/* 3. Action Buttons: Check-In, Check-Out, Pelunasan, Bersihkan */}
      <RoomCardActions
        room={room}
        onOpenCheckIn={onOpenCheckIn}
        onOpenCheckOut={onOpenCheckOut}
        onOpenReceipt={onOpenReceipt}
        onOpenSettlement={onOpenSettlement}
        onMarkClean={onMarkClean}
        onFinishMaintenance={onFinishMaintenance}
      />
    </div>
  );
}
