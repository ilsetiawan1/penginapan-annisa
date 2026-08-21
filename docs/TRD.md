# ⚙️ Technical Requirements Document (TRD)
## Sistem Informasi Manajemen Operasional Kamar, Reservasi & Katalog Penginapan Annisa

---

| Dokumen | Spesifikasi Teknis |
| :--- | :--- |
| **Proyek** | Penginapan Annisa Management & Portal System |
| **Arsitektur Monorepo**| Bun Workspaces / Turborepo |
| **Frontend Framework**| Next.js 16 (App Router) + React 19 + Tailwind CSS + Lucide Icons |
| **Backend Framework** | Node.js / Bun + Express (REST API) / Next.js Server Actions |
| **Database & ORM**    | PostgreSQL (Neon.tech Serverless) + Prisma ORM v6 |
| **State & Data Fetch**| TanStack Query v5 + Zod + React Hook Form |
| **Pola Arsitektur**   | **Feature-Driven Architecture** (Frontend) & **3-Tier Repository Pattern** (Backend) |
| **Dokumentasi API**   | **Scalar Interactive API Reference** (`@scalar/express-api-reference`) + OpenAPI 3.1 |
| **Testing Runner**    | **Bun Test Runner** (`bun:test`) + Supertest |
| **Versi Dokumen**     | 1.1.0 (Technical Production Blueprint - Final) |

---

## 1. 🏗️ High-Level Monorepo Architecture

Sistem Penginapan Annisa menggunakan arsitektur **Monorepo** untuk memisahkan tanggung jawab antara Frontend UI, Backend API, dan Pustaka Bersama (*Shared Packages*).

```text
penginapan-annisa/
│
├── packages/                          👉 [ SHARED PACKAGES / INTERNAL LIBRARIES ]
│   │
│   ├── types/                         📦 Package Name: "@annisa/types"
│   │   ├── package.json               # Deklarasi internal package (export "./src/index.ts")
│   │   ├── tsconfig.json              # Konfigurasi TypeScript bersama
│   │   └── src/
│   │       └── index.ts               # 🔥 Kontrak Data Bersama (Room, Reservation, Souvenir, Article, User)
│   │
│   └── db/                            📦 Package Name: "@annisa/db"
│       ├── package.json               # Deklarasi Prisma ORM Client
│       ├── .env                       # DATABASE_URL="postgresql://..."
│       ├── prisma/
│       │   ├── schema.prisma          # 🔥 Skema Database Lengkap (Tabel, Relasi, Constraint)
│       │   ├── migrations/            # Riwayat migrasi SQL
│       │   └── seed.ts                # Data awal (Admin default, 8 unit kamar A1-B4, kategori)
│       └── src/
│           └── index.ts               # 🔥 Singleton Instance Prisma Client (export const db = new PrismaClient())
│
├── apps/
│   │
│   ├── web/                           👉 [ FRONTEND WEB APPLICATION (Next.js 16) ]
│   │   ├── package.json               # dependencies: { "@annisa/types": "workspace:*" }
│   │   ├── src/
│   │   │   ├── app/                   # App Router Pages (/, /kamar, /oleh-oleh, /artikel, /contact, /admin)
│   │   │   ├── components/            # Global UI Primitives (Button, Badge, Card, Modal, Navbar, Footer)
│   │   │   ├── lib/                   # Global Utilities (utils.ts, whatsapp.ts)
│   │   │   └── features/              # Dual-Zone Modules (public/ untuk Tamu & admin/ untuk Staf PMS)
│   │
│   └── api/                           👉 [ BACKEND REST API APPLICATION (Express / Bun) ]
│       ├── package.json               # dependencies: { "@annisa/types": "workspace:*", "@annisa/db": "workspace:*" }
│       ├── src/
│       │   ├── modules/               # Domain Modules (room, reservation, souvenir, article, auth)
│       │   ├── docs/                  # OpenAPI Specification generator
│       │   └── server.ts              # Entrypoint server & Scalar documentation
```

