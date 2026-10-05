import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants";
import { sendSuccess } from "../../utils/response.util";
import { type UserService, userService } from "./user.service";

export class UserController {
  private service: UserService;

  constructor(service?: UserService) {
    this.service = service ?? userService;
  }

  getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.getAllUsers();
      return sendSuccess(res, users, "Daftar pengguna berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const user = await this.service.getUserById(id);
      return sendSuccess(res, user, "Data pengguna berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.service.createUser(req.body);
      return sendSuccess(res, newUser, "Akun pengguna berhasil dibuat!", HTTP_STATUS.CREATED);
    } catch (error) {
      return next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const currentUserId = req.user?.id || "";
      const updatedUser = await this.service.updateUser(id, currentUserId, req.body);
      return sendSuccess(res, updatedUser, "Data pengguna berhasil diperbarui!");
    } catch (error) {
      return next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const currentUserId = req.user?.id || "";
      await this.service.deleteUser(id, currentUserId);
      return sendSuccess(res, null, "Akun pengguna berhasil dihapus.");
    } catch (error) {
      return next(error);
    }
  };
}

export const userController = new UserController();
