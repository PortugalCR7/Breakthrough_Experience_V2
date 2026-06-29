import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";
import { useTheme } from "../theme/useTheme";
import { parseEmphasisLine } from "../utils/emphasis";

interface CtaLine {
  text: string;
  className?: string;
}

interface CtaStatementProps {
  /** Logical lines of the statement. Rendered uppercase regardless of input casing. */
  lines: (string | CtaLine)[];
  containerId?: string;
  /** "word" reveals one word at a time (default); "line" reveals whole lines. */
  reveal?: "word" | "line";
  /** Optional font-size override (any CSS length). Defaults to the shared Hero-capped clamp. */
  size?: string;
  /** Desktop word-mode only: pin + scroll-lock the beat (default true). Set false
   *  to keep the grey word-scrub but let the section scroll normally — used when a
   *  bigger pin (e.g. Decision) follows immediately and back-to-back pins would drag. */
  pin?: boolean;
  /** Looser vertical rhythm between lines/sentences (used by the multi-sentence
   *  CtaText2 so its bigger type can breathe). */
  spacious?: boolean;
}

/**
 * Unified CTA statement block — a full-viewport cinematic beat between chapters.
 *
 * V2 (word mode): on desktop the section PINS and the words brighten as the
 * reader scrolls, then releases — a held "scroll-lock" moment where scroll
 * advances the line. On touch it degrades to a plain scrubbed brighten (no pin,
 * native momentum). Reduced-motion shows the finished statement instantly.
 *
 * The pin/scrub runs through GSAP + Lenis off a single rAF — the previous
 * in-house sticky-scrub read as "choppy" precisely because it didn't.
 */
export default function CtaStatement({
  lines,
  containerId = "",
  reveal = "word",
  size,
  pin = true,
  spacious = false,
}: CtaStatementProps) {
  // Retained for the `reveal="line"` branch (used by other CtaText variants).
  const [fadeRef, isVisible] = useScrollFadeIn({ threshold: 0.25, rootMargin: "0px 0px -12% 0px" });
  const sectionRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  // Word indexing for word-reveal mode with emphasis parsing.
  let runningIdx = 0;
  const parsedLines = lines.map((line) => {
    const text = typeof line === "string" ? line : line.text;
    const { words, nextIdx } = parseEmphasisLine(text, runningIdx);
    runningIdx = nextIdx;
    return words;
  });

  useGSAP(
    () => {
      if (reveal !== "word") return;
      const root = sectionRef.current;
      if (!root) return;
      const words = gsap.utils.toArray<HTMLElement>(".word-reveal-span", root);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, "--wp": 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop: PIN + scroll-lock brighten (or plain scrub when pin === false).
      mm.add("(min-width: 768px)", () => {
        gsap.set(words, { opacity: 0.1, "--wp": 0 });
        gsap.to(words, {
          opacity: 1,
          "--wp": 1,
          ease: "none",
          duration: 0.4,
          stagger: { each: 0.5 },
          scrollTrigger: pin
            ? { trigger: root, start: "top top", end: "+=90%", pin: true, pinSpacing: true, scrub: true, anticipatePin: 1 }
            : { trigger: root, start: "top 88%", end: "top 26%", scrub: true },
        });

        if (indicatorRef.current && pin) {
          gsap.set(indicatorRef.current, { opacity: 1 });
          gsap.to(indicatorRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=20%",
              scrub: true,
            },
          });
        }
      });

      // Touch / small screens: plain scrubbed brighten, native scroll, no pin.
      mm.add("(max-width: 767.98px)", () => {
        gsap.set(words, { opacity: 0.1, "--wp": 0 });
        gsap.to(words, {
          opacity: 1,
          "--wp": 1,
          ease: "none",
          duration: 0.4,
          stagger: { each: 0.5 },
          scrollTrigger: { trigger: root, start: "top 86%", end: "top 30%", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reveal, pin] }
  );

  // Merge the fade-in ref (line mode) onto the same section node we pin.
  const setSection = (node: HTMLElement | null) => {
    sectionRef.current = node;
    (fadeRef as any).current = node;
  };

  return (
    <section
      id={containerId || undefined}
      ref={setSection}
      className="cta-beat scroll-snap-section relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 px-[clamp(20px,4.5vw,56px)] py-[clamp(80px,14vh,160px)]"
    >
      <div
        className={`cta-statement w-full max-w-[1100px] mx-auto text-left${spacious ? " cta-statement--spacious" : ""}`}
        style={size ? { fontSize: size } : undefined}
      >
        {reveal === "line"
          ? lines.map((line, lineIdx) => {
              const text = typeof line === "string" ? line : line.text;
              const lineClass = typeof line === "string" ? "" : line.className || "";
              const { words } = parseEmphasisLine(text, 0);
              return (
                <div
                  key={lineIdx}
                  className={`cta-ln ${lineClass}`.trim()}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity .8s ease-out, transform .8s cubic-bezier(.16,1,.3,1)",
                    transitionDelay: `${lineIdx * 0.12}s`,
                    willChange: "opacity, transform",
                  }}
                >
                  {words.map(({ word, idx, classes }) => (
                    <span key={idx} className={`${classes} mr-[0.25em]`.trim() || undefined}>
                      {word}
                    </span>
                  ))}
                </div>
              );
            })
          : parsedLines.map((lineWords, lineIdx) => {
              const line = lines[lineIdx];
              const lineClass = typeof line === "string" ? "" : line.className || "";
              return (
                <div key={lineIdx} className={`cta-ln ${lineClass}`.trim()}>
                  {lineWords.map(({ word, idx, classes }) => (
                    <span key={idx} className={`word-reveal-span mr-[0.25em] ${classes}`.trim()}>
                      {word}
                    </span>
                  ))}
                </div>
              );
            })}
      </div>

      {reveal === "word" && pin && (
        <div ref={indicatorRef} className="scroll-indicator" style={{ opacity: 0 }}>
          <span className="scroll-indicator-text">Scroll to reveal</span>
          <div className="scroll-indicator-line">
            <div className="scroll-indicator-dot" />
          </div>
        </div>
      )}
    </section>
  );
}
