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
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
