import { useEffect, useState, useRef } from "react";
import { prefersReducedMotion } from "../motion";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Whole-unit editorial reveal.
 *
 * The complete thought rises once, as a single masked unit, when it enters the
 * viewport. It is NOT fragmented word-by-word — that would delay comprehension
 * and violate the typography rule (Editorial Interaction Constitution §V).
 * One movement, the house curve, ≤600ms; the sentence is legible the instant it
 * settles. Reduced-motion renders it immediately with no transform.
 */
export default function KineticText({
  text,
  className = "",
  delay = 0,
}: KineticTextProps) {
  const reduced = prefersReducedMotion();
  const [isTriggered, setIsTriggered] = useState(reduced);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
          // Once revealed, stop observing so the unit stays settled (no replay).
          observer.unobserve(container);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block overflow-hidden align-bottom ${className}`}
    >
      <span
        className="inline-block will-change-transform"
        style={{
          transform: isTriggered ? "translateY(0)" : "translateY(110%)",
          transition: reduced
            ? "none"
            : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: reduced ? "0ms" : `${delay}ms`,
        }}
      >
        {text}
      </span>
    </span>
  );
}
