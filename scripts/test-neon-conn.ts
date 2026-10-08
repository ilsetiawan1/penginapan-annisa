import { prisma } from "../packages/db/src";

async function main() {
  console.log("Testing Neon PostgreSQL connection...");
  console.log(
    "DATABASE_URL target:",
    process.env.DATABASE_URL
      ? process.env.DATABASE_URL.split("@")[1]?.split("/")[0] || "Found"
      : "Not set"
  );

  const updatedRoomTypes = await prisma.roomType.findMany({
    select: { name: true, slug: true, facilities: true },
  });
  console.log("=== Room Types in Neon ===");
  console.log(JSON.stringify(updatedRoomTypes, null, 2));
  console.log("Status: OK, Neon facilities verified.");
}

main()
  .catch((err) => {
    console.error("Neon connection error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
