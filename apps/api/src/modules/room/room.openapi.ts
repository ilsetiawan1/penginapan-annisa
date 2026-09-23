import { z } from "zod";
import {
  roomSchema,
  roomTypeSchema,
  updateRoomStatusInputSchema,
  updateRoomRateInputSchema,
} from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("Room", roomSchema);
registry.register("RoomType", roomTypeSchema);
registry.register("UpdateRoomStatusInput", updateRoomStatusInputSchema);
registry.register("UpdateRoomRateInput", updateRoomRateInputSchema);

// Endpoint 1: GET /api/v1/rooms
registry.registerPath({
  method: "get",
  path: "/api/v1/rooms",
  summary: "Ambil Daftar Semua Kamar (8 Unit A1-B4)",
  description:
    "Mengambil seluruh 8 unit kamar resmi Penginapan Annisa beserta tipe kamar, fasilitas, gambar, dan status saat ini (ready, occupied, booked, dirty, maintenance).",
  tags: ["2. Kamar & Tarif"],
  request: {
    query: z.object({
      building: z.enum(["A", "B"]).optional().openapi({ example: "A" }),
      status: z
        .enum(["ready", "occupied", "booked", "dirty", "maintenance"])
        .optional()
        .openapi({ example: "ready" }),
    }),
  },
  responses: {
    200: {
      description: "Daftar kamar berhasil diambil",
    },
  },
});

// Endpoint 2: GET /api/v1/rooms/{roomNumber}
registry.registerPath({
  method: "get",
  path: "/api/v1/rooms/{roomNumber}",
  summary: "Ambil Detail 1 Kamar berdasarkan Nomor",
  description: "Mengambil data detail unit kamar seperti A1, A2, B1, dst.",
  tags: ["2. Kamar & Tarif"],
  request: {
    params: z.object({
      roomNumber: z.string().openapi({ example: "A1" }),
    }),
  },
  responses: {
    200: {
      description: "Data kamar berhasil ditemukan",
    },
    404: {
      description: "Nomor kamar tidak ditemukan",
    },
  },
});

// Endpoint 3: PATCH /api/v1/rooms/{roomNumber}/status
registry.registerPath({
  method: "patch",
  path: "/api/v1/rooms/{roomNumber}/status",
  summary: "Update Status Kamar (Housekeeping / Matriks)",
  description:
    "Mengubah status kamar secara instan antara: ready (hijau), occupied (merah), booked (kuning), dirty (oranye/cokelat), maintenance (abu-abu).",
  tags: ["2. Kamar & Tarif"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      roomNumber: z.string().openapi({ example: "A1" }),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateRoomStatusInputSchema,
          example: {
            status: "dirty",
            notes: "Tamu baru saja checkout, kamar perlu dibersihkan staf",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Status kamar berhasil diperbarui",
    },
    400: {
      description: "Status tidak valid",
    },
    401: {
      description: "Unauthorized",
    },
  },
});

// Endpoint 4: GET /api/v1/rooms/types
registry.registerPath({
  method: "get",
  path: "/api/v1/rooms/types",
  summary: "Ambil Semua Tipe Kamar & Tarif (AC & Kipas)",
  description:
    "Mengambil informasi tipe kamar (Kamar Tipe AC @ Rp275.000, Kamar Tipe Kipas @ Rp200.000), fasilitas, dan foto galeri.",
  tags: ["2. Kamar & Tarif"],
  responses: {
    200: {
      description: "Daftar tipe kamar berhasil diambil",
    },
  },
});

// Endpoint 5: PUT /api/v1/rooms/types/{id}
registry.registerPath({
  method: "put",
  path: "/api/v1/rooms/types/{id}",
  summary: "Update Tarif & Fasilitas Tipe Kamar (Khusus Owner)",
  description:
    "Mengubah basePrice atau fasilitas kamar (misal kenaikan tarif high-season atau penambahan fasilitas baru).",
  tags: ["2. Kamar & Tarif"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({
        example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateRoomRateInputSchema,
          example: {
            basePrice: 285000,
            facilities: [
              "AC Dingin 1 PK",
              "Kamar Mandi Dalam Pribadi",
              "WiFi Gratis 50 Mbps",
              "TV LED 32 Inch",
              "Handuk Bersih & Sabun",
              "Air Mineral Gratis",
              "Sarapan Pagi Gratis (Promo Lebaran)",
            ],
            description:
              "Kamar sejuk dan nyaman dengan AC dingin, kamar mandi dalam pribadi, TV LED, dan WiFi kencang. Pilihan terbaik untuk istirahat tenang sebelum penerbangan pagi.",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Tarif & fasilitas tipe kamar berhasil diperbarui",
    },
    401: {
      description: "Unauthorized",
    },
    403: {
      description: "Forbidden — Hanya Owner yang memiliki izin mengubah tarif",
    },
  },
});
