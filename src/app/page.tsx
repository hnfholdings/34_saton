import Link from "next/link";
import { ArrowRight, BedDouble, CalendarRange, UtensilsCrossed } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { highlights } from "@/lib/content";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
            Boutique venue operations, bookings and guest management
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              34 On Saturn
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              A modern hospitality website for accommodation bookings, dining reservations, event enquiries and admin control — tailored for the Steiltes, Mbombela venue.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/stay/book" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
              Book accommodation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/events" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
              Plan an event
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Phase 1 ready</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <BedDouble className="h-6 w-6 text-amber-300" />
                <p className="mt-3 font-semibold text-white">Accommodation bookings</p>
                <p className="mt-2 text-sm text-slate-300">Room availability, pricing, payment tracking and confirmations.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <UtensilsCrossed className="h-6 w-6 text-amber-300" />
                <p className="mt-3 font-semibold text-white">Dining reservations</p>
                <p className="mt-2 text-sm text-slate-300">Guest count, service timing and reservation references.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <CalendarRange className="h-6 w-6 text-amber-300" />
                <p className="mt-3 font-semibold text-white">Event enquiries</p>
                <p className="mt-2 text-sm text-slate-300">Quote-ready intake workflow with admin follow-up visibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard value="24/7" label="Online booking intake" />
          <StatCard value="0" label="Double-booking tolerance through overlap checks" />
          <StatCard value="3" label="Delivery phases in roadmap" />
          <StatCard value="1" label="Unified admin view for operations" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Business fit"
          title="Built around the functional specification"
          description="The site structure covers the requested public pages, online enquiry flows, payment tracking, admin operations and operational safeguards such as responsive layouts and POPIA-aware content." 
        />
      </section>
    </div>
  );
}
