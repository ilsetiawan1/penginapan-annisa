import { prisma } from "../packages/db/src";

async function main() {
  console.log("Testing Neon PostgreSQL connection...");
  console.log(
    "DATABASE_URL target:",
    process.env.DATABASE_URL
      ? process.env.DATABASE_URL.split("@")[1]?.split("/")[0] || "Found"
      : "Not set"
  );

  const [
    roomCount,
    roomTypeCount,
    userCount,
    settingsCount,
    reservationCount,
    articleCount,
    categoryCount,
  ] = await Promise.all([
    prisma.room.count(),
    prisma.roomType.count(),
    prisma.user.count(),
    prisma.systemSetting.count(),
    prisma.reservation.count(),
    prisma.article.count(),
    prisma.articleCategory.count(),
  ]);

  console.log("=== Neon Connection & Health Check Result ===");
  console.log(`- Room records          : ${roomCount}`);
  console.log(`- RoomType records      : ${roomTypeCount}`);
  console.log(`- User records          : ${userCount}`);
  console.log(`- Reservation records   : ${reservationCount}`);
  console.log(`- Article records       : ${articleCount}`);
  console.log(`- ArticleCategory records: ${categoryCount}`);
  console.log(`- SystemSetting records : ${settingsCount}`);
  console.log("Status: OK, all queries succeeded without data loss.");
}

main()
  .catch((err) => {
    console.error("Neon connection error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
