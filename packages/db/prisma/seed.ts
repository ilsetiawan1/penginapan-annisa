import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Menjalankan Seeder Data Resmi Penginapan Annisa...");

  // ----------------------------------------------------
  // 1. SEED AKUN USER (OWNER & STAF)
  // ----------------------------------------------------
  const ownerPassword = await Bun.password.hash("admin123", {
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
      name: "Minyak Kayu Putih Asli Namlea 100ml",
      categoryId: herbalCategory.id,
      price: 65000,
      stock: 30,
      description:
        "Minyak kayu putih murni penyulingan tradisional Pulau Buru (Namlea). Aroma segar alami dan hangat tahan lama.",
      imageUrl:
        "https://ik.imagekit.io/annisa_pms/souvenirs/minyak-kayu-putih-100ml.webp",
    },
    {
      name: "Minyak Kayu Putih Namlea Super 250ml",
      categoryId: herbalCategory.id,
      price: 140000,
      stock: 15,
      description:
        "Kemasan botol besar hemat untuk persediaan keluarga atau oleh-oleh premium khas Maluku.",
      imageUrl:
        "https://ik.imagekit.io/annisa_pms/souvenirs/minyak-kayu-putih-250ml.webp",
    },
    {
      name: "Kue Sagu Bagea Kenari Ambon",
      categoryId: snackCategory.id,
      price: 35000,
      stock: 25,
      description:
        "Kue tradisional Maluku berbahan dasar tepung sagu murni dengan potongan biji kenari gurih dan renyah.",
      imageUrl:
        "https://ik.imagekit.io/annisa_pms/souvenirs/kue-bagea-kenari.webp",
    },
    {
      name: "Roti Kenari Panggang Crispy",
      categoryId: snackCategory.id,
      price: 45000,
      stock: 20,
      description:
        "Roti kering renyah dengan taburan gula aren dan kenari khas Ambon. Teman terbaik minum kopi dan teh.",
      imageUrl: "https://ik.imagekit.io/annisa_pms/souvenirs/roti-kenari.webp",
    },
    {
      name: "Halua Kenari Gula Aren Murni",
      categoryId: snackCategory.id,
      price: 50000,
      stock: 18,
      description:
        "Camilan manis legit terbuat dari paduan kenari pilihan dan gula aren asli Kepulauan Banda.",
      imageUrl: "https://ik.imagekit.io/annisa_pms/souvenirs/halua-kenari.webp",
    },
    {
      name: "Kopi Rarobang Rempah Khas Maluku",
      categoryId: drinkCategory.id,
      price: 40000,
      stock: 22,
      description:
        "Kopi robusta khas Ambon berpadu jahe, kayu manis, cengkeh, dan taburan kenari sangrai yang menghangatkan tubuh.",
      imageUrl:
        "https://ik.imagekit.io/annisa_pms/souvenirs/kopi-rarobang.webp",
    },
  ];

  for (const s of souvenirsData) {
    const existing = await prisma.souvenir.findFirst({
      where: { name: s.name },
    });
    if (existing) {
      await prisma.souvenir.update({
        where: { id: existing.id },
        data: {
          price: s.price,
          stock: s.stock,
          description: s.description,
          imageUrl: s.imageUrl,
        },
      });
    } else {
      await prisma.souvenir.create({
        data: s,
      });
    }
  }

  console.log("✅ 6 Produk Oleh-oleh Khas Ambon seeded successfully!");

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
        "https://ik.imagekit.io/annisa_pms/articles/bandara-pattimura-transit.webp",
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
        "https://ik.imagekit.io/annisa_pms/articles/kuliner-khas-ambon.webp",
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
