"use client";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { Souvenir } from "@annisa/types";

interface SouvenirDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Souvenir | null;
  isPermanent?: boolean;
  isDeleting?: boolean;
  onConfirm: () => void;
}

export function SouvenirDeleteModal({
  isOpen,
  onClose,
  product,
  isPermanent = false,
  isDeleting = false,
  onConfirm,
}: SouvenirDeleteModalProps) {
  if (!product) return null;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={isDeleting}
      variant="danger"
      title={isPermanent ? "Hapus Permanen Produk?" : "Pindahkan ke Sampah?"}
      confirmText={isPermanent ? "Hapus Permanen" : "Pindahkan ke Sampah"}
      cancelText="Batal"
      description={
        isPermanent ? (
          <>
            Apakah Anda yakin ingin menghapus permanen{" "}
            <span className="font-semibold text-slate-900">{product.name}</span>? Data akan dihapus
            selamanya dari database dan tidak dapat dipulihkan.
          </>
        ) : (
          <>
            Apakah Anda yakin ingin memindahkan{" "}
            <span className="font-semibold text-slate-900">{product.name}</span> ke folder sampah?
            Data tersimpan selama 30 hari sebelum dihapus permanen.
          </>
        )
      }
    />
  );
}
