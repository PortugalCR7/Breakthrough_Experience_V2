# Breakthrough V2-Experience — Light Mode Design Spec

**Status:** Approved direction, ready for implementation
**Date:** 2026-06-25
**Target project:** `Breakthrough-V2-Experience` (the canonical master site)
**Goal:** A deliberately *designed* light mode (not a mechanical color inversion), toggleable against the existing dark mode, presentation-ready across the whole site.

---

## 1. Approved design decisions

| Decision | Choice |
|---|---|
| **Palette** | **Gallery White** — cool blue-grey paper + ink-black. Architectural, crisp, tech-premium. |
| **Photo treatment** | **Gallery Print** — dark, rich black-and-white photos kept high-contrast, each with a hairline ink frame + soft shadow (a framed print on a gallery wall). |
| **Accent / emphasis** | **Pure greyscale.** No signal color. Emphasis via ink, weight, and italics — mirroring dark mode (whose accent is just white). CTAs become ink-fill with paper text. |
| **Scope / fidelity** | **Full site, production-quality.** Every section polished and QA'd in light mode. |
| **Toggle UX** | Fixed-corner button (bottom-right), sun/moon, **dark is the default**, choice persisted to `localStorage`, no-flash guard. |

### Core principle
Dark mode is untouched and remains the default. Light mode is a designed counterpart reached by a token swap + a handful of deliberate per-section treatments. **Photographs stay black-and-white in both themes.**

---

## 2. Token mapping

The site already centralizes color in CSS custom properties at `:root` in `src/index.css`. Light mode is a `[data-theme="light"]` override block. Recommended starting values (tune in-thread):

| Token | Dark (current) | Light (Gallery White) | Role |
|---|---|---|---|
| `--c0` | `#000000` | `#EDEFF1` | deepest base / grain bed |
| `--c1` | `#000000` | `#F1F2F4` | **page background (the paper)** |
| `--c2` | `#000000` | `#F7F8F9` | elevated surfaces / cards |
| `--c3` | `#000000` | `#FBFBFC` | highest surfaces |
| `--c4` | `#242424` | `#DEE1E6` | hairline rules / borders |
| `--sv` | `#ffffff` | `#14161A` | ink accent (CTAs, progress bar, `.sv` highlights) |
| `--sd` | `rgba(255,255,255,.55)` | `rgba(20,22,26,.55)` | secondary accent |
| `--sl` | `rgba(255,255,255,.10)` | `rgba(20,22,26,.10)` | accent line |
| `--sl-light` | `rgba(255,255,255,.05)` | `rgba(20,22,26,.05)` | faint accent line |
| `--gl` | `#ffffff` | `#14161A` | **primary text / ink** |
| `--gd` | `rgba(255,255,255,.65)` | `#565B63` | muted body text |
| `--gf` | `rgba(255,255,255,.05)` | `rgba(20,22,26,.05)` | faint fill |
| `--mu` | `#8e8e8e` | `#8A9098` | muted labels |

Add `color-scheme: dark` / `light` to the respective blocks. Note dark currently flattens `--c0..--c3` to pure black (no elevation); the light ramp intentionally introduces gentle elevation for premium depth — validate it doesn't read busy.

---

## 3. The word-reveal animation (critical — this bit us before)

The signature scrubbed word-reveal narration currently **hardcodes `#454545 → #ffffff` as inline GSAP colors** in:
- `src/motion/useWordScrub.ts` (central hook)
- `src/components/Decision.tsx`
- `src/components/CtaStatement.tsx`
- `src/components/FinalWord.tsx`

**Requirement:** make the reveal theme-aware so it ignites to **pure white in dark mode** (no regression) and to **ink (`#14161A`) in light mode**, with a theme-appropriate dim grey resting state.

