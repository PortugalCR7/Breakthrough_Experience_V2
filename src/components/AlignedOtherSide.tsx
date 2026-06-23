import { useScrollFadeIn } from "../hooks/useScrollFadeIn";

/**
 * Section — The Man on the Other Side.
 *
 * Reworked from a 220vh scroll-scrubbed translate pin into a natural-flow section.
 * The left statement rises in on view; the right-hand bullets cascade with a
 * staggered reveal. Smooth, no per-frame scroll state.
 */
export default function AlignedOtherSide() {
  const [leftRef, isLeftVisible] = useScrollFadeIn({ threshold: 0.25 });
  const [rightRef, isRightVisible] = useScrollFadeIn({ threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  return (
    <section
      id="other"
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      <div className="w">
        <div className="other-g">

          {/* Left column: statement rises in on view */}
          <div
            ref={leftRef as any}
            style={{
              opacity: isLeftVisible ? 1 : 0,
              transform: isLeftVisible ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "opacity, transform",
            }}
          >
            <div className="eyebrow">The Man on the Other Side</div>
            <h2 className="other-hl">
              NOT PERFECT.
              <br />
              NOT FINISHED.
              <br />
              JUST <span className="sv">ALIGNED.</span>
            </h2>
          </div>

          {/* Right column: staggered bullet reveal */}
          <div ref={rightRef as any}>
            <p
              className={`other-sub block-reveal-item ${isRightVisible ? "active" : ""}`}
              style={{ transitionDelay: "0s" }}
            >
              That is the man this work is designed to develop.
            </p>
            <div className="other-list">
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                <span className="oi-m">—</span>A man who trusts himself.
              </div>
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                <span className="oi-m">—</span>A man whose word carries weight.
              </div>
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.3s" }}
              >
                <span className="oi-m">—</span>A man who stops negotiating with what he knows is true.
              </div>
              <div
                className={`other-item block-reveal-item ${isRightVisible ? "active" : ""}`}
                style={{ transitionDelay: "0.4s" }}
              >
                <span className="oi-m">—</span>
                <span>
                  A man who leads his family, business, and life from{" "}
                  <strong>conviction rather than reaction.</strong>
                </span>
              </div>
            </div>

            <p
              className={`other-coda block-reveal-item ${isRightVisible ? "active" : ""}`}
              style={{ transitionDelay: "0.5s" }}
            >
              This is who you already are. The work is closing the gap.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
