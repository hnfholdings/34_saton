import { DiningReservationForm } from "@/components/forms/dining-reservation-form";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { siteConfig } from "@/lib/content";
import { diningMoments } from "@/lib/content";

export default function DinePage() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Dine"
        title="Savor the Flavors at 34 On Saturn"
        description="Our restaurant is the soul of 34 On Saturn, offering laid-back backyard vibes and a menu that celebrates Mpumalanga's culinary heritage."
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Dining occasions</h3>
          <div className="mt-6 grid gap-3">
            {diningMoments.map((moment) => (
              <div key={moment} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-300">
                {moment}
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-2 text-slate-300">
            <p className="font-semibold text-white">Hours</p>
            <p>Mondays: Closed to the public, open to staying guests for breakfast.</p>
            <p>Special arrangements can be made for event bookings on Mondays.</p>
            <p>Tuesday to Friday: 12:00 - 21:30</p>
            <p>Saturday: 10:00 - 21:30</p>
            <p>Sunday: 10:00 - 21:00</p>
          </div>
          <p className="mt-6 text-slate-300">
            Reservations: Book online or via WhatsApp at {siteConfig.whatsapp} / Tel {siteConfig.phone}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#" className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
              View Menu
            </Link>
            <Link href="/dine" className="inline-flex items-center rounded-full bg-amber-300 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-amber-200">
              Reserve a Table
            </Link>
          </div>
        </div>
        <DiningReservationForm />
      </div>
    </section>
  );
}
