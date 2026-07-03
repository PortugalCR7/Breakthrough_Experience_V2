import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWordScrub } from "../motion";
import { testimonialContent, TestimonialContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Testimonials() {
  const content = useSection<TestimonialContent>("testimonials", testimonialContent);
  const [ref1, isVisible1] = useIntersectionObserver();
  const [ref2, isVisible2] = useIntersectionObserver();
  const [current, setCurrent] = useState(0);
  const testiHlRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(testiHlRef);

  useEffect(() => {
    // Autoplay testimonials every 7000ms (~40% slower than the prior 5000ms,
    // giving readers more time to comfortably finish each testimonial)
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % content.testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [current, content.testimonials.length]);

  const goTo = (index: number) => {
    const len = content.testimonials.length;
    setCurrent((index + len) % len);
  };

  // Pointer/touch swipe — drag the card left/right to advance.
  const dragStartX = useRef<number | null>(null);
  const onPointerDown = (e: ReactPointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
  };

  // Monogram initials from an anonymised name like "J.M." → "JM".
  const initials = (name: string) =>
    name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();

  // headlineWords: ["WHAT","THE","MEN","SAY."] — <br /> after index 1
  const hw = content.headlineWords;

  return (
    <section id="testi" className="scroll-snap-section">
      <div className="w">
        <div ref={ref1 as any} className={`fu ${isVisible1 ? "vis" : ""}`}>
          <div className="eyebrow">{content.eyebrow}</div>
          <h2 ref={testiHlRef} className="testi-hl">
            <span className="word-reveal-span mr-[0.25em]">{hw[0]}</span>
            <span className="word-reveal-span mr-[0.25em]">{hw[1]}</span>
            <br />
            <span className="word-reveal-span mr-[0.25em]">{hw[2]}</span>
            <span className="word-reveal-span mr-[0.25em]">{hw[3]}</span>
          </h2>
        </div>

        <div ref={ref2 as any} className={`fu ${isVisible2 ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <div
            className="sl-track"
            id="slTrack"
            data-cursor-label="Drag"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            style={{ touchAction: "pan-y" }}
          >
            {content.testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`slide ${idx === current ? "on block" : "hidden"}`}
              >
                <div className="tcard">
                  <div className="tcard-tag">{t.tag}</div>
                  <span className="tcard-qm">"</span>
                  <p className="tcard-q">{t.quote}</p>
                  <div className="tcard-meta">
                    <span className="tcard-avatar" aria-hidden="true">{initials(t.name)}</span>
                    <span className="tcard-meta-text">
                      <span className="tcard-name">{t.name}</span>
                      <span className="tcard-det">{t.details}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sl-ctrls">
            <button
              className="sl-btn"
              onClick={() => goTo(current - 1)}
              aria-label="Previous slider item"
            >
              ←
            </button>
            <button
              className="sl-btn"
              onClick={() => goTo(current + 1)}
              aria-label="Next slider item"
            >
              →
            </button>
            <div className="sl-dots">
              {content.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`sl-dot ${idx === current ? "on" : ""}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === current}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
