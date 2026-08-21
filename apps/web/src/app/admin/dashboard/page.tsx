"use client";

import { useState } from "react";
import { type AdminRole, AdminSidebar } from "../../../components/layout/admin-sidebar";
import { AdminTopbar } from "../../../features/admin/dashboard/components/admin-topbar";
import { FinancialReports } from "../../../features/admin/reports/components/financial-reports";
import { AdvanceBookingList } from "../../../features/admin/reservations/components/advance-booking-list";
import { RoomManagement } from "../../../features/admin/rooms/components/room-management";
import { RoomMatrix } from "../../../features/admin/rooms/components/room-matrix";
import { SouvenirPos } from "../../../features/admin/souvenirs/components/souvenir-pos";
import { StaffManagement } from "../../../features/admin/staff/components/staff-management";

export default function AdminDashboardPage() {
  const [currentRole, setCurrentRole] = useState<AdminRole>("owner");
  const [activeTab, setActiveTab] = useState<string>("matrix");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#f7f6f9] text-slate-900 font-sans flex antialiased">
      {/* 1. Left Sidebar Navigation (Mentalhy Architecture) */}
      <AdminSidebar
        currentRole={currentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace Layout Area (Offset by sidebar width on desktop) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Header & Greeting Bar */}
        <AdminTopbar
          currentRole={currentRole}
          onRoleChange={(newRole) => {
            setCurrentRole(newRole);
            if (newRole === "staff" && !["matrix", "bookings", "pos"].includes(activeTab)) {
              setActiveTab("matrix");
            }
          }}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Main Workspace Content (Zero-Scroll Tablet Optimized) */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-5">
          {/* TAB 1: Matriks 8 Kamar PMS (Owner & Staf) */}
          {activeTab === "matrix" && <RoomMatrix />}

          {/* TAB 2: Jadwal Booking Mendatang WA (Owner & Staf) */}
          {activeTab === "bookings" && <AdvanceBookingList />}

          {/* TAB 3: Kasir & Stok Oleh-oleh (Owner & Staf) */}
          {activeTab === "pos" && <SouvenirPos />}

          {/* TAB 4: Manajemen Tarif & Kamar (Khusus Owner) */}
          {activeTab === "rooms" && currentRole === "owner" && <RoomManagement />}

          {/* TAB 5: Laporan Omzet & Okupansi (Khusus Owner) */}
          {activeTab === "reports" && currentRole === "owner" && <FinancialReports />}

          {/* TAB 6: Kelola Akun Staf (Khusus Owner) */}
          {activeTab === "staff" && currentRole === "owner" && <StaffManagement />}
        </main>
      </div>
    </div>
  );
}
