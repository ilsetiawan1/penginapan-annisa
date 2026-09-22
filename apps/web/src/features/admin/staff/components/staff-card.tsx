"use client";

import { Button } from "../../../../components/ui/button";

export interface StaffMember {
  id: string;
  name: string;
  username: string;
  phone: string;
  shift: string;
  isActive: boolean;
}

interface StaffCardProps {
  staff: StaffMember;
  onToggleActive: (id: string) => void;
}

export function StaffCard({ staff, onToggleActive }: StaffCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-black text-sm shrink-0">
          {staff.name.charAt(0)}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-sm text-slate-900">{staff.name}</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                staff.isActive
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {staff.isActive ? "🟢 Aktif" : "🔴 Nonaktif"}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            @{staff.username} • {staff.phone}
          </p>
          <p className="text-[11px] font-bold text-purple-700 pt-0.5">
            {staff.shift}
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => onToggleActive(staff.id)}
        className={`rounded-xl h-9 px-3 text-xs font-extrabold ${
          staff.isActive
            ? "border-rose-200 text-rose-700 hover:bg-rose-50"
            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        }`}
      >
        {staff.isActive ? "Nonaktifkan" : "Aktifkan"}
      </Button>
    </div>
  );
}
