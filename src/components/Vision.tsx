import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWordScrub } from "../motion";

const VISION_WORDS = [
  { text: "For", isSv: false, isBr: false },
  { text: "over", isSv: false, isBr: false },
  { text: "twenty", isSv: true, isBr: false },
  { text: "years,", isSv: true, isBr: false },
  { text: "", isBr: true },
  { text: "I've", isSv: false, isBr: false },
  { text: "helped", isSv: false, isBr: false },
  { text: "men", isSv: false, isBr: false },
  { text: "close", isSv: true, isBr: false },
  { text: "that", isSv: true, isBr: false },
  { text: "gap", isSv: true, isBr: false },
  { text: "", isBr: true },
  { text: "through", isSv: false, isBr: false },
  { text: "structure,", isSv: true, isBr: false },
  { text: "accountability,", isSv: true, isBr: false },
  { text: "", isBr: true },
  { text: "and", isSv: false, isBr: false },
  { text: "honest", isSv: true, isBr: false },
  { text: "leadership.", isSv: true, isBr: false },
];

/**
 * Section 01 — The Foundation / Vision statement.
 *
 * V2: the statement lights up word-by-word **as the reader scrolls through it**
 * (GSAP scrub via useWordScrub) — scroll speed becomes reading pace. This is the
 * signature narration beat. The earlier in-house scroll-scrub was removed for
 * jank; driving it through Lenis + GSAP (off the React render loop) is what makes
 * it read as premium rather than choppy.
 */
export default function Vision() {
  const [metaRef, isMetaVisible] = useIntersectionObserver({ threshold: 0.2 });
  const stmtRef = useRef<HTMLHeadingElement | null>(null);

  useWordScrub(stmtRef, { start: "top 80%", end: "top 30%" });

  return (
    <section
      id="vision"
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      <div className="w">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr] gap-12 md:gap-24 items-start">

          {/* Asymmetric Left metadata panel */}
          <div
            ref={metaRef as any}
            className={`flex flex-col gap-4 gen-reveal ${isMetaVisible ? "vis" : ""}`}
          >
            <div className="section-num">01</div>
          </div>

          {/* Vision statement — scroll-scrubbed word narration */}
          <div className="asymmetric-panel asymmetric-border-accent vis">
            <div className="eyebrow" style={{ marginBottom: "24px" }}>The Foundation</div>
            <h2
              ref={stmtRef}
              className="vision-text text-left tracking-tight leading-[0.95]"
            >
              {VISION_WORDS.map((word, index) => {
                if (word.isBr) {
                  return <br key={`br-${index}`} />;
                }
                return (
                  <span
                    key={`word-${index}`}
                    className={`word-reveal-span mr-[0.25em] ${word.isSv ? "sv" : ""}`}
                  >
                    {word.text}
                  </span>
                );
              })}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
