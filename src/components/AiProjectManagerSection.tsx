import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface Card {
  number: string;
  title: string;
  description: string;
  videoSrc: string;
}

const cards: Card[] = [
  {
    number: "01",
    title: "Centralize.",
    description:
      "Your data, campaigns, conversations, and workflows in one place.",
    videoSrc: "/videos/01-pole.mp4",
  },
  {
    number: "02",
    title: "Connect.",
    description:
      "JABA understands what's happening across all of it. Athletes, brands, content, deals, deadlines.",
    videoSrc: "/videos/02-athlete.mp4",
  },
  {
    number: "03",
    title: "Automate.",
    description:
      "Follow ups, reminders, outreach, campaign tracking, reporting. Done.",
    videoSrc: "/videos/03-phone.mp4",
  },
];

export default function AiProjectManagerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track desktop breakpoint so hover behavior is disabled on mobile.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Autoplay each video on mount; silence the rejected play() promise that
  // some browsers throw when autoplay isn't yet granted.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      const tryPlay = () => {
        v.play().catch(() => {
          /* ignore — IntersectionObserver below will retry */
        });
      };
      if (v.readyState >= 1) {
        tryPlay();
      } else {
        v.addEventListener("loadedmetadata", tryPlay, { once: true });
      }
    });
  }, []);

  // Pause videos when offscreen, play when on.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            videoRefs.current.forEach((v) => {
              v?.play().catch(() => {});
            });
          } else {
            videoRefs.current.forEach((v) => {
              v?.pause();
            });
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-16 text-white md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              The <span className="italic">AI project manager</span> for
              athlete campaigns.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/60 md:pb-1 md:text-lg">
              JABA runs every campaign, content drop, and brand deal across
              your athletes, start to finish. No rip and replace. No new
              login. Built to speak the language of the sport.
            </p>
          </div>
          <div className="mt-10 h-px bg-white/10" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row md:gap-4">
          {cards.map((card, i) => {
            const isHovered = hoveredIndex === i;
            const someoneElseHovered =
              hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={card.number}
                role="group"
                aria-label={`Step ${card.number}: ${card.title.replace(/\.$/, "")}`}
                onHoverStart={() => isDesktop && setHoveredIndex(i)}
                onHoverEnd={() => isDesktop && setHoveredIndex(null)}
                animate={{ flexGrow: isDesktop && isHovered ? 1.6 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{ flexBasis: 0 }}
                className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl md:aspect-auto md:h-[48vh] lg:h-[52vh] xl:h-[56vh]"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={card.videoSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <motion.div
                  animate={{ opacity: someoneElseHovered ? 0.6 : 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10"
                >
                  <p className="mb-3 text-sm font-medium text-white/70 md:text-base">
                    {card.number}
                  </p>
                  <h3 className="mb-3 font-display text-2xl leading-tight md:mb-4 md:text-3xl lg:text-4xl">
                    {card.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                    {card.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
