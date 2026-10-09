import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Wisata & Tips Transit Ambon",
  description:
    "Kumpulan artikel wisata Ambon, rekomendasi kuliner, dan tips transit penerbangan praktis di sekitar Bandara Internasional Pattimura Ambon.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