---

## 2. 📦 Frontend: Dual-Zone Feature-Driven Architecture (`apps/web`)

Struktur frontend dibagi secara **simetris dan tegas menjadi 2 Zona Utama** (*Public Portal vs Admin PMS*) untuk memastikan pemisahan tanggung jawab yang rapi, teratur, dan mudah di-maintain:

```text
apps/web/src/
│
├── components/                        👉 KOMPONEN GLOBAL & PRIMITIF (Re-usable di Publik & Admin)
│   ├── ui/                            # button.tsx, badge.tsx, card.tsx, dialog.tsx, input.tsx
│   └── layout/                        # navbar.tsx, footer.tsx, admin-sidebar.tsx
│
├── lib/                               👉 GLOBAL HELPERS & UTILITIES
│   ├── utils.ts                       # cn() Tailwind merger, formatRupiah(), formatDate()
│   └── whatsapp.ts                    # Generator URL & Template Pesan WhatsApp (Booking, Oleh-oleh, CS, Nota)
│
└── features/                          👉 DUAL-ZONE FEATURE MODULES
    │
    ├── public/                        🌐 [ ZONA 1: PORTAL PUBLIK TAMU (5 MENU) ]
    │   │
    │   ├── home/                      📦 MENU 1: BERANDA (/)
    │   │   └── components/            # HeroSection.tsx, BookingWidget.tsx, ValuesSection.tsx, FaqSection.tsx, LocationSection.tsx
    │   │
    │   ├── rooms/                     📦 MENU 2: TIPE KAMAR (/kamar)
    │   │   ├── components/            # RoomCard.tsx, RoomGrid.tsx, RoomFilter.tsx, RoomGuideCard.tsx
    │   │   ├── hooks/                 # useRooms.ts (TanStack Query fetch data kamar publik)
    │   │   └── services/              # roomApi.ts (Client API fetcher)
    │   │
    │   ├── souvenirs/                 📦 MENU 3: OLEH-OLEH (/oleh-oleh)
    │   │   ├── components/            # SouvenirCard.tsx, SouvenirGrid.tsx, SouvenirFilter.tsx, SouvenirGuideCard.tsx
    │   │   └── services/              # souvenirApi.ts
    │   │
    │   ├── articles/                  📦 MENU 4: ARTIKEL WISATA (/artikel)
    │   │   ├── components/            # ArticleCard.tsx, ExplorationCard.tsx, ArticleGrid.tsx, ArticleFilter.tsx
    │   │   └── services/              # articleApi.ts
    │   │
    │   └── contact/                   📦 MENU 5: KONTAK (/contact)
    │       └── components/            # ContactForm.tsx, ContactInfo.tsx, LocationMap.tsx
    │
    └── admin/                         👑 [ ZONA 2: PROPERTY MANAGEMENT SYSTEM (PMS STAF & OWNER) ]
        │
        ├── dashboard/                 📦 DASHBOARD UTAMA
        │   ├── components/            # StatsOverview.tsx, OccupancyMatrix.tsx
        │   ├── hooks/                 # useDashboardStats.ts
        │   └── services/              # dashboardApi.ts
        │
        ├── rooms/                     📦 MANAJEMEN KAMAR (CRUD & STATUS)
        │   ├── components/            # RoomMatrix4Colors.tsx, RoomStatusModal.tsx, RoomCrudForm.tsx
        │   ├── hooks/                 # useAdminRooms.ts (Mutasi 4 warna status)
        │   └── services/              # adminRoomApi.ts
        │
        ├── reservations/              📦 RESERVASI & FAST CHECK-IN
        │   ├── components/            # ReservationTable.tsx, DpConfirmModal.tsx, CheckinFastTrack.tsx
        │   ├── hooks/                 # useReservations.ts
        │   └── services/              # reservationApi.ts
        │
        ├── souvenirs/                 📦 MANAJEMEN OLEH-OLEH (CRUD)
        │   ├── components/            # SouvenirCrudTable.tsx, SouvenirFormModal.tsx
        │   ├── hooks/                 # useAdminSouvenirs.ts
        │   └── services/              # adminSouvenirApi.ts
        │
        ├── articles/                  📦 CMS ARTIKEL (CRUD)
        │   ├── components/            # ArticleCrudTable.tsx, RichTextEditor.tsx
        │   ├── hooks/                 # useAdminArticles.ts
        │   └── services/              # adminArticleApi.ts
        │
        └── reports/                   📦 LAPORAN KEUANGAN & OKUPANSI
            ├── components/            # MonthlyRevenueTable.tsx, ExportExcelButton.tsx
            └── services/              # reportApi.ts
```

