import CtaStatement from "./CtaStatement";

export default function CtaText2() {
  return (
    <CtaStatement
      // Pinned word-reveal — same editorial rhythm as CtaText1 and CtaText3.
      // Spacious + reduced size preserved: four longer sentences need
      // typographic breathing room at a softer scale than the confrontational CTAs.
      spacious
      size="clamp(26px, 3.2vw, 44px)"
      lines={[
        "Most men don't need more information.",
        "They need [structure.](italic,accent)",
        "They need [accountability.](italic,accent)",
        "They need someone willing to hold them to who they can become.",
      ]}
    />
  );
}
