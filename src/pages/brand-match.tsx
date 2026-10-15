import { useRef, useState } from "react";

import BrandMatchDemo from "@/components/BrandMatchDemo";
import PageLayout from "@/components/layout/page-layout";
import ShortlistForm from "@/components/ShortlistForm";
import { VoltButton } from "@/components/ui/volt-button";

/**
 * The "see how it works" page, reached from the brands landing page.
 *
 * It runs on arrival when the brand came through in the URL, which is the
 * whole point of clicking: the animation is the page, not something waiting
 * behind another form. Arriving without a brand (a shared link, a bookmark)
 * still works, because the demo keeps its own idle form for that case.
 */

function brandFromUrl() {
  try {
    const b = new URLSearchParams(window.location.search).get("brand") ?? "";
    // Never echo markup back into the page, and never a paragraph either.
    return b.replace(/[<>]/g, "").trim().slice(0, 60);
  } catch {
    return "";
  }
}

export default function BrandMatchPage() {
  // Read once, on first render: the URL will not change under us.
  const [brand] = useState(brandFromUrl);
  const askRef = useRef<HTMLDivElement>(null);

  return (
    <PageLayout bare>
      <main className="bg-[#0a0a0a]">
        {/* Just enough chrome to get back, and nothing else to click away to. */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
          <a href="/brands.html" className="inline-flex items-center gap-2">
            <img src="/jaba-head.webp" alt="JABA" className="h-8 w-auto" />
          </a>
          <a
            href="/brands.html"
            className="font-sans text-[13px] text-white/45 transition-colors hover:text-white/80"
          >
            Back
          </a>
        </div>

        <BrandMatchDemo
          fill
          autoBrand={brand}
          onUnlock={() =>
            askRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        />

        {/* The ask, waiting below the fold with the brand already filled in. */}
        <section className="px-6 py-20 md:px-10 md:py-24">
          <div ref={askRef} className="mx-auto max-w-2xl text-center">
            <h2 className="font-deck text-3xl leading-[1.06] text-white md:text-4xl">
              {brand ? `Want the real list for ${brand}?` : "Want the real list?"}
            </h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-[15px] leading-relaxed text-white/55">
              Tell us where to send it and we&rsquo;ll put together the athletes
              worth talking to.
            </p>
            <div className="mt-8 text-left">
              <ShortlistForm id="shortlist" brand={brand} tone="dark" />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-8 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <p className="font-sans text-[13px] text-white/35">
              © {new Date().getFullYear()} JABA
            </p>
            <VoltButton size="sm" href="/brands.html">
              Back to overview
            </VoltButton>
          </div>
        </footer>
      </main>
    </PageLayout>
  );
}
