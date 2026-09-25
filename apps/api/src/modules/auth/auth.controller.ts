import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/response.util";
import { getImageKitAuthParams } from "../../utils/imagekit.util";
import { s3Client } from "../../utils/r2.util";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../../config";
import { authService, type AuthService } from "./auth.service";

export class AuthController {
  private service: AuthService;

  constructor(service?: AuthService) {
    this.service = service ?? authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await this.service.login(req.body);

      // Set httpOnly cookie untuk proteksi anti-XSS
      res.cookie("annisa_token", session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      });

      return sendSuccess(res, session, "Login berhasil!");
    } catch (error) {
      return next(error);
    }
  };

  logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("annisa_token");
      return sendSuccess(res, null, "Logout berhasil!");
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

  getR2PresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName, contentType } = req.body;
      if (!fileName || !contentType) {
        return res.status(400).json({ success: false, message: "fileName dan contentType wajib diisi." });
      }

      const command = new PutObjectCommand({
        Bucket: config.r2.bucketName,
        Key: fileName,
        ContentType: contentType,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      // Instead of returning the Cloudflare public URL directly which is often blocked by ISPs (e.g. Telkomsel),
      // we return a URL to our backend proxy which bypasses the block.
      const publicUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}/storage/view?key=${fileName}`;

      return sendSuccess(
        res,
        { presignedUrl, publicUrl },
        "R2 presigned URL berhasil dibuat."
      );
    } catch (error) {
      return next(error);
    }
  };
}

export const authController = new AuthController();
