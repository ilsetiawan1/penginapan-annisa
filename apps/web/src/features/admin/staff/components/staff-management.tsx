"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { StaffCard, type StaffMember } from "./staff-card";
import { StaffFormModal } from "./staff-form-modal";

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "1",
    name: "Rian Saputra",
    username: "rian_reception",
    phone: "0812-4216-3116",
    shift: "Shift Pagi (06:00 – 14:00 WIT)",
    isActive: true,
  },
  {
    id: "2",
    name: "Dewi Lestari",
    username: "dewi_frontdesk",
    phone: "0813-5566-7788",
    shift: "Shift Siang/Malam (14:00 – 22:00 WIT)",
    isActive: true,
  },
];

export function StaffManagement() {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleToggleActive = (id: string) => {
    setStaffList((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)));
  };

  const handleAddStaff = (newMember: StaffMember) => {
    setStaffList((prev) => [...prev, newMember]);
    setSuccessMsg(`Akun staf "${newMember.name}" berhasil dibuat!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Owner User Management
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Manajemen Akun Staf Resepsionis
          </h2>
          <p className="text-xs text-slate-500">
            Kelola akses staf meja depan untuk mengoperasikan sistem kamar PMS dan kasir oleh-oleh.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-11 px-5 gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Akun Staf Baru</span>
        </Button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add Staff Form Sub-Component */}
      <StaffFormModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddStaff}
      />

      {/* Staff List Cards Sub-Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffList.map((staff) => (
          <StaffCard key={staff.id} staff={staff} onToggleActive={handleToggleActive} />
        ))}
      </div>
    </div>
  );
}
