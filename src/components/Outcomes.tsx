import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWordScrub } from "../motion";

export default function Outcomes() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const hl1Ref = useRef<HTMLHeadingElement | null>(null);
  const hl2Ref = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hl1Ref);
  useWordScrub(hl2Ref);

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
          <h3 ref={hl1Ref} className="oc-hl">
            <span className="word-reveal-span mr-[0.25em]">WHAT</span>
            <span className="word-reveal-span mr-[0.25em]">YOU</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">WALK</span>
            <span className="word-reveal-span mr-[0.25em]">AWAY</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">WITH</span>
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
          className="oc-panel interactive-card cursor-default"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: "0.85s", // 0.6s (left card duration) + 0.25s = 0.85s
            willChange: "opacity, transform",
          }}
        >
          <h3 ref={hl2Ref} className="oc-hl">
            <span className="word-reveal-span mr-[0.25em]">WHAT</span>
            <span className="word-reveal-span mr-[0.25em]">TWENTY</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">YEARS</span>
            <span className="word-reveal-span mr-[0.25em]">HAVE</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">TAUGHT</span>
            <span className="word-reveal-span mr-[0.25em]">ME</span>
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
