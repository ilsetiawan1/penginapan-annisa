import type { MetadataRoute } from "next";

const BASE_URL = "https://www.penginapanannisa.com";

const DEFAULT_ARTICLE_SLUGS = [
  "trik-cerdas-kemas-bagasi-transit-pattimura",
  "tips-transit-nyaman-di-bandara-pattimura",
  "panduan-transit-nyaman-di-bandara-pattimura-ambon-tips-anti-telat-untuk-penerbangan-pagi",
  "wisata-pantai-natsepa-ambon-daya-tarik-tiket-dan-jam-buka",
  "rekomendasi-wisata-air-di-maluku-tengah-dari-hangatnya-tulehu-ke-segarnya-pantai-liang",
  "pantai-liang-diserbu-ribuan-pengunjung-saat-musim-liburan",
  "pantai-liang-daya-tarik-harga-tiket-dan-rute",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Rute Statis Utama & Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/rooms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/souvenirs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Rute Dinamis Artikel Wisata & Panduan Transit
  let slugs = DEFAULT_ARTICLE_SLUGS;

  try {
    const apiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://103.143.12.212/api/v1";
    const res = await fetch(`${apiUrl}/articles`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const articles = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(articles) && articles.length > 0) {
        slugs = articles.map((item: { slug: string }) => item.slug);
      }
    }
  } catch {
    // Gunakan daftar default resmi jika API sedang offline saat proses build
  }

  const dynamicArticleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicArticleRoutes];
}
