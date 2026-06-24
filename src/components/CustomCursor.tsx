import { useEffect, useRef, useState } from "react";

type Variant = "default" | "hover" | "label";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, .interactive-card, .bar-btn, .btn-tactile, .sl-btn, .sl-dot';

/**
 * Custom cursor with morphing states.
 *
 * A monochrome dot tracks the pointer 1:1 while a ring trails with inertia. Over
 * interactive targets the ring expands; targets carrying `data-cursor-label`
 * morph it into a labelled pill. The whole cursor uses `mix-blend-mode: difference`
 * so it inverts against any background. Hidden on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    // A fine pointer (mouse/trackpad) must be present; pure-touch devices are skipped.
    const hasFinePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(any-pointer: fine)").matches;
    const isTouchOnly =
      ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
      !hasFinePointer;
    if (isTouchOnly || !hasFinePointer) return;

    document.documentElement.classList.add("has-custom-cursor");
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (rootRef.current) rootRef.current.style.opacity = "1";
    };
    const onDown = () => ringRef.current?.classList.add("is-down");
    const onUp = () => ringRef.current?.classList.remove("is-down");
    // Fade out only on a genuine window exit (relatedTarget null), not internal moves.
    const onWindowOut = (e: MouseEvent) => {
      if (!e.relatedTarget && rootRef.current) rootRef.current.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // A label takes priority and works on any element (e.g. the draggable
      // carousel), not just standard interactive controls.
      const labelled = target?.closest("[data-cursor-label]") as HTMLElement | null;
      const text = labelled?.getAttribute("data-cursor-label");
      if (text) {
        setLabel(text);
        setVariant("label");
        return;
      }
      if (target?.closest(INTERACTIVE)) {
        setLabel("");
        setVariant("hover");
        return;
      }
      setVariant("default");
      setLabel("");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseout", onWindowOut);
    window.addEventListener("mouseover", onOver, { passive: true });

    let raf = 0;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      const r = ringRef.current;
      if (r) {
        r.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseout", onWindowOut);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring cursor-${variant}`}>
        <span className="cursor-label">{label}</span>
      </div>
    </div>
  );
}
