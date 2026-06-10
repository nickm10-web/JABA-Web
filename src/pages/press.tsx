import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import PageLayout from "@/components/layout/page-layout";

const LIME = "#dfff00";

interface PressRelease {
  id: string;
  partner: string;
  tag: string;
  date: string;
  wireDate: string;
  plateDate: string;
  headline: string;
  location: string;
  logo?: string;
  graphic?: string;
  paragraphs: string[];
  quotes: { text: string; author: string; title: string }[];
}

const pressReleases: PressRelease[] = [
  {
    id: "cincinnati",
    partner: "University of Cincinnati",
    tag: "NCAA D-I · Big 12",
    date: "February 18, 2026",
    wireDate: "FEB 18 2026 · CINCINNATI, OH",
    plateDate: "FEB 18",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png",
    graphic: "/press/jabaxcincinnati.png",
    headline:
      "Cincinnati Athletics enters NIL partnership with JABA AI.",
    location: "Cincinnati, OH",
    paragraphs: [
      "The University of Cincinnati athletics department has partnered with JABA, an artificial intelligence platform tailored for the future of the name, image and likeness (NIL). JABA AI will assist Cincy Connect NIL in brand opportunity outreach, campaign metrics and management of student-athlete deals.",
      "JABA AI's core functions include seeking out prospective brand opportunities for Cincinnati's student-athletes, personalizing pitches and proposals for each Bearcat and then tracking and tabulating campaign performance in real-time on social media.",
      "Cincy Connect NIL, the University of Cincinnati's comprehensive student-athlete marketing and brand-building unit, works to identify and attract local, regional and national NIL opportunities for Cincinnati's student-athlete population. Those efforts will be bolstered with the added collaborative capabilities of JABA AI.",
      "JABA's platform will also assist Cincinnati's student-athletes with backend management of their respective NIL deals as they move from start to finish throughout their years of eligibility. The partnership represents the University of Cincinnati's ongoing commitment to providing student-athletes with innovative resources and support.",
    ],
    quotes: [
      {
        text: "JABA AI will empower our student-athletes to manage the complexities of deal execution and performance tracking alongside our department. We're excited to bring this advanced capability to Cincinnati and ensure our athletes have every advantage in the competitive NIL marketplace.",
        author: "Eddie Taylor",
        title: "Director of Athlete Influence, Cincinnati",
      },
    ],
  },
  {
    id: "rmu",
    partner: "Robert Morris University",
    tag: "NCAA D-I · Horizon League",
    date: "December 16, 2025",
    wireDate: "DEC 16 2025 · MOON TOWNSHIP, PA",
    plateDate: "DEC 16",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2523.png",
    graphic: "/press/jabaxrmu.png",
    headline:
      "RMU Athletics integrates JABA's AI platform to power next-generation NIL for student-athletes.",
    location: "Moon Township, PA",
    paragraphs: [
      "Robert Morris University Athletics announced a partnership with JABA, an AI-powered platform built to streamline and optimize Name, Image, and Likeness partnerships for student-athletes.",
      "This integration strengthens RMU's commitment to providing comprehensive NIL resources by giving every Colonial student-athlete a centralized system for managing their personal brand, ensuring compliance, and maximizing their commercial value. JABA's technology simplifies the entire NIL lifecycle, from the initial brand pitch to post-deal tracking.",
      "RMU Athletics recognized the need for an efficient, scalable solution to manage the rapidly evolving NIL landscape, giving smaller NIL teams the ability to operate at scale without adding staff.",
    ],
    quotes: [
      {
        text: "The integration of JABA's AI-powered platform is a significant step forward for our NIL support system. It provides efficiency, ensures compliance, and most importantly, empowers our student-athletes to professionally manage their personal brand and maximize their NIL opportunities without compromising their time.",
        author: "Chris King '94",
        title: "VP and Director of Athletics, RMU",
      },
      {
        text: "We are proud to partner with RMU Athletics to ensure that every Colonial has a simple, powerful, and compliant way to engage with the market and unlock their full commercial potential.",
        author: "Jordon Rooney",
        title: "CEO, JABA",
      },
    ],
  },
  {
    id: "purdue",
    partner: "Purdue University",
    tag: "NCAA D-I · Big Ten",
    date: "December 10, 2025",
    wireDate: "DEC 10 2025 · WEST LAFAYETTE, IN",
    plateDate: "DEC 10",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/2509.png",
    graphic: "/press/jabaxpurdue.png",
    headline:
      "Purdue Athletics partners with JABA AI to enhance student-athlete branding and NIL opportunities.",
    location: "West Lafayette, IN",
    paragraphs: [
      "Purdue Athletics partnered with JABA, an artificial intelligence platform tailored for the future of the name, image and likeness and revenue sharing landscape. JABA AI will assist Boilermaker student-athletes and Boilermaker BrandWorks in brand opportunity outreach, campaign metrics, and management of student-athlete deals.",
      "JABA AI's core functions include seeking out prospective brand opportunities for Purdue's student-athletes, personalizing pitches and proposals for each Boilermaker, and tracking and tabulating campaign performance in real-time on social media.",
      "Boiler BrandWorks, Purdue's in-house student-athlete marketing and brand-building unit, works in collaboration with Purdue Sports Properties to identify and attract local, regional and national NIL opportunities. Those efforts will be bolstered with JABA AI's collaborative capabilities.",
    ],
    quotes: [
      {
        text: "Partnering with JABA gives us a powerful tool to utilize in the branding and marketing space. We are excited to continue innovating within the NIL landscape to keep Purdue Athletics on the cutting edge of what lies ahead.",
        author: "Ken Halpin",
        title: "Deputy Athletics Director & COO, Purdue",
      },
    ],
  },
  {
    id: "athletes-unlimited",
    partner: "Athletes Unlimited",
    tag: "Pro Women's Sports",
    date: "December 1, 2025",
    wireDate: "DEC 01 2025 · NEW YORK, NY",
    plateDate: "DEC 01",
    logo: "https://auprosports.com/wp-content/themes/au/assets/img/logo-athletes-unlimited-white.svg",
    graphic: "/press/jabaxathletesu.png",
    headline:
      "Athletes Unlimited partners with JABA to elevate athlete branding across pro women's sports.",
    location: "New York, NY",
    paragraphs: [
      "Athletes Unlimited, which owns and operates professional women's softball, volleyball, and basketball leagues featuring world-class competition and fan experience, is partnering with JABA, an AI platform built to make life easier for athletes and the teams behind them.",
      "JABA helps organizations support athletes in building their brands, project-managing their deliverables, and staying organized with everything outside their sport. JABA functions as a digital assistant for athletes and staff, simplifying everything from brand outreach to workflow management.",
      "This collaboration builds on Athletes Unlimited's commitment to elevating athlete empowerment and brand development. Since launching its innovative player-driven pro leagues in 2020, AU has redefined the athlete experience.",
    ],
    quotes: [
      {
        text: "JABA helps fill a void in the athlete community by working with AI-driven technology to deliver individual, tailored feedback to help athletes strengthen their social presence.",
        author: "James Zehren",
        title: "Sr. Manager, Athlete & Content Marketing, Athletes Unlimited",
      },
    ],
  },
  {
    id: "baylor",
    partner: "Baylor University",
    tag: "NCAA D-I · Big 12",
    date: "August 12, 2025",
    wireDate: "AUG 12 2025 · WACO, TX",
    plateDate: "AUG 12",
    logo: "https://a.espncdn.com/i/teamlogos/ncaa/500/239.png",
    graphic: "/press/jabaxbaylor.png",
    headline:
      "Baylor University partners with JABA to power athlete NIL in the revenue sharing era.",
    location: "Waco, TX",
    paragraphs: [
      "Baylor Athletics is teaming up with JABA, the AI assistant built to support student-athletes and the team behind them in managing their brands and bringing them opportunities.",
      "As the college athletics landscape enters the era of revenue sharing, Baylor is taking a proactive step to ensure its student-athletes are equipped to succeed by adopting JABA's AI technology to streamline its NIL operations.",
      "This partnership is established in collaboration with Baylor's multimedia rights partner, Playfly Sports, which helps schools generate value through commercial innovation. At the center of this initiative is Playfly Max, an advanced revenue engine designed to leverage the evolving NIL landscape.",
    ],
    quotes: [
      {
        text: "Partnering with Playfly and JABA's AI technology allows us to elevate how our student-athletes engage with their personal brands and navigate opportunities in this dynamic NIL era. This collaboration reflects our continued investment in their growth, empowerment and long-term success.",
        author: "David Kaye",
        title: "Athletics General Manager, Baylor",
      },
    ],
  },
];

