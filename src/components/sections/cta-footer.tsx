import { ArrowUpRight } from "lucide-react";

import { HlsVideo } from "@/components/media/hls-video";
import { Button } from "@/components/ui/button";

export function CtaFooterSection() {
  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden px-6 py-24 md:px-16 lg:px-24"
    >
      <HlsVideo
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="hero-fade-top absolute inset-x-0 top-0 -z-10 h-[200px]" />
      <div className="hero-fade-bottom absolute bottom-0 left-0 right-0 -z-10 h-[200px]" />

      <div className="mx-auto max-w-[1100px] text-center">
        <h2 className="font-heading text-5xl italic leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl">
          Your next website starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] font-body text-sm font-light text-white/60">
          Book a free strategy call. See what AI-powered design can do.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="glass-strong" size="lg">
            Book a Call
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button variant="solid" size="lg">
            View Pricing
          </Button>
        </div>

        <footer className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center font-body text-xs text-white/40 md:flex-row">
          <span>© 2026 Studio</span>
          <div className="flex items-center gap-5">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
