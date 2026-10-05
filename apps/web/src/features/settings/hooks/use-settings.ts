"use client";

import type { UpdateSettingsInput } from "@annisa/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api/settings.api";

export const SETTINGS_QUERY_KEY = ["system-settings"] as const;

export function useSettings() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: () => settingsApi.getSettings(),
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateSettingsInput) => settingsApi.updateSettings(input),
    onSuccess: () => {
      toast.success("Pengaturan sistem & nomor WhatsApp berhasil diperbarui ke database!");
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menyimpan pengaturan sistem.");
    },
  });
}
