"use server";

import {
  BookingStatus,
  EventStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { calculateStayTotal, getAvailableRooms } from "@/lib/availability";
import { getDb } from "@/lib/db";
import { createReference } from "@/lib/utils";

export type ActionState = {
  success: boolean;
  message: string;
  reference?: string;
};

const accommodationSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  roomId: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.coerce.number().int().min(1).max(8),
  paymentMethod: z.nativeEnum(PaymentMethod),
  specialRequests: z.string().optional(),
});

const diningSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  date: z.string().min(1),
  time: z.string().min(1),
  guestCount: z.coerce.number().int().min(1).max(30),
  notes: z.string().optional(),
});

const eventSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  eventType: z.string().min(3),
  eventDate: z.string().optional(),
  guestCount: z.coerce.number().int().min(1).max(500).optional(),
  details: z.string().min(10),
});

async function findOrCreateCustomer(input: {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
}) {
  const db = getDb();

  const existing = await db.customer.findFirst({
    where: {
      email: input.email,
    },
  });

  if (existing) {
    return db.customer.update({
      where: { id: existing.id },
      data: {
        fullName: input.fullName,
        phone: input.phone,
        notes: input.notes,
      },
    });
  }

  return db.customer.create({
    data: input,
  });
}

export async function submitAccommodationBooking(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const db = getDb();

  const parsed = accommodationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    roomId: formData.get("roomId"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    guests: formData.get("guests"),
    paymentMethod: formData.get("paymentMethod"),
    specialRequests: formData.get("specialRequests") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete all required booking fields correctly.",
    };
  }

  const checkIn = new Date(parsed.data.checkIn);
  const checkOut = new Date(parsed.data.checkOut);

  if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()) || checkOut <= checkIn) {
    return {
      success: false,
      message: "Check-out must be after check-in.",
    };
  }

  const room = await db.room.findUnique({
    where: {
      id: parsed.data.roomId,
    },
  });

  if (!room) {
    return {
      success: false,
      message: "Selected room could not be found.",
    };
  }

  const availableRooms = await getAvailableRooms(checkIn, checkOut, parsed.data.guests);
  const selectedRoomAvailable = availableRooms.some((availableRoom: { id: string }) => availableRoom.id === room.id);

  if (!selectedRoomAvailable) {
    return {
      success: false,
      message: "That room is no longer available for the selected dates.",
    };
  }

  const customer = await findOrCreateCustomer({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
  });

  const confirmationCode = createReference("SAT");
  const { totalAmount } = calculateStayTotal(room.rate, checkIn, checkOut);
  const autoConfirmCard = process.env.ENABLE_CARD_AUTOCONFIRM === "true";
  const paymentStatus =
    parsed.data.paymentMethod === PaymentMethod.CARD && autoConfirmCard
      ? PaymentStatus.PAID
      : PaymentStatus.PENDING;
  const bookingStatus = paymentStatus === PaymentStatus.PAID ? BookingStatus.CONFIRMED : BookingStatus.PENDING;

  await db.$transaction(async (tx: Prisma.TransactionClient) => {
    const booking = await tx.accommodationBooking.create({
      data: {
        customerId: customer.id,
        roomId: room.id,
        checkIn,
        checkOut,
        guests: parsed.data.guests,
        specialRequests: parsed.data.specialRequests,
        totalAmount,
        bookingStatus,
        paymentStatus,
        paymentMethod: parsed.data.paymentMethod,
        confirmationCode,
      },
    });

    await tx.payment.create({
      data: {
        customerId: customer.id,
        accommodationBookingId: booking.id,
        amount: totalAmount,
        method: parsed.data.paymentMethod,
        status: paymentStatus,
        reference: createReference("PAY"),
        provider: parsed.data.paymentMethod === PaymentMethod.CARD ? "Stripe-ready" : "EFT",
        paidAt: paymentStatus === PaymentStatus.PAID ? new Date() : null,
        notes:
          parsed.data.paymentMethod === PaymentMethod.EFT
            ? "Awaiting EFT proof / admin allocation."
            : autoConfirmCard
              ? "Demo card payment auto-confirmed."
              : "Card gateway configuration required before live processing.",
      },
    });
  });

  revalidatePath("/stay");
  revalidatePath("/stay/book");
  revalidatePath("/admin");

  return {
    success: true,
    message:
      parsed.data.paymentMethod === PaymentMethod.CARD && !autoConfirmCard
        ? "Booking captured. Card payment is marked pending until a live payment gateway is configured."
        : "Booking captured successfully. A confirmation has been generated.",
    reference: confirmationCode,
  };
}

