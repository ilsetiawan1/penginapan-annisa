"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import type { CreateUserInput, UpdateUserInput, User } from "@annisa/types";
import { AlertCircle, Loader2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useCreateStaff,
  useDeleteStaff,
  useStaffList,
  useUpdateStaff,
} from "../../hooks/use-staff";
import { StaffCard } from "./staff-card";
import { StaffDeleteModal, StaffToggleActiveModal } from "./staff-delete-modal";
import { StaffFormModal } from "./staff-form-modal";
import { StaffHeader } from "./staff-header";
import { StaffToolbar } from "./staff-toolbar";

export function MasterStaff() {
  const { user: currentUser } = useAuth();
  const { data: staffList = [], isLoading, isFetching, isError, refetch } = useStaffList();

  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();
  const deleteMutation = useDeleteStaff();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaffForEdit, setSelectedStaffForEdit] = useState<User | null>(null);
  const [selectedStaffForToggle, setSelectedStaffForToggle] = useState<User | null>(null);
  const [selectedStaffForDelete, setSelectedStaffForDelete] = useState<User | null>(null);

  // Filter daftar staf secara reaktif berdasarkan username / nama / email
  const filteredStaffList = useMemo(() => {
    if (!searchQuery.trim()) return staffList;
    const q = searchQuery.toLowerCase().trim();
    return staffList.filter(
      (staff) => staff.name.toLowerCase().includes(q) || staff.email.toLowerCase().includes(q),
    );
  }, [staffList, searchQuery]);

  const handleOpenAdd = () => {
    setSelectedStaffForEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (staff: User) => {
    setSelectedStaffForEdit(staff);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async ({
    id,
    createInput,
    updateInput,
  }: {
    id?: string;
    createInput?: CreateUserInput;
    updateInput?: UpdateUserInput;
  }) => {
    if (id && updateInput) {
      await updateMutation.mutateAsync({ id, input: updateInput });
    } else if (createInput) {
      await createMutation.mutateAsync(createInput);
    }
  };

  const handleConfirmToggle = async () => {
    if (!selectedStaffForToggle) return;
    await updateMutation.mutateAsync({
      id: selectedStaffForToggle.id,
      input: { isActive: !selectedStaffForToggle.isActive },
    });
    setSelectedStaffForToggle(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStaffForDelete) return;
    await deleteMutation.mutateAsync(selectedStaffForDelete.id);
    setSelectedStaffForDelete(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Halaman */}
      <StaffHeader />

      {/* 2. Toolbar di Atas Card: Search Bar Sejajar Refresh & Tambah Pengguna */}
      <StaffToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={refetch}
        isRefreshing={isFetching}
        onAddStaff={handleOpenAdd}
      />

      {/* State Loading */}
      {isLoading && (
        <div className="w-full py-16 flex flex-col items-center justify-center text-slate-500 gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-slate-400" />
          <p className="text-xs font-medium">Memuat data akun pengguna...</p>
        </div>
      )}

      {/* State Error */}
      {isError && (
        <div className="w-full p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>Gagal memuat data staf. Pastikan Anda memiliki hak akses Owner.</span>
        </div>
      )}

      {/* State Database Kosong (Tanpa Pencarian) */}
      {!isLoading && !isError && staffList.length === 0 && (
        <div className="w-full py-16 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-6 text-center">
          <Users className="w-10 h-10 stroke-[1.5] text-slate-300 mb-2" />
          <h3 className="text-sm font-semibold text-slate-700">Belum Ada Akun Staf</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Klik tombol &quot;+ Tambah Pengguna&quot; di atas untuk mendaftarkan akun staf
            resepsionis atau manajer baru.
          </p>
        </div>
      )}

      {/* State Hasil Pencarian Kosong */}
      {!isLoading && !isError && staffList.length > 0 && filteredStaffList.length === 0 && (
        <div className="w-full py-14 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white p-6 text-center shadow-2xs">
          <Users className="w-10 h-10 stroke-[1.5] text-slate-300 mb-2" />
          <h3 className="text-sm font-semibold text-slate-700">Akun Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Tidak ada akun staf dengan username atau nama yang cocok dengan &quot;{searchQuery}
            &quot;.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs font-medium text-[#3c315b] hover:underline cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Grid Kartu Pengguna Responsif Penuh */}
      {!isLoading && !isError && filteredStaffList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {filteredStaffList.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              isCurrentUser={staff.id === currentUser?.id}
              onEdit={handleOpenEdit}
              onToggleActive={(target) => setSelectedStaffForToggle(target)}
              onDelete={(target) => setSelectedStaffForDelete(target)}
            />
          ))}
        </div>
      )}

      {/* Modal Form Tambah / Edit */}
      <StaffFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedStaffForEdit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Modal Konfirmasi Toggle Aktif */}
      <StaffToggleActiveModal
        isOpen={Boolean(selectedStaffForToggle)}
        onClose={() => setSelectedStaffForToggle(null)}
        onConfirm={handleConfirmToggle}
        staff={selectedStaffForToggle}
        isLoading={updateMutation.isPending}
      />

      {/* Modal Konfirmasi Hapus Akun */}
      <StaffDeleteModal
        isOpen={Boolean(selectedStaffForDelete)}
        onClose={() => setSelectedStaffForDelete(null)}
        onConfirm={handleConfirmDelete}
        staff={selectedStaffForDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
