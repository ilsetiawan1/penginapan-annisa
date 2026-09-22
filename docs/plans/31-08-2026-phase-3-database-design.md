# 📋 Plan: Fase 3 — Database Design (Prisma Schema, ERD & Seeder 8 Kamar)

**Tanggal:** 31 Agustus 2026  
**Status:** Ready to Implement 🎯  
**Referensi:** [PRD.md](../PRD.md) & [TRD.md](../TRD.md)

---

## 🎯 1. Tujuan & Latar Belakang

Fase 3 bertujuan untuk membangun dan mematangkan **fondasi arsitektur database relasional PostgreSQL** menggunakan **Prisma ORM (v6)** di dalam package internal `@annisa/db`.

Skema database harus mencerminkan 100% kebutuhan operasional **Penginapan Annisa** (8 Unit Kamar Transit, Alur Reservasi DP 50%, Kasir Oleh-Oleh, CMS Artikel Wisata, dan Hak Akses RBAC Owner/Staf).

---

## 🗺️ 2. Struktur Modul Database (`packages/db`)

```text
packages/db/
├── prisma/
│   ├── schema.prisma          # 🔥 Skema Database Lengkap (7 Model Entitas Utama)
│   ├── seed.ts                # 🌱 Data Seeder (Admin/Owner, 8 Unit Kamar A1–B4, Etalase, Kategori)
│   └── migrations/            # Riwayat Migrasi PostgreSQL
└── src/
    └── index.ts               # 🔥 Singleton Instance Prisma Client
```

---

## 🗄️ 3. Entitas & Relasi Data (7 Model Utama)

1. **`User` (Akun Staf & Owner):**
   - Role: `owner` | `staff` (RBAC)
   - Autentikasi: Email & Password Hash (Bcrypt/Argon2)
2. **`RoomType` (Kategori Tarif & Fasilitas):**
   - `Tipe AC` (Rp 275.000 / malam) & `Tipe Kipas` (Rp 200.000 / malam)
   - Fasilitas: Kasur besar muat 2–3 tamu, KM Dalam, TV, WiFi, Handuk
3. **`Room` (8 Unit Kamar Fisik):**
   - **Bangunan A:** A1, A2 (AC) • A3, A4 (Kipas)
   - **Bangunan B:** B1, B2 (AC) • B3, B4 (Kipas)
   - Status: `ready` (Siap) | `occupied` (Terisi) | `booked` (Booking WA) | `dirty` (Perlu Bersih) | `maintenance` (Perbaikan)
4. **`Guest` (Direktori Tamu):**
   - Nama Tamu, Nomor WhatsApp (wajib untuk kuitansi digital), No KTP (opsional)
5. **`Reservation` (Transaksi Reservasi & Operasional Check-In/Out):**
   - Relasi ke `Room`, `Guest`, dan `User` (staf penerima)
   - Kalkulasi Biaya: Grand Total, Nilai DP 50%, Sisa Pelunasan (Rp 0 saat Lunas)
   - Status Transaksi: `pending_dp` | `confirmed` (Booked) | `checked_in` | `checked_out` | `cancelled`
6. **`Souvenir` & `SouvenirCategory` (Etalase Kasir POS Oleh-Oleh):**
   - Minyak Kayu Putih Asli Namlea/Ambon, Kue Bagea, Roti Kenari, Halua Kenari, Kopi Rarobang
7. **`Article` & `ArticleCategory` (CMS Panduan Wisata & Transit Ambon):**
   - Artikel panduan kuliner, wisata pantai dekat bandara, tips transit penerbangan pagi

---

## 📋 4. Tahapan Rincian Pengerjaan Fase 3 (Step-by-Step)

### 🔹 Langkah 1: Pembuatan Dokumentasi Visual ERD (`docs/ERD.md`)

- [ ] Buat file `docs/ERD.md` lengkap dengan diagram Mermaid (_Entity Relationship Diagram_), rincian tipe data kolom, _primary key_, _foreign key_, _indexing_, dan _constraint_ anti-double booking.

### 🔹 Langkah 2: Sinkronisasi Skema Prisma (`packages/db/prisma/schema.prisma`)

- [ ] Update model `User`: pastikan role default `staff` / `owner`.
- [ ] Update model `Room`: tambahkan kolom `building` (`"A"` | `"B"`), hapus kolom `floor` yang tidak relevan dengan bangunan paviliun datar 8 kamar, dan pastikan status enum/string mencakup `booked`.
- [ ] Update model `RoomType`: sinkronkan fasilitas default dan harga (AC: Rp 275.000, Kipas: Rp 200.000).
- [ ] Update model `Reservation`: pastikan kolom `dpAmount`, `remainingAmount`, `paymentMethod`, dan constraint relasi sudah akurat.

### 🔹 Langkah 3: Pembaruan Shared Types Contract (`packages/types/src/index.ts`)

- [ ] Sinkronkan interface TypeScript `@annisa/types` agar 100% kompatibel dengan output Prisma Client.

### 🔹 Langkah 4: Pembuatan Data Seeder Realistis (`packages/db/prisma/seed.ts`)

- [ ] Seeder User default: Akun Owner (`owner@annisa.com`) dan Akun Resepsionis (`staf@annisa.com`).
- [ ] Seeder 2 Room Type: Tipe AC (Rp 275.000) & Tipe Kipas (Rp 200.000).
- [ ] Seeder 8 Kamar Resmi: A1, A2, A3, A4 (Bangunan A) & B1, B2, B3, B4 (Bangunan B).
- [ ] Seeder Kategori & Produk Oleh-Oleh Khas Ambon (Minyak Kayu Putih, Kue Bagea, Roti Kenari, Halua Kenari, Kopi Rarobang).
- [ ] Seeder Artikel Wisata & Kuliner Ambon.

### 🔹 Langkah 5: Validasi Skema & Generate Prisma Client

- [ ] Jalankan `bun db:generate` untuk memvalidasi sintaks schema dan menghasilkan tipe Prisma ORM.
- [ ] Verifikasi tidak ada error _type mismatch_ di seluruh workspace monorepo.

---

## 🔒 5. Verifikasi & Kriteria Keberhasilan (Acceptance Criteria)

1. `docs/ERD.md` tersaji jelas dengan diagram Mermaid dan dokumentasi tabel lengkap.
2. `schema.prisma` mencakup 8 unit kamar resmi (A1–B4 di Bangunan A & B) tanpa kolom usang (_floor_).
3. `bun db:generate` berhasil dijalankan tanpa error sintaks.
4. Data seeder `seed.ts` siap dijalankan ke database PostgreSQL (Lokal / VPS) dengan URL gambar berbasis ImageKit CDN.
