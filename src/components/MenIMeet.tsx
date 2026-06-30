import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import KineticText from "./KineticText";
import { ProfileItem } from "../types";
import { useWordScrub } from "../motion";

const PROFILES: ProfileItem[] = [
  {
    id: "p1",
    num: "PROFILE 01",
    title: "SUCCESSFUL<br />BUT LACKING<br />SOMETHING",
    body: "The income is real. The achievements are real. The respect is real. Yet somewhere between the last goal and the next one, life started feeling thinner than it should. <strong>Now you're looking for something success couldn't provide.</strong>",
    image: "/profile_01.png",
  },
  {
    id: "p2",
    num: "PROFILE 02",
    title: "PASSIONATE<br />BUT STILL<br />STRUGGLING",
    body: "Your fire isn't the problem. You have the vision. You have the ambition. You have the drive. What you lack is a structure strong enough to turn potential into consistent action. <strong>Most men don't need more motivation. They need accountability.</strong>",
    image: "/profile_02.png",
  },
  {
    id: "p3",
    num: "PROFILE 03",
    title: "THE MAN<br />IN&nbsp;EXISTENTIAL<br />CRISIS",
    body: "Something has fallen apart. A marriage. A business. A future you counted on. That feeling isn't failure. It's the first sign that your old way of living no longer works. <strong>The crisis is not the end. It's the beginning.</strong>",
    image: "/profile_03.png",
  },
];

export default function MenIMeet() {
  const [hdrRef, isHdrVisible] = useIntersectionObserver();
  const [gridRef, isGridVisible] = useIntersectionObserver();
  const [closerRef, isCloserVisible] = useIntersectionObserver();
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  return (
    <section id="meet" className="scroll-snap-section tex-glow">
      <div className="w">
        <div className="meet-hdr" ref={hdrRef as any}>
          <div className={`fu ${isHdrVisible ? "vis" : ""}`}>
            <div className="eyebrow">The Men I Meet</div>
            <h2 ref={hlScope} className="meet-hl" style={{ fontFamily: 'var(--fd)' }}>
              <span className="word-reveal-span">FOR</span>{" "}
              <span className="word-reveal-span">TWENTY</span>
              <br />
              <span className="word-reveal-span">YEARS.</span>
              <br />
              <span className="word-reveal-span">THE</span>{" "}
              <span className="word-reveal-span">SAME</span>
              <br />
              <span className="word-reveal-span">MAN.</span>
            </h2>
          </div>
          <div className={`fu ${isHdrVisible ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {/* Invisible eyebrow spacer: matches the left column's eyebrow height so the
                body's first line top-aligns with the headline's first line ("FOR"). */}
            <div className="eyebrow" aria-hidden="true" style={{ visibility: "hidden" }}>
              The Men I Meet
            </div>
            <div className="meet-intro text-left pt-0 mt-0 flex flex-col gap-4">
              <p className="leading-relaxed">
                <KineticText text="Different stories. Different conversations. The same realization: You already know there is more." />
              </p>
              <p className="leading-relaxed mt-2 text-stone-400">
                <KineticText text="You simply haven't been challenged, developed, or held accountable to that version of yourself." delay={1200} />
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridRef as any}
          className="profiles"
        >
          {PROFILES.map((profile, index) => (
            <div 
              key={profile.id} 
              className={`profile transition-all duration-[800ms] ease-out transform ${
                isGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              {profile.image && (
                <div className="p-band" aria-hidden="true">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={profile.image.replace(/\.png$/, ".webp")}
                    />
                    <img
                      src={profile.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const band = e.currentTarget.closest(".p-band") as HTMLElement | null;
                        if (band) band.style.display = "none";
                      }}
                    />
                  </picture>
                </div>
              )}
              <div className="p-n">{profile.num}</div>
              <div 
                className="p-lbl leading-none tracking-tight text-white mb-5 pb-[18px] border-b border-neutral-900"
                dangerouslySetInnerHTML={{ __html: profile.title }} 
              />
              <p
                className="p-body"
                dangerouslySetInnerHTML={{ __html: profile.body }}
              />
            </div>
          ))}
        </div>

        <div className={`closer fu ${isCloserVisible ? "vis" : ""}`} ref={closerRef as any}>
          <div className="closer-hd">
            DIFFERENT STORIES.
            <br />
            <span style={{ color: "var(--gl)" }}>SAME CHALLENGE.</span>
          </div>
          <div className="closer-b text-left text-stone-300">
            <p>This is not potential you lack.</p>
            <p className="mt-3">
              This is a lack of structure, accountability, and guidance equal to the man trying to emerge.
            </p>
            <p className="mt-3 text-white font-semibold">
              <strong>That's the gap. <span style={{ fontFamily: "var(--fd)", fontStyle: "italic", fontWeight: "bold" }}>Breakthrough was built to close it.</span></strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
