"use client";

import { useState } from "react";
import { type AdminRole, AdminSidebar } from "../../../components/layout/admin-sidebar";
import { AdminTopbar } from "../../../features/admin/dashboard/components/admin-topbar";
import { OperationalDashboard } from "../../../features/admin/dashboard/components/operational-dashboard";
import { FinancialReports } from "../../../features/admin/reports/components/financial-reports";
import { AdvanceBookingList } from "../../../features/admin/reservations/components/advance-booking-list";
import { RoomManagement } from "../../../features/admin/rooms/components/room-management";
import { RoomMatrix } from "../../../features/admin/rooms/components/room-matrix";
import { AdminSettings } from "../../../features/admin/settings/components/admin-settings";
import { SouvenirPos } from "../../../features/admin/souvenirs/components/souvenir-pos";
import { StaffManagement } from "../../../features/admin/staff/components/staff-management";

export default function AdminDashboardPage() {
  const [currentRole, setCurrentRole] = useState<AdminRole>("owner");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#f3f2f7] text-slate-900 font-sans flex flex-col antialiased px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5 items-center">
      {/* Container Terpusat Proporsional Mobile-First */}
      <div className="w-full max-w-[1600px] flex flex-col flex-1">
        {/* 1. Topbar Sticky Glassmorphism Header */}
        <AdminTopbar
          currentRole={currentRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRoleChange={setCurrentRole}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* 2. Workspace Body: Left Floating Icon Dock + Main Content Canvas */}
        <div className="flex-1 flex gap-3.5 sm:gap-4 lg:gap-5 min-w-0 items-start w-full">
          {/* Left Floating Icon Dock (Tablet & Desktop md:flex) */}
          <AdminSidebar
            currentRole={currentRole}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Dynamic Main Workspace Content */}
          <main className="flex-1 min-w-0 w-full overflow-hidden">
            {/* TAB 0: Dashboard Utama Operasional & Produktivitas */}
            {activeTab === "dashboard" && <OperationalDashboard onNavigateTab={setActiveTab} />}

            {/* TAB 1: Status Kamar (Matriks 8 Kamar PMS) */}
            {activeTab === "matrix" && <RoomMatrix />}

            {/* TAB 2: Jadwal Booking Mendatang WA */}
            {activeTab === "bookings" && <AdvanceBookingList />}

            {/* TAB 3: Kasir & Stok Oleh-oleh */}
            {activeTab === "pos" && <SouvenirPos />}

            {/* TAB 4: Manajemen Tarif & Kamar (Khusus Owner) */}
            {activeTab === "rooms" && currentRole === "owner" && <RoomManagement />}

            {/* TAB 5: Laporan Omzet & Okupansi (Khusus Owner) */}
            {activeTab === "reports" && currentRole === "owner" && <FinancialReports />}

            {/* TAB 6: Kelola Akun Staf (Khusus Owner) */}
            {activeTab === "staff" && currentRole === "owner" && <StaffManagement />}

            {/* TAB 7: Pengaturan Sistem & Peran (Baru) */}
            {activeTab === "settings" && (
              <AdminSettings currentRole={currentRole} onRoleChange={setCurrentRole} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
