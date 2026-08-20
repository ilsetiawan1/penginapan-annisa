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
| **Penomoran Kamar** | **Bangunan A:** A1–A2 (AC), A3–A4 (Kipas) • **Bangunan B:** B1–B2 (AC), B3–B4 (Kipas) |
| **Kebijakan Check-in** | **Fleksibel 24 Jam** (Check-in pagi misal 09:00 WIT langsung dihitung menginap s/d esok hari maks 12:00 WIT) |
| **Model Reservasi** | Non-Payment Gateway (Pemesanan Mandiri via WhatsApp + **DP 50% Transfer** + Pelunasan di Lokasi) |
| **Model Bukti Bayar** | Nota Digital WhatsApp 1-Klik (+ Kuitansi Fisik Resmi Manual Penginapan) |
| **Kontak WhatsApp** | **081242163116** (`6281242163116`) |
| **Produk Etalase** | Makanan Khas Maluku (*Kue Bagea, Roti Kenari, Halua Kenari*) & *Minyak Kayu Putih Asli Namlea/Ambon* |
| **Target Biaya Server**| **Rp 0 / bulan** (Memaksimalkan Free Tier: Vercel + Neon.tech PostgreSQL + Cloudinary CDN) |
| **Prinsip Utama UI** | **Super User-Friendly, Zero-Hardware Friction & Low Cognitive Load untuk Staf** |
| **Versi Dokumen** | 1.3.0 (Product & Business Requirements) |

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

Penginapan Annisa memiliki **8 unit kamar** yang terbagi rata di 2 bangunan berdampingan:

| Kode Kamar | Lokasi Bangunan | Tipe Kamar | Fasilitas Utama | Kapasitas | Tarif / Malam | Ketentuan DP (50%) |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **#A1** & **#A2** | Bangunan A (Lokasi 1) | **Tipe AC** | AC Dingin, KM Dalam, TV, WiFi, Handuk & Air Mineral | 2–3 Org | **Rp 275.000** | **Rp 137.500** |
| **#A3** & **#A4** | Bangunan A (Lokasi 1) | **Tipe Kipas** | Kipas Angin, KM Dalam, TV, WiFi, Handuk & Air Mineral | 2–3 Org | **Rp 200.000** | **Rp 100.000** |
| **#B1** & **#B2** | Bangunan B (Lokasi 2) | **Tipe AC** | AC Dingin, KM Dalam, TV, WiFi, Handuk & Air Mineral | 2–3 Org | **Rp 275.000** | **Rp 137.500** |
| **#B3** & **#B4** | Bangunan B (Lokasi 2) | **Tipe Kipas** | Kipas Angin, KM Dalam, TV, WiFi, Handuk & Air Mineral | 2–3 Org | **Rp 200.000** | **Rp 100.000** |

### 🏷️ Status Kamar (Public View vs Internal Staff View)
1. **Public View (Tamu):**
   * 🟢 **`Tersedia`** — Unit bersih, siap dipesan via WhatsApp.
   * 🔵 **`Terisi`** — Sedang ditempati / belum siap, tamu diarahkan untuk tanya jadwal kosong.
2. **Internal Staff View (Dashboard PMS):**
   * 🟩 **`SIAP` (Ready)** — Siap menerima tamu baru.
   * 🟦 **`TERISI` (Occupied)** — Sedang dihuni tamu.
   * 🟨 **`PERLU BERSIH` (Dirty)** — Tamu check-out, perlu housekeeping.
   * 🟥 **`PERBAIKAN` (Maintenance)** — Sedang perbaikan teknisi.

### ⏰ Aturan Waktu Menginap
* **Waktu Check-in:** **Fleksibel (24 Jam)**. Tamu yang datang pagi (misal jam 09:00 WIT) diperbolehkan langsung check-in jika kamar berstatus *Ready/Siap Pakai*.
* **Waktu Check-out:** Maksimal pukul **12:00 WIT** pada tanggal kepulangan yang disepakati.

---

## 3. 👥 User Persona & Hak Akses (RBAC)

### 3.1. Deskripsi Peran Pengguna (*User Roles*)

| Peran (Role) | Deskripsi | Hak Akses Utama |
| :--- | :--- | :--- |
| **Pengunjung / Tamu Transit** | Calon penumpang pesawat / wisatawan yang membutuhkan kamar transit. | Melihat katalog kamar & fasilitas, cek ketersediaan tanggal, kirim request booking ke WhatsApp, melihat etalase oleh-oleh, dan membaca artikel wisata Ambon. |
| **Staf Resepsionis & Housekeeping** | Staf operasional yang menerima tamu di lokasi dan menjaga kebersihan kamar. | Input tamu *walk-in* cepat, konfirmasi bukti DP 50%, ubah status *Check-in/Check-out*, update kebersihan kamar (*Ready $\leftrightarrow$ Dirty*), dan kirim nota digital ke WhatsApp tamu. |
| **Owner / Pengelola Utama (Admin)** | Pemilik penginapan dengan akses manajerial penuh. | Semua akses staf + manajemen kamar & tarif, manajemen foto Cloudinary, manajemen etalase oleh-oleh & CMS artikel, serta rekapitulasi laporan reservasi/keuangan. |