---

## 3. ⚙️ Backend: 3-Tier Repository Pattern (`apps/api`)

Backend memisahkan logika ke dalam 3 lapisan (*Controller $\rightarrow$ Service $\rightarrow$ Repository*) untuk memastikan pengujian unit (*Unit Testing / Mocking*) yang mudah dan pemisahan tanggung jawab yang bersih.

```text
apps/api/src/modules/room/
│
├── room.routes.ts                     📦 Layer Routing (Express Router)
│                                      # Mendaftarkan path (GET /api/v1/rooms) & Middleware Auth
│
├── room.controller.ts                 📦 Layer Controller (HTTP Protocol)
│                                      # Menangkap request body/params, memanggil Service, return JSON
│
├── room.service.ts                    📦 Layer Service (Pure Business Logic)
│                                      # Validasi aturan bisnis, cek ketersediaan kamar, hitung DP 50%
│
└── room.repository.ts                 📦 Layer Repository (Database Access)
                                       # Menjalankan query Prisma ORM ke PostgreSQL
```

### 🔄 Diagram Alur Eksekusi:
```
[ Client Request ] ➔ [ room.routes.ts ] ➔ [ room.controller.ts ]
                                                   │
                                                   ▼
                                          [ room.service.ts ] ◄── (Logika Bisnis & Validasi)
                                                   │
                                                   ▼
                                         [ room.repository.ts ] ◄── (Prisma ORM: db.room.findMany)
                                                   │
                                                   ▼
                                        [ Neon.tech PostgreSQL ]
```

---

## 4. 🗄️ Database Schema & Data Models (`packages/db`)

Skema database PostgreSQL dikelola menggunakan Prisma ORM di `packages/db/prisma/schema.prisma`.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. PENGGUNA SISTEM (STAF & OWNER)
model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  passwordHash String        @map("password_hash")
  role         String        @default("staff") // 'owner' | 'staff'
  isActive     Boolean       @default(true) @map("is_active")
  createdAt    DateTime      @default(now()) @map("created_at")
  updatedAt    DateTime      @updatedAt @map("updated_at")

  reservations Reservation[]
  articles     Article[]

  @@map("users")
}

// 2. TIPE KAMAR & UNIT 8 KAMAR (A1-A4 & B1-B4)
model RoomType {
  id          String      @id @default(uuid())
  name        String      // "Tipe AC" | "Tipe Kipas"
  slug        String      @unique // "tipe-ac" | "tipe-kipas"
  description String?     @db.Text
  basePrice   Decimal     @map("base_price") @db.Decimal(12, 2) // 275000 / 200000
  capacity    Int         @default(3) // 2-3 orang
  bedType     String      @map("bed_type") // "1 Kasur Besar (Muat 2-3 Org)"
  facilities  String      @default("[]") // JSON: ["Kamar Mandi Dalam", "TV", "WiFi", "Handuk & Air Mineral"]
  images      RoomImage[]
  rooms       Room[]
  createdAt   DateTime    @default(now()) @map("created_at")

  @@map("room_types")
}

