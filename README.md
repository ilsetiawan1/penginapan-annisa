# 🏨 Penginapan Annisa — Property Management & Reservation System

![Stack](https://img.shields.io/badge/Stack-Bun_Monorepo_%7C_Next.js_15_%7C_Express_TS_%7C_Prisma_v6_%7C_Tailwind_CSS-0f172a?style=for-the-badge&logo=bun)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Phase_1_Setup-blue?style=for-the-badge)

Sistem Informasi Manajemen Properti (PMS) Ringan, Reservasi WhatsApp Mandiri, dan Etalase Digital untuk **Penginapan Annisa** — Penginapan Transit Terdekat (750 Meter) dari **Bandara Internasional Pattimura Ambon, Maluku**.

---

## 🏗️ Arsitektur Monorepo

Dibangun dengan arsitektur **Bun Workspaces Monorepo**:

```text
penginapan-annisa/
├── apps/
│   ├── api/          # Express.js REST API (TypeScript + Bun Runtime + Scalar API Docs)
│   └── web/          # Next.js 15 App Router (React 19 + Tailwind CSS + Radix UI)
├── packages/
│   ├── db/           # Prisma ORM v6 (PostgreSQL Client & Database Seeder)
│   └── types/        # Shared TypeScript Interfaces & Data Contracts
├── docs/
│   └── PRD.md        # Product Requirement Document (PRD) Lengkap V1
├── biome.json        # Linter & Formatter Biome JS
├── package.json      # Monorepo Workspace Root
└── README.md
```

---

## 🛠️ Modul & Tech Stack

| Layer | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Runtime & Workspaces** | **Bun 1.3+** | Workspace manager, script runner & test runner super cepat |
| **Frontend Web** | **Next.js 15 (App Router)** | Tailwind CSS + Radix UI + TanStack Query v5 + Lucide Icons |
| **Backend REST API** | **Express.js (TypeScript)** | Berjalan di atas Bun Runtime + Pino Logger + JWT Auth |
| **Database & ORM** | **Prisma v6 + PostgreSQL (Neon.tech)** | 8 Unit Kamar (4 AC + 4 Kipas), Tamu, Reservasi, Oleh-oleh |
| **API Documentation** | **Scalar API Reference** | Dokumentasi interaktif via Scalar (`/docs` port 4000) |
| **Cloud Target** | **Vercel + Neon + Cloudinary** | Hosting serverless hemat biaya (Target biaya server Rp 0/bulan) |

---

## ⚡ Panduan Memulai (Quick Start)

### 1. Prasyarat:
* Install [Bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash` atau via Powershell)

### 2. Install Dependensi:
```bash
bun install
```

### 3. Setup Environment:
```bash
cp .env.example .env
```

### 4. Database Setup & Seeder:
```bash
# Generate Prisma Client
bun db:generate

# Push schema ke database PostgreSQL (Neon.tech)
bun db:push

# Seed data awal 8 kamar, oleh-oleh, dan user staf
bun db:seed
```

### 5. Menjalankan Mode Development:
```bash
# Menjalankan frontend dan backend secara bersamaan
bun dev

# Atau jalankan secara terpisah:
bun dev:web   # Frontend Web di http://localhost:3000
bun dev:api   # Backend API di http://localhost:4000
```

* **Frontend Web:** `http://localhost:3000`
* **Backend API & Health:** `http://localhost:4000/health`
* **Scalar API Reference:** `http://localhost:4000/docs`

---

## 📍 Informasi Bisnis Penginapan Annisa
* **Lokasi:** 750 meter dari Bandara Internasional Pattimura Ambon ([Google Maps](https://maps.app.goo.gl/PskXAUZuGD7NeMoL7))
* **Kapasitas:** 8 Kamar (4 Kamar AC @ Rp 275.000 + 4 Kamar Kipas @ Rp 200.000)
* **Kontak WhatsApp:** `081242163116` (`6281242163116`)
* **Kebijakan DP:** 50% Transfer Bank untuk Reservasi Online