export async function submitDiningReservation(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const db = getDb();

  const parsed = diningSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    time: formData.get("time"),
    guestCount: formData.get("guestCount"),
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please provide complete reservation details.",
    };
  }

  const reservedAt = new Date(`${parsed.data.date}T${parsed.data.time}`);

  if (Number.isNaN(reservedAt.getTime())) {
    return {
      success: false,
      message: "Please choose a valid reservation date and time.",
    };
  }

  const customer = await findOrCreateCustomer({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
  });

  const confirmationCode = createReference("DIN");

  await db.diningReservation.create({
    data: {
      customerId: customer.id,
      reservedAt,
      guestCount: parsed.data.guestCount,
      notes: parsed.data.notes,
      confirmationCode,
      status: BookingStatus.CONFIRMED,
    },
  });

  revalidatePath("/dine");
  revalidatePath("/admin");

  return {
    success: true,
    message: "Dining reservation confirmed.",
    reference: confirmationCode,
  };
}

export async function submitEventEnquiry(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const db = getDb();

  const guestCountValue = formData.get("guestCount");
  const parsed = eventSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventType: formData.get("eventType"),
    eventDate: formData.get("eventDate") || undefined,
    guestCount: guestCountValue ? guestCountValue : undefined,
    details: formData.get("details"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete the event enquiry form.",
    };
  }

  const customer = await findOrCreateCustomer({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
  });

  const quoteReference = createReference("EVT");

  await db.eventEnquiry.create({
    data: {
      customerId: customer.id,
      eventType: parsed.data.eventType,
      eventDate: parsed.data.eventDate ? new Date(parsed.data.eventDate) : null,
      guestCount: parsed.data.guestCount,
      details: parsed.data.details,
      quoteReference,
      status: EventStatus.NEW,
    },
  });

  revalidatePath("/events");
  revalidatePath("/admin");

  return {
    success: true,
    message: "Event enquiry received. The team can now prepare a quote.",
    reference: quoteReference,
  };
}

export async function setAccommodationBookingStatus(formData: FormData) {
  const db = getDb();

  const bookingId = String(formData.get("bookingId"));
  const status = formData.get("status") as BookingStatus;

  await db.accommodationBooking.update({
    where: { id: bookingId },
    data: { bookingStatus: status },
  });

  revalidatePath("/admin");
}

export async function setDiningReservationStatus(formData: FormData) {
  const db = getDb();

  const reservationId = String(formData.get("reservationId"));
  const status = formData.get("status") as BookingStatus;

  await db.diningReservation.update({
    where: { id: reservationId },
    data: { status },
  });

  revalidatePath("/admin");
}

export async function setEventStatus(formData: FormData) {
  const db = getDb();

  const enquiryId = String(formData.get("enquiryId"));
  const status = formData.get("status") as EventStatus;

  await db.eventEnquiry.update({
    where: { id: enquiryId },
    data: { status },
  });

  revalidatePath("/admin");
}

export async function setPaymentStatus(formData: FormData) {
  const db = getDb();

  const paymentId = String(formData.get("paymentId"));
  const status = formData.get("status") as PaymentStatus;

  const payment = await db.payment.update({
    where: { id: paymentId },
    data: {
      status,
      paidAt: status === PaymentStatus.PAID ? new Date() : null,
      refundedAt: status === PaymentStatus.REFUNDED ? new Date() : null,
    },
  });

  if (payment.accommodationBookingId) {
    await db.accommodationBooking.update({
      where: { id: payment.accommodationBookingId },
      data: {
        paymentStatus: status,
        bookingStatus:
          status === PaymentStatus.PAID
            ? BookingStatus.CONFIRMED
            : status === PaymentStatus.REFUNDED
              ? BookingStatus.CANCELLED
              : BookingStatus.PENDING,
      },
    });
  }

  revalidatePath("/admin");
}
