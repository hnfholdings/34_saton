import { SectionHeading } from "@/components/section-heading";

export default function PoliciesPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Policies"
        title="Cancellation, privacy and operating policy notes"
        description="These policy sections provide a solid operational baseline for phase 1 and can be refined with legal review before production launch."
      />

      <div className="grid gap-6">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Accommodation cancellation</h3>
          <p className="mt-3 leading-7 text-slate-300">
            Cancellation requests should be recorded by admin against the booking record. Refund outcomes depend on timing, payment status and the applicable booking terms.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">POPIA and privacy</h3>
          <p className="mt-3 leading-7 text-slate-300">
            Customer name, contact details, booking details and payment status are stored only for operational processing, guest communication and legal record-keeping. Access should be restricted to authorised staff.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Security and backups</h3>
          <p className="mt-3 leading-7 text-slate-300">
            Production deployment should enforce HTTPS, daily database backups, role-based admin access and secure handling of card payment data through a PCI-compliant gateway.
          </p>
        </article>
      </div>
    </section>
  );
}
