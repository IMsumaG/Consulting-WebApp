import prisma from "@/lib/prisma";
import { ok } from "@/lib/api";

export async function GET() {
  const upcomingBookings = await prisma.individualBooking.findMany({
    where: {
      reminderSent: false,
      cohort: {
        startDate: {
          gte: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          lte: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        },
      },
    },
    include: { cohort: { include: { course: true } } },
  });

  const updated = await prisma.individualBooking.updateMany({
    where: { id: { in: upcomingBookings.map((booking) => booking.id) } },
    data: { reminderSent: true },
  });

  return ok({
    scanned: upcomingBookings.length,
    updated: updated.count,
  });
}
