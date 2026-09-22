import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/response.util";
import { getImageKitAuthParams } from "../../utils/imagekit.util";
import { authService, type AuthService } from "./auth.service";

export class AuthController {
  private service: AuthService;

  constructor(service?: AuthService) {
    this.service = service ?? authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await this.service.login(req.body);
      return sendSuccess(res, session, "Login berhasil!");
    } catch (error) {
      return next(error);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const user = await this.service.getProfile(userId);
      return sendSuccess(res, user, "Data profil berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getImageKitAuth = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const authParams = getImageKitAuthParams();
      return sendSuccess(
        res,
        authParams,
        "ImageKit client upload token berhasil dibuat.",
      );
    } catch (error) {
      return next(error);
    }
  };
}

export const authController = new AuthController();
