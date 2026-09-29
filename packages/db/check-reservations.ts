import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const reservations = await prisma.reservation.findMany({
  where: {
    status: { in: ["confirmed", "checked_in"] },
  },
  include: {
    guest: true,
    room: true,
  },
  orderBy: { checkInDate: "asc" },
});

for (const r of reservations) {
  const checkIn = r.checkInDate.toISOString();
  const checkOut = r.checkOutDate.toISOString();
  console.log(
    `${r.code} | room=${r.room.roomNumber} | guest=${r.guest.name} | status=${r.status} | checkIn=${checkIn} | checkOut=${checkOut} | payment=${r.paymentStatus}`,
  );
}

await prisma.$disconnect();
