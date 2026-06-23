import CtaStatement from "./CtaStatement";

export default function CtaText2() {
  return (
    <CtaStatement
      reveal="line"
      size="clamp(28px, 3.2vw, 48px)"
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
