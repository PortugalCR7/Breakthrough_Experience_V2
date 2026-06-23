# BREAKTHROUGH V2 — COMPREHENSIVE TYPOGRAPHY & COPY AUDIT

This audit provides a section-by-section breakdown of the **BREAKTHROUGH** landing page. It identifies the text copy, the designated typography (intended by the project's CSS variables), the actual code implementation (TSX files), and highlights the discrepancies causing visual inconsistencies.

---

## Executive Summary: Root Causes of Inconsistencies

Through analysis of the design system in [index.css](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/index.css) and the TSX component implementations, the inconsistencies stem from two main developer errors:

1. **Tailwind Class Overrides (`font-sans` hijacking Bodoni Moda):**
   The CSS designates `var(--fd)` (the luxury editorial serif **Bodoni Moda**) for all major section headings (`.meet-hl`, `.enemy-hl`, `.other-hl`, `.faq-hl`, `.co-t`, etc.). However, the TSX files frequently append the Tailwind utility class `font-sans` to these elements, overriding the serif styling and forcing them to render in a generic sans-serif font.
   
2. **Ad-Hoc Size and Weight Overrides:**
   The CSS defines a standardized responsive type scale using CSS clamp variables (`--h1`, `--h2`, `--h3`, `--body-lg`, etc.). Multiple TSX elements bypass this design system by hardcoding specific font sizes inline (e.g., `style={{ fontSize: "60px" }}`) or using Tailwind breakpoint sizes (e.g., `text-2xl md:text-4xl lg:text-5xl`), breaking fluid responsiveness.

---

## Project Design System Reference
As defined in [index.css](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/index.css):

### Designated Fonts
* **Serif / Editorial Headline:** `--fd` and `--fs` $\rightarrow$ `'Bodoni Moda', serif`
* **Sans-Serif / Button Display:** `--fu` $\rightarrow$ `'Jost', sans-serif`
* **Sans-Serif / Body Copy:** `--fb` $\rightarrow$ `'DM Sans', sans-serif`
* **Monospace / Numbers & Metadata:** `--fm` $\rightarrow$ `'IBM Plex Mono', monospace`

### Designated Type Scale
* **Hero Title (`--h1`):** `clamp(52px, 9.5vw, 136px)`
* **Section Headline (`--h2`):** `clamp(38px, 5.5vw, 88px)`
* **Sub-Headline (`--h3`):** `clamp(28px, 3.5vw, 52px)`
* **Small Heading / Grid Title (`--hsub`):** `clamp(20px, 2.4vw, 34px)`
* **Large Body Copy (`--body-lg`):** `clamp(17px, 2vw, 22px)`
* **Standard Body Copy (`--body`):** `15px`
* **Eyebrow Copy (`--eyebrow`):** `13px` (bumped up from 10px)

---

## Section-by-Section Audit

### 1. Section 1: Cinematic Interactive Hero
* **File Reference:** [Hero.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Hero.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "BREAKTHROUGH WITH FRANK MONDEOSE" | `var(--fm)` (Monospace) | `18px` | Class `hero-ol` | ✅ Aligned |
| **Main Title** | "THE DOJO FOR MEN ON THE CUSP OF IMPACT" | `var(--fd)` (Serif) | `--h1` (`clamp(52px, 9.5vw, 136px)`) | Class `hero-hl` | ✅ Aligned |
| **Sub-Headline (Accent)** | "THE GAP IS NOT YOUR POTENTIAL." | `var(--fd)` (Serif) | `clamp(22px, 3vw, 42px)` | Class `gap-big font-sans tracking-tight` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Subtitle Description** | "It's the distance between the man you're living as and the man you know you can be." | `var(--fs)` (Serif Italic) | `clamp(17px, 2vw, 24px)` | Class `gap-sub font-serif italic text-slate-300` | ⚠️ **Minor Conflict:** Uses standard Tailwind `font-serif` instead of fluid `var(--fs)`. |
| **CTA Button** | "Begin Your Breakthrough" | `var(--fu)` (Jost Sans) | `12px` / `13px` | Class `btn-tactile` | ✅ Aligned |
| **Social Proof Text** | "Trusted by 100+ leaders & founders globally" | `var(--fm)` (Monospace) | `10px` | Class `social-proof-text` | ✅ Aligned |
| **Scroll Indicator** | "scroll" | `var(--fm)` (Monospace) | `9px` | Class `hero-scroll` | ✅ Aligned |

---

### 2. Section 2-A: Stats Authority Bar
* **File Reference:** [AuthorityBar.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/AuthorityBar.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stat Numbers** | "20+", "75+" | `var(--fd)` (Serif) | `clamp(22px, 3vw, 28px)` | Class `auth-n font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Stat Titles** | "MONDE OSÉ", "TEACHER", "BUILDER" | `var(--fd)` (Serif) | `clamp(22px, 3vw, 28px)` | Class `auth-w font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Stat Muted Labels** | "YEARS OF LEADERSHIP", "FOUNDER", "INTERNATIONAL TRAININGS", "OF TEACHERS", "OF INTENTIONAL COMMUNITIES" | `var(--fm)` (Monospace) | `10px` | Class `auth-l font-mono text-xs` | ⚠️ **Size Override:** Tailwind `text-xs` (12px) overrides designated 10px. |

---

### 3. Section 1-B: Vision Statement
* **File Reference:** [Vision.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Vision.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Foundation" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline Statement** | "For over twenty years, I've helped men close that gap through structure, accountability, and honest leadership." | `var(--fd)` (Serif) | `clamp(32px, 5.5vw, 76px)` | Class `vision-text font-sans font-medium text-white` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |

---

### 4. Section 2-B: Personal Anchor Quotes
* **File Reference:** [AnchorQuote.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/AnchorQuote.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "From the first step you take" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Title Quote** | "I am invested in you the entire way. I am in the arena with you." | `var(--fd)` (Serif) | `clamp(32px, 5vw, 68px)` | Class `anchor-body font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Quote Paragraph 1** | "I know who you are. I've sat with you a thousand times." | `var(--fs)` (Serif Italic) | `clamp(20px, 2.6vw, 33px)` | Class `font-serif` | ⚠️ **Minor Conflict:** Uses standard Tailwind `font-serif` instead of fluid `var(--fs)`. |
| **Quote Paragraph 2** | "You're not broken. You're simply living beneath your potential." | `var(--fd)` (Serif) | `clamp(24px, 3.4vw, 46px)` | Class `big font-sans text-stone-200 mt-2` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda. |

---

### 5. Section 3: Professional Profile Grid Logs
* **File Reference:** [MenIMeet.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/MenIMeet.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Men I Meet" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Section Title** | "FOR TWENTY YEARS. THE SAME MAN." | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `meet-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda. |
| **Intro Description** | "Different stories. Different conversations... You already know there is more..." | `var(--fb)` (Body Sans) | `17px` | Class `meet-intro` | ✅ Aligned |
| **Profile Numbers** | "PROFILE 01", "PROFILE 02", "PROFILE 03" | `var(--fm)` (Monospace) | `10px` | Class `p-n font-mono text-xs` | ⚠️ **Size Override:** `text-xs` (12px) overrides designated 10px. |
| **Profile Grid Titles** | "SUCCESSFUL BUT LACKING SOMETHING", etc. | `var(--fd)` (Serif) | `--hsub` (`clamp(20px, 2.4vw, 34px)`) | Class `p-lbl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Profile Grid Bodies** | "The income is real. The achievements are real..." | `var(--fb)` (Body Sans) | `15px` | Class `p-body` | ✅ Aligned |
| **Closer Headline** | "DIFFERENT STORIES. SAME CHALLENGE." | `var(--fd)` (Serif) | `--h3` (`clamp(28px, 3.5vw, 52px)`) | Class `closer-hd font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda. |
| **Closer Description** | "This is not potential you lack... Breakthrough was built to close it." | `var(--fb)` (Body Sans) | `clamp(16px, 2vw, 22px)` | Class `closer-b` | ✅ Aligned |

---

### 6. Section 4-A: The Real Enemy Contrast Panel
* **File Reference:** [RealEnemy.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/RealEnemy.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Real Enemy" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "MOST MEN AREN'T LIVING THEIR LIVES." | `var(--fd)` (Serif) | `clamp(46px, 7.5vw, 112px)` | Class `enemy-hl font-sans text-left` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **First Block Paragraph** | "They're performing it." | `var(--fb)` (Body Sans) | `--body-lg` (`clamp(17px, 2vw, 22px)`) | Class `font-serif not-italic text-2xl font-bold text-stone-200` | ⚠️ **Conflict:** Overridden with Tailwind generic `font-serif` and a hardcoded `text-2xl` font size. |
| **Other Narrative Blocks** | "Performing success... Breakthrough begins when the performance ends." | `var(--fb)` (Body Sans) | `--body-lg` (`clamp(17px, 2vw, 22px)`) | Class `enemy-b` | ✅ Aligned |

---

### 7. Segue: CtaText1
* **File Reference:** [CtaText1.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/CtaText1.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Scroll Reveal Text** | "THE MAN YOU ARE PERFORMING IS NOT THE MAN THEY NEED." | `var(--fd)` (Serif) | `clamp(38px, 6vw, 92px)` | Class `text-[clamp(38px,6vw,92px)] font-light uppercase` inside `ScrollStatement` | ✅ Aligned (No generic Tailwind font overrides; maps to `var(--fd)`). |

---

### 8. Section 4-B: Identity Gap pattern grid elements
* **File Reference:** [IdentityGap.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/IdentityGap.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Identity Gap" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline (Word Reveal)** | "THE DISTANCE BETWEEN THE MAN YOU ARE PERFORMING AND THE SOVEREIGN MAN YOU ARE." | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `text-[clamp(28px,4.5vw,64px)] font-sans font-bold` | ⚠️ **Conflict:** Overridden with Tailwind `font-sans` and a hardcoded clamp, bypassing the `--h2` variable. |
| **Headline Description** | "That gap shows up in highly predictable, silent, destructive ways." | `var(--fb)` (Body Sans) | `clamp(15px, 1.8vw, 20px)` | Class `gap-def font-sans italic text-stone-400` | ⚠️ **Conflict:** `font-sans` class overrides designated DM Sans style. |
| **Grid item numbers** | "01 ·", "02 ·", "03 ·", "04 ·" | `var(--fm)` (Monospace) | `11px` | Class `font-mono text-xs` | ⚠️ **Size Override:** `text-xs` (12px) overrides designated 11px. |
| **Grid item titles** | "Validation Seek", "Chasing 'Success'", etc. | `var(--fd)` (Serif) | `--hsub` (`clamp(20px, 2.4vw, 34px)`) | Class `font-sans font-medium text-lg` | ⚠️ **Conflict:** Overridden with `font-sans` and hardcoded `text-lg` (18px) size. |
| **Grid item bodies** | "You adjust for approval. You know you're doing it..." | `var(--fb)` (Body Sans) | `15px` | Class `font-sans text-stone-400` | ✅ Aligned (Body text is sans-serif, though `font-sans` utility is used). |
| **Grid highlights** | "Strong men don't need agreement. They need alignment." | `var(--fs)` (Serif Italic) | `15px` | Class `font-serif italic text-base` | ⚠️ **Minor Conflict:** Uses standard Tailwind classes instead of custom typography variables. |
| **Bottom Quote Box** | "Most men don't need more information..." | `var(--fs)` (Serif Italic) | `clamp(19px, 2.2vw, 28px)` | Class `font-serif italic text-stone-200 text-lg md:text-2xl` | ⚠️ **Minor Conflict:** Bypasses fluid size variable with Tailwind responsive sizes. |

---

### 9. Section 5: Grounded aligned checkboxes checklist
* **File Reference:** [AlignedOtherSide.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/AlignedOtherSide.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Man on the Other Side" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "NOT PERFECT. NOT FINISHED. JUST ALIGNED." | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `other-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Sub-text description** | "That is the man this work is designed to develop." | `var(--fb)` (Body Sans) | `15px` | Class `other-sub` | ✅ Aligned |
| **Checklist items** | "A man who trusts himself.", etc. | `var(--fb)` (Body Sans) | `clamp(16px, 1.9vw, 21px)` | Class `other-item font-sans text-stone-300` | ✅ Aligned (Sans-serif body elements). |
| **Coda Paragraph** | "This is who you already are. The work is closing the gap." | `var(--fb)` (Body Sans) | `15px` | Class `other-coda font-sans` with `style={{ fontSize: "1.2rem", fontWeight: "bold" }}` | ⚠️ **Size Conflict:** Inline styles override standard size and weight to `1.2rem` (19.2px) / bold. |

---

### 10. Segue: CtaText2
* **File Reference:** [CtaText2.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/CtaText2.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Scroll Reveal Text** | "Most men don't need more... They need structure... They need someone willing to hold them..." | `var(--fd)` (Serif) | `clamp(38px, 6vw, 92px)` | Class `text-2xl md:text-4xl lg:text-5xl font-bold` inside `ScrollStatement` | ⚠️ **Size Conflict:** Uses standard Tailwind breakpoint utilities instead of the CSS clamp variable. |

---

### 11. Section 6: Biography and vertical timeline
* **File Reference:** [MeetFrank.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/MeetFrank.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Portrait Badge Name** | "FRANK MONDEOSE" | `var(--fd)` (Serif) | `22px` | Class `frank-badge-name font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Portrait Badge Title** | "Teacher of Teachers · Mentor to Men..." | `var(--fu)` (Jost Sans) | `10px` | Class `frank-badge-ttl font-sans font-semibold text-[10px]` | ✅ Aligned (Standard sans display style). |
| **Eyebrow** | "Meet Frank" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "I DID NOT BUILD THIS FROM THEORY. I EARNED IT..." | `var(--fd)` (Serif) | `--h3` (`clamp(28px, 3.5vw, 52px)`) | Class `frank-hl` | ✅ Aligned |
| **Bio Narrative copy** | "For over twenty years, I have worked in some of the most demanding arenas..." | `var(--fb)` (Body Sans) | `15px` | Class `frank-b` | ✅ Aligned |
| **Bio Subheading** | "That's why this work matters to me." | `var(--fd)` (Serif) | `clamp(20px, 2.4vw, 30px)` | Class `frank-sub` | ✅ Aligned |
| **Bio Closing Box** | "I do not work with men who want to be fixed. I work with men..." | `var(--fb)` (Body Sans) | `15px` (Bold-muted) | Class `frank-close` | ✅ Aligned |
| **Timeline Subheading** | "The path that built Breakthrough" | `var(--fm)` (Monospace) | `10px` | Class `tl-lbl font-mono text-xs` | ⚠️ **Size Override:** `text-xs` (12px) overrides designated 10px. |
| **Timeline events** | "Founded Monde Osé", etc. | `var(--fu)` (Jost Sans) | `13px` | Class `tl-ev font-sans` | ✅ Aligned (Timeline text uses Jost display style). |

---

### 12. Section 8: Outcomes and earned perspective panels
* **File Reference:** [Outcomes.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Outcomes.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Left Card Headline** | "WHAT YOU WALK AWAY WITH" | `var(--fd)` (Serif) | `--h3` (`clamp(28px, 3.5vw, 52px)`) | Class `oc-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Left Card Bullet Items** | "Greater self-trust.", etc. | `var(--fb)` (Body Sans) | `clamp(15px, 1.7vw, 18px)` | Class `oc-row font-sans` | ✅ Aligned (Body items are sans-serif). |
| **Right Card Headline** | "WHAT TWENTY YEARS HAVE TAUGHT ME" | `var(--fd)` (Serif) | `--h3` (`clamp(28px, 3.5vw, 52px)`) | Class `oc-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Right Card Bullet Items** | "Men do not rise to their potential. They rise to the standards..." | `var(--fb)` (Body Sans) | `clamp(15px, 1.7vw, 18px)` | Class `aph-t font-sans` | ✅ Aligned (Body items are sans-serif). |

---

### 13. Section 7: Program structuring & sessions map
* **File Reference:** [WhatThisActuallyIs.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/WhatThisActuallyIs.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Top Section Title** | "THIS IS NOT JUST A PROGRAM..." | `var(--fd)` (Serif) | `clamp(28px, 4.5vw, 64px)` | Class `font-sans font-normal` inside `TypographicReveal` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **"NOT" Checklist Tags** | "Therapy", "A mastermind", etc. | `var(--fu)` (Jost Sans) | `13px` | Class `not-item font-mono` | ⚠️ **Conflict:** `font-mono` overrides designated Jost sans-serif display style. |
| **Passage Quote Block** | "Breakthrough is six weeks of focused attention..." | `var(--fs)` (Serif Italic) | `clamp(19px, 2.2vw, 26px)` | Class `font-serif italic text-stone-200 text-lg md:text-xl` | ⚠️ **Minor Conflict:** Uses generic Tailwind class overrides instead of fluid `var(--fs)`. |
| **Sessions Eyebrow** | "The Work" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Sessions Headline** | "SIX SESSIONS. ONE DIRECTION." | `var(--fd)` (Serif) | `--h3` (`clamp(28px, 3.5vw, 52px)`) | Class `sess-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Session Numbers** | "01 ·", "02 ·", etc. | `var(--fm)` (Monospace) | `11px` | Class `sr-n font-mono text-xs` | ⚠️ **Size Override:** `text-xs` (12px) overrides designated 11px. |
| **Session Grid Titles** | "THE DIAGNOSTIC", "THE GAP", etc. | `var(--fd)` (Serif) | `--hsub` (`clamp(20px, 2.4vw, 34px)`) | Class `sr-t font-sans font-medium text-lg` | ⚠️ **Conflict:** Overridden with `font-sans` and hardcoded `text-lg` (18px) size. |
| **Session Grid Descriptions** | "We identify where your energy is going..." | `var(--fb)` (Body Sans) | `14px` | Class `sr-d font-sans` | ✅ Aligned (Body items are sans-serif). |
| **Bottom Coda Text** | "Direct access. No team members..." | `var(--fb)` (Body Sans) | `16px` | Class `prog-def font-sans` | ✅ Aligned (Body text is sans-serif). |

---

### 14. Section 9: Auto-sliding Testimonial Cards Carousel
* **File Reference:** [Testimonials.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Testimonials.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Men Who Did the Work" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "WHAT THE MEN SAY." | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `testi-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Card Tag** | "The Successful Man", etc. | `var(--fm)` (Monospace) | `11px` | Class `tcard-tag font-mono text-xs` | ⚠️ **Size Override:** `text-xs` (12px) overrides designated 11px. |
| **Quote Body** | "I had achieved almost everything..." | `var(--fs)` (Serif Italic) | `clamp(19px, 2.5vw, 30px)` | Class `tcard-q font-serif` | ⚠️ **Minor Conflict:** Uses standard Tailwind `font-serif` instead of fluid `var(--fs)`. |
| **Author Name** | "J.M.", "D.R.", "M.T." | `var(--fu)` (Jost Sans) | `14px` | Class `tcard-name font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Jost style. |
| **Author Details** | "CEO · New York", etc. | `var(--fu)` (Jost Sans) | `12px` | Class `tcard-det font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Jost style. |

---

### 15. Section 9-B: Mid Page Action Trigger Hook (Mid-CTA)
* **File Reference:** [MidCTA.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/MidCTA.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Decision Point" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "THE MAN YOU WANT TO BECOME IS NOT WAITING IN THE FUTURE." | `var(--fd)` (Serif) | `clamp(36px, 6vw, 84px)` | Class `mid-hl` | ✅ Aligned (No Tailwind font overrides applied to `mid-hl`). |
| **Subtitle Quote** | "He is waiting on the other side of a decision." | `var(--fs)` (Serif Italic) | `clamp(18px, 2vw, 24px)` | Class `font-serif italic text-lg md:text-xl` | ⚠️ **Minor Conflict:** Bypasses fluid typography variable with static Tailwind responsive sizes. |

---

### 16. Section 10: Private Options and Investments Cards
* **File Reference:** [PrimaryPath.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/PrimaryPath.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Primary Path" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "6 PRIVATE 1:1 SESSIONS WITH FRANK" | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `pp-hl` | ✅ Aligned (No font overrides). |
| **Description paragraph** | "Direct access. No team members. No handoffs..." | `var(--fb)` (Body Sans) | `16px` | Class `pp-body` | ✅ Aligned |
| **Investment label** | "Investment" | `var(--fm)` (Monospace) | `10px` | Class `pp-price-lbl` | ✅ Aligned |
| **Price Amount** | "$2,500" | `var(--fd)` (Serif) | `clamp(72px, 8vw, 108px)` | Class `pp-price` | ✅ Aligned |
| **Price Details** | "Single Payment · 6 Private Sessions · Direct with Frank" | `var(--fm)` (Monospace) | `10px` | Class `pp-pnote` | ✅ Aligned |
| **Scarcity details** | "Limited spots available this cycle..." | `var(--fm)` (Monospace) | `10px` | Class `sc-txt font-mono` | ✅ Aligned |
| **Included bullet descriptions** | "The Diagnostic. First session...", etc. | `var(--fb)` (Body Sans) | `17px` | Class `pp-it font-sans` | ✅ Aligned (Body items are sans-serif). |

---

### 17. Section 11: Special Alliance Invitation Block
* **File Reference:** [Alliance.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Alliance.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Deeper Path" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "THE ALLIANCE" | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `al-sec-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Description** | "For men seeking a deeper level of mentorship..." | `var(--fb)` (Body Sans) | `16px` | Class `al-sec-intro` | ✅ Aligned |
| **Included label** | "What's Included" | `var(--fm)` (Monospace) | `10px` | Class `al-incl-lbl` | ✅ Aligned |
| **Included list elements** | "Extended 1:1 support", etc. | `var(--fb)` (Body Sans) | `16px` | Class `al-incl-row` | ✅ Aligned |
| **Bottom Quote** | "Application required. Discernment on both sides..." | `var(--fb)` (Body Sans) | `15px` | Class `al-right-note font-sans` | ✅ Aligned (Body details are sans-serif). |

---

### 18. Segue: CtaText3
* **File Reference:** [CtaText3.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/CtaText3.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Scroll Reveal Text** | "THIS IS YOUR DECISION POINT..." | `var(--fd)` (Serif) | `clamp(38px, 6vw, 92px)` | Class `text-2xl md:text-4xl lg:text-5xl font-bold` inside `ScrollStatement` | ⚠️ **Size Conflict:** Overridden with Tailwind breakpoint sizes instead of using CSS fluid clamp variable. |

---

### 19. Section 12: Accordion-style responsive FAQ panel
* **File Reference:** [FAQ.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/FAQ.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "Real Questions" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "WHAT I GET ASKED. WHAT I ACTUALLY SAY." | `var(--fd)` (Serif) | `--h2` (`clamp(38px, 5.5vw, 88px)`) | Class `faq-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **FAQ Question Text** | "Is this coaching?", etc. | `var(--fb)` (Body Sans) | `17px` | Class `faq-qt font-sans` | ✅ Aligned (Standard sans-serif text). |
| **FAQ Answer Text** | "No. And that distinction matters...", etc. | `var(--fb)` (Body Sans) | `15px` | Class `faq-ai font-sans` | ✅ Aligned (Standard sans-serif body text). |

---

### 20. Section 13: Immersive choice decision point
* **File Reference:** [Decision.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Decision.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "The Decision" | `var(--fb)` (Body Sans) | `--eyebrow` (`13px`) | Class `eyebrow` | ✅ Aligned |
| **Headline** | "THE MAN YOU WANT TO BECOME IS NOT WAITING IN THE FUTURE." | `var(--fd)` (Serif) | `clamp(42px, 7vw, 96px)` | Class `decision-hl font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda serif. |
| **Description Copy** | "He is waiting on the other side of your decision...", etc. | `var(--fb)` (Body Sans) | `clamp(16px, 1.9vw, 20px)` | Class `decision-b font-sans` | ✅ Aligned (Description body items are sans-serif). |

---

### 21. Section 14: Hand-crafted final letter signed by mentor
* **File Reference:** [FinalWord.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/FinalWord.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Letter Lines** | "I've watched men wait years for the right moment...", etc. | `var(--fs)` (Serif Italic) | `clamp(20px, 2.4vw, 32px)` | Class `fw-txt font-serif` | ⚠️ **Minor Conflict:** Uses standard Tailwind `font-serif` instead of fluid `var(--fs)`. |
| **Signature Name** | "Frank Mondeose" | `var(--fu)` (Jost Sans) | `18px` | Inline style `'Jost', sans-serif` | ✅ Aligned |
| **Signature Title** | "Teacher of Teachers..." | `var(--fm)` (Monospace) | `10px` | Class `text-stone-400 text-sm` | ⚠️ **Size Override:** Bypasses CSS class and variables with Tailwind `text-sm` (14px). |

---

### 22. Section 15: Client-side Interactive checkout validation form
* **File Reference:** [Checkout.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Checkout.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow** | "SECURE YOUR PLACE" | `var(--fm)` (Monospace) | `10px` | Class `co-lbl` with inline `style={{ fontSize: "12px" }}` | ⚠️ **Size Conflict:** Inline styles override designated 10px. |
| **Main Title** | "BREAKTHROUGH" | `var(--fd)` (Serif) | `52px` | Class `co-t font-sans` with inline `style={{ fontSize: "60px" }}` | ⚠️ **Conflict:** `font-sans` overrides Bodoni Moda serif, and size is overridden inline. |
| **Bullet Row Copy** | "6 live 1:1 sessions with Frank directly", etc. | `var(--fb)` (Body Sans) | `14px` | Class `co-row font-sans` with inline `style={{ fontSize: "17px" }}` | ⚠️ **Size Conflict:** Overridden inline to 17px instead of designated 14px. |
| **Investment label** | "INVESTMENT" | `var(--fm)` (Monospace) | `10px` | Class `f-ey` | ✅ Aligned |
| **Investment Price** | "$2,500" | `var(--fd)` (Serif) | `64px` | Class `f-price font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda. |
| **Price Note** | "Breakthrough · Single Payment · Direct with Frank" | `var(--fm)` (Monospace) | `10px` | Class `f-pnote` | ✅ Aligned |
| **Field Labels** | "First Name", "Last Name", etc. | `var(--fm)` (Monospace) | `10px` | Class `f-lbl` | ✅ Aligned |
| **Footer Note** | "Secure checkout · Frank's team confirms your first session..." | `var(--fm)` (Monospace) | `9px` | Class `f-note` | ✅ Aligned |
| **Success Heading** | "You're in." | `var(--fd)` (Serif) | `40px` | Class `fs-h font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda. |

---

### 23. Footer
* **File Reference:** [Footer.tsx](file:///Users/CR7/Desktop/BREAKTHROUGH%20%5B06.18.26%5D/Breakthrough-V2/src/components/Footer.tsx)

| Copy Element / Role | Text Copy Content | Designated Font | Designated Size | Actual Code Implementation (TSX) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Footer Brand Logo** | "BREAKTHROUGH" | `var(--fd)` (Serif) | `22px` | Class `foot-logo font-sans` | ⚠️ **Conflict:** `font-sans` overrides designated Bodoni Moda. |
| **Copyright / Details** | "Frank Mondeose · Monde Osé · Breakthrough..." | `var(--fm)` (Monospace) | `10px` | Class `foot-sub font-mono text-[10px]` | ✅ Aligned |
| **Footer Links** | "Privacy Policy", "Terms", "Contact" | `var(--fu)` (Jost Sans) | `11px` | Class `foot-links a` | ✅ Aligned |
