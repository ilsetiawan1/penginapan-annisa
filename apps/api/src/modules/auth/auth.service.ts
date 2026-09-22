import jwt from "jsonwebtoken";
import type { AuthSession, LoginInput } from "@annisa/types";
import { config } from "../../config";
import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../constants";
import { authRepository, type AuthRepository } from "./auth.repository";

export class AuthService {
  private repo: AuthRepository;

  constructor(repo?: AuthRepository) {
    this.repo = repo ?? authRepository;
  }

  async login(input: LoginInput): Promise<AuthSession> {
    const user = await this.repo.findByEmail(input.email.toLowerCase().trim());
    if (!user) {
      throw new AppError("Email atau password salah.", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.isActive) {
      throw new AppError(
        "Akun Anda dinonaktifkan. Silakan hubungi Owner.",
        HTTP_STATUS.FORBIDDEN,
      );
    }

    // Verify password with Bun Native password verifier
    const isPasswordValid = await Bun.password.verify(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError("Email atau password salah.", HTTP_STATUS.UNAUTHORIZED);
    }

    // Sign JWT Token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as "owner" | "staff",
      },
      token,
    };
  }

  async getProfile(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) {
      throw new AppError("Pengguna tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }
}

export const authService = new AuthService();
