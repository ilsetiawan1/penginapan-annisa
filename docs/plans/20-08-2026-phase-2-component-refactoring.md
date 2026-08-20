# 📋 Plan: Fase 2 — Refactoring Komponen & Modularisasi UI (Dual-Zone Architecture)
**Tanggal:** 20 Agustus 2026  
**Status:** In Progress (Execution)  
**Referensi:** [PRD.md](../PRD.md) & [TRD.md](../TRD.md)

---

## 🎯 1. Tujuan & Latar Belakang

Pada tahap awal Fase 2, tampilan antarmuka (UI) untuk 5 halaman publik (*Beranda, /kamar, /oleh-oleh, /artikel, /contact*) telah selesai dibangun secara visual (*high-fidelity prototype*). Namun, kodenya masih terkonsentrasi di dalam file `page.tsx` yang besar (*fat views*).

Rencana ini bertujuan untuk melakukan **Component Decomposition & Refactoring** secara menyeluruh ke dalam struktur **Dual-Zone Feature-Driven Architecture (`src/features/public/`)**:
1. **Memecah Fat Views** menjadi komponen mandiri (*high cohesion, loose coupling*).
2. **Membuat Sub-Komponen Granular** (Hero, Filter, Guide Card, Card, Grid).
3. **Membuat Global Utilities & Shared Layout** (`src/lib/whatsapp.ts`, `Footer`, `Navbar`).
4. **Membuat File Halaman (`page.tsx`) Sangat Ramping & Bersih** (tinggal *compose* komponen).

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
│   ├── navbar.tsx                             # Header navigasi utama
│   └── footer.tsx                             # Unified footer terpusat
│
└── features/public/                           # Zona Portal Publik Tamu
    │
    ├── home/                                  # 🏠 MENU 1: BERANDA (/)
    │   └── components/
    │       ├── hero-section.tsx               # Headline, background, CTA buttons
    │       ├── booking-widget.tsx             # Interactive DP 50% booking calculator
    │       ├── values-section.tsx             # 4 nilai keunggulan (750m bandara, fleksibel 24h)
    │       ├── home-rooms-preview.tsx         # Preview 4 kamar di beranda
    │       ├── home-souvenirs-preview.tsx     # Preview produk etalase di beranda
    │       ├── faq-section.tsx                # Accordion tanya jawab transit
    │       └── location-section.tsx           # Peta Google Maps & rute dari terminal
    │
    ├── rooms/                                 # 🛏️ MENU 2: TIPE KAMAR (/kamar)
    │   └── components/
    │       ├── room-hero.tsx                  # Hero background Bandara Pattimura
    │       ├── room-filter.tsx                # Filter status (Semua, AC, Kipas, Tersedia)
    │       ├── room-guide-card.tsx            # Kartu panduan fasilitas & check-in
    │       ├── room-card.tsx                  # Kartu 1 kamar (Status 🟢/🔵, badge A1-B4, WA button)
    │       └── room-grid.tsx                  # Grid 8 kamar dengan empty state
    │
    ├── souvenirs/                             # 🎁 MENU 3: OLEH-OLEH (/oleh-oleh)
    │   └── components/
    │       ├── souvenir-hero.tsx              # Hero background produk otentik Maluku
    │       ├── souvenir-filter.tsx            # Filter kategori (Herbal, Sagu, Kopi, Sambal)
    │       ├── souvenir-guide-card.tsx        # Kartu jaminan keaslian & belanja di resepsionis
    │       ├── souvenir-card.tsx              # Kartu 1 produk (foto, harga, origin, WA button)
    │       └── souvenir-grid.tsx              # Grid etalase produk
    │
    ├── articles/                              # 📰 MENU 4: ARTIKEL WISATA (/artikel)
    │   └── components/
    │       ├── article-hero.tsx               # Hero background Pantai Liang & search bar
    │       ├── article-filter.tsx             # Filter kategori artikel
    │       ├── exploration-card.tsx           # Kartu eksplorasi wisata & tips transit 2 kolom
    │       ├── article-card.tsx               # Kartu artikel blog
    │       └── article-grid.tsx               # Grid artikel terbaru
    │
    └── contact/                               # 📞 MENU 5: KONTAK (/contact)
        └── components/
            ├── contact-hero.tsx               # Hero kontak & bantuan 24 jam
            ├── contact-form.tsx               # Form inquiry langsung kirim WhatsApp
            ├── contact-info.tsx               # Alamat, telepon, jarak bandara 750m
            └── contact-map.tsx                # Embed peta interaktif Google Maps
```

---

## 📋 3. Tahapan Eksekusi Step-by-Step

- [ ] **Langkah 1:** Buat `src/lib/whatsapp.ts` (Global helper untuk seluruh link WhatsApp).
- [ ] **Langkah 2:** Buat `src/components/layout/footer.tsx` (Shared footer reusable).
- [ ] **Langkah 3:** Refactoring `features/public/home/` & rampingkan `src/app/page.tsx`.
- [ ] **Langkah 4:** Refactoring `features/public/rooms/` & rampingkan `src/app/kamar/page.tsx`.
- [ ] **Langkah 5:** Refactoring `features/public/souvenirs/` & rampingkan `src/app/oleh-oleh/page.tsx`.
- [ ] **Langkah 6:** Refactoring `features/public/articles/` & rampingkan `src/app/artikel/page.tsx`.
- [ ] **Langkah 7:** Refactoring `features/public/contact/` & buat halaman `src/app/contact/page.tsx`.
- [ ] **Langkah 8:** Verifikasi build & runtime (`bun run build` / `bun dev`).
