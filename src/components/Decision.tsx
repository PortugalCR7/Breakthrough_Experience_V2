import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";
import { useTheme } from "../theme/useTheme";
import { parseEmphasisLine } from "../utils/emphasis";
import { decisionContent, DecisionContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

/**
 * Section 06 — The Decision (climactic set-piece).
 *
 * V2: the verdict brightens word-by-word as the reader scrolls (scrubbed
 * narration). The section always scrolls naturally — no viewport pin-lock — so
 * the hand-off into Final Word (the only pinned closing sequence) stays smooth.
 * Reduced-motion = instant.
 */
export default function Decision() {
  const content = useSection<DecisionContent>("decision", decisionContent);
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroScope = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      const hero = heroScope.current;
      if (!hero) return;
      const words = gsap.utils.toArray<HTMLElement>(".word-reveal-span", hero);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, "--wp": 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop: non-pinned word-by-word scrub — the section scrolls naturally,
      // with no viewport pin-lock. (Final Word remains the only pinned closing
      // sequence.) Reveal timing is unchanged from the prior non-pinned path.
      mm.add("(min-width: 768px)", () => {
        gsap.set(words, { opacity: 0.1, "--wp": 0 });
        gsap.to(words, {
          opacity: 1,
          "--wp": 1,
          ease: "none",
          duration: 0.4,
          stagger: { each: 0.5 },
          scrollTrigger: { trigger: hero, start: "top 88%", end: "top 26%", scrub: true },
        });
      });

      mm.add("(max-width: 767.98px)", () => {
        gsap.set(words, { opacity: 0.1, "--wp": 0 });
        gsap.to(words, {
          opacity: 1,
          "--wp": 1,
          ease: "none",
          duration: 0.4,
          stagger: { each: 0.5 },
          scrollTrigger: { trigger: hero, start: "top 86%", end: "top 30%", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} id="decision" className="scroll-snap-section">
      <div className="w">
        <div ref={heroScope} className="decision-hero">
          {/* Meta kicker */}
          <div className="section-num">{content.sectionNumber}</div>
          <div className="eyebrow" style={{ marginTop: "8px", marginBottom: "24px" }}>
            {content.eyebrow}
          </div>

          {/* Headline — scrubbed word reveal */}
          <h2 className="decision-hl text-left" style={{ marginBottom: "32px" }}>
            {parseEmphasisLine(content.headline, 0).words.map(({ word, idx, classes }) => (
              <span
                key={idx}
                className={`word-reveal-span mr-[0.25em] ${classes}`.trim()}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Sub-headline */}
          <p className="decision-sub italic">{content.subHeadline}</p>

          {/* Body copy */}
          <div className="decision-b decision-body">
            {content.bodyParagraphs.map((para, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
            ))}
          </div>

          {/* CTA */}
          <div className="decision-cta">
            <a href={content.ctaLink} className="btn-tactile">
              <span className="btn-tactile-wrap">
                <span className="btn-tactile-text">{content.ctaText}</span>
                <span className="btn-tactile-hover">{content.ctaText}</span>
              </span>
              <span className="btn-tactile-arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <div ref={indicatorRef} className="scroll-indicator" style={{ opacity: 0 }}>
        <span className="scroll-indicator-text">Scroll to reveal</span>
        <div className="scroll-indicator-line">
          <div className="scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
}
