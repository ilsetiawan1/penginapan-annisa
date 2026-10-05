import { createUserInputSchema, updateUserInputSchema, userSchema } from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("CreateUserInput", createUserInputSchema);
registry.register("UpdateUserInput", updateUserInputSchema);

// Endpoint 1: GET /api/v1/users
registry.registerPath({
  method: "get",
  path: "/api/v1/users",
  summary: "Ambil Seluruh Akun Pengguna / Staf",
  description: "Mengambil seluruh akun staf & owner (khusus role owner).",
  tags: ["1. Auth & Session"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Daftar akun pengguna berhasil diambil",
    },
    401: {
      description: "Unauthorized",
    },
    403: {
      description: "Forbidden (Hanya Owner yang berhak)",
    },
  },
});

// Endpoint 2: POST /api/v1/users
registry.registerPath({
  method: "post",
  path: "/api/v1/users",
  summary: "Buat Akun Pengguna Baru",
  description: "Mendaftarkan akun staf resepsionis atau owner baru.",
  tags: ["1. Auth & Session"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserInputSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Akun berhasil dibuat",
    },
    400: {
      description: "Validasi gagal atau email sudah terdaftar",
    },
  },
});

// Endpoint 3: PUT /api/v1/users/{id}
registry.registerPath({
  method: "put",
  path: "/api/v1/users/{id}",
  summary: "Perbarui Akun Pengguna",
  description: "Memperbarui nama, email, password, role, atau status aktif akun.",
  tags: ["1. Auth & Session"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateUserInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Akun berhasil diperbarui",
    },
    400: {
      description: "Self-action protection atau Last standing owner rule dilanggar",
    },
    404: {
      description: "Pengguna tidak ditemukan",
    },
  },
});

// Endpoint 4: DELETE /api/v1/users/{id}
registry.registerPath({
  method: "delete",
  path: "/api/v1/users/{id}",
  summary: "Hapus Akun Pengguna",
  description: "Menghapus akun pengguna dari sistem.",
  tags: ["1. Auth & Session"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Akun berhasil dihapus",
    },
    400: {
      description: "Self-action protection atau Last standing owner rule dilanggar",
    },
    404: {
      description: "Pengguna tidak ditemukan",
    },
  },
});
