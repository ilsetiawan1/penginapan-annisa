/**
 * Utility untuk normalisasi URL gambar Cloudflare R2 / API Storage View
 * Memastikan gambar tetap valid baik saat dijalankan di Localhost maupun Live Production (Railway/Vercel)
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  const apiBase =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000/api/v1";

  // Jika URL di database masih mengarah ke localhost:4000 tetapi server sekarang berjalan di production
  if (url.includes("localhost:4000/api/v1")) {
    return url.replace("http://localhost:4000/api/v1", apiBase);
  }

  // Jika URL disimpan sebagai relative path
  if (url.startsWith("/storage/view")) {
    return `${apiBase}${url}`;
  }

  return url;
}
