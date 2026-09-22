# 🏨 Penginapan Annisa — Express REST API (`apps/api`) ⚡

Backend REST API untuk **Penginapan Annisa PMS & Reservation System** yang berjalan secara cepat dan ringan menggunakan **TypeScript** pada **Bun Runtime**.

---

## 🛠️ Features & Stack

- **Framework:** Express.js + TypeScript (Port 4000)
- **Runtime:** Bun 1.3+
- **Architecture:** 3-Tier Layered Repository Pattern (`routes` $\rightarrow$ `controller` $\rightarrow$ `service` $\rightarrow$ `repository`)
- **Logger:** Pino Logger (`pino-http` + `pino-pretty`)
- **Database:** Prisma ORM v6 + PostgreSQL (Lokal / Self-Hosted VPS)
- **Validation & OpenAPI:** Zod v3 + `@asteasolutions/zod-to-openapi`
- **Media Storage:** ImageKit.io CDN SDK (Auto-WebP, 24/7 Always Active)
- **Auth:** Bun Native Password Hashing (`Bun.password.hash`) + JWT (`jsonwebtoken`)
- **Documentation:** Scalar API Reference (`@scalar/express-api-reference`) pada `/docs`
- **Testing:** Bun Native Test Runner (`bun test`)

---

## ⚡ Development Commands

```bash
# Jalankan Dev Server Monorepo (Port 3000 & 4000)
bun dev

# Jalankan API saja dari root monorepo
bun dev:api

# Tes Kompilasi TypeScript
bun run build

# Menjalankan Seluruh Unit Tests
bun test
```

---

## 🔑 Default Accounts (Seeded Demo Credentials)

Gunakan akun berikut untuk login ke PMS dan mencoba endpoint autentikasi:

| Role        | Email                         | Password   | Akses & Izin                                                |
| :---------- | :---------------------------- | :--------- | :---------------------------------------------------------- |
| **Owner**   | `owner@penginapan-annisa.com` | `admin123` | Akses penuh: Laporan omzet, ubah tarif, kelola produk & CMS |
| **Staff**   | `staff@penginapan-annisa.com` | `staff123` | Akses operasional: Matriks kamar, reservasi, & kasir POS    |

---

## 📖 Interactive OpenAPI Docs (Scalar UI)

Buka browser di:
👉 **`http://localhost:4000/docs`**

Atau ambil format JSON OpenAPI spesifikasi dinamis:
👉 **`http://localhost:4000/docs.json`**

---

## 📡 Rincian API Endpoints & Query Filters

### 🔐 Auth Domain (`/api/v1/auth`)

| Method | Endpoint             | Deskripsi                               | Roles         |
| :----- | :------------------- | :-------------------------------------- | :------------ |
| `POST` | `/api/v1/auth/login` | Login Staf / Owner & Dapatkan JWT Token | Public        |
| `GET`  | `/api/v1/auth/me`    | Ambil Profil Sesi Pengguna Aktif        | Authenticated |

### 🏨 Rooms Domain (`/api/v1/rooms`)

| Method  | Endpoint                     | Deskripsi & Query Filters                                             | Roles          |
| :------ | :--------------------------- | :-------------------------------------------------------------------- | :------------- |
| `GET`   | `/api/v1/rooms`              | Ambil daftar 8 unit kamar (A1–A4 & B1–B4)                             | Public / Staff |
|         |                              | `?building=A\|B` : Filter bangunan                                    |                |
|         |                              | `?status=ready\|occupied\|booked\|dirty\|maintenance` : Filter status |                |
| `GET`   | `/api/v1/rooms/:code`        | Detail unit kamar berdasarkan nomor kamar (e.g. `A1`, `B2`)           | Public / Staff |
| `PATCH` | `/api/v1/rooms/:code/status` | Ubah status kebersihan/kesiapan kamar                                 | Staff / Owner  |
| `PUT`   | `/api/v1/rooms/types/:id`    | Update tarif kamar dan fasilitas                                      | Owner          |

### 📅 Reservations Domain (`/api/v1/reservations`)

