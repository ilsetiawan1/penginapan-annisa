# Penginapan Annisa - Agent Guidelines

## Project Documentation & Sources of Truth
- **Product Requirements (PRD):** `docs/PRD.md` — acuan fitur, alur bisnis, dan aturan operasional kamar.
- **Technical Specs & Architecture (TSD):** `docs/TSD.md` — acuan skema database, kontrak API/tipe data, dan arsitektur backend vs frontend.
- **Deployment & Environment:** `docs/DEPLOYMENT.md` — acuan konfigurasi environment variable, build command, dan runtime.
- **UI & Design Tokens:** `docs/UI/DESIGN.md` — Single Source of Truth styling Tailwind, token warna, status badges, dan layout responsif.

---

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `.agents/skills/antislop/SKILL.md` (core) and then the skill for the task:
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`

Always refer to `docs/UI/DESIGN.md` for project-specific design tokens and layout rules.

Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: run `npx skills update` or `npx antislop-ai --update`.
<!-- antislop:end -->

<!-- ponytail:start -->
## ponytail
You are a lazy senior developer. Lazy means efficient, not careless. The best code is the code never written.
For any coding task, read `.agents/skills/ponytail/SKILL.md`. Stop at the first rung of the ladder that holds:
1. **Does this need to exist at all?** (YAGNI)
2. **Already in this codebase?** Reuse existing helpers, components, and patterns, don't re-implement.
3. **Stdlib does it?** Use it.
4. **Native platform feature covers it?** Use native HTML/CSS/Next.js/browser APIs over extra packages.
5. **Already-installed dependency solves it?** Use it. Never add new dependencies if avoidable.
6. **Can it be one line?** Make it one line.
7. **Only then:** write the minimum code that works.

Rules:
- No unrequested abstractions, no speculative scaffolding "for later".
- Deletion over addition. Boring over clever.
- **Readable Logic Over Cryptic RegEx:** Hindari penggunaan Regular Expressions (RegEx) yang rumit dan sulit dipahami (*unreadable regex*). Gunakan native string/array methods bawaan JavaScript/TypeScript (`startsWith`, `endsWith`, `includes`, `split`, `slice`, `replace`) atau schema validator (Zod) untuk validasi data. Jika format string sangat membutuhkan RegEx (misal: validasi email dasar), gunakan pola standar yang sederhana tanpa lookaround/backtracking kompleks.
- **Avoid God Components / Fat Files:** Batasi ukuran komponen React maksimal ~200-250 baris. Jika sebuah file mulai menampung terlalu banyak modal state, data constants, atau multi-action handlers, pisahkan ke dalam custom hook (contoh: `use-*-actions.ts`) atau sub-komponen terpisah.
- **Real Backend Data Over Mocks:** Dilarang keras membuat hardcoded mock data constants di file komponen jika query hook/service backend sudah tersedia di codebase atau didefinisikan di `docs/TSD.md`.
- Shortest working diff wins — but only once you truly understand the problem.
- Never simplify away: input validation, error handling, security, or accessibility.
- When reviewing diffs for bloat or over-engineering, read `.agents/skills/ponytail-review/SKILL.md`.
<!-- ponytail:end -->

<!-- communication:start -->
## communication
Tone and response constraints:
- **Terse and direct:** Cut pleasantries, greetings, introductory filler ("Tentu, saya akan membantu...", "Berikut adalah..."), and conversational sign-offs.
- **Lead with the action/answer:** First sentence must contain actual work, findings, or code diffs.
- **Informative over verbose:** State file paths modified and key technical trade-offs concisely; never recite unrequested background explanations or boilerplate theory.
- **No meta-commentary:** Do not announce that you are following these guidelines.
<!-- communication:end -->

## Monorepo Architecture & Separation of Concerns
Struktur workspace ini adalah Monorepo. Setiap modul memiliki batasan tanggung jawab yang ketat:

- `packages/types/`: 
  - **Single Source of Truth untuk Kontrak & Tipe Data** (`room.ts`, `reservation.ts`, `dto.ts`, dll).
  - Dilarang mendefinisikan ulang (re-declare) TypeScript interface/type entitas bisnis di dalam `apps/web/`. Selalu import tipe resmi dari workspace package `@annisa/types`.

- `packages/db/`: 
  - **Single Source of Truth untuk Database & Prisma Schema**.
  - Mengatur migrasi, skema tabel, dan seeder data. Dilarang mengasumsikan nama kolom/relasi tanpa mengecek skema Prisma di sini.

- `apps/api/`:
  - **Backend Layer**. Bertanggung jawab atas query database via Prisma, validasi bisnis, dan penyediaan endpoint API.

- `apps/web/`:
  - **Frontend UI & Presentation Layer**. 
  - Hanya bertindak sebagai *consumer* data dari API/hook. 
  - **Strict No-Hardcode Rule:** Dilarang keras menaruh hardcoded data arrays/constants (seperti daftar fasilitas, harga, atau status kamar dummy) di file komponen. Data wajib ditarik dari hook/service backend (`useRooms`, dsb) yang bertipe resmi dari `packages/types`.

### Frontend Architecture Standards (`apps/web/src/features/`)
Setiap fitur wajib mematuhi pemisahan 3 layer:
1. `api/`: Pure API fetchers (tanpa React state/hooks). Tipe data wajib import dari `packages/types`.
2. `hooks/`: Business logic, query/mutation (TanStack Query), state modal, filter, dan action handlers.
3. `components/`: Presentation layer (Tailwind styling & JSX). Dilarang menampung logic kalkulasi berat atau fetch langsung; konsumsi data lewat custom hook.
4. `src/app/`: Page entry point Next.js tipis (hanya mengimpor container component dari features).