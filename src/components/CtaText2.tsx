import CtaStatement from "./CtaStatement";

export default function CtaText2() {
  return (
    <CtaStatement
      // Pinned word-by-word set-piece (same treatment as CtaText1). Size is
      // reduced from the headline clamp so the multi-sentence beat fits the
      // viewport and pins tastefully; spacious keeps the lines breathing.
      spacious
      size="clamp(26px, 3.2vw, 44px)"
      lines={[
        "Most men don't need more information.",
        "They need structure.",
        "They need accountability.",
        "They need someone willing to hold them to who they can become.",
      ]}
    />
  );
}
