"use client";

import type { SystemSettings, UpdateSettingsInput } from "@annisa/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsApi } from "../api/settings.api";

export const SETTINGS_QUERY_KEY = ["system-settings"] as const;

export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281343438252",
  lodging_name: "Penginapan Annisa",
  airport_distance: "2-3 Menit dari Bandara Pattimura",
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
    placeholderData: DEFAULT_SYSTEM_SETTINGS,
    staleTime: 1000 * 30, // 30 detik
    refetchOnMount: true,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateSettingsInput) => settingsApi.updateSettings(input),
    onSuccess: (savedData) => {
      toast.success("Pengaturan sistem & nomor WhatsApp berhasil diperbarui ke database!");
      if (savedData) {
        queryClient.setQueryData(SETTINGS_QUERY_KEY, savedData);
      }
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menyimpan pengaturan sistem.");
    },
  });
}