const indexNo = (i: number) => String(pressReleases.length - i).padStart(3, "0");

/* ── Fixed spine: five-tick exhibition map, lime fill for the active plate ── */
function Spine({ active }: { active: number }) {
  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {pressReleases.map((r, i) => (
        <a
          key={r.id}
          href={`#/press`}
          aria-label={r.partner}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById(`release-${r.id}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center gap-2"
        >
          <span
            className="font-sans text-[9px] tracking-[0.12em] opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.5)", mixBlendMode: "difference" }}
          >
            {indexNo(i)}
          </span>
          <span
            className="block h-[18px] w-px transition-colors"
            style={{
              background: active === i ? LIME : "rgba(128,128,128,0.55)",
            }}
          />
        </a>
      ))}
    </div>
  );
}

/* ── Rolling wire dateline ticker ── */
function WireTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % pressReleases.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);
  const r = pressReleases[idx];
  return (
    <div className="h-5 overflow-hidden font-sans text-[11px] tracking-[0.16em] text-white/50">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={r.id}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          JBA/WIRE · {indexNo(idx)} · {r.wireDate}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ── Broadcast monitor hero: the Damar Hamlin tape ── */
function MonitorHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const tick = "absolute h-3 w-3 border-white/40";

  return (
    <section className="relative bg-black px-6 pb-16 pt-28 text-white md:px-10 md:pb-20 md:pt-32 lg:px-12">
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl">
        {/* Compressed masthead band */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-5xl leading-none md:text-6xl">
            The newsroom.
          </h1>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <WireTicker />
            <p className="font-sans text-[11px] tracking-[0.16em] text-white/30">
              VOL. 01 · 2025/2026
            </p>
          </div>
        </div>

        {/* Monitor */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-8">
            {/* Viewfinder ticks */}
            <span className={`${tick} -left-2 -top-2 border-l border-t`} />
            <span className={`${tick} -right-2 -top-2 border-r border-t`} />
            <span className={`${tick} -bottom-2 -left-2 border-b border-l`} />
            <span className={`${tick} -bottom-2 -right-2 border-b border-r`} />

            <div className="relative overflow-hidden rounded-sm border border-white/15">
              <video
                ref={videoRef}
                src="/videos/Damar%20Anchor%20Short%20(2).mp4"
                poster="/DAMAR%20HAMLIN%20thumbnail.png"
                playsInline
                onEnded={() => setPlaying(false)}
                onClick={toggle}
                className="aspect-video w-full cursor-pointer object-cover"
              />
              {/* Glass play pill */}
              {!playing ? (
                <button
                  onClick={toggle}
                  className="liquid-email-glass absolute bottom-4 left-4 !w-auto cursor-pointer gap-2 !rounded-full !py-2 pl-4 pr-4"
                >
                  <span className="font-sans text-[12px] font-semibold tracking-[0.14em] text-white">
                    PLAY · SPECIAL REPORT
                  </span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Story metadata column */}
          <div className="flex flex-col md:col-span-4">
            <p
              className="flex items-center gap-2 border-b border-white/10 pb-3 font-sans text-[11px] tracking-[0.16em] text-white/50"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-block h-[6px] w-[6px]"
                style={{ background: LIME }}
              />
              JBA/BROADCAST · SPECIAL REPORT
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Damar Hamlin takes the anchor desk.
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/60">
              The Buffalo Bills safety joins JABA to break down how AI is
              rewiring the business of athlete marketing, from the wire to
              the locker room.
            </p>
            <dl
              className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-white/10 pt-4 font-sans text-[11px] tracking-[0.14em]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <dt className="text-white/35">FORMAT</dt>
              <dd className="text-white/70">BROADCAST</dd>
              <dt className="text-white/35">TALENT</dt>
              <dd className="text-white/70">D. HAMLIN · NFL</dd>
              <dt className="text-white/35">STATUS</dt>
              <dd className="text-white/70">AIRED</dd>
            </dl>
          </div>
        </div>

        {/* Index band */}
        <div
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/10 py-4 font-sans text-[11px] tracking-[0.14em] text-white/40"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {pressReleases.map((r, i) => (
            <a
              key={r.id}
              href="#/press"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`release-${r.id}`)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group transition-colors hover:text-white"
            >
              <span className="transition-colors group-hover:text-[#dfff00]">
                {indexNo(i)}
              </span>{" "}
              {r.partner.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The ledger: inverted-hover full-width rows ── */
function Ledger() {
  return (
    <section className="bg-[#eeeeee] text-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div>
          {pressReleases.map((r, i) => (
            <a
              key={r.id}
              href="#/press"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`release-${r.id}`)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative block overflow-hidden border-t border-black/10 last:border-b"
            >
              {/* Black wipe */}
              <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />

              <div className="relative grid grid-cols-12 items-center gap-4 py-8 md:py-10">
                {/* Ghost index */}
                <span
                  className="col-span-3 font-sans text-5xl font-extrabold tracking-tight text-black/15 transition-colors duration-300 group-hover:text-[#dfff00] md:col-span-2 md:text-6xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {indexNo(i)}
                </span>

                {/* Dateline */}
                <div
                  className="col-span-9 font-sans text-[11px] uppercase leading-relaxed tracking-[0.14em] text-black/50 transition-colors duration-300 group-hover:text-white/60 md:col-span-2"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <p>{r.date}</p>
                  <p>{r.location}</p>
                </div>

                {/* Headline */}
                <h3 className="col-span-12 font-display text-2xl leading-snug transition-colors duration-300 group-hover:text-[#eeeeee] md:col-span-6 md:text-3xl">
                  {r.headline}
                </h3>

                {/* Tag + read */}
                <div className="col-span-12 flex items-center justify-between font-sans text-[11px] tracking-[0.14em] text-black/45 transition-colors duration-300 group-hover:text-white/55 md:col-span-2 md:flex-col md:items-end md:gap-2">
                  <span className="uppercase">{r.tag}</span>
                  <span className="uppercase">Read →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Developing date: inks in as it crosses the viewport ── */
function DevelopingDate({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 45%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.06, 0.85]);
  return (
    <div ref={ref} aria-hidden className="pointer-events-none select-none">
      <motion.p
        style={{ opacity, fontVariantNumeric: "tabular-nums" }}
        className="font-sans text-[18vw] font-extrabold leading-none tracking-tighter text-black md:text-[11rem] lg:text-[13rem]"
      >
        {children}
      </motion.p>
    </div>
  );
}

/* ── Lower-third attribution (the page-wide voice for quotes) ── */
function LowerThird({ author, title }: { author: string; title: string }) {
  return (
    <div className="mt-5 border-l-2 border-black pl-4">
      <p className="font-sans text-[13px] font-semibold text-black">
        {author}
      </p>
      <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-black/50">
        {title}
      </p>
    </div>
  );
}

/* ── A plate: one release as a full editorial composition ── */
function Plate({ release, i }: { release: PressRelease; i: number }) {
  return (
    <article
      id={`release-${release.id}`}
      data-plate-idx={i}
      className="border-t border-black/10 py-16 first:border-t-0 md:py-20"
    >
      {/* Developing dateline */}
      <div className="flex items-end justify-between gap-6 overflow-hidden">
        <DevelopingDate>{release.plateDate}</DevelopingDate>
        <p
          className="mb-3 shrink-0 font-sans text-[11px] uppercase tracking-[0.16em] text-black/45"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {indexNo(i)} · {release.wireDate}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {/* Meta column */}
        <div className="md:col-span-4">
          {/* Announcement graphic slot */}
          <div className="relative">
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-l border-t border-black/30" />
            <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-r border-t border-black/30" />
            <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b border-l border-black/30" />
            <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b border-r border-black/30" />
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden border border-black/15 bg-black">
              {release.graphic ? (
                <img
                  src={release.graphic}
                  alt={`${release.partner} announcement`}
                  className="h-full w-full object-contain p-3"
                />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  {release.logo ? (
                    <img
                      src={release.logo}
                      alt={release.partner}
                      className="h-16 w-16 object-contain opacity-90"
                    />
                  ) : null}
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Announcement graphic
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Spec table */}
          <dl
            className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-black/10 pt-4 font-sans text-[11px] tracking-[0.12em]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <dt className="text-black/40">RELEASE</dt>
            <dd className="text-black/75">{indexNo(i)}</dd>
            <dt className="text-black/40">FILED</dt>
            <dd className="text-black/75">{release.date.toUpperCase()}</dd>
            <dt className="text-black/40">DATELINE</dt>
            <dd className="text-black/75">{release.location.toUpperCase()}</dd>
            <dt className="text-black/40">PARTNER</dt>
            <dd className="text-black/75">{release.partner.toUpperCase()}</dd>
          </dl>

        </div>

        {/* Copy column */}
        <div className="md:col-span-5">
          <h3 className="font-display text-3xl leading-tight md:text-4xl">
            {release.headline}
          </h3>
          <div className="plate-copy mt-6 space-y-5">
            {release.paragraphs.map((p, n) => (
              <p
                key={n}
                className="font-sans text-[15px] leading-[1.75] text-black/70"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Pull quote column */}
        <div className="md:col-span-3">
          <blockquote className="md:sticky md:top-28">
            <p className="font-display text-2xl leading-snug text-black md:text-[1.7rem]">
              "{release.quotes[0].text.length > 220
                ? release.quotes[0].text.slice(0, 217).trimEnd() + "..."
                : release.quotes[0].text}"
            </p>
            <LowerThird
              author={release.quotes[0].author}
              title={release.quotes[0].title}
            />
          </blockquote>
        </div>
      </div>
    </article>
  );
}

/* ── Press kit counter ── */
function PressKit() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard?.writeText("press@jaba.ai").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const assets = [
    { label: "Wordmark · white · PNG", href: "/JABA%20White%201%20(1).png" },
    { label: "Mascot · face · PNG", href: "/jaba-face.png" },
    { label: "Mascot · full · PNG", href: "/meet-jaba.png" },
    { label: "3D logotype · PNG", href: "/jaba-3d-logo.png" },
  ];

  return (
    <section className="relative bg-black text-white">
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Press kit.
            </h2>
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-white/55">
              Logos, mascot assets, and brand marks, cleared for editorial
              use. For interviews, embargoes, and anything else, write to us.
            </p>
            <button
              onClick={copyEmail}
              className="liquid-email-glass mt-8 !w-auto cursor-pointer gap-3 !rounded-full !py-2.5 pl-5 pr-5"
            >
              <span
                className="font-sans text-[13px] font-semibold tracking-[0.06em]"
                style={{ color: copied ? LIME : "#fff" }}
              >
                {copied ? "Copied to clipboard" : "press@jaba.ai · copy"}
              </span>
            </button>
          </div>

          <div className="md:col-span-7">
            <div
              className="border-t border-white/10"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {assets.map((a, i) => (
                <a
                  key={a.label}
                  href={a.href}
                  download
                  className="group flex items-center justify-between border-b border-white/10 py-4 font-sans text-[13px] tracking-[0.04em] text-white/70 transition-colors hover:text-white"
                >
                  <span className="flex items-center gap-5">
                    <span className="text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {a.label}
                  </span>
                  <span className="text-white/35 transition-colors group-hover:text-[#dfff00]">
                    Download ↓
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sign-off */}
        <div className="mt-24 flex flex-col items-center gap-4 md:mt-28">
          <img
            src="/jaba-face.png"
            alt=""
            aria-hidden
            className="h-10 w-10 rounded-full"
          />
          <p
            className="font-sans text-[10px] tracking-[0.22em] text-white/30"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            JBA/WIRE · END OF TRANSMISSION
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PressPage() {
  const [activePlate, setActivePlate] = useState(0);

  useEffect(() => {
    const plates = document.querySelectorAll("[data-plate-idx]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActivePlate(
              Number((e.target as HTMLElement).dataset.plateIdx),
            );
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    plates.forEach((p) => obs.observe(p));
    return () => obs.disconnect();
  }, []);

  return (
    <PageLayout>
      <Spine active={activePlate} />
      <MonitorHero />
      <Ledger />
      {/* The plate wing: every release as a full editorial composition */}
      <section className="bg-[#eeeeee] text-black">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
          {pressReleases.map((r, i) => (
            <Plate key={r.id} release={r} i={i} />
          ))}
        </div>
      </section>
      <PressKit />
    </PageLayout>
  );
}