model Room {
  id           String        @id @default(uuid())
  roomTypeId   String        @map("room_type_id")
  roomNumber   String        @unique @map("room_number") // "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"
  building     String        @default("A") // "A" (Lokasi 1) | "B" (Lokasi 2)
  status       String        @default("ready") // 'ready' | 'occupied' | 'dirty' | 'maintenance'
  notes        String?
  createdAt    DateTime      @default(now()) @map("created_at")
  updatedAt    DateTime      @updatedAt @map("updated_at")

  roomType     RoomType      @relation(fields: [roomTypeId], references: [id], onDelete: Restrict)
  reservations Reservation[]

  @@map("rooms")
}

model RoomImage {
  id         String   @id @default(uuid())
  roomTypeId String   @map("room_type_id")
  imageUrl   String   @map("image_url")
  caption    String?
  isPrimary  Boolean  @default(false) @map("is_primary")
  createdAt  DateTime @default(now()) @map("created_at")

  roomType   RoomType @relation(fields: [roomTypeId], references: [id], onDelete: Cascade)

  @@map("room_images")
}

// 3. TAMU & OPERASIONAL RESERVASI (PMS)
model Guest {
  id           String        @id @default(uuid())
  name         String
  phone        String        // Nomor WhatsApp aktif
  email        String?
  idCardNumber String?       @map("id_card_number") // No KTP/Identitas
  address      String?
  createdAt    DateTime      @default(now()) @map("created_at")

  reservations Reservation[]

  @@map("guests")
}

model Reservation {
  id               String      @id @default(uuid())
  code             String      @unique // e.g. "ANNISA-202608-001"
  roomId           String      @map("room_id")
  guestId          String      @map("guest_id")
  userId           String?     @map("user_id") // Staf penerima
  checkInDate      DateTime    @map("check_in_date")
  checkOutDate     DateTime    @map("check_out_date")
  totalNights      Int         @default(1) @map("total_nights")
  roomRatePerNight Decimal     @map("room_rate_per_night") @db.Decimal(12, 2)
  grandTotal       Decimal     @map("grand_total") @db.Decimal(12, 2)
  dpAmount         Decimal     @default(0) @map("dp_amount") @db.Decimal(12, 2) // DP 50%
  remainingAmount  Decimal     @default(0) @map("remaining_amount") @db.Decimal(12, 2) // Sisa Pelunasan
  status           String      @default("confirmed") // 'pending_dp' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  paymentStatus    String      @default("unpaid") // 'unpaid' | 'dp_paid' | 'paid'
  paymentMethod    String      @default("cash") @map("payment_method") // 'cash' | 'transfer' | 'qris'
  notes            String?
  createdAt        DateTime    @default(now()) @map("created_at")
  updatedAt        DateTime    @updatedAt @map("updated_at")

  room             Room        @relation(fields: [roomId], references: [id])
  guest            Guest       @relation(fields: [guestId], references: [id])
  user             User?       @relation(fields: [userId], references: [id])

  @@map("reservations")
}

// 4. ETALASE OLEH-OLEH KHAS MALUKU
model SouvenirCategory {
  id        String     @id @default(uuid())
  name      String     // "Herbal & Minyak", "Camilan Sagu", "Kopi & Rempah", "Sambal & Bumbu"
  slug      String     @unique
  items     Souvenir[]

  @@map("souvenir_categories")
}

model Souvenir {
  id          String           @id @default(uuid())
  categoryId  String           @map("category_id")
  name        String           // "Minyak Kayu Putih Asli Namlea", "Kue Sagu Bagea Kenari", dll
  price       Decimal          @db.Decimal(12, 2)
  origin      String           @default("Ambon, Maluku")
  description String?          @db.Text
  imageUrl    String?          @map("image_url")
  isAvailable Boolean          @default(true) @map("is_available")
  createdAt   DateTime         @default(now()) @map("created_at")

  category    SouvenirCategory @relation(fields: [categoryId], references: [id])

  @@map("souvenirs")
}

// 5. CMS ARTIKEL PANDUAN WISATA & TRANSIT
model ArticleCategory {
  id       String    @id @default(uuid())
  name     String    // "Wisata Pantai", "Kuliner Khas", "Tips Transit", "Oleh-oleh"
  slug     String    @unique
  articles Article[]

  @@map("article_categories")
}

