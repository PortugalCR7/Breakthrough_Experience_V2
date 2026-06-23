import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTilt } from "../hooks/useTilt";

export default function Outcomes() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const tiltRef1 = useTilt(5);
  const tiltRef2 = useTilt(5);

  return (
    <section id="outcomes" className="scroll-snap-section" ref={ref as any}>
      <div className="oc-pair">
        
        {/* Left Card: Walk Away With */}
        <div 
          ref={tiltRef1 as any}
          className="oc-panel interactive-card cursor-default"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            willChange: "opacity, transform",
          }}
        >
          <h3 className="oc-hl">
            WHAT YOU
            <br />
            WALK AWAY
            <br />
            WITH
          </h3>
          <div className="oc-list">
            <div className="oc-row">
              <span className="oc-m">✓</span>Greater self-trust.
            </div>
            <div className="oc-row">
              <span className="oc-m">✓</span>Clearer direction.
            </div>
            <div className="oc-row">
              <span className="oc-m">✓</span>Stronger boundaries.
            </div>
            <div className="oc-row">
              <span className="oc-m">✓</span>More consistent action.
            </div>
            <div className="oc-row">
              <span className="oc-m">✓</span>A brotherhood of accountability.
            </div>
            <div className="oc-row">
              <span className="oc-m">✓</span>A practical path forward.
            </div>
            <div className="oc-row star">
              <span className="oc-m">◈</span>
              <span>
                Most importantly: a <strong>deeper relationship with yourself.</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: What 20 Years Taught Me (starts 0.25s after left card completes) */}
        <div 
          ref={tiltRef2 as any}
          className="oc-panel interactive-card cursor-default" 
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: "0.85s", // 0.6s (left card duration) + 0.25s = 0.85s
            willChange: "opacity, transform",
          }}
        >
          <h3 className="oc-hl">
            WHAT TWENTY
            <br />
            YEARS HAVE
            <br />
            TAUGHT ME
          </h3>
          <div className="aph-list">
            <div className="aph-row">
              <p className="aph-t">
                Men do not rise to their potential.{" "}
                <strong>They rise to the standards they are willing to uphold.</strong>
              </p>
            </div>
            <div className="aph-row">
              <p className="aph-t">
                Most men don't need more information. <strong>They need structure.</strong>
              </p>
            </div>
            <div className="aph-row">
              <p className="aph-t">
                <strong>Accountability is one of the highest forms of respect.</strong>
              </p>
            </div>
            <div className="aph-row">
              <p className="aph-t">
                The quality of a man's life is directly related to{" "}
                <strong>
                  the quality of the standards he is willing to accept.
                </strong>
              </p>
            </div>
            <div className="aph-row">
              <p className="aph-t">
                <strong>Brotherhood is where excuses go to die.</strong>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
