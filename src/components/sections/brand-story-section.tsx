import { useEffect, useRef, useState } from "react";

type StoryState = {
  headline: string;
  proofLabel: string;
  proofBody: string;
  leftImage: string;
  rightImage: string;
};

const storyStates: StoryState[] = [
  {
    headline: "Other platforms track deals. JABA runs them.",
    proofLabel: "The intelligence layer for NIL.",
    proofBody:
      "Proprietary athlete scoring, campaign forecasting with confidence intervals, and an AI assistant that communicates with athletes directly via text. Both sides of the marketplace, one platform.",
    leftImage: "/story-card-left-1.png",
    rightImage: "/story-card-right-1.png",
  },
  {
    headline: "Athletes never log in. That's the point.",
    proofLabel: "Meet them where they are.",
    proofBody:
      "College athletes are 18–22. They live on their phones. JABA's AI texts them reminders, content ideas, and campaign updates through iMessage and RCS. No app to download, no dashboard to learn. Response rates 5–10x higher than any portal.",
    leftImage: "/story-card-left-2.png",
    rightImage: "/story-card-right-2.png",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(value: number, inMin: number, inMax: number) {
  if (value <= inMin) return 0;
  if (value >= inMax) return 1;
  return (value - inMin) / (inMax - inMin);
}

export default function BrandStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncViewport = () => setIsDesktop(mediaQuery.matches);
    syncViewport();

    const updateProgress = () => {
      if (!sectionRef.current || !mediaQuery.matches) {
        setProgress(0);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const total = rect.height - viewportHeight;

      if (total <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = clamp(-rect.top / total, 0, 1);
      setProgress(nextProgress);
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateProgress();
      });
    };

    syncViewport();
    updateProgress();

    mediaQuery.addEventListener("change", syncViewport);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const transition = mapRange(progress, 0.28, 0.72);
  const stateOneOpacity = 1 - transition;
  const stateTwoOpacity = transition;

  // Left card goes UP as you scroll, right card goes DOWN
  const leftY = 80 - transition * 200;
  const leftRotate = -8 - transition * 4;

  const rightY = -80 + transition * 200;
  const rightRotate = 8 + transition * 4;

  return (
    <section
      ref={sectionRef}
      className="story-section relative bg-[#eeeeee]"
      aria-label="Brand story"
    >
      <div className="story-stage hidden md:flex">
        <div className="story-card story-card-left">
          <div
            className="story-card-anchor"
            style={{
              transform: `translate3d(0px, ${leftY}px, 0) rotate(${leftRotate}deg)`,
            }}
          >
            {storyStates.map((state, index) => (
              <img
                key={state.leftImage}
                src={state.leftImage}
                alt=""
                aria-hidden="true"
                className="story-card-image"
                style={{
                  opacity: index === 0 ? stateOneOpacity : stateTwoOpacity,
                }}
              />
            ))}
          </div>
        </div>

        <div className="story-card story-card-right">
          <div
            className="story-card-anchor"
            style={{
              transform: `translate3d(0px, ${rightY}px, 0) rotate(${rightRotate}deg)`,
            }}
          >
            {storyStates.map((state, index) => (
              <img
                key={state.rightImage}
                src={state.rightImage}
                alt=""
                aria-hidden="true"
                className="story-card-image"
                style={{
                  opacity: index === 0 ? stateOneOpacity : stateTwoOpacity,
                }}
              />
            ))}
          </div>
        </div>

        <div className="story-copy">
          {storyStates.map((state, index) => {
            const opacity = index === 0 ? stateOneOpacity : stateTwoOpacity;
            const headlineTranslateY = index === 0 ? -transition * 22 : (1 - transition) * 22;
            const proofTranslateY = index === 0 ? -transition * 14 : (1 - transition) * 14;

            return (
              <div
                key={state.headline}
                className="story-copy-state"
                style={{
                  opacity,
                }}
              >
                <h2
                  className="story-headline"
                  style={{
                    transform: `translate3d(0, ${headlineTranslateY}px, 0)`,
                  }}
                >
                  {state.headline}
                </h2>
                <div
                  className="story-proof"
                  style={{
                    transform: `translate3d(0, ${proofTranslateY}px, 0)`,
                  }}
                >
                  <p className="story-proof-label">{state.proofLabel}</p>
                  <p className="story-proof-body">{state.proofBody}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="story-mobile md:hidden">
        {storyStates.map((state, index) => (
          <article key={state.headline} className="story-mobile-state">
            <div className="story-mobile-cards">
              <img
                src={state.leftImage}
                alt=""
                aria-hidden="true"
                className={`story-mobile-card ${index % 2 === 0 ? "-rotate-[7deg]" : "-rotate-[10deg]"}`}
              />
              <img
                src={state.rightImage}
                alt=""
                aria-hidden="true"
                className={`story-mobile-card ${index % 2 === 0 ? "rotate-[8deg]" : "rotate-[11deg]"}`}
              />
            </div>
            <h2 className="story-headline story-headline-mobile">{state.headline}</h2>
            <div className="story-proof story-proof-mobile">
              <p className="story-proof-label">{state.proofLabel}</p>
              <p className="story-proof-body">{state.proofBody}</p>
            </div>
          </article>
        ))}
      </div>

      {!isDesktop ? null : <div className="h-px" aria-hidden="true" />}
    </section>
  );
}
