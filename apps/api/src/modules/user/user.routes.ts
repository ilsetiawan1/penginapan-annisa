import { createUserInputSchema, updateUserInputSchema } from "@annisa/types";
import { type NextFunction, type Request, type Response, Router } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../constants";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { userController } from "./user.controller";
import "./user.openapi";

const router = Router();

// Seluruh rute manajemen pengguna membutuhkan autentikasi
router.use(authMiddleware);

// Middleware khusus: Izinkan jika role Owner ATAU pengguna sedang mengupdate akunnya sendiri
const allowOwnerOrSelf = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }
  if (req.user.role === "owner" || req.user.id === req.params.id) {
    return next();
  }
  return res.status(HTTP_STATUS.FORBIDDEN).json({
    success: false,
    error: ERROR_MESSAGES.FORBIDDEN,
  });
};

router.get("/", requireRole("owner"), userController.getAllUsers);
router.get("/:id", requireRole("owner"), userController.getUserById);
router.post(
  "/",
  requireRole("owner"),
  validateRequest({ body: createUserInputSchema }),
  userController.createUser,
);
router.put(
  "/:id",
  allowOwnerOrSelf,
  validateRequest({ body: updateUserInputSchema }),
  userController.updateUser,
);
router.patch(
  "/:id",
  allowOwnerOrSelf,
  validateRequest({ body: updateUserInputSchema }),
  userController.updateUser,
);
router.delete("/:id", requireRole("owner"), userController.deleteUser);

export const userRouter = router;
