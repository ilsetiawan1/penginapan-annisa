"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { souvenirsApi } from "@/lib/api/souvenirs.api";
import type {
  CreateSouvenirInput,
  PosCheckoutInput,
  SouvenirQuery,
  UpdateSouvenirInput,
} from "@annisa/types";
import { toast } from "sonner";

export const SOUVENIRS_QUERY_KEY = ["souvenirs"] as const;
export const SOUVENIR_CATEGORIES_QUERY_KEY = [
  "souvenir-categories",
] as const;

export function useSouvenirs(query?: SouvenirQuery) {
  return useQuery({
    queryKey: [...SOUVENIRS_QUERY_KEY, query],
    queryFn: () => souvenirsApi.getAllSouvenirs(query),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useSouvenirCategories() {
  return useQuery({
    queryKey: SOUVENIR_CATEGORIES_QUERY_KEY,
    queryFn: () => souvenirsApi.getAllCategories(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSouvenirById(id: string) {
  return useQuery({
    queryKey: [...SOUVENIRS_QUERY_KEY, id],
    queryFn: () => souvenirsApi.getSouvenirById(id),
    enabled: !!id,
  });
}

export function usePosCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: PosCheckoutInput) =>
      souvenirsApi.processPosCheckout(input),
    onSuccess: (receipt) => {
      toast.success(
        `Transaksi POS ${receipt.receiptNumber} berhasil! Stok telah terpotong otomatis.`,
      );
      queryClient.invalidateQueries({ queryKey: SOUVENIRS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal memproses transaksi kasir POS.";
      toast.error(msg);
    },
  });
}

export function useCreateSouvenir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSouvenirInput) =>
      souvenirsApi.createSouvenir(input),
    onSuccess: () => {
      toast.success("Produk oleh-oleh baru berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: SOUVENIRS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal menambahkan produk.";
      toast.error(msg);
    },
  });
}

export function useUpdateSouvenir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSouvenirInput }) =>
      souvenirsApi.updateSouvenir(id, input),
    onSuccess: () => {
      toast.success("Data produk berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: SOUVENIRS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal memperbarui produk.";
      toast.error(msg);
    },
  });
}

export function useDeleteSouvenir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => souvenirsApi.deleteSouvenir(id),
    onSuccess: () => {
      toast.success("Produk berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: SOUVENIRS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal menghapus produk.";
      toast.error(msg);
    },
  });
}
