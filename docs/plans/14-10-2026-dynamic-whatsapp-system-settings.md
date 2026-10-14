# Rencana Implementasi: Integrasi Nomor WhatsApp Dinamis dari SystemSetting

**Tanggal:** 14 Oktober 2026  
**Target:** Frontend (`apps/web`)  
**Tujuan:** Mengintegrasikan seluruh nomor WhatsApp publik dengan data dinamis dari tabel `system_settings` (via endpoint `/api/v1/settings`), menggantikan konstanta statis dan menghapus ketergantungan pada environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` agar pembaruan nomor di halaman `/admin/settings` langsung berlaku secara real-time di seluruh antarmuka publik tanpa perlu rebuild atau deploy ulang di Vercel.

---

## 1. Analisis & Audit Kondisi Terkini

### A. Status Backend & Database (100% Siap & Dinamis)
* **Tabel Database (`packages/db/prisma/schema.prisma`):**
  Tabel `system_settings` menggunakan pola Key-Value (`key`, `value`, `updated_at`).
* **Endpoint API (`apps/api`):**
  * `GET /api/v1/settings`: Mengembalikan konfigurasi publik (termasuk `whatsapp_number`, `lodging_name`, `airport_distance`).
  * `PUT /api/v1/settings`: Menerima pembaruan batch dari admin dan menyimpan ke database Neon.
* **Status VPS & Neon:**
  Backend VPS dan database Neon sudah berjalan secara dinamis. Zero-touch pada `apps/api/` dan `packages/db/`. Tidak perlu migrasi DB dan tidak perlu git pull/redeploy di VPS.

### B. Temuan Masalah Cache & Reaktivitas (Telah Diperbaiki)
* **Akar Masalah:**
  Pada hook `use-settings.ts`, penggunaan opsi `initialData: DEFAULT_SYSTEM_SETTINGS` dengan `staleTime: 5 menit` membuat TanStack Query menganggap data cache selalu segar (*fresh*), sehingga query live ke API backend tidak pernah dipicu saat browser pertama kali memuat halaman.
* **Perbaikan Cache:**
  Opsi `initialData` telah diganti dengan `placeholderData: DEFAULT_SYSTEM_SETTINGS`, `staleTime` disetel ke 30 detik, dan `setQueryData` instan dipasang pada `useUpdateSettings` agar perubahan nomor langsung terupdate seketika (*instant reactive*).

### C. Pembersihan Sisa String Mentah (Best Practice Architecture)
Untuk mencegah *split-brain* dan redundansi, seluruh nomor WhatsApp harus bersumber dari tabel database `system_settings`:
1. `receipt-modal.tsx`: Hubungkan ke `useSettings()` dan `formatDisplayPhoneNumber()`.
2. `settings-general-form.tsx`: Ganti placeholder form menjadi format contoh netral (`placeholder="Contoh: 6281234567890"`).
3. `json-ld.tsx`: Sambungkan ke nomor dinamis atau fallback aman.
4. `whatsapp.ts`: Pastikan fallback aman jika query sedang loading.

---

## 2. Arsitektur Solusi & Prinsip Desain

1. **100% Single Source of Truth:**
   Tabel `system_settings` di Neon adalah satu-satunya rujukan utama untuk data operasional penginapan.
2. **Decoupling dari Environment Variable:**
   Menghapus ketergantungan operasional pada `NEXT_PUBLIC_WHATSAPP_NUMBER` di Vercel. Penggantian nomor cukup dilakukan oleh admin/pemilik dari dashboard `/admin/settings`.
3. **Graceful Placeholder:**
   Menggunakan `placeholderData` TanStack Query sehingga UI tidak pernah blank saat pertama kali render, lalu langsung tersinkronisasi otomatis dengan data database terbaru.

---

## 3. Langkah-Langkah Eksekusi (Phase Plan)

### Fase 1: Pembuatan Git Branch (Selesai)
* Branch kerja aktif: `feat/dynamic-public-whatsapp-settings`.

### Fase 2: Refactor Helper WhatsApp (Selesai)
* Helper `normalizeWaNumber()` dan `formatDisplayPhoneNumber()` telah diimplementasikan di `apps/web/src/lib/whatsapp.ts`.
* Seluruh fungsi URL WhatsApp publik telah mendukung parameter `targetPhone?: string`.

### Fase 3: Integrasi Dinamis Komponen Publik (Selesai)
* `BookingWidget` (Beranda)
* `RoomDetailModal` (Katalog Kamar)
* `CartDrawerModal` (Keranjang Titip Ambil)
* `SouvenirOrderModal` (Pesan Cepat Oleh-Oleh)
* `ContactInfo` (Halaman Kontak)
* `FloatingWhatsApp` & `Footer`

### Fase 4: Pembersihan Sisa Komponen Statis (Tahap Saat Ini)
1. **`receipt-modal.tsx`:** Mengganti string WhatsApp kuitansi agar menggunakan `formatDisplayPhoneNumber(settings?.whatsapp_number)`.
2. **`settings-general-form.tsx`:** Mengubah teks placeholder menjadi contoh generik `Contoh: 6281234567890`.
3. **`json-ld.tsx`:** Menghilangkan hardcoded raw phone string.

### Fase 5: Validasi, Merge & Panduan Pasca-Deploy
1. Jalankan type-checking:
   ```bash
   pnpm --filter @annisa/web exec tsc --noEmit
   ```
2. Jalankan build produksi:
   ```bash
   pnpm --filter @annisa/web build
   ```
3. Commit seluruh perubahan ke branch `feat/dynamic-public-whatsapp-settings`.
4. Merge ke `main` dan push ke GitHub (memicu auto-deploy Vercel).
5. **Aksi Pengguna di Dashboard Vercel:** Hapus environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` dari Vercel Settings -> Environment Variables.

---

## 4. Kriteria Keberhasilan (Acceptance Criteria)
1. Perubahan nomor WhatsApp pada form `/admin/settings` langsung mengubah nomor tujuan WhatsApp di seluruh fitur website publik.
2. Tidak ada string nomor telepon mentah yang tersebar di source code frontend.
3. Database Neon dan backend VPS tetap berjalan normal tanpa perlu konfigurasi atau deploy ulang.
4. Build Next.js 100% sukses tanpa error TypeScript.
