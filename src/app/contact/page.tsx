import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Direct contact details for guests and event clients"
        description="The public contact page keeps the venue reachable while bookings, reservations and function enquiries are captured through the dedicated forms."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Address</p>
          <p className="mt-4 text-slate-300">{siteConfig.location}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Email</p>
          <p className="mt-4 text-slate-300">{siteConfig.email}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Phone</p>
          <p className="mt-4 text-slate-300">{siteConfig.phone}</p>
        </div>
      </div>
    </section>
  );
}
