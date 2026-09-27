"use client";

import { RoomMatrix } from "@/features/rooms/components/admin/room-matrix";

export default function AdminRoomsPage() {
  return (
    <div className="space-y-6">
      {/* 8-Room Live Matrix PMS */}
      <RoomMatrix />
    </div>
  );
}
