import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="About"
        title="Hospitality, dining and functions under one roof"
        description="34 On Saturn is positioned as a venue for stays, meals and memorable events, supported by a digital front door that turns enquiries into manageable operational records."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Location</h3>
          <p className="mt-3 text-slate-300">{siteConfig.location}</p>
          <p className="mt-6 text-slate-300">
            Designed for travelers, private gatherings, dining guests and event clients in Mbombela.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Operational goals</h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Convert website traffic into paid bookings.</li>
            <li>• Reduce manual admin work through a single dashboard.</li>
            <li>• Prevent room inventory conflicts.</li>
            <li>• Support phased delivery for further automation.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
