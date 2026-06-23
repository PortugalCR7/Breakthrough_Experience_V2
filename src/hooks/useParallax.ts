import { useEffect, useState, useRef } from "react";

/**
 * Custom React hook that tracks scroll offset of an element to apply buttery smooth parallax.
 * Only runs calculation while the element is visible in the viewport to avoid unnecessary CPU cycles.
 * @param speed Factor by which the scrolling motion is dampened (e.g. -0.15 makes it float slower)
 */
export function useParallax(speed: number = -0.12) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let rId: number;
    let isIntersecting = false;

    // Use IntersectionObserver to start/stop tracking updates on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(element);

    const handleScroll = () => {
      if (!isIntersecting) return;
      
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is relative to screen center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      // Apply dampened speed translation
      setOffset(distanceFromCenter * speed);
    };

    const tick = () => {
      handleScroll();
      rId = requestAnimationFrame(tick);
    };
    rId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rId);
    };
  }, [speed]);

  return { elementRef, offset };
}
