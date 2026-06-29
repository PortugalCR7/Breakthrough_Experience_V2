import { type CSSProperties } from "react";
import { prefersReducedMotion } from "../motion";

interface ScrambleTextProps {
  /** The text to reveal. */
  text: string;
  /** Flip to true to play the reveal. */
  trigger?: boolean;
  /** Reveal duration in ms (clamped to the house ≤600ms reading budget). */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Whole-unit masked reveal (externally triggered).
 *
 * Formerly a letter-by-letter glyph decode — removed because letter-level
 * animation delays comprehension and is prohibited by the typography rule
 * (Editorial Interaction Constitution §V). The phrase now rises once, as a
 * single unit, behind a mask — the same grammar as the Hero's `.wi` word
 * reveals — when its `trigger` flips true. Reduced-motion shows it instantly.
 */
export default function ScrambleText({
  text,
  trigger = true,
  duration = 600,
  className,
  style,
}: ScrambleTextProps) {
  const reduced = prefersReducedMotion();
  const revealed = reduced || trigger;
  const ms = Math.min(duration, 600);

  return (
    <span
      className={`relative inline-block overflow-hidden align-bottom ${className ?? ""}`}
      style={style}
    >
      <span
        className="inline-block will-change-transform"
        style={{
          transform: revealed ? "translateY(0)" : "translateY(110%)",
          transition: reduced
            ? "none"
            : `transform ${ms}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {text}
      </span>
    </span>
  );
}
