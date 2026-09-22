# 🛠️ Technical Specification Document (TSD)

## Sistem Informasi Manajemen Properti, Reservasi & Katalog Penginapan Annisa

---

| Metadata Dokumen            | Spesifikasi Teknis                                                                                   |
| :-------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Nama Proyek**             | Penginapan Annisa PMS & Public Portal                                                                |
| **Arsitektur Monorepo**     | Bun Workspaces Monorepo                                                                              |
| **Frontend Framework**      | Next.js 15 (App Router) + React 19 + Tailwind CSS + TanStack Query v5                                |
| **Backend Framework**       | Express.js (TypeScript) di atas Bun Runtime (Port 4000)                                              |
| **Database & ORM**          | PostgreSQL (Lokal Dev $\rightarrow$ Self-Hosted VPS Prod) + Prisma ORM v6                            |
| **Media & Image Storage**   | **ImageKit.io CDN** (Free Tier 20GB/bulan, Auto WebP, No Inactivity Pause)                           |
| **Validasi & Kontrak Tipe** | **Zod v3** (Runtime Schema Validation & Inferred Type Contract via `@asteasolutions/zod-to-openapi`) |
| **Dokumentasi API**         | Scalar Interactive Reference (`/docs`) + OpenAPI 3.1 Specification                                   |
| **Versi Dokumen**           | 1.2.0 (Technical Specification Blueprint - Complete with ImageKit)                                   |
| **Status Desain**           | Berdasarkan Analisis Prototype UI (Public View & Admin View 100% Validated)                          |

---

# 📑 DAFTAR ISI

