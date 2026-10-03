import type { LucideIcon } from "lucide-react";

export type AdminRole = "owner" | "staff";

export interface SidebarNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: AdminRole[];
  badge?: string;
}

export interface SidebarNavSection {
  title: string;
  items: SidebarNavItem[];
}
