/**
 * Central GSAP / ScrollTrigger registration.
 *
 * Imported once at module load. Every motion primitive pulls `gsap` and
 * `ScrollTrigger` from here so plugins are registered exactly one time and
 * global config lives in a single place.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

if (!registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Don't recalculate every pin on iOS URL-bar show/hide — kills the worst
  // mobile jank and matches the reference site's restraint.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
