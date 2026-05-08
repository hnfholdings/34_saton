import Link from "next/link";
import { siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">34 On Saturn</p>
          <p className="mt-2 text-sm text-slate-300">Guesthouse, restaurant, and events venue in Mbombela.</p>
        </div>
        <div className="text-sm text-slate-300">
          <p>{siteConfig.location}</p>
          <p>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-amber-300">
              {siteConfig.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-300">
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-300">
          <Link href="/stay/book" className="hover:text-amber-300">
            Book Your Stay
          </Link>
          <Link href="/dine" className="hover:text-amber-300">
            Reserve a Table
          </Link>
          <Link href="/events" className="hover:text-amber-300">
            Plan Your Event
          </Link>
          <Link href="/policies" className="hover:text-amber-300">
            Policies & POPIA
          </Link>
        </div>
      </div>
    </footer>
  );
}
