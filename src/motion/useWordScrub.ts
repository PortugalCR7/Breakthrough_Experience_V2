import { useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";

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
    // so each word lights individually, never a sweep) + deep dim→white contrast
    // so every ignition is unmistakable. Callers override only when a section's
    // layout needs a different range (e.g. FinalWord tracks its prose block).
    start = "top 90%",
    end = "top 24%",
    each = 0.5,
    duration = 0.4,
    // Theme-aware reveal: words rest at their CSS color (var(--gl)) and we only
    // animate OPACITY, so the dim→lit narration reads correctly in both dark and
    // light themes (no hardcoded #fff/#454545 baked inline). dimOpacity is tuned
    // so the resting word reads as a soft grey on either background.
    dimOpacity = 0.22,
  } = opts;

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(selector, scope.current);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, clearProps: "transition" });
        return;
      }

      gsap.set(words, { opacity: dimOpacity });
      gsap.to(words, {
        opacity: 1,
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
    { scope: scope as RefObject<HTMLElement>, dependencies: [] }
  );
}

/** Convenience: create the scope ref + run the scrub in one call. */
export function useWordScrubScope<T extends HTMLElement>(opts?: WordScrubOptions) {
  const ref = useRef<T | null>(null);
  useWordScrub(ref, opts);
  return ref;
}

export { ScrollTrigger };
