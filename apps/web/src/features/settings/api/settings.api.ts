import { apiClient } from "@/lib/api/client";
import type { SystemSettings, UpdateSettingsInput } from "@annisa/types";

export const settingsApi = {
  getSettings: async (): Promise<SystemSettings> => {
    return apiClient.get<SystemSettings>("/settings");
  },

  updateSettings: async (input: UpdateSettingsInput): Promise<SystemSettings> => {
    return apiClient.put<SystemSettings>("/settings", input);
  },
};
