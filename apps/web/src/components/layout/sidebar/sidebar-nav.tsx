"use client";

import {
  Bed,
  Calendar,
  Gift,
  Home,
  Newspaper,
  Package,
  Settings,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from "lucide-react";
import { SidebarNavItemLink } from "./sidebar-nav-item";
import type { AdminRole, SidebarNavSection } from "./types";

interface SidebarNavProps {
  currentRole: AdminRole;
  isCollapsed?: boolean;
  onItemClick?: () => void;
}

const NAV_SECTIONS: SidebarNavSection[] = [
  {
    title: "OPERASIONAL PMS",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: Home, roles: ["owner", "staff"] },
      { href: "/admin/rooms", label: "Status Kamar", icon: Bed, roles: ["owner", "staff"], badge: "8 Unit" },
      { href: "/admin/reservations", label: "Kalender Reservasi", icon: Calendar, roles: ["owner", "staff"] },
      { href: "/admin/pos", label: "Kasir Oleh-Oleh", icon: Gift, roles: ["owner", "staff"] },
      { href: "/admin/reports", label: "Laporan Omzet", icon: TrendingUp, roles: ["owner"] },
    ],
  },
  {
    title: "PENGATURAN MASTER",
    items: [
      { href: "/admin/master-rooms", label: "Kelola Kamar & Tarif", icon: SlidersHorizontal, roles: ["owner"] },
      { href: "/admin/master-souvenirs", label: "Kelola Oleh-Oleh", icon: Package, roles: ["owner"] },
      { href: "/admin/master-articles", label: "Kelola Artikel", icon: Newspaper, roles: ["owner"] },
      { href: "/admin/staff", label: "Kelola Akun Staf", icon: Users, roles: ["owner"] },
      { href: "/admin/settings", label: "Pengaturan Sistem", icon: Settings, roles: ["owner"] },
    ],
  },
];

export function SidebarNav({ currentRole, isCollapsed = false, onItemClick }: SidebarNavProps) {
  return (
    <nav className="space-y-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-14rem)] pr-0.5">
      {NAV_SECTIONS.map((section) => {
        const visibleItems = section.items.filter((item) => item.roles.includes(currentRole));
        if (visibleItems.length === 0) return null;

        return (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 mb-1.5 block">
                {section.title}
              </span>
            )}
            <div className="space-y-1">
              {visibleItems.map((item) => (
                <SidebarNavItemLink
                  key={item.href}
                  item={item}
                  isCollapsed={isCollapsed}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
