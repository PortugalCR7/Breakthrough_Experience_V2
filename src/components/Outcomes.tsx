import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWordScrub } from "../motion";
import { outcomesContent, OutcomesContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Outcomes() {
  const content = useSection<OutcomesContent>("outcomes", outcomesContent);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const hl1Ref = useRef<HTMLHeadingElement | null>(null);
  const hl2Ref = useRef<HTMLHeadingElement | null>(null);
  // Both panel headlines are the section's top-level headings (there is no
  // overarching section title), so they sit at <h2> to keep the outline
  // gap-free under the page <h1> — styling is class-driven (.oc-hl), unchanged.
  useWordScrub(hl1Ref);
  useWordScrub(hl2Ref);

  // walkAwayHeadlineWords: ["WHAT","YOU","WALK","AWAY","WITH"]
  const w1 = content.walkAwayHeadlineWords;
  // twentyYearsHeadlineWords: ["WHAT","TWENTY","YEARS","HAVE","TAUGHT","ME"]
  const w2 = content.twentyYearsHeadlineWords;

  return (
    <section id="outcomes" className="scroll-snap-section" ref={ref as any}>
      <div className="oc-pair">

        {/* Left Card: Walk Away With */}
        <div
          className="oc-panel interactive-card cursor-default"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            willChange: "opacity, transform",
          }}
        >
          <h2 ref={hl1Ref} className="oc-hl">
            <span className="word-reveal-span mr-[0.25em]">{w1[0]}</span>
            <span className="word-reveal-span mr-[0.25em]">{w1[1]}</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">{w1[2]}</span>
            <span className="word-reveal-span mr-[0.25em]">{w1[3]}</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">{w1[4]}</span>
          </h2>
          <div className="oc-list">
            {content.walkAwayItems.map((item, i) => (
              <div key={i} className={`oc-row${item.isStar ? " star" : ""}`}>
                <span className="oc-m">{item.marker}</span>
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: What 20 Years Taught Me (starts 0.25s after left card completes) */}
        <div
          className="oc-panel interactive-card cursor-default"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: "0.85s", // 0.6s (left card duration) + 0.25s = 0.85s
            willChange: "opacity, transform",
          }}
        >
          <h2 ref={hl2Ref} className="oc-hl">
            <span className="word-reveal-span mr-[0.25em]">{w2[0]}</span>
            <span className="word-reveal-span mr-[0.25em]">{w2[1]}</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">{w2[2]}</span>
            <span className="word-reveal-span mr-[0.25em]">{w2[3]}</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">{w2[4]}</span>
            <span className="word-reveal-span mr-[0.25em]">{w2[5]}</span>
          </h2>
          <div className="aph-list">
            {content.twentyYearsItems.map((item, i) => (
              <div key={i} className="aph-row">
                <p className="aph-t" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
