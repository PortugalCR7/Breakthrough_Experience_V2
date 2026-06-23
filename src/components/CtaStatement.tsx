import { useScrollFadeIn } from "../hooks/useScrollFadeIn";

interface CtaStatementProps {
  /** Logical lines of the statement. Rendered uppercase regardless of input casing. */
  lines: string[];
  containerId?: string;
  /** "word" reveals one word at a time (default); "line" reveals whole lines. */
  reveal?: "word" | "line";
  /** Optional font-size override (any CSS length). Defaults to the shared Hero-capped clamp. */
  size?: string;
}

/**
 * Unified CTA statement block.
 *
 * Shared treatment: ALL CAPS, light weight, non-italic, uniform white, on the
 * same 1100px / fluid-gutter geometry as the page's narrative sections (.w).
 *
 * Reworked from a scroll-locked pin (which scrubbed against the scroll and read
 * as choppy) into a full-height cinematic beat that reveals — word-by-word or
 * line-by-line — in a smooth staggered cascade the moment it enters view. The
 * drama of the full-screen moment is preserved; the jank is gone.
 */
export default function CtaStatement({
  lines,
  containerId = "",
  reveal = "word",
  size,
}: CtaStatementProps) {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.25, rootMargin: "0px 0px -12% 0px" });

  // Precompute word indexing (used by word-reveal mode).
  let gi = 0;
  const indexedLines = lines.map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, idx: gi++ }))
  );

  return (
    <section
      id={containerId || undefined}
      ref={ref as any}
      className="scroll-snap-section relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 px-[clamp(20px,4.5vw,56px)] py-[clamp(80px,14vh,160px)]"
    >
      <div
        className="cta-statement w-full max-w-[1100px] mx-auto text-left"
        style={size ? { fontSize: size } : undefined}
      >
        {reveal === "line"
          ? lines.map((line, lineIdx) => (
              <div
                key={lineIdx}
                className="cta-ln"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity .7s ease-out, transform .7s cubic-bezier(.16,1,.3,1)",
                  transitionDelay: `${lineIdx * 0.12}s`,
                  willChange: "opacity, transform",
                }}
              >
                {line}
              </div>
            ))
          : indexedLines.map((lineWords, lineIdx) => (
              <div key={lineIdx} className="cta-ln">
                {lineWords.map(({ word, idx }) => (
                  <span
                    key={idx}
                    className={`word-reveal-span mr-[0.25em] ${isVisible ? "active" : ""}`}
                    style={{
                      transitionDelay: `${idx * 0.05}s`,
                      transitionProperty: "color, opacity",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
      </div>
    </section>
  );
}
