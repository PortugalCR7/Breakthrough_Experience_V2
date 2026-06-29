import CtaStatement from "./CtaStatement";

export default function CtaText2() {
  return (
    <CtaStatement
      // Concept 2A — "The Anaphora Ladder".
      // The repeated "They need" stem is demoted; each payload (structure /
      // accountability) ignites as the bright accent beat on a descending step.
      // The final line breaks the ladder — back to full margin, largest serif —
      // turning from a *system* to *someone*, handing off into MeetFrank.
      lines={[
        { text: "Most men don't need more information.", className: "cta-l2-premise" },
        { text: "They need [structure.](sans,italic,accent,glow)", className: "cta-l2-need cta-l2-step1" },
        { text: "They need [accountability.](sans,italic,accent,glow)", className: "cta-l2-need cta-l2-step2" },
        { text: "They need someone willing to hold them to [who they can become.](sans,italic,accent,glow)", className: "cta-l2-resolve" },
      ]}
    />
  );
}
