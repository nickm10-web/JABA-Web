/**
 * SVG displacement filter that gives backdrop surfaces a real "liquid glass"
 * refraction (light bending through glass) rather than a flat frosted blur.
 * Render once near the app root, then reference it from CSS with
 * `backdrop-filter: url("#nav-liquid-glass")`.
 */
export function LiquidGlassFilter() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden focusable="false">
      <defs>
        <filter
          id="nav-liquid-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.012"
            numOctaves="2"
            seed="4"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1.5" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
