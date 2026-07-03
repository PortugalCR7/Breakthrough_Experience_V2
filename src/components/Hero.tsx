import { useEffect, useState } from "react";
import { useParallax } from "../hooks/useParallax";
import ScrambleText from "./ScrambleText";
import ScrollCue from "./ScrollCue";
import { heroContent, HeroContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

/**
 * Section 01 — Hero.
 *
 * Full-bleed cinematic slideshow with the composed type anchored lower-left and
 * a subtle scrim for legibility; everything sits above the fold. A slide caption
 * + progress strip (lower-right) tracks the rotating image. Ported from the V2
 * sister site; the background drifts with a reduced-motion-aware parallax.
 */
export default function Hero() {
  const content = useSection<HeroContent>("hero", heroContent);

  const [olActive, setOlActive] = useState(false);
  const [wordsActive, setWordsActive] = useState<boolean[]>(Array(8).fill(false));
  const [gapActive, setGapActive] = useState(false);
  const [btmActive, setBtmActive] = useState(false);
  const [scrollGhostActive, setScrollGhostActive] = useState(false);
  const [currentBgIdx, setCurrentBgIdx] = useState(0);

  useEffect(() => {
    const len = content.backgroundImages.length;
    const interval = setInterval(() => {
      setCurrentBgIdx((prev) => (prev + 1) % len);
    }, 5600);
    return () => clearInterval(interval);
  }, [content.backgroundImages.length]);

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

  // Parallax is permitted only on non-essential imagery, at a whisper.
  // Constitution §VIII: no parallax on readable content; ≤ -0.08 on photos.
  const { elementRef, offset } = useParallax(-0.08);

  return (
    <section id="hero" className="relative overflow-hidden" data-theme="dark">
      {/* ── Layer 1 · Full-bleed cinematic slideshow ─────────────── */}
      <div
        ref={elementRef as any}
        className="hero-bg"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {content.backgroundImages.map((img, idx) => (
          <picture key={img.src}>
            <source type="image/webp" srcSet={img.webp} />
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={idx === 0 ? "high" : "low"}
              className={`hero-photo ${currentBgIdx === idx ? "is-active" : ""}`}
              referrerPolicy="no-referrer"
            />
          </picture>
        ))}
      </div>

      {/* ── Layer 2 · Scrim (legibility + cinema vignette) ───────── */}
      <div className="hero-scrim" aria-hidden="true" />



      {/* ── Layer 4 · Composed type, anchored lower-left ─────────── */}
      <div className="hero-in">
        <div id="hOl" className={`hero-ol ${olActive ? "s" : ""}`}>
          {content.eyebrow}
        </div>

        <div className="hero-main">
          <h1 className="hero-hl">
            <span className="wc">
              <span className={`wi ${wordsActive[0] ? "s" : ""}`}>{content.headlineWords[0]}</span>
            </span>{" "}
            <span className="wc">
              <span className={`wi ${wordsActive[1] ? "s" : ""}`}>{content.headlineWords[1]}</span>
            </span>
            <br />
            <span className="wc">
              <span className={`wi ${wordsActive[2] ? "s" : ""}`}>{content.headlineWords[2]}</span>
            </span>{" "}
            <span className="wc">
              <span className={`wi ${wordsActive[3] ? "s" : ""}`}>{content.headlineWords[3]}</span>
            </span>
            <br />
            <span className="wc">
              <span className={`wi ${wordsActive[4] ? "s" : ""}`}>{content.headlineWords[4]}</span>
            </span>{" "}
            <span className="wc">
              <span className={`wi ${wordsActive[5] ? "s" : ""}`}>{content.headlineWords[5]}</span>
            </span>{" "}
            <span className="wc">
              <span className={`wi ${wordsActive[6] ? "s" : ""}`}>{content.headlineWords[6]}</span>
            </span>
            <br />
            <span className="wc">
              <span className={`wi ${wordsActive[7] ? "s" : ""}`} style={{ color: "var(--sv)" }}>
                <ScrambleText text={content.headlineWords[7]} trigger={wordsActive[7]} duration={950} />
              </span>
            </span>
          </h1>

          <div id="hGap" className={`hero-gap ${gapActive ? "s" : ""}`}>
            <div className="gap-big tracking-tight">{content.subtitleLine1}</div>
            <div className="gap-sub">{content.subtitleLine2}</div>
          </div>

          <div id="hBtm" className={`hero-btm ${btmActive ? "s" : ""}`}>
            <div className="hero-cta-wrapper">
              <a
                href={content.ctaLink}
                className="btn-tactile"
                data-cursor-label="Begin"
              >
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

      {/* ── Layer 5 · Slide caption + progress (lower-right) ─────── */}
      <div className={`hero-caption ${scrollGhostActive ? "s" : ""}`} aria-hidden="true">
        <div className="hero-caption-meta">
          <span className="hero-caption-idx">
            {String(currentBgIdx + 1).padStart(2, "0")}{" "}
            <span className="hero-caption-sep">/</span>{" "}
            {String(content.backgroundImages.length).padStart(2, "0")}
          </span>
          <span className="hero-caption-name">{content.backgroundImages[currentBgIdx].name}</span>
        </div>
        <div className="hero-progress">
          {content.backgroundImages.map((_, idx) => (
            <span
              key={idx}
              className={`hero-progress-bar ${currentBgIdx === idx ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll indicator (Option A · unified editorial cue) ──── */}
      <ScrollCue />
    </section>
  );
}