---

### 3.2. Matriks Hak Akses (*RBAC Permission Matrix*)

| Modul & Fitur Sistem | 👤 Tamu Publik | 🧑‍💼 Staf Resepsionis | 👑 Owner / Admin |
| :--- | :---: | :---: | :---: |
| **🌐 PORTAL PUBLIK** | | | |
| Melihat Katalog 8 Kamar, Tarif & Fasilitas | ✅ Full | ✅ Full | ✅ Full |
| Cek Ketersediaan Tanggal & Booking WA | ✅ Full | ✅ Full | ✅ Full |
| Melihat Etalase Oleh-oleh Khas Ambon | ✅ Full | ✅ Full | ✅ Full |
| Membaca Artikel & Panduan Wisata | ✅ Full | ✅ Full | ✅ Full |
| **🏨 OPERASIONAL PMS & RESERVASI** | | | |
| Akses Dashboard Matriks 8 Kamar (4 Warna) | ❌ No | ✅ Full | ✅ Full |
| Input Tamu *Fast-Track Walk-in* (< 1 Menit) | ❌ No | ✅ Full | ✅ Full |
| Konfirmasi Bukti Transfer DP 50% | ❌ No | ✅ Full | ✅ Full |
| Check-in / Check-out & Ubah Status Kamar | ❌ No | ✅ Full | ✅ Full |
| Generate & Kirim Nota WhatsApp 1-Klik | ❌ No | ✅ Full | ✅ Full |
| Melihat Direktori Riwayat Tamu | ❌ No | 👁️ Read-Only | ✅ Full (Export) |
| **🛠️ MASTER DATA & CMS KONTEN** | | | |
| Ubah Tarif & Deskripsi Kamar | ❌ No | ❌ No | ✅ Full |
| Upload & Ganti Foto Kamar (Cloudinary) | ❌ No | ❌ No | ✅ Full |
| CRUD Produk & Harga Oleh-oleh | ❌ No | ❌ No | ✅ Full |
| Tulis, Edit, & Publikasi Artikel Wisata | ❌ No | ❌ No | ✅ Full |
| **📊 KEUANGAN, LAPORAN & USER MANAGEMENT** | | | |
| Melihat Statistik Okupansi Kamar Harian | ❌ No | 👁️ Read-Only | ✅ Full |
| Melihat Laporan Pendapatan & Omzet Bulanan | ❌ No | ❌ No | ✅ Full |
| Ekspor Laporan ke Spreadsheet Excel | ❌ No | ❌ No | ✅ Full |
| Manajemen Akun Staf (Tambah / Nonaktifkan User) | ❌ No | ❌ No | ✅ Full |

---

## 4. 🧩 Cakupan Modul & Spesifikasi Fitur (V1)

```text
SISTEM PENGINAPAN ANNISA (FASE V1)
│
├── 1. PUBLIC PORTAL (TRANSIT GUEST EXPERIENCE)
│   ├── Hero Section: Jarak 750m ke Bandara Pattimura + Google Maps Embed
│   ├── Katalog 8 Kamar (4 AC & 4 Kipas) + Detail Fasilitas & Foto Realistis
│   ├── Smart Availability Checker (Pilih Tanggal Menginap)
│   ├── WhatsApp Booking Dispatcher (Draf Pesan Otomatis)
│   ├── Etalase Showcase Oleh-oleh Khas Ambon (Foto & Harga Panduan)
│   └── Portal Artikel Wisata & Kuliner Ambon
│
├── 2. PROPERTY MANAGEMENT SYSTEM (OPERASIONAL STAF)
│   ├── Dashboard Visual Kamar (Matrix / Card 8 Kamar dengan Status 4 Warna)
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
```text
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

## 6. ⚙️ Referensi Implementasi Teknis

> 📘 **Dokumen Terkait:**
> Seluruh rincian arsitektur teknis sistem, struktur folder monorepo (*Bun Workspaces*), pembagian modul *Feature-Driven Architecture*, pola *3-Tier Repository Pattern*, kontrak data `@annisa/types`, skema database Prisma ORM lengkap, dan spesifikasi REST API dapat dilihat pada dokumen:
> 👉 **[TRD (Technical Requirements Document)](./TRD.md)**

---

## 7. 🗓️ Rencana Fase Implementasi Proyek (7-Stage Workflow)

```text
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
```
