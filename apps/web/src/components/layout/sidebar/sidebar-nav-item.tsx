"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarNavItem } from "./types";

interface SidebarNavItemProps {
  item: SidebarNavItem;
  isCollapsed?: boolean;
  onItemClick?: () => void;
}

export function SidebarNavItemLink({
  item,
  isCollapsed = false,
  onItemClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive =
    pathname === item.href ||
    (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

  return (
    <div className="relative group">
      <Link
        href={item.href}
        onClick={onItemClick}
        title={isCollapsed ? item.label : undefined}
        className={`flex items-center gap-3 rounded-xl text-xs transition-all ${
          isCollapsed
            ? "w-10 h-10 mx-auto justify-center p-0"
            : "px-3 py-2.5 w-full justify-between"
        } ${
          isActive
            ? "bg-slate-50 border border-slate-200/90 text-slate-900 font-semibold shadow-xs"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium border border-transparent"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon
            className={`shrink-0 w-4 h-4 ${
              isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-700"
            }`}
          />
          {!isCollapsed && <span className="truncate">{item.label}</span>}
        </div>
        {!isCollapsed && item.badge && (
          <span className="shrink-0 text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
            {item.badge}
          </span>
        )}
      </Link>
    </div>
  );
}
