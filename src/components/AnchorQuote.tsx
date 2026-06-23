import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import KineticText from "./KineticText";

export default function AnchorQuote() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="anchor" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className="anchor-wrap">
          <div className={`fu ${isVisible ? "vis" : ""}`}>
            <div className="eyebrow">From the first step you take</div>
            <h2 className="anchor-body">
              "I am invested in you
              <br />
              the entire way.
              <br />
              <span className="dim">I am in the arena
              <br />
              with you."</span>
            </h2>
          </div>
          <div className={`anchor-quote fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
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
