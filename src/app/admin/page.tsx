import {
  BookingStatus,
  EventStatus,
  PaymentStatus,
} from "@prisma/client";
import {
  setAccommodationBookingStatus,
  setDiningReservationStatus,
  setEventStatus,
  setPaymentStatus,
} from "@/lib/actions";
import { getAdminDataSafe } from "@/lib/queries";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

const bookingStatuses = Object.values(BookingStatus);
const paymentStatuses = Object.values(PaymentStatus);
const eventStatuses = Object.values(EventStatus);

function StatusSelect({
  name,
  value,
  options,
}: {
  name: string;
  value: string;
  options: string[];
}) {
  return (
    <select name={name} defaultValue={value} className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default async function AdminPage() {
  const data = await getAdminDataSafe();

  return (
    <section className="mx-auto max-w-7xl space-y-10 px-6 py-20">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Admin portal</p>
        <h1 className="text-4xl font-semibold text-white">Bookings, payments and guest data</h1>
        <p className="max-w-3xl text-slate-300">
          A single operations dashboard for accommodation, dining, events, payments and customer visibility.
        </p>
      </div>

      {!data.configured ? (
        <div className="rounded-3xl border border-dashed border-amber-300/40 bg-amber-300/10 p-6 text-sm text-amber-100">
          Database setup is not complete yet. Run the install and Prisma setup steps from the README to activate live admin data.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Accommodation bookings</p>
          <p className="mt-3 text-3xl font-semibold text-white">{data.accommodationBookings.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Dining reservations</p>
          <p className="mt-3 text-3xl font-semibold text-white">{data.diningReservations.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Event enquiries</p>
          <p className="mt-3 text-3xl font-semibold text-white">{data.eventEnquiries.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Customers</p>
          <p className="mt-3 text-3xl font-semibold text-white">{data.customers}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">Content updates</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Public site copy is centralised in the content layer and page components, making text, highlights and contact details easy to update during phase 1. Before production, this can be extended into a full CMS-style editor with role-based access.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Accommodation management</h2>
          <div className="mt-6 space-y-4">
            {data.accommodationBookings.length > 0 ? (
              data.accommodationBookings.map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{booking.customer.fullName}</p>
                      <p className="text-sm text-slate-400">
                        {booking.room.name} • {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{booking.confirmationCode}</p>
                    </div>
                    <p className="text-sm font-semibold text-amber-200">{formatCurrency(booking.totalAmount)}</p>
                  </div>
                  <form action={setAccommodationBookingStatus} className="mt-4 flex flex-wrap items-center gap-3">
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <StatusSelect name="status" value={booking.bookingStatus} options={bookingStatuses} />
                    <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">
                      Update booking
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No accommodation bookings yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Payment management</h2>
          <div className="mt-6 space-y-4">
            {data.payments.length > 0 ? (
              data.payments.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{payment.customer.fullName}</p>
                      <p className="text-sm text-slate-400">
                        {payment.method} • {payment.reference}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-amber-200">{formatCurrency(payment.amount)}</p>
                  </div>
                  <form action={setPaymentStatus} className="mt-4 flex flex-wrap items-center gap-3">
                    <input type="hidden" name="paymentId" value={payment.id} />
                    <StatusSelect name="status" value={payment.status} options={paymentStatuses} />
                    <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">
                      Update payment
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No payments tracked yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Dining reservations</h2>
          <div className="mt-6 space-y-4">
            {data.diningReservations.length > 0 ? (
              data.diningReservations.map((reservation) => (
                <div key={reservation.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="font-semibold text-white">{reservation.customer.fullName}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {formatDateTime(reservation.reservedAt)} • {reservation.guestCount} guests
                  </p>
                  <form action={setDiningReservationStatus} className="mt-4 flex flex-wrap items-center gap-3">
                    <input type="hidden" name="reservationId" value={reservation.id} />
                    <StatusSelect name="status" value={reservation.status} options={bookingStatuses} />
                    <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">
                      Update reservation
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No dining reservations yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Event enquiries</h2>
          <div className="mt-6 space-y-4">
            {data.eventEnquiries.length > 0 ? (
              data.eventEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="font-semibold text-white">{enquiry.customer.fullName}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {enquiry.eventType} • {enquiry.quoteReference}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {enquiry.eventDate ? formatDate(enquiry.eventDate) : "Date to be confirmed"}
                  </p>
                  <form action={setEventStatus} className="mt-4 flex flex-wrap items-center gap-3">
                    <input type="hidden" name="enquiryId" value={enquiry.id} />
                    <StatusSelect name="status" value={enquiry.status} options={eventStatuses} />
                    <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white">
                      Update event
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No event enquiries yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
