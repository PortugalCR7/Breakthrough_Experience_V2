import CtaStatement from "./CtaStatement";

export default function CtaText2() {
  return (
    <CtaStatement
      // Word-by-word narration (the signed-off feel), but un-pinned — pins stay
      // reserved for CtaText1 + Decision. Bigger type + looser rhythm so the
      // multi-sentence beat breathes.
      pin={false}
      spacious
      size="clamp(34px, 4.4vw, 62px)"
      lines={[
        "Most men don't need more information.",
        "They need structure.",
        "They need accountability.",
        "They need someone willing to",
        "hold them to who they can become.",
      ]}
    />
  );
}
