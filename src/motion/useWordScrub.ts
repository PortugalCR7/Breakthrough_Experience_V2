import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";
import { useTheme } from "../theme/useTheme";

/**
 * Resolve the theme-aware word-reveal colours from CSS custom properties.
 *
 * The signature reveal must ignite to **pure white in dark** (no regression) and
 * to **ink in light** — driven by tokens, never an opacity-only fade (that bug
 * regressed dark to grey because words then inherited their heading colour).
 * Read from the scope element so a locally-themed subtree (e.g. an opted-out
 * section) resolves correctly.
 */
export function readWordColors(scope?: Element | null): {
  dim: string;
  lit: string;
} {
  const el = scope ?? (typeof document !== "undefined" ? document.documentElement : null);
  if (!el) return { dim: "#454545", lit: "#ffffff" };
  const cs = getComputedStyle(el);
  const dim = cs.getPropertyValue("--word-dim").trim() || "#454545";
  const lit = cs.getPropertyValue("--word-lit").trim() || "#ffffff";
  return { dim, lit };
}

interface WordScrubOptions {
  /** Selector for the word spans inside the scope. */
  selector?: string;
  /** ScrollTrigger start (default: reading begins as the block enters). */
  start?: string;
  /** ScrollTrigger end (default: fully bright before it leaves centre). */
  end?: string;
  /** Per-word stagger in seconds (spread across the scrub range). */
  each?: number;
  /**
   * Per-word brighten duration (normalised within the scrub timeline).
   * Keep it **≲ `each`** for a stepped, genuinely word-by-word ignition;
   * raise it well above `each` and the words bleed together into a sweep.
   * Defaults to GSAP's 0.5 so existing callers are unaffected.
   */
  duration?: number;
  /** Resting opacity of un-read words. */
  dimOpacity?: number;
  /** Resting colour of un-read words. */
  dimColor?: string;
  /** Fully-read colour. */
  litColor?: string;
}

/**
 * The signature "narration" grammar: words brighten one-by-one **as the reader
 * scrolls**, so scroll speed === reading pace. Re-creates the reference site's
 * scrubbed word reveal, but driven by GSAP off a single rAF (not per-frame
 * React state) — which is exactly why the previous in-house attempt read as
 * "choppy" and this does not.
 *
 * Operates on the component's existing `.word-reveal-span` markup, so no DOM or
 * styling changes are required at the call site.
 */
export function useWordScrub(
  scope: RefObject<HTMLElement | null>,
  opts: WordScrubOptions = {}
) {
  const {
    selector = ".word-reveal-span",
    // Unified "narration" feel, signed off on Vision and propagated site-wide:
    // a wide scroll range (deliberate, slow) + stepped ignition (duration ≲ each
    // so each word lights individually, never a sweep) + deep dim→lit contrast
    // so every ignition is unmistakable. Callers override only when a section's
    // layout needs a different range (e.g. FinalWord tracks its prose block).
    start = "top 90%",
    end = "top 24%",
    each = 0.5,
    duration = 0.4,
    dimOpacity = 0.1,
    // Resting/lit colours default to the theme tokens (resolved at run time below)
    // unless a caller pins them explicitly.
    dimColor,
    litColor,
  } = opts;

  // Re-initialise whenever the theme flips so the reveal re-reads its tokens.
  const { theme } = useTheme();

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(selector, scope.current);
      if (!words.length) return;

      const { dim, lit } = readWordColors(scope.current);
      const dimC = dimColor ?? dim;
      const litC = litColor ?? lit;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, color: litC, clearProps: "transition" });
        return;
      }

      gsap.set(words, { opacity: dimOpacity, color: dimC });
      gsap.to(words, {
        opacity: 1,
        color: litC,
        ease: "none",
        duration,
        stagger: { each },
        scrollTrigger: {
          trigger: scope.current,
          start,
          end,
          scrub: true,
        },
      });
    },
    { scope: scope as RefObject<HTMLElement>, dependencies: [theme] }
  );
}

/** Convenience: create the scope ref + run the scrub in one call. */
export function useWordScrubScope<T extends HTMLElement>(opts?: WordScrubOptions) {
  const ref = useRef<T | null>(null);
  useWordScrub(ref, opts);
  return ref;
}

export { ScrollTrigger };
