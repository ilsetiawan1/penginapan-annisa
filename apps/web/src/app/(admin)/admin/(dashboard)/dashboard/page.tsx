"use client";

import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { OperationalDashboard } from "@/features/dashboard/components/operational-dashboard";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleNavigate = (tab: string) => {
    switch (tab) {
      case "matrix":
        router.push("/admin/rooms");
        break;
      case "bookings":
        router.push("/admin/reservations");
        break;
      case "pos":
        router.push("/admin/pos");
        break;
      case "reports":
        router.push("/admin/reports");
        break;
      default:
        break;
    }
  };

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <OperationalDashboard onNavigateTab={handleNavigate} />
    </Suspense>
  );
}
