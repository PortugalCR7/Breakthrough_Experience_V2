import ProgressBar from "./components/ProgressBar";
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import Spotlight from "./components/Spotlight";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import AuthorityBar from "./components/AuthorityBar";
import AnchorQuote from "./components/AnchorQuote";
import MenIMeet from "./components/MenIMeet";
import RealEnemy from "./components/RealEnemy";
import IdentityGap from "./components/IdentityGap";
import AlignedOtherSide from "./components/AlignedOtherSide";
import MeetFrank from "./components/MeetFrank";
import WhatThisActuallyIs from "./components/WhatThisActuallyIs";
import Outcomes from "./components/Outcomes";
import Testimonials from "./components/Testimonials";
import MidCTA from "./components/MidCTA";
import PrimaryPath from "./components/PrimaryPath";
import Alliance from "./components/Alliance";
import FAQ from "./components/FAQ";
import Decision from "./components/Decision";
import FinalWord from "./components/FinalWord";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import CtaText1 from "./components/CtaText1";
import CtaText2 from "./components/CtaText2";
import CtaText3 from "./components/CtaText3";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <>
      {/* Keyboard skip link — first focusable element; visually hidden until focused */}
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Dynamic tactile custom cursor glow */}
      <CustomCursor />

      {/* Cursor-tracked spotlight light on cards (writes --mx/--my, CSS draws it) */}
      <Spotlight />

      {/* Top scroll progress helper */}
      <ProgressBar />

      {/* Persistent scrolled-in header bar */}
      <Header />

      {/* Main Single Page structural flow matching custom design layout */}
      <main id="main">
        {/* Section 1: Cinematic Interactive Hero with cascades */}
        <Hero />

        {/* Section 2-A: Animated stats authority bar (Trust Bar sits between Hero and Section 1 in DOM order) */}
        <AuthorityBar />

        {/* Section 1-B: Vision stmt (Section 1) */}
        <Vision />

        {/* Section 2-B: Personal anchor quotes */}
        <AnchorQuote />

        {/* Section 3: Professional profile grid logs */}
        <MenIMeet />

        {/* Section 4-A: The real enemy contrast panel */}
        <RealEnemy />

        {/* Segue into Section 3 (Identity Gap) */}
        <CtaText1 />

        {/* Section 4-B: Identity Gap pattern grid elements */}
        <IdentityGap />

        {/* Section 5: Grounded aligned checkboxes checklist */}
        <AlignedOtherSide />

        {/* Transition element before MeetFrank */}
        <CtaText2 />

        {/* Section 6: Biography and chronological vertical timeline */}
        <MeetFrank />

        {/* Section 8: Outcomes and earned perspective panels (moved directly beneath MeetFrank) */}
        <Outcomes />

        {/* Section 7: Program structuring & sessions map */}
        <WhatThisActuallyIs />

        {/* Section 9: Auto-sliding testimonial cards carousel */}
        <Testimonials />

        {/* Section 9-B: Mid page action trigger hook */}
        <MidCTA />

        {/* Section 10: Private options and investments cards */}
        <PrimaryPath />

        {/* Section 11: Special Alliance invitation block */}
        <Alliance />

        {/* Segue into FAQ */}
        <CtaText3 />

        {/* Section 12: Accordion-style responsive FAQ panel */}
        <FAQ />

        {/* Section 13: Immersive choice decision point */}
        <Decision />

        {/* Section 14: The Final Word — Frank's closing letter */}
        <FinalWord />

        {/* Section 15: Client-side Interactive checkout validation form */}
        <Checkout />
      </main>

      {/* Dynamic Brand Logo Footer card */}
      <Footer />

      {/* Fixed bottom-right light/dark toggle (dark is default, persisted) */}
      <ThemeToggle />
    </>
  );
}
