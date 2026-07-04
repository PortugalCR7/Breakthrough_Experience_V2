import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { primaryPathContent, PrimaryPathContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

/**
 * Section 10 — The Primary Path.
 *
 * Reworked from a 340vh scroll-scrubbed translate pin into a natural-flow section.
 * The left column rises in on view; the included items cascade with a staggered
 * reveal, with pricing landing last. Magnetic CTA preserved.
 */
export default function PrimaryPath() {
  const content = useSection<PrimaryPathContent>("primary_path", primaryPathContent);
  const [leftRef, isLeftVisible] = useScrollFadeIn({ threshold: 0.2 });
  const [itemsRef, itemsVisible] = useScrollFadeIn({ threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  // headlineWords: ["SIX","PRIVATE","ONE-on-ONE","SESSIONS","WITH","FRANK"]
  // each word on its own line — layout encoded in JSX
  const hw = content.headlineWords;

  // ctaText has \n for line break — split and render with <br />
  const ctaLines = content.ctaText.split('\n');

  return (
    <section
      id="primary-path"
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      <div className="ww">
        <div ref={leftRef as any} className={`eyebrow fu ${isLeftVisible ? "vis" : ""}`} style={{ marginBottom: "32px" }}>
          {content.eyebrow}
        </div>
        <div className="pp-grid">

          {/* Left Column */}
          <div className="border-r border-white/10 pr-12 flex flex-col">
            <h2 ref={hlScope} className="pp-hl" style={{ fontSize: "clamp(28px, 4vw, 80px)" }}>
              {hw.map((word, i) => (
                <span key={i}>
                  <span className="word-reveal-span">{word}</span>
                  {i < hw.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className={`pp-body fu ${isLeftVisible ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
              {content.bodyParagraphs.map((para, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
              ))}
            </div>
            <div className={`fu ${isLeftVisible ? "vis" : ""} mt-auto pt-8`} style={{ transitionDelay: "0.2s" }}>
              <div style={{ marginBottom: "16px" }}>
                <a href={content.ctaLink} className="btn-tactile btn-stack w-full" target="_blank" rel="noopener noreferrer">
                  <span className="btn-tactile-wrap">
                    <span className="btn-tactile-text">
                      {ctaLines.map((line, i) => (
                        <span key={i}>{i > 0 && <br />}{line}</span>
                      ))}
                    </span>
                    <span className="btn-tactile-hover">
                      {ctaLines.map((line, i) => (
                        <span key={i}>{i > 0 && <br />}{line}</span>
                      ))}
                    </span>
                  </span>
                  <span className="btn-tactile-arrow">→</span>
                </a>
              </div>
              <div className="scarcity">
                <div className="sc-dot"></div>
                <span className="sc-txt font-mono">{content.scarcityText}</span>
              </div>
            </div>
          </div>

          {/* Right Column: staggered item reveal */}
          <div ref={itemsRef as any} className="flex flex-col">
            <div className="pp-items">
              {content.items.map((item, index) => (
                <div
                  key={item.title}
                  className={`pp-item block-reveal-item grid grid-cols-1 md:grid-cols-[40px_240px_1fr] gap-4 md:gap-12 items-start ${itemsVisible ? "active" : ""}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <span className="pp-ck">✓</span>
                  <span className="pp-title">{item.title}</span>
                  <p className="pp-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing — lands last, bottom-aligned with the left CTA block */}
            <div
              className={`mt-auto pt-12 block-reveal-item ${itemsVisible ? "active" : ""}`}
              style={{ transitionDelay: `${content.items.length * 0.1}s` }}
            >
              <div className="pp-price-lbl">{content.investmentLabel}</div>
              <div className="pp-price">{content.investmentPrice}</div>
              <div className="pp-pnote font-mono text-[10px] text-neutral-400">
                {content.investmentNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
