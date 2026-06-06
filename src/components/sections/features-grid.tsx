import { BarChart3, Palette, Shield, Zap } from "lucide-react";

const cards = [
  {
    icon: Zap,
    title: "Days, Not Months",
    description: "Concept to launch at a pace that redefines fast.",
  },
  {
    icon: Palette,
    title: "Obsessively Crafted",
    description: "Every detail considered. Every element refined.",
  },
  {
    icon: BarChart3,
    title: "Built to Convert",
    description: "Layouts informed by data. Decisions backed by performance.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade protection comes standard.",
  },
];

export function FeaturesGridSection() {
  return (
    <section id="process" className="bg-black px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[720px]">
          <div className="section-badge">Why Us</div>
          <h2 className="section-heading mt-5">The difference is everything.</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title} className="liquid-glass rounded-[28px] p-6">
                <div className="liquid-glass-strong flex h-10 w-10 items-center justify-center rounded-full text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-6 font-heading text-lg italic text-white">
                  {card.title}
                </h3>
                <p className="mt-3 font-body text-sm font-light text-white/60">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
