/**
 * Motion system barrel.
 *
 * Reusable scroll-experience layer for Breakthrough V2. Built on Lenis (smooth
 * scroll) + GSAP/ScrollTrigger (all scroll-driven choreography). Designed to
 * scale to additional pages: import primitives, don't hand-roll ScrollTriggers.
 */
export { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";
export { LenisProvider, useLenis } from "./LenisProvider";
export { useWordScrub, useWordScrubScope } from "./useWordScrub";
