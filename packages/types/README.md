# 🏷️ Penginapan Annisa — Shared Types & Zod Contracts (`@annisa/types`) 📦

Package internal monorepo yang menjadi **Single Source of Truth** untuk seluruh kontrak tipe data TypeScript dan skema validasi **Zod v3 (`z.infer`)** antara Frontend (`apps/web`) dan Backend (`apps/api`).

---

## 🛠️ Features & Modular Structure

- **End-to-End Type Safety:** Skema Zod memvalidasi payload request di backend dan secara otomatis mengekspor tipe TypeScript murni via `z.infer`.
- **Modular per-Tabel:** Dipecah rapi per domain entitas dan disatukan via clean barrel export `index.ts`.
- **UI Props Friendly:** Komponen React frontend dapat langsung menggunakan tipe hasil inferensi Zod sebagai props.

```text
packages/types/src/
├── dto.ts               👉 Generic apiResponseSchema, ApiResponse<T>, paginatedResponseSchema
├── user.ts              👉 userSchema, userRoleSchema, loginInputSchema, createUserInputSchema + z.infer
├── room.ts              👉 roomSchema, roomTypeSchema, roomStatusSchema, updateRoomStatusInputSchema + z.infer
├── reservation.ts       👉 reservationSchema, guestSchema, createOnlineBookingInputSchema, walkInSchema + z.infer
├── souvenir.ts          👉 souvenirSchema, souvenirCategorySchema, posCheckoutInputSchema + z.infer
├── article.ts           👉 articleSchema, articleCategorySchema, createArticleInputSchema + z.infer
├── report.ts            👉 occupancyStatsSchema, dashboardOverviewStatsSchema, monthlyRevenueReportSchema + z.infer
└── index.ts             🎯 Clean Barrel Export (Re-export semua skema & tipe)
```

---

## ⚡ Development Commands

```bash
# Kompilasi pengecekan tipe TypeScript
bun run build
```

---

## 💻 Contoh Penggunaan

### 1. Di Backend Express (Validasi Request Payload)

```typescript
import {
  createWalkInBookingInputSchema,
  type CreateWalkInBookingInput,
} from "@annisa/types";

// Validasi runtime request body
const payload: CreateWalkInBookingInput = createWalkInBookingInputSchema.parse(
  req.body,
);
```

### 2. Di Frontend Next.js (Komponen UI & TanStack Query)

```typescript
import type { Room, ApiResponse } from "@annisa/types";

export function RoomCard({ room }: { room: Room }) {
  return (
    <div>
      <h3>Kamar #{room.roomNumber}</h3>
      <p>Status: {room.status}</p>
    </div>
  );
}
```
