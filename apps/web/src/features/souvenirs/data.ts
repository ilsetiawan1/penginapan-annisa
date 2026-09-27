export interface SouvenirProduct {
  id: number;
  name: string;
  category: "Minyak & Herbal" | "Makanan & Camilan";
  categoryLabel: string;
  price: string;
  priceNum: number;
  desc: string;
  origin: string;
  image: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const SOUVENIR_COLLECTION: SouvenirProduct[] = [
  {
    id: 1,
    name: "MKP - Cap Merpati Putih (40ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak Kayu Putih Asli",
    price: "Rp 40.000",
    priceNum: 40000,
    desc: "Minyak kayu putih Cap Merpati Putih kemasan botol kaca praktis 40ml. Efektif menghangatkan badan dan meredakan masuk angin.",
    origin: "Ambon Manise",
    image: `${API_BASE}/storage/view?key=souvenirs/mkp-cap-merpati-putih-40ml-1790483141487.jpg`,
  },
  {
    id: 2,
    name: "MKP - Cap Mutiara (100ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak Kayu Putih Asli",
    price: "Rp 75.000",
    priceNum: 75000,
    desc: "Minyak kayu putih asli Cap Mutiara kemasan botol kaca 100ml. Menghangatkan badan dengan aroma alami segar tahan lama.",
    origin: "Ambon Manise",
    image: `${API_BASE}/storage/view?key=souvenirs/mkp-cap-mutiara-100ml-1790482984976.jpg`,
  },
  {
    id: 3,
    name: "MKP - Cap Merpati Putih (12 x 22ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak Kayu Putih Asli",
    price: "Rp 150.000",
    priceNum: 150000,
    desc: "Minyak kayu putih Cap Merpati Putih kemasan 1 kotak isi 12 botol x 22ml. Praktis dibawa bepergian dan berkhasiat.",
    origin: "Ambon Manise",
    image: `${API_BASE}/storage/view?key=souvenirs/mkp-cap-merpati-putih-12-x-22ml-1790482892229.jpg`,
  },
  {
    id: 4,
    name: "MKP -  Cap Mutiara (275ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak Kayu Putih Asli",
    price: "Rp 175.000",
    priceNum: 175000,
    desc: "Minyak kayu putih murni Cap Mutiara kemasan botol kaca isi 275ml. Aroma kuat hangat tahan lama, wajib oleh-oleh Ambon.",
    origin: "Ambon Manise",
    image: `${API_BASE}/storage/view?key=souvenirs/minyak-kayu-putih-cap-mutiara-275ml-1790482606250.jpg`,
  },
  {
    id: 5,
    name: "MKP - Cap Merpati Putih (2x100ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak Kayu Putih Asli",
    price: "Rp 130.000",
    priceNum: 130000,
    desc: "Minyak kayu putih Cap Merpati Putih kemasan kotak praktis isi 2 botol x 100ml. Hangat menenangkan, khasiat murni bebas campuran.",
    origin: "Ambon Manise",
    image: `${API_BASE}/storage/view?key=souvenirs/minyak-kayu-putih-cap-merpati-putih-2x100ml-1790339269463.jpg`,
  },
];
