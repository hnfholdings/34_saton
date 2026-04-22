import Image from "next/image";
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
        <Link href="/" className="flex items-center gap-3 text-sm font-medium text-white">
          <Image src="/logo.png" alt="34 On Saturn logo" width={120} height={120} priority className="h-20 w-20 mix-blend-screen" />
          <span className="flex flex-col">
            <span className="text-xs text-slate-300">{siteConfig.location}</span>
          </span>
        </Link>
        <nav className="hidden flex-wrap items-center gap-4 text-sm text-slate-200 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-amber-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative lg:hidden">
          <summary className="list-none rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-300 hover:text-amber-200 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-xl shadow-black/40">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10 hover:text-amber-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
