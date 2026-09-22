import { z } from "zod";
import { loginInputSchema, userSchema, authSessionSchema } from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("LoginInput", loginInputSchema);
registry.register("User", userSchema);
registry.register("AuthSession", authSessionSchema);

// Endpoint 1: POST /api/v1/auth/login
registry.registerPath({
  method: "post",
  path: "/api/v1/auth/login",
  summary: "Login Staf / Owner PMS",
  description:
    "Autentikasi akun PMS Penginapan Annisa menggunakan Email dan Password. Mengembalikan JWT Bearer token.",
  tags: ["1. Auth & Session"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login berhasil, session & JWT token dikembalikan",
    },
    401: {
      description: "Email atau password salah",
    },
    403: {
      description: "Akun dinonaktifkan",
    },
  },
});

// Endpoint 2: GET /api/v1/auth/me
registry.registerPath({
  method: "get",
  path: "/api/v1/auth/me",
  summary: "Ambil Profil User Login",
  description: "Mengambil data detail staf/owner yang sedang aktif dari JWT token.",
  tags: ["1. Auth & Session"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Profil user berhasil diambil",
    },
    401: {
      description: "Unauthorized / Token tidak valid",
    },
  },
});

// Endpoint 3: GET /api/v1/auth/imagekit-auth
registry.registerPath({
  method: "get",
  path: "/api/v1/auth/imagekit-auth",
  summary: "Generate ImageKit Client Upload Token",
  description:
    "Menghasilkan token autentikasi client-side untuk upload gambar langsung ke ImageKit.io CDN.",
  tags: ["1. Auth & Session"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Token ImageKit berhasil digenerate",
    },
  },
});
