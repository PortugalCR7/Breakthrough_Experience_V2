import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import KineticText from "./KineticText";
import { gsap, useGSAP, prefersReducedMotion, useWordScrub } from "../motion";
import { anchorQuoteContent, AnchorQuoteContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function AnchorQuote() {
  const content = useSection<AnchorQuoteContent>("anchor_quote", anchorQuoteContent);
  const [ref, isVisible] = useIntersectionObserver();
  const sectionRef = useRef<HTMLElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const anchorHlRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(anchorHlRef);

  // Gentle scrubbed depth drift between the headline and the supporting quote —
  // "environmental motion", almost invisible. The existing word-rise is untouched.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !quoteRef.current || !sectionRef.current) return;
      gsap.fromTo(
        quoteRef.current,
        { yPercent: 5 },
        {
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: sectionRef }
  );

  const setSection = (node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as any).current = node;
  };

  const hw = content.headlineWords;

  return (
    <section id="anchor" className="scroll-snap-section" ref={setSection}>
      <div className="w">
        <div className="anchor-wrap">
          <div className={`fu ${isVisible ? "vis" : ""}`}>
            <div className="section-num">{content.sectionNumber}</div>
            <div className="eyebrow" style={{ marginTop: "40px" }}>{content.eyebrow}</div>
            <h2 ref={anchorHlRef} className="anchor-body">
              <span className="word-reveal-span mr-[0.25em]">{hw[0]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[1]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[2]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[3]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[4]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[5]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[6]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[7]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[8]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[9]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[10]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[11]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[12]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[13]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[14]}</span>
            </h2>
          </div>
          <div ref={quoteRef} className={`anchor-quote fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <p style={{ fontStyle: "normal", fontWeight: 400, fontFamily: "var(--fb)" }}>
              <KineticText text={content.quoteLine1} delay={250} />
            </p>
            <p className="big text-stone-200 mt-2">
              <span style={{ fontFamily: "var(--fb)" }}>
                <KineticText text={content.quoteLine2} delay={600} />
              </span>
              <br />
              <span style={{ fontFamily: "var(--fd)", fontWeight: "bold", fontStyle: "italic" }}>
                <KineticText text={content.quoteLine3} delay={705} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
