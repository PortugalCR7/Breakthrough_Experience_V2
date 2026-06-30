import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "../motion";
import { useTheme } from "../theme/useTheme";
import ScrollCue from "./ScrollCue";

const LINES = [
  "I've watched men wait years for the right moment.",
  "The right moment never arrives.",
  "It is created.",
  "You already know what needs to happen.",
  "The only question is:",
  "Are you willing to act on what you know?",
];

/**
 * Section 14 — The Final Word (closing statement).
 *
 * V3: a held PIN + scroll-lock (modelled on Decision). While pinned, Frank's
 * full letter ignites word-by-word and only releases once every word has lit.
 * The portrait is revealed immediately at pin start — together with the first
 * words — and the signature resolves at/after the final line. On viewports too
 * short to hold the set-piece it degrades to a plain non-pinned scrub so nothing
 * clips; reduced-motion shows the whole letter + portrait instantly.
 */
export default function FinalWord() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const txtScope = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const sigRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scope = txtScope.current;
      const portrait = portraitRef.current;
      const sig = sigRef.current;
      if (!scope) return;
      const words = gsap.utils.toArray<HTMLElement>(".word-reveal-span", scope);
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, "--wp": 1 });
        if (portrait) gsap.set(portrait, { opacity: 1, x: 0 });
        if (sig) gsap.set(sig, { opacity: 1, y: 0 });
        return;
      }

      const build = (st: ScrollTrigger.Vars) => {
        gsap.set(words, { opacity: 0.1, "--wp": 0 });
        if (portrait) gsap.set(portrait, { opacity: 0, x: -28 });
        if (sig) gsap.set(sig, { opacity: 0, y: 30 });

        const tl = gsap.timeline({ scrollTrigger: st });
        // Portrait reveals immediately — at pin start, alongside the first words.
        if (portrait) tl.to(portrait, { opacity: 1, x: 0, ease: "none", duration: 0.5 }, 0);
        tl.to(
          words,
          { opacity: 1, "--wp": 1, ease: "none", duration: 0.4, stagger: { each: 0.5 } },
          0
        );
        // Signature resolves at/after the final line.
        if (sig) tl.to(sig, { opacity: 1, y: 0, ease: "none", duration: 0.6 }, ">-0.3");
        return tl;
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Pin Lock & Release: the closing letter holds at the top of the viewport
        // and ignites word-by-word as the reader scrolls, then releases — the same
        // pinned set-piece grammar the CTA beats use. Pins on desktop unconditionally.
        const tl = build({
          trigger: section,
          start: "top top",
          end: "+=95%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
        });
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767.98px)", () => {
        const tl = build({ trigger: scope, start: "top 85%", end: "top 28%", scrub: true });
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="finalword"
      ref={sectionRef}
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)", borderTop: "1px solid var(--c4)" }}
    >
      {/* Frank portrait — bleeds off the left edge into the black, no frame.
          GSAP controls its reveal, so the CSS transition is disabled here. */}
      <div
        className="fw-portrait"
        ref={portraitRef}
        aria-hidden="true"
        style={{ opacity: 0, transition: "none" }}
      >
        <picture>
          <source type="image/webp" srcSet="/frank_founder_updated.webp" />
          <img src="/frank_founder_updated.jpg" alt="" referrerPolicy="no-referrer" />
        </picture>
      </div>

      <div className="w">
        <div className="fw-g">
          <div className="fw-left" style={{ visibility: "hidden" }}>
            {/* Kept empty to preserve desktop grid spacing */}
          </div>

          <div className="fw-txt" ref={txtScope}>
            {LINES.map((line, index) => (
              <p key={index} className="mt-4 first:mt-0">
                {line.split(/\s+/).map((word, wi) => (
                  <span key={wi} className="word-reveal-span mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </p>
            ))}

            {/* Frank Mondeose signature — resolves at/after the final line */}
            <div ref={sigRef} className="mt-8" style={{ opacity: 0 }}>
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

      <ScrollCue />
    </section>
  );
}