1. [Analisis Keseluruhan Prototype (Public vs Admin View)](#1--analisis-keseluruhan-prototype-public-vs-admin-view)
2. [Sistem Alur & Flowchart Lengkap (Mermaid)](#2--sistem-alur--flowchart-lengkap)
3. [Entity Relationship Diagram (ERD) & Spesifikasi Database](#3--entity-relationship-diagram-erd--spesifikasi-database)
4. [Kontrak Standar REST API (API Specifications)](#4--kontrak-standar-rest-api-api-specifications)
5. [Strategi Deployment & Transisi Database (Lokal ke VPS)](#5--strategi-deployment--transisi-database-lokal-ke-vps)
6. [Rencana Fase Implementasi Proyek (7-Stage Workflow)](#6--rencana-fase-implementasi-proyek-7-stage-workflow)

---

# 1. 🔍 Analisis Keseluruhan Prototype (Public vs Admin View)

Berdasarkan implementasi antarmuka pada `apps/web/src/app` dan `apps/web/src/features`, sistem terbagi secara tegas menjadi **2 Zona Utama**:

```text
SISTEM PENGINAPAN ANNISA
├── 🌐 1. ZONA PORTAL PUBLIK (TAMU TRANSIT)
│   ├── / (Beranda): Hero 750m Bandara Pattimura + Smart Availability Widget + CTA WhatsApp
│   ├── /kamar (Katalog Kamar): 8 Kamar (4 AC @ Rp 275rb & 4 Kipas @ Rp 200rb) + Modal Detail Fasilitas
│   ├── /oleh-oleh (Etalase Oleh-oleh): Minyak Kayu Putih Namlea, Kue Bagea, Roti Kenari, Halua Kenari
│   ├── /artikel (Panduan Wisata): CMS Artikel Wisata Ambon, Kuliner, & Tips Transit Pesawat
│   └── /contact (Kontak & Lokasi): Embed Google Maps 750m Bandara + Direct WhatsApp Dispatcher
│
└── 👑 2. ZONA ADMIN PMS (PROPERTY MANAGEMENT SYSTEM - OWNER & STAF)
    ├── Tab 0: Dashboard Operasional (Statistik Kamar, Ringkasan Tamu Check-in/Out Hari Ini)
    ├── Tab 1: Matriks 8 Kamar (Kartu Visual 4 Warna: 🟩 Siap, 🟦 Terisi, 🟨 Perlu Bersih, 🟥 Perbaikan, 🟣 Booked)
    ├── Tab 2: Jadwal Booking Mendatang (Daftar Reservasi WA, Konfirmasi DP 50%, Pelunasan saat Tiba)
    ├── Tab 3: Kasir POS Oleh-oleh (Katalog Kasir Cepat, Hitung Total Belanja, Pengurangan Stok Otomatis)
    ├── Tab 4: Manajemen Kamar & Tarif (Ubah Harga per Malam, Ubah Fasilitas, Khusus Owner)
    ├── Tab 5: Laporan Keuangan & Okupansi (Grafik Omzet Bulanan, Rekap Tamu, Ekspor Excel, Khusus Owner)
    ├── Tab 6: Kelola Akun Staf (CRUD Akun Resepsionis & Hak Akses RBAC, Khusus Owner)
    └── Tab 7: Pengaturan Sistem (Profil Penginapan, No. Rekening Bank DP, Switch Role Simulasi)
```

---

# 2. 🔄 Sistem Alur & Flowchart Lengkap

### 2.1. Flowchart Reservasi Online Tamu & Konfirmasi DP 50%

Alur pemesanan mandiri oleh tamu dari web publik hingga penguncian kamar di dashboard admin:

```mermaid
flowchart TD
    A[Tamu Buka Website Publik] --> B[Pilih Tanggal Check-in & Tipe Kamar]
    B --> C[Isi Nama & No. WhatsApp]
    C --> D[Klik 'Kirim Booking via WhatsApp']
    D --> E[Sistem Generate Format Pesan WA Otomatis]
    E --> F[Tamu Kirim Chat ke WhatsApp Resmi 081242163116]
    F --> G[Staf Kirim No. Rekening & Nominal DP 50%]
    G --> H[Tamu Transfer DP & Kirim Bukti Struk]
    H --> I[Staf Buka Tab 'Booking Mendatang' di PMS]
    I --> J{Staf Validasi Bukti Transfer?}
    J -- Valid --> K[Klik 'Konfirmasi DP 50% Masuk']
    K --> L[Status Kamar Jadi 'Booked' / Terkunci]
    L --> M[Sistem Kirim Tanda Terima Booking Digital ke WA Tamu]
    J -- Tidak Valid / Batal --> N[Batalkan Reservasi / Hapus Draft]
```

---

### 2.2. Flowchart Check-in Kilat Tamu Langsung (Walk-In < 1 Menit)

Alur penanganan tamu transit yang langsung datang ke meja resepsionis penginapan:

```mermaid
flowchart TD
    A1[Tamu Datang ke Meja Resepsionis] --> B1[Staf Buka Matriks 8 Kamar di PMS]
    B1 --> C1{Ada Kamar Berstatus 🟩 Siap Pakai?}
    C1 -- Tidak Ada --> D1[Informasikan Kamar Penuh / Cek Kamar Dirty]
    C1 -- Ada --> E1[Klik Kartu Kamar Siap Pakai]
    E1 --> F1[Modal Check-in Cepat Terbuka]
    F1 --> G1[Input Nama Tamu, No. WA, & Jumlah Malam]
    G1 --> H1[Pilih Metode Bayar: Tunai / QRIS / Transfer]
    H1 --> I1[Klik Tombol 'Simpan & Check-in Sekarang']
    I1 --> J1[Status Kamar Otomatis Jadi 🟦 Terisi / Occupied]
    J1 --> K1[Kirim Nota Digital 1-Klik ke WhatsApp Tamu]
```

---

### 2.3. Flowchart Siklus Housekeeping & Kebersihan Kamar

Siklus perputaran status kamar setelah tamu check-out hingga siap digunakan kembali:

```mermaid
flowchart TD
    S1[Tamu Selesai Menginap / Pukul 12:00 WIT] --> S2[Staf Klik Tombol 'Check-out' di Matriks]
    S2 --> S3[Kamar Otomatis Berubah Status Jadi 🟨 PERLU BERSIH / Dirty]
    S3 --> S4[Petugas Housekeeping Membersihkan Kamar & Mengganti Sprei]
    S4 --> S5{Apakah Ada Kerusakan Fasilitas?}
    S5 -- Ya --> S6[Staf Ubah Status Jadi 🟥 PERBAIKAN / Maintenance]
    S6 --> S7[Teknisi Memperbaiki Fasilitas]
    S7 --> S4
    S5 -- Tidak / Bersih Tuntas --> S8[Staf Klik 'Tandai Siap Pakai']
    S8 --> S9[Status Kamar Kembali Jadi 🟩 SIAP PAKAI / Ready]
```

---

### 2.4. Flowchart Kasir POS Oleh-Oleh Khas Ambon

Alur transaksi pembelian oleh-oleh oleh tamu penginapan:

```mermaid
flowchart TD
    P1[Tamu Memilih Oleh-oleh di Etalase] --> P2[Staf Buka Tab 'Kasir POS' di PMS]
    P2 --> P3[Klik Produk: Minyak Kayu Putih / Kue Bagea / Roti Kenari]
    P3 --> P4[Atur Jumlah Kuantitas Pembelian]
    P4 --> P5[Keranjang Otomatis Menghitung Subtotal & Total Bayar]
    P5 --> P6[Input Uang Diterima / Pilih QRIS]
    P6 --> P7[Klik 'Proses Transaksi']
    P7 --> P8[Stok Produk di Database Otomatis Berkurang]
    P8 --> P9[Cetak Struk Transaksi / Kirim Nota Digital WA]
```

---

### 2.5. Flowchart Autentikasi & Role-Based Access Control (RBAC)

```mermaid
flowchart TD
    U1[Pengguna Akses /admin/login] --> U2[Input Email & Password]
    U2 --> U3[API Validasi Kredensial via Bcrypt & Database]
    U3 -- Gagal --> U4[Tampilkan Pesan Error / Akses Ditolak]
    U3 -- Berhasil --> U5[Generate JWT Token & Return User Role]
    U5 --> U6{Cek Role Pengguna}
    U6 -- Role: Staff --> U7[Akses Terbatas: Matriks Kamar, Fast Check-in, Kasir POS, & Status Bersih]
    U6 -- Role: Owner --> U8[Akses Penuh: Semua Fitur Staf + Laporan Omzet, Ubah Tarif Kamar, & Kelola Akun Staf]
```

---

# 3. 🗄️ Entity Relationship Diagram (ERD) & Spesifikasi Database

Arsitektur database relasional dikelola menggunakan **Prisma ORM (v6)** yang terhubung ke **PostgreSQL**.

### 3.1. Visual Diagram ERD (Mermaid)

```mermaid
erDiagram
    User ||--o{ Reservation : "menerima_checkin"
    User ||--o{ Article : "menulis_artikel"
    RoomType ||--|{ Room : "memiliki_unit"
    RoomType ||--o{ RoomImage : "memiliki_foto"
    Room ||--o{ Reservation : "dipesan_pada"
    Guest ||--o{ Reservation : "melakukan"
    SouvenirCategory ||--|{ Souvenir : "mengelompokkan"
    ArticleCategory ||--|{ Article : "mengelompokkan"

    User {
        String id PK "UUID / CUID"
        String name "Nama Staf / Owner"
        String email UK "Email Login Unik"
        String passwordHash "Bcrypt Hash"
        UserRole role "owner | staff"
        Boolean isActive "Status Aktif Akun"
        DateTime createdAt
        DateTime updatedAt
    }

    RoomType {
        String id PK "UUID / CUID"
        String name "Tipe AC | Tipe Kipas"
        String slug UK "kamar-ac | kamar-kipas"
        Int basePrice "275000 | 200000"
        Int capacity "2 - 3 Orang"
        String bedType "1 Double Bed / Twin"
        String[] facilities "Array JSON Fasilitas"
        String description "Deskripsi Kamar"
        DateTime createdAt
        DateTime updatedAt
    }

    Room {
        String id PK "UUID / CUID"
        String roomNumber UK "A1, A2, A3, A4, B1, B2, B3, B4"
        String building "A | B"
        String roomTypeId FK "Relasi ke RoomType"
        RoomStatus status "ready | occupied | booked | dirty | maintenance"
        String notes "Catatan Kondisi Kamar"
        DateTime createdAt
        DateTime updatedAt
    }

    RoomImage {
        String id PK "UUID / CUID"
        String roomTypeId FK "Relasi ke RoomType"
        String imageUrl "URL ImageKit.io CDN"
        String caption "Keterangan Foto"
        Boolean isPrimary "Foto Sampul Utama"
        DateTime createdAt
    }

    Guest {
        String id PK "UUID / CUID"
        String name "Nama Lengkap Tamu"
        String phone UK "No. WhatsApp Tamu (628xxx)"
        String email "Email Tamu (Opsional)"
        String idCardNumber "No. KTP / Paspor (Opsional)"
        String address "Kota Asal Tamu"
        DateTime createdAt
        DateTime updatedAt
    }

    Reservation {
        String id PK "UUID / CUID"
        String code UK "ANNISA-YYYYMM-XXX"
        String roomId FK "Relasi ke Room"
        String guestId FK "Relasi ke Guest"
        String userId FK "Staf Pencatat (Opsional)"
        DateTime checkInDate "Tanggal Check-in"
        DateTime checkOutDate "Tanggal Check-out"
        Int totalNights "Durasi Malam"
        Int roomRatePerNight "Tarif per Malam"
        Int grandTotal "Total Biaya Sewa"
        Int dpAmount "Nominal DP 50%"
        Int remainingAmount "Sisa Pelunasan"
        ReservationStatus status "pending_dp | confirmed | checked_in | checked_out | cancelled"
        PaymentStatus paymentStatus "unpaid | dp_paid | paid"
        PaymentMethod paymentMethod "cash | transfer | qris"
        String notes "Catatan Khusus Tamu"
        DateTime createdAt
        DateTime updatedAt
    }

    SouvenirCategory {
        String id PK "UUID / CUID"
        String name "Minyak Kayu Putih | Makanan Khas | Tenun"
        String slug UK "minyak-kayu-putih | makanan-khas"
        DateTime createdAt
    }

    Souvenir {
        String id PK "UUID / CUID"
        String categoryId FK "Relasi ke SouvenirCategory"
        String name "Minyak Kayu Putih Asli Namlea 100ml"
        Int price "Harga Jual (Rp)"
        Int stock "Stok Fisik Tersedia"
        String description "Deskripsi Produk"
        String imageUrl "Foto Produk"
        Boolean isAvailable "Status Ketersediaan"
        DateTime createdAt
        DateTime updatedAt
    }

    ArticleCategory {
        String id PK "UUID / CUID"
        String name "Wisata Ambon | Kuliner | Info Transit"
        String slug UK "wisata-ambon | kuliner"
        DateTime createdAt
    }

    Article {
        String id PK "UUID / CUID"
        String categoryId FK "Relasi ke ArticleCategory"
        String authorId FK "Relasi ke User (Penulis)"
        String title "Judul Artikel"
        String slug UK "pantai-natsepa-dekat-bandara"
        String summary "Ringkasan Singkat"
        String content "Konten Lengkap Markdown / HTML"
        String coverImage "Foto Banner"
        Boolean isPublished "Status Tayang"
        Int views "Jumlah Pembaca"
        DateTime createdAt
        DateTime updatedAt
    }
```

---

### 3.2. Rincian Enum & Aturan Constraint Database

#### 1. Enum Tipe Data:

- **`UserRole`**: `owner`, `staff`
- **`RoomStatus`**: `ready` (Siap), `occupied` (Terisi), `booked` (Booking WA), `dirty` (Perlu Bersih), `maintenance` (Perbaikan)
- **`ReservationStatus`**: `pending_dp`, `confirmed`, `checked_in`, `checked_out`, `cancelled`
- **`PaymentStatus`**: `unpaid`, `dp_paid`, `paid`
- **`PaymentMethod`**: `cash`, `transfer`, `qris`

#### 2. Constraint Anti-Double Booking:

Untuk memastikan 1 kamar tidak dapat dipesan ganda pada rentang tanggal yang sama:

- Query validasi memeriksa:
  $$\text{ExistingCheckIn} < \text{NewCheckOut} \quad \text{AND} \quad \text{ExistingCheckOut} > \text{NewCheckIn}$$
  dengan status reservasi $\in$ `['confirmed', 'checked_in']`.

---

# 4. 🌐 Kontrak Standar REST API (API Specifications)

Semua endpoint API berjalan di bawah prefix **`/api/v1`** dengan format respon JSON seragam.

### 4.1. Format Standar Respon API (`ApiResponse<T>`)

```json
// Respon Sukses (HTTP 200 / 201)
{
  "success": true,
  "message": "Operasi berhasil dieksekusi",
  "data": { ... }
}

// Respon Error (HTTP 400 / 401 / 403 / 404 / 500)
{
  "success": false,
  "message": "Pesan deskripsi error yang ramah",
  "error": "ERROR_CODE_DETAIL"
}
```

---

### 4.2. Validasi Runtime & Kontrak Tipe Data Menggunakan Zod

Untuk menjamin keamanan tipe (_End-to-End Type Safety_) antara Frontend dan Backend tanpa redundansi:

1. **Zod Validation Layer (`*.schema.ts`):** Setiap request HTTP (body, query params, path params) divalidasi ketat di layer Express Router menggunakan skema Zod sebelum diteruskan ke Controller.
2. **Type Inference (`z.infer<typeof Schema>`):** Tipe TypeScript otomatis di-infer langsung dari Zod Schema dan diekspor ke `@annisa/types`, sehingga tidak perlu menulis interface ganda secara manual.
3. **OpenAPI & Scalar Documentation Generator (`@asteasolutions/zod-to-openapi`):** Skema Zod yang sama secara otomatis dikonversi menjadi OpenAPI Specification 3.1 untuk menghasilkan dokumentasi interaktif Scalar di `/docs`.

---

### 4.3. Rincian Endpoint REST API

#### A. Modul Autentikasi (`/api/v1/auth`)

| Method | Endpoint             | Auth / Role  | Deskripsi                                                                 |
| :----- | :------------------- | :----------: | :------------------------------------------------------------------------ |
| `POST` | `/api/v1/auth/login` |    Publik    | Login staf / owner menggunakan email & password. Mengembalikan JWT token. |
| `GET`  | `/api/v1/auth/me`    | Bearer Token | Mengambil data sesi dan profil pengguna yang sedang login.                |

#### B. Modul Kamar & Matriks 8 Kamar (`/api/v1/rooms`)

| Method  | Endpoint                     |  Auth / Role  | Deskripsi                                                                 |
| :------ | :--------------------------- | :-----------: | :------------------------------------------------------------------------ |
| `GET`   | `/api/v1/rooms`              | Publik / Staf | Mengambil daftar seluruh 8 unit kamar (A1–B4) beserta status terkini.     |
| `GET`   | `/api/v1/rooms/:code`        | Publik / Staf | Mengambil rincian 1 unit kamar berdasarkan kode kamar (misal `A1`, `B2`). |
| `PATCH` | `/api/v1/rooms/:code/status` | Staf / Owner  | Mengubah status operasional kamar (`ready`, `dirty`, `maintenance`).      |
| `PUT`   | `/api/v1/rooms/types/:id`    |     Owner     | Mengubah tarif dasar kamar per malam dan fasilitas (Khusus Owner).        |

#### C. Modul Reservasi & Operasional Check-in/out (`/api/v1/reservations`)

| Method  | Endpoint                              |  Auth / Role  | Deskripsi                                                                                 |
| :------ | :------------------------------------ | :-----------: | :---------------------------------------------------------------------------------------- |
| `GET`   | `/api/v1/reservations`                | Staf / Owner  | Mengambil riwayat daftar reservasi & tamu dengan filter status / tanggal.                 |
| `POST`  | `/api/v1/reservations/booking`        | Publik / Staf | Membuat draf pesanan online (booking WhatsApp) dengan nominal DP 50%.                     |
| `POST`  | `/api/v1/reservations/walkin`         | Staf / Owner  | Fast-Track Check-in (< 1 menit) untuk tamu langsung di meja resepsionis.                  |
| `PATCH` | `/api/v1/reservations/:id/confirm-dp` | Staf / Owner  | Konfirmasi bukti transfer DP 50% $\rightarrow$ status kamar otomatis terkunci (_Booked_). |
| `PATCH` | `/api/v1/reservations/:id/checkin`    | Staf / Owner  | Proses pelunasan sisa tagihan 50% dan check-in resmi tamu tiba.                           |
| `PATCH` | `/api/v1/reservations/:id/checkout`   | Staf / Owner  | Check-out tamu $\rightarrow$ kamar otomatis beralih status jadi _Dirty_ (Perlu Bersih).   |
| `GET`   | `/api/v1/reservations/:id/receipt`    | Staf / Owner  | Generate data kuitansi digital & draf template nota kirim WhatsApp.                       |

#### D. Modul Etalase & Kasir POS Oleh-Oleh (`/api/v1/souvenirs`)

| Method   | Endpoint                         |  Auth / Role  | Deskripsi                                                          |
| :------- | :------------------------------- | :-----------: | :----------------------------------------------------------------- |
| `GET`    | `/api/v1/souvenirs`              | Publik / Staf | Mengambil daftar produk oleh-oleh khas Ambon dan stok tersedia.    |
| `POST`   | `/api/v1/souvenirs/pos/checkout` | Staf / Owner  | Memproses transaksi penjualan kasir dan memotong stok barang.      |
| `POST`   | `/api/v1/souvenirs`              |     Owner     | Menambah produk oleh-oleh baru (Khusus Owner).                     |
| `PUT`    | `/api/v1/souvenirs/:id`          |     Owner     | Mengubah rincian, harga, dan stok produk oleh-oleh (Khusus Owner). |
| `DELETE` | `/api/v1/souvenirs/:id`          |     Owner     | Menghapus produk dari etalase kasir (Khusus Owner).                |

#### E. Modul CMS Artikel & Panduan Wisata (`/api/v1/articles`)

| Method   | Endpoint                 | Auth / Role | Deskripsi                                                  |
| :------- | :----------------------- | :---------: | :--------------------------------------------------------- |
| `GET`    | `/api/v1/articles`       |   Publik    | Mengambil daftar artikel wisata Ambon yang dipublikasikan. |
| `GET`    | `/api/v1/articles/:slug` |   Publik    | Mengambil isi lengkap artikel berdasarkan slug URL.        |
| `POST`   | `/api/v1/articles`       |    Owner    | Membuat artikel wisata baru (Khusus Owner).                |
| `PUT`    | `/api/v1/articles/:id`   |    Owner    | Memperbarui isi atau foto artikel (Khusus Owner).          |
| `DELETE` | `/api/v1/articles/:id`   |    Owner    | Menghapus artikel dari portal publik (Khusus Owner).       |

#### F. Modul Laporan & Statistik Dashboard (`/api/v1/reports`)

| Method | Endpoint                          | Auth / Role  | Deskripsi                                                                      |
| :----- | :-------------------------------- | :----------: | :----------------------------------------------------------------------------- |
| `GET`  | `/api/v1/reports/dashboard-stats` | Staf / Owner | Mengambil ringkasan metrik okupansi kamar harian dan ringkasan tamu.           |
| `GET`  | `/api/v1/reports/monthly-revenue` |    Owner     | Mengambil data omzet pendapatan bulanan & total reservasi (Khusus Owner).      |
| `GET`  | `/api/v1/reports/export`          |    Owner     | Ekspor rekapitulasi data tamu & pendapatan ke format Excel/CSV (Khusus Owner). |

---

# 5. 🚀 Strategi Deployment & Transisi Database (Lokal ke VPS)

Sesuai dengan keputusan arsitektur terbaru, sistem **tidak menggunakan Neon.tech**, melainkan menggunakan **PostgreSQL Lokal saat Development** dan **Self-Hosted PostgreSQL di VPS saat Production**, dipadukan dengan **ImageKit.io CDN** untuk penyimpanan media 24/7 tanpa jeda inaktivitas (_Zero Inactivity Pause_).

```text
TAHAP DEVELOPMENT (Sekarang di Laptop)
├── PostgreSQL Server berjalan di localhost:5432 (Docker / Native PostgreSQL)
├── Media Storage: ImageKit.io CDN (Upload API via ImageKit SDK)
├── DATABASE_URL="postgresql://postgres:password@localhost:5432/annisa_pms_dev?schema=public"
└── Prisma CLI: `bun db:generate` & `bun db:push` & `bun db:seed`
          │
          ▼ (Migrasi & Deployment Bulan Depan)
TAHAP PRODUCTION (Bulan Depan di VPS Ubuntu)
├── Docker Compose di VPS mengelola:
│   ├── Container 1: PostgreSQL 16 Database
│   ├── Container 2: Bun Express API (Port 4000)
│   ├── Container 3: Next.js Frontend (Port 3000)
│   └── Container 4: Nginx Reverse Proxy + SSL Let's Encrypt
├── Media Storage: ImageKit.io CDN (Global CDN Caching, Auto-WebP, 24/7 Always ON)
└── DATABASE_URL="postgresql://postgres:vps_secure_password@postgres_db:5432/annisa_pms_prod?schema=public"
```

### 💡 Keuntungan Strategi Ini:

1. **Zero Cost & Zero Vendor Lock-in:** Tidak ada biaya bulanan langganan database cloud.
2. **Kesesuaian Lingkungan 100%:** Lingkungan lokal dan VPS sama persis menggunakan engine PostgreSQL standar.
3. **Media CDN Cepat & Selalu Aktif:** ImageKit tidak akan pernah di-pause meskipun web tidak diakses berhari-hari.
4. **Migrasi Instan:** Cukup ganti nilai `DATABASE_URL` di file `.env` VPS lalu jalankan `bun db:push && bun db:seed`.

---

# 6. 🗓️ Rencana Fase Implementasi Proyek (7-Stage Workflow)

```text
[FASE 1] Setup & Instalasi Dependensi Inti (Monorepo FE, BE, Shared Packages)   ──► ✅ SELESAI (100%)
   │
   ▼
[FASE 2] UI / Mockup / Frontend Statis (Design System & Prototype 8 Kamar)      ──► ✅ SELESAI (100%)
   │
   ▼
[FASE 3] Database Design (Prisma Schema, ERD & Seeder PostgreSQL Lokal)         ──► 🎯 FASE SAAT INI (SIAP DIKERJAKAN)
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
[FASE 7] Deployment Server (Self-Hosted VPS Ubuntu + PostgreSQL + ImageKit CDN)
```
