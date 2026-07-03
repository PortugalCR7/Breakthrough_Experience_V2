import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import KineticText from "./KineticText";
import { useWordScrub } from "../motion";
import { menIMeetContent, MenIMeetContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function MenIMeet() {
  const content = useSection<MenIMeetContent>("men_i_meet", menIMeetContent);
  const [hdrRef, isHdrVisible] = useIntersectionObserver();
  const [gridRef, isGridVisible] = useIntersectionObserver();
  const [closerRef, isCloserVisible] = useIntersectionObserver();
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  // headlineWords: ["FOR","TWENTY","YEARS.","THE","SAME","MAN."]
  const hw = content.headlineWords;

  return (
    <section id="meet" className="scroll-snap-section tex-glow">
      <div className="w">
        <div className="meet-hdr" ref={hdrRef as any}>
          <div className={`fu ${isHdrVisible ? "vis" : ""}`}>
            <div className="eyebrow">{content.eyebrow}</div>
            <h2 ref={hlScope} className="meet-hl" style={{ fontFamily: 'var(--fd)' }}>
              <span className="word-reveal-span">{hw[0]}</span>{" "}
              <span className="word-reveal-span">{hw[1]}</span>
              <br />
              <span className="word-reveal-span">{hw[2]}</span>
              <br />
              <span className="word-reveal-span">{hw[3]}</span>{" "}
              <span className="word-reveal-span">{hw[4]}</span>
              <br />
              <span className="word-reveal-span">{hw[5]}</span>
            </h2>
          </div>
          <div className={`fu ${isHdrVisible ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {/* Invisible eyebrow spacer: matches the left column's eyebrow height so the
                body's first line top-aligns with the headline's first line ("FOR"). */}
            <div className="eyebrow" aria-hidden="true" style={{ visibility: "hidden" }}>
              {content.eyebrow}
            </div>
            <div className="meet-intro text-left pt-0 mt-0 flex flex-col gap-4">
              <p className="leading-relaxed">
                <KineticText text={content.introLine1} />
              </p>
              <p className="leading-relaxed mt-2 text-stone-400">
                <KineticText text={content.introLine2} delay={1200} />
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridRef as any}
          className="profiles"
        >
          {content.profiles.map((profile, index) => (
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
            {content.closerHeadline.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === 1 ? <span style={{ color: "var(--gl)" }}>{line}</span> : line}
              </span>
            ))}
          </div>
          <div
            className="closer-b text-left text-stone-300"
            dangerouslySetInnerHTML={{ __html: content.closerBody }}
          />
        </div>
      </div>
    </section>
  );
}
