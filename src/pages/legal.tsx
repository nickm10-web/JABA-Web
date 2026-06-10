import PageLayout from "@/components/layout/page-layout";
import type { LegalBlock, LegalDoc } from "@/data/legal-content";

/** Group consecutive bullet blocks into a single list. */
function groupBlocks(blocks: LegalBlock[]) {
  const groups: Array<
    { kind: "h" | "p"; text: string } | { kind: "ul"; items: string[] }
  > = [];
  for (const b of blocks) {
    if (b.t === "li") {
      const last = groups[groups.length - 1];
      if (last && last.kind === "ul") last.items.push(b.x);
      else groups.push({ kind: "ul", items: [b.x] });
    } else {
      groups.push({ kind: b.t, text: b.x });
    }
  }
  return groups;
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const groups = groupBlocks(doc.blocks);

  return (
    // Legal pages end on the off-white print surface, so the footer loop
    // fades out of that instead of black.
    <PageLayout footerFade="#eeeeee">
      {/* Black masthead band so the fixed nav sits on its native surface. */}
      <section className="bg-black px-6 pb-12 pt-36 text-white md:px-10 md:pb-14 md:pt-40 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-5xl leading-none md:text-6xl">
            {doc.title.charAt(0) + doc.title.slice(1).toLowerCase()}.
          </h1>
          <p
            className="mt-4 font-sans text-[11px] uppercase tracking-[0.16em] text-white/45"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {doc.date}
          </p>
        </div>
      </section>

      {/* The print side. */}
      <section className="bg-[#eeeeee] px-6 py-16 text-black md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {groups.map((g, i) =>
            g.kind === "h" ? (
              <h2
                key={i}
                className="mt-10 border-t border-black/10 pt-8 font-display text-2xl leading-snug first:mt-0 first:border-t-0 first:pt-0 md:text-3xl"
              >
                {g.text}
              </h2>
            ) : g.kind === "ul" ? (
              <ul key={i} className="mt-4 space-y-2">
                {g.items.map((item, n) => (
                  <li
                    key={n}
                    className="flex gap-3 font-sans text-[15px] leading-[1.75] text-black/70"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.72em] h-px w-3 shrink-0 bg-black/40"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p
                key={i}
                className="mt-4 font-sans text-[15px] leading-[1.75] text-black/70"
              >
                {g.text}
              </p>
            ),
          )}
        </div>
      </section>
    </PageLayout>
  );
}
