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
  // 3. KOSONGKAN DATA RESERVASI DUMMY & SET SEMUA KAMAR TERSEDIA (READY)
  // ----------------------------------------------------
  await prisma.reservation.deleteMany({});
  await prisma.guest.deleteMany({});

  const officialRooms = [
    // BANGUNAN A (Semua Tersedia / Ready)
    { number: "A1", building: "A", typeId: acType.id, status: "ready" },
    { number: "A2", building: "A", typeId: acType.id, status: "ready" },
    { number: "A3", building: "A", typeId: kipasType.id, status: "ready" },
    { number: "A4", building: "A", typeId: kipasType.id, status: "ready" },
    // BANGUNAN B (Semua Tersedia / Ready)
    { number: "B1", building: "B", typeId: acType.id, status: "ready" },
    { number: "B2", building: "B", typeId: acType.id, status: "ready" },
    { number: "B3", building: "B", typeId: kipasType.id, status: "ready" },
    { number: "B4", building: "B", typeId: kipasType.id, status: "ready" },
  ];

  for (const r of officialRooms) {
    await prisma.room.upsert({
      where: { roomNumber: r.number },
      update: {
        roomTypeId: r.typeId,
        building: r.building,
        status: "ready",
        notes: null,
      },
      create: {
        roomNumber: r.number,
        building: r.building,
        roomTypeId: r.typeId,
        status: "ready",
        notes: null,
      },
    });
  }

  console.log("✅ 8 Unit Kamar Resmi (A1–A4 & B1–B4) diset SEMUA TERSEDIA (READY)!");

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
      title: "Pantai Liang: Daya Tarik, Harga Tiket, dan Rute",
      slug: "pantai-liang-daya-tarik-harga-tiket-dan-rute",
      categoryId: tourismCategory.id,
      authorId: ownerUser.id,
      summary: "Pantai Liang terletak di Desa Liang, Kecamatan Salahutu, Kabupaten Maluku Tengah, Provinsi Maluku.",
      content: "Pantai Liang terletak di Desa Liang, Kecamatan Salahutu, Kabupaten Maluku Tengah, Provinsi Maluku.\n\nDikenal sebagai Pantai Liang karena wilayah pantai terletak di Desa Liang. Nama awal Pantai Liang adalah Pantai Hunimua.\n\nPantai Liang merupakan salah satu pantai yang masih terjaga keasliannya. Pantai Liang merupakan favorit warga lokal dan wisatawan luar.\n\nWisatawan yang berlibur di Pantai Liang akan disambut dengan pasir putih berkilau terkena cahaya matahari. Seolah, pasir putih merupakan pintu masuk menuju kecantikan air laut yang biru.\n\nPantai dengan air biru yang tenang ini menggoda setiap wisatawan untuk berenang atau bermain air. Bagi pecinta fotografi, kawasan ini merupakan spot foto yang menarik.\n\nKesan alami makin terlihat dengan adanya pohon-pohon rindang yang terdapat di pinggir pantai. Area ini dapat digunakan untuk beristirahat usai bermain air.\n\nPantai Liang belum memiliki fasilitas oleh raga, seperti di Bali atau Lombok. Namun, keindahan Pantai Liang tidak kalah dengan pantai-pantai di pulau lain.\n\nPantai Liang selalu ramai dikunjungi wisatawan, terutama saat liburan. Bagi Anda yang senang suasana tenang, disarankan untuk berkunjung ke pantai ini bukan pada hari libur.\n\nWaktu terbaik untuk berkunjung ke Pantai Liang adalah ketika laut dalam kondisi teduh dan tidak berangin, hindari juga berkunjung saat musim angin barat atau angin timur. Pada saat itu, laut berombak sehingga membuat pantai keruh.\n\nPilihan waktu terbaik untuk mengunjungi Pantai Liang adalah pada bulan-bulan tenang, seperti September-November atau April-Mei.\n\nPantai Liang pernah dinobatkan sebagai pantai terindah yang dimiliki Indonesia pada tahun 1990 oleh United Nations Development Programe (UNDP) PBB\n\nWisatawan yang akan berkunjung ke Pantai Liang akan dikenakan biaya tiket yang bervariasi.\n\nPada kerja, wisatawan akan dikenakan biaya masuk senilai Rp 10.000 per orang, sedangkan pada akhir pekan dan libur biaya masuk senilai Rp 15.000 per orang.\n\nUntuk wisatawan yang datang berombongan akan dikenakan biaya masuk senilai Rp 200.000 per 10 orang.\n\nSebagai tips, wisatawan diharapkan menyediakan uang pas untuk membayar tiket.\n\nJarak tempuh Pantai Liang dari Kota Ambon sekitar 40 km dengan waktu tempuh kurang lebih satu jam. Sedangkan dari Badara Pattimura, Ambon waktu tepuh sekitar 40 menit.\n\nPerjalanan dari Kota Ambon ke Pantai Liang bisa menggunakan ojek dengan biaya sekitar Rp 50.000 sekali jalan.\n\nBagi Anda yang pergi berombongan dapat menyewa kendaraan umum dengann tarif sekitar Rp 200.000. Angkutan umum ini dapat digunakan untuk menampung kurang lebih sebanyak 10 orang.\n",
      coverImage: `${apiBase}/storage/view?key=articles/pantai-liang-daya-tarik-harga-tiket-dan-rute-1790400711939.jpg`,
      isPublished: true,
      views: 3,
    },
    {
      title: "Pantai Liang Diserbu Ribuan Pengunjung Saat Musim Liburan",
      slug: "pantai-liang-diserbu-ribuan-pengunjung-saat-musim-liburan",
      categoryId: tourismCategory.id,
      authorId: ownerUser.id,
      summary: "Sedikitnya 5.000 wisatawan mengunjungi obyek wisata Pantai Liang, di Pulau Ambon , Maluku, pada akhir libur Lebaran, Minggu).",
      content: "Sedikitnya 5.000 wisatawan mengunjungi obyek wisata Pantai Liang, di Pulau Ambon , Maluku, pada akhir libur Lebaran, Minggu.\n\nPantauan Kompas di Pantai Liang, ribuan orang memadati pantai berpasir putih yang berada di Kabupaten Maluku Tengah tersebut sejak pukul 09.00 WIT. Murahnya tiket masuk, Rp 2.500 untuk anak-anak dan Rp 3.000 untuk dewasa, menjadi salah satu alasan pantai tersebut ramai oleh wisatawan.\n\nKepala Seksi Obyek dan Daya Tarik Wisata Dinas Pariwisata Maluku, Maya Basalamah, yang ditemui di Pantai Liang, mengatakan jumlah wisatawan mencapai 5.000 orang. Jumlah ini tertinggi dibandingkan hari-hari libur Lebaran sebelumnya yang jumlah pengunjungnya hanya sekitar 1.000 orang per hari .\n\nHari ini (kemarin-Red) merupakan hari terakhir libur Lebaran, makanya lebih banyak wisatawan datang, ujarnya.\n\nWisatawan yang datang tidak hanya dari Ambon tetapi juga dari sejumlah kota besar di Jawa dan Sulawesi yang menghabiskan libur Lebaran di Ambon untuk mengunjungi kerabat mereka.\n",
      coverImage: `${apiBase}/storage/view?key=articles/pantai-liang-diserbu-ribuan-pengunjung-saat-musim-liburan-1790400977346.jpg`,
      isPublished: true,
      views: 0,
    },
    {
      title: "Rekomendasi Wisata Air di Maluku Tengah: Dari Hangatnya Tulehu ke Segarnya Pantai Liang",
      slug: "rekomendasi-wisata-air-di-maluku-tengah-dari-hangatnya-tulehu-ke-segarnya-pantai-liang",
      categoryId: tourismCategory.id,
      authorId: ownerUser.id,
      summary: "Indonesia banyak menawarkan tempat wisata yang eksotis, salah satunya ialah Maluku.",
      content: "Indonesia banyak menawarkan tempat wisata yang eksotis, salah satunya ialah Maluku.\n\nProvinsi yang terletak di bagian timur Indonesia ini memiliki suguhan panaroma alam yang memikat.\n\nBagi wisatawan yang berkunjung ke Kabupaten Maluku Tengah, jangan lupa mampir berkunjung ke Pemandian Air Panas Desa Tulehu dan Pemandian Air Laut Desa Liang.\n\nKedua destinasi tersebut berlokasi di Kecamatan Salahutu yang letaknya tidak jauh dari kota Ambon.\n\nUntuk Pemandian Air Panas Desa Tulehu berjarak sekitar 28 kilometer dari kota Ambon, sedangkan jarak antara Ambon ke Pemandian Air Laut Liang sekitar 38 kilometer. Adapun jarak antara Tulehu dan Liang jaraknya sekitar 10 kilometer.\n\nUntuk mencapai Pemandian Air Panas Desa Tulehu dan Pemandian Air Laut Liang, pengunjung dapat menggunakan roda dua maupun empat.\n\nTidak perlu khawatir merasa penat, sebab ruas jalan antara Tuhelu ke Liang banyak menyuguhkan panorama alam yang indah, seperti hamparan teluk dengan pemandangan perairan laut dan gunung. Selain itu, aksesibilitas yang dekat dan jalan yang mulus membuat pengendara nyaman melintas.\n\nBagi saya yang baru kali pertama berkunjung ke Pemandian Air Panas Desa Tulehu, saya menyarankan untuk datang pada malam hari, sebab hiruk pikuk baru terasa saat malam tiba.\n\nDari informasi yang saya dapatkan, Pemandian Air Panas Tulehu merupakan satu-satunya di wilayah Maluku Tengah, sehingga banyak pengunjung yang datang tidak hanya dari wilayah tersebut, namun juga Kota Ambon sekitarnya.\n\nUntuk tiket masuk, pengunjung akan dikenakan biaya sebesar 5 ribu rupiah per orang.\n\nBeralih ke Desa Liang, di sana terdapat pantai yang memiliki air laut berwarna kebiruan serta pasir putih yang membuat pengunjung nyaman berekreasi di tempat ini.\n\nDeburan ombak di Pantai Liang tidak terlalu deras, sehingga aman bagi pengunjung terutama anak-anak untuk berenang. Pepohonan rindang di sekitar pantai membuat pengunjung nyaman untuk berteduh.\n\nUntuk membuat nyaman pengunjung berenang, warga setempat menyiapkan penyewaan ban berenang dengan harga murah. Pengunjung juga bisa menikmati perahu ketinting atau banana boat untuk mengitari pantai Liang yang eksotis.\n\nUntuk stan kuliner nampak berjejer rapi sepanjang pantai Liang. Stand ini ada yang disiapkan oleh Dinas Pariwisata Pemprov Maluku, dan ada juga yang dibuat secara mandiri oleh warga setempat yang berjualan kuliner di lokasi tersebut.\n\nUsai berenang, saya menyempatkan menikmati kelapa muda seharga 10 ribu rupiah serta rujak Ambon seharga 20 ribu rupiah.\n\nBerenang, menyantap kuliner dan menikmati panorama Pantai Liang yang eksotis, merupakan paket lengkap berwisata ke destinasi ini.\n\nUntuk masuk ke Pantai Liang dikenakan biaya 10 ribu rupiah per orang.\n\nItulah dua destinasi wisata menarik yang sempat dikunjungi saat berada di Maluku.\n\n\nBayangkan seorang anak Indonesia bercita-cita menjadi dokter tetapi hanya memiliki satu buku lusuh untuk belajar. Bersama Ekspedisi Kata ke Nyata Kompas.com, Anda bisa membantu mengubah kisah itu. Mari hadirkan akses literasi bagi anak-anak di berbagai pelosok Indonesia melalui donasi lewat tautan https://bit.ly/JagatLiterasi2026. Setiap kebaikan yang Anda berikan bukan hanya membuka jendela pengetahuan, tetapi juga membuka masa depan mereka.",
      coverImage: `${apiBase}/storage/view?key=articles/rekomendasi-wisata-air-di-maluku-tengah-dari-hangatnya-tulehu-ke-segarnya-pantai-liang-1790401127285.jpg`,
      isPublished: true,
      views: 0,
    },
    {
      title: "Wisata Pantai Natsepa Ambon: Daya Tarik, Tiket, dan Jam Buka",
      slug: "wisata-pantai-natsepa-ambon-daya-tarik-tiket-dan-jam-buka",
      categoryId: tourismCategory.id,
      authorId: ownerUser.id,
      summary: "Pantai Natsepa terletak di Desa Suli, Kabupaten Maluku Tengah, Maluku.",
      content: "Pantai Natsepa terletak di Desa Suli, Kabupaten Maluku Tengah, Maluku.\n\nPantai Natsepa memiliki pemandangan alam yang sangat indah.\n\nTempat wisata Pantai Natsepa cocok untuk menghabiskan liburan bersama keluarga maupun teman.\n\nBahkan Pantai Natpesa tidak pernah sepi pengunjung, baik hari libur maupun hari kerja.\n\nPantai Natsepa memiliki pemandangan indah berupa pasir putih dan air laut biru kehijau-hijauan.\n\nOmbak Pantai Natsepa sangat bersahabat sehingga pengunjung bebas bermain air di sekitar pantai.\n\nAnda juga dapat berkeliling menikmati pemandangan pantai maupun keliling menggunakan perahu.\n\nJika merasa lapar dan haus, pengunjung tidak perlu khawatir. Ada kedai yang menyediakan makanan dan minuman sambil menikmati pantai.\n\nPasar ikan terletak sekitar 700 meter dari Pantai Natsepa. Jika Anda berutung datang dalam cuaca cerah, Anda dapat membeli ikan dengan harga yang sangat murah, karena harga ikan di sana tergantung cuaca.\n\nAda mitos Pantai Natsepa dipercayai memiliki khasiat menyembuhkan penyakit ringan, seperti flu. Pengunjung cukup berendam di pantai tersebut.\n\nUntuk menikmati wisata Pantai Natsepa, pengunjung akan dikenakan tiket masuk sebesar Rp 5.000 dan harga sewa perahu sebesar Rp 20.000 per orang.\n\nHarga tiket dapat berubah sewaktu-waktu.\n\nPantai Natsepa mulai buka pada pukul 06.00 - 21.00 WIT\n\nJarak tempuh Pantai Natsepa dari pusat Kota Ambon sekitar 6,7 kilometer dengan waktu tempuh kurang lebih 8 menit. Perjalanan dapat melalui Passo-Tulehu.\n",
      coverImage: `${apiBase}/storage/view?key=articles/wisata-pantai-natsepa-ambon-daya-tarik-tiket-dan-jam-buka-1790403156549.jpg`,
      isPublished: true,
      views: 0,
    },
    {
      title: "Panduan Transit Nyaman di Bandara Pattimura Ambon: Tips Anti Telat untuk Penerbangan Pagi",
      slug: "panduan-transit-nyaman-di-bandara-pattimura-ambon-tips-anti-telat-untuk-penerbangan-pagi",
      categoryId: transitCategory.id,
      authorId: ownerUser.id,
      summary: "Bandara Internasional Pattimura (AMQ) merupakan pintu gerbang utama transportasi udara di Maluku, melayani rute domestik antarprovinsi hingga penerbangan perintis antarpulau seperti ke Saumlaki, Tual, Banda, dan Namlea.",
      content: "Bagi para pelancong, pelaku perjalanan bisnis, maupun warga lokal, menghadapi jadwal penerbangan pagi (first flight) atau waktu transit beberapa jam sering kali membawa tantangan tersendiri—terutama soal jarak tempuh dari pusat Kota Ambon menuju bandara.\n\nAgar perjalanan Anda tetap tenang, bebas stres, dan tidak terburu-buru, simak panduan serta tips praktis transit di Bandara Pattimura berikut ini.\n\n1. Perhitungkan Waktu Perjalanan ke Bandara\nSecara geografis, Bandara Pattimura terletak di Negeri Laha, Kecamatan Teluk Ambon. Jika Anda berangkat dari pusat Kota Ambon, jarak tempuhnya berkisar antara 20 hingga 25 kilometer melewati Jembatan Merah Putih (JMP).\n\nDengan Kendaraan Pribadi / Taksi: Membutuhkan waktu sekitar 35–50 menit pada kondisi lalu lintas normal.\n\nWaspadai Jam Sibuk: Pada pagi hari saat jam kerja atau cuaca hujan, akses jalan pesisir teluk bisa lebih padat. Sisihkan waktu ekstra minimal 30 menit dari estimasi perjalanan.\n\n2. Manfaatkan Fasilitas Online Check-In\nUntuk menghindari antrean panjang di loket konvensional:\n\nLakukan web check-in atau check-in via aplikasi maskapai 24 jam sebelum keberangkatan.\n\nJika hanya membawa bagasi kabin (cabin baggage), Anda bisa langsung menuju security check dan ruang tunggu (boarding gate) setibanya di bandara.\n\nPastikan baterai ponsel mencukupi dan simpan e-boarding pass secara offline di galeri HP untuk mengantisipasi sinyal seluler yang lambat.\n\n3. Fasilitas di Terminal Bandara Pattimura\nArea terminal keberangkatan Bandara Pattimura telah dilengkapi berbagai fasilitas penunjang yang memadai bagi penumpang yang transit:\n\nSentra Kuliner & Kafe: Terdapat beberapa gerai kopi dan restoran ringan jika Anda ingin sarapan cepat sebelum naik ke pesawat.\n\nToko Suvenir & Oleh-Oleh: Tersedia beberapa toko suvenir kecil di dekat area keberangkatan, meski pilihan harganya biasanya lebih ekonomis jika dibeli di luar bandara.\n\nRuang Ibadah & Toilet: Musala bersih dan toilet tersedia di beberapa sudut terminal sebelum dan sesudah area pemeriksaan tiket.\n\n4. Solusi Terbaik untuk Penerbangan Pagi: Menginap Dekat Bandara\nJika Anda memegang tiket penerbangan pukul 06.00 atau 07.00 WIT, bersiap-siap dari pusat Kota Ambon pada pukul 03.30 subuh tentu sangat menguras energi, berisiko kehabisan opsi transportasi umum, atau bahkan tertinggal pesawat.\n\nLangkah paling aman dan hemat tenaga adalah memilih akomodasi atau penginapan transit di area Laha yang berjarak hanya hitungan ratusan meter dari gerbang bandara. Dengan begitu:\n\nAnda bisa beristirahat lebih tenang semalaman.\n\nCukup berjalan kaki atau menempuh 2–3 menit perjalanan kendaraan menuju pintu keberangkatan.\n\nTidak perlu panik memikirkan kemacetan atau cuaca buruk di jalan raya.\n\nSelamat melanjutkan perjalanan Anda, dan nikmati waktu singgah Anda di Pulau Ambon Manise!",
      coverImage: `${apiBase}/storage/view?key=articles/panduan-transit-nyaman-di-bandara-pattimura-ambon-tips-anti-telat-untuk-penerbangan-pagi-1790403372932.jpg`,
      isPublished: true,
      views: 2,
    },
    {
      title: "Tips Transit Nyaman di Bandara Pattimura",
      slug: "tips-transit-nyaman-di-bandara-pattimura",
      categoryId: transitCategory.id,
      authorId: ownerUser.id,
      summary: "Bandara Internasional Pattimura (AMQ) di Ambon adalah gerbang utama mobilitas udara di Maluku. Bandara ini melayani penerbangan antarkota besar di Indonesia sekaligus rute perintis ke pulau-pulau eksotis seperti Banda, Tual, Saumlaki, hingga Namlea.",
      content: "Langkah awal yang sangat krusial adalah memperhitungkan estimasi jarak dan waktu tempuh menuju bandara. Berada di kawasan Negeri Laha, Bandara Pattimura berjarak sekitar dua puluh hingga dua puluh lima kilometer dari pusat Kota Ambon melalui rute Jembatan Merah Putih. Perjalanan normal dengan taksi atau mobil sewaan umumnya memerlukan waktu sekitar tiga puluh lima hingga empat puluh lima menit. Namun, jika Anda bepergian pada jam sibuk pagi hari atau saat cuaca buruk, sangat disarankan menyediakan alokasi waktu cadangan minimal tiga puluh menit lebih awal guna mengantisipasi kepadatan arus lalu lintas di jalur pesisir teluk.\n\nUntuk menghemat waktu setibanya di terminal keberangkatan, manfaatkanlah layanan lapor mandiri atau online check-in. Anda dapat melakukan proses ini melalui situs resmi atau aplikasi maskapai penerbangan sejak dua puluh empat jam sebelum jadwal terbang. Keuntungan besar ini membuat penumpang yang hanya membawa barang bawaan kabin bisa langsung melangkah menuju pos pemeriksaan keamanan serta ruang tunggu tanpa harus mengantre lama di loket tiket. Jangan lupa mengambil tangkapan layar kartu pas naik digital pada ponsel agar dokumen perjalanan tetap mudah diakses meski jaringan internet bandara sedang lambat.\n\nFasilitas di dalam terminal keberangkatan Bandara Pattimura juga terbilang cukup lengkap untuk menunjang kebutuhan dasar selama masa tunggu. Penumpang dapat menemukan beberapa gerai makanan cepat saji dan kedai kopi lokal untuk menikmati sarapan hangat sebelum boarding. Fasilitas musala dan toilet bersih tersebar merata di area sebelum maupun sesudah pemeriksaan keamanan. Apabila Anda membutuhkan cinderamata khas Maluku, tersedia beberapa gerai suvenir di sudut terminal, meskipun berbelanja oleh-oleh di toko lokal luar bandara sering kali menawarkan harga yang lebih terjangkau.\n\nBagi pemegang tiket penerbangan subuh antara pukul enam hingga tujuh pagi waktu setempat, bermalam di penginapan transit sekitar area bandara merupakan keputusan terbaik. Berangkat dari pusat kota pada pukul tiga subuh sering kali menyulitkan pencarian transportasi dan sangat menguras tenaga. Memilih akomodasi di kawasan Laha yang hanya berjarak ratusan meter dari gerbang bandara memungkinkan Anda beristirahat malam dengan tenang, memangkas waktu tempuh menuju terminal menjadi hanya dua hingga tiga menit, sekaligus menghilangkan risiko terlambat akibat kendala di jalan raya.",
      coverImage: `${apiBase}/storage/view?key=articles/tips-transit-nyaman-di-bandara-pattimura-1790403676471.jpg`,
      isPublished: true,
      views: 0,
    },
    {
      title: "Trik Cerdas Kemas Bagasi Transit Pattimura",
      slug: "trik-cerdas-kemas-bagasi-transit-pattimura",
      categoryId: transitCategory.id,
      authorId: ownerUser.id,
      summary: "Strategi praktis mengatur tas kabin dan koper bawaan saat transit di Bandara Internasional Pattimura Ambon, menghindari biaya kelebihan muatan pesawat perintis antarpulau, serta tips mobilitas ringkas tanpa repot bongkar barang.",
      content: "Transit di Bandara Internasional Pattimura Ambon sering kali melibatkan perpindahan jenis pesawat, mulai dari jet komersial berbadan lebar rute Jakarta atau Makassar ke pesawat baling-baling perintis menuju pulau-pulau kecil seperti Banda Neira atau Namlea. Perbedaan armada ini kerap membawa kejutan bagi penumpang yang tidak siap dengan regulasi kapasitas angkut barang, sehingga perencanaan barang bawaan sejak awal menjadi kunci kenyamanan perjalanan.\n\nHal mendasar yang wajib dipahami penumpang adalah batas kuota bagasi cuma-cuma pada pesawat perintis. Maskapai rute lokal Maluku umumnya memberlakukan batas bagasi tercatat yang jauh lebih ketat, bahkan sebagian hanya menggratiskan sepuluh kilogram per penumpang. Menyusun koper dengan perhitungan matang di rumah akan mencegah Anda terkena biaya kelebihan muatan yang lumayan mahal di meja konter pelaporan bandara.\n\nPemisahan barang esensial ke dalam ransel kabin kecil sangat dianjurkan untuk memudahkan pergerakan selama masa tunggu di area terminal. Pastikan seluruh dokumen identitas, tiket, obat-obatan pribadi, pengisi daya, serta satu pasang pakaian ganti tetap berada di dalam tas jinjing yang selalu Anda bawa. Menyiapkan barang penting di tempat terpisah membuat Anda tidak perlu membongkar koper utama di ruang publik saat mendadak membutuhkan baju hangat atau perlengkapan pribadi.\n\nBagi pelancong yang harus menunggu penerbangan lanjutan berjam-jam, membawa barang bawaan berbobot berat ke mana-mana tentu sangat membatasi gerak dan menguras energi. Menitipkan koper besar di resepsionis penginapan singgah di area Negeri Laha merupakan langkah tepat agar Anda bisa berjalan santai mencicipi kuliner lokal atau sekadar menghirup udara segar pesisir teluk tanpa repot mendorong troli.\n\nDengan kemasan barang yang ringkas dan tata letak muatan yang terorganisasi rapi, proses pemeriksaan keamanan di gerbang masuk Bandara Pattimura akan berjalan jauh lebih cepat. Anda pun terhindar dari teguran petugas terkait barang bawaan berlebih dan dapat langsung menuju ruang keberangkatan dengan tenang menyambut rute jelajah kepulauan berikutnya.",
      coverImage: `${apiBase}/storage/view?key=articles/trik-cerdas-kemas-bagasi-transit-pattimura-1790403829483.jpg`,
      isPublished: true,
      views: 0,
    },
  ];

  // Hapus artikel dummy yang tidak termasuk dalam daftar artikel resmi
  const officialArticleSlugs = articlesData.map((a) => a.slug);
  await prisma.article.deleteMany({
    where: {
      slug: { notIn: officialArticleSlugs },
    },
  });

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        categoryId: a.categoryId,
        authorId: a.authorId,
        summary: a.summary,
        content: a.content,
        coverImage: a.coverImage,
        isPublished: a.isPublished,
        views: a.views,
      },
      create: a,
    });
  }

  console.log("✅ 7 Artikel Wisata & Tips Transit Resmi Cloudflare R2 seeded successfully!");
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
