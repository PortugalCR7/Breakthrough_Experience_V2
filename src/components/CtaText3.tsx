import CtaStatement from "./CtaStatement";

export default function CtaText3() {
  return (
    <CtaStatement
      // Pinned word-by-word set-piece (followed by FAQ, so not a back-to-back pin).
      lines={[
        "THIS IS YOUR [DECISION.](italic,accent,glow)",
        "PERFORMANCE OR [EMBODIMENT.](bodoni,italic,glow)",
        "ONE REPEATS THE PAST.",
        "THE OTHER IS [BREAKTHROUGH.](accent,glow)",
      ]}
    />
  );
}
