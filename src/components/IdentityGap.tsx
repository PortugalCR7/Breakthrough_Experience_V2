import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { GapRowItem } from "../types";

const GAP_ROWS: GapRowItem[] = [
  {
    id: "g1",
    num: "01 ·",
    title: "Validation Seek",
    body: "You adjust for approval. You know you're doing it. You do it anyway.",
    highlight: "Strong men don't need agreement. They need alignment.",
  },
  {
    id: "g2",
    num: "02 ·",
    title: "Chasing \"Success\"",
    body: "The next win. The next achievement. The finish line keeps moving.",
    highlight: "The performance man chases. The grounded man chooses.",
  },
  {
    id: "g3",
    num: "03 ·",
    title: "The Moving Bar",
    body: "Nothing feels like enough for long. Not because you're ambitious. Because achievement became your identity.",
    highlight: "<em>An identity built on output is one bad quarter away from collapse.</em>",
  },
  {
    id: "g4",
    num: "04 ·",
    title: "Velocity Trap",
    body: "You're moving fast, working hard, producing results.",
    highlight: "But every so often you wonder: \"Is this even where I want to go?\"",
  },
];

const HEADLINE_WORDS = [
  "THE", "DISTANCE", "BETWEEN",
  "THE", "MAN", "YOU", "ARE", "PERFORMING",
  "AND", "THE", "SOVEREIGN", "MAN", "YOU", "ARE."
];

const BODY_WORDS = [
  "That", "gap", "shows", "up", "in", "highly", "predictable,", "silent,", "destructive", "ways."
];

/**
 * Section 03 — The Identity Gap.
 *
 * Reworked from a scroll-scrubbed pin (which rubber-banded against the scroll)
 * to a natural-flow section with on-view staggered reveals: the headline lights
 * up word-by-word as it enters the viewport, then the four gap rows cascade in.
 * Smooth, GPU-friendly, no per-frame React state.
 */
export default function IdentityGap() {
  // Headline + body word-reveal trigger
  const [headRef, headVisible] = useScrollFadeIn({ threshold: 0.3, rootMargin: "0px 0px -12% 0px" });
  // Staggered gap-row cascade trigger
  const [listRef, listVisible] = useScrollFadeIn({ threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
  // Left metadata reveal
  const [metaRef, isMetaVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section
      id="gap"
      className="scroll-snap-section relative w-full overflow-hidden"
    >
      <div className="w">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-12 md:gap-24 items-start mb-[clamp(56px,8vw,104px)]">

          {/* Asymmetric Left metadata panel */}
          <div
            ref={metaRef as any}
            className={`flex flex-col gap-4 gen-reveal ${isMetaVisible ? "vis" : ""}`}
          >
            <div className="section-num">03</div>
            <div>
              <span className="font-mono text-xs text-neutral-500 tracking-[0.3em] uppercase">
                IDENTITY GAP ANALYSIS
              </span>
            </div>
          </div>

          {/* Right side: on-view staggered Word Reveal on headline & body */}
          <div ref={headRef as any} className="flex flex-col gap-6">
            <div className="eyebrow">The Identity Gap</div>
            <h2 className="gap-hl">
              {HEADLINE_WORDS.map((word, index) => (
                <span
                  key={`hl-word-${index}`}
                  className={`word-reveal-span mr-[0.25em] ${headVisible ? "active" : ""}`}
                  style={{
                    transitionDelay: `${index * 0.05}s`,
                    transitionProperty: "color, opacity, text-shadow",
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
            <p className="gap-def">
              {BODY_WORDS.map((word, index) => {
                const wordIndex = HEADLINE_WORDS.length + index;
                return (
                  <span
                    key={`body-word-${index}`}
                    className={`word-reveal-span mr-[0.25em] ${headVisible ? "active" : ""}`}
                    style={{
                      transitionDelay: `${wordIndex * 0.04}s`,
                      transitionProperty: "color, opacity",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* Gap rows — staggered cascade reveal + elevated hover */}
        <div
          ref={listRef as any}
          className="gap-list divide-y divide-neutral-900 border-t border-b border-neutral-900"
        >
          {GAP_ROWS.map((row, index) => (
            <div
              key={row.id}
              className={`gap-row group relative hover:bg-neutral-900/40 cursor-pointer block-reveal-item ${
                listVisible ? "active" : ""
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--sv)] scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100" />

              <div className="gr-num group-hover:text-[var(--sv)] transition-colors duration-300">
                {row.num}
              </div>
              <div className="self-start">
                <div className="gr-t opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                  {row.title}
                </div>
              </div>
              <div className="gr-b group-hover:text-stone-300 transition-colors duration-300">
                {row.body}
                <span
                  className="hl border-l-2 border-neutral-800 pl-3"
                  dangerouslySetInnerHTML={{ __html: row.highlight }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
