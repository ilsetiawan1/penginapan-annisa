# Rencana Implementasi: Integrasi Nomor WhatsApp Dinamis dari SystemSetting

**Tanggal:** 14 Oktober 2026  
**Target:** Frontend (`apps/web`)  
**Tujuan:** Mengintegrasikan seluruh nomor WhatsApp publik dengan data dinamis dari tabel `system_settings` (via endpoint `/api/v1/settings`), menggantikan konstanta statis `ANNISA_WA_NUMBER` agar pembaruan nomor di halaman `/admin/settings` langsung berlaku di seluruh antarmuka publik tanpa perlu rebuild atau deploy ulang.

---

## 1. Analisis & Audit Kondisi Saat Ini

### A. Status Backend & Database (Sudah Siap 100%)
* **Tabel Database (`packages/db/prisma/schema.prisma`):**
  Tabel `system_settings` menggunakan pola Key-Value (`key`, `value`, `updated_at`).
* **Endpoint API (`apps/api`):**
  * `GET /api/v1/settings`: Mengembalikan konfigurasi publik (termasuk `whatsapp_number`, `lodging_name`, `airport_distance`).
  * `PUT /api/v1/settings`: Menerima pembaruan batch dari admin dan menyimpan ke database Neon.
* **Tidak Ada Perubahan di Backend & Database:**
  Zero-touch pada `apps/api/` dan `packages/db/`. Tidak perlu migrasi DB dan tidak perlu git pull/redeploy di VPS.

### B. Status Frontend (`apps/web`)
* **Sudah Dinamis:**
  1. `FloatingWhatsApp` (`apps/web/src/components/layout/floating-whatsapp.tsx`): menggunakan `useSettings()` -> `settings?.whatsapp_number`.
  2. `Footer` (`apps/web/src/components/layout/footer.tsx`): menggunakan `useSettings()` -> `settings?.whatsapp_number`.
* **Masih Menggunakan Nilai Statis (Harus Diperbaiki):**
  1. `whatsapp.ts` (`apps/web/src/lib/whatsapp.ts`): seluruh fungsi generator link mengunci nomor ke `ANNISA_WA_NUMBER = "6281242163116"`.
  2. `BookingWidget` (`apps/web/src/features/home/components/booking-widget.tsx`): tombol pesan/tanya kamar di beranda merangkai URL manual ke `ANNISA_WA_NUMBER`.
  3. `RoomDetailModal` (`apps/web/src/features/rooms/components/public/room-detail-modal.tsx`): tombol reservasi dan tanya ketersediaan memanggil helper tanpa mengoper nomor dinamis.
  4. `CartDrawerModal` (`apps/web/src/features/souvenirs/components/public/cart-drawer-modal.tsx`): modal checkout oleh-oleh merangkai URL WhatsApp langsung ke `ANNISA_WA_NUMBER`.
  5. `SouvenirOrderModal` (`apps/web/src/features/souvenirs/components/public/souvenir-order-modal.tsx`): modal pesan cepat produk oleh-oleh merangkai URL WhatsApp langsung ke `ANNISA_WA_NUMBER`.
  6. `ContactInfo` (`apps/web/src/features/contact/components/contact-info.tsx`): teks tampilan nomor telepon, link `wa.me/`, link `tel:`, dan form pertanyaan cepat masih statis ke `ANNISA_WA_NUMBER`.

---

## 2. Arsitektur Solusi & Prinsip Desain

1. **Single Source of Truth:**
   Semua data pengaturan bersumber dari hook `useSettings()` yang mengonsumsi endpoint `/api/v1/settings` dengan caching TanStack Query.
2. **Graceful Fallback:**
   Jika query pengaturan sedang loading atau koneksi jaringan offline, sistem otomatis memakai fallback ke `ANNISA_WA_NUMBER` bawaan agar tombol WhatsApp tidak pernah error atau kosong.
3. **Backward Compatibility:**
   Fungsi-fungsi helper di `apps/web/src/lib/whatsapp.ts` diperbarui dengan menambahkan parameter opsional `targetPhone?: string` dengan default value `ANNISA_WA_NUMBER`, sehingga pemanggilan yang ada tidak akan pecah (*break*).

---

## 3. Langkah-Langkah Eksekusi (Phase Plan)

