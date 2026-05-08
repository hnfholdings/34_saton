import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="About"
        title="Welcome to 34 On Saturn"
        description="Experience the heartbeat of Mbombela at 34 On Saturn, a sophisticated guesthouse, restaurant, and events venue where comfort meets unforgettable moments."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">Location</h3>
          <p className="mt-3 text-slate-300">{siteConfig.location}</p>
          <p className="mt-6 text-slate-300">
            Perched on the serene hills of Steiltes in Mbombela (Nelspruit), Mpumalanga, 34 On Saturn blends modern elegance with natural beauty.
          </p>
          <p className="mt-4 text-slate-300">
            Our thoughtfully designed ensuite rooms, lush outdoor garden with pristine artificial grass, and enchanting al-fresco dining area create an atmosphere that feels both luxurious and welcoming.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-white">What sets us apart</h3>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Peaceful hilltop location with calming views</li>
            <li>• Elegant yet relaxed garden setting</li>
            <li>• In-house restaurant celebrating local flavours</li>
            <li>• Versatile spaces for events and celebrations</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/stay/book" className="inline-flex items-center rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
          Book Your Stay
        </Link>
        <Link href="/dine" className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
          Reserve a Table
        </Link>
        <Link href="/events" className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
          Plan Your Event
        </Link>
      </div>
    </section>
  );
}
