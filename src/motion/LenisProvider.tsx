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

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
