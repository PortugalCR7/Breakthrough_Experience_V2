import React, { useState, useRef, useEffect } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { X, ShieldAlert } from "lucide-react";

export default function Alliance() {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.1 });
  const [showNotice, setShowNotice] = useState(false);
  const hlScope = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(hlScope);

  // Modal focus management: remember the trigger, move focus into the dialog on
  // open, restore it on close, and allow Escape to dismiss.
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowNotice(true);
  };

  useEffect(() => {
    if (!showNotice) return;
    const previouslyFocused = triggerRef.current;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowNotice(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [showNotice]);

  return (
    <section id="alliance-sec" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "32px" }}>
          The Deeper Path
        </div>
        <div className="pp-grid">
          <div className={`fu ${isVisible ? "vis" : ""} border-r border-white/10 pr-12 flex flex-col`}>
            <h2 ref={hlScope} className="al-sec-hl">
              <span className="word-reveal-span">THE</span>
              <br />
              <span className="word-reveal-span">ALLIANCE</span>
            </h2>
            <p className="al-sec-intro mt-6 mb-8">
              For men seeking a deeper level of mentorship, accountability, and
              access. This is where the real work becomes a way of life.
            </p>
            <div className="mt-auto pt-8">
              <a ref={triggerRef} href="#" className="btn-tactile btn-stack w-full" onClick={handleApplyClick}>
                <span className="btn-tactile-wrap">
                  <span className="btn-tactile-text">Apply For<br />The Alliance</span>
                  <span className="btn-tactile-hover">Apply For<br />The Alliance</span>
                </span>
                <span className="btn-tactile-arrow">→</span>
              </a>
            </div>
          </div>

          <div className={`fu ${isVisible ? "vis" : ""} flex flex-col`} style={{ transitionDelay: "0.15s" }}>
            <div className="al-incl-lbl">What's Included</div>
            <div className="al-incl-list">
              <div className="al-incl-row">
                <span className="al-ii-m">—</span>Extended 1:1 support
              </div>
              <div className="al-incl-row">
                <span className="al-ii-m">—</span>Full Brotherhood Membership
              </div>
              <div className="al-incl-row">
                <span className="al-ii-m">—</span>Purpose &amp; Legacy Architecture
              </div>
              <div className="al-incl-row">
                <span className="al-ii-m">—</span>Long-term strategic mentorship
              </div>
            </div>

            <div className="mt-auto pt-12">
              <p className="al-right-note border-b-0 pb-0 mb-0">
                Application required. Discernment on both sides. The Alliance is not
                for every man. It is for the man who has closed the initial gap and
                is ready to go further.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showNotice && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-md border border-neutral-800 bg-neutral-900 p-8 shadow-2xl rounded-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="alliance-notice-title"
            aria-describedby="alliance-notice-desc"
          >
            <button
              ref={closeBtnRef}
              onClick={() => setShowNotice(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-800 border border-stone-700 text-[var(--sv)]">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 id="alliance-notice-title" className="font-sans text-xs font-bold tracking-widest text-[var(--sv)]">
                ALLIANCE DISCERNING
              </h3>
            </div>

            <p id="alliance-notice-desc" className="font-sans text-sm leading-relaxed text-stone-300">
              Alliance applications are processed manually. Please secure your first 1:1 <strong>&quot;Breakthrough&quot; session</strong> with Frank, or contact our leadership board directly to register your legacy interest.
            </p>
            
            <button
              onClick={() => setShowNotice(false)}
              className="mt-6 w-full py-3 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-all text-neutral-300 font-mono text-[10px] tracking-widest uppercase"
            >
              Acknowledge and Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
