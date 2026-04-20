import { DiningReservationForm } from "@/components/forms/dining-reservation-form";
import { SectionHeading } from "@/components/section-heading";
import { diningMoments } from "@/lib/content";

export default function DinePage() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Dine"
        title="Private dining and reservation management"
        description="Capture guest count, service date and timing in a simple reservation workflow that feeds directly into the admin view."
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
        </div>
        <DiningReservationForm />
      </div>
    </section>
  );
}
