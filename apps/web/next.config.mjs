/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Abaikan linting bawaan Next.js saat build di Vercel karena proyek menggunakan Biome
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Pastikan build Vercel tidak terhenti karena type check prototype
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/kamar",
        destination: "/rooms",
        permanent: true,
      },
      {
        source: "/oleh-oleh",
        destination: "/souvenirs",
        permanent: true,
      },
      {
        source: "/artikel",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/artikel/:slug*",
        destination: "/articles/:slug*",
        permanent: true,
      },
      // 301 Redirects untuk slug lama yang terlanjur terindeks di Google Search
      {
        source: "/articles/oleh-oleh-khas-ambon-minyak-kayu-putih-bagea",
        destination: "/souvenirs",
        permanent: true,
      },
      {
        source: "/articles/pesona-pantai-liang-pantai-terindah-ambon",
        destination: "/articles/pantai-liang-daya-tarik-harga-tiket-dan-rute",
        permanent: true,
      },
      {
        source: "/articles/sensasi-rujak-natsepa-kuliner-wajib-ambon",
        destination: "/articles/wisata-pantai-natsepa-ambon-daya-tarik-tiket-dan-jam-buka",
        permanent: true,
      },
      {
        source: "/articles/panduan-transit-nyaman-bandara-pattimura-ambon",
        destination: "/articles/panduan-transit-nyaman-di-bandara-pattimura-ambon-tips-anti-telat-untuk-penerbangan-pagi",
        permanent: true,
      },
      {
        source: "/articles/keajaiban-belut-morea-raksasa-desa-waai",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/articles/senja-magis-pintu-kota-tebing-karang-ikonik",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/articles/sejarah-benteng-amsterdam-hila-maluku",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.INTERNAL_API_URL || "http://103.143.12.212/api/v1";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/:path*`,
      },
      {
        source: "/backend-health",
        destination: "http://103.143.12.212/health",
      },
    ];
  },
};

export default nextConfig;
