import { useScrollFadeIn } from "../hooks/useScrollFadeIn";

const LINES = [
  "I've watched men wait years for the right moment.",
  "The right moment never arrives.",
  "It is created.",
  "You already know what needs to happen.",
  "The only question is:",
  "Are you willing to act on what you know?",
];

/**
 * Section 14 — The Final Word.
 *
 * Reworked from a 600vh scroll-scrubbed line reveal into a natural-flow section.
 * The portrait fades/slides in as the section enters, and the lines rise in a
 * smooth staggered cascade. No 6×-viewport scroll lock.
 */
export default function FinalWord() {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

  const lineTransition = "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <section
      id="finalword"
      ref={ref as any}
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      {/* Frank portrait — bleeds off the left edge into the black, no frame. */}
      <div
        className="fw-portrait"
        aria-hidden="true"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : "translateX(-28px)",
          transition: "opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img src="/frank_founder_updated.jpg" alt="" referrerPolicy="no-referrer" />
      </div>

      <div className="w">
        <div className="fw-g">
          <div className="fw-left" style={{ visibility: "hidden" }}>
            {/* Kept empty to preserve desktop grid spacing */}
          </div>

          <div className="fw-txt">
            {LINES.map((line, index) => (
              <p
                key={index}
                className="mt-4 first:mt-0"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: lineTransition,
                  transitionDelay: `${index * 0.15}s`,
                  willChange: "transform, opacity",
                }}
              >
                {line}
              </p>
            ))}

            {/* Frank Mondeose signature — reveals after the final line */}
            <div
              className="mt-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: lineTransition,
                transitionDelay: `${LINES.length * 0.15}s`,
                willChange: "transform, opacity",
              }}
            >
              <div className="fw-sig">Frank Mondeose</div>
              <div className="fw-ttls">
                Teacher of Teachers
                <br />
                Mentor to Men on the
                <br />
                Cusp of Impact
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
