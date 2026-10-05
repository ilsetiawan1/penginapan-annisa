"use client";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { User } from "@annisa/types";

interface StaffDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  staff: User | null;
  isLoading?: boolean;
}

export function StaffDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  staff,
  isLoading = false,
}: StaffDeleteModalProps) {
  if (!staff) return null;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={isLoading}
      title="Hapus Akun Pengguna?"
      variant="danger"
      confirmText="Hapus Permanen"
      description={
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            Apakah Anda yakin ingin menghapus akun{" "}
            <strong className="text-slate-900">{staff.name}</strong> (
            <span className="font-mono text-slate-700">{staff.email}</span>)?
          </p>
          <div className="bg-red-50 border border-red-200/80 rounded-xl p-3 text-[11px] text-red-700">
            Perhatian: Tindakan ini permanen. Jika staf ini memiliki relasi data historis di sistem,
            sistem akan menolak penghapusan demi integritas laporan.
          </div>
        </div>
      }
    />
  );
}

interface StaffToggleActiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  staff: User | null;
  isLoading?: boolean;
}

export function StaffToggleActiveModal({
  isOpen,
  onClose,
  onConfirm,
  staff,
  isLoading = false,
}: StaffToggleActiveModalProps) {
  if (!staff) return null;

  const isDeactivating = staff.isActive;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={isLoading}
      title={isDeactivating ? "Nonaktifkan Akun Pengguna?" : "Aktifkan Akun Pengguna?"}
      variant={isDeactivating ? "warning" : "default"}
      confirmText={isDeactivating ? "Nonaktifkan" : "Aktifkan"}
      description={
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            Apakah Anda yakin ingin {isDeactivating ? "menonaktifkan" : "mengaktifkan"} akses akun{" "}
            <strong className="text-slate-900">{staff.name}</strong> (
            <span className="font-mono text-slate-700">{staff.email}</span>)?
          </p>
          <p className="text-[11px] text-slate-500">
            {isDeactivating
              ? "Pengguna tidak akan dapat login ke sistem PMS atau POS hingga diaktifkan kembali."
              : "Pengguna akan dapat segera login dan menggunakan sistem dengan izin akses yang sesuai."}
          </p>
        </div>
      }
    />
  );
}
