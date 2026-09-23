import { z } from "zod";

// ==========================================
// 1. SKEMA ZOD & TIPE INFER PENGGUNA (USERS & RBAC)
// ==========================================

export const userRoleSchema = z.enum(["owner", "staff"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  role: userRoleSchema,
  isActive: z.boolean().default(true),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});
export type User = z.infer<typeof userSchema>;

export const authSessionSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: userRoleSchema,
  }),
  token: z.string(),
});
export type AuthSession = z.infer<typeof authSessionSchema>;
export type AuthResponse = AuthSession;


export const loginInputSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
export type LoginInput = z.infer<typeof loginInputSchema>;

export const createUserInputSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: userRoleSchema.default("staff"),
});
export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: userRoleSchema.optional(),
  isActive: z.boolean().optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
