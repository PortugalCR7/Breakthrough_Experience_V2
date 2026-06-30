import { useState, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { FAQItem } from "../types";
import { useWordScrub } from "../motion";

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "f1",
    question: "Is this coaching?",
    answer: "No. And that distinction matters. Coaching is a methodology. What I do is mentorship built on lived experience I have founded companies, built communities, trained facilitators, and developed curriculum across two decades. I do not give you a framework. I give you a direct encounter with a man who has been where you're standing, made the hard choices, and stayed in the arena. <strong>If you're looking for a coach, this is not it. If you're looking for someone who has lived the gap and closed it, read on.</strong>",
  },
  {
    id: "f2",
    question: "What happens in the six sessions?",
    answer: "Each session follows the arc: Diagnostic, Gap, Interruption, Return, Anchor, Integration. But it's not a formula. Session one, I read where your energy is going. I name what I see. <strong>What I see is what I say, not what you want to hear, but what the man underneath your current results needs to be shown.</strong> Every session after that builds on honest ground, not managed impressions. The work gets more precise as we go.",
  },
  {
    id: "f3",
    question: "How is this different from therapy?",
    answer: "Therapy is designed to help you understand. This is designed to hold you accountable. Many of the men I work with have done years of excellent therapy. <strong>They understand their patterns completely, and keep repeating them.</strong> Understanding the gap and closing the gap are two different acts. This work is about the second one.",
  },
  {
    id: "f4",
    question: "I've tried other programs. What makes this different?",
    answer: "Most programs give you information and tools. This gives you direct access to a man who has spent twenty years in the field, not studying human development, but living it. <strong>I founded companies. I built communities. I trained facilitators. I sat with men in their worst moments and their best ones.</strong> What I bring isn't a better framework. It's two decades of earned perspective, applied directly to you and your specific gap.",
  },
  {
    id: "f5",
    question: "What if I'm not sure I'm ready?",
    answer: "The hesitation you feel is usually the pattern, not the reality. I'd ask you one question instead: what's the cost of waiting another year? Not in money, in the version of yourself you're not yet living. <strong>Ready doesn't mean comfortable. It means willing to be seen.</strong> If you can answer yes to that, you're ready enough.",
  },
  {
    id: "f6",
    question: "What does between-session access actually mean?",
    answer: "It means I'm available when the real work surfaces in your actual life, not when it's convenient for a scheduled call. <strong>Between-session access is direct contact with me when something real is happening.</strong> A decision that can't wait. A pattern showing up in a way you need to name right now. Not unlimited. Real presence when it counts.",
  },
  {
    id: "f7",
    question: "What's The Alliance, and how do I know which is right?",
    answer: "Breakthrough is the entry point: six sessions, direct 1:1, focused work. The Alliance is deeper access across all life domains, full Brotherhood membership, purpose and legacy architecture, long-term strategic mentorship. Application required on both sides. <strong>If you're new to this work, Breakthrough is the right door.</strong> The Alliance is for men who have demonstrated they're building something meant to outlast them and are ready to go deep. Start here.",
  },
];

export default function FAQ() {
  const [ref, isVisible] = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className={`fu ${isVisible ? "vis" : ""}`}>
          <div className="eyebrow">Real Questions</div>
        </div>
        <h2 ref={hlScope} className="faq-hl">
          <span className="word-reveal-span">WHAT</span>{" "}
          <span className="word-reveal-span">I</span>{" "}
          <span className="word-reveal-span">GET</span>
          <br />
          <span className="word-reveal-span">ASKED.</span>{" "}
          <span className="word-reveal-span">WHAT</span>
          <br />
          <span className="word-reveal-span">I</span>{" "}
          <span className="word-reveal-span">ACTUALLY</span>{" "}
          <span className="word-reveal-span">SAY.</span>
        </h2>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `${item.id}-panel`;
            const btnId = `${item.id}-control`;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => toggleIndex(idx)}
              >
                <div
                  className="faq-q"
                  role="button"
                  tabIndex={0}
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleIndex(idx);
                    }
                  }}
                >
                  <p className="faq-qt">{item.question}</p>
                  <div className="faq-tog" aria-hidden="true">{isOpen ? "×" : "+"}</div>
                </div>
                <div
                  className="faq-ans"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                >
                  <div className="faq-ai">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
