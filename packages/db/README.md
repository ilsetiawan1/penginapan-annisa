# 🗄️ Penginapan Annisa — Database Package (`@annisa/db`) 📦

Package internal basis data untuk **Penginapan Annisa**, mengelola skema **Prisma ORM v6**, migrasi, dan seeder data relasional **PostgreSQL**.

---

## 🛠️ Features & Stack

- **ORM:** Prisma ORM v6 (`@prisma/client`)
- **Engine:** PostgreSQL 16+ (Lokal dev via pgAdmin/Docker $\rightarrow$ Self-Hosted VPS saat produksi)
- **Singleton Client:** Auto-reused Prisma Client instance untuk menghindari koneksi ganda di development mode
- **Seeder Data:** Data awal realistis untuk 8 unit kamar resmi, akun Owner & Staf, produk oleh-oleh, dan artikel wisata

---

## 📊 Model Skema Basis Data

1. **`User`:** Akun pengguna sistem dengan Role-Based Access Control (`owner` & `staff`).
2. **`RoomType`:** Kategori kamar (`Kamar Tipe AC` @ Rp 275.000 & `Kamar Tipe Kipas` @ Rp 200.000).
3. **`Room`:** 8 Unit fisik kamar resmi:
   - **Bangunan A:** `#A1`, `#A2` (AC) • `#A3`, `#A4` (Kipas)
   - **Bangunan B:** `#B1`, `#B2` (AC) • `#B3`, `#B4` (Kipas)
4. **`RoomImage`:** Galeri foto kamar beresolusi tinggi yang terhubung ke ImageKit.io CDN.
5. **`Guest`:** Direktori buku tamu dan nomor kontak WhatsApp aktif.
6. **`Reservation`:** Transaksi reservasi, kalkulasi DP 50%, pelunasan, dan status operasional check-in/out.
7. **`Souvenir` & `SouvenirCategory`:** Etalase produk dan stok inventaris kasir POS oleh-oleh khas Maluku.
8. **`Article` & `ArticleCategory`:** CMS konten panduan wisata dan tips transit Bandara Pattimura Ambon.

---

## ⚡ Database Commands

```bash
# Generate Prisma Client TypeScript Types
bun run db:generate

# Dorong (Push) perubahan skema schema.prisma ke PostgreSQL
bun run db:push

# Jalankan Seeder data awal ke database
bun run seed
```

---

## 💻 Cara Penggunaan di Modul Lain

```typescript
import { prisma } from "@annisa/db";

// Contoh query 8 unit kamar
const rooms = await prisma.room.findMany({
  include: { roomType: true },
  orderBy: { roomNumber: "asc" },
});
```
