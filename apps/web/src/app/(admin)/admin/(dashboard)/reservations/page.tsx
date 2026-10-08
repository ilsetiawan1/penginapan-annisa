"use client";

import {
  AdvanceBookingList,
  BookingCalendarSkeleton,
} from "@/features/reservations/components/admin/calendar";
import { Suspense } from "react";

export default function AdminReservationsPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<BookingCalendarSkeleton />}>
        <AdvanceBookingList />
      </Suspense>
    </div>
  );
}
