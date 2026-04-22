import { getDb } from "@/lib/db";

export async function getRoomsSafe() {
  try {
    const db = getDb();

    return await db.room.findMany({
      where: { isActive: true },
      orderBy: { rate: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getAdminDataSafe() {
  try {
    const db = getDb();

    const [accommodationBookings, diningReservations, eventEnquiries, payments, customers] =
      await Promise.all([
        db.accommodationBooking.findMany({
          include: { room: true, customer: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
        db.diningReservation.findMany({
          include: { customer: true },
          orderBy: { reservedAt: "desc" },
          take: 10,
        }),
        db.eventEnquiry.findMany({
          include: { customer: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
        db.payment.findMany({
          include: { customer: true },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
        db.customer.count(),
      ]);

    return {
      accommodationBookings,
      diningReservations,
      eventEnquiries,
      payments,
      customers,
      configured: true,
    };
  } catch {
    return {
      accommodationBookings: [],
      diningReservations: [],
      eventEnquiries: [],
      payments: [],
      customers: 0,
      configured: false,
    };
  }
}
