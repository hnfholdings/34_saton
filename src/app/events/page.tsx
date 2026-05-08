import { EventEnquiryForm } from "@/components/forms/event-enquiry-form";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { eventTypes } from "@/lib/content";

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Events & Functions"
        title="Host Your Dream Event at 34 On Saturn"
        description="From intimate weddings and proposal dinners to corporate functions, birthdays, baby showers, business and lifestyle events, 34 On Saturn is Mbombela's preferred venue for memorable occasions."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Event Types</h3>
          <ul className="mt-5 space-y-4 text-slate-300">
            {eventTypes.map((type) => (
              <li key={type}>• {type}</li>
            ))}
          </ul>
          <p className="mt-6 text-slate-300">
            Our versatile garden and indoor-outdoor spaces adapt beautifully to any event size and style. Enjoy the convenience of in-house catering, professional event support, and a stunning setting that impresses every guest.
          </p>
          <p className="mt-4 text-slate-300">Let our experienced team help turn your vision into reality.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/events" className="inline-flex items-center rounded-full bg-amber-300 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-amber-200">
              Submit an Event Inquiry
            </Link>
            <Link href="#" className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
              Download Event Brochure
            </Link>
          </div>
        </div>
        <EventEnquiryForm />
      </div>
    </section>
  );
}
