import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
 * Reworked from a 180vh scroll-scrubbed word reveal into a natural-flow section
 * whose statement lights up word-by-word, in a smooth staggered cascade, once it
 * enters the viewport. No per-frame scroll state.
 */
export default function Vision() {
  const [headRef, headVisible] = useScrollFadeIn({ threshold: 0.3, rootMargin: "0px 0px -12% 0px" });
  const [metaRef, isMetaVisible] = useIntersectionObserver({ threshold: 0.2 });

  let currentWordIndex = 0;

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

          {/* Vision statement — staggered word cascade on view */}
          <div ref={headRef as any} className="asymmetric-panel asymmetric-border-accent vis">
            <div className="eyebrow" style={{ marginBottom: "24px" }}>The Foundation</div>
            <h2 className="vision-text text-left tracking-tight leading-[0.95]">
              {VISION_WORDS.map((word, index) => {
                if (word.isBr) {
                  return <br key={`br-${index}`} />;
                }

                const wordIdx = currentWordIndex++;

                return (
                  <span
                    key={`word-${index}`}
                    className={`word-reveal-span mr-[0.25em] ${headVisible ? "active" : ""} ${
                      word.isSv ? "sv text-[var(--sv)]" : ""
                    }`}
                    style={{
                      transitionDelay: `${wordIdx * 0.05}s`,
                      transitionProperty: "color, opacity, text-shadow",
                    }}
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
