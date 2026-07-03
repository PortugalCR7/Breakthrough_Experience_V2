import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { alignedOtherSideContent, AlignedOtherSideContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

/**
 * Section — The Man on the Other Side.
 *
 * V2: the left statement brightens word-by-word as the reader scrolls (scrubbed
 * narration); the right-hand bullets cascade in on view. No translate-pin.
 */
export default function AlignedOtherSide() {
  const content = useSection<AlignedOtherSideContent>("aligned_other_side", alignedOtherSideContent);
  const hlScope = useRef<HTMLDivElement | null>(null);
  useWordScrub(hlScope);
  const [rightRef, isRightVisible] = useScrollFadeIn({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  return (
    <section
      id="other"
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      <div className="w">
        <div className="other-g">
          {/* Editorial Vertical Divider */}

          {/* Left column: scrubbed word statement */}
          <div ref={hlScope}>
            <div className="eyebrow">{content.eyebrow}</div>
            <h2 className="other-hl">
              {content.headlineWords.map((w, i) => (
                <span key={i}>
                  <span className={`word-reveal-span ${w.sv ? "sv text-[var(--sv)]" : ""}`}>{w.word}</span>
                  {w.br ? <br /> : " "}
                </span>
              ))}
            </h2>
          </div>

          {/* Right column: staggered bullet reveal */}
          <div ref={rightRef as any} className="asymmetric-panel asymmetric-border-accent vis">
            <p
              className={`other-sub block-reveal-item ${isRightVisible ? "active" : ""}`}
              style={{ transitionDelay: "0s" }}
            >
              {content.subtitle}
            </p>
            <div className="other-list" style={{ marginTop: '-12px', marginBottom: '14px' }}>
              {content.bulletItems.map((item, i) => (
                <div
                  key={i}
                  className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                  style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
                >
                  <span className="oi-m">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p
              className={`other-coda block-reveal-item font-bold ${isRightVisible ? "active" : ""}`}
              style={{ transitionDelay: "0.5s" }}
            >
              {content.coda.split('\n').map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
