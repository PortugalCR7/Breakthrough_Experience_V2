import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(options: IntersectionObserverInit = { threshold: 0.1 }) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Once visible, stop observing to keep animation static
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [options]);

  return [elementRef, isIntersecting] as const;
}
