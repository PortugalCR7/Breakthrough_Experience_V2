import { useEffect, useState, useRef } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";
import ScrambleText from "./ScrambleText";

export default function Hero() {
  const magneticRef = useMagnetic({ strength: 0.35 });
  const [olActive, setOlActive] = useState(false);
  const [wordsActive, setWordsActive] = useState<boolean[]>(Array(8).fill(false));
  const [gapActive, setGapActive] = useState(false);
  const [btmActive, setBtmActive] = useState(false);
  const [scrollGhostActive, setScrollGhostActive] = useState(false);
  
  const bgImages = [
    "/bg_forest.png",
    "/bg_dojo.png",
    "/bg_cabin.png"
  ];
  const [currentBgIdx, setCurrentBgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIdx((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Stage 1: Eyebrow text fades in
    const olTimer = setTimeout(() => setOlActive(true), 320);

    // Stage 2: Hero title words animate sequentially
    const wordTimers = Array(8)
      .fill(null)
      .map((_, i) =>
        setTimeout(() => {
          setWordsActive((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 700 + i * 100)
      );

    const totalWordsTime = 700 + 7 * 100 + 720;

    // Stage 3: Subtitle gap
    const gapTimer = setTimeout(() => setGapActive(true), totalWordsTime - 400);

    // Stage 4: CTA Button
    const btmTimer = setTimeout(() => setBtmActive(true), totalWordsTime - 100);

    // Stage 5: Scroll line indicator and back-glow background text
    const scrollGhostTimer = setTimeout(() => {
      setScrollGhostActive(true);
    }, totalWordsTime + 300);

    return () => {
      clearTimeout(olTimer);
      clearTimeout(gapTimer);
      clearTimeout(btmTimer);
      clearTimeout(scrollGhostTimer);
      wordTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  // Cinematic scroll-out: background drifts down (parallax depth) while the
  // content lifts and dissolves as the reader leaves the first screen. Scrubbed
  // through GSAP/Lenis — replaces the old per-frame useParallax React state.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const hero = heroRef.current;
      if (!hero) return;
      const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      if (photoRef.current) {
        gsap.to(photoRef.current, { yPercent: 14, ease: "none", scrollTrigger: st });
      }
      if (contentRef.current) {
        gsap.to(contentRef.current, { yPercent: -10, opacity: 0.12, ease: "none", scrollTrigger: st });
      }
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} id="hero" className="relative grid min-h-screen scroll-snap-section">
      <div
        id="hGhost"
        className={`hero-ghost ${scrollGhostActive ? "s" : ""}`}
      >
        BREAKTHROUGH
      </div>
      <div ref={contentRef} className="hero-in relative z-10">
        <div id="hOl" className={`hero-ol ${olActive ? "s" : ""}`}>
          BREAKTHROUGH WITH FRANK MONDEOSE
        </div>
        <h1 className="hero-hl">
          <span className="wc">
            <span className={`wi ${wordsActive[0] ? "s" : ""}`}>THE</span>
          </span>{" "}
          <span className="wc">
            <span className={`wi ${wordsActive[1] ? "s" : ""}`}>DOJO</span>
          </span>
          <br />
          <span className="wc">
            <span className={`wi ${wordsActive[2] ? "s" : ""}`}>FOR</span>
          </span>{" "}
          <span className="wc">
            <span className={`wi ${wordsActive[3] ? "s" : ""}`}>MEN</span>
          </span>
          <br />
          <span className="wc">
            <span className={`wi ${wordsActive[4] ? "s" : ""}`}>ON</span>
          </span>{" "}
          <span className="wc">
            <span className={`wi ${wordsActive[5] ? "s" : ""}`}>THE</span>
          </span>{" "}
          <span className="wc">
            <span className={`wi ${wordsActive[6] ? "s" : ""}`}>CUSP</span>
          </span>
          <br />
          <span className="wc">
            <span className={`wi ${wordsActive[7] ? "s" : ""}`} style={{ color: "var(--sv)" }}>
              <ScrambleText text="OF IMPACT" trigger={wordsActive[7]} duration={950} />
            </span>
          </span>
        </h1>
        <div id="hGap" className={`hero-gap ${gapActive ? "s" : ""}`}>
          <div className="gap-big tracking-tight">THE GAP IS NOT YOUR POTENTIAL.</div>
          <div className="gap-sub text-slate-300">
            It's the distance between the man you're living as and the man you
            know you can be.
          </div>
        </div>
        <div id="hBtm" className={`hero-btm ${btmActive ? "s" : ""}`}>
          <div className="hero-cta-wrapper">
            <a ref={magneticRef as any} href="#checkout" className="btn-tactile" data-cursor-label="Begin">
              <span className="btn-tactile-wrap">
                <span className="btn-tactile-text">Begin Your Breakthrough</span>
                <span className="btn-tactile-hover">Begin Your Breakthrough</span>
              </span>
              <span className="btn-tactile-arrow">→</span>
            </a>
            <div className="hero-social-proof">
              <div className="avatar-cluster">
                <div className="avatar-circle">M</div>
                <div className="avatar-circle">L</div>
                <div className="avatar-circle">D</div>
                <div className="avatar-circle">+100</div>
              </div>
              <span className="social-proof-text">
                Trusted by 100+ leaders & founders globally
              </span>
            </div>
          </div>
        </div>
        <div
          id="hScroll"
          className={`hero-scroll ${scrollGhostActive ? "s" : ""}`}
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="scroll-arrow" aria-hidden="true">
            <path d="M7 2V18M7 18L2 13M7 18L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="scroll-text">scroll</span>
        </div>
      </div>
      <div
        ref={photoRef}
        className="hero-photo-col relative overflow-hidden z-1 bg-neutral-950 flex items-center justify-center"
      >
        {bgImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Hero Background ${idx + 1}`}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out hero-photo"
            style={{
              opacity: currentBgIdx === idx ? 0.62 : 0,
              filter: "grayscale(100%) brightness(0.72) contrast(1.08)",
              transform: "scale(1.15)",
            }}
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </section>
  );
}
