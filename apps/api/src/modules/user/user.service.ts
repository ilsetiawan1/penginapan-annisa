import type { CreateUserInput, UpdateUserInput } from "@annisa/types";
import { HTTP_STATUS } from "../../constants";
import { AppError } from "../../middlewares/error.middleware";
import { type UserRepository, userRepository } from "./user.repository";

export class UserService {
  private repo: UserRepository;

  constructor(repo?: UserRepository) {
    this.repo = repo ?? userRepository;
  }

  async getAllUsers() {
    return this.repo.findAll();
  }

  async getUserById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new AppError("Pengguna tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }

  async createUser(input: CreateUserInput) {
    const email = input.email.toLowerCase().trim();
    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw new AppError("Email sudah terdaftar. Gunakan email lain.", HTTP_STATUS.BAD_REQUEST);
    }

    const passwordHash = await Bun.password.hash(input.password);

    return this.repo.create({
      name: input.name.trim(),
      email,
      passwordHash,
      role: input.role,
      isActive: true,
    });
  }

  async updateUser(targetId: string, currentUserId: string, input: UpdateUserInput) {
    const target = await this.repo.findByIdWithPassword(targetId);
    if (!target) {
      throw new AppError("Pengguna tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    // Guardrail a: Self-Action Protection (dilarang menonaktifkan akun sendiri)
    if (currentUserId === targetId && input.isActive === false) {
      throw new AppError(
        "Anda tidak dapat menonaktifkan atau menghapus akun Anda sendiri.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    // Guardrail b: Last Standing Owner Rule (jika menonaktifkan atau menurunkan role owner terakhir)
    const isDeactivatingOwner = target.role === "owner" && input.isActive === false;
    const isDemotingOwner = target.role === "owner" && input.role && input.role !== "owner";

    if (isDeactivatingOwner || isDemotingOwner) {
      const activeOwners = await this.repo.countActiveOwners();
      if (activeOwners <= 1) {
        throw new AppError(
          "Tidak dapat menonaktifkan atau menghapus pemilik terakhir. Sistem wajib memiliki minimal 1 Owner aktif.",
          HTTP_STATUS.BAD_REQUEST,
        );
      }
    }

    const updatePayload: {
      name?: string;
      email?: string;
      passwordHash?: string;
      role?: string;
      isActive?: boolean;
    } = {};

    if (input.name !== undefined) {
      updatePayload.name = input.name.trim();
    }

    if (input.email !== undefined) {
      const normalizedEmail = input.email.toLowerCase().trim();
      if (normalizedEmail !== target.email) {
        const existing = await this.repo.findByEmail(normalizedEmail);
        if (existing && existing.id !== targetId) {
          throw new AppError("Email sudah digunakan oleh akun lain.", HTTP_STATUS.BAD_REQUEST);
        }
      }
      updatePayload.email = normalizedEmail;
    }

    if (input.password) {
      // Verifikasi kata sandi lama saat mengganti kata sandi akun sendiri atau jika oldPassword disertakan
      if (input.oldPassword || currentUserId === targetId) {
        if (!input.oldPassword) {
          throw new AppError("Kata sandi saat ini / lama wajib diisi.", HTTP_STATUS.BAD_REQUEST);
        }
        const isMatch = await Bun.password.verify(input.oldPassword, target.passwordHash);
        if (!isMatch) {
          throw new AppError("Kata sandi lama tidak sesuai.", HTTP_STATUS.BAD_REQUEST);
        }
      }
      updatePayload.passwordHash = await Bun.password.hash(input.password);
    }

    if (input.role !== undefined) {
      updatePayload.role = input.role;
    }

    if (input.isActive !== undefined) {
      updatePayload.isActive = input.isActive;
    }

    return this.repo.update(targetId, updatePayload);
  }

  async deleteUser(targetId: string, currentUserId: string) {
    const target = await this.repo.findById(targetId);
    if (!target) {
      throw new AppError("Pengguna tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    // Guardrail a: Self-Action Protection
    if (currentUserId === targetId) {
      throw new AppError(
        "Anda tidak dapat menonaktifkan atau menghapus akun Anda sendiri.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    // Guardrail b: Last Standing Owner Rule
    if (target.role === "owner") {
      const activeOwners = await this.repo.countActiveOwners();
      if (activeOwners <= 1) {
        throw new AppError(
          "Tidak dapat menonaktifkan atau menghapus pemilik terakhir. Sistem wajib memiliki minimal 1 Owner aktif.",
          HTTP_STATUS.BAD_REQUEST,
        );
      }
    }

    try {
      return await this.repo.delete(targetId);
    } catch (_error) {
      throw new AppError(
        "Gagal menghapus akun pengguna karena memiliki riwayat transaksi/reservasi.",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
  }
}

export const userService = new UserService();
