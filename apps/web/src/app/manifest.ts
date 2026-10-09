import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Penginapan Annisa Ambon",
    short_name: "Annisa PMS",
    description:
      "Sistem Manajemen Kamar Transit & Katalog Penginapan Annisa (2-3 Menit dari Bandara Pattimura)",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9fc",
    theme_color: "#7a68b7",
    icons: [
      {
        src: "/images/branding/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/branding/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
