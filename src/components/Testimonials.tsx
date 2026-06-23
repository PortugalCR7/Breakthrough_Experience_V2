import { useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { TestimonialItem } from "../types";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    tag: "The Successful Man",
    quote: "I had achieved almost everything I set out to achieve. Yet I felt disconnected from myself. Frank helped me see what success had been distracting me from.",
    name: "J.M.",
    details: "CEO · New York",
  },
  {
    id: "t2",
    tag: "The Struggling Builder",
    quote: "I thought I needed more discipline. What I actually needed was accountability and a structure strong enough to hold my vision.",
    name: "D.R.",
    details: "Entrepreneur · Austin",
  },
  {
    id: "t3",
    tag: "The Man in Crisis",
    quote: "My marriage ended and so did the identity I had built around it. This wasn't coaching. It was a turning point.",
    name: "M.T.",
    details: "Father · Chicago",
  },
];

export default function Testimonials() {
  const [ref1, isVisible1] = useIntersectionObserver();
  const [ref2, isVisible2] = useIntersectionObserver();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Autoplay testimonials every 5000ms
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  const goTo = (index: number) => {
    const len = TESTIMONIALS.length;
    setCurrent((index + len) % len);
  };

  return (
    <section id="testi" className="scroll-snap-section">
      <div className="w">
        <div ref={ref1 as any} className={`fu ${isVisible1 ? "vis" : ""}`}>
          <div className="eyebrow">The Men Who Did the Work</div>
          <h2 className="testi-hl">
            WHAT THE
            <br />
            MEN SAY.
          </h2>
        </div>

        <div ref={ref2 as any} className={`fu ${isVisible2 ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <div className="sl-track" id="slTrack">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className={`slide ${idx === current ? "on block" : "hidden"}`}
              >
                <div className="tcard">
                  <div className="tcard-tag">{t.tag}</div>
                  <span className="tcard-qm">"</span>
                  <p className="tcard-q">{t.quote}</p>
                  <div className="tcard-meta">
                    <span className="tcard-name">{t.name}</span>
                    <span className="tcard-det">{t.details}</span>
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
              {TESTIMONIALS.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`sl-dot ${idx === current ? "on" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