### Fase 1: Pembuatan Git Branch
* Buat dan checkout ke branch baru:
  ```bash
  git checkout -b feat/dynamic-public-whatsapp-settings
  ```

### Fase 2: Refactor Helper WhatsApp (`apps/web/src/lib/whatsapp.ts`)
* Tambahkan parameter opsional `targetPhone?: string` dan fungsi normalisasi nomor:
  * `getRoomBookingWhatsAppUrl(params: RoomBookingParams, targetPhone?: string)`
  * `getRoomAvailabilityInquiryUrl(paramsOrRoomNumber: ..., legacyRoomName?: string, targetPhone?: string)`
  * `getSouvenirOrderWhatsAppUrl(itemName: string, price: string, origin?: string, targetPhone?: string)`
  * `getGeneralContactWhatsAppUrl(message?: string, targetPhone?: string)`
  * `getContactFormWhatsAppUrl(params: ContactFormParams, targetPhone?: string)`
* Tambahkan helper format tampilan nomor publik:
  * `formatDisplayPhoneNumber(phone?: string): string` untuk mengubah `6281242163116` menjadi format rapi `0812-4216-3116`.

### Fase 3: Integrasi Hook `useSettings()` pada Komponen Publik
1. **`BookingWidget` (`apps/web/src/features/home/components/booking-widget.tsx`):**
   * Panggil `const { data: settings } = useSettings();`.
   * Tentukan target nomor: `const waNumber = settings?.whatsapp_number || ANNISA_WA_NUMBER;`.
   * Terapkan nomor dinamis tersebut saat membuka jendela WhatsApp.
2. **`RoomDetailModal` (`apps/web/src/features/rooms/components/public/room-detail-modal.tsx`):**
   * Panggil `useSettings()`.
   * Operkan `settings?.whatsapp_number` ke `getRoomBookingWhatsAppUrl` dan `getRoomAvailabilityInquiryUrl`.
3. **`CartDrawerModal` (`apps/web/src/features/souvenirs/components/public/cart-drawer-modal.tsx`):**
   * Panggil `useSettings()`.
   * Gunakan `settings?.whatsapp_number || ANNISA_WA_NUMBER` pada link pesanan oleh-oleh.
4. **`SouvenirOrderModal` (`apps/web/src/features/souvenirs/components/public/souvenir-order-modal.tsx`):**
   * Panggil `useSettings()`.
   * Gunakan `settings?.whatsapp_number || ANNISA_WA_NUMBER` pada link pesanan cepat oleh-oleh.
5. **`ContactInfo` (`apps/web/src/features/contact/components/contact-info.tsx`):**
   * Panggil `useSettings()`.
   * Buat teks nomor, link WhatsApp `wa.me/`, dan link telepon `tel:` mengambil nomor dinamis dari settings.
   * Teruskan nomor dinamis ke `getContactFormWhatsAppUrl`.

### Fase 4: Validasi & Testing
* Jalankan type-checking dan build Next.js:
  ```bash
  pnpm --filter @annisa/web build
  ```
* Pastikan seluruh 25 halaman statis berhasil di-generate tanpa error TypeScript atau linting.

### Fase 5: Merge & Deployment
* Commit seluruh perubahan ke branch `feat/dynamic-public-whatsapp-settings`.
* Checkout kembali ke `main`.
* Merge branch fitur dengan fast-forward / merge commit.
* Push ke remote `origin main` untuk memicu deployment otomatis Vercel.
* Hapus branch fitur lokal.

---

## 4. Kriteria Keberhasilan (Acceptance Criteria)
1. Perubahan nomor WhatsApp pada form `/admin/settings` langsung mengubah nomor tujuan WhatsApp di:
   * Floating WhatsApp widget (seluruh halaman).
   * Footer link WhatsApp (seluruh halaman).
   * Booking Widget beranda (CTA Pesan & Tanya Kamar).
   * Katalog Kamar: Modal detail kamar & tombol ketersediaan kamar penuh.
   * Katalog Oleh-oleh: Modal keranjang belanja titip ambil & modal beli cepat.
   * Halaman Kontak: Teks info kontak, link WhatsApp, link telpon seluler, dan form pertanyaan cepat.
2. Tidak ada perubahan yang diperlukan pada VPS backend atau database Neon.
3. Build frontend lolos 100% tanpa regresi.
