import { useEffect, useRef, useState } from "react";

/**
 * Option A — the editorial scroll cue.
 *
 * A single, low-weight indicator dropped at the foot of a section: a thin
 * hairline track with a soft beam of the interaction accent (--int-accent /
 * #3F6477) travelling down it. Minimal, premium, never present as ornament.
 *
 * Single-active discipline: every cue shares ONE IntersectionObserver whose
 * root is collapsed to a thin band across the viewport's vertical centre
 * (rootMargin -49.5%/-49.5%). A section is "active" only while it straddles
 * that centre line — i.e. while you are actually reading it. Because the
 * registered sections never overlap, at most one cue is ever active, so no two
 * indicators can pulse at once. As you scroll past, the cue fades out naturally
 * and the next section's cue lights when it reaches centre.
 *
 * Motion lives only on the active cue and is removed entirely under
 * prefers-reduced-motion (a static accent segment remains so it still reads).
 */

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, (active: boolean) => void>();

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const cb = callbacks.get(entry.target);
        if (cb) cb(entry.isIntersecting);
      });
    },
    // Collapse the root to a ~1%-tall band at the vertical centre of the
    // viewport. A section intersects it only while it owns the centre line.
    { rootMargin: "-49.5% 0px -49.5% 0px", threshold: 0 }
  );
  return observer;
}

export default function ScrollCue({ label = "Scroll" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = (el.closest("section") as Element | null) ?? el.parentElement;
    if (!section) return;

    const obs = getObserver();
    callbacks.set(section, setActive);
    obs.observe(section);

    return () => {
      obs.unobserve(section);
      callbacks.delete(section);
    };
  }, []);

  return (
    <div className={`scroll-cue${active ? " is-active" : ""}`} ref={ref} aria-hidden="true">
      <span className="scroll-cue-track">
        <span className="scroll-cue-beam" />
      </span>
      {label ? <span className="scroll-cue-label">{label}</span> : null}
    </div>
  );
}
