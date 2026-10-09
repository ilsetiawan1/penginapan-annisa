import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilihan Kamar Transit AC & Kipas",
  description:
    "Daftar 8 unit kamar transit bersih dan nyaman di Penginapan Annisa. Dilengkapi AC/Kipas, kamar mandi dalam, WiFi gratis, hanya 2-3 menit dari Bandara Pattimura Ambon.",
  alternates: {
    canonical: "/rooms",
  },
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
