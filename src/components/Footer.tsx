import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";
import { footerContent, FooterContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Footer() {
  const content = useSection<FooterContent>("footer", footerContent);
  const currentYear = new Date().getFullYear();
  const logoRef = useRef<HTMLParagraphElement | null>(null);

  // Derive WORDMARK from content — accent starts at wordmarkAccentStart index.
  const WORDMARK = content.wordmark.split("").map((ch, i) => ({
    ch,
    sv: i >= content.wordmarkAccentStart,
  }));

  // Signature finale: the wordmark cascades in letter-by-letter as the footer
  // enters — a closing flourish (the reference's footer-letter device).
  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLElement>(".foot-letter", logoRef.current);
      if (!letters.length) return;
      if (prefersReducedMotion()) {
        gsap.set(letters, { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.from(letters, {
        yPercent: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.7,
        stagger: 0.04,
        scrollTrigger: { trigger: logoRef.current, start: "top 90%", once: true },
      });
    },
    { scope: logoRef }
  );

  return (
    <footer>
      <div className="w">
        <p ref={logoRef} className="foot-logo" role="img" aria-label={content.wordmark} style={{ overflow: "hidden" }}>
          {WORDMARK.map((l, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`foot-letter inline-block ${l.sv ? "sv" : ""}`}
            >
              {l.ch}
            </span>
          ))}
        </p>
        <p className="foot-sub text-neutral-400">
          {content.subtitle} · © {currentYear}
        </p>
        <nav className="foot-links mt-4" aria-label="Legal & contact">
          {content.legalLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
