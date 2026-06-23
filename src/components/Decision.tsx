import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useMagnetic } from "../hooks/useMagnetic";

export default function Decision() {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.1 });
  const magneticRef = useMagnetic({ strength: 0.35 });

  return (
    <section id="decision" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className={`decision-hero fu ${isVisible ? "vis" : ""}`}>
          {/* Meta kicker */}
          <div className="section-num">06</div>
          <div className="eyebrow" style={{ marginTop: "8px", marginBottom: "24px" }}>
            The Decision
          </div>

          {/* Headline — full width, room to breathe */}
          <h2 className="decision-hl text-left" style={{ marginBottom: "32px" }}>
            THE MAN YOU WANT TO BECOME IS NOT WAITING IN THE{" "}
            <span className="sv">FUTURE.</span>
          </h2>

          {/* Sub-headline */}
          <p className="decision-sub">He is waiting on the other side of your decision.</p>

          {/* Body copy */}
          <div className="decision-b decision-body">
            <p>
              Five years from now, you'll either be living closer to the man you
              know you can be, or explaining why you never became him.
            </p>
            <p className="mt-4">
              The question isn't whether you're ready. The question is how much
              longer you're willing to tolerate what you know isn't true.
            </p>
          </div>

          {/* CTA */}
          <div className="decision-cta">
            <a ref={magneticRef as any} href="#checkout" className="btn-tactile">
              <span className="btn-tactile-wrap">
                <span className="btn-tactile-text">Begin Your Breakthrough</span>
                <span className="btn-tactile-hover">Begin Your Breakthrough</span>
              </span>
              <span className="btn-tactile-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
