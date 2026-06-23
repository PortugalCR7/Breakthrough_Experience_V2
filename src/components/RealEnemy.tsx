import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";

const NARRATIVE_BLOCKS = [
  { id: "b1", className: "", node: <p><strong>They're performing it.</strong></p> },
  { id: "b2", className: "mt-4", node: <p className="text-[var(--sv)]">Performing success. Performing confidence. Performing strength.</p> },
  { id: "b3", className: "mt-4", node: <p>Eventually the performance becomes so convincing that <span className="text-white">even you forget who you are</span></p> },
  { id: "b4", className: "mt-1", node: <p><strong>underneath it.</strong></p> },
  { id: "b5", className: "mt-6 border-l border-[var(--sv)] pl-4 text-white italic", node: <p>Breakthrough begins when the performance ends.</p> },
];

/** The big statement, split into scroll-scrub words (line breaks preserved). */
const HEADLINE: { word: string; sv?: boolean; br?: boolean }[] = [
  { word: "MOST" }, { word: "MEN", br: true },
  { word: "AREN'T", br: true },
  { word: "LIVING", sv: true, br: true },
  { word: "THEIR", br: true },
  { word: "LIVES." },
];

/**
 * Section 02 — The Real Enemy.
 *
 * V2: the asymmetric headline brightens word-by-word as the reader scrolls
 * (scrubbed narration — the signature beat), while the right-hand narrative
 * blocks cascade in on view. No translate-pin fighting the scroll.
 */
export default function RealEnemy() {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.2 });
  const [blocksRef, blocksVisible] = useScrollFadeIn({ threshold: 0.25, rootMargin: "0px 0px -10% 0px" });
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope, { start: "top 80%", end: "top 30%" });

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
              <div className="section-num">02</div>
            </div>
          </div>

          {/* Center Column: large asymmetric headline — scrubbed word reveal */}
          <div>
            <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "24px" }}>The Real Enemy</div>
            <h2 ref={hlScope} className="enemy-hl text-left">
              {HEADLINE.map((w, i) => (
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
              {NARRATIVE_BLOCKS.map((block, index) => (
                <div
                  key={block.id}
                  className={`block-reveal-item ${block.className} ${blocksVisible ? "active" : ""}`}
                  style={{ transitionDelay: `${index * 0.12}s` }}
                >
                  {block.node}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
