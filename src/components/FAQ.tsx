import { useState, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWordScrub } from "../motion";
import { faqContent, FaqContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function FAQ() {
  const content = useSection<FaqContent>("faq", faqContent);
  const [ref, isVisible] = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // headlineWords: ["WHAT","I","GET","ASKED.","WHAT","I","ACTUALLY","SAY."]
  // <br /> after GET(2) and WHAT(4) — layout encoded in JSX
  const hw = content.headlineWords;

  return (
    <section id="faq" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className={`fu ${isVisible ? "vis" : ""}`}>
          <div className="eyebrow">{content.eyebrow}</div>
        </div>
        <h2 ref={hlScope} className="faq-hl">
          <span className="word-reveal-span">{hw[0]}</span>{" "}
          <span className="word-reveal-span">{hw[1]}</span>{" "}
          <span className="word-reveal-span">{hw[2]}</span>
          <br />
          <span className="word-reveal-span">{hw[3]}</span>{" "}
          <span className="word-reveal-span">{hw[4]}</span>
          <br />
          <span className="word-reveal-span">{hw[5]}</span>{" "}
          <span className="word-reveal-span">{hw[6]}</span>{" "}
          <span className="word-reveal-span">{hw[7]}</span>
        </h2>

        <div className="faq-list">
          {content.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `${item.id}-panel`;
            const btnId = `${item.id}-control`;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => toggleIndex(idx)}
              >
                <div
                  className="faq-q"
                  role="button"
                  tabIndex={0}
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleIndex(idx);
                    }
                  }}
                >
                  <p className="faq-qt">{item.question}</p>
                  <div className="faq-tog" aria-hidden="true">{isOpen ? "×" : "+"}</div>
                </div>
                <div
                  className="faq-ans"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                >
                  <div className="faq-ai">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
