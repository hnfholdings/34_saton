import { EventEnquiryForm } from "@/components/forms/event-enquiry-form";
import { SectionHeading } from "@/components/section-heading";

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Events & Functions"
        title="From enquiry to quote to booking"
        description="The event workflow begins with a structured enquiry that can later be converted to quoted and booked statuses after deposit collection in the admin portal."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Workflow supported</h3>
          <ul className="mt-5 space-y-4 text-slate-300">
            <li>• Event date and guest capture</li>
            <li>• Quote reference generation</li>
            <li>• Admin status management</li>
            <li>• Deposit-driven conversion path</li>
            <li>• Phase 2 reminder readiness</li>
          </ul>
        </div>
        <EventEnquiryForm />
      </div>
    </section>
  );
}
