import { createUserInputSchema, updateUserInputSchema } from "@annisa/types";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { userController } from "./user.controller";
import "./user.openapi";

const router = Router();

// Seluruh rute manajemen pengguna membutuhkan autentikasi dan role owner
router.use(authMiddleware, requireRole("owner"));

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validateRequest({ body: createUserInputSchema }), userController.createUser);
router.put("/:id", validateRequest({ body: updateUserInputSchema }), userController.updateUser);
router.patch("/:id", validateRequest({ body: updateUserInputSchema }), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
