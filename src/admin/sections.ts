// Mirrors the keys of ALL_SECTION_DEFAULTS (src/data/pageContent.ts, cms/foundation-data).
// Replace with a direct import once cms/foundation-data is merged to main:
//   import { ALL_SECTION_DEFAULTS } from '../data/pageContent';
//   export const SECTIONS = Object.keys(ALL_SECTION_DEFAULTS).map(key => ({ key, label: ... }));

export interface SectionMeta {
  key: string;
  label: string;
}

export const SECTIONS: SectionMeta[] = [
  { key: 'hero',               label: 'Hero' },
  { key: 'header',             label: 'Header' },
  { key: 'vision',             label: 'Vision' },
  { key: 'authority_bar',      label: 'Authority Bar' },
  { key: 'anchor_quote',       label: 'Anchor Quote' },
  { key: 'men_i_meet',         label: 'Men I Meet' },
  { key: 'real_enemy',         label: 'Real Enemy' },
  { key: 'cta_text_1',         label: 'CTA Text 1' },
  { key: 'identity_gap',       label: 'Identity Gap' },
  { key: 'aligned_other_side', label: 'Aligned Other Side' },
  { key: 'cta_text_2',         label: 'CTA Text 2' },
  { key: 'meet_frank',         label: 'Meet Frank' },
  { key: 'outcomes',           label: 'Outcomes' },
  { key: 'what_this_is',       label: 'What This Is' },
  { key: 'testimonials',       label: 'Testimonials' },
  { key: 'mid_cta',            label: 'Mid CTA' },
  { key: 'primary_path',       label: 'Primary Path' },
  { key: 'alliance',           label: 'Alliance' },
  { key: 'cta_text_3',         label: 'CTA Text 3' },
  { key: 'faq',                label: 'FAQ' },
  { key: 'decision',           label: 'Decision' },
  { key: 'final_word',         label: 'Final Word' },
  { key: 'checkout',           label: 'Checkout' },
  { key: 'footer',             label: 'Footer' },
];
