import Link from "next/link";
import { siteConfig } from "@/lib/content";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stay", label: "Stay" },
  { href: "/dine", label: "Dine" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/policies", label: "Policies" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex flex-col text-sm font-medium text-white">
          <span className="text-lg font-semibold tracking-wide text-amber-300">34 On Saturn</span>
          <span className="text-xs text-slate-300">{siteConfig.location}</span>
        </Link>
        <nav className="hidden flex-wrap items-center gap-4 text-sm text-slate-200 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-amber-300">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
