import { useEffect, useState, RefObject } from "react";

/**
 * Custom hook to track scroll progress (0 to 100) of an element.
 * 0% represents when the top of the element enters the top of the viewport.
 * 100% represents when the bottom of the element reaches the bottom of the viewport.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const elementHeight = rect.height;
      const elementTop = rect.top;
      const viewportHeight = window.innerHeight;

      // Scroll progress tracking range:
      // Starts when the top of the container hits the top of the viewport (elementTop <= 0)
      // Ends when the bottom of the container hits the bottom of the viewport (rect.bottom <= viewportHeight)
      const totalScrollableDistance = elementHeight - viewportHeight;
      if (totalScrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const scrolledDistance = -elementTop;
      const currentProgress = Math.min(Math.max(scrolledDistance / totalScrollableDistance, 0), 1);
      setProgress(currentProgress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Trigger initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  return progress;
}
