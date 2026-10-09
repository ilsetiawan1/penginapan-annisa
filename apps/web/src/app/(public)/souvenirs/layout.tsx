import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etalase Oleh-Oleh Khas Ambon",
  description:
    "Koleksi oleh-oleh khas Maluku: Minyak Kayu Putih Namlea asli, kue bagea, roti kenari, dan camilan khas Ambon. Siap ambil saat transit di Penginapan Annisa.",
  alternates: {
    canonical: "/souvenirs",
  },
};

export default function SouvenirsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
