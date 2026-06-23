import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";

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
}: CtaStatementProps) {
  // Retained for the `reveal="line"` branch (used by other CtaText variants).
  const [fadeRef, isVisible] = useScrollFadeIn({ threshold: 0.25, rootMargin: "0px 0px -12% 0px" });
  const sectionRef = useRef<HTMLElement | null>(null);

  // Word indexing for word-reveal mode.
  let gi = 0;
  const indexedLines = lines.map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, idx: gi++ }))
  );

  useGSAP(
    () => {
      if (reveal !== "word") return;
      const root = sectionRef.current;
      if (!root) return;
      const words = gsap.utils.toArray<HTMLElement>(".word-reveal-span", root);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, color: "#ffffff" });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop: PIN + scroll-lock brighten.
      mm.add("(min-width: 768px)", () => {
        gsap.set(words, { opacity: 0.12, color: "#4c4c4c" });
        gsap.to(words, {
          opacity: 1,
          color: "#ffffff",
          ease: "none",
          stagger: { each: 0.05 },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=80%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          },
        });
      });

      // Touch / small screens: plain scrubbed brighten, native scroll, no pin.
      mm.add("(max-width: 767.98px)", () => {
        gsap.set(words, { opacity: 0.18, color: "#5b5b5b" });
        gsap.to(words, {
          opacity: 1,
          color: "#ffffff",
          ease: "none",
          stagger: { each: 0.04 },
          scrollTrigger: { trigger: root, start: "top 80%", end: "top 35%", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reveal] }
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
                  <span key={idx} className="word-reveal-span mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </div>
            ))}
      </div>
    </section>
  );
}
