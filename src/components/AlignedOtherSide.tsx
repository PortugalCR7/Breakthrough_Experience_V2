import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";

const HEADLINE: { word: string; sv?: boolean; br?: boolean }[] = [
  { word: "NOT" }, { word: "PERFECT.", br: true },
  { word: "NOT" }, { word: "FINISHED.", br: true },
  { word: "JUST" }, { word: "ALIGNED.", sv: true },
];

/**
 * Section — The Man on the Other Side.
 *
 * V2: the left statement brightens word-by-word as the reader scrolls (scrubbed
 * narration); the right-hand bullets cascade in on view. No translate-pin.
 */
export default function AlignedOtherSide() {
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

          {/* Left column: scrubbed word statement */}
          <div ref={hlScope}>
            <div className="eyebrow">The Man on the Other Side</div>
            <h2 className="other-hl">
              {HEADLINE.map((w, i) => (
                <span key={i}>
                  <span className={`word-reveal-span ${w.sv ? "sv text-[var(--sv)]" : ""}`}>{w.word}</span>
                  {w.br ? <br /> : " "}
                </span>
              ))}
            </h2>
          </div>

          {/* Right column: staggered bullet reveal */}
          <div ref={rightRef as any}>
            <p
              className={`other-sub block-reveal-item ${isRightVisible ? "active" : ""}`}
              style={{ transitionDelay: "0s" }}
            >
              That is the man this work is designed to develop.
            </p>
            <div className="other-list">
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                <span className="oi-m">—</span>A man who trusts himself.
              </div>
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                <span className="oi-m">—</span>A man whose word carries weight.
              </div>
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.3s" }}
              >
                <span className="oi-m">—</span>A man who stops negotiating with what he knows is true.
              </div>
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.4s" }}
              >
                <span className="oi-m">—</span>
                <span>
                  A man who leads his family, business, and life from{" "}
                  <strong>conviction rather than reaction.</strong>
                </span>
              </div>
            </div>

            <p
              className={`other-coda block-reveal-item ${isRightVisible ? "active" : ""}`}
              style={{ transitionDelay: "0.5s" }}
            >
              This is who you already are. The work is closing the gap.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
