"use client";

import { RoomMatrix, RoomMatrixSkeleton } from "@/features/rooms/components/admin/matrix";
import { Suspense } from "react";

export default function AdminRoomsPage() {
  return (
    <div className="w-full flex flex-col">
      {/* 8-Room Live Matrix PMS with Instant Suspense Shell */}
      <Suspense fallback={<RoomMatrixSkeleton />}>
        <RoomMatrix />
      </Suspense>
    </div>
  );
}
