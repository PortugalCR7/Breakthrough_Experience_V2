import { useEffect, useRef } from "react";

interface MagneticOptions {
  strength?: number; // How strongly the element attracts to the cursor (0.1 to 0.8)
  scaleOnHover?: number; // Optional scaling multiplier on hover (e.g. 1.05)
}

/**
 * A highly polished, reactive custom hook that applies a beautiful magnetic pull
 * effect to any button, custom CTA, or graphic mark, pulling it toward the mouse
 * with hardware-accelerated spring physics.
 */
export function useMagnetic({
  strength = 0.35,
  scaleOnHover = 1.02,
}: MagneticOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Apply fluid transition styles
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transformStyle = "preserve-3d";

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Calculate mouse pointer relative offset from element's center point
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Apply tactile spring drag vector
      const x = distanceX * strength;
      const y = distanceY * strength;

      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale3d(${scaleOnHover}, ${scaleOnHover}, 1)`;
    };

    const handleMouseLeave = () => {
      // Butter-smooth spring-back transition with custom curve definitions
      el.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1)`;
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, scaleOnHover]);

  return elementRef;
}