model Article {
  id          String          @id @default(uuid())
  categoryId  String          @map("category_id")
  authorId    String          @map("author_id")
  title       String
  slug        String          @unique
  summary     String          @db.Text
  content     String          @db.Text // Rich-Text / Markdown
  coverImage  String?         @map("cover_image")
  readTime    String          @default("3 Menit") @map("read_time")
  isPublished Boolean         @default(true) @map("is_published")
  views       Int             @default(0)
  createdAt   DateTime        @default(now()) @map("created_at")
  updatedAt   DateTime        @updatedAt @map("updated_at")

  category    ArticleCategory @relation(fields: [categoryId], references: [id])
  author      User            @relation(fields: [authorId], references: [id])

  @@map("articles")
}
```

---

## 5. 🔌 Shared Types Contract (`packages/types`)

Semua model TypeScript di-export secara terpusat di `@annisa/types`:

* `Room`, `RoomType`, `RoomStatus` (`ready` | `occupied` | `dirty` | `maintenance`)
* `Reservation`, `ReservationStatus`, `PaymentStatus`, `PaymentMethod`
* `Guest`, `User`, `UserRole` (`owner` | `staff`)
* `Souvenir`, `SouvenirCategory`
* `Article`, `ArticleCategory`
* `OccupancyStats` (Data agregat dashboard)

---

## 6. 🌐 API Endpoints Specification

| Method | Endpoint | Deskripsi | Akses |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/rooms` | Mengambil daftar 8 unit kamar & status terkini | Publik / Staf / Owner |
| `GET` | `/api/v1/rooms/:id` | Detail spesifik kamar | Publik / Staf / Owner |
| `PATCH` | `/api/v1/rooms/:id/status` | Update status kamar (4 warna) | Staf / Owner |
| `POST` | `/api/v1/reservations/walkin` | Check-in cepat tamu walk-in (< 1 menit) | Staf / Owner |
| `POST` | `/api/v1/reservations/confirm-dp` | Konfirmasi pembayaran DP 50% | Staf / Owner |
| `PATCH` | `/api/v1/reservations/:id/checkout` | Check-out 1-klik (kamar jadi *dirty*) | Staf / Owner |
| `GET` | `/api/v1/souvenirs` | Mengambil katalog oleh-oleh | Publik / Staf / Owner |
| `POST` | `/api/v1/souvenirs` | Tambah produk oleh-oleh baru | Owner |
| `GET` | `/api/v1/articles` | Mengambil artikel panduan wisata | Publik / Staf / Owner |
| `POST` | `/api/v1/articles` | Publikasi artikel baru | Owner |
| `GET` | `/api/v1/reports/monthly` | Rekapitulasi bulanan & omzet | Owner |

---

## 7. 📚 Interactive API Documentation (Scalar & OpenAPI 3.1)

Backend mengimplementasikan dokumentasi API interaktif modern menggunakan **Scalar** (`@scalar/express-api-reference`) yang di-generate otomatis dari skema Zod OpenAPI (`@asteasolutions/zod-to-openapi`).

### 🌐 Akses Endpoint Dokumentasi:
* **Interactive UI:** `http://localhost:4000/docs` (Scalar Modern Documentation UI)
* **Raw OpenAPI JSON Spec:** `http://localhost:4000/api-docs.json` (OpenAPI v3.1 Specification)

### 📦 Konfigurasi Integrasi Scalar (`apps/api/src/server.ts`):
```typescript
import { apiReference } from "@scalar/express-api-reference";
import express from "express";
import { openApiSpec } from "./docs/openapi";

const app = express();

// 1. Endpoint Raw JSON Spec
app.get("/api-docs.json", (req, res) => res.json(openApiSpec));

// 2. Interactive Scalar Documentation Dashboard
app.use(
  "/docs",
  apiReference({
    theme: "purple", // Tema modern elegan ungu Annisa
    spec: {
      url: "/api-docs.json",
    },
    metaData: {
      title: "Penginapan Annisa API Reference",
      description: "Dokumentasi RESTful API untuk Sistem Reservasi, PMS Kamar, dan Katalog Oleh-Oleh",
    },
  })
);
```

