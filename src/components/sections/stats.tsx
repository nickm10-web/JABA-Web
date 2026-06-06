import { HlsVideo } from "@/components/media/hls-video";

const stats = [
  { value: "200+", label: "Sites launched" },
  { value: "98%", label: "Client satisfaction" },
  { value: "3.2x", label: "More conversions" },
  { value: "5 days", label: "Average delivery" },
];

export function StatsSection() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 md:px-16 lg:px-24">
      <HlsVideo
        src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        desaturate
      />
      <div className="hero-fade-top absolute inset-x-0 top-0 -z-10 h-[200px]" />
      <div className="hero-fade-bottom absolute bottom-0 left-0 right-0 -z-10 h-[200px]" />

      <div className="mx-auto max-w-[1240px]">
        <div className="liquid-glass rounded-[32px] p-12 md:p-16">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-4xl italic text-white md:text-5xl lg:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-3 font-body text-sm font-light text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
