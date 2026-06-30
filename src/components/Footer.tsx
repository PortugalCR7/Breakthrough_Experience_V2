import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../motion";

/** "BREAK" (default) + "THROUGH" (accent) as individual letters for the cascade. */
const WORDMARK: { ch: string; sv: boolean }[] = [
  ..."BREAK".split("").map((ch) => ({ ch, sv: false })),
  ..."THROUGH".split("").map((ch) => ({ ch, sv: true })),
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const logoRef = useRef<HTMLParagraphElement | null>(null);

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
        <p ref={logoRef} className="foot-logo" role="img" aria-label="BREAKTHROUGH" style={{ overflow: "hidden" }}>
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
          Monde Osé · Breakthrough · Caracara Village + Nature Reserve · © {currentYear}
        </p>
        <nav className="foot-links mt-4" aria-label="Legal & contact">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="mailto:admin@mondeose.com">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
