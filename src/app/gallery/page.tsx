import { SectionHeading } from "@/components/section-heading";
import { galleryCaptions } from "@/lib/content";
import Link from "next/link";

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Gallery"
        title="See the Magic"
        description="Immerse yourself in the beauty of 34 On Saturn. Browse our gallery to experience the lush garden, stylish rooms, inviting dining areas, and vibrant event setups."
      />

      <p className="max-w-4xl text-slate-300">
        From golden sunsets over the hills to candlelit tables and joyful celebrations, every corner tells a story.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleryCaptions.map((caption, index) => (
          <div key={caption} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="h-72 bg-gradient-to-br from-amber-300/20 via-slate-800 to-slate-950" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Gallery {index + 1}</p>
              <p className="mt-2 text-lg font-medium text-white">{caption}</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/gallery" className="inline-flex items-center rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200">
        Browse Gallery
      </Link>
    </section>
  );
}
