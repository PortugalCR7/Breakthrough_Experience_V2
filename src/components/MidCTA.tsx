import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useMagnetic } from "../hooks/useMagnetic";

export default function MidCTA() {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.15 });
  const magneticRef = useMagnetic({ strength: 0.35 });

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
                05
              </div>
            </div>
          </div>

          {/* Right Column: Stacked eyebrow, headline, paragraph, and CTA */}
          <div className="flex flex-col gap-10 text-left">
            <div>
              <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "20px" }}>
                The Decision Point
              </div>
              <h2 className={`mid-hl text-sheen fu text-left leading-[0.88] tracking-[-0.025em] ${isVisible ? "vis run" : ""}`} style={{ marginBottom: 0 }}>
                THE MAN YOU WANT TO BECOME IS NOT WAITING IN THE <span className="sv">FUTURE.</span>
              </h2>
            </div>

            <div className={`asymmetric-panel asymmetric-border-accent fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
              <p className="mid-sub text-left mb-8 max-w-xl">
                He is waiting on the other side of a decision.
              </p>
              <div>
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

        </div>
      </div>
    </section>
  );
}
