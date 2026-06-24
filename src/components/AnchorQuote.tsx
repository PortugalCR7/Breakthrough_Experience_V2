import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import KineticText from "./KineticText";
import { gsap, useGSAP, prefersReducedMotion, useWordScrub } from "../motion";

export default function AnchorQuote() {
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

  return (
    <section id="anchor" className="scroll-snap-section" ref={setSection}>
      <div className="w">
        <div className="anchor-wrap">
          <div className={`fu ${isVisible ? "vis" : ""}`}>
            <div className="eyebrow">From the first step you take</div>
            <h2 ref={anchorHlRef} className="anchor-body">
              <span className="word-reveal-span mr-[0.25em]">"I</span>
              <span className="word-reveal-span mr-[0.25em]">am</span>
              <span className="word-reveal-span mr-[0.25em]">invested</span>
              <span className="word-reveal-span mr-[0.25em]">in</span>
              <span className="word-reveal-span mr-[0.25em]">you</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">the</span>
              <span className="word-reveal-span mr-[0.25em]">entire</span>
              <span className="word-reveal-span mr-[0.25em]">way.</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">I</span>
              <span className="word-reveal-span mr-[0.25em]">am</span>
              <span className="word-reveal-span mr-[0.25em]">in</span>
              <span className="word-reveal-span mr-[0.25em]">the</span>
              <span className="word-reveal-span mr-[0.25em]">arena</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">with</span>
              <span className="word-reveal-span mr-[0.25em]">you."</span>
            </h2>
          </div>
          <div ref={quoteRef} className={`anchor-quote fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <p style={{ fontStyle: "normal", fontWeight: 400 }}>
              <KineticText text={'"I know who you are. I\'ve sat with you a thousand times.'} delay={250} />
            </p>
            <p className="big text-stone-200 mt-2">
              <KineticText text="You're not broken. " delay={600} />
              <span className="sv" style={{ fontStyle: "italic" }}>
                <KineticText text={'You\'re simply living beneath your potential."'} delay={1000} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
