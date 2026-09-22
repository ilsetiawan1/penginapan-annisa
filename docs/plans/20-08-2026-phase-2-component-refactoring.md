# 📋 Plan: Fase 2 — Refactoring Komponen & Modularisasi UI (Dual-Zone Architecture)

**Tanggal:** 20–21 Agustus 2026  
**Status:** In Progress (Zona Admin PMS)  
**Referensi:** [PRD.md](../PRD.md) & [TRD.md](../TRD.md)

---

## 🎯 1. Tujuan & Latar Belakang

Fase 2 bertujuan untuk melakukan dekomposisi komponen secara modular (_high cohesion, loose coupling_) dengan pendekatan **Dual-Zone Feature-Driven Architecture (`src/features/`)**:

1. **Zona 1 (Public Portal):** 5 halaman publik tamu (_Beranda, /kamar, /oleh-oleh, /artikel, /contact_) $\rightarrow$ **[SELESAI ✅]**
2. **Zona 2 (Admin & Staf PMS Portal):** Antarmuka operasional manajemen penginapan berbasis **Tablet-First Touch Responsive** untuk Role **Owner** dan **Staf** $\rightarrow$ **[SEDANG DIKERJAKAN 🚧]**

---

## 🗺️ 2. Peta Dekomposisi Komponen

```text
apps/web/src/
│
├── lib/
│   ├── utils.ts                               # cn() merger, currency formatter
│   └── whatsapp.ts                            # Global WhatsApp URL & message generator
│
├── components/layout/
│   ├── navbar.tsx                             # Dynamic glassmorphic navbar (top/scrolled)
│   └── footer.tsx                             # Floating CTA Card & clean 3-col footer
│
├── features/
│   ├── public/                                # 🌐 ZONA 1: PORTAL PUBLIK TAMU (SELESAI ✅)
│   │   ├── home/                              # Beranda (Hero, Booking Curve, 2-Room Preview, 3-Card Oleh-oleh, FAQ)
│   │   ├── rooms/                             # Tipe Kamar (/kamar - 1-line filter, room grid)
│   │   ├── souvenirs/                         # Oleh-oleh (/oleh-oleh - 1-line filter, souvenir grid)
│   │   ├── articles/                          # Artikel Wisata (/artikel - search & article grid)
│   │   └── contact/                           # Kontak (/contact - 100vh 1-screen scenic layout)
│   │
│   └── admin/                                 # 🔒 ZONA 2: ADMIN & STAF PMS PORTAL (ONGOING 🚧)
│       └── components/
│           ├── admin-header.tsx               # Header, WIT clock, role switcher (Owner/Staf)
│           ├── room-matrix-tab.tsx            # Matriks 8 kamar real-time (4 status warna) + modal aksi
│           ├── room-management-tab.tsx        # Manajemen tarif kamar & fasilitas (Owner)
│           ├── souvenir-pos-tab.tsx           # Kasir resepsionis & stok oleh-oleh (Staf & Owner)
│           ├── financial-reports-tab.tsx      # Laporan omzet, okupansi, & ekspor data (Owner)
│           ├── staff-management-tab.tsx       # Kelola akun staf resepsionis (Owner)
│           └── modals/
│               ├── checkin-modal.tsx          # Fast-track input tamu walk-in (< 1 menit)
│               ├── checkout-modal.tsx         # Pelunasan kasir & status dirty sprei
│               └── receipt-modal.tsx          # 1-klik generator nota WhatsApp
```

---

## 📱 3. Spesifikasi UI Admin: Tablet-First & Responsive

Karena sistem operasional meja resepsionis utamanya menggunakan **perangkat Tablet (iPad / Android Tablet)**, antarmuka dirancang dengan kriteria:

- **Ukuran Tombol Sentuh Lebar (_Touch Target $\ge 44\text{px}$_):** Tombol aksi (_Check-In, Check-Out, Nota WA, Status Bersih_) sangat mudah ditekan dengan jari tanpa salah pencet.
- **Grid 4 Kolom (Landscape Tablet) & 2 Kolom (Portrait Tablet):** 8 kamar tampil utuh dalam satu pandangan layar tanpa perlu banyak scroll.
- **Role Switcher Interaktif:** Memudahkan pengujian live antara tampilan lengkap `Owner` vs tampilan terproteksi `Staf`.

---

## 📋 4. Tahapan Eksekusi Step-by-Step

### Zona 1: Portal Publik (Selesai ✅)

- [x] **Langkah 1:** Buat `src/lib/whatsapp.ts` (Global helper untuk link WhatsApp).
- [x] **Langkah 2:** Buat `src/components/layout/footer.tsx` (Floating CTA Card + Clean 3-col footer).
- [x] **Langkah 3:** Refactoring `features/public/home/` (Booking Curve, 2-Room Preview, 3-Card Oleh-oleh, Centered Titles).
- [x] **Langkah 4:** Refactoring `features/public/rooms/` (1-line filter, hapus guide card box).
- [x] **Langkah 5:** Refactoring `features/public/souvenirs/` (1-line filter, direct card grid).
- [x] **Langkah 6:** Refactoring `features/public/articles/` (search & article grid).
- [x] **Langkah 7:** Refactoring `features/public/contact/` (100vh 1-screen scenic background layout).

### Zona 2: Admin & Staf PMS Portal (Sedang Dikerjakan 🚧)

- [ ] **Langkah 8:** Buat modul `src/features/admin/components/admin-header.tsx` dengan Live WIT Clock & Role Switcher (`Owner` / `Staf`).
- [ ] **Langkah 9:** Buat `src/features/admin/components/room-matrix-tab.tsx` dengan modal Check-In, Check-Out pelunasan, & Nota WhatsApp (dioptimalkan untuk Tablet).
- [ ] **Langkah 10:** Buat `src/features/admin/components/room-management-tab.tsx` (Pengaturan tarif kamar Owner).
- [ ] **Langkah 11:** Buat `src/features/admin/components/souvenir-pos-tab.tsx` (Kasir cepat & stok oleh-oleh).
- [ ] **Langkah 12:** Buat `src/features/admin/components/financial-reports-tab.tsx` (Laporan omzet, okupansi harian/bulanan Owner).
- [ ] **Langkah 13:** Buat `src/features/admin/components/staff-management-tab.tsx` (Manajemen akun staf Owner).
- [ ] **Langkah 14:** Integrasikan ke `src/app/admin/dashboard/page.tsx` & verifikasi responsivitas Tablet, Desktop, dan Mobile.
