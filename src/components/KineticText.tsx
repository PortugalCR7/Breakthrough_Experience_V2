import { useEffect, useState, useRef } from "react";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordStagger?: number;
}

export default function KineticText({
  text,
  className = "",
  delay = 0,
  wordStagger = 35,
}: KineticTextProps) {
  const [isTriggered, setIsTriggered] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
          // Once triggered, we can stop observing to maintain static rendering state
          observer.unobserve(container);
        }
      },
      {
        threshold: 0.15, // trigger when 15% of the text is visible
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      style={{ columnGap: "0.24em", rowGap: "0.1em" }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden vertical-align-bottom"
        >
          <span
            className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isTriggered ? "translateY(0)" : "translateY(120%)",
              transitionDelay: `${delay + index * wordStagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
