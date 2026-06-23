import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const trailRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile / touch devices to prevent rendering cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setHidden(false);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    // Event delegation for detecting hovers on interactive targets
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("bar-btn") ||
        target.classList.contains("btn") ||
        target.classList.contains("btn-tactile") ||
        target.closest(".btn-tactile") ||
        target.classList.contains("interactive-card")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver);

    // RequestAnimationFrame for a smooth inertial trail
    let rId: number;
    const animateTrail = () => {
      const dx = mouseRef.current.x - trailRef.current.x;
      const dy = mouseRef.current.y - trailRef.current.y;
      
      // Dampened factor for smooth fluid momentum
      trailRef.current.x += dx * 0.15;
      trailRef.current.y += dy * 0.15;

      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      rId = requestAnimationFrame(animateTrail);
    };
    rId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rId);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Dynamic ambient mouse-following radial glow backing */}
      <div
        className="pointer-events-none fixed z-[9999] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px] transition-opacity duration-500"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "radial-gradient(circle, var(--sv) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
