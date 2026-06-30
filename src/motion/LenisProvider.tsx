import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Smooth-scroll engine for the whole experience.
 *
 * - One Lenis instance drives one rAF loop (via gsap.ticker), and that same
 *   loop updates ScrollTrigger — so smooth scroll and scroll-driven animation
 *   never run two competing loops (the #1 cause of scroll jank).
 * - Touch is left on native momentum (Lenis default) — matches premium
 *   reference behaviour and keeps phones fast.
 * - `prefers-reduced-motion` fully disables smoothing (native scroll only).
 */
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafCb = useRef<((t: number) => void) | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      // No smooth scroll; ScrollTrigger still works against native scroll,
      // and individual animations resolve to their reduced-motion fallbacks.
      return;
    }

    const instance = new Lenis({
      duration: 1.1,
      // expo-out — long, settled glide identical in spirit to the reference
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // touch: native (default). Do not smooth touch.
    });

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => instance.raf(time * 1000);
    rafCb.current = onTick;
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    // Pinned/scrubbed triggers need correct measurements after fonts + images
    // settle. One delayed refresh covers the common cases cheaply.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      if (rafCb.current) gsap.ticker.remove(rafCb.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  /**
   * Theme-toggle reveal recovery.
   *
   * Scroll-driven reveals split into two families: the word-scrub headlines
   * rebuild their own ScrollTriggers on a theme flip (they bake colour inline),
   * while the pinned narration beats (Vision, Decision, CTA1–3, Final Word)
   * deliberately do NOT rebuild — their colour is token-driven via --wp, and
   * rebuilding them re-inflated pin-spacing on every toggle. The cost of that
   * split: a runtime theme flip leaves every trigger holding the start/end it
   * measured for the *previous* paint, and the many per-section rebuilds fire
   * interleaved, before Lenis + layout settle. The symptom was exactly what a
   * hard reload cured — headlines already scrolled past stayed stuck at their dim
   * initial state, and a pin could mis-engage and trap the viewport (the "black
   * screen"). One authoritative ScrollTrigger.refresh(), run once the toggle's
   * layout has settled, re-measures every trigger against the new paint — the same
   * thing a reload does, minus the reload. refresh() recalculates existing
   * pin-spacers in place, so unlike rebuilding it never re-inflates pin-spacing. */
  useLayoutEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let timer = 0;
    const doRefresh = () => ScrollTrigger.refresh();
    const scheduleRefresh = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer);
      // Double rAF: let React commit the per-section rebuilds (useGSAP runs in a
      // layout effect) and the browser apply the new layout, THEN re-measure.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(doRefresh);
      });
      // Belt-and-suspenders: a slightly later refresh catches any rebuild/colour
      // transition that settles after the next frame (mirrors the load-time
      // delayed refresh above). refresh() is idempotent, so a second call is free.
      timer = window.setTimeout(doRefresh, 260);
    };
    const obs = new MutationObserver(scheduleRefresh);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
