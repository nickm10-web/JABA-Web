import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "motion/react";

import { BlurText } from "@/components/ui/blur-text";
import { Button } from "@/components/ui/button";

const partnerNames = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-visible bg-black"
      style={{ height: "1000px" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute left-1/2 top-[20%] z-0 h-auto w-full max-w-[1480px] -translate-x-1/2 object-contain"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 z-0 bg-black/5" />
      <div className="hero-fade-bottom absolute bottom-0 left-0 right-0 z-[1] h-[300px]" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col px-6 pt-[150px]">
        <div className="mx-auto flex max-w-[980px] flex-1 flex-col items-center text-center">
          <div className="liquid-glass inline-flex items-center gap-3 rounded-full px-3 py-2">
            <span className="rounded-full bg-white px-3 py-1 font-body text-xs font-medium text-black">
              New
            </span>
            <span className="font-body text-xs font-medium text-white/80">
              Introducing AI-powered web design.
            </span>
          </div>

          <BlurText
            as="h1"
            text="The Website Your Brand Deserves"
            delayStep={0.1}
            className="mt-8 max-w-[900px] font-heading text-6xl italic leading-[0.8] tracking-[-4px] text-foreground md:text-7xl lg:text-[5.5rem]"
          />

          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
            className="mt-8 max-w-[720px] font-body text-sm font-light text-white/60"
          >
            Stunning design. Blazing performance. Built by AI, refined by
            experts. This is web design, wildly reimagined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button variant="glass-strong" size="lg">
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <button className="inline-flex items-center gap-2 rounded-full px-3 py-3 font-body text-sm font-medium text-white/78 transition hover:text-white">
              Watch the Film
              <Play className="h-4 w-4 fill-current" />
            </button>
          </motion.div>
          <div className="mt-auto flex w-full flex-col items-center pb-8 pt-16">
            <div className="section-badge">Trusted by the teams behind</div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-12">
              {partnerNames.map((partner) => (
                <span
                  key={partner}
                  className="font-heading text-2xl italic text-white md:text-3xl"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
