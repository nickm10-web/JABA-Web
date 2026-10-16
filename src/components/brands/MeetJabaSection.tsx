/**
 * "Meet JABA" as one sentence instead of four boxes. The four-pillar grid was
 * the same skeleton as every other section, and a grid of equal icons says
 * nothing about which part matters. A sentence reads in order and lands on the
 * last clause, which is the one a brand is buying.
 *
 * The icons are rendered objects set into the type, the way the homepage sets
 * "live it." into its headline. Each sits on the clause it belongs to; a
 * clause without a render yet simply has none, rather than a stand-in from a
 * different family.
 *
 * The line under it is the film's own, word for word.
 */

function Icon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className="mr-[0.18em] inline-block h-[1.4em] w-auto -translate-y-[0.06em] align-middle drop-shadow-[0_14px_24px_rgba(0,0,0,0.8)]"
    />
  );
}

export default function MeetJabaSection() {
  return (
    <section className="bg-black px-6 py-24 text-white md:px-10 md:py-36 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Each icon leads its own clause, so punctuation stays on the words
            and the line height has room for an object taller than a capital. */}
        <p className="font-deck text-[2.1rem] leading-[1.42] md:text-[3.4rem] md:leading-[1.38]">
          <span className="text-white/45">Meet JABA.</span>{" "}
          {/* Icon and the word after it wrap as one, or a line break can
              strand the icon at the end of the line above its clause. */}
          <span className="whitespace-nowrap">
            <Icon src="/icon-compass.webp" />
            It
          </span>{" "}
          knows their feed,{" "}
          <span className="whitespace-nowrap">
            <Icon src="/icon-bulb.webp" />
            brings
          </span>{" "}
          the idea, and runs the whole campaign over text.
        </p>
        <p className="mt-8 font-sans text-lg text-white/45 md:text-xl">
          The bridge between athletes and influencers.
        </p>
      </div>
    </section>
  );
}
