const testimonials = [
  {
    quote:
      "A complete rebuild in five days. It looked sharper than agencies charging six figures and launched faster than our internal team thought possible.",
    name: "Sarah Chen",
    role: "CEO, Luminary",
  },
  {
    quote:
      "Conversions went up 4x in the first month. The site feels expensive, but the process was shockingly efficient.",
    name: "Marcus Webb",
    role: "Head of Growth, Arcline",
  },
  {
    quote:
      "They did not just design our site. They rebuilt how our brand shows up online with a level of precision we had not seen before.",
    name: "Elena Voss",
    role: "Brand Director, Helix",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-black px-6 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[720px]">
          <div className="section-badge">What They Say</div>
          <h2 className="section-heading mt-5">Don&apos;t take our word for it.</h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="liquid-glass rounded-[28px] p-8">
              <p className="font-body text-sm font-light italic text-white/80">
                {item.quote}
              </p>
              <div className="mt-8">
                <div className="font-body text-sm font-medium text-white">
                  {item.name}
                </div>
                <div className="mt-1 font-body text-xs font-light text-white/50">
                  {item.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
