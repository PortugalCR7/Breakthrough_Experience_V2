import { useRef } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";

const HEADLINE: { word: string; sv?: boolean }[] = [
  { word: "THE" }, { word: "MAN" }, { word: "YOU" }, { word: "WANT" }, { word: "TO" },
  { word: "BECOME" }, { word: "IS" }, { word: "NOT" }, { word: "WAITING" },
  { word: "IN" }, { word: "THE" }, { word: "FUTURE.", sv: true },
];

/**
 * Section 06 — The Decision (climactic set-piece).
 *
 * V2: the verdict brightens word-by-word as the reader scrolls (scrubbed
 * narration). On desktop it becomes a held PIN + scroll-lock — but only when the
 * set-piece comfortably fits the viewport, so it can never clip on shorter
 * laptops; otherwise it degrades to a plain scrub. Reduced-motion = instant.
 */
export default function Decision() {
  const magneticRef = useMagnetic({ strength: 0.35 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroScope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const hero = heroScope.current;
      if (!hero) return;
      const words = gsap.utils.toArray<HTMLElement>(".word-reveal-span", hero);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, color: "#ffffff" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(words, { opacity: 0.1, color: "#454545" });
        const fits = !!section && section.offsetHeight <= window.innerHeight * 1.02;
        gsap.to(words, {
          opacity: 1,
          color: "#ffffff",
          ease: "none",
          duration: 0.4,
          stagger: { each: 0.5 },
          scrollTrigger: fits
            ? { trigger: section, start: "top top", end: "+=85%", pin: true, pinSpacing: true, scrub: true, anticipatePin: 1 }
            : { trigger: hero, start: "top 88%", end: "top 26%", scrub: true },
        });
      });

      mm.add("(max-width: 767.98px)", () => {
        gsap.set(words, { opacity: 0.1, color: "#454545" });
        gsap.to(words, {
          opacity: 1,
          color: "#ffffff",
          ease: "none",
          duration: 0.4,
          stagger: { each: 0.5 },
          scrollTrigger: { trigger: hero, start: "top 86%", end: "top 30%", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="decision" className="scroll-snap-section">
      <div className="w">
        <div ref={heroScope} className="decision-hero">
          {/* Meta kicker */}
          <div className="section-num">06</div>
          <div className="eyebrow" style={{ marginTop: "8px", marginBottom: "24px" }}>
            The Decision
          </div>

          {/* Headline — scrubbed word reveal */}
          <h2 className="decision-hl text-left" style={{ marginBottom: "32px" }}>
            {HEADLINE.map((w, i) => (
              <span
                key={i}
                className={`word-reveal-span mr-[0.25em] ${w.sv ? "sv text-[var(--sv)]" : ""}`}
              >
                {w.word}
              </span>
            ))}
          </h2>

          {/* Sub-headline */}
          <p className="decision-sub">He is waiting on the other side of your decision.</p>

          {/* Body copy */}
          <div className="decision-b decision-body">
            <p>
              Five years from now, you'll either be living closer to the man you
              know you can be, or explaining why you never became him.
            </p>
            <p className="mt-4">
              The question isn't whether you're ready. The question is how much
              longer you're willing to tolerate what you know isn't true.
            </p>
          </div>

          {/* CTA */}
          <div className="decision-cta">
            <a ref={magneticRef as any} href="#checkout" className="btn-tactile">
              <span className="btn-tactile-wrap">
                <span className="btn-tactile-text">Begin Your Breakthrough</span>
                <span className="btn-tactile-hover">Begin Your Breakthrough</span>
              </span>
              <span className="btn-tactile-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
