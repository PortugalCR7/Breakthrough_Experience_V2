import React, { useRef } from "react";
import { gsap, useGSAP } from "../motion";

function Phrase({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { opacity: 0.15 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
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
 * V2: Immersive Editorial Spread. The copy becomes the composition.
 * Driven entirely by typography variations (scale, weight, italic, tracking)
 * and positioning to create a dynamic reading path.
 */
export default function Vision() {
  return (
    <section
      id="vision"
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--sp)", paddingBottom: "var(--sp)" }}
    >
      <div className="w">
        <h2
          className="relative w-full aspect-[100/60] leading-none uppercase"
          style={{ fontFamily: 'var(--fd)' }}
        >
          {/* 1. FOR OVER */}
          <Phrase className="absolute flex gap-[0.4em] font-light tracking-[0.05em] text-[2vw]" style={{ top: '15%', left: '13%' }}>
            <span>FOR</span>
            <span>OVER</span>
          </Phrase>
          
          {/* 2. TWENTY YEARS */}
          <Phrase className="absolute flex gap-[0.3em] font-normal text-[5.5vw]" style={{ top: '21%', left: '16%' }}>
            <span className="sv">TWENTY</span>
            <span className="sv">YEARS</span>
          </Phrase>
          
          {/* 3. I'VE HELPED MEN */}
          <Phrase className="absolute flex gap-[0.4em] font-light tracking-[0.05em] text-[2vw]" style={{ top: '32%', left: '29%' }}>
            <span>I'VE</span>
            <span>HELPED</span>
            <span>MEN</span>
          </Phrase>
          
          {/* 4. CLOSE THAT GAP */}
          <Phrase className="absolute flex gap-[0.3em] font-normal text-[5.5vw]" style={{ top: '36%', left: '41%' }}>
            <span className="sv">CLOSE</span>
            <span className="sv">THAT</span>
            <span className="sv">GAP</span>
          </Phrase>
          
          {/* 5. THROUGH */}
          <Phrase className="absolute italic font-bold text-[10.5vw] tracking-[-0.03em]" style={{ top: '44%', left: '17%' }}>
            <span>THROUGH</span>
          </Phrase>
          
          {/* 6. STRUCTURE, */}
          <Phrase className="absolute font-normal text-[5.5vw]" style={{ top: '60%', left: '19%' }}>
            <span className="sv">STRUCTURE,</span>
          </Phrase>
          
          {/* 7. ACCOUNTABILITY, */}
          <Phrase className="absolute font-normal text-[5.5vw]" style={{ top: '68%', left: '33%' }}>
            <span className="sv">ACCOUNTABILITY,</span>
          </Phrase>
          
          {/* 8. AND HONEST */}
          <Phrase className="absolute flex gap-[0.4em] font-light tracking-[0.05em] text-[2vw]" style={{ top: '79%', left: '17%' }}>
            <span>AND</span>
            <span>HONEST</span>
          </Phrase>
          
          {/* 9. LEADERSHIP */}
          <Phrase className="absolute italic font-bold text-[10vw] tracking-[-0.03em]" style={{ top: '83%', left: '34%' }}>
            <span>LEADERSHIP</span>
          </Phrase>
        </h2>
      </div>
    </section>
  );
}
