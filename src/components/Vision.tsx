import React, { useRef } from "react";
import { gsap, useGSAP } from "../motion";
import ScrollCue from "./ScrollCue";

/**
 * Phrase — a single typographic unit within the Vision spread.
 * Under this prototype, individual scrollTriggers are deactivated.
 * All phrases are animated from a single timeline on the pinned parent container.
 */
function Phrase({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  register?: "connective" | "substantive" | "declarative";
}) {
  return (
    <div className={`vision-phrase ${className || ""}`} style={style}>
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
 * aligning with how .sv operates across every other headline on the page.
 *
 * Prototype Reveal:
 * - Pinned container setup.
 * - All phrases start at 0.2 opacity.
 * - Staggered sequential fade-in to 1.0 opacity on scroll scrub.
 */
export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const phrases = gsap.utils.toArray<HTMLElement>(".vision-phrase", section);
    if (!phrases.length) return;

    // Set all phrases to start at baseline opacity of approximately 0.2
    gsap.set(phrases, { opacity: 0.2 });

    // Create a timeline that pins the section and drives opacity reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%", // Pin length/scroll distance
        pin: true,
        pinSpacing: true,
        scrub: 1.0,
        anticipatePin: 1,
      },
    });

    // Sequentially reveal each phrase
    phrases.forEach((phrase, index) => {
      tl.to(
        phrase,
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 1,
        },
        index * 0.8 // Sequence timing
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="vision"
      ref={sectionRef}
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

      <ScrollCue />
    </section>
  );
}
