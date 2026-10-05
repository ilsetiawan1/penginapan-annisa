import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/response.util";
import { type SettingService, settingService } from "./setting.service";

export class SettingController {
  private service: SettingService;

  constructor(service?: SettingService) {
    this.service = service ?? settingService;
  }

  getAllSettings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await this.service.getAllSettings();
      return sendSuccess(res, settings, "Konfigurasi sistem berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.service.updateSettings(req.body);
      return sendSuccess(res, updated, "Pengaturan sistem berhasil diperbarui!");
    } catch (error) {
      return next(error);
    }
  };
}

export const settingController = new SettingController();
