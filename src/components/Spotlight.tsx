import { useEffect } from "react";

/**
 * Cursor-tracked spotlight.
 *
 * A single, rAF-throttled global pointer listener that writes the cursor's
 * position (as percentages, relative to the nearest `.spot` card) into CSS
 * custom properties `--mx` / `--my`. The actual light is drawn purely in CSS
 * (see the `.spot::before` rule), so this stays off the React render path and
 * costs effectively nothing.
 *
 * 2026-forward "interactive light surface" feel — kept strictly monochrome.
 */
const SPOT_SELECTOR = ".profile, .tcard, .pp-item";

export default function Spotlight() {
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let raf = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      raf = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>(SPOT_SELECTOR);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      pending = {
        el: card,
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (!raf) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
