import { Button } from "@/components/ui/button";

const rows = [
  {
    title: "Designed to convert. Built to perform.",
    description:
      "Every pixel is intentional. Our AI studies what works across thousands of top sites, then builds yours to outperform them all.",
    cta: "Learn more",
    image: "/images/feature-1.gif",
  },
  {
    title: "It gets smarter. Automatically.",
    description:
      "Your site evolves on its own. AI monitors every click, scroll, and conversion, then optimizes in real time. No manual updates. Ever.",
    cta: "See how it works",
    image: "/images/feature-2.gif",
  },
];

export function FeaturesChessSection() {
  return (
    <section id="work" className="bg-black px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[700px]">
          <div className="section-badge">Capabilities</div>
          <h2 className="section-heading mt-5">Pro features. Zero complexity.</h2>
        </div>

        <div className="mt-16 space-y-14">
          {rows.map((row, index) => (
            <div
              key={row.title}
              className={`flex flex-col items-center gap-10 lg:gap-16 ${index === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
            >
              <div className="w-full lg:w-1/2">
                <h3 className="font-heading text-3xl italic leading-[0.95] text-white md:text-4xl">
                  {row.title}
                </h3>
                <p className="section-body mt-5 max-w-[540px]">
                  {row.description}
                </p>
                <Button variant="glass-strong" className="mt-8">
                  {row.cta}
                </Button>
              </div>

              <div className="liquid-glass w-full overflow-hidden rounded-[28px] p-3 lg:w-1/2">
                <img
                  src={row.image}
                  alt=""
                  className="aspect-[4/3] w-full rounded-[22px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
