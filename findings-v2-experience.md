# V2 Experience Layer — Build Log (Vertical Slice)

**Isolation:** standalone folder `Breakthrough-V2-Experience/` with its own git repo
(baseline commit = exact fork of V1). V1 at `Breakthrough-V2/` is untouched. Each
gets its own GitHub repo + Vercel project (wired after slice approval).

**Engine:** Lenis (smooth scroll) + GSAP/ScrollTrigger (all scroll choreography).
Framer Motion was imported by **0 components**, so retiring it is free. The earlier
in-house scroll-scrub/pins were removed by the previous dev for "jank" — that jank
was per-frame React state on raw scroll listeners; GSAP+Lenis runs choreography on
one rAF off the React render loop, which is the fix.

## Reusable motion system — `src/motion/`
- `gsap.ts` — single plugin registration + `prefersReducedMotion()` + mobile config.
- `LenisProvider.tsx` — one Lenis instance; one rAF (gsap.ticker) drives both Lenis
  and ScrollTrigger.update; native touch; reduced-motion disables smoothing; load/
  delayed `ScrollTrigger.refresh()`.
- `useWordScrub.ts` — the signature scrubbed word-by-word brighten (operates on the
  existing `.word-reveal-span` markup; no DOM/style changes needed at call sites).
- `index.ts` — barrel. Mounted in `main.tsx`.
- `index.css` — appended Lenis contract + no-JS/reduced-motion safety net for words.

## Slice transformed (copy/branding/markup preserved)
- **Hero** — scrubbed scroll-out: bg drifts down, content lifts + dissolves on exit.
- **Vision** — scrubbed word narration (scroll speed = reading pace).
- **AnchorQuote** — gentle environmental depth drift on the supporting quote.
- **CtaText1 (CtaStatement)** — desktop PIN + scroll-lock brighten, then release;
  mobile = plain scrub (no pin); reduced-motion = instant.
- **MeetFrank** — portrait column pins while bio scrolls; scrubbed portrait parallax;
  timeline rows draw in on scroll. Mobile stacks (no pin).

## Verified
- `tsc --noEmit` → exit 0
- `vite build` → 1718 modules, dist OK (401 KB JS / 132 KB gzip)
- dev server boots; root + entry + motion module transform 200

## Not yet done (awaiting approval)
- Remaining ~22 sections (site-wide rollout per the Interaction Architecture Map)
- Remove unused `motion` (Framer) dependency
- GitHub repo + Vercel project for V2
- In-browser QA pass (pin release points, mobile matchMedia, refresh on font load)
