import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { realEnemyContent, RealEnemyContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

// Spacing classes for each narrative block wrapper — matches original layout.
// The content type carries only html strings; spacing stays in JSX.
const BLOCK_WRAPPER_CLASSES = ["", "mt-4", "mt-4", "mt-1", "mt-6"];

/**
 * Section 02 — The Real Enemy.
 *
 * V2: the asymmetric headline brightens word-by-word as the reader scrolls
 * (scrubbed narration — the signature beat), while the right-hand narrative
 * blocks cascade in on view. No translate-pin fighting the scroll.
 */
export default function RealEnemy() {
  const content = useSection<RealEnemyContent>("real_enemy", realEnemyContent);
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.2 });
  const [blocksRef, blocksVisible] = useScrollFadeIn({ threshold: 0.25, rootMargin: "0px 0px -10% 0px" });
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  return (
    <section
      id="enemy"
      ref={ref as any}
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      <div className="w">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.5fr_1.5fr] gap-12 md:gap-16 items-start">

          {/* Asymmetric Left metadata panel */}
          <div className="flex flex-col gap-4">
            <div className={`fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="section-num">{content.sectionNumber}</div>
            </div>
          </div>

          {/* Center Column: large asymmetric headline — scrubbed word reveal */}
          <div>
            <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "24px" }}>{content.eyebrow}</div>
            <h2 ref={hlScope} className="enemy-hl text-left" style={{ fontFamily: 'var(--fd)' }}>
              {content.headlineWords.map((w, i) => (
                <span key={i}>
                  <span className={`word-reveal-span ${w.sv ? "sv text-[var(--sv)]" : ""}`}>{w.word}</span>
                  {w.br ? <br /> : " "}
                </span>
              ))}
            </h2>
          </div>

          {/* Right Column: staggered narrative reveal */}
          <div ref={blocksRef as any} className="asymmetric-panel asymmetric-border-accent vis">
            <div className="enemy-b">
              {content.narrativeBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`block-reveal-item ${BLOCK_WRAPPER_CLASSES[index] ?? ""} ${blocksVisible ? "active" : ""}`}
                  style={{ transitionDelay: `${index * 0.12}s` }}
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