| Method  | Endpoint                              | Deskripsi & Query Filters                                                | Roles          |
| :------ | :------------------------------------ | :----------------------------------------------------------------------- | :------------- |
| `GET`   | `/api/v1/reservations`                | Ambil riwayat reservasi terpaginasi                                      | Staff / Owner  |
|         |                                       | `?status=pending_dp\|confirmed\|checked_in\|checked_out` : Filter status |                |
|         |                                       | `?search=Hendra` : Filter pencarian nama tamu / WhatsApp                 |                |
|         |                                       | `?startDate=2026-09-01&endDate=2026-09-30` : Filter tanggal              |                |
| `POST`  | `/api/v1/reservations/booking`        | Buat draft reservasi mandiri WhatsApp (+ DP 50%)                         | Public / Staff |
| `POST`  | `/api/v1/reservations/walkin`         | Fast-Track Check-in Tamu Datang Langsung (< 1 Menit)                     | Staff / Owner  |
| `PATCH` | `/api/v1/reservations/:id/confirm-dp` | Konfirmasi bukti transfer DP 50% $\rightarrow$ Kamar Terkunci (_Booked_) | Staff / Owner  |
| `PATCH` | `/api/v1/reservations/:id/checkin`    | Pelunasan sisa 50% & Check-in resmi tamu tiba                            | Staff / Owner  |
| `PATCH` | `/api/v1/reservations/:id/checkout`   | Check-out tamu $\rightarrow$ Kamar otomatis beralih ke _Dirty_           | Staff / Owner  |
| `GET`   | `/api/v1/reservations/:id/receipt`    | Ambil data kuitansi digital & pesan nota WhatsApp                        | Staff / Owner  |

### 🛍️ Souvenirs POS Domain (`/api/v1/souvenirs`)

| Method   | Endpoint                         | Deskripsi & Query Filters                            | Roles          |
| :------- | :------------------------------- | :--------------------------------------------------- | :------------- |
| `GET`    | `/api/v1/souvenirs`              | Ambil katalog produk oleh-oleh & stok kasir          | Public / Staff |
|          |                                  | `?category=minyak-kayu-putih-asli` : Filter kategori |                |
| `POST`   | `/api/v1/souvenirs/pos/checkout` | Transaksi kasir POS & pemotongan stok otomatis       | Staff / Owner  |
| `POST`   | `/api/v1/souvenirs`              | Tambah produk oleh-oleh baru                         | Owner          |
| `PUT`    | `/api/v1/souvenirs/:id`          | Update nama, harga, stok, & foto ImageKit            | Owner          |
| `DELETE` | `/api/v1/souvenirs/:id`          | Hapus produk dari etalase kasir                      | Owner          |

### 📰 Articles Domain (`/api/v1/articles`)

| Method   | Endpoint                 | Deskripsi                                       | Roles  |
| :------- | :----------------------- | :---------------------------------------------- | :----- |
| `GET`    | `/api/v1/articles`       | Ambil daftar artikel wisata terpublikasi        | Public |
| `GET`    | `/api/v1/articles/:slug` | Baca isi lengkap artikel & auto increment views | Public |
| `POST`   | `/api/v1/articles`       | Publikasi artikel panduan wisata baru           | Owner  |
| `PUT`    | `/api/v1/articles/:id`   | Edit konten artikel & cover ImageKit            | Owner  |
| `DELETE` | `/api/v1/articles/:id`   | Hapus artikel dari CMS                          | Owner  |

### 📊 Reports & Analytics Domain (`/api/v1/reports`)

| Method | Endpoint                          | Deskripsi                                             | Roles         |
| :----- | :-------------------------------- | :---------------------------------------------------- | :------------ |
| `GET`  | `/api/v1/reports/dashboard-stats` | Ringkasan metrik okupansi kamar & tamu hari ini       | Staff / Owner |
| `GET`  | `/api/v1/reports/monthly-revenue` | Rekapitulasi omzet sewa kamar & kasir oleh-oleh       | Owner         |
| `GET`  | `/api/v1/reports/export`          | Ekspor rekap keuangan & data tamu ke format Excel/CSV | Owner         |
