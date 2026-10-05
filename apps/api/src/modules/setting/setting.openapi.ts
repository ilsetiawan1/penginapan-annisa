import { systemSettingsSchema, updateSettingsInputSchema } from "@annisa/types";
import { registry } from "../../docs/openapi";

registry.register("SystemSettings", systemSettingsSchema);
registry.register("UpdateSettingsInput", updateSettingsInputSchema);

// Endpoint 1: GET /api/v1/settings
registry.registerPath({
  method: "get",
  path: "/api/v1/settings",
  summary: "Ambil Seluruh Pengaturan Sistem (Publik)",
  description:
    "Mengambil konfigurasi identitas penginapan, nomor WhatsApp resmi, dan parameter operasional.",
  tags: ["6. Pengaturan & Sistem"],
  responses: {
    200: {
      description: "Konfigurasi berhasil diambil",
    },
  },
});

// Endpoint 2: PUT /api/v1/settings
registry.registerPath({
  method: "put",
  path: "/api/v1/settings",
  summary: "Perbarui Pengaturan Sistem (Khusus Owner)",
  description:
    "Memperbarui konfigurasi nomor WhatsApp, nama penginapan, dan parameter operasional properti.",
  tags: ["6. Pengaturan & Sistem"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateSettingsInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Pengaturan berhasil diperbarui",
    },
    401: {
      description: "Unauthorized",
    },
    403: {
      description: "Forbidden (Hanya Owner yang berhak)",
    },
  },
});
