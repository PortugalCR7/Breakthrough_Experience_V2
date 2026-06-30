import CtaStatement from "./CtaStatement";

export default function CtaText3() {
  return (
    <CtaStatement
      // Concept 3A — "The Fork".
      // The losing path recedes (PERFORMANCE / ONE REPEATS THE PAST: dim, set
      // back, scaled down); the chosen path advances (EMBODIMENT / BREAKTHROUGH:
      // scaled up, bright). Composition weighs the choice before the reader
      // finishes reading it.
      // Pinned word-by-word set-piece (default). FAQ separates it from
      // Decision's pin, so this is not a back-to-back pin.
      lines={[
        { text: "THIS IS YOUR [DECISION.](sans,italic,accent,glow,xl)", className: "cta-l3-prompt" },
        { text: "[PERFORMANCE](recede,accent) [OR](recede) [EMBODIMENT.](sans,italic,accent,glow,advance)", className: "cta-l3-options" },
        { text: "ONE REPEATS THE PAST.", className: "cta-l3-past" },
        { text: "[THE OTHER IS](bodoni) [BREAKTHROUGH.](accent,glow,italic)", className: "cta-l3-climax" },
      ]}
    />
  );
}
