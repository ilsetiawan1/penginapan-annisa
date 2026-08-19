import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Penginapan Annisa database...");

  // 1. Users (Admin & Staff)
  const adminPassword = await Bun.password.hash("admin123", {
    algorithm: "bcrypt",
    cost: 10,
  });
  const staffPassword = await Bun.password.hash("staff123", {
    algorithm: "bcrypt",
    cost: 10,
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@penginapan-annisa.com" },
    update: {},
    create: {
      name: "Owner / Pengelola Utama",
      email: "admin@penginapan-annisa.com",
      passwordHash: adminPassword,
      role: "admin",
    },
  });

  const staffUser = await prisma.user.upsert({
    where: { email: "staff@penginapan-annisa.com" },
    update: {},
    create: {
      name: "Resepsionis Annisa",
      email: "staff@penginapan-annisa.com",
      passwordHash: staffPassword,
      role: "staff",
    },
  });

  console.log("✅ Users seeded:", adminUser.email, staffUser.email);

  // 2. Room Types (AC & Kipas)
  const acType = await prisma.roomType.upsert({
    where: { slug: "kamar-ac" },
    update: {
      basePrice: 275000,
      capacity: 3,
      facilities: JSON.stringify([
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ]),
    },
    create: {
      name: "Kamar AC Superior",
      slug: "kamar-ac",
      description:
        "Kamar sejuk dan nyaman dengan AC, kamar mandi dalam pribadi, TV, dan akses WiFi berkecepatan tinggi. Sangat cocok untuk penumpang transit penerbangan pagi.",
      basePrice: 275000,
      capacity: 3,
      bedType: "1 Double Bed (Bisa + Extra)",
      facilities: JSON.stringify([
        "AC Dingin",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV LED",
        "Handuk Bersih",
        "Air Mineral",
      ]),
    },
  });

  const kipasType = await prisma.roomType.upsert({
    where: { slug: "kamar-kipas" },
    update: {
      basePrice: 200000,
      capacity: 3,
      facilities: JSON.stringify([
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
      ]),
    },
    create: {
      name: "Kamar Kipas Standar",
      slug: "kamar-kipas",
      description:
        "Kamar ekonomis yang bersih dan tenang dengan kipas angin, kamar mandi dalam, dan WiFi gratis. Pilihan hemat terbaik untuk istirahat transit di dekat bandara.",
      basePrice: 200000,
      capacity: 3,
      bedType: "1 Double Bed / 2 Single Bed",
      facilities: JSON.stringify([
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam",
        "WiFi Gratis",
        "TV",
        "Handuk Bersih",
      ]),
    },
  });

  console.log("✅ Room types seeded:", acType.name, kipasType.name);

  // 3. 8 Unit Kamar (4 AC & 4 Kipas)
  const roomsData = [
    // 4 Kamar AC
    { number: "101", floor: 1, typeId: acType.id, status: "ready" },
    { number: "102", floor: 1, typeId: acType.id, status: "occupied" },
    { number: "103", floor: 1, typeId: acType.id, status: "dirty" },
    { number: "104", floor: 1, typeId: acType.id, status: "ready" },
    // 4 Kamar Kipas
    { number: "201", floor: 2, typeId: kipasType.id, status: "ready" },
    { number: "202", floor: 2, typeId: kipasType.id, status: "ready" },
    { number: "203", floor: 2, typeId: kipasType.id, status: "occupied" },
    { number: "204", floor: 2, typeId: kipasType.id, status: "ready" },
  ];

  for (const r of roomsData) {
    await prisma.room.upsert({
      where: { roomNumber: r.number },
      update: {
        roomTypeId: r.typeId,
        floor: r.floor,
        status: r.status,
      },
      create: {
        roomNumber: r.number,
        floor: r.floor,
        roomTypeId: r.typeId,
        status: r.status,
      },
    });
  }

  console.log("✅ 8 Rooms seeded successfully!");

  // 4. Oleh-oleh Khas Ambon Categories & Products
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
      description: "Minyak kayu putih murni penyulingan asli Pulau Buru / Namlea, hangat alami dan berkhasiat tinggi.",
    },
    {
      name: "Minyak Kayu Putih Namlea Super 250ml",
      categoryId: herbalCategory.id,
      price: 140000,
      description: "Ukuran botol besar 250ml kualitas premium asli Maluku.",
    },
    {
      name: "Kue Sagu Bagea Kenari Ambon (Isi 10)",
      categoryId: snackCategory.id,
      price: 35000,
      description: "Camilan renyah gurih khas Ambon berbahan dasar sagu pilihan dan taburan kenari melimpah.",
    },
    {
      name: "Roti Kenari Khas Maluku (1 Kotak)",
      categoryId: snackCategory.id,
      price: 45000,
      description: "Roti kering renyah dengan taburan gula dan kenari khas Maluku yang harum.",
    },
    {
      name: "Halua Kenari Tradisional",
      categoryId: snackCategory.id,
      price: 35000,
      description: "Manisan kenari legit dengan gula merah asli khas kepulauan Maluku.",
    },
    {
      name: "Kopi Rarobang Rempah Ambon 200g",
      categoryId: drinkCategory.id,
      price: 40000,
      description: "Kopi khas Ambon yang diracik bersama jahe merah, cengkih, kayu manis, dan taburan kenari.",
    },
  ];

  for (const s of souvenirsData) {
    const existing = await prisma.souvenir.findFirst({
      where: { name: s.name },
    });
    if (!existing) {
      await prisma.souvenir.create({
        data: s,
      });
    }
  }

  console.log("✅ Souvenirs seeded successfully!");

  // 5. Article Category & Sample Article
  const travelCategory = await prisma.articleCategory.upsert({
    where: { slug: "panduan-transit-wisata" },
    update: {},
    create: {
      name: "Panduan Transit & Wisata Ambon",
      slug: "panduan-transit-wisata",
    },
  });

  await prisma.article.upsert({
    where: { slug: "tips-transit-nyaman-di-bandara-pattimura-ambon" },
    update: {},
    create: {
      categoryId: travelCategory.id,
      authorId: adminUser.id,
      title: "Tips Transit Nyaman dan Bebas Ketinggalan Pesawat di Bandara Pattimura Ambon",
      slug: "tips-transit-nyaman-di-bandara-pattimura-ambon",
      summary: "Punya jeda penerbangan beberapa jam atau flight subuh di Bandara Pattimura? Simak tips istirahat nyaman hanya 750 meter dari terminal bandara.",
      content: "Bandara Internasional Pattimura Ambon merupakan pintu gerbang utama ke kepulauan Maluku...",
      isPublished: true,
    },
  });

  console.log("✅ Articles seeded successfully!");
  console.log("🎉 All seeds completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
