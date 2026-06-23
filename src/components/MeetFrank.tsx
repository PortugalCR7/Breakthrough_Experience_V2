import React, { useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useParallax } from "../hooks/useParallax";

export default function MeetFrank() {
  const [photoRef, isPhotoVisible] = useScrollFadeIn({ threshold: 0.1 });
  const [bioRef, isBioVisible] = useScrollFadeIn({ threshold: 0.1 });
  const [imgFailed, setImgFailed] = useState(false);
  const { elementRef: parallaxRef, offset: parallaxOffset } = useParallax(-0.1);

  return (
    <section id="frank" className="scroll-snap-section tex-glow tex-glow--alt">
      <div className="ww">
        <div className="frank-g">
          <div
            ref={(node) => {
              // Combine both intersection observer and parallax references
              (photoRef as any).current = node;
              parallaxRef.current = node;
            }}
            className={`frank-photo-col fi ${isPhotoVisible ? "vis" : ""} bg-neutral-900`}
          >
            <div className="frank-portrait relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-lg">
              {!imgFailed ? (
                <img
                  src="/frank_founder_updated.jpg"
                  alt="Frank Mondeose Portrait"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-75 ease-out scale-110"
                  style={{ transform: `scale(1.15) translateY(${parallaxOffset}px)` }}
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
            <h2 className={`frank-hl fu ${isBioVisible ? "vis" : ""}`} style={{ transitionDelay: "0.1s" }}>
              I DID NOT BUILD
              <br />
              THIS FROM THEORY.
              <br />
              I EARNED IT
              <br />
              THROUGH <span className="sv">EXPERIENCE.</span>
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
              <div className="tl">
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
