import { useRef } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";

const PP_ITEMS = [
  {
    title: "The Diagnostic",
    desc: "First session. Precise identification of where your energy is going and what needs to change.",
  },
  {
    title: "Between-Session Access",
    desc: "Direct contact when the real work surfaces in your actual life — not when it's convenient for a calendar.",
  },
  {
    title: "Direct Feedback",
    desc: "Unfiltered. What I see is what I say — not what you want to hear, but what the man underneath needs to be shown.",
  },
  {
    title: "Brotherhood Introduction",
    desc: "Men who hold you to who you actually are, across time.",
  },
  {
    title: "Practical Integration",
    desc: "The work moves into real life. Relationships. Business. Leadership.",
  },
  {
    title: "Lasting Accountability",
    desc: "Not a subscription. A standard you now hold yourself to.",
  },
];

/**
 * Section 10 — The Primary Path.
 *
 * Reworked from a 340vh scroll-scrubbed translate pin into a natural-flow section.
 * The left column rises in on view; the included items cascade with a staggered
 * reveal, with pricing landing last. Magnetic CTA preserved.
 */
export default function PrimaryPath() {
  const [leftRef, isLeftVisible] = useScrollFadeIn({ threshold: 0.2 });
  const [itemsRef, itemsVisible] = useScrollFadeIn({ threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  return (
    <section
      id="primary-path"
      className="scroll-snap-section relative w-full overflow-hidden"
      style={{ paddingTop: "var(--secpad)", paddingBottom: "var(--secpad)" }}
    >
      <div className="ww">
        <div ref={leftRef as any} className={`eyebrow fu ${isLeftVisible ? "vis" : ""}`} style={{ marginBottom: "32px" }}>
          The Primary Path
        </div>
        <div className="pp-grid">

          {/* Left Column */}
          <div className="border-r border-white/10 pr-12 flex flex-col">
            <h2 ref={hlScope} className="pp-hl" style={{ fontSize: "clamp(28px, 4vw, 80px)", lineHeight: "1.1" }}>
              <span className="word-reveal-span">SIX</span>
              <br />
              <span className="word-reveal-span">PRIVATE</span>
              <br />
              <span className="word-reveal-span">ONE-on-ONE</span>
              <br />
              <span className="word-reveal-span">SESSIONS</span>
              <br />
              <span className="word-reveal-span">WITH</span>
              <br />
              <span className="word-reveal-span">FRANK</span>
            </h2>
            <div className={`pp-body fu ${isLeftVisible ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <p>
                Direct access. No team members. No handoffs. Focused attention on the
                man and the challenge in front of him.
              </p>
              <p className="mt-4">
                I do not read from a playbook. I respond to what I see. Every
                session is live, present, and built around the man in front of me.
              </p>
            </div>
            <div className={`fu ${isLeftVisible ? "vis" : ""} mt-auto pt-8`} style={{ transitionDelay: "0.2s" }}>
              <div style={{ marginBottom: "16px" }}>
                <a href="#checkout" className="btn-tactile btn-stack w-full">
                  <span className="btn-tactile-wrap">
                    <span className="btn-tactile-text">Begin Your<br />Breakthrough</span>
                    <span className="btn-tactile-hover">Begin Your<br />Breakthrough</span>
                  </span>
                  <span className="btn-tactile-arrow">→</span>
                </a>
              </div>
              <div className="scarcity">
                <div className="sc-dot"></div>
                <span className="sc-txt font-mono">
                  <strong>Limited spots</strong> available this cycle — Frank works
                  with few men at depth
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: staggered item reveal */}
          <div ref={itemsRef as any} className="flex flex-col">
            <div className="pp-items">
              {PP_ITEMS.map((item, index) => (
                <div
                  key={item.title}
                  className={`pp-item block-reveal-item grid grid-cols-1 md:grid-cols-[40px_240px_1fr] gap-4 md:gap-12 items-start ${
                    itemsVisible ? "active" : ""
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <span className="pp-ck">✓</span>
                  <span className="pp-title">{item.title}</span>
                  <p className="pp-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing — lands last, bottom-aligned with the left CTA block */}
            <div
              className={`mt-auto pt-12 block-reveal-item ${itemsVisible ? "active" : ""}`}
              style={{ transitionDelay: `${PP_ITEMS.length * 0.1}s` }}
            >
              <div className="pp-price-lbl">Investment</div>
              <div className="pp-price">$2,500</div>
              <div className="pp-pnote font-mono text-[10px] text-neutral-400">
                Single Payment · 6 Private Sessions · Direct with Frank
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
