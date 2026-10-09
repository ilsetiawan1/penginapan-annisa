import type { Metadata, Viewport } from "next";
import { Outfit, Poppins } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a68b7",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.penginapanannisa.com"),
  title: {
    default: "Penginapan Annisa: Penginapan Transit 2-3 Menit dari Bandara Pattimura Ambon",
    template: "%s | Penginapan Annisa",
  },
  description:
    "Penginapan transit nyaman, bersih, dan hemat hanya 2-3 menit dari Bandara Internasional Pattimura Ambon. Dilengkapi AC/Kipas, WiFi gratis, kamar mandi dalam, dan etalase oleh-oleh khas Maluku.",
  keywords: [
    "penginapan dekat bandara pattimura",
    "hotel dekat bandara ambon",
    "penginapan transit ambon",
    "penginapan annisa",
    "hotel transit bandara pattimura",
    "penginapan murah tawiri ambon",
    "hotel tawiri ambon",
  ],
  authors: [{ name: "Penginapan Annisa", url: "https://www.penginapanannisa.com" }],
  creator: "Penginapan Annisa",
  publisher: "Penginapan Annisa",
  alternates: {
    canonical: "https://www.penginapanannisa.com",
  },
  openGraph: {
    title: "Penginapan Annisa: Penginapan Transit 2-3 Menit dari Bandara Pattimura Ambon",
    description:
      "Penginapan transit nyaman, bersih, dan hemat hanya 2-3 menit dari Bandara Internasional Pattimura Ambon. Kamar AC/Kipas, kamar mandi dalam, WiFi kencang, dan bebas macet.",
    url: "https://www.penginapanannisa.com",
    siteName: "Penginapan Annisa",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/heroes/home-hero.webp",
        width: 1200,
        height: 630,
        alt: "Penginapan Annisa Bandara Pattimura Ambon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penginapan Annisa: Penginapan Transit 2-3 Menit dari Bandara Pattimura Ambon",
    description:
      "Penginapan transit nyaman, bersih, dan hemat hanya 2-3 menit dari Bandara Internasional Pattimura Ambon.",
    images: ["/images/heroes/home-hero.webp"],
  },
  icons: {
    icon: [
      { url: "/images/branding/favicon.ico" },
      { url: "/images/branding/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/branding/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/branding/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${outfit.variable}`}>
      <body
        className={`${poppins.className} antialiased bg-[#faf9fc] text-slate-900 selection:bg-purple-200 selection:text-purple-900`}
      >
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