**Do NOT** "fix" this by animating opacity only — a previous attempt did that and regressed dark mode to a muddy grey because words then inherited their heading color instead of igniting to pure white. The correct approach is to drive the lit/dim colors from theme tokens (e.g. new `--word-dim` / `--word-lit` custom properties) read via `getComputedStyle`, and re-initialize the reveal on theme change. Lit must stay exactly `#ffffff` in dark.

Suggested tokens:
- Dark: `--word-dim: #454545; --word-lit: #ffffff;`
- Light: `--word-dim: #B6BAC0; --word-lit: #14161A;`

---

## 4. Hero opt-out

The Hero is the **only** section with text sitting directly over a photograph (the slideshow). It stays the dark cinematic intro in both themes via a local `data-theme="dark"` on its `<section>`, so its light text remains legible over the imagery. Every other section places images *beside* text and themes normally.

---

## 5. Photo treatment (Gallery Print)

In-content photographs (Meet Frank portrait, profile bands, Outcomes, Final Word portrait, etc.):
- Filter: `grayscale(100%) contrast(1.06) brightness(.96)` in light (vs current `grayscale(100%) brightness(.8) contrast(1.08)` tuned for dark).
- Add a **1px `#14161A` frame** + soft shadow (`0 10px 26px rgba(20,22,26,.20)`).
- Dark mode keeps its current treatment. Drive per-theme via tokens / `[data-theme]` selectors, not hardcoded values.
- Dark scrims/gradients that exist to darken *behind overlay text* (`hero-scrim`, `from-black/90`, `via-neutral-950`, etc.) are only needed where text sits over a photo (Hero, opted out). For in-content framed prints on paper, the frame replaces the scrim — review each gradient stop.

---

## 6. Hardcoded Tailwind greyscale classes

~50 hardcoded `neutral/stone/white/black` utility classes are sprinkled across components (they don't flow through tokens). They need light-mode equivalents under `[data-theme="light"]`. Known set includes: `text-white`, `text-stone-100/200/300/400`, `text-neutral-300/400/600`, `border-neutral-700/800/900`, `border-stone-700`, `border-white/10`, `divide-neutral-900`, `bg-neutral-700/800/900/950`, `bg-neutral-900/40`, `bg-neutral-950/80`, `bg-stone-800`, and gradient stops `from-/to-/via-`. Re-derive the full list with a grep at implementation time. Prefer converting these to token-driven utilities; gradient stops that scrim photos stay dark.

---

## 7. Toggle implementation

- `ThemeToggle.tsx`: fixed bottom-right pill, sun (→light) / moon (→dark) icon, writes `data-theme` on `<html>`, persists to `localStorage` key `bt-theme`, default `dark`.
- No-flash inline script in `index.html` `<head>` sets `data-theme` before first paint.
- Mount once in `App.tsx`.
- Style `.theme-toggle` with tokens so it themes itself.

---

## 8. Also review in light

- `body::after` grain overlay (opacity ~.04) — likely fine; consider ~.03 on paper.
- `tex-glow` radial gradients use `--sv` — as ink they'd darken corners on paper; reduce/retune or disable in light.
- Buttons (`.btn`, `.btn-ghost`, `.btn-tactile`), header bar background, progress bar (`#prog`), custom cursor, spotlight — confirm each themes correctly.
- Forms / Checkout inputs, FAQ accordion, Testimonials cards, Footer.

---

## 9. Non-goals
- Not touching dark mode's appearance (it stays default and unchanged).
- Not colorizing photographs (B&W in both themes).
- Not introducing any accent hue (strict greyscale).
- Not applying any of this to `Breakthrough-V3-Experience`.

---

## 10. Definition of done
- Toggle flips the entire site dark↔light, live, persisted, no flash.
- Dark mode is pixel-unchanged from today (including pure-white word-reveal).
- Every section reads as *designed* (not inverted) in light: Gallery White paper, ink type, framed Gallery-Print photos, ink CTAs.
- `npx tsc --noEmit` clean and `npx vite build` succeeds.
- Visual QA pass on the running dev server, section by section, in both themes.
