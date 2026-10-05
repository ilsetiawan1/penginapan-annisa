"use client";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { Article } from "@annisa/types";

interface ArticleDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  isPermanent?: boolean;
  isDeleting?: boolean;
  onConfirm: () => void;
}

export function ArticleDeleteModal({
  isOpen,
  onClose,
  article,
  isPermanent = false,
  isDeleting = false,
  onConfirm,
}: ArticleDeleteModalProps) {
  if (!article) return null;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={isDeleting}
      variant="danger"
      title={isPermanent ? "Hapus Permanen Artikel?" : "Pindahkan ke Sampah?"}
      confirmText={isPermanent ? "Hapus Permanen" : "Pindahkan ke Sampah"}
      cancelText="Batal"
      description={
        isPermanent ? (
          <>
            Apakah Anda yakin ingin menghapus permanen{" "}
            <span className="font-semibold text-slate-900">{article.title}</span>? Data akan dihapus
            selamanya dari database dan tidak dapat dipulihkan.
          </>
        ) : (
          <>
            Apakah Anda yakin ingin memindahkan{" "}
            <span className="font-semibold text-slate-900">{article.title}</span> ke folder sampah?
            Data tersimpan selama 30 hari sebelum dihapus permanen.
          </>
        )
      }
    />
  );
}
