import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { SessionItem } from "../types";
import { useWordScrub } from "../motion";

const SESSIONS: SessionItem[] = [
  {
    id: "s1",
    num: "01 ·",
    title: "THE DIAGNOSTIC",
    description: "We identify where your energy is going. What's serving you. What's costing you. What needs to change.",
  },
  {
    id: "s2",
    num: "02 ·",
    title: "THE GAP",
    description: "We name the distance between your current reality and your potential. Clearly. Directly. Without excuses.",
  },
  {
    id: "s3",
    num: "03 ·",
    title: "THE INTERRUPTION",
    description: "The patterns holding you back are challenged. Blind spots become visible. Standards rise.",
  },
  {
    id: "s4",
    num: "04 ·",
    title: "THE RETURN",
    description: "Clarity returns. Direction returns. Self-trust returns. The man underneath the performance begins leading again.",
  },
  {
    id: "s5",
    num: "05 ·",
    title: "THE ANCHOR",
    description: "What you've discovered becomes stable. Not something you perform. Something you stand on.",
  },
  {
    id: "s6",
    num: "06 ·",
    title: "THE INTEGRATION",
    description: "The work moves into real life. Relationships. Business. Leadership. Brotherhood. The goal is not insight. The goal is embodiment.",
  },
];

const NOT_ITEMS = [
  "Therapy",
  "A mastermind",
  "A weekend retreat",
  "Another course",
  "Another collection of theories",
];

const PASSAGE_WORDS = [
  "Breakthrough", "is", "six", "weeks", "of", "focused", "attention", "on", "the", "man", "behind", "your",
  "current", "results.", "The", "goal", "is", "simple:", "to", "help", "you", "become", "the", "man", "you",
  "already", "know", "you", "are", "capable", "of", "being."
];

/**
 * Section 04 — What This Actually Is.
 *
 * Reworked from two stacked scroll-scrubbed pins (150vh + 300vh) into a single
 * natural-flow section. The intro passage reveals word-by-word on view, and the
 * six sessions cascade in with a staggered block reveal. No translate-scrub, no
 * per-frame React state — smooth and GPU-friendly.
 */
export default function WhatThisActuallyIs() {
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

  return (
    <section id="prog-sec" className="scroll-snap-section relative w-full overflow-hidden">
      <div className="w">

        {/* Top — definition + the "not this" chips + passage */}
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2.2fr] gap-12 md:gap-24 items-start mb-[clamp(80px,12vw,150px)]">

          {/* Asymmetric Left metadata panel */}
          <div ref={topRef as any} className="flex flex-col gap-4">
            <div className={`fu ${isTopVisible ? "vis" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <div className="section-num">04</div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2
              ref={progHlRef}
              className="text-stone-100 text-[length:var(--h2)] font-light leading-[0.88] tracking-[-0.025em] uppercase"
              style={{ fontFamily: "var(--fd)" }}
            >
              <span className="word-reveal-span mr-[0.25em]">THIS</span>
              <span className="word-reveal-span mr-[0.25em]">IS</span>
              <span className="word-reveal-span mr-[0.25em]">NOT</span>
              <span className="word-reveal-span mr-[0.25em]">A</span>
              <span className="word-reveal-span mr-[0.25em]">PROGRAM.</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">IT</span>
              <span className="word-reveal-span mr-[0.25em]">IS</span>
              <span className="word-reveal-span mr-[0.25em]">A</span>
              <span className="word-reveal-span mr-[0.25em]">STRUCTURED</span>
              <span className="word-reveal-span mr-[0.25em]">PATH</span>
              <br />
              <span className="word-reveal-span mr-[0.25em]">TO</span>
              <span className="word-reveal-span mr-[0.25em]">CLOSE</span>
              <span className="word-reveal-span mr-[0.25em]">THE</span>
              <span className="word-reveal-span mr-[0.25em]">PERFORMANCE</span>
              <span className="word-reveal-span mr-[0.25em]">GAP.</span>
            </h2>

            <div className={`fu ${isTopVisible ? "vis" : ""}`} style={{ transitionDelay: "0.25s" }}>
              {/* Passage — scrubbed word-by-word narration (leads the block) */}
              <div ref={passageScope} className="is-box vis">
                <p>
                  {PASSAGE_WORDS.map((word, index) => (
                    <span key={`pass-word-${index}`} className="word-reveal-span mr-[0.25em]">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Lead-in + the "not this" chips */}
              <div className="not-lead">Breakthrough is not…</div>
              <div className="not-row flex flex-wrap gap-x-6 gap-y-3">
                {NOT_ITEMS.map((item) => (
                  <div key={item} className="not-item group cursor-pointer">
                    <span className="x mr-2">✕</span>
                    <s className="transition-colors duration-300 group-hover:text-[var(--gl)]">{item}</s>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Work — six sessions */}
        <div ref={workHeadRef as any} className={`fu ${isWorkHeadVisible ? "vis" : ""}`}>
          <div className="eyebrow mb-4">The Path</div>
          <h3 ref={sessHlRef} className="sess-hl text-left uppercase mb-12">
            <span className="word-reveal-span mr-[0.25em]">SIX</span>
            <span className="word-reveal-span mr-[0.25em]">SESSIONS.</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">ONE</span>
            <span className="word-reveal-span mr-[0.25em]">DIRECTION.</span>
          </h3>
        </div>

        <div
          ref={listRef as any}
          className="sess-list divide-y divide-neutral-900 border-t border-b border-neutral-900"
        >
          {SESSIONS.map((session, index) => (
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
