import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Penginapan Annisa — Penginapan Transit 750m dari Bandara Pattimura Ambon",
  description:
    "Penginapan transit nyaman, bersih, dan hemat hanya 750 meter dari Bandara Internasional Pattimura Ambon. Dilengkapi AC/Kipas, WiFi gratis, kamar mandi dalam, dan etalase oleh-oleh khas Maluku.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
