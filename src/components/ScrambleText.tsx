import { useEffect, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion } from "../motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>{}[]".split("");
const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

interface ScrambleTextProps {
  /** The final, settled text. */
  text: string;
  /** Flip to true to start the decode. Idempotent — only the first true matters. */
  trigger?: boolean;
  /** Total settle time in ms. */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Kinetic text-scramble / decode. On `trigger`, each character position flickers
 * through random glyphs and settles left-to-right to the final text. Self-contained;
 * respects prefers-reduced-motion (renders the final text immediately, no scramble).
 */
export default function ScrambleText({
  text,
  trigger = true,
  duration = 900,
  className,
  style,
}: ScrambleTextProps) {
  const reduced = prefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");
  const startedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setDisplay(text);
      return;
    }

    const chars = text.split("");
    const start = performance.now();
    // Each character locks in once progress passes its slot; later chars settle last.
    const settleAt = chars.map((_, i) => (i / chars.length) * 0.62 + 0.18);

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const out = chars
        .map((c, i) => {
          if (c === " ") return " ";
          if (p >= settleAt[i]) return c;
          return rand();
        })
        .join("");
      setDisplay(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text, duration, reduced]);

  return (
    <span className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{display || " "}</span>
    </span>
  );
}
