import { z } from "zod";
import {
  souvenirSchema,
  souvenirCategorySchema,
  createSouvenirInputSchema,
  updateSouvenirInputSchema,
  posCheckoutInputSchema,
} from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("Souvenir", souvenirSchema);
registry.register("SouvenirCategory", souvenirCategorySchema);
registry.register("CreateSouvenirInput", createSouvenirInputSchema);
registry.register("UpdateSouvenirInput", updateSouvenirInputSchema);
registry.register("PosCheckoutInput", posCheckoutInputSchema);

// Endpoint 1: GET /api/v1/souvenirs
registry.registerPath({
  method: "get",
  path: "/api/v1/souvenirs",
  summary: "Ambil Katalog Oleh-Oleh Khas Ambon",
  description:
    "Mengambil etalase produk oleh-oleh khas Maluku (Minyak Kayu Putih Namlea, Kue Bagea Kenari, Kopi Rarobang, dsb) beserta stok kasir.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  request: {
    query: z.object({
      category: z
        .string()
        .optional()
        .openapi({ example: "minyak-kayu-putih-asli" }),
      isAvailable: z.enum(["true", "false"]).optional().openapi({ example: "true" }),
    }),
  },
  responses: {
    200: {
      description: "Katalog oleh-oleh berhasil diambil",
    },
  },
});

// Endpoint 2: GET /api/v1/souvenirs/categories
registry.registerPath({
  method: "get",
  path: "/api/v1/souvenirs/categories",
  summary: "Ambil Daftar Kategori Oleh-Oleh",
  description: "Mengambil kategori produk seperti Minyak Kayu Putih, Kue Khas, dan Minuman Rempah.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  responses: {
    200: {
      description: "Daftar kategori berhasil diambil",
    },
  },
});

// Endpoint 3: GET /api/v1/souvenirs/{id}
registry.registerPath({
  method: "get",
  path: "/api/v1/souvenirs/{id}",
  summary: "Ambil Detail 1 Produk Oleh-Oleh",
  description: "Mengambil detail harga, stok, dan deskripsi produk oleh-oleh.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Data produk berhasil diambil",
    },
    404: {
      description: "Produk tidak ditemukan",
    },
  },
});

// Endpoint 4: POST /api/v1/souvenirs/pos/checkout
registry.registerPath({
  method: "post",
  path: "/api/v1/souvenirs/pos/checkout",
  summary: "Transaksi Kasir POS & Pemotongan Stok Otomatis",
  description:
    "Memproses transaksi kasir resepsionis/toko oleh-oleh secara atomik. Sistem otomatis mengurangi stok produk dan menghitung kembalian.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: posCheckoutInputSchema,
          example: {
            items: [
              {
                souvenirId: "550e8400-e29b-41d4-a716-446655440000",
                quantity: 2,
              },
            ],
            paymentMethod: "cash",
            cashReceived: 150000,
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Transaksi kasir berhasil, stok dipotong",
    },
    400: {
      description: "Stok tidak mencukupi atau uang tunai kurang",
    },
  },
});

// Endpoint 5: POST /api/v1/souvenirs
registry.registerPath({
  method: "post",
  path: "/api/v1/souvenirs",
  summary: "Tambah Produk Oleh-Oleh Baru (Khusus Owner)",
  description: "Menambahkan produk oleh-oleh baru ke katalog dan inventaris kasir.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createSouvenirInputSchema,
          example: {
            categoryId: "550e8400-e29b-41d4-a716-446655440001",
            name: "Minyak Kayu Putih Asli Namlea 50ml",
            price: 35000,
            stock: 40,
            description: "Kemasan travel size praktis dibawa ke kabin pesawat.",
            imageUrl: "https://ik.imagekit.io/penginapanannisa/souvenirs/mkp-50ml.webp",
            isAvailable: true,
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Produk berhasil ditambahkan",
    },
    403: {
      description: "Forbidden — Hanya Owner yang berhak menambah produk",
    },
  },
});

// Endpoint 6: PUT /api/v1/souvenirs/{id}
registry.registerPath({
  method: "put",
  path: "/api/v1/souvenirs/{id}",
  summary: "Update Data / Stok Produk Oleh-Oleh (Khusus Owner)",
  description: "Memperbarui nama, harga, stok restock, atau foto produk.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateSouvenirInputSchema,
          example: {
            price: 70000,
            stock: 50,
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Produk berhasil diperbarui",
    },
  },
});

// Endpoint 7: DELETE /api/v1/souvenirs/{id}
registry.registerPath({
  method: "delete",
  path: "/api/v1/souvenirs/{id}",
  summary: "Hapus Produk Oleh-Oleh (Khusus Owner)",
  description: "Menghapus produk dari etalase kasir dan katalog.",
  tags: ["4. Kasir POS & Oleh-Oleh"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Produk berhasil dihapus",
    },
  },
});
