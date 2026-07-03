import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { whatThisIsContent, WhatThisIsContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

/**
 * Section 04 — What This Actually Is.
 *
 * Reworked from two stacked scroll-scrubbed pins (150vh + 300vh) into a single
 * natural-flow section. The intro passage reveals word-by-word on view, and the
 * six sessions cascade in with a staggered block reveal. No translate-scrub, no
 * per-frame React state — smooth and GPU-friendly.
 */
export default function WhatThisActuallyIs() {
  const content = useSection<WhatThisIsContent>("what_this_is", whatThisIsContent);
  const [topRef, isTopVisible] = useScrollFadeIn({ threshold: 0.2 });
  const passageScope = useRef<HTMLDivElement | null>(null);
  useWordScrub(passageScope);
  const progHlRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(progHlRef);
  const sessHlRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(sessHlRef);
  const [workHeadRef, isWorkHeadVisible] = useScrollFadeIn({ threshold: 0.25 });
  const [listRef, isListVisible] = useScrollFadeIn({ threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
  const [codaRef, isCodaVisible] = useScrollFadeIn({ threshold: 0.25 });

  // headlineWords: ["THIS","IS","NOT","A","PROGRAM","IT'S","A","STRUCTURED","PATH","TO","CLOSE","THE","PERFORMANCE","GAP","FOR","GOOD."]
  // <br /> after indices 2,4,7,10,12 — layout encoded in JSX
  const hw = content.headlineWords;
  // sessionsHeadlineWords: ["SIX","SESSIONS.","ONE","DIRECTION."] — <br /> after index 1
  const shw = content.sessionsHeadlineWords;

  return (
    <section id="prog-sec" className="scroll-snap-section relative w-full overflow-hidden">
      <div className="w">

        {/* Top — definition + the "not this" chips + passage */}
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-12 md:gap-24 items-start mb-[clamp(80px,12vw,150px)]">

          {/* Asymmetric Left metadata panel */}
          <div ref={topRef as any} className="flex flex-col gap-4">
            <div className={`fu ${isTopVisible ? "vis" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="section-num">{content.sectionNumber}</div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2
              ref={progHlRef}
              className="text-stone-100 text-[length:clamp(30px,4.6vw,60px)] font-light leading-[0.88] tracking-[-0.025em] uppercase"
              style={{ fontFamily: "var(--fd)" }}
            >
              <span className="word-reveal-span mr-[0.25em]">{hw[0]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[1]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[2]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[3]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[4]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[5]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[6]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[7]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[8]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[9]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[10]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[11]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[12]}</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">{hw[13]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[14]}</span>
              <span className="word-reveal-span mr-[0.25em]">{hw[15]}</span>
            </h2>

            <div className={`fu ${isTopVisible ? "vis" : ""}`} style={{ transitionDelay: "0.25s" }}>
              {/* Passage — scrubbed word-by-word narration (leads the block) */}
              <div ref={passageScope} className="is-box vis">
                <p>
                  {content.passageWords.map((word, index) => (
                    <span key={`pass-word-${index}`} className="word-reveal-span mr-[0.25em]">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Lead-in + the "not this" chips */}
              <div className="not-lead font-bold">{content.notLeadText}</div>
              <div className="not-row flex flex-wrap gap-x-6 gap-y-3">
                {content.notItems.map((item) => (
                  <div key={item} className="not-item group cursor-pointer">
                    <span className="x mr-2">✕</span>
                    <s className="transition-colors duration-300 group-hover:text-[var(--gl)]">{item}</s>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="mt-16 flex justify-start w-full">
                <a href={content.ctaLink} className="btn-tactile">
                  <span className="btn-tactile-wrap">
                    <span className="btn-tactile-text">{content.ctaText}</span>
                    <span className="btn-tactile-hover">{content.ctaText}</span>
                  </span>
                  <span className="btn-tactile-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* The Work — six sessions */}
        <div ref={workHeadRef as any} className={`fu ${isWorkHeadVisible ? "vis" : ""}`}>
          <div className="eyebrow mb-4">{content.sessionsEyebrow}</div>
          <h3 ref={sessHlRef} className="sess-hl text-left uppercase mb-12">
            <span className="word-reveal-span mr-[0.25em]">{shw[0]}</span>
            <span className="word-reveal-span mr-[0.25em]">{shw[1]}</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">{shw[2]}</span>
            <span className="word-reveal-span mr-[0.25em]">{shw[3]}</span>
          </h3>
        </div>

        <div
          ref={listRef as any}
          className="sess-list divide-y divide-neutral-900 border-t border-b border-neutral-900"
        >
          {content.sessions.map((session, index) => (
            <div
              key={session.id}
              className={`group relative grid grid-cols-1 md:grid-cols-[60px_240px_1fr] gap-6 md:gap-12 py-5 px-4 md:px-8 hover:bg-neutral-900/40 cursor-pointer block-reveal-item ${
                isListVisible ? "active" : ""
              }`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--sv)] scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100" />

              <div className="sr-n group-hover:text-[var(--sv)] transition-colors duration-300">
                {session.num}
              </div>
              <div className="sr-t group-hover:opacity-100 transition-opacity duration-300">
                {session.title}
              </div>
              <div className="sr-d group-hover:text-stone-300 transition-colors">
                {session.description}
              </div>
            </div>
          ))}
        </div>

        {/* Coda */}
        <div
          ref={codaRef as any}
          className={`prog-def gen-reveal ${isCodaVisible ? "vis" : ""}`}
          style={{ marginTop: "40px" }}
        >

        </div>
      </div>
    </section>
  );
}
