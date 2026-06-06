import { ArrowUpRight } from "lucide-react";

import { HlsVideo } from "@/components/media/hls-video";
import { Button } from "@/components/ui/button";

export function HowItWorksSection() {
  return (
    <section
      id="services"
      className="relative isolate min-h-[700px] overflow-hidden px-6 py-32 md:px-16 lg:px-24"
    >
      <HlsVideo
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="hero-fade-top absolute inset-x-0 top-0 -z-10 h-[200px]" />
      <div className="hero-fade-bottom absolute bottom-0 left-0 right-0 -z-10 h-[200px]" />

      <div className="mx-auto flex min-h-[500px] max-w-[920px] flex-col items-center justify-center text-center">
        <div className="section-badge">How It Works</div>
        <h2 className="section-heading mt-6">You dream it. We ship it.</h2>
        <p className="section-body mt-6 max-w-[700px]">
          Share your vision. Our AI handles the rest: wireframes, design, code,
          launch. All in days, not quarters.
        </p>
        <Button variant="glass-strong" size="lg" className="mt-10">
          Get Started
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
