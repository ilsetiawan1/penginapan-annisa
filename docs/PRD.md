# 📘 Product Requirement Document (PRD) — Versi Final (Fase V1)
## Sistem Informasi Manajemen Operasional Kamar, Reservasi & Katalog Penginapan Annisa

---

| Dokumen | Spesifikasi |
| :--- | :--- |
| **Nama Proyek** | Sistem Informasi Manajemen Properti, Reservasi & Katalog Penginapan Annisa |
| **Pemilik Bisnis** | Penginapan Annisa (Penginapan Transit Dekat Bandara Pattimura — Ambon, Maluku) |
| **Lokasi Bisnis** | 📍 750 meter dari Bandara Internasional Pattimura Ambon ([Google Maps](https://maps.app.goo.gl/PskXAUZuGD7NeMoL7)) |
| **Target Pasar Utama**| Penumpang pesawat transit, pelancong dinas, wisatawan, & penumpang penerbangan pagi |
| **Tipe Sistem** | Web-based Property Management System (PMS) Ringan + Etalase Informasi Oleh-oleh & CMS Wisata |
| **Total Kapasitas** | **8 Unit Kamar** (4 Kamar AC @ Rp 275.000 + 4 Kamar Kipas @ Rp 200.000) |
| **Kebijakan Check-in** | **Fleksibel 24 Jam** (Check-in pagi misal 09:00 WIT langsung dihitung menginap s/d esok hari maks 12:00 WIT) |
| **Model Reservasi** | Non-Payment Gateway (Pemesanan Mandiri via WhatsApp + **DP 50% Transfer** + Pelunasan di Lokasi) |
| **Model Bukti Bayar** | Nota Digital WhatsApp 1-Klik (+ Kuitansi Fisik Resmi Manual Penginapan) |
| **Kontak WhatsApp** | **081242163116** (`6281242163116`) |
| **Produk Etalase** | Makanan Khas Maluku (*Kue Bagea, Roti Kenari, Halua Kenari*) & *Minyak Kayu Putih Asli Namlea/Ambon* |
| **Target Biaya Server**| **Rp 0 / bulan** (Memaksimalkan Free Tier: Vercel + Neon.tech PostgreSQL + Cloudinary CDN) |
| **Prinsip Utama UI** | **Super User-Friendly, Zero-Hardware Friction & Low Cognitive Load untuk Staf** |
| **Versi Dokumen** | 1.2.0 (100% Production Blueprint) |

---

## 1. 🎯 Latar Belakang & Nilai Keunggulan (Unique Value Proposition)

Penginapan Annisa memiliki keunggulan strategis yang sangat tinggi karena **berjarak hanya 750 meter (2–3 menit perjalanan) dari Bandara Internasional Pattimura Ambon**. 

### 1.1. Masalah Operasional yang Diselesaikan
1. **Pencatatan Kamar Masih Manual:** Sering memicu kebingungan ketersediaan kamar dan risiko *double booking* saat ada penumpang transit dadakan.
2. **Ketiadaan Saluran Informasi 24/7:** Calon tamu transit yang mencari penginapan terdekat dari bandara kesulitan mengecek ketersediaan kamar, foto fasilitas, dan harga secara transparan sebelum mendarat.
3. **Peluang Soft-Selling Terlewat:** Belum adanya media promosi untuk oleh-oleh khas Ambon (Minyak Kayu Putih, Kue Bagea, Kopi Rarobang) dan informasi wisata lokal bagi tamu yang memiliki waktu transit panjang.

### 1.2. Solusi Digital Bertahap (Fase V1)
* **Website Publik Responsif:** Menonjolkan pesan utama *"Penginapan Transit Terdekat dari Bandara Pattimura Ambon — 750m, Bebas Ketinggalan Pesawat"*.
* **Cek Ketersediaan & Booking Mandiri via WhatsApp:** Tamu memilih tanggal & tipe kamar $\rightarrow$ kirim draf pesanan rapi ke WhatsApp penginapan.
* **Kebijakan DP 50% Anti-Ghost Booking:** Tamu mentransfer DP 50% dan mengirim bukti transfer $\rightarrow$ staf klik 1 tombol konfirmasi di dashboard $\rightarrow$ kamar otomatis terkunci (*Booked*).
* **Core PMS Super Simpel:** Dashboard berbasis kartu warna (🟩 *Siap*, 🟦 *Terisi*, 🟨 *Perlu Bersih*, 🟥 *Perbaikan*) dengan alur check-in kilat < 1 menit.
* **Aturan Check-in Transit Ramah:** Fleksibilitas check-in kapan saja (misal tamu pagi mendarat jam 09.00 WIT langsung bisa masuk kamar jika kosong, batas check-out esok hari pukul 12.00 WIT).
* **Nota Digital WhatsApp 1-Klik:** Pengiriman bukti pembayaran resmi langsung ke nomor WhatsApp tamu tanpa repot kabel/printer thermal.

---

## 2. 🛏️ Inventaris Kamar & Kebijakan Tarif

Penginapan Annisa memiliki **8 unit kamar** dengan spesifikasi sebagai berikut:

| Tipe Kamar | Jumlah Unit | Fasilitas Utama | Kapasitas | Tarif / Malam | Ketentuan DP (50%) |
| :--- | :---: | :--- | :---: | :---: | :---: |
| **Kamar AC** | 4 Unit | AC Dingin, Kamar Mandi Dalam, WiFi Gratis, TV, Handuk Bersih | 2–3 Orang | **Rp 275.000** | **Rp 137.500** |
| **Kamar Kipas** | 4 Unit | Kipas Angin, Kamar Mandi Dalam, WiFi Gratis, TV, Handuk Bersih | 2–3 Orang | **Rp 200.000** | **Rp 100.000** |

### ⏰ Aturan Waktu Menginap
* **Waktu Check-in:** **Fleksibel (24 Jam)**. Tamu yang datang pagi (misal jam 09:00 WIT) diperbolehkan langsung check-in jika kamar berstatus *Ready/Siap Pakai*.
* **Waktu Check-out:** Maksimal pukul **12:00 WIT** pada tanggal kepulangan yang disepakati.

---

## 3. 👥 User Persona & Hak Akses (RBAC)

| Peran (Role) | Deskripsi | Hak Akses Utama |
| :--- | :--- | :--- |
| **Pengunjung / Tamu Transit** | Calon penumpang pesawat / wisatawan yang membutuhkan kamar transit. | Melihat katalog kamar & fasilitas, cek ketersediaan tanggal, kirim request booking ke WhatsApp, melihat etalase oleh-oleh, dan membaca artikel wisata Ambon. |
| **Staf Resepsionis & Housekeeping** | Staf operasional yang menerima tamu di lokasi dan menjaga kebersihan kamar. | Input tamu *walk-in* cepat, konfirmasi bukti DP 50%, ubah status *Check-in/Check-out*, update kebersihan kamar (*Ready $\leftrightarrow$ Dirty*), dan kirim nota digital ke WhatsApp tamu. |
| **Owner / Pengelola Utama (Admin)** | Pemilik penginapan dengan akses manajerial penuh. | Semua akses staf + manajemen kamar & tarif, manajemen foto Cloudinary, manajemen etalase oleh-oleh & CMS artikel, serta rekapitulasi laporan reservasi/keuangan. |

---

## 4. 🧩 Cakupan Modul & Spesifikasi Fitur (V1)

```
SISTEM PENGINAPAN ANNISA (FASE V1)
│
├── 1. PUBLIC PORTAL (TRANSIT GUEST EXPERIENCE)
│   ├── Hero Section: Jarak 750m ke Bandara Pattimura + Google Maps Badge
│   ├── Katalog 8 Kamar (4 AC & 4 Kipas) + Detail Fasilitas & Foto
│   ├── Smart Availability Checker (Pilih Tanggal Menginap)
│   ├── WhatsApp Booking Dispatcher (Draf Pesan Otomatis)
│   ├── Etalase Showcase Oleh-oleh Khas Ambon (Foto & Harga Panduan)
│   └── Portal Artikel Wisata & Kuliner Ambon
│
├── 2. PROPERTY MANAGEMENT SYSTEM (OPERASIONAL STAF)
│   ├── Dashboard Visual Kamar (Matrix / Card 8 Kamar dengan Status Warna)
│   ├── Fast-Track Walk-in Check-in (< 1 Menit)
│   ├── Manajemen DP 50% & Alur Konfirmasi Reservasi Online
│   ├── 1-Klik Check-out & Siklus Housekeeping (Tandai Kamar Bersih)
│   ├── Generator Nota Digital WhatsApp 1-Klik
│   └── Direktori Tamu & Riwayat Kunjungan
│
├── 3. CMS KONTEN & MEDIA
│   ├── Upload & Kompresi Foto Kamar (Cloudinary CDN)
│   ├── Manajemen Katalog Showcase Oleh-oleh
│   └── Rich-Text Editor Artikel Panduan Wisata Ambon
│
└── 4. LAPORAN & REKAPITULASI
    ├── Rekap Reservasi & Pendapatan Bulanan
    ├── Metrik Tingkat Okupansi Kamar (%)
    └── Ekspor Data Laporan ke Spreadsheet (Excel)
```

---

## 5. 🗺️ Alur Operasional & Reservasi Online (Step-by-Step)

### 5.1. Alur Reservasi Online Tamu & Konfirmasi DP 50%
```
[ TAMU DI WEBSITE ]
1. Buka web -> Pilih tanggal menginap -> Pilih Tipe Kamar (AC / Kipas)
2. Isi Nama & Nomor WhatsApp -> Klik [Kirim Booking via WhatsApp]
   │
   ▼
[ CHAT WHATSAPP ]
3. Tamu kirim draf pesan booking ke nomor WhatsApp resmi Penginapan Annisa
4. Staf kirim info rekening penginapan & nominal DP 50% (Rp 137.500 / Rp 100.000)
5. Tamu transfer DP & kirim bukti screenshot transfer ke WhatsApp
   │
   ▼
[ DASHBOARD STAF ]
6. Staf buka dashboard -> Masuk menu 'Reservasi' -> Klik [Konfirmasi DP Masuk]
   - Status berubah menjadi 'Booked / Confirmed' (Kamar otomatis terkunci)
   - Sistem mencatat sisa tagihan 50% yang harus dibayar saat tiba
7. Staf klik [Kirim Bukti Konfirmasi Booking ke WA Tamu]
   │
   ▼
[ HARI-H CHECK-IN ]
8. Tamu tiba -> Bayar sisa 50% -> Staf klik [Check-in] (Kamar jadi Terisi / Biru)
9. Staf klik [Kirim Bukti Lunas ke WA] / Berikan kuitansi fisik manual
```

### 5.2. Alur Tamu Datang Langsung (*Walk-in Receptionist*)
1. Tamu datang langsung ke meja resepsionis penginapan.
2. Staf melihat kamar yang berstatus **🟩 Hijau (Siap Pakai)** di dashboard.
3. Staf klik kamar tersebut $\rightarrow$ isi **Nama Tamu**, **No. WhatsApp**, dan **Jumlah Malam** $\rightarrow$ klik **[Simpan & Check-in]** (selesai dalam waktu < 1 menit).
4. Status kamar otomatis berubah menjadi **🟦 Biru (Terisi)**.

---

## 6. 🏗️ Arsitektur Teknologi & Infrastruktur

```
[ GUEST / PUBLIC MOBILE ]             [ RECEPTIONIST / OWNER ]
           │                                      │
           ▼                                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS 16 APP ROUTER                    │
│             (Vercel Global Edge & Serverless)               │
│                                                             │
│  ├── React 19 Client & Server Components                    │
│  ├── Tailwind CSS v3.4 + Radix UI + Lucide Icons            │
│  ├── TanStack Query v5 + React Hook Form + Zod              │
│  ├── Server Actions & Next.js REST Route Handlers           │
│  └── WhatsApp Dispatcher & Digital Receipt Generator        │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
       (Database Queries)               (Image Assets)
               │                               │
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│     NEON.TECH POSTGRESQL    │ │         CLOUDINARY          │
│   (Serverless Database)     │ │   (Image Storage & CDN)     │
│   Managed via Prisma ORM v6 │ │   WebP Auto Compression     │
└─────────────────────────────┘ └─────────────────────────────┘
```

---

## 7. 🗄️ Skema Database Relasional (Prisma Blueprint V1)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. PENGGUNA SISTEM (STAF & ADMIN)
model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  passwordHash String        @map("password_hash")
  role         String        @default("staff") // 'admin' | 'staff'
  isActive     Boolean       @default(true) @map("is_active")
  createdAt    DateTime      @default(now()) @map("created_at")
  updatedAt    DateTime      @updatedAt @map("updated_at")

  reservations Reservation[]
  articles     Article[]

  @@map("users")
}

// 2. TIPE KAMAR & UNIT 8 KAMAR
model RoomType {
  id          String      @id @default(uuid())
  name        String      // "Kamar AC", "Kamar Kipas"
  slug        String      @unique // "kamar-ac", "kamar-kipas"
  description String?     @db.Text
  basePrice   Decimal     @map("base_price") @db.Decimal(12, 2) // 275000 / 200000
  capacity    Int         @default(3) // 2-3 orang
  bedType     String      @map("bed_type") // "1 King Bed" / "1 Double Bed + Extra"
  facilities  String      @default("[]") // JSON: ["Kamar Mandi Dalam", "AC / Kipas", "WiFi Gratis", "TV", "Handuk"]
  images      RoomImage[]
  rooms       Room[]
  createdAt   DateTime    @default(now()) @map("created_at")

  @@map("room_types")
}

model Room {
  id           String        @id @default(uuid())
  roomTypeId   String        @map("room_type_id")
  roomNumber   String        @unique @map("room_number") // "101", "102", "103", "104", "201", "202", "203", "204"
  floor        Int           @default(1)
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
  phone        String        // Nomor WhatsApp
  email        String?
  idCardNumber String?       @map("id_card_number") // No KTP/Paspor (opsional)
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

// 4. ETALASE OLEH-OLEH KHAS AMBON (SHOWCASE PUBLIK)
model SouvenirCategory {
  id        String     @id @default(uuid())
  name      String     // "Minyak Kayu Putih Asli", "Kue & Makanan Khas Maluku", "Kopi & Minuman Tradisional"
  slug      String     @unique
  items     Souvenir[]

  @@map("souvenir_categories")
}

model Souvenir {
  id          String           @id @default(uuid())
  categoryId  String           @map("category_id")
  name        String           // "Minyak Kayu Putih Asli Namlea/Ambon", "Kue Sagu Bagea Ambon", "Roti Kenari Khas Maluku", "Halua Kenari", "Kopi Rarobang"
  price       Decimal          @db.Decimal(12, 2)
  description String?          @db.Text
  imageUrl    String?          @map("image_url")
  isAvailable Boolean          @default(true) @map("is_available")
  createdAt   DateTime         @default(now()) @map("created_at")

  category    SouvenirCategory @relation(fields: [categoryId], references: [id])

  @@map("souvenirs")
}

// 5. CMS ARTIKEL WISATA & PANDUAN TRANSIT AMBON
model ArticleCategory {
  id       String    @id @default(uuid())
  name     String    // "Wisata Dekat Bandara", "Kuliner Khas Ambon", "Tips Transit Pesawat"
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

## 8. 🗓️ Rencana Fase Implementasi Proyek (7-Stage Workflow)

Untuk memastikan sistem memiliki antarmuka yang ramah pengguna (*user-friendly*), minim risiko rombak ulang kode (*re-work*), dan memiliki arsitektur yang solid, alur implementasi dibagi menjadi **7 Fase Terstruktur**:

```
[FASE 1] Setup & Instalasi Dependensi Inti (Monorepo FE, BE, Shared Packages)
   │
   ▼
[FASE 2] UI / Mockup / Frontend Statis (Design System, Prototype 8 Kamar & Public Portal)
   │
   ▼
[FASE 3] Database Design (Prisma Schema, ERD.md & Review Skema)
   │
   ▼
[FASE 4] Backend API & Scalar Docs (Domain Separation, Service-Repository, Port 4000/docs)
   │
   ▼
[FASE 5] Integrasi Frontend (TanStack Query + API Client + Form Actions)
   │
   ▼
[FASE 6] Testing Menyeluruh (Unit Test Bun, Validasi Booking & Anti-Double Booking)
   │
   ▼
[FASE 7] Deployment Cloud (Vercel Serverless + Neon PostgreSQL + Cloudinary)
   │
   ░░░░░ ROADMAP MASA DEPAN (FASE V2 - JIKA UMKM SUDAH SIAP) ░░░░░
   ▼
[FASE V2]: POS Kasir Retail Oleh-oleh, Stok Real-time & WebUSB Thermal
```

---

### 🟢 Fase 1: Setup Workspace & Instalasi Dependensi Inti
* Inisialisasi arsitektur **Bun Workspaces Monorepo** (`annisa-pms`):
  * `apps/web` (Next.js 16 App Router, React 19, Tailwind CSS, Radix UI, TanStack Query v5, Lucide Icons, Sonner).
  * `apps/api` (Express.js TS on Bun, Pino Logger, CORS, Zod OpenAPI, Scalar API Reference).
  * `packages/db` (Prisma ORM v6).
  * `packages/types` (Shared Data Contracts & Interfaces).
* Instalasi dependensi serentak dan konfigurasi environment file (`.env`).

---

### 🎨 Fase 2: UI / Mockup / Frontend Statis (Design System & Prototype)
* **Design System & Visual Guidelines:** Warna bertema *Warm Hospitality* (Warm Sand & Emerald), tipografi modern, kartu kamar kontras tinggi, dan tombol besar ramah layar sentuh HP.
* **Mockup Statis Dashboard Staf:**
  * Grid 8 Kamar dengan visual warna (*Hijau = Siap, Biru = Terisi, Kuning = Perlu Bersih, Merah = Perbaikan*).
  * Modal Form *Fast-Track Walk-in Check-in* (< 1 menit).
  * Alur visual 1-Klik *Check-out* & konfirmasi selesai dibersihkan (*Housekeeping*).
  * Preview format Nota Digital WhatsApp 1-Klik.
* **Mockup Statis Public Portal:**
  * Landing page hero: *"Penginapan Transit 750m dari Bandara Pattimura"*.
  * Widget interaktif cek ketersediaan kamar.
  * Halaman etalase showcase oleh-oleh khas Ambon (Minyak Kayu Putih, Kue Bagea, Roti Kenari).
  * Portal artikel panduan wisata Ambon.

---

### 🗄️ Fase 3: Database Design & Review Skema (ERD.md)
* Pembuatan skema database relasional di `packages/db/prisma/schema.prisma`.
* Pembuatan dokumentasi **`DATABASE_DESIGN.md`** dan diagram visual **`ERD.md`** di dalam repository.
* Review transparan bersama sebelum skema di-push ke PostgreSQL Neon.
* Pembuatan database seeder untuk 8 kamar Annisa, kategori oleh-oleh, dan akun staf/admin.

---

### ⚙️ Fase 4: Backend API & Scalar Documentation (Port 4000/docs)
* Implementasi modul REST API berbasis **Domain Separation** dan **Service-Repository Pattern**:
  * `🔐 /api/v1/auth` (Login Staf/Admin & JWT Middleware)
  * `🛏️ /api/v1/rooms` (Manajemen 8 kamar & update status kebersihan)
  * `📅 /api/v1/reservations` (Check ketersediaan tanggal, input walk-in, konfirmasi DP 50%, 1-klik check-out)
  * `👥 /api/v1/guests` (Direktori data tamu & riwayat menginap)
  * `🎁 /api/v1/souvenirs` (Katalog etalase oleh-oleh)
  * `📰 /api/v1/articles` (CMS artikel wisata)
* Dokumentasi interaktif via **Scalar API Reference** (`http://localhost:4000/docs`).

---

### 🔌 Fase 5: Integrasi Frontend & State Management
* Menghubungkan UI statis Next.js dengan Backend API menggunakan **TanStack React Query v5** dan *API Client*.
* Wiring form handling (*React Hook Form + Zod*), mutasi data kamar *real-time*, dan generator pesan WhatsApp dinamis.
* Sistem notifikasi toast interaktif (*Sonner*).

---

### 🧪 Fase 6: Testing & Quality Assurance
* Menjalankan unit testing otomatis via **Bun Test Runner** (`bun test`).
* Pengujian skenario kritis: Pencegahan *double booking* kamar pada tanggal yang sama dan validasi nominal DP 50%.
* Audit performa Lighthouse (Target skor > 90) dan kompatibilitas tampilan mobile browser.

---

### 🚀 Fase 7: Deployment Cloud (Serverless & Free Tier)
* Deploy Backend & Frontend ke platform **Vercel**.
* Menghubungkan database serverless **Neon.tech** (PostgreSQL).
* Setup media storage **Cloudinary** untuk aset gambar kamar & artikel.
* Konfigurasi domain kustom Penginapan Annisa.
* Serah terima dan panduan operasional ringkas untuk staf.
