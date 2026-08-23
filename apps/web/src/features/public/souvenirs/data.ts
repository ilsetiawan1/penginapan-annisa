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

export const SOUVENIR_COLLECTION: SouvenirProduct[] = [
  {
    id: 1,
    name: "Minyak Cengkeh Murni (60ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak & Herbal Alami",
    price: "Rp 55.000",
    priceNum: 55000,
    desc: "Ekstraksi murni bunga cengkeh pilihan tanah Maluku. Hangat alami & berkhasiat.",
    origin: "Kepulauan Maluku",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Minyak Kayu Putih Namlea (100ml)",
    category: "Minyak & Herbal",
    categoryLabel: "Minyak & Herbal Alami",
    price: "Rp 65.000",
    priceNum: 65000,
    desc: "Penyulingan murni 100% Pulau Buru Namlea. Aroma khas menenangkan bebas campuran.",
    origin: "Namlea, Pulau Buru",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kue Sagu Bagea Kenari Ambon",
    category: "Makanan & Camilan",
    categoryLabel: "Camilan Khas Maluku",
    price: "Rp 35.000",
    priceNum: 35000,
    desc: "Kue sagu renyah gurih bertabur kenari melimpah, teman kopi & teh favorit transit.",
    origin: "Ambon Manise",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kacang Botol Gurih Ambon",
    category: "Makanan & Camilan",
    categoryLabel: "Camilan Khas Maluku",
    price: "Rp 45.000",
    priceNum: 45000,
    desc: "Kacang renyah bumbu rempah khas Ambon dalam kemasan botol praktis & aman bagasi.",
    origin: "Ambon Manise",
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Abon Ikan Cakalang Asap",
    category: "Makanan & Camilan",
    categoryLabel: "Olahan Ikan Laut",
    price: "Rp 50.000",
    priceNum: 50000,
    desc: "Abon cakalang asap gurih rempah asli laut Banda, siap santap & tahan lama.",
    origin: "Pesisir Maluku",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Roti Kenari Khas Maluku (1 Kotak)",
    category: "Makanan & Camilan",
    categoryLabel: "Camilan Khas Maluku",
    price: "Rp 45.000",
    priceNum: 45000,
    desc: "Roti panggang kering renyah dengan taburan gula manis dan kenari gurih harum berlimpah.",
    origin: "Khas Kepulauan Ambon",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Halua Kenari Gula Aren Maluku",
    category: "Makanan & Camilan",
    categoryLabel: "Camilan Khas Maluku",
    price: "Rp 38.000",
    priceNum: 38000,
    desc: "Biji kenari pilihan disangrai dan dibalut karamel gula aren murni khas Saparua Maluku.",
    origin: "Saparua, Maluku",
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Sambal Roa Khas Kepulauan Ambon",
    category: "Makanan & Camilan",
    categoryLabel: "Olahan Ikan Laut",
    price: "Rp 50.000",
    priceNum: 50000,
    desc: "Sambal ikan asap pedas gurih, pas untuk lauk pelengkap santapan maupun buah tangan praktis.",
    origin: "Pesisir Maluku",
    image:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600&auto=format&fit=crop",
  },
];
