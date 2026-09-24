import { Router } from "express";
import { loginInputSchema } from "@annisa/types";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authController } from "./auth.controller";
import "./auth.openapi"; // Register docs

const router = Router();

router.post(
  "/login",
  validateRequest({ body: loginInputSchema }),
  authController.login,
);

router.get("/me", authMiddleware, authController.getMe);
router.post("/logout", authController.logout);

router.get("/imagekit-auth", authMiddleware, authController.getImageKitAuth);
router.post("/r2-presigned-url", authMiddleware, authController.getR2PresignedUrl);

export const authRouter = router;
