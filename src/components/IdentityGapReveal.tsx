import { useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";

/**
 * The Identity Gap, made literal.
 *
 * A draggable before/after slider: the same scene rendered as the diminished,
 * out-of-focus "man you're living as" (left) versus the sharp, clear "man you
 * can be" (right). Dragging the divider literally "closes the gap". Monochrome
 * throughout (per brand). Pointer + touch drag, click-to-position, and keyboard
 * (arrow keys) for accessibility.
 */
export default function IdentityGapReveal() {
  const [headRef, headVisible] = useScrollFadeIn({ threshold: 0.2 });
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50); // divider position, 0–100 (% from left)

  const setFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPos((p) => Math.max(0, p - 4));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPos((p) => Math.min(100, p + 4));
      e.preventDefault();
    }
  };

  return (
    <section id="gap-reveal" className="scroll-snap-section tex-glow">
      <div className="w">
        <div ref={headRef as any} className={`ba-head fu ${headVisible ? "vis" : ""}`}>
          <div className="eyebrow">The Gap, Made Visible</div>
          <h2 className="ba-hl">
            DRAG TO CLOSE <span className="sv" style={{ color: "var(--sv)" }}>THE GAP.</span>
          </h2>
        </div>

        <div
          ref={wrapRef}
          className="ba-wrap"
          data-cursor-label="Drag"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ ["--pos" as any]: `${pos}%`, touchAction: "pan-y" }}
        >
          {/* AFTER — sharp, clear (base layer) */}
          <div className="ba-layer ba-after">
            <img src="/bg_dojo.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <span className="ba-tag ba-tag--after">WHO YOU CAN BE</span>
          </div>

          {/* BEFORE — diminished, out of focus (clipped to the left of the divider) */}
          <div className="ba-layer ba-before">
            <img src="/bg_dojo.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <span className="ba-tag ba-tag--before">WHO YOU'RE LIVING AS</span>
          </div>

          {/* Divider + handle */}
          <div
            className="ba-divider"
            role="slider"
            tabIndex={0}
            aria-label="Drag to close the gap between who you're living as and who you can be"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
          >
            <span className="ba-handle" aria-hidden="true">
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                <path d="M8 2L3 7l5 5M14 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
