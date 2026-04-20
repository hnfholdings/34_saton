import { AccommodationBookingForm } from "@/components/forms/accommodation-booking-form";
import { SectionHeading } from "@/components/section-heading";
import { getRoomsSafe } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function StayBookingPage() {
  const rooms = await getRoomsSafe();

  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-20">
      <SectionHeading
        eyebrow="Accommodation booking"
        title="Capture dates, guest details and payment method"
        description="Availability is checked against overlapping reservations before the booking is stored, preventing double-bookings for active room inventory."
      />
      <AccommodationBookingForm rooms={rooms} />
    </section>
  );
}
