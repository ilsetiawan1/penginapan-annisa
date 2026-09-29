import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Check room A1 reservations
const rooms = await prisma.room.findMany({
  where: { roomNumber: { in: ["A1", "A2", "A3"] } },
  include: {
    reservations: {
      where: { status: { in: ["confirmed", "checked_in"] } },
      include: { guest: true },
    },
  },
});

const todayWit = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(new Date());
console.log("Today WIT:", todayWit);

for (const room of rooms) {
  console.log(`\n=== Room ${room.roomNumber} (DB status: ${room.status}) ===`);
  console.log(`  Reservations count: ${room.reservations.length}`);
  for (const r of room.reservations) {
    const resIn = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(new Date(r.checkInDate));
    const resOut = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(new Date(r.checkOutDate));
    const isToday = todayWit >= resIn && todayWit < resOut;
    console.log(`  ${r.code}: ${r.guest.name} | in=${resIn} out=${resOut} | isToday=${isToday}`);
  }
}

await prisma.$disconnect();
