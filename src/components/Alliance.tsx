import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { allianceContent, AllianceContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Alliance() {
  const content = useSection<AllianceContent>("alliance", allianceContent);
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.1 });
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  // headlineWords: ["THE","ALLIANCE"] — each on its own line
  const hw = content.headlineWords;

  // applyCtaText has \n for line break
  const ctaLines = content.applyCtaText.split('\n');

  return (
    <section id="alliance-sec" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "32px" }}>
          {content.eyebrow}
        </div>
        <div className="pp-grid">
          <div className={`fu ${isVisible ? "vis" : ""} border-r border-white/10 pr-12 flex flex-col`}>
            <h2 ref={hlScope} className="al-sec-hl">
              {hw.map((word, i) => (
                <span key={i}>
                  <span className="word-reveal-span">{word}</span>
                  {i < hw.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="al-sec-intro mt-6 mb-8">
              {content.introParagraph}
            </p>
            <div className="mt-auto pt-8">
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
          </div>

          <div className={`fu ${isVisible ? "vis" : ""} flex flex-col`} style={{ transitionDelay: "0.15s" }}>
            <div className="al-incl-lbl">{content.includedLabel}</div>
            <div className="al-incl-list">
              {content.includedItems.map((item, i) => (
                <div key={i} className="al-incl-row">
                  <span className="al-ii-m">—</span>{item}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <p className="al-right-note border-b-0 pb-0 mb-0">
                {content.applicationNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
