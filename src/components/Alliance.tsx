import React, { useState, useRef, useEffect } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useWordScrub } from "../motion";
import { X, ShieldAlert } from "lucide-react";
import { allianceContent, AllianceContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Alliance() {
  const content = useSection<AllianceContent>("alliance", allianceContent);
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

  // headlineWords: ["THE","ALLIANCE"] — each on its own line
  const hw = content.headlineWords;

  // applyCtaText has \n for line break
  const ctaLines = content.applyCtaText.split('\n');

  return (
    <section id="alliance-sec" className="scroll-snap-section" ref={ref as any}>
      <div className="w">
        <div className={`eyebrow fu ${isVisible ? "vis" : ""}`} style={{ marginBottom: "32px" }}>
          {content.eyebrow}
        </div>
        <div className="pp-grid">
          <div className={`fu ${isVisible ? "vis" : ""} border-r border-white/10 pr-12 flex flex-col`}>
            <h2 ref={hlScope} className="al-sec-hl">
              {hw.map((word, i) => (
                <span key={i}>
                  <span className="word-reveal-span">{word}</span>
                  {i < hw.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="al-sec-intro mt-6 mb-8">
              {content.introParagraph}
            </p>
            <div className="mt-auto pt-8">
              <a ref={triggerRef} href="#" className="btn-tactile btn-stack w-full" onClick={handleApplyClick}>
                <span className="btn-tactile-wrap">
                  <span className="btn-tactile-text">
                    {ctaLines.map((line, i) => (
                      <span key={i}>{i > 0 && <br />}{line}</span>
                    ))}
                  </span>
                  <span className="btn-tactile-hover">
                    {ctaLines.map((line, i) => (
                      <span key={i}>{i > 0 && <br />}{line}</span>
                    ))}
                  </span>
                </span>
                <span className="btn-tactile-arrow">→</span>
              </a>
            </div>
          </div>

          <div className={`fu ${isVisible ? "vis" : ""} flex flex-col`} style={{ transitionDelay: "0.15s" }}>
            <div className="al-incl-lbl">{content.includedLabel}</div>
            <div className="al-incl-list">
              {content.includedItems.map((item, i) => (
                <div key={i} className="al-incl-row">
                  <span className="al-ii-m">—</span>{item}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <p className="al-right-note border-b-0 pb-0 mb-0">
                {content.applicationNote}
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
                {content.modalTitle}
              </h3>
            </div>

            <p
              id="alliance-notice-desc"
              className="font-sans text-sm leading-relaxed text-stone-300"
              dangerouslySetInnerHTML={{ __html: content.modalBody }}
            />

            <button
              onClick={() => setShowNotice(false)}
              className="mt-6 w-full py-3 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-all text-neutral-300 font-mono text-[10px] tracking-widest uppercase"
            >
              {content.modalButtonText}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
