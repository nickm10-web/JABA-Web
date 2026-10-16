import ShortlistForm from "@/components/ShortlistForm";

/**
 * The close: the ask, straight into the main site's footer. The footer's own
 * scene (the 3D JABA letters in the grass, JABA on his pedestal) is the final
 * image, so this section doesn't stage a second one above it.
 *
 * The headline and line under it are the existing brands page's closing copy.
 */
export default function ClosingSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 pb-28 pt-24 text-white md:px-10 md:pt-32 lg:px-12">
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-deck text-4xl leading-[1.05] md:text-5xl">
            Ready to run campaigns without the chaos?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg leading-relaxed text-white/55">
            See how JABA helps brand teams execute athlete partnerships at scale.
          </p>
          <div className="mt-9 text-left">
            <ShortlistForm id="shortlist" tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
