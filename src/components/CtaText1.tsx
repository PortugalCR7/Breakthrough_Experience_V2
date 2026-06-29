import CtaStatement from "./CtaStatement";

export default function CtaText1() {
  return (
    <CtaStatement
      lines={[
        { text: "THE MAN", className: "cta-ln-center cta-reg-mono-med" },
        { text: "YOU ARE PERFORMING", className: "cta-ln-center cta-reg-serif-hero" },
        { text: "IS NOT THE MAN", className: "cta-ln-center cta-reg-serif-whisper" },
        { text: "THEY NEED.", className: "cta-ln-center cta-reg-sans-hero" },
      ]}
    />
  );
}
