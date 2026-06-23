import { useEffect, useRef, useState } from "react";

interface ScrollFadeInOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * A highly reusable React hook that uses an Intersection Observer to trigger a
 * buttery smooth 'fade-in-up' (using CSS .fu and .vis classes) on elements as they scroll into view.
 * Highly responsive, lightweight, and cinematic.
 */
export function useScrollFadeIn({
  threshold = 0.1,
  rootMargin = "0px 0px -80px 0px", // triggers slightly before scrolling fully into view for a smoother cinematic feel
  triggerOnce = true,
}: ScrollFadeInOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element && !triggerOnce) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible] as const;
}
