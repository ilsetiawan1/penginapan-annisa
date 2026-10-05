import type { UpdateSettingsInput } from "@annisa/types";
import { type SettingRepository, settingRepository } from "./setting.repository";

export class SettingService {
  private repo: SettingRepository;

  constructor(repo?: SettingRepository) {
    this.repo = repo ?? settingRepository;
  }

  async getAllSettings(): Promise<Record<string, string>> {
    return this.repo.getAll();
  }

  async updateSettings(input: UpdateSettingsInput): Promise<Record<string, string>> {
    return this.repo.batchUpdate(input);
  }
}

export const settingService = new SettingService();
