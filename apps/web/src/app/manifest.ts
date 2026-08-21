import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Penginapan Annisa Ambon",
    short_name: "Annisa PMS",
    description:
      "Sistem Manajemen Kamar Transit & Katalog Penginapan Annisa (750m Bandara Pattimura)",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9fc",
    theme_color: "#7e22ce",
    icons: [
      {
        src: "/logo-penginapan-annisa.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-penginapan-annisa.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
