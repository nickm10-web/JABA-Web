export function PartnersSection() {
  return (
    <section className="bg-black px-6 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-[900px] text-center">
        <div className="section-badge">Trusted by the teams behind</div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((partner) => (
            <span
              key={partner}
              className="font-heading text-2xl italic text-white md:text-3xl"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
