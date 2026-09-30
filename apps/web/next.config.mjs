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
