# 🌐 Penginapan Annisa — Frontend Web App (`apps/web`) 🚀

Aplikasi web modern **Next.js 15 (App Router)** untuk **Penginapan Annisa**, mengintegrasikan **Dual-Zone Architecture** (_Portal Publik Tamu_ & _Admin Property Management System_).

---

## 🛠️ Features & Stack

- **Framework:** Next.js 15 (App Router) + React 19 (Port 3000)
- **Styling & Design System:** Tailwind CSS dengan Palet Warna _Tri-Color_ (Purple, Lavender, White)
- **UI Primitives:** Radix UI Dialog, Dropdown, Tabs, Popover, Select, Avatar, Tooltip
- **State & Data Fetching:** TanStack Query v5 + `@annisa/types`
- **Form & Validation:** React Hook Form + Zod Resolvers
- **Icons & Alerts:** Lucide React, React Icons (FaWhatsapp), Sonner Toasts
- **PWA Ready:** Mobile-First Responsive, Installable Homescreen PWA

---

## 🗺️ Dual-Zone Architecture

### 1. 🌐 Public Guest Portal (5 Menu Utama)

- **`/` (Beranda):** Hero section 750m Bandara Pattimura Ambon + Smart Availability Checker Widget.
- **`/kamar` (Katalog Kamar):** Tampilan 8 kamar (4 AC @ Rp 275rb & 4 Kipas @ Rp 200rb) + Modal Detail Fasilitas.
- **`/oleh-oleh` (Etalase Produk):** Showcase Minyak Kayu Putih Asli Namlea, Kue Bagea, Roti Kenari, Halua Kenari.
- **`/artikel` (Panduan Wisata):** Artikel wisata pantai, kuliner Ambon, dan tips transit pesawat.
- **`/contact` (Kontak & Lokasi):** Embed peta lokasi Google Maps 750m dari bandara + tombol WhatsApp direct chat.

### 2. 👑 Admin PMS (Property Management System)

- **Tab 0: Dashboard Operasional:** Statistik okupansi harian, ringkasan _check-in_ & _check-out_ hari ini.
- **Tab 1: Matriks 8 Kamar:** Kartu visual status 4 warna (🟩 _Siap_, 🟦 _Terisi_, 🟨 _Perlu Bersih_, 🟥 _Perbaikan_, 🟣 _Booked_).
- **Tab 2: Jadwal Booking Mendatang:** Daftar reservasi WA, alur konfirmasi DP 50%, pelunasan saat tiba.
- **Tab 3: Kasir POS Oleh-oleh:** Katalog kasir cepat, hitung total belanja, pengurangan stok otomatis.
- **Tab 4: Manajemen Kamar & Tarif:** Penyesuaian tarif per malam & fasilitas (Khusus Owner).
- **Tab 5: Laporan Omzet & Okupansi:** Grafik pendapatan bulanan & ekspor spreadsheet (Khusus Owner).
- **Tab 6: Kelola Akun Staf:** Manajemen akun resepsionis dengan Role-Based Access Control (Khusus Owner).
- **Tab 7: Pengaturan Sistem:** Profil penginapan, rekening bank DP, dan simulasi switch role.

---

## ⚡ Development Commands

```bash
# Jalankan Frontend Dev Server di Port 3000
bun dev

# Jalankan Frontend saja dari root monorepo
bun dev:web

# Build bundle produksi Next.js
bun run build

# Menjalankan server produksi lokal
bun run start
```
