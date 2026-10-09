import type { MetadataRoute } from "next";

const BASE_URL = "https://www.penginapanannisa.com";

const DEFAULT_ARTICLE_SLUGS = [
  "pesona-pantai-liang-pantai-terindah-ambon",
  "sensasi-rujak-natsepa-kuliner-wajib-ambon",
  "panduan-transit-nyaman-bandara-pattimura-ambon",
  "keajaiban-belut-morea-raksasa-desa-waai",
  "oleh-oleh-khas-ambon-minyak-kayu-putih-bagea",
  "senja-magis-pintu-kota-tebing-karang-ikonik",
  "sejarah-benteng-amsterdam-hila-maluku",
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
    const res = await fetch(`${apiUrl}/articles`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        slugs = data.map((item: { slug: string }) => item.slug);
      }
    }
  } catch {
    // Gunakan daftar default jika API sedang offline saat proses build
  }

  const dynamicArticleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicArticleRoutes];
}
