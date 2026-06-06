import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Zap } from "lucide-react";

import { VoltButton } from "@/components/ui/volt-button";

const SWAP_THRESHOLD = 0.001;
const SCRUB_END = 0.92;
const EXIT_BG_COLOR = "#eeeeee";

// NOTE: MP4 scrubbing smoothness depends on keyframe density. If the scrub
// feels chunky, re-encode the video so every frame is a keyframe:
//   ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 22 -g 1 -keyint_min 1 \
//          -movflags +faststart -an output.mp4
//
// NOTE: Both the idle and scrub videos are decoded simultaneously so the
// scrub-handoff is instant. This is fine on desktop but can be heavy on
// low-end mobile. If it shows up as a perf issue, pause the idle video via
// the scrub's onCanPlay once scrub becomes visible (and resume on the
// reverse handoff).

interface ScrollVideoHeroProps {
  scrollLength?: number;
  idleVideoSrc?: string;
  scrubVideoSrc?: string;
}

const VIDEO_SEEK_DEADZONE_SECONDS = 0.03;

export default function ScrollVideoHero({
  scrollLength = 3,
  idleVideoSrc = "/videos/Video%20BG%20Web_02-3.mp4",
  scrubVideoSrc = "/videos/Video%20BG%20Web_02.mp4",
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const idleVideoRef = useRef<HTMLVideoElement | null>(null);
  const scrubVideoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const bottomGradientRef = useRef<HTMLDivElement | null>(null);
  const lastSeekRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Driven imperatively in useMotionValueEvent below.
  // (motion/react v12 routes `style={{ opacity: motionValue }}` through WAAPI
  // ScrollTimeline, which tracks document scroll progress — not the section
  // progress returned by useScroll's target+offset — so the WAAPI path can't
  // honor our keyframes here. Writing inline styles by hand bypasses that.)
  const interpolate = (
    progress: number,
    input: readonly number[],
    output: readonly number[],
  ) => {
    if (progress <= input[0]) return output[0];
    if (progress >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      const a = input[i];
      const b = input[i + 1];
      if (progress >= a && progress <= b) {
        const t = (progress - a) / (b - a);
        return output[i] + t * (output[i + 1] - output[i]);
      }
    }
    return output[output.length - 1];
  };

  useEffect(() => {
    const video = scrubVideoRef.current;
    if (!video) return;

    video.pause();

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const idle = idleVideoRef.current;
    const scrub = scrubVideoRef.current;
    const overlay = overlayRef.current;
    const gradient = gradientRef.current;
    const hint = hintRef.current;
    const stage = stageRef.current;
    const bottomGradient = bottomGradientRef.current;

    if (idle && scrub) {
      const showScrub = progress >= SWAP_THRESHOLD;
      idle.style.opacity = showScrub ? "0" : "1";
      scrub.style.opacity = showScrub ? "1" : "0";
    }

    const headlineOpacity = interpolate(progress, [0, 0.65, 0.85], [1, 1, 0]);

    if (overlay) {
      const y = interpolate(progress, [0, 0.85], [0, -40]);
      overlay.style.opacity = String(headlineOpacity);
      overlay.style.transform = `translateY(${y}px)`;
    }

    if (gradient) {
      gradient.style.opacity = String(headlineOpacity);
    }

    if (hint) {
      const opacity = interpolate(progress, [0, 0.08], [1, 0]);
      hint.style.opacity = String(opacity);
    }

    if (stage) {
      stage.style.opacity = String(interpolate(progress, [0.92, 1], [1, 0]));
    }

    if (bottomGradient) {
      bottomGradient.style.opacity = String(
        interpolate(progress, [0.85, 1], [0, 1]),
      );
    }

    if (scrub) {
      const duration = scrub.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const scrubProgress = Math.min(1, Math.max(0, progress) / SCRUB_END);
        const target = scrubProgress * duration;
        if (
          Math.abs(target - lastSeekRef.current) >= VIDEO_SEEK_DEADZONE_SECONDS
        ) {
          lastSeekRef.current = target;
          scrub.currentTime = target;
        }
      }
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#eeeeee]"
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div
        ref={stageRef}
        style={{ opacity: 1 }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <video
          ref={idleVideoRef}
          src={idleVideoSrc}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          style={{ opacity: 1 }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <video
          ref={scrubVideoRef}
          src={scrubVideoSrc}
          muted
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          ref={bottomGradientRef}
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            opacity: 0,
            background: `linear-gradient(to bottom, transparent 60%, ${EXIT_BG_COLOR} 100%)`,
          }}
          aria-hidden
        />

        <div
          ref={gradientRef}
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            opacity: 1,
            background:
              "radial-gradient(ellipse 80% 70% at 20% 30%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 75%)",
          }}
          aria-hidden
        />

        <div
          ref={overlayRef}
          style={{ opacity: 1, transform: "translateY(0px)" }}
          className="relative z-10 flex h-full w-full flex-col items-start justify-start pl-12 pr-6 pt-32 text-left md:pl-20 md:pt-40 lg:pl-24"
        >
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl leading-[0.92] tracking-[-0.04em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-7xl lg:text-8xl">
              <span className="block">
                Athletes aren't <span className="italic">hard</span>
              </span>
              <span className="block">to work with.</span>
              <span className="block">Your systems are.</span>
            </h1>
          </div>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] [text-wrap:balance] md:text-lg">
            JABA is AI that manages deliverables, deadlines, and follow-ups
            across every athlete partnership, so you never have to chase
            again.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <VoltButton icon={<Zap className="h-4 w-4" />}>
              See JABA in action
            </VoltButton>
          </div>
        </div>

        <div
          ref={hintRef}
          style={{ opacity: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/70"
        >
          <span>Scroll to explore the JABA world</span>
          <span className="h-6 w-px bg-white/60" aria-hidden />
        </div>
      </div>
    </section>
  );
}
