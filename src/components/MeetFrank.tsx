import { useRef, useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { gsap, useGSAP, prefersReducedMotion, useWordScrub } from "../motion";
import { meetFrankContent, MeetFrankContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

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
  const content = useSection<MeetFrankContent>("meet_frank", meetFrankContent);
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
        // No zoom on mobile — the 4/5 frame already shows the full figure, and
        // a scale-up would re-introduce the head/foot crop we just fixed.
        if (imgRef.current) gsap.set(imgRef.current, { scale: 1.0 });
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
                <picture>
                  <source type="image/webp" srcSet={content.portraitWebp} />
                  <img
                    ref={imgRef}
                    src={content.portraitImage}
                    alt="Frank Mondeose Portrait"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                  />
                </picture>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-950 to-black p-8 text-neutral-600 text-[10px] tracking-widest text-center uppercase select-none">
                  Frank Mondeose Portrait
                </div>
              )}
              {/* Frank Badge Overlay */}
              <div className="frank-badge absolute bottom-0 left-0 right-0 p-4 z-30 bg-gradient-to-t from-black/90 to-transparent">
                <div className="frank-badge-name">{content.badgeName}</div>
                <div className="frank-badge-ttl">{content.badgeTitle}</div>
              </div>
            </div>
          </div>

          <div ref={bioRef as any}>
            <div className={`eyebrow fu ${isBioVisible ? "vis" : ""}`}>{content.eyebrow}</div>
            <h2 ref={frankHlRef} className="frank-hl">
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[0]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[1]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[2]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[3]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[4]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[5]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[6]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[7]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[8]}</span>
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[9]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{content.headlineWords[10]}</span>
              <span className="word-reveal-span sv mr-[0.25em]">{content.headlineWords[11]}</span>
            </h2>

            <div className={`frank-b fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <p dangerouslySetInnerHTML={{ __html: content.bioParagraphs[0] }} />
              <p className="mt-4" dangerouslySetInnerHTML={{ __html: content.bioParagraphs[1] }} />
              <p className="mt-4" dangerouslySetInnerHTML={{ __html: content.bioParagraphs[2] }} />
              <p className="mt-4" dangerouslySetInnerHTML={{ __html: content.bioParagraphs[3] }} />
            </div>

            <h3 className={`frank-sub fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
              {content.subHeadline}
            </h3>
            <div className={`frank-b fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.25s" }}>
              <p dangerouslySetInnerHTML={{ __html: content.bioParagraphs[4] }} />
              <p className="mt-4" dangerouslySetInnerHTML={{ __html: content.bioParagraphs[5] }} />
            </div>

            <div className={`frank-close fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.3s" }}>
              {content.closingStatement}
            </div>

            <div className={`fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.35s" }}>
              <span className="tl-lbl">{content.timelineLabel}</span>
              <div className="tl" ref={timelineRef}>
                {content.timeline.map((row, i) => (
                  <div className="tl-row" key={i}>
                    <span className="tl-yr">{row.year}</span>
                    <span className="tl-dash">——</span>
                    <span
                      className="tl-ev"
                      style={row.highlight ? { color: "var(--sv)", fontWeight: 600 } : undefined}
                    >
                      {row.event}
                    </span>
                  </div>
                ))}
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
