import { useEffect, useRef, useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";

interface TypographicRevealProps {
  lines: string[];
  className?: string;
  delayOffset?: number; // basic offset between lines in seconds
  animateOnce?: boolean;
  as?: "div" | "h2" | "h1";
}

/**
 * A highly premium Awwwards-style typography mask reveal component.
 * It splits a series of text lines and renders them inside an overflow-hidden mask frame,
 * sliding them up with custom cubic-bezier spring-inertia curves as they cross into the viewport.
 */
export default function TypographicReveal({
  lines,
  className = "",
  delayOffset = 0.12,
  animateOnce = true,
  as: Tag = "div",
}: TypographicRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (animateOnce) {
            observer.unobserve(el);
          }
        } else if (!animateOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);

    return () => {
      if (el && !animateOnce) {
        observer.unobserve(el);
      }
    };
  }, [animateOnce]);

  const InnerTag = Tag === "div" ? "div" : "span";

  return (
    <Tag ref={containerRef as any} className={`flex flex-col select-none ${className}`}>
      {lines.map((line, idx) => (
        <InnerTag key={idx} className="relative overflow-hidden block py-1">
          <span
            className="transition-transform duration-[1100ms] will-change-transform block"
            style={{
              fontFamily: "var(--fd)",
              fontWeight: "inherit",
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 105%, 0)",
              transitionDelay: `${idx * delayOffset}s`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {line}
          </span>
        </InnerTag>
      ))}
    </Tag>
  );
}
