# V2 Experience — Path 2 (Tune) + Path 3 (Settle the Plan)

> **New-thread brief.** This is a cold-start handoff. Read this top to bottom, then read the files it points at before changing anything. Path 1 (site-wide rollout of the motion system) is DONE and committed. This document covers Path 2 (tuning the feel) and Path 3 (settling open plan decisions), driven by the client's in-browser review.

---

## 0. Where things are

- **V2 project (work here):** `/Users/CR7/Desktop/BREAKTHROUGH [06.18.26]/Breakthrough-V2-Experience/`
  - Own git repo. Run: `npm run dev` (currently served at `http://localhost:4123/` via `npx vite --port 4123 --host`).
  - Verify after every change: `npm run lint` (= `tsc --noEmit`, must exit 0) **and** `npm run build` (must be clean).
- **V1 (DO NOT TOUCH):** `../Breakthrough-V2/` — must remain git-clean. It is the untouched production site.
- **This is an experience transformation, not a redesign.** Preserve ALL copy, branding, SEO, funnels, imagery, business logic. Palette is **black/white/greyscale only** (`--sv = #ffffff` is the only accent). Fonts: Bodoni Moda (serif headlines), Jost (buttons), DM Sans (body), IBM Plex Mono (numbers/meta). Do not introduce color, do not rewrite messaging.

## 1. The motion system (read these first)

- `src/motion/LenisProvider.tsx` — Lenis smooth-scroll, wired to GSAP on a single rAF (`gsap.ticker` drives `lenis.raf`; `lenis.on('scroll', ScrollTrigger.update)`; `lagSmoothing(0)`). Reduced-motion disables smoothing. Native touch (no smoothTouch).
- `src/motion/gsap.ts` — registers ScrollTrigger + useGSAP; exports `prefersReducedMotion()`.
- `src/motion/useWordScrub.ts` — **the signature device.** Operates on `.word-reveal-span` elements inside a scope ref. Sets them dim (grey, low opacity) then `gsap.to` bright (white) with a **stagger** and `scrub: true`. Options today: `selector`, `start` (~`top 82%`), `end` (~`top 38%`), `each` (~0.045), `dimOpacity` (~0.18), `dimColor` (~`#5b5b5b`), `litColor` (`#ffffff`). **Read the actual file for current exact values.**
- `src/index.css` — base `.word-reveal-span { color:#555; opacity:0 }`; `.word-reveal-span { -webkit-text-fill-color: currentColor }` (line ~1133); Lenis CSS contract; reduced-motion fallback. Scroll-snap is globally disabled. `--secpad` controls section padding.
- Framer Motion is installed but unused (slated for removal post-approval — NOT yet authorized).

**The client's north star (verbatim taste):** loves the asymmetrical text presentation, the reveal of prominent text the visitor should "key in on," **the greyed-out single-word reveal as you scroll**, and thoughtful multiple font sizes / type hierarchy.

**Client's verdict on Path 1:** "slightly cleaner than V1 yet pretty underwhelmed based on our desires — let's really step it up." Translation: the devices are correct but too timid. Path 2 should make the reveals **more deliberate, more distinct, higher-contrast**, and make the CTA pins feel like genuine **set-pieces** (hold → unlock), not subtle scrubs.

## 2. Where the word-scrub currently lives

Hero, Vision, AnchorQuote, RealEnemy, IdentityGap, AlignedOtherSide, MeetFrank, CtaText1/2/3 (`CtaStatement`), WhatThisActuallyIs (passage), PrimaryPath, Alliance, MenIMeet, FAQ, FinalWord, Decision.
Pins today: CtaText1 (`CtaStatement` word-mode, `pin=true`), MeetFrank (portrait column), Decision (conditional — see §3). CtaText3 has `pin={false}` to avoid back-to-back pinning into Decision.
Intentionally left alone in Path 1: Testimonials (carousel), Checkout (form), Outcomes (cards), AuthorityBar (counters), MidCTA (sheen).

---

## 3. PATH 2 — Tuning feedback from the client's review

