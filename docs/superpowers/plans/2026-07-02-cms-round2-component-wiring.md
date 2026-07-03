# CMS Round 2 — Component Wiring Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire all 19 public-facing components to consume `useSection<T>(key, fallback)` from the CMS content provider instead of hardcoded constants, while keeping the rendered output pixel-identical in fallback mode (no Supabase credentials).

**Architecture:** Each component imports its typed content interface and default export from `src/data/pageContent.ts`, calls `useSection<T>(key, default)` at the top of the component body, then replaces hardcoded string literals / inline arrays with fields from the returned `content` object. The fallback path returns the identical static data that was previously hardcoded, so no visual change occurs unless a CMS override exists.

**Tech Stack:** React 19, TypeScript, Vite 6, `useSection` hook (src/providers/contentProvider.tsx), typed defaults (src/data/pageContent.ts)

---

## Pre-flight

- [ ] Switch to `cms/infrastructure` and rebase onto latest `main`

```bash
git checkout cms/infrastructure
git fetch origin
git rebase origin/main
# resolve any conflicts (none expected — main has no component changes)
```

- [ ] Confirm `src/data/pageContent.ts` and `src/providers/contentProvider.tsx` are present

```bash
ls src/data/pageContent.ts src/providers/contentProvider.tsx
```

- [ ] Baseline TypeScript check passes

```bash
npx tsc --noEmit
```

Expected: 0 errors.

---

## Chunk 1: Hero, Header, Vision, AuthorityBar

### Task 1: Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

**What changes:** Remove the `BG_IMAGES` local constant. Import `heroContent` + `HeroContent`. Call `useSection`. Replace every hardcoded string/array in JSX with `content.*` fields.

Hardcoded values to replace:
| Current literal | Replaced by |
|---|---|
| `BG_IMAGES` array | `content.backgroundImages` |
| `"BREAKTHROUGH WITH FRANK MONDEOSE"` | `content.eyebrow` |
| Hardcoded 8-word title array (staged word-by-word) | `content.headlineWords` |
| `"THE GAP IS NOT YOUR POTENTIAL."` | `content.subtitleLine1` |
| `"It's the distance…"` | `content.subtitleLine2` |
| `"Begin Your Breakthrough"` (CTA label) | `content.ctaText` |
| `"#checkout"` (CTA href) | `content.ctaLink` |

- [ ] **Step 1: Add imports and hook call**

