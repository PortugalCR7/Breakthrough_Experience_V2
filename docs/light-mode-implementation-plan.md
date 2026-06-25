# Light Mode — Implementation Plan

Derived from `docs/light-mode-spec.md` (approved). Dark mode stays pixel-unchanged
and remains the default. All light work lives under `[data-theme="light"]`.

## Strategy
Dark is the baseline. We never edit dark values; we add a `[data-theme="light"]`
token override + a block of deliberate per-section light overrides. Because every
override is prefixed with `[data-theme="light"]` (and the default attribute is
`dark`), dark mode is provably untouched.

## 1. Theme infrastructure
- **index.html** — inline no-flash script in `<head>`: read `localStorage('bt-theme')`
  (default `dark`), set `data-theme` on `<html>` before first paint.
- **src/theme/useTheme.ts** — `current()` reads the html attribute (single source of
  truth); `applyTheme()` writes attribute + localStorage; `useTheme()` returns
  `{ theme, setTheme, toggle }` and tracks the attribute via MutationObserver so any
  consumer re-renders on theme change.
- **src/components/ThemeToggle.tsx** — fixed bottom-right pill, sun(→light)/moon(→dark),
  token-styled `.theme-toggle`. Mounted once in `App.tsx`.

## 2. Tokens (index.css)
- Add to `:root`: `--word-dim:#454545; --word-lit:#ffffff;` (no visual change in dark).
- New `[data-theme="light"]` block: full Gallery-White ramp from the spec table +
  `--word-dim:#B6BAC0; --word-lit:#14161A;` + `color-scheme: light`.

## 3. Word-reveal (critical — token-driven, NOT opacity-only)
- `motion/useWordScrub.ts` — export `readWordColors(scope)` that reads `--word-dim`/
  `--word-lit` via `getComputedStyle`. Hook reads them at run time and adds the theme
  value as a `useGSAP` dependency so it re-initialises on toggle. Covers Vision +
  MeetFrank (both use this hook).
- `Decision.tsx`, `CtaStatement.tsx`, `FinalWord.tsx` — replace inline `#454545`/
  `#ffffff` with `readWordColors()`; add theme to `useGSAP` deps. Dark resolves to the
  exact same hex (no regression); light ignites to ink.

## 4. Light overrides block (appended to index.css)
- **Headlines**: clip-text gradient (`.anchor-body … .foot-logo`) → ink gradient;
  `.sv` → ink fill, drop white glow; `.section-num` → ink gradient; `.fw-txt`/
  word-reveal active glows → ink-tint.
- **Hardcoded utilities** (≈50): map each found `text-/bg-/border-/divide-/from-/via-/to-`
  greyscale class to a token under `[data-theme="light"]`.
- **Photos (Gallery Print)**: `.frank-portrait`, `.vision-cell`, `.fw-portrait img`,
  `.p-band img` → `grayscale(100%) contrast(1.06) brightness(.96)`; 1px ink frame +
  soft shadow on framed prints.
- **Chrome**: `#bar`, `::selection`, focus rings, custom-cursor glow, spotlight/
  interactive-card glows, `tex-glow` (disable on paper), grain opacity.
- **CtaStatement**: add `.cta-beat` class to the section so its `bg-neutral-950` becomes
  paper in light without touching dark.

## 5. Hero opt-out
Hero already sits over photos. Add `data-theme="dark"` to its `<section>` so it stays
the dark cinematic intro in both themes; `[data-theme="light"]` overrides won't match
inside it.

## 6. Verify
`npx tsc --noEmit` clean, `npx vite build` succeeds, then dev-server QA every section
in both themes (esp. word-reveal igniting to pure white in dark / ink in light).
