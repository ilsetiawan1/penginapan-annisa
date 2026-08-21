"use client";

import { useState } from "react";
import {
  AdminHeader,
  type AdminRole,
} from "../../../features/admin/dashboard/components/admin-header";
import { FinancialReports } from "../../../features/admin/reports/components/financial-reports";
import { RoomManagement } from "../../../features/admin/rooms/components/room-management";
import { RoomMatrix } from "../../../features/admin/rooms/components/room-matrix";
import { SouvenirPos } from "../../../features/admin/souvenirs/components/souvenir-pos";
import { StaffManagement } from "../../../features/admin/staff/components/staff-management";

export default function AdminDashboardPage() {
  const [currentRole, setCurrentRole] = useState<AdminRole>("owner");
  const [activeTab, setActiveTab] = useState<string>("matrix");

  return (
    <div className="min-h-screen bg-[#f8f7fb] text-slate-900 font-sans flex flex-col antialiased">
      {/* Universal Admin Header (WIT Clock, Role Switcher, & Touch Tabs) */}
      <AdminHeader
        currentRole={currentRole}
        onRoleChange={(newRole) => {
          setCurrentRole(newRole);
          // If staff role selected while on owner-only tab, redirect to matrix
          if (newRole === "staff" && !["matrix", "pos"].includes(activeTab)) {
            setActiveTab("matrix");
          }
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Workspace Area (Tablet-First Responsive Padding) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 lg:p-8">
        {/* TAB 1: Matriks 8 Kamar PMS (Owner & Staf) */}
        {activeTab === "matrix" && <RoomMatrix />}

        {/* TAB 2: Kasir & Stok Oleh-oleh (Owner & Staf) */}
        {activeTab === "pos" && <SouvenirPos />}

        {/* TAB 3: Manajemen Tarif & Kamar (Khusus Owner) */}
        {activeTab === "rooms" && currentRole === "owner" && <RoomManagement />}

        {/* TAB 4: Laporan Omzet & Okupansi (Khusus Owner) */}
        {activeTab === "reports" && currentRole === "owner" && <FinancialReports />}

        {/* TAB 5: Kelola Akun Staf (Khusus Owner) */}
        {activeTab === "staff" && currentRole === "owner" && <StaffManagement />}
      </main>

      {/* Subtle Admin Footer Strip */}
      <footer className="w-full py-4 px-6 border-t border-slate-200/80 bg-white/70 backdrop-blur-md text-center text-xs text-slate-400 font-medium">
        <p>
          Penginapan Annisa PMS v1.0 • Khusus Penggunaan Internal Meja Resepsionis &amp; Manajemen
        </p>
      </footer>
    </div>
  );
}