---

## 8. 🧪 Testing Strategy & Quality Assurance

Sistem Penginapan Annisa menerapkan strategi pengujian berlapis (*Testing Pyramid*) untuk menjamin keandalan sistem operasional kamar dan kalkulasi keuangan:

```text
               ▲
              / \     E2E Tests (Playwright) ➔ Alur Booking WA & Check-In Cepat
             /---\
            /     \   Integration Tests ➔ API Endpoint & Database Transaction
           /-------\
          /         \ Unit Tests (Bun Test) ➔ Service Business Logic & DP Calculator
         /-----------\
```

### A. Pembagian Layer Pengujian:

| Layer Testing | Target / Modul | Runner / Tools | Cakupan |
| :--- | :--- | :--- | :--- |
| **Unit Test** | `*.service.ts` | `bun:test` | Kalkulasi DP 50%, validasi tanggal check-in/out, konflik nomor kamar. |
| **Integration Test** | `*.routes.ts` & `*.repository.ts` | `bun:test` + `supertest` | Validasi response status HTTP (200, 201, 400, 404) dan Prisma query. |
| **Form & Hook Test** | `*.schema.ts` & `useRooms.ts` | `@testing-library/react` | Validasi input form Zod, parsing nomor HP WhatsApp Indonesia. |
| **E2E Smoke Test** | User Flow Booking & Walk-in | `Playwright` (Opsional) | Simulasi pemesanan tamu dari katalog hingga draf pesan WhatsApp. |

### B. Daftar Test Suites Kritis:
1. `apps/api/src/modules/room/__tests__/room.service.test.ts`:
   - [x] Harus memvalidasi status 4 warna kamar (`ready`, `occupied`, `dirty`, `maintenance`).
   - [x] Harus menolak pembuatan nomor kamar duplikat pada gedung yang sama.
2. `apps/api/src/modules/reservation/__tests__/reservation.service.test.ts`:
   - [x] Harus menghitung nilai DP tepat 50% dari total biaya kamar $\times$ jumlah malam.
   - [x] Harus otomatis mengubah status kamar menjadi `dirty` saat checkout selesai.
3. `apps/web/src/features/booking/__tests__/whatsapp-dispatcher.test.ts`:
   - [x] Harus memformat nomor HP internasional `0852...` ➔ `62852...` dan generate URL `wa.me` yang valid.

### C. Perintah Menjalankan Testing:
```bash
# Menjalankan seluruh test suite di Monorepo
bun test

# Menjalankan test dengan mode watch (TDD)
bun test --watch

# Menjalankan test spesifik modul reservasi
bun test apps/api/src/modules/reservation
```

---

## 9. 📱 Progressive Web App (PWA) & Mobile Viewport Configuration

Untuk mengunci tampilan antarmuka agar tidak mengalami *accidental pinch-to-zoom*, delay sentuhan, dan dapat di-install sebagai aplikasi mobile (*App-Like Experience*):

### A. Next.js 16 Viewport Export (`apps/web/src/app/layout.tsx`)
```typescript
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Mencegah zoom in/out liar di mobile browser
  themeColor: "#7e22ce", // Warna status bar HP (Ungu Annisa)
};
```

### B. Web App Manifest (`apps/web/src/app/manifest.ts`)
```typescript
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Penginapan Annisa Ambon",
    short_name: "Annisa PMS",
    description: "Sistem Manajemen Kamar Transit & Katalog Penginapan Annisa (750m Bandara Pattimura)",
    start_url: "/",
    display: "standalone", // Mode fullscreen tanpa address bar browser
    background_color: "#faf9fc",
    theme_color: "#7e22ce",
    icons: [
      {
        src: "/logo-penginapan-annisa.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-penginapan-annisa.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
```

