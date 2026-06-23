import { useEffect, useRef } from "react";

/**
 * Custom React hook that applies a smooth, hardware-accelerated 3D tilt transformation
 * to any HTML element on mouse hover, resetting cleanly on mouse leave.
 * @param maxTilt Max angle of tilt in degrees (default 8)
 * @param perspective Distance from user to component z=0 plane in pixels (default 800)
 */
export function useTilt(maxTilt: number = 7, perspective: number = 800) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const card = elementRef.current;
    if (!card) return;

    // Make sure transition styling exists for dynamic layout resets on leave
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transformStyle = "preserve-3d";

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within element
      const y = e.clientY - rect.top;  // y coordinate within element

      // Convert coordinates to ratios from center of card (-0.5 to 0.5)
      const ratioX = x / rect.width - 0.5;
      const ratioY = y / rect.height - 0.5;

      // Calculate tilt angles based on mouse ratios and limit
      const rotateY = ratioX * maxTilt * 2; // horizontal tilt
      const rotateX = -ratioY * maxTilt * 2; // vertical tilt (inverted)

      // Apply highly smoothed 3D transform matrix
      card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.45), ${-ratioX * 12}px ${-ratioY * 12}px 25px rgba(122, 150, 168, 0.15)`;
    };

    const handleMouseLeave = () => {
      // Smooth reset back to completely flat level
      card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.boxShadow = "none";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, perspective]);

  return elementRef;
}
