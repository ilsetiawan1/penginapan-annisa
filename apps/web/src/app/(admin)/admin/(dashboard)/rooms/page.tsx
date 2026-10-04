"use client";

import { RoomMatrix } from "@/features/rooms/components/admin/matrix";

export default function AdminRoomsPage() {
  return (
    <div className="w-full flex flex-col">
      {/* 8-Room Live Matrix PMS */}
      <RoomMatrix />
    </div>
  );
}
