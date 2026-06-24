import { useRef, useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { gsap, useGSAP, prefersReducedMotion, useWordScrub } from "../motion";

/**
 * Section — Meet Frank.
 *
 * V2 scroll choreography (desktop only):
 *  - the portrait column PINS while the long bio scrolls past it (editorial
 *    "held image" beat),
 *  - the portrait drifts with a scrubbed parallax for depth,
 *  - the career timeline rows "draw in" as the reader scrolls the timeline.
 * Touch screens stack normally with a light reveal — no pin, native momentum.
 * Replaces the old per-frame useParallax (React-state-on-scroll) entirely.
 */
export default function MeetFrank() {
  const [bioRef, isBioVisible] = useScrollFadeIn({ threshold: 0.1 });
  const [imgFailed, setImgFailed] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const photoColRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const frankHlRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(frankHlRef);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion()) {
        if (imgRef.current) gsap.set(imgRef.current, { scale: 1.12 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // The portrait column holds via native CSS `position: sticky` (.frank-photo-col),
        // which releases exactly when the grid's bottom — the timeline's last row
        // (2026 BREAKTHROUGH) — reaches the image's bottom edge. That gives the
        // flush bottom-lock for free; a GSAP pin here only fought the sticky and
        // dragged the image behind the next section, so it's intentionally gone.

        // Scrubbed portrait parallax (depth).
        if (imgRef.current) {
          gsap.set(imgRef.current, { scale: 1.16 });
          gsap.fromTo(
            imgRef.current,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
        // Timeline rows draw in on scroll.
        timelineDraw(timelineRef.current, true);
      });

      mm.add("(max-width: 767.98px)", () => {
        if (imgRef.current) gsap.set(imgRef.current, { scale: 1.12 });
        timelineDraw(timelineRef.current, false);
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} id="frank" className="scroll-snap-section tex-glow tex-glow--alt">
      <div className="ww">
        <div className="frank-g">
          <div ref={photoColRef} className="frank-photo-col bg-neutral-900">
            <div className="frank-portrait relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-lg">
              {!imgFailed ? (
                <img
                  ref={imgRef}
                  src="/frank_founder_updated.jpg"
                  alt="Frank Mondeose Portrait"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-950 to-black p-8 text-neutral-600 text-[10px] tracking-widest text-center uppercase select-none">
                  Frank Mondeose Portrait
                </div>
              )}
              {/* Frank Badge Overlay */}
              <div className="frank-badge absolute bottom-0 left-0 right-0 p-4 z-30 bg-gradient-to-t from-black/90 to-transparent">
                <div className="frank-badge-name">FRANK MONDEOSE</div>
                <div className="frank-badge-ttl">
                  Teacher of Teachers · Mentor to Men on the Cusp of Impact
                </div>
              </div>
            </div>
          </div>

          <div ref={bioRef as any}>
            <div className={`eyebrow fu ${isBioVisible ? "vis" : ""}`}>Meet Frank</div>
            <h2 ref={frankHlRef} className="frank-hl">
              <span className="word-reveal-span mr-[0.25em]">I</span>
              <span className="word-reveal-span mr-[0.25em]">DID</span>
              <span className="word-reveal-span mr-[0.25em]">NOT</span>
              <span className="word-reveal-span mr-[0.25em]">BUILD</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">THIS</span>
              <span className="word-reveal-span mr-[0.25em]">FROM</span>
              <span className="word-reveal-span mr-[0.25em]">THEORY.</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">I</span>
              <span className="word-reveal-span mr-[0.25em]">EARNED</span>
              <span className="word-reveal-span mr-[0.25em]">IT</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">THROUGH</span>
              <span className="word-reveal-span sv mr-[0.25em]">EXPERIENCE.</span>
            </h2>

            <div className={`frank-b fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <p>
                For over twenty years, I have worked in some of the most demanding arenas
                of human development: Entrepreneurship. Leadership. Men's Work. Cultural
                Architecture. Development of Visionary Land-Based Projects.
              </p>
              <p className="mt-4">
                I have founded companies. Produced large-scale events. Developed
                curriculum. Trained facilitators. Mentored leaders. Built communities. And
                sat with men through loss, reinvention, success, failure, and breakthrough.
              </p>
              <p className="mt-4">
                What I bring into this work is not information. It is perspective earned
                through experience.
              </p>
              <p className="mt-4">
                For twenty years, men have arrived at my door carrying different stories
                but the same question: <em>"Why am I not living the life I know I'm capable of?"</em>{" "}
                I've asked that question myself.
              </p>
            </div>

            <h3 className={`frank-sub fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
              That's why this work matters to me.
            </h3>
            <div className={`frank-b fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.25s" }}>
              <p>
                Not because men need fixing. Because too many capable men settle for
                less than they know is possible.
              </p>
              <p className="mt-4">
                Over two decades, one truth has become clear: Most men do not need more
                advice. They need structure. They need accountability. They need someone
                capable of seeing the man they can become and refusing to negotiate with
                anything less.
              </p>
            </div>

            <div className={`frank-close fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.3s" }}>
              I do not work with men who want to be fixed. I work with men who are ready to lead.
            </div>

            <div className={`fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.35s" }}>
              <span className="tl-lbl">The path that built Breakthrough</span>
              <div className="tl" ref={timelineRef}>
                <div className="tl-row">
                  <span className="tl-yr">2005</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev">Founded Monde Osé</span>
                </div>
                <div className="tl-row">
                  <span className="tl-yr">2013</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev">The Spiritual Playboy</span>
                </div>
                <div className="tl-row">
                  <span className="tl-yr">2015</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev">International Facilitation Begins</span>
                </div>
                <div className="tl-row">
                  <span className="tl-yr">2019</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev">Brotherhood Development</span>
                </div>
                <div className="tl-row">
                  <span className="tl-yr">2020</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev">Curriculum &amp; Faculty Leadership</span>
                </div>
                <div className="tl-row">
                  <span className="tl-yr">2023</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev">Caracara Village + Nature Reserve</span>
                </div>
                <div className="tl-row">
                  <span className="tl-yr">2026</span>
                  <span className="tl-dash">——</span>
                  <span className="tl-ev" style={{ color: "var(--sv)", fontWeight: 600 }}>Breakthrough</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── local helpers (kept here so the section is self-contained) ── */

function timelineDraw(tl: HTMLDivElement | null, scrub: boolean) {
  if (!tl) return;
  const rows = gsap.utils.toArray<HTMLElement>(".tl-row", tl);
  if (!rows.length) return;
  gsap.from(rows, {
    opacity: 0,
    y: 22,
    ease: scrub ? "none" : "power2.out",
    stagger: scrub ? { each: 0.08 } : 0.06,
    scrollTrigger: scrub
      ? { trigger: tl, start: "top 85%", end: "bottom 60%", scrub: true }
      : { trigger: tl, start: "top 85%", once: true },
  });
}
