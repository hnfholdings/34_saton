import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/content";
import Link from "next/link";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Get in Touch"
        description="We're here to make your visit to 34 On Saturn seamless. Reach out for bookings, event inquiries, or questions."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Address</p>
          <p className="mt-4 text-slate-300">{siteConfig.location}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Phone</p>
          <p className="mt-4 text-slate-300">{siteConfig.phone}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">WhatsApp</p>
          <p className="mt-4 text-slate-300">{siteConfig.whatsapp}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Email</p>
          <p className="mt-4 text-slate-300">{siteConfig.email}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Social Media</p>
          <p className="mt-4 text-slate-300">Instagram / Facebook / TikTok</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/contact" className="inline-flex items-center rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
          Contact Form
        </Link>
        <Link href="https://maps.google.com/?q=34+Saturn+Street,+Steiltes,+Mbombela" className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
          View on Map
        </Link>
      </div>
    </section>
  );
}
