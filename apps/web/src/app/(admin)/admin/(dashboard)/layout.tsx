"use client";

import { type AdminRole, AdminSidebar } from "@/components/layout/admin-sidebar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Clock, LayoutGrid, Loader2, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${dateStr} • ${timeStr} WIT`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Auth Guard Effect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/internal");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f2f7] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-slate-800 animate-spin" />
        <p className="text-xs font-semibold text-slate-600">Memverifikasi Sesi...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const currentRole: AdminRole = (user?.role as AdminRole) || "staff";

  // Breadcrumb Generator
  const getBreadcrumb = () => {
    if (pathname.includes("/admin/master-rooms"))
      return { category: "Pengaturan", sub: "Kelola Kamar & Tarif" };
    if (pathname.includes("/admin/master-souvenirs"))
      return { category: "Pengaturan", sub: "Kelola Oleh-Oleh" };
    if (pathname.includes("/admin/master-articles"))
      return { category: "Pengaturan", sub: "Kelola Artikel & SEO" };
    if (pathname.includes("/admin/rooms"))
      return { category: "Operasional", sub: "Status Kamar" };
    if (pathname.includes("/admin/reservations"))
      return { category: "Operasional", sub: "Kalender Reservasi" };
    if (pathname.includes("/admin/pos"))
      return { category: "Operasional", sub: "Kasir Oleh-Oleh" };
    if (pathname.includes("/admin/reports"))
      return { category: "Operasional", sub: "Laporan Omzet" };
    if (pathname.includes("/admin/staff"))
      return { category: "Pengaturan", sub: "Kelola Akun Staf" };
    if (pathname.includes("/admin/settings"))
      return { category: "Pengaturan", sub: "Pengaturan Sistem" };
    return { category: "Operasional", sub: "Dashboard" };
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans flex antialiased">
      {/* Left Collapsible SaaS Sidebar (Sticky Edge-to-Edge) */}
      <AdminSidebar
        currentRole={currentRole}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Right Column: Full-width Topbar + Naturally Scrollable Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Full-width Topbar: border-b border-gray-200, sticky top-0, no rounded edges */}
        <header className="h-16 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          {/* Left: Mobile Menu Trigger + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Buka menu navigasi"
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-slate-500">{breadcrumb.category}</span>
              <span>/</span>
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{breadcrumb.sub}</span>
              </div>
            </div>
          </div>

          {/* Right: Date & Time Badge */}
          <div className="flex items-center gap-3 shrink-0">
            {currentTime && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-slate-600 text-xs font-medium shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentTime}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Body: Fluid, Responsive, Scrollable */}
        <main className="flex-1 p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
