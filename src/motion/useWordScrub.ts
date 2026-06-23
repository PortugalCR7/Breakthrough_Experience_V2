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
    start = "top 82%",
    end = "top 38%",
    each = 0.045,
    dimOpacity = 0.18,
    dimColor = "#5b5b5b",
    litColor = "#ffffff",
  } = opts;

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(selector, scope.current);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, color: litColor, clearProps: "transition" });
        return;
      }

      gsap.set(words, { opacity: dimOpacity, color: dimColor });
      gsap.to(words, {
        opacity: 1,
        color: litColor,
        ease: "none",
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
