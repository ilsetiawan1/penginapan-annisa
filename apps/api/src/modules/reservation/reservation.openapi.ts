import { z } from "zod";
import {
  reservationSchema,
  guestSchema,
  createOnlineBookingInputSchema,
  createWalkInBookingInputSchema,
  confirmDpInputSchema,
  checkInInputSchema,
  checkOutInputSchema,
} from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("Reservation", reservationSchema);
registry.register("Guest", guestSchema);
registry.register("CreateOnlineBookingInput", createOnlineBookingInputSchema);
registry.register("CreateWalkInBookingInput", createWalkInBookingInputSchema);
registry.register("ConfirmDpInput", confirmDpInputSchema);
registry.register("CheckInInput", checkInInputSchema);
registry.register("CheckOutInput", checkOutInputSchema);

// Endpoint 1: GET /api/v1/reservations
registry.registerPath({
  method: "get",
  path: "/api/v1/reservations",
  summary: "Ambil Riwayat & Daftar Reservasi (PMS)",
  description:
    "Mengambil daftar reservasi terpaginasi dengan filter status (pending_dp, confirmed, checked_in, checked_out), pencarian nama/WA tamu, dan rentang tanggal.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    query: z.object({
      status: z
        .enum(["pending_dp", "confirmed", "checked_in", "checked_out", "cancelled"])
        .optional()
        .openapi({ example: "confirmed" }),
      search: z.string().optional().openapi({ example: "Hendra" }),
      startDate: z.string().optional().openapi({ example: "2026-09-01" }),
      endDate: z.string().optional().openapi({ example: "2026-09-30" }),
      page: z.string().optional().openapi({ example: "1" }),
      limit: z.string().optional().openapi({ example: "10" }),
    }),
  },
  responses: {
    200: {
      description: "Daftar reservasi berhasil diambil",
    },
    401: {
      description: "Unauthorized",
    },
  },
});

// Endpoint 2: GET /api/v1/reservations/{id}
registry.registerPath({
  method: "get",
  path: "/api/v1/reservations/{id}",
  summary: "Ambil Detail 1 Reservasi",
  description: "Mengambil data detail reservasi lengkap dengan tamu dan kamar.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid().openapi({ example: "c28f3a1e-8f24-4f41-b84e-28b9d7c041f2" }),
    }),
  },
  responses: {
    200: {
      description: "Detail reservasi berhasil ditemukan",
    },
    404: {
      description: "Reservasi tidak ditemukan",
    },
  },
});

// Endpoint 3: POST /api/v1/reservations/booking
registry.registerPath({
  method: "post",
  path: "/api/v1/reservations/booking",
  summary: "Buat Draft Reservasi Online (Public / WhatsApp + DP 50%)",
  description:
    "Membuat pesanan mandiri tamu publik. Sistem otomatis memeriksa Anti-Double Booking, mengunci slot kamar, menghitung DP 50%, dan menghasilkan link WhatsApp.",
  tags: ["3. Reservasi & Check-In"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createOnlineBookingInputSchema,
          example: {
            roomTypeId: "ec3766e8-bbb3-4372-ba46-24b8b2a638a3", // ID Tipe AC
            guestName: "Bpk. Hendra Wijaya",
            guestPhone: "081234567890",
            guestEmail: "hendra.wijaya@gmail.com",
            checkInDate: "2026-09-25",
            checkOutDate: "2026-09-27",
            notes: "Tiba malam transit penerbangan Lion Air pagi",
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Draft booking berhasil dibuat",
    },
    409: {
      description: "Kamar penuh pada rentang tanggal tersebut",
    },
  },
});

// Endpoint 4: POST /api/v1/reservations/walkin
registry.registerPath({
  method: "post",
  path: "/api/v1/reservations/walkin",
  summary: "Fast-Track Walk-in Check-in (< 1 Menit)",
  description:
    "Pendaftaran tamu datang langsung (walk-in) oleh resepsionis. Status kamar langsung beralih ke 'occupied'.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createWalkInBookingInputSchema,
          example: {
            roomId: "358c831f-d527-4fb8-b14e-4e86f2bf0676", // ID Kamar A1
            guestName: "Ibu Rahmawati",
            guestPhone: "081122334455",
            idCardNumber: "8171012345670001",
            totalNights: 1,
            paymentMethod: "cash",
            isFullPayment: true,
            notes: "Tamu transit kapal feri",
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Check-in tamu walk-in berhasil",
    },
  },
});

// Endpoint 5: PATCH /api/v1/reservations/{id}/confirm-dp
registry.registerPath({
  method: "patch",
  path: "/api/v1/reservations/{id}/confirm-dp",
  summary: "Konfirmasi Bukti Transfer DP 50% (Kamar Terkunci 'Booked')",
  description:
    "Staf memvalidasi bukti transfer uang muka. Status booking beralih ke 'confirmed' dan kamar resmi berstatus 'booked'.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: confirmDpInputSchema,
          example: {
            dpAmount: 275000,
            paymentMethod: "transfer",
            notes: "Bukti transfer BCA valid diterima via WhatsApp",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "DP 50% berhasil dikonfirmasi",
    },
  },
});

// Endpoint 6: PATCH /api/v1/reservations/{id}/checkin
registry.registerPath({
  method: "patch",
  path: "/api/v1/reservations/{id}/checkin",
  summary: "Pelunasan Sisa & Check-In Tamu Tiba",
  description:
    "Tamu tiba di resepsionis, melunasi sisa tagihan, dan menerima kunci kamar. Status kamar beralih ke 'occupied'.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: checkInInputSchema,
          example: {
            paymentMethod: "cash",
            paidAmount: 275000,
            notes: "Pelunasan tunai di resepsionis",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Check-in berhasil",
    },
  },
});

// Endpoint 7: PATCH /api/v1/reservations/{id}/checkout
registry.registerPath({
  method: "patch",
  path: "/api/v1/reservations/{id}/checkout",
  summary: "Check-Out Tamu (Kamar Otomatis 'Dirty')",
  description:
    "Tamu check-out. Status reservasi menjadi 'checked_out' dan kamar otomatis dialihkan ke status 'dirty' untuk jadwal pembersihan tim housekeeping.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: checkOutInputSchema,
          example: {
            notes: "Kunci kamar A1 telah dikembalikan",
            markAsDirty: true,
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Check-out berhasil",
    },
  },
});

// Endpoint 8: GET /api/v1/reservations/{id}/receipt
registry.registerPath({
  method: "get",
  path: "/api/v1/reservations/{id}/receipt",
  summary: "Ambil Kuitansi Digital & Teks Nota WhatsApp",
  description:
    "Menghasilkan rincian kuitansi pembayaran resmi Penginapan Annisa untuk dicetak atau dikirim via WhatsApp.",
  tags: ["3. Reservasi & Check-In"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Data kuitansi berhasil digenerate",
    },
  },
});
