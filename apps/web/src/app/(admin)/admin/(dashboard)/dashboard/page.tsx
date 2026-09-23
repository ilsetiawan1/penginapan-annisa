"use client";

import { OperationalDashboard } from "@/features/admin/dashboard/components/operational-dashboard";
import { useRouter } from "next/navigation";

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

  return <OperationalDashboard onNavigateTab={handleNavigate} />;
}
