import { BookingStatus } from "@prisma/client";
import { getDb } from "@/lib/db";
import { differenceInNights } from "@/lib/utils";

export async function getAvailableRooms(checkIn: Date, checkOut: Date, guests: number) {
  const db = getDb();

  return db.room.findMany({
    where: {
      isActive: true,
      capacity: {
        gte: guests,
      },
      bookings: {
        none: {
          bookingStatus: {
            in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
          },
          checkIn: {
            lt: checkOut,
          },
          checkOut: {
            gt: checkIn,
          },
        },
      },
    },
    orderBy: {
      rate: "asc",
    },
  });
}

export function calculateStayTotal(rateInCents: number, checkIn: Date, checkOut: Date) {
  const nights = differenceInNights(checkIn, checkOut);

  return {
    nights,
    totalAmount: nights * rateInCents,
  };
}