### 3a. Word reveal is too fast / sweeps instead of going word-by-word  ← TOP PRIORITY
**Symptom (client):** "Vision is too fast… I want the reveal to be word for word versus a quick sweeping reveal of the whole."
**Cause:** in `useWordScrub`, the per-word tween duration overlaps with the stagger gap, and the scroll range (`start`→`end`) is short — so words bunch into one sweep.
**Target feel:** each word ignites grey→white **individually and sequentially**, slower, more deliberate; the reader's scroll "writes" the sentence one word at a time.
**Levers to turn (in `useWordScrub.ts`, applies everywhere it's used):**
- Reduce per-word reveal overlap: small per-word duration + larger `each` stagger gap so each word finishes before the next begins (more "stepped," less "swept").
- Widen the scroll distance the tween maps to (wider `start`→`end`; e.g. start lower like `top 88%`, end higher like `top 25%`), and/or give the relevant sections more vertical scroll room so there's distance to spread the words across.
- Deepen contrast: lower `dimOpacity` and/or darker `dimColor` so each word's ignition is unmistakable.
- Consider exposing per-section overrides (Vision wants it slowest/most cinematic) — several callers already pass `start`/`end`/`each`.
- **Do NOT pin Vision to achieve this** (see 3b — pins are reserved for CTAs). Get word-by-word from pacing + scroll distance, not a pin.
- Re-check reduced-motion path still resolves words to visible instantly.

### 3b. Pins belong to the CTAs — don't overuse
**Client:** "The CTAs feel like the best place for pins, reveal, unlock. We don't want to overuse."
**Decision:** concentrate the dramatic **pin + scroll-lock + unlock** treatment on the CTA beats — `CtaStatement` (CtaText1/2/3) and `Decision`. Make those genuine set-pieces: the statement holds pinned, resolves word-by-word, then "unlocks" into the CTA. Pull/avoid dramatic pins on non-CTA narrative sections. (MeetFrank's pin is a parallax *lock*, not a set-piece pin — keep it, but see 3c for its fix.) Propose exactly which CTA moments get the full treatment so it stays restrained (likely the primary CtaText1 + Decision; confirm with client). Files: `src/components/CtaStatement.tsx` (already has a `pin?: boolean` prop + matchMedia desktop/mobile/reduced-motion branches) and `src/components/Decision.tsx`.

### 3c. MeetFrank — lock the portrait to the timeline
**Client:** "MeetFrank parallax is fine. Ensure the bottom of the image frame stops | locks at the bottom of the timeline (2026 BREAKTHROUGH)."
**Current:** `src/components/MeetFrank.tsx` pins the photo column with roughly `end: "bottom bottom"`, `pinSpacing: false`, plus a portrait parallax. **Read the file** for the exact pin and the timeline markup (`timelineRef`, `.tl-row`, the final "2026 / BREAKTHROUGH" row).
**Target:** the portrait scrolls/pins such that its **bottom edge comes to rest aligned with the bottom of the timeline's last row (2026 BREAKTHROUGH)** — they finish together, image bottom locked to timeline bottom. Adjust the pin `end` (and/or `endTrigger`) to the timeline's last row rather than the section bottom; verify on desktop. Mobile should stay plain scroll (no pin).

### 3d. Footer cascade renders only "THROUGH" (BREAK invisible)  ← BUG, easy
**Cause (confirmed):** `.foot-logo` paints via `background-clip: text` + `-webkit-text-fill-color: transparent` (`src/index.css` ~line 1110). The per-letter `<span>`s I added in `src/components/Footer.tsx` have no background of their own, so they render transparent; only `.sv` letters ("THROUGH") survive because `.foot-logo .sv` forces `-webkit-text-fill-color: var(--sv)` (~line 1125).
**Fix options (pick one):**
1. Add `.foot-letter { -webkit-text-fill-color: currentColor; }` and give the non-accent letters a solid color (white/`--gl`) — mirrors the existing `.word-reveal-span` fix at line ~1133. Simplest.
2. Or keep the gradient: apply the gradient/clip to each `.foot-letter` individually instead of the parent.
Then re-verify the cascade actually animates (BREAK + THROUGH both visible, staggered) and respects reduced-motion.

### 3e. Overall "step it up"
Make the whole experience more intentional: stronger reveal contrast, more deliberate pacing, CTA pins that genuinely hold-and-unlock, confident parallax depth. The bones are right; raise the amplitude without breaking the black/white restraint or touching copy.

---

## 4. PATH 3 — Open plan decisions to settle (confirm with client)

1. **Pins = CTA-only** (per 3b). Confirm the final list of pinned set-pieces (recommend: CtaText1 + Decision; possibly CtaText2/3 or MidCTA). Decide whether MidCTA joins the CTA pin family.
2. **Decision pin guard.** Today Decision pins only if the set-piece fits the viewport (`section.offsetHeight <= window.innerHeight * 1.02`), else degrades to a plain scrub — so on shorter laptops it won't pin (this likely explains any "Decision didn't pin" observation). Decide: keep the no-clip guard, or force-pin and instead shrink/zoom the content so it always fits.
3. **CtaText3 `pin={false}`.** Keep it un-pinned (avoids back-to-back pin into Decision), or rework.
4. **Sections left untouched** (Testimonials, Checkout, Outcomes, AuthorityBar, MidCTA). Confirm they stay as-is, or assign each a treatment (note: the word-scrub does not belong on a carousel or a form).
5. **MeetFrank** is a lock, not a set-piece pin — confirm that's the intended distinction.

---

## 5. Guardrails

- V1 (`../Breakthrough-V2/`) stays git-clean. Confirm with `git status` there before finishing.
- No copy/brand/SEO/funnel changes. Greyscale only.
- `tsc --noEmit` exit 0 + clean `npm run build` after changes. Smoke the dev server.
- Do NOT deploy/publish, create the separate GitHub/Vercel project, or remove Framer Motion yet — none of that is authorized.
- Commit only when the client asks. Commit message footer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Reference site (Kasia Siwosz) is for **interaction mechanics only** — never copy its layout, type, color, imagery, or copy.

## 6. Suggested order of work

1. `useWordScrub` retune (3a) — biggest perceived win; affects every statement. Tune Vision first, eyeball, then propagate.
2. Footer bug (3d) — quick, visible fix.
3. MeetFrank lock point (3c).
4. CTA pin set-pieces (3b) + settle Path 3 pin decisions (4.1–4.3) with the client.
5. Final pass on "step it up" (3e); verify build + V1 clean.
