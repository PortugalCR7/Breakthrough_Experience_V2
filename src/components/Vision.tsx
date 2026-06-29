import React, { useRef } from "react";
import { gsap, useGSAP } from "../motion";

/**
 * Phrase — a single typographic unit within the Vision spread.
 *
 * `register` controls the reveal timing to create compositional rhythm:
 *   - "connective": small prepositions/articles — start nearly visible (0.4), arrive first
 *   - "substantive": mid-weight nouns — standard scrub (0.15 → 1)
 *   - "declarative": the editorial thesis verbs — start invisible (0.0), arrive last and land hardest
 */
function Phrase({
  children,
  className,
  style,
  register = "substantive",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  register?: "connective" | "substantive" | "declarative";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const config = {
      connective:   { from: 0.4, start: "top 92%", end: "top 60%" },
      substantive:  { from: 0.15, start: "top 90%", end: "top 52%" },
      declarative:  { from: 0.0,  start: "top 88%", end: "top 44%" },
    }[register];

    gsap.fromTo(
      ref.current,
      { opacity: config.from },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: config.start,
          end: config.end,
          scrub: 1.2,
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * Section 01 — The Foundation / Vision statement.
 *
 * V3: Editorial Spread with identity alignment.
 * The copy becomes the composition. Typography variations (scale, weight,
 * italic, tracking) and positioning create a dynamic reading path.
 *
 * .sv glow now sits on the declarative verbs (THROUGH, LEADERSHIP) —
 * aligning with how .sv operates across every other headline on the page:
 * as a luminous accent on the most important word in the statement.
 *
 * Phrase reveals are differentiated by register:
 * connective (already visible) → substantive (standard) → declarative (delayed, hardest landing).
 */
export default function Vision() {
  return (
    <section
      id="vision"
      className="vision-stage scroll-snap-section relative w-full overflow-hidden"
    >
      <div className="w">
        <h2
          className="relative w-full aspect-[100/60] leading-none uppercase"
          style={{ fontFamily: 'var(--fd)' }}
        >
          {/* 1. FOR OVER — connective */}
          <Phrase register="connective" className="absolute flex gap-[0.4em] font-light tracking-[0.05em] vision-phrase--connective" style={{ top: '17.5%', left: '0%' }}>
            <span>FOR</span>
            <span>OVER</span>
          </Phrase>
          
          {/* 2. TWENTY YEARS — substantive (scale carries weight, not glow) */}
          <Phrase register="substantive" className="absolute flex gap-[0.3em] font-normal vision-phrase--substantive" style={{ top: '21%', left: '6%' }}>
            <span>TWENTY</span>
            <span>YEARS</span>
          </Phrase>
          
          {/* 3. I'VE HELPED MEN — connective */}
          <Phrase register="connective" className="absolute flex gap-[0.4em] font-light tracking-[0.05em] vision-phrase--connective" style={{ top: '31.5%', left: '16%' }}>
            <span>I'VE</span>
            <span>HELPED</span>
            <span>MEN</span>
          </Phrase>
          
          {/* 4. CLOSE THAT GAP — substantive */}
          <Phrase register="substantive" className="absolute flex gap-[0.3em] font-normal vision-phrase--substantive" style={{ top: '31%', left: '38%' }}>
            <span>CLOSE</span>
            <span>THAT</span>
            <span>GAP</span>
          </Phrase>
          
          <Phrase register="declarative" className="absolute italic font-bold vision-phrase--declarative tracking-[-0.03em]" style={{ top: '42%', left: '17%' }}>
            <span className="edt-emphasis edt-emphasis--bodoni edt-emphasis--accent edt-emphasis--glow">THROUGH</span>
          </Phrase>
          
          {/* 6. STRUCTURE, — substantive */}
          <Phrase register="substantive" className="absolute font-normal vision-phrase--substantive" style={{ top: '62%', left: '23%' }}>
            <span>STRUCTURE,</span>
          </Phrase>
          
          {/* 7. ACCOUNTABILITY, — substantive */}
          <Phrase register="substantive" className="absolute font-normal vision-phrase--substantive" style={{ top: '72%', left: '33%' }}>
            <span>ACCOUNTABILITY,</span>
          </Phrase>
          
          {/* 8. AND HONEST — connective */}
          <Phrase register="connective" className="absolute flex gap-[0.4em] font-light tracking-[0.05em] vision-phrase--connective" style={{ top: '82.75%', left: '19%' }}>
            <span>AND</span>
            <span>HONEST</span>
          </Phrase>
          
          <Phrase register="declarative" className="absolute italic font-bold vision-phrase--declarative tracking-[-0.03em]" style={{ top: '81%', left: '34%' }}>
            <span className="edt-emphasis edt-emphasis--bodoni edt-emphasis--accent edt-emphasis--glow">LEADERSHIP</span>
          </Phrase>
        </h2>
      </div>
    </section>
  );
}
