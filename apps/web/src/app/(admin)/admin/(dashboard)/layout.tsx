"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { AdminTopbar } from "@/features/admin/dashboard/components/admin-topbar";
import { AdminSidebar, type AdminRole } from "@/components/layout/admin-sidebar";
import { Loader2 } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Map activeTab from current pathname
  const getActiveTab = () => {
    if (pathname.includes("/admin/rooms")) return "matrix";
    if (pathname.includes("/admin/reservations")) return "bookings";
    if (pathname.includes("/admin/pos")) return "pos";
    if (pathname.includes("/admin/reports")) return "reports";
    return "dashboard";
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case "dashboard":
        router.push("/admin/dashboard");
        break;
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
        router.push("/admin/dashboard");
    }
  };

  // Auth Guard Effect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f2f7] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-700 animate-spin" />
        <p className="text-xs font-semibold text-slate-600">
          Memverifikasi Sesi PMS...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const currentRole: AdminRole = (user?.role as AdminRole) || "staff";

  return (
    <div className="min-h-screen bg-[#f3f2f7] text-slate-900 font-sans flex flex-col antialiased px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 items-center">
      <div className="w-full max-w-[1600px] flex flex-col flex-1">
        {/* Sticky Header Topbar */}
        <AdminTopbar
          currentRole={currentRole}
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Workspace Body */}
        <div className="flex-1 flex gap-3.5 sm:gap-4 lg:gap-5 min-w-0 items-start w-full">
          {/* Left Floating Sidebar */}
          <AdminSidebar
            currentRole={currentRole}
            activeTab={getActiveTab()}
            onTabChange={handleTabChange}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main Dashboard Canvas */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
