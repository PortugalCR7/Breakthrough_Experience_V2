import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { midCtaContent, MidCtaContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function MidCTA() {
  const content = useSection<MidCtaContent>("mid_cta", midCtaContent);
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.15 });
  const midHlRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(midHlRef);

  // headlineWords: ["THE","MAN","YOU","WANT","TO","BECOME","IS","NOT","WAITING","IN","THE","FUTURE."]
  // <br /> after MAN(1), WANT(3), BECOME(5), WAITING(8) — layout encoded in JSX
  // FUTURE. (index 11) carries the .sv accent class
  const hw = content.headlineWords;

  return (
    <section
      id="mid"
      ref={ref as any}
      className="relative overflow-hidden bg-neutral-950 border-t border-b border-neutral-900 scroll-snap-section"
      style={{
        paddingTop: "var(--secpad)",
        paddingBottom: "var(--secpad)",
      }}
    >
      <div className="w">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-12 md:gap-24 items-start">

          {/* Asymmetric Left metadata panel */}
          <div className="flex flex-col gap-4">
            <div className={`fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="section-num">
                {content.sectionNumber}
              </div>
            </div>
          </div>

          {/* Right Column: Stacked eyebrow, headline, paragraph, and CTA */}
          <div className="flex flex-col gap-10 text-left">
            <div>
              <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "20px" }}>
                {content.eyebrow}
              </div>
              <h2 ref={midHlRef} className="mid-hl text-left" style={{ marginBottom: 0 }}>
                <span className="word-reveal-span mr-[0.25em]">{hw[0]}</span>
                <span className="word-reveal-span mr-[0.25em]">{hw[1]}</span>
                <br />
                <span className="word-reveal-span mr-[0.25em]">{hw[2]}</span>
                <span className="word-reveal-span mr-[0.25em]">{hw[3]}</span>
                <br />
                <span className="word-reveal-span mr-[0.25em]">{hw[4]}</span>
                <span className="word-reveal-span mr-[0.25em]">{hw[5]}</span>
                <br />
                <span className="word-reveal-span mr-[0.25em]">{hw[6]}</span>
                <span className="word-reveal-span mr-[0.25em]">{hw[7]}</span>
                <span className="word-reveal-span mr-[0.25em]">{hw[8]}</span>
                <br />
                <span className="word-reveal-span mr-[0.25em]">{hw[9]}</span>
                <span className="word-reveal-span mr-[0.25em]">{hw[10]}</span>
                <span className="word-reveal-span sv mr-[0.25em]">{hw[11]}</span>
              </h2>
            </div>

            <div className={`asymmetric-panel asymmetric-border-accent fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <p className="mid-sub text-left mb-8 max-w-xl">
                {content.subtitle}
              </p>
              <div>
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

        </div>
      </div>
    </section>
  );
}