At top of file, replace existing imports block to add:
```tsx
import { heroContent, HeroContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
Inside `Hero()`, add as first line of function body:
```tsx
const content = useSection<HeroContent>('hero', heroContent);
```

- [ ] **Step 2: Replace BG_IMAGES constant with content.backgroundImages**

Remove the module-level `const BG_IMAGES = [...]` block.

Anywhere `BG_IMAGES` is referenced, replace with `content.backgroundImages`:
- `BG_IMAGES.length` → `content.backgroundImages.length`
- `BG_IMAGES.map(...)` → `content.backgroundImages.map(...)`
- `BG_IMAGES[currentBgIdx].name` → `content.backgroundImages[currentBgIdx].name`
- `setCurrentBgIdx((prev) => (prev + 1) % BG_IMAGES.length)` → use `content.backgroundImages.length`

Note: the `currentBgIdx` mod calculation inside `useEffect` references `BG_IMAGES.length`. Because `content` is a const inside the component, move the interval setup into an effect that has access to `content.backgroundImages.length`, or derive the length before the effect. Since `content` is stable (it's the fallback in no-Supabase mode), this is fine.

- [ ] **Step 3: Replace hardcoded title words**

The 8-word hero title currently uses a `wordsActive` array sized to `Array(8).fill(false)`. Update the initial state to use `content.headlineWords.length`:
```tsx
const [wordsActive, setWordsActive] = useState<boolean[]>(() => Array(content.headlineWords.length).fill(false));
```
And the word-timer loop `Array(8).fill(null).map(...)` becomes:
```tsx
Array(content.headlineWords.length).fill(null).map(...)
```
In JSX, the mapped word elements pull from `content.headlineWords`.

- [ ] **Step 4: Replace remaining hardcoded strings in JSX**

- Eyebrow div: replace `"BREAKTHROUGH WITH FRANK MONDEOSE"` with `{content.eyebrow}`
- Subtitle line 1: replace literal with `{content.subtitleLine1}`
- Subtitle line 2: replace literal with `{content.subtitleLine2}`
- CTA anchor `href`: replace `"#checkout"` with `{content.ctaLink}`
- CTA anchor text: replace `"Begin Your Breakthrough"` with `{content.ctaText}`

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: 0 errors on Hero.

---

### Task 2: Header.tsx

**Files:**
- Modify: `src/components/Header.tsx`

Hardcoded values to replace:
| Current literal | Replaced by |
|---|---|
| `"BREAKTHROUGH"` (strong) | `content.brandName` |
| `"6 Sessions · 1:1 with Frank"` | `content.descriptor` |
| `"Begin Your Breakthrough →"` | `content.ctaText` |
| `"#checkout"` (href) | `content.ctaLink` |

- [ ] **Step 1: Add imports and hook**

```tsx
import { headerContent, HeaderContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
First line of `Header()`:
```tsx
const content = useSection<HeaderContent>('header', headerContent);
```

- [ ] **Step 2: Replace JSX literals**

```tsx
<strong>{content.brandName}</strong>
<span className="bar-desc">
  <span className="bar-pipe">·</span> {content.descriptor}
</span>
…
<a href={content.ctaLink} className="bar-btn" data-cursor-label="Begin">
  {content.ctaText}
</a>
```

Note: `descriptor` in the default is `"6 Sessions · 1:1 with Frank"` — the separator dot is already embedded. The existing JSX wraps the separator in a `<span>`. Keep the span for the visual separator and render only the text portion after it, **or** simply output `content.descriptor` as-is and remove the extra `<span className="bar-pipe">·</span>`. The default value matches the existing visual, so either approach is pixel-identical. Simplest: remove the extra span and output `{content.descriptor}` directly — the default includes the full string `"6 Sessions · 1:1 with Frank"` without a leading ` · `. Re-check the pageContent default: `descriptor: "6 Sessions · 1:1 with Frank"`. The original JSX is `· 6 Sessions · 1:1 with Frank` (dot span + text). To keep pixel parity, keep the bar-pipe span and source only the body text. Split: the default descriptor already includes the dots between sessions/frank but **not** the leading separator. So keep `<span className="bar-pipe">·</span>` and render `{content.descriptor}` after it.

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

---

### Task 3: Vision.tsx

**Files:**
- Modify: `src/components/Vision.tsx`

Vision is a special case. The phrases are individually positioned in the JSX with hardcoded `style={{ top, left }}` layout coordinates that encode the editorial composition. The `VisionContent` shape is `{ phrases: { text: string; register: "connective"|"substantive"|"declarative" }[] }` — it defines *what* the phrases are, not *where* they sit. The layout (positioning, word-splitting per phrase) must remain hardcoded in JSX.

**What changes:** Source `text` for each Phrase from `content.phrases[i].text` instead of hardcoded string literals. The structural JSX (positioning, word-split spans, className) stays untouched.

- [ ] **Step 1: Add imports and hook**

```tsx
import { visionContent, VisionContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
First line of `Vision()`:
```tsx
const content = useSection<VisionContent>('vision', visionContent);
```

- [ ] **Step 2: Replace phrase text**

The current JSX has phrases like:
```tsx
<Phrase register="connective" ...>
  <span>FOR</span>
  <span>OVER</span>
</Phrase>
```

Replace with `content.phrases[i].text` split on space:
```tsx
{content.phrases[0].text.split(' ').map((w, i) => <span key={i}>{w}</span>)}
```

Apply to all 9 phrase positions. Keep all positioning styles, className props, and the declarative phrases' special accent markup. For the accent phrases (THROUGH, LEADERSHIP), which have `<span className="edt-emphasis edt-emphasis--bodoni edt-emphasis--accent edt-emphasis--glow">`, keep the wrapping markup and just source the text from `content.phrases[i].text`.

Phrase index mapping (by order in JSX):
- 0 → "FOR OVER"
- 1 → "TWENTY YEARS"
- 2 → "I'VE HELPED MEN"
- 3 → "CLOSE THAT GAP"
- 4 → "THROUGH" (accent)
- 5 → "STRUCTURE,"
- 6 → "ACCOUNTABILITY,"
- 7 → "AND HONEST"
- 8 → "LEADERSHIP" (accent)

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

---

### Task 4: AuthorityBar.tsx

**Files:**
- Modify: `src/components/AuthorityBar.tsx`

Hardcoded: 5 individual stat cells (`Counter` components + static word cells). Replace with a mapped loop over `content.stats`.

- [ ] **Step 1: Add imports and hook**

```tsx
import { authorityBarContent, AuthorityBarContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
First line of `AuthorityBar()`:
```tsx
const content = useSection<AuthorityBarContent>('authority_bar', authorityBarContent);
```

- [ ] **Step 2: Replace 5 hardcoded cells with a map**

Replace the 5 explicit `<div className="auth-cell">` blocks with:
```tsx
{content.stats.map((stat) => (
  <div key={stat.label} className="auth-cell">
    {stat.isCounter ? (
      <Counter target={Number(stat.value)} suffix={stat.suffix ?? ''} trigger={isVisible} />
    ) : (
      <span className="auth-w">{stat.value}</span>
    )}
    <span className="auth-l">{stat.label}</span>
  </div>
))}
```

Note: `stat.value` is typed `string` in `AuthorityBarContent`. `Counter.target` expects `number`. Cast with `Number(stat.value)`.

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

---

### Task 5: Commit Chunk 1

```bash
git add src/components/Hero.tsx src/components/Header.tsx \
        src/components/Vision.tsx src/components/AuthorityBar.tsx
git commit -m "feat(cms): wire Hero, Header, Vision, AuthorityBar to useSection"
```

---

## Chunk 2: AnchorQuote, MenIMeet, RealEnemy, AlignedOtherSide

### Task 6: AnchorQuote.tsx

**Files:**
- Modify: `src/components/AnchorQuote.tsx`

Hardcoded values to replace: section number `"01"`, eyebrow `"From the first step you take"`, headline words array, and 3 quote lines.

- [ ] **Step 1: Add imports and hook**

```tsx
import { anchorQuoteContent, AnchorQuoteContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<AnchorQuoteContent>('anchor_quote', anchorQuoteContent);
```

- [ ] **Step 2: Replace literals**

- `"01"` → `{content.sectionNumber}`
- `"From the first step you take"` → `{content.eyebrow}`
- `headlineWords` array → `content.headlineWords`
- Three `KineticText` text props → `content.quoteLine1`, `content.quoteLine2`, `content.quoteLine3`

- [ ] **Step 3: TypeScript check**

---

### Task 7: MenIMeet.tsx

**Files:**
- Modify: `src/components/MenIMeet.tsx`

Hardcoded: `PROFILES` array, eyebrow, headline words, intro lines, closer headline/body.

- [ ] **Step 1: Add imports and hook**

```tsx
import { menIMeetContent, MenIMeetContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<MenIMeetContent>('men_i_meet', menIMeetContent);
```

- [ ] **Step 2: Remove PROFILES constant, replace with content.profiles**

Delete the `const PROFILES: ProfileItem[]` block. Replace all `PROFILES.map(...)` with `content.profiles.map(...)`.

- [ ] **Step 3: Replace remaining literals**

- Eyebrow → `{content.eyebrow}`
- Headline words → `content.headlineWords`
- Intro line 1 → `{content.introLine1}`
- Intro line 2 → `{content.introLine2}`
- Closer headline → `{content.closerHeadline}` (split on `\n` if rendered as two lines)
- Closer body → `dangerouslySetInnerHTML={{ __html: content.closerBody }}` (richtext — no sanitization yet per Round 4 spec)

- [ ] **Step 4: TypeScript check**

---

### Task 8: RealEnemy.tsx

**Files:**
- Modify: `src/components/RealEnemy.tsx`

**Special case:** Current `NARRATIVE_BLOCKS` uses `node: <JSX>` elements. The `RealEnemyContent` type uses `html: string` instead. Swap to `dangerouslySetInnerHTML`.

Hardcoded: `NARRATIVE_BLOCKS`, `HEADLINE` word array, section number, eyebrow.

- [ ] **Step 1: Add imports and hook**

```tsx
import { realEnemyContent, RealEnemyContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<RealEnemyContent>('real_enemy', realEnemyContent);
```

- [ ] **Step 2: Remove NARRATIVE_BLOCKS and HEADLINE constants**

Delete both module-level constants.

- [ ] **Step 3: Replace HEADLINE usage**

The word-scrub headline currently maps `HEADLINE` items with `{ word, sv?, br? }`. Replace with `content.headlineWords.map(...)`. Shape is identical.

- [ ] **Step 4: Replace NARRATIVE_BLOCKS with html rendering**

Current pattern:
```tsx
{NARRATIVE_BLOCKS.map((b) => (
  <div key={b.id} className={b.className}>{b.node}</div>
))}
```

The current `className` per block is embedded in the JSX node structure. The `RealEnemyContent` type does not carry a `className` per block — only `id` and `html`. The className variants (`mt-4`, `border-l border-[var(--sv)] pl-4 text-white`, etc.) are visual formatting embedded in the data vs JSX. The html strings in `realEnemyContent` embed those Tailwind classes inside the `<p>` tags directly (check: `class="text-[var(--sv)]"`, `style="..."` etc). 

Strategy: render each block with `dangerouslySetInnerHTML={{ __html: block.html }}` and a wrapper div with no class (since classes are in the html). Check that the wrapper previously provided additional className (`mt-4`, etc.) — if so, those need to be preserved. Looking at the current code: the `NARRATIVE_BLOCKS` items have a `className` prop on the wrapper div. The pageContent `html` strings embed the paragraph styles. For pixel parity, map a className per index or embed spacing in the html. Simplest: keep an inline className array to match spacing, since the content type doesn't carry wrapperClass:

```tsx
const wrapperClasses = ['', 'mt-4', 'mt-4', 'mt-1', 'mt-6 border-l border-[var(--sv)] pl-4 text-white'];
{content.narrativeBlocks.map((b, i) => (
  <div key={b.id} className={wrapperClasses[i] ?? ''} dangerouslySetInnerHTML={{ __html: b.html }} />
))}
```

This keeps the exact same visual spacing as before. Note: the `border-l` and `text-white` were on the wrapper in the original code, but those classes are now also embedded in the html string in pageContent. Verify by checking `realEnemyContent.narrativeBlocks[4].html` — it includes `class="..."` on the `<p>`. Remove the duplicate from the wrapper to avoid double styling. Since the html already carries the border styling inside `<p>`, the wrapper only needs spacing: `'', 'mt-4', 'mt-4', 'mt-1', 'mt-6'`.

- [ ] **Step 5: Replace section metadata literals**

- Section number → `{content.sectionNumber}`
- Eyebrow → `{content.eyebrow}`

- [ ] **Step 6: TypeScript check**

---

### Task 9: AlignedOtherSide.tsx

**Files:**
- Modify: `src/components/AlignedOtherSide.tsx`

Hardcoded: `HEADLINE` words array, subtitle, bullet items, coda.

- [ ] **Step 1: Add imports and hook**

```tsx
import { alignedOtherSideContent, AlignedOtherSideContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<AlignedOtherSideContent>('aligned_other_side', alignedOtherSideContent);
```

- [ ] **Step 2: Remove HEADLINE constant, replace with content.headlineWords**

- [ ] **Step 3: Replace bullet items and prose**

- Subtitle → `{content.subtitle}`
- Bullet items → `content.bulletItems.map(...)`
- Coda → `{content.coda}`

- [ ] **Step 4: TypeScript check**

---

### Task 10: Commit Chunk 2

```bash
git add src/components/AnchorQuote.tsx src/components/MenIMeet.tsx \
        src/components/RealEnemy.tsx src/components/AlignedOtherSide.tsx
git commit -m "feat(cms): wire AnchorQuote, MenIMeet, RealEnemy, AlignedOtherSide to useSection"
```

---

## Chunk 3: Outcomes, WhatThisActuallyIs, Testimonials, MidCTA

### Task 11: Outcomes.tsx

**Files:**
- Modify: `src/components/Outcomes.tsx`

Hardcoded: walk-away items list, "What you walk away with" headline words, "Twenty years" items list and headline words.

- [ ] **Step 1: Add imports and hook**

```tsx
import { outcomesContent, OutcomesContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<OutcomesContent>('outcomes', outcomesContent);
```

- [ ] **Step 2: Replace walk-away section**

- Headline words → `content.walkAwayHeadlineWords`
- Walk-away items → `content.walkAwayItems.map(...)` — each item has `{ marker, text, isStar? }`. Text may contain HTML (`<strong>`). Use `dangerouslySetInnerHTML={{ __html: item.text }}` for item text rendering (richtext, no sanitization yet).

- [ ] **Step 3: Replace twenty-years section**

- Headline words → `content.twentyYearsHeadlineWords`
- Items → `content.twentyYearsItems.map(...)` — each is a string with embedded `<strong>`. Use `dangerouslySetInnerHTML={{ __html: item }}`.

- [ ] **Step 4: TypeScript check**

---

### Task 12: WhatThisActuallyIs.tsx

**Files:**
- Modify: `src/components/WhatThisActuallyIs.tsx`

Hardcoded: `SESSIONS` array, section number, headline words, passage words, "not" items, CTA.

- [ ] **Step 1: Add imports and hook**

```tsx
import { whatThisIsContent, WhatThisIsContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<WhatThisIsContent>('what_this_is', whatThisIsContent);
```

- [ ] **Step 2: Remove SESSIONS constant, replace with content.sessions**

Delete the `const SESSIONS: SessionItem[]` block. Replace `SESSIONS.map(...)` with `content.sessions.map(...)`.

- [ ] **Step 3: Replace remaining literals**

- Section number → `{content.sectionNumber}`
- Headline words → `content.headlineWords`
- Passage words → `content.passageWords`
- Not-lead text → `{content.notLeadText}`
- Not items → `content.notItems.map(...)`
- Sessions eyebrow → `{content.sessionsEyebrow}`
- Sessions headline words → `content.sessionsHeadlineWords`
- CTA text → `{content.ctaText}`
- CTA href → `{content.ctaLink}`

- [ ] **Step 4: TypeScript check**

---

### Task 13: Testimonials.tsx

**Files:**
- Modify: `src/components/Testimonials.tsx`

Hardcoded: `TESTIMONIALS` array, eyebrow, headline words.

- [ ] **Step 1: Add imports and hook**

```tsx
import { testimonialContent, TestimonialContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<TestimonialContent>('testimonials', testimonialContent);
```

- [ ] **Step 2: Remove TESTIMONIALS constant, replace with content.testimonials**

Delete `const TESTIMONIALS: TestimonialItem[]` block.
- `TESTIMONIALS.length` → `content.testimonials.length`
- `TESTIMONIALS.map(...)` → `content.testimonials.map(...)`
- `TESTIMONIALS[current]` → `content.testimonials[current]`

- [ ] **Step 3: Replace prose literals**

- Eyebrow → `{content.eyebrow}`
- Headline words → `content.headlineWords`

- [ ] **Step 4: TypeScript check**

---

### Task 14: MidCTA.tsx

**Files:**
- Modify: `src/components/MidCTA.tsx`

Hardcoded: section number `"05"`, eyebrow `"The Decision Point"`, headline words, subtitle, CTA text/link.

- [ ] **Step 1: Add imports and hook**

```tsx
import { midCtaContent, MidCtaContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<MidCtaContent>('mid_cta', midCtaContent);
```

- [ ] **Step 2: Replace literals**

- `"05"` → `{content.sectionNumber}`
- `"The Decision Point"` → `{content.eyebrow}`
- Headline words array → `content.headlineWords`
- Subtitle → `{content.subtitle}`
- CTA text → `{content.ctaText}`
- CTA href → `{content.ctaLink}`

- [ ] **Step 3: TypeScript check**

---

### Task 15: Commit Chunk 3

```bash
git add src/components/Outcomes.tsx src/components/WhatThisActuallyIs.tsx \
        src/components/Testimonials.tsx src/components/MidCTA.tsx
git commit -m "feat(cms): wire Outcomes, WhatThisActuallyIs, Testimonials, MidCTA to useSection"
```

---

## Chunk 4: PrimaryPath, Alliance, FAQ, Decision

### Task 16: PrimaryPath.tsx

**Files:**
- Modify: `src/components/PrimaryPath.tsx`

Hardcoded: `PP_ITEMS` array, eyebrow, headline words, body paragraphs, CTA, scarcity text.

- [ ] **Step 1: Add imports and hook**

```tsx
import { primaryPathContent, PrimaryPathContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<PrimaryPathContent>('primary_path', primaryPathContent);
```

- [ ] **Step 2: Remove PP_ITEMS constant, replace with content.items**

Delete `const PP_ITEMS = [...]`. Replace `PP_ITEMS.map(...)` with `content.items.map(...)`.

- [ ] **Step 3: Replace prose literals**

- Eyebrow → `{content.eyebrow}`
- Headline words → `content.headlineWords`
- Body paragraphs → `content.bodyParagraphs.map(...)`
- CTA text → `{content.ctaText}` (note: default has `\n` — keep existing line-break rendering)
- CTA href → `{content.ctaLink}`
- Scarcity text → `{content.scarcityText}`
- Investment label → `{content.investmentLabel}`
- Investment price → `{content.investmentPrice}`
- Investment note → `{content.investmentNote}`

- [ ] **Step 4: TypeScript check**

---

### Task 17: Alliance.tsx

**Files:**
- Modify: `src/components/Alliance.tsx`

Hardcoded: eyebrow, headline words, intro paragraph, CTA text, included items, application note, modal content.

- [ ] **Step 1: Add imports and hook**

```tsx
import { allianceContent, AllianceContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<AllianceContent>('alliance', allianceContent);
```

- [ ] **Step 2: Replace literals**

- Eyebrow → `{content.eyebrow}`
- Headline words → `content.headlineWords`
- Intro paragraph → `{content.introParagraph}`
- Apply CTA text → `{content.applyCtaText}` (has `\n` — check existing rendering)
- Included label → `{content.includedLabel}`
- Included items → `content.includedItems.map(...)`
- Application note → `{content.applicationNote}`
- Modal title → `{content.modalTitle}`
- Modal body → `dangerouslySetInnerHTML={{ __html: content.modalBody }}` (has `<strong>` — richtext)
- Modal button text → `{content.modalButtonText}`

- [ ] **Step 3: TypeScript check**

---

### Task 18: FAQ.tsx

**Files:**
- Modify: `src/components/FAQ.tsx`

Hardcoded: `FAQ_ITEMS` array, eyebrow, headline words.

- [ ] **Step 1: Add imports and hook**

```tsx
import { faqContent, FaqContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<FaqContent>('faq', faqContent);
```

- [ ] **Step 2: Remove FAQ_ITEMS constant, replace with content.items**

Delete `const FAQ_ITEMS: FAQItem[]` block. Replace `FAQ_ITEMS.map(...)` with `content.items.map(...)`.

Also update `openIndex` toggle if it references FAQ_ITEMS length anywhere.

- [ ] **Step 3: Replace prose literals**

- Eyebrow → `{content.eyebrow}`
- Headline words → `content.headlineWords`

Answer text already renders as HTML (check current code) — if via `dangerouslySetInnerHTML`, keep as-is (just sourcing from `content.items[i].answer`). If hardcoded HTML, the content.items answers contain `<strong>` so use `dangerouslySetInnerHTML`.

- [ ] **Step 4: TypeScript check**

---

### Task 19: Decision.tsx

**Files:**
- Modify: `src/components/Decision.tsx`

Hardcoded: `HEADLINE` string, section number, eyebrow, sub-headline, body paragraphs, CTA.

- [ ] **Step 1: Add imports and hook**

```tsx
import { decisionContent, DecisionContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<DecisionContent>('decision', decisionContent);
```

- [ ] **Step 2: Remove HEADLINE constant, replace with content.headline**

Delete `const HEADLINE = "..."`. Replace `parseEmphasisLine(HEADLINE)` with `parseEmphasisLine(content.headline)`.

- [ ] **Step 3: Replace prose literals**

- Section number → `{content.sectionNumber}`
- Eyebrow → `{content.eyebrow}`
- Sub-headline → `{content.subHeadline}`
- Body paragraphs → `content.bodyParagraphs.map(...)`
- CTA text → `{content.ctaText}`
- CTA href → `{content.ctaLink}`

- [ ] **Step 4: TypeScript check**

---

### Task 20: Commit Chunk 4

```bash
git add src/components/PrimaryPath.tsx src/components/Alliance.tsx \
        src/components/FAQ.tsx src/components/Decision.tsx
git commit -m "feat(cms): wire PrimaryPath, Alliance, FAQ, Decision to useSection"
```

---

## Chunk 5: FinalWord, Checkout, Footer

### Task 21: FinalWord.tsx

**Files:**
- Modify: `src/components/FinalWord.tsx`

Hardcoded: `LINES` array, signature name, signature titles, portrait image paths.

- [ ] **Step 1: Add imports and hook**

```tsx
import { finalWordContent, FinalWordContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<FinalWordContent>('final_word', finalWordContent);
```

- [ ] **Step 2: Remove LINES constant, replace with content.lines**

Delete `const LINES = [...]`. Replace `LINES.map(...)` with `content.lines.map(...)`.

- [ ] **Step 3: Replace remaining literals**

- Signature name → `{content.signatureName}`
- Signature titles → `{content.signatureTitles}` (has `\n` — check rendering: split on `\n` if needed)
- Portrait `<img src>` → `{content.portraitImage}` (and `<source srcSet>` for webp → `{content.portraitWebp}`)

- [ ] **Step 4: TypeScript check**

---

### Task 22: Checkout.tsx

**Files:**
- Modify: `src/components/Checkout.tsx`

Hardcoded: section label, headline, checklist items, investment price/label/note, form labels, profile options, submit text, form note, success messages.

- [ ] **Step 1: Add imports and hook**

```tsx
import { checkoutContent, CheckoutContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<CheckoutContent>('checkout', checkoutContent);
```

- [ ] **Step 2: Replace literals throughout JSX**

- Section label → `{content.sectionLabel}`
- Headline → `{content.headline}`
- Checklist items → `content.checklistItems.map(...)`
- Investment label → `{content.investmentLabel}`
- Investment price → `{content.investmentPrice}`
- Investment note → `{content.investmentNote}`
- Form placeholder/label for firstName → `{content.formLabels.firstName}`
- Form placeholder/label for lastName → `{content.formLabels.lastName}`
- Form placeholder/label for email → `{content.formLabels.email}`
- Form placeholder/label for phone → `{content.formLabels.phone}`
- Form placeholder/label for profile → `{content.formLabels.profile}`
- `<option>` elements for profile select → `content.profileOptions.map(...)`
- Submit button text → `{content.submitText}`
- Form note → `{content.formNote}`
- Success icon → `{content.successIcon}`
- Success headline → `{content.successHeadline}`
- Success body → interpolate `{content.successBody.replace('{email}', email)}` (template token for user's email address)
- Reset button text → `{content.resetButtonText}`

- [ ] **Step 3: TypeScript check**

---

### Task 23: Footer.tsx

**Files:**
- Modify: `src/components/Footer.tsx`

Hardcoded: `WORDMARK` constant (letter array), subtitle text, legal links.

- [ ] **Step 1: Add imports and hook**

```tsx
import { footerContent, FooterContent } from '../data/pageContent';
import { useSection } from '../providers/contentProvider';
```
```tsx
const content = useSection<FooterContent>('footer', footerContent);
```

- [ ] **Step 2: Replace WORDMARK constant with derived computation**

Delete `const WORDMARK = [...]`. Derive from `content.wordmark` and `content.wordmarkAccentStart`:

```tsx
const WORDMARK = content.wordmark.split('').map((ch, i) => ({
  ch,
  sv: i >= content.wordmarkAccentStart,
}));
```

This is pixel-identical for the default (`wordmark: "BREAKTHROUGH"`, `wordmarkAccentStart: 5` → first 5 chars = "BREAK", rest = "THROUGH" with `.sv`).

- [ ] **Step 3: Replace subtitle and legal links**

- `foot-sub` paragraph text → `{content.subtitle}`
- Legal links list → `content.legalLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)`

- [ ] **Step 4: TypeScript check**

---

### Task 24: Commit Chunk 5

```bash
git add src/components/FinalWord.tsx src/components/Checkout.tsx \
        src/components/Footer.tsx
git commit -m "feat(cms): wire FinalWord, Checkout, Footer to useSection"
```

---

## Chunk 6: Verification & Final Commit

### Task 25: Full TypeScript compile

```bash
npx tsc --noEmit
```

Expected: 0 errors.

If errors appear, fix them before proceeding.

---

### Task 26: Production build

```bash
npm run build
```

Expected: Build completes with no errors. Bundle sizes should be similar to pre-change (data moved from file-level constants into the same file's exports — no net change in bundle).

---

### Task 27: useSection coverage check

```bash
grep -rn "useSection" src/components/ | wc -l
```

Expected: **19** (one per component file). Some components may call it once; note any file calling it more than once (e.g. if a component covers multiple logical sub-sections).

If count is low, check which component files are missing:
```bash
grep -rL "useSection" src/components/{Hero,Header,Vision,AuthorityBar,AnchorQuote,MenIMeet,RealEnemy,AlignedOtherSide,Outcomes,WhatThisActuallyIs,Testimonials,MidCTA,PrimaryPath,Alliance,FAQ,Decision,FinalWord,Checkout,Footer}.tsx
```

---

### Task 28: Spot-check literal replacement

```bash
# Confirm literals were actually replaced (not just imported)
grep -n "\"hero\"\|'hero'" src/components/Hero.tsx | grep useSection
grep -n "\"vision\"\|'vision'" src/components/Vision.tsx | grep useSection

# Confirm no hardcoded BG_IMAGES, FAQ_ITEMS, TESTIMONIALS remain
grep -n "BG_IMAGES\|FAQ_ITEMS\|TESTIMONIALS\|PROFILES\|PP_ITEMS\|SESSIONS\|NARRATIVE_BLOCKS\|HEADLINE\|LINES\|WORDMARK" \
  src/components/Hero.tsx \
  src/components/FAQ.tsx \
  src/components/Testimonials.tsx \
  src/components/MenIMeet.tsx \
  src/components/WhatThisActuallyIs.tsx \
  src/components/RealEnemy.tsx \
  src/components/AlignedOtherSide.tsx \
  src/components/PrimaryPath.tsx \
  src/components/FinalWord.tsx \
  src/components/Footer.tsx \
  src/components/Decision.tsx
```

Expected: No matches for those old constant names.

---

### Task 29: Dev server visual spot-check

```bash
npm run dev
```

Open at `http://localhost:5173`. Compare visually against the live staging site at `https://breakthrough-experience-v2.vercel.app`.

Check at minimum:
- [ ] **Hero** — images rotate, eyebrow, headline, subtitle, CTA button all render correctly
- [ ] **FAQ** — all 7 questions present, accordion expand/collapse works
- [ ] **Testimonials** — 3 slides present, autoplay works, dots navigate correctly
- [ ] **Checkout** — form labels, checklist items, price, success flow all render

Flag any visual drift with a screenshot and note which field changed.

---

### Task 30: Final commit and push

```bash
git add -p   # review any unstaged changes
git commit -m "feat(cms): Round 2 complete — all 19 components wired to useSection"
git push origin cms/infrastructure
```

---

## Acceptance Criteria

| Check | Expected |
|---|---|
| `npx tsc --noEmit` | 0 errors |
| `npm run build` | Build succeeds |
| `grep -rn "useSection" src/components/ \| wc -l` | 19 |
| Visual comparison: Hero, FAQ, Testimonials, Checkout | Pixel-identical to staging |
| No hardcoded `BG_IMAGES`, `FAQ_ITEMS`, `TESTIMONIALS`, `PROFILES`, `PP_ITEMS`, `SESSIONS` constants remaining | All replaced |

## Notes for Implementer

- **Do not** change GSAP animations, scroll triggers, class names, or component structure — only the data source.
- **Do not** add DOMPurify sanitization to richtext fields yet — that is Round 4. Use raw `dangerouslySetInnerHTML` for html string fields.
- **RealEnemy** wrapper class spacing (`mt-4`, `mt-1`, `mt-6`) is kept as an inline array since the content type doesn't carry wrapperClass. This is intentional.
- **Vision** phrase text is split on spaces per-phrase. Accent phrases (index 4 and 8 = THROUGH, LEADERSHIP) keep their `edt-emphasis` wrapper markup around the text.
- **Footer WORDMARK** is now derived at runtime from `content.wordmark` + `content.wordmarkAccentStart` — this keeps the letter animation untouched.
- **Checkout successBody** contains a `{email}` template token; interpolate with the form state email value.
- In fallback mode (no Supabase env vars), `useSection` returns the imported default — rendered output is byte-for-byte identical to pre-Round 2.
