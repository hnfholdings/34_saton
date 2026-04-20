import { SectionHeading } from "@/components/section-heading";
import { galleryCaptions } from "@/lib/content";

export default function GalleryPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-12 px-6 py-20">
      <SectionHeading
        eyebrow="Gallery"
        title="A visual placeholder gallery ready for real venue imagery"
        description="The gallery page is included in the public information architecture and can be updated with real photography as content assets become available."
      />

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
    </section>
  );
}
