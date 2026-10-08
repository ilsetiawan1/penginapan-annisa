"use client";

import type { SystemSettings, UpdateSettingsInput } from "@annisa/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api/settings.api";

export const SETTINGS_QUERY_KEY = ["system-settings"] as const;

export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  whatsapp_number: "6281242163116",
  lodging_name: "Penginapan Annisa",
  airport_distance: "750m dari Bandara Pattimura",
  checkin_time: "14:00 WIT",
  checkout_time: "12:00 WIT",
  min_dp_percent: "50",
};

export function useSettings() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      try {
        const res = await settingsApi.getSettings();
        return res || DEFAULT_SYSTEM_SETTINGS;
      } catch {
        return DEFAULT_SYSTEM_SETTINGS;
      }
    },
    initialData: DEFAULT_SYSTEM_SETTINGS,
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: false,
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
