import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getRoomsSafe } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function StayPage() {
  const rooms = await getRoomsSafe();

  return (
    <section className="mx-auto max-w-7xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Stay"
        title="Accommodation with real availability control"
        description="Guests can submit date-based bookings with room selection, price visibility and payment tracking, while the admin side retains full oversight of every stay request."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <article key={room.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="rounded-2xl bg-gradient-to-br from-amber-300/20 to-slate-950 p-10 text-sm text-amber-100">
                {room.image || room.name}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{room.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{room.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
                <span>Up to {room.capacity} guests</span>
                <span className="font-semibold text-amber-200">{formatCurrency(room.rate)} / night</span>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-slate-300 lg:col-span-3">
            Room inventory will appear here after the database is migrated and seeded.
          </div>
        )}
      </div>

      <Link href="/stay/book" className="inline-flex rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
        Continue to booking
      </Link>
    </section>
  );
}
