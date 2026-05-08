import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "34 On Saturn | Guesthouse, Restaurant and Events Venue",
  description: "Stay, dine and celebrate at 34 On Saturn in Mbombela with stylish accommodation, al-fresco dining, and versatile event spaces.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
