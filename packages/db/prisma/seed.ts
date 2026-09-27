import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Menjalankan Seeder Data Resmi Penginapan Annisa...");

  // ----------------------------------------------------
  // 1. SEED AKUN USER (OWNER & STAF)
  // ----------------------------------------------------
  const ownerPassword = await Bun.password.hash("owner123", {
    algorithm: "bcrypt",
    cost: 10,
  });
  const staffPassword = await Bun.password.hash("staff123", {
    algorithm: "bcrypt",
    cost: 10,
  });

  const ownerUser = await prisma.user.upsert({
    where: { email: "owner@penginapan-annisa.com" },
    update: {
      role: "owner",
      passwordHash: ownerPassword,
    },
    create: {
      name: "Ibu Annisa (Owner)",
      email: "owner@penginapan-annisa.com",
      passwordHash: ownerPassword,
      role: "owner",
    },
  });

  const staffUser = await prisma.user.upsert({
    where: { email: "staff@penginapan-annisa.com" },
    update: {
      role: "staff",
      passwordHash: staffPassword,
    },
    create: {
      name: "Resepsionis Annisa",
      email: "staff@penginapan-annisa.com",
      passwordHash: staffPassword,
      role: "staff",
    },
  });

  console.log(
    "✅ User seeded:",
    ownerUser.email,
    "(owner) &",
    staffUser.email,
    "(staff)",
  );

  // ----------------------------------------------------
  // 2. SEED 2 TIPE KAMAR (AC @ 275rb & KIPAS @ 200rb)
  // ----------------------------------------------------
  const acType = await prisma.roomType.upsert({
    where: { slug: "kamar-ac" },
    update: {
      basePrice: 275000,
      capacity: 3,
      facilities: JSON.stringify([
        "AC Dingin 1 PK",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis 50 Mbps",
        "TV LED 32 Inch",
        "Handuk Bersih & Sabun",
        "Air Mineral Gratis",
      ]),
    },
    create: {
      name: "Kamar Tipe AC",
      slug: "kamar-ac",
      description:
        "Kamar sejuk dan nyaman dengan AC dingin, kamar mandi dalam pribadi, TV LED, dan WiFi kencang. Pilihan terbaik untuk istirahat tenang sebelum penerbangan pagi.",
      basePrice: 275000,
      capacity: 3,
      bedType: "1 Queen Bed (Bisa + Extra Bed)",
      facilities: JSON.stringify([
        "AC Dingin 1 PK",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis 50 Mbps",
        "TV LED 32 Inch",
        "Handuk Bersih & Sabun",
        "Air Mineral Gratis",
      ]),
    },
  });

  const kipasType = await prisma.roomType.upsert({
    where: { slug: "kamar-kipas" },
    update: {
      basePrice: 200000,
      capacity: 3,
      facilities: JSON.stringify([
        "Kipas Angin Dinding Tornado",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis 50 Mbps",
        "TV",
        "Handuk Bersih & Sabun",
        "Air Mineral Gratis",
      ]),
    },
    create: {
      name: "Kamar Tipe Kipas",
      slug: "kamar-kipas",
      description:
        "Kamar ekonomis yang bersih, rapi, dan tenang dengan kipas angin dinding, kamar mandi dalam, dan WiFi gratis. Pilihan hemat transit 750m dari Bandara Pattimura.",
      basePrice: 200000,
      capacity: 3,
      bedType: "1 Double Bed / 2 Single Bed",
      facilities: JSON.stringify([
        "Kipas Angin Dinding Tornado",
        "Kamar Mandi Dalam Pribadi",
        "WiFi Gratis 50 Mbps",
        "TV",
        "Handuk Bersih & Sabun",
        "Air Mineral Gratis",
      ]),
    },
  });

  console.log("✅ Tipe Kamar seeded:", acType.name, "&", kipasType.name);

  // ----------------------------------------------------
  // 3. SEED 8 UNIT KAMAR RESMI (BANGUNAN A: A1-A4, BANGUNAN B: B1-B4)
  // ----------------------------------------------------
  const officialRooms = [
    // BANGUNAN A
    { number: "A1", building: "A", typeId: acType.id, status: "ready" },
    { number: "A2", building: "A", typeId: acType.id, status: "occupied" },
    { number: "A3", building: "A", typeId: kipasType.id, status: "dirty" },
    { number: "A4", building: "A", typeId: kipasType.id, status: "ready" },
    // BANGUNAN B
    { number: "B1", building: "B", typeId: acType.id, status: "booked" },
    { number: "B2", building: "B", typeId: acType.id, status: "ready" },
    { number: "B3", building: "B", typeId: kipasType.id, status: "occupied" },
    {
      number: "B4",
      building: "B",
      typeId: kipasType.id,
      status: "maintenance",
    },
  ];

  for (const r of officialRooms) {
    await prisma.room.upsert({
      where: { roomNumber: r.number },
      update: {
        roomTypeId: r.typeId,
        building: r.building,
        status: r.status,
      },
      create: {
        roomNumber: r.number,
        building: r.building,
        roomTypeId: r.typeId,
        status: r.status,
      },
    });
  }

  console.log("✅ 8 Unit Kamar Resmi (A1–A4 & B1–B4) seeded successfully!");

  // ----------------------------------------------------
  // 3b. SEED FOTO RESMI CLOUDFLARE R2 UNTUK KAMAR (A1–A4)
  // ----------------------------------------------------
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

  const officialRoomImages = [
    {
      roomTypeId: acType.id,
      caption: "A1",
      imageUrl: `${apiBase}/storage/view?key=rooms%2Fkamar-tipe-ac-1790413634948.jpg`,
      isPrimary: true,
    },
    {
      roomTypeId: acType.id,
      caption: "A2",
      imageUrl: `${apiBase}/storage/view?key=rooms%2Fkamar-tipe-ac-1790413648957.jpg`,
      isPrimary: false,
    },
    {
      roomTypeId: kipasType.id,
      caption: "A3",
      imageUrl: `${apiBase}/storage/view?key=rooms%2Fkamar-tipe-kipas-1790413667288.jpg`,
      isPrimary: true,
    },
    {
      roomTypeId: kipasType.id,
      caption: "A4",
      imageUrl: `${apiBase}/storage/view?key=rooms%2Fkamar-tipe-kipas-1790413690278.jpg`,
      isPrimary: false,
    },
  ];

  for (const img of officialRoomImages) {
    const existing = await prisma.roomImage.findFirst({
      where: {
        roomTypeId: img.roomTypeId,
        caption: img.caption,
      },
    });

    if (existing) {
      await prisma.roomImage.update({
        where: { id: existing.id },
        data: {
          imageUrl: img.imageUrl,
          isPrimary: img.isPrimary,
        },
      });
    } else {
      await prisma.roomImage.create({
        data: {
          roomTypeId: img.roomTypeId,
          caption: img.caption,
          imageUrl: img.imageUrl,
          isPrimary: img.isPrimary,
        },
      });
    }
  }

  console.log("✅ Foto Resmi Kamar Cloudflare R2 (A1–A4) seeded successfully!");

  // ----------------------------------------------------
  // 4. SEED KATEGORI & PRODUK OLEH-OLEH KHAS AMBON
  // ----------------------------------------------------
  const herbalCategory = await prisma.souvenirCategory.upsert({
    where: { slug: "minyak-kayu-putih-asli" },
    update: {},
    create: {
      name: "Minyak Kayu Putih Asli",
      slug: "minyak-kayu-putih-asli",
    },
  });

  const snackCategory = await prisma.souvenirCategory.upsert({
    where: { slug: "kue-makanan-khas" },
    update: {},
    create: {
      name: "Kue & Makanan Khas Maluku",
      slug: "kue-makanan-khas",
    },
  });

  const drinkCategory = await prisma.souvenirCategory.upsert({
    where: { slug: "kopi-minuman-rempah" },
    update: {},
    create: {
      name: "Kopi & Minuman Rempah",
      slug: "kopi-minuman-rempah",
    },
  });

  const souvenirsData = [
    {
      name: "MKP - Cap Merpati Putih (40ml)",
      categoryId: herbalCategory.id,
      price: 40000,
      stock: 20,
      description:
        "Minyak kayu putih Cap Merpati Putih produksi P. Merpati Putih dalam kemasan botol kaca praktis 40ml. Efektif menghangatkan badan, meredakan gejala masuk angin, perut kembung, dan rasa gatal akibat gigitan serangga. Ukuran pas untuk dibawa bepergian.",
      imageUrl: `${apiBase}/storage/view?key=souvenirs/mkp-cap-merpati-putih-40ml-1790483141487.jpg`,
    },
    {
      name: "MKP - Cap Mutiara (100ml)",
      categoryId: herbalCategory.id,
      price: 75000,
      stock: 20,
      description:
        "Minyak kayu putih asli Cap Mutiara produksi PT. Mutiara Batu Jaya Ambon kemasan botol kaca 100ml. Membantu menghangatkan badan, meredakan masuk angin, perut kembung, dan gatal akibat gigitan serangga. Aroma alami yang segar dan tahan lama.",
      imageUrl: `${apiBase}/storage/view?key=souvenirs/mkp-cap-mutiara-100ml-1790482984976.jpg`,
    },
    {
      name: "MKP - Cap Merpati Putih (12 x 22ml)",
      categoryId: herbalCategory.id,
      price: 150000,
      stock: 20,
      description:
        "Minyak kayu putih asli Cap Merpati Putih kemasan 1 kotak isi 12 botol x 22ml. Praktis dibawa bepergian, berkhasiat menghangatkan tubuh, meredakan masuk angin, perut kembung, dan gatal gigitan serangga. Kualitas murni dan berizin resmi BPOM.",
      imageUrl: `${apiBase}/storage/view?key=souvenirs/mkp-cap-merpati-putih-12-x-22ml-1790482892229.jpg`,
    },
    {
      name: "MKP -  Cap Mutiara (275ml)",
      categoryId: herbalCategory.id,
      price: 175000,
      stock: 18,
      description:
        "Minyak kayu putih asli Cap Mutiara 100% murni produksi P.J. Sinar Baru Ambon. Kemasan botol kaca isi 275ml dengan aroma khas yang kuat dan rasa hangat yang tahan lama. Berkhasiat meredakan masuk angin, perut kembung, pegal-pegal, gatal gigitan serangga, serta melegakan pernapasan. Oleh-oleh khas Ambon wajib dengan izin resmi POM TR.",
      imageUrl: `${apiBase}/storage/view?key=souvenirs/minyak-kayu-putih-cap-mutiara-275ml-1790482606250.jpg`,
    },
    {
      name: "MKP - Cap Merpati Putih (2x100ml)",
      categoryId: herbalCategory.id,
      price: 130000,
      stock: 20,
      description:
        "Minyak kayu putih asli Cap Merpati Putih produksi P.J. Sinar Baru Ambon. Kemasan kotak praktis isi 2 botol x 100ml. Hangat menenangkan, khasiat murni dan bebas campuran.",
      imageUrl: `${apiBase}/storage/view?key=souvenirs/minyak-kayu-putih-cap-merpati-putih-2x100ml-1790339269463.jpg`,
    },
  ];

  // Hapus produk dummy yang tidak termasuk dalam daftar produk resmi
  const officialNames = souvenirsData.map((s) => s.name);
  await prisma.souvenir.deleteMany({
    where: {
      name: { notIn: officialNames },
    },
  });

  for (const s of souvenirsData) {
    const existing = await prisma.souvenir.findFirst({
      where: { name: s.name },
    });
    if (existing) {
      await prisma.souvenir.update({
        where: { id: existing.id },
        data: {
          categoryId: s.categoryId,
          price: s.price,
          stock: s.stock,
          description: s.description,
          imageUrl: s.imageUrl,
          isAvailable: true,
        },
      });
    } else {
      await prisma.souvenir.create({
        data: s,
      });
    }
  }

  console.log("✅ 5 Produk Oleh-oleh Khas Ambon Resmi Cloudflare R2 seeded successfully!");

  // ----------------------------------------------------
  // 5. SEED CMS ARTIKEL WISATA & TIPS TRANSIT AMBON
  // ----------------------------------------------------
  const transitCategory = await prisma.articleCategory.upsert({
    where: { slug: "tips-transit-bandara" },
    update: {},
    create: {
      name: "Tips Transit & Bandara",
      slug: "tips-transit-bandara",
    },
  });

  const tourismCategory = await prisma.articleCategory.upsert({
    where: { slug: "wisata-pantai-ambon" },
    update: {},
    create: {
      name: "Wisata & Pantai Ambon",
      slug: "wisata-pantai-ambon",
    },
  });

  const articlesData = [
    {
      title: "Panduan Transit Praktis 750m dari Bandara Pattimura Ambon",
      slug: "panduan-transit-praktis-bandara-pattimura",
      categoryId: transitCategory.id,
      authorId: ownerUser.id,
      summary:
        "Tips memilih penginapan transit dekat bandara agar tidak terlambat penerbangan pagi di Ambon.",
      content: `
# Panduan Lengkap Transit di Bandara Internasional Pattimura Ambon

Bandara Pattimura berlokasi di Laha, Teluk Ambon. Bagi penumpang dengan jadwal penerbangan pagi (06:00 - 08:00 WIT) atau transit antar-pulau Maluku, menginap di penginapan terdekat adalah solusi paling aman untuk menghindari macet jembatan Merah Putih.

### Keuntungan Memilih Penginapan Transit 750m:
1. **Bebas Macet:** Hanya butuh 2-3 menit perjalanan atau 8 menit jalan santai.
2. **Fleksibilitas Istirahat:** Bisa check-in fleksibel dan istirahat berkualitas.
3. **Biaya Transportasi Hemat:** Tidak perlu sewa taksi bandara dengan tarif mahal.
      `,
      coverImage:
        "https://ik.imagekit.io/penginapanannisa/articles/bandara-pattimura-transit.webp",
      isPublished: true,
      views: 142,
    },
    {
      title: "5 Kuliner Khas Ambon yang Wajib Dicicipi Saat Transit",
      slug: "5-kuliner-khas-ambon-wajib-coba",
      categoryId: tourismCategory.id,
      authorId: ownerUser.id,
      summary:
        "Mulai dari Rujak Natsepa, Ikan Kuah Kuning Papeda, hingga aroma khas Kopi Rarobang.",
      content: `
# 5 Kuliner Khas Ambon yang Menggugah Selera

Ambon Manise terkenal dengan kekayaan rempah-rempah yang menghasilkan aneka kuliner otentik:
1. **Ikan Kuah Kuning & Papeda:** Gurihnya rempah kunyit berpadu kenyalnya sagu.
2. **Kue Bagea Kenari:** Kue sagu renyah bertabur kenari asli Maluku.
3. **Kopi Rarobang:** Kopi hangat berempah jahe dan cengkeh.
      `,
      coverImage:
        "https://ik.imagekit.io/penginapanannisa/articles/kuliner-khas-ambon.webp",
      isPublished: true,
      views: 89,
    },
  ];

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        summary: a.summary,
        content: a.content,
        coverImage: a.coverImage,
      },
      create: a,
    });
  }

  console.log("✅ Artikel Wisata & Tips Transit seeded successfully!");
  console.log("🎉 Seeding Penginapan Annisa Selesai 100%!");
}

main()
  .catch((e) => {
    console.error("❌ Error Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
