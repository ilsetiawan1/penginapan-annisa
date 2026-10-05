"use client";

import type { CreateUserInput, UpdateUserInput } from "@annisa/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { staffApi } from "../api/staff.api";

export const STAFF_QUERY_KEY = ["staff-list"] as const;

export function useStaffList() {
  return useQuery({
    queryKey: STAFF_QUERY_KEY,
    queryFn: () => staffApi.getStaffList(),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => staffApi.createStaff(input),
    onSuccess: (data) => {
      toast.success(`Akun pengguna "${data.name}" berhasil dibuat!`);
      queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal membuat akun pengguna.");
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      staffApi.updateStaff(id, input),
    onSuccess: (data) => {
      toast.success(`Data akun "${data.name}" berhasil diperbarui!`);
      queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui data akun.");
    },
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffApi.deleteStaff(id),
    onSuccess: () => {
      toast.success("Akun pengguna berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: STAFF_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus akun pengguna.");
    },
  });
}
