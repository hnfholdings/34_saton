import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { highlights, roomAmenities, siteConfig } from "@/lib/content";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
            Guesthouse • Restaurant • Events Venue
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Stay, Dine and Celebrate in Mbombela
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Discover 34 On Saturn, a stylish, laid-back retreat in the heart of Mbombela (Nelspruit), Mpumalanga. Nestled on the picturesque hills of Steiltes, we offer comfortable accommodation, exceptional al-fresco dining, and versatile event spaces in a serene garden setting.
            </p>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Whether you are looking for a peaceful weekend escape, a memorable meal, or the perfect venue to celebrate life&apos;s special moments, 34 On Saturn delivers charm, comfort, and warm South African hospitality.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/stay/book" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
              Book Your Stay
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dine" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
              Reserve a Table
            </Link>
            <Link href="/events" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
              Plan Your Event
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Welcome to 34 On Saturn</p>
            <div className="mt-6 grid gap-4">
              <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-slate-300">
                Experience the heartbeat of Mbombela at 34 On Saturn, where comfort meets unforgettable moments. Perched on the serene hills of Steiltes in Mbombela (Nelspruit), Mpumalanga, we blend modern elegance with natural beauty.
              </p>
              <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-slate-300">
                Our thoughtfully designed ensuite rooms, lush outdoor garden with pristine artificial grass, and enchanting al-fresco dining area create an atmosphere that feels both luxurious and welcoming.
              </p>
              <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-slate-300">
                Whether it is an intimate dinner under the stars, a relaxing getaway, a romantic celebration, or a significant life event, 34 On Saturn is where memories are made.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading
          eyebrow="Accommodations"
          title="Stay in Comfort and Style"
          description="At 34 On Saturn, every room is designed to feel like a home away from home. Our thoughtfully appointed ensuite rooms combine modern amenities with warm, inviting decor for business travellers, couples, families, and leisure guests."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roomAmenities.map((amenity) => (
            <div key={amenity} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              {amenity}
            </div>
          ))}
        </div>
        <p className="mt-6 text-slate-300">Escape the ordinary and recharge in the tranquil surroundings of Mbombela&apos;s hills.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/stay/book" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
            Check Availability
          </Link>
          <Link href="#" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
            View Special Offers
          </Link>
          <Link href="/stay" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
            See All Rooms
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Plan Your Visit"
          title="Quick Links and Downloads"
          description="Use these shortcuts to plan your stay, meal, or event at 34 On Saturn."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link href="#" className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300 transition hover:border-amber-300 hover:text-amber-200">
            Download Menu
          </Link>
          <Link href="/events" className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300 transition hover:border-amber-300 hover:text-amber-200">
            Book Your Event
          </Link>
          <Link href="#" className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300 transition hover:border-amber-300 hover:text-amber-200">
            Download Event Brochure
          </Link>
          <Link href="#" className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300 transition hover:border-amber-300 hover:text-amber-200">
            View All Special Offers
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading
          eyebrow="Contact Us"
          title="Get in Touch"
          description="We are here to make your visit to 34 On Saturn seamless. Reach out for bookings, event inquiries, or questions."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Address</p>
            <p className="mt-2">{siteConfig.location}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Phone</p>
            <p className="mt-2">{siteConfig.phone}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">WhatsApp</p>
            <p className="mt-2">{siteConfig.whatsapp}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Email</p>
            <p className="mt-2">{siteConfig.email}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Social</p>
            <p className="mt-2">Instagram / Facebook / TikTok</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
            Contact Form
          </Link>
          <Link href="https://maps.google.com/?q=34+Saturn+Street,+Steiltes,+Mbombela" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
            View on Map
          </Link>
        </div>
      </section>
    </div>
  );
}
