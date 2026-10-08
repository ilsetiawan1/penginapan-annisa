/**
 * String & Formatting Helper Utilities (Frontend Single Source of Truth)
 *
 * Menerapkan standardisasi manipulasi string murni dengan type-safety & null-safety penuh,
 * menggantikan inline regex di komponen JSX.
 */

/**
 * Membersihkan awalan "Kamar " atau "Tipe " dari nama kamar/tipe secara aman.
 * Contoh: "Kamar Tipe AC" -> "AC", "Tipe Kipas" -> "Kipas", "Kamar AC" -> "AC"
 */
export function formatCleanRoomType(name?: string | null): string {
  if (!name) return "";
  let text = name.trim();
  while (text.toLowerCase().startsWith("kamar ") || text.toLowerCase().startsWith("tipe ")) {
    if (text.toLowerCase().startsWith("kamar ")) {
      text = text.slice(6).trim();
    } else if (text.toLowerCase().startsWith("tipe ")) {
      text = text.slice(5).trim();
    }
  }
  return text;
}

/**
 * Membersihkan suffix dalam tanda kurung pada nama kamar.
 * Contoh: "Kamar A1 (AC)" -> "Kamar A1", "Kamar B2 (Kipas)" -> "Kamar B2"
 */
export function formatCleanRoomName(name?: string | null): string {
  if (!name) return "";
  const parenIndex = name.indexOf("(");
  return parenIndex !== -1 ? name.slice(0, parenIndex).trim() : name.trim();
}

/**
 * Mengonversi string format rupiah atau angka menjadi number murni secara aman (anti-crash).
 * Contoh: "275.000" -> 275000, "Rp 200.000" -> 200000, 275000 -> 275000
 */
export function parsePriceToNumber(price?: string | number | null): number {
  if (price === null || price === undefined) return 0;
  if (typeof price === "number") return Number.isFinite(price) ? price : 0;
  const digitsOnly = price.split(".").join("").replace(/\D/g, "");
  return Number(digitsOnly) || 0;
}

/**
 * Generator slug URL ramah SEO terpusat.
 * Contoh: "Minyak Kayu Putih 100ml" -> "minyak-kayu-putih-100ml"
 */
export function generateSlug(text?: string | null): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Membersihkan kutip ganda atau tunggal pada URL gambar dari respons database/JSON.
 * Contoh: "\"https://image.com/pic.jpg\"" -> "https://image.com/pic.jpg"
 */
export function cleanImageUrl(url?: string | null): string {
  if (!url) return "";
  return url.replace(/^['"]+|['"]+$/g, "").trim();
}
