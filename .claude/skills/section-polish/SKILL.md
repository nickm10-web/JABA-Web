---
name: section-polish
description: Iteratively polish a visual section of the JABA site until it looks intentional. Use when asked to improve, redesign, or fix glitches in a landing-page section (hero, scroll story, roster, etc.).
---

# Section Polish — visual iteration loop for the JABA site

## Context you need every time
- Work in the session worktree (the folder the Claude preview serves), never `/Users/jaba/FRAMER` directly.
- The site is a scroll-driven editorial design: black/white canvases, ONE accent color (volt lime `#dfff00`), liquid-glass surfaces. No emojis, no second accent color. Drama comes from scale, weight, dimming, and motion.
- Two fonts with strict roles: `font-display` (Instrument Serif) is the narrative voice — headlines, payoff lines; `font-sans` (Manrope, extrabold for stats) is the data voice — kickers, numbers, UI. Never set a stat in the serif (italic serif numbers read as decoration, not data) and never add a third font.
- Lime budget: ONE lime element per screen/beat. If a number is lime, the surrounding text is white only.
- Scroll-story sections pin a `sticky` full-screen stage and drive an `active` beat index from IntersectionObserver sentinels (~1 viewport per beat).

## Hard-won rules (violating these caused real bugs)
1. **Never put animated numbers inline in a paragraph.** A count-up changes width every frame and rewraps the whole text block (jitter). Animated numbers get their own block element, `font-variant-numeric: tabular-nums`, and a reserved `min-width` in `ch` sized for the final value.
2. **Reserve final layout up front.** Anything that grows (count-ups, staggered reveals) must not move surrounding content: fixed containers, `min-height`, or absolutely positioned layers.
3. Beats should escalate: quiet → tense → climax. If two beats have the same visual weight, dim or shrink the earlier one.
4. Check class names for collisions before adding CSS — `src/index.css` contains legacy classes from older versions of the site (e.g. `.hero-email-input` already existed).
5. New npm deps: install in BOTH the worktree and `/Users/jaba/FRAMER` if main will be synced later.

## The loop
1. Read the component fully before editing (`src/components/ProblemScrollStory.tsx` etc.).
2. Make the edit.
3. Verify with the preview tools at EVERY beat of the section, not just one:
   - Scroll positions: find sentinels via `document.querySelectorAll('[data-idx]')` and `getBoundingClientRect`, or step ~1 viewport at a time through the section.
   - Screenshot each beat *and* mid-transition; for count-ups screenshot during the animation to catch reflow.
   - Check `preview_console_logs` for errors after HMR.
4. Critique the screenshot like a design director: alignment, orphan words, uneven line heights, weak hierarchy, anything that looks accidental. Fix and repeat until two consecutive passes produce no critique.
5. Commit on the worktree branch when the user approves.
