import type { FieldDef } from './editors/types';

export const SECTION_SCHEMA: Record<string, FieldDef[]> = {
  hero: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'subtitleLine1', label: 'Subtitle Line 1', type: 'text' },
    { key: 'subtitleLine2', label: 'Subtitle Line 2', type: 'text' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
    {
      key: 'backgroundImages', label: 'Background Images', type: 'object_array',
      fields: [
        { key: 'src', label: 'Image Src', type: 'text' },
        { key: 'webp', label: 'Image WebP', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
      ],
    },
  ],

  header: [
    { key: 'brandName', label: 'Brand Name', type: 'text' },
    { key: 'descriptor', label: 'Descriptor', type: 'text' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
  ],

  vision: [
    {
      key: 'phrases', label: 'Phrases', type: 'object_array',
      fields: [
        { key: 'text', label: 'Text', type: 'text' },
        { key: 'register', label: 'Register (connective/substantive/declarative)', type: 'text' },
      ],
    },
  ],

  authority_bar: [
    {
      key: 'stats', label: 'Stats', type: 'object_array',
      fields: [
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'suffix', label: 'Suffix (optional)', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'isCounter', label: 'Is Counter', type: 'boolean' },
      ],
    },
  ],

  anchor_quote: [
    { key: 'sectionNumber', label: 'Section Number', type: 'text' },
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'quoteLine1', label: 'Quote Line 1', type: 'text' },
    { key: 'quoteLine2', label: 'Quote Line 2', type: 'text' },
    { key: 'quoteLine3', label: 'Quote Line 3', type: 'text' },
  ],

  men_i_meet: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'introLine1', label: 'Intro Line 1', type: 'text' },
    { key: 'introLine2', label: 'Intro Line 2', type: 'text' },
    {
      key: 'profiles', label: 'Profiles', type: 'object_array',
      fields: [
        { key: 'id', label: 'ID', type: 'text' },
        { key: 'num', label: 'Number Label', type: 'text' },
        { key: 'title', label: 'Title (HTML)', type: 'richtext' },
        { key: 'body', label: 'Body (HTML)', type: 'richtext' },
        { key: 'image', label: 'Image Path', type: 'text' },
      ],
    },
    { key: 'closerHeadline', label: 'Closer Headline', type: 'text' },
    { key: 'closerBody', label: 'Closer Body (HTML)', type: 'richtext' },
  ],

  real_enemy: [
    { key: 'sectionNumber', label: 'Section Number', type: 'text' },
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    {
      key: 'headlineWords', label: 'Headline Words', type: 'object_array',
      fields: [
        { key: 'word', label: 'Word', type: 'text' },
        { key: 'sv', label: 'Styled Variant', type: 'boolean' },
        { key: 'br', label: 'Line Break After', type: 'boolean' },
      ],
    },
    {
      key: 'narrativeBlocks', label: 'Narrative Blocks', type: 'object_array',
      fields: [
        { key: 'id', label: 'ID', type: 'text' },
        { key: 'html', label: 'HTML', type: 'richtext' },
      ],
    },
  ],

  cta_text_1: [
    {
      key: 'lines', label: 'Lines', type: 'object_array',
      fields: [
        { key: 'text', label: 'Text', type: 'text' },
        { key: 'className', label: 'CSS Class', type: 'text' },
      ],
    },
  ],

  identity_gap: [
    { key: 'sectionNumber', label: 'Section Number', type: 'text' },
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'bodyWords', label: 'Body Words', type: 'string_array' },
    {
      key: 'gapRows', label: 'Gap Rows', type: 'object_array',
      fields: [
        { key: 'id', label: 'ID', type: 'text' },
        { key: 'num', label: 'Number Label', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'text' },
        { key: 'highlight', label: 'Highlight (HTML)', type: 'richtext' },
      ],
    },
  ],

  aligned_other_side: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    {
      key: 'headlineWords', label: 'Headline Words', type: 'object_array',
      fields: [
        { key: 'word', label: 'Word', type: 'text' },
        { key: 'sv', label: 'Styled Variant', type: 'boolean' },
        { key: 'br', label: 'Line Break After', type: 'boolean' },
      ],
    },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'bulletItems', label: 'Bullet Items', type: 'string_array' },
    { key: 'coda', label: 'Coda', type: 'text' },
  ],

  cta_text_2: [
    {
      key: 'lines', label: 'Lines', type: 'object_array',
      fields: [
        { key: 'text', label: 'Text (markdown syntax supported)', type: 'text' },
        { key: 'className', label: 'CSS Class', type: 'text' },
      ],
    },
  ],

  meet_frank: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'badgeName', label: 'Badge Name', type: 'text' },
    { key: 'badgeTitle', label: 'Badge Title', type: 'text' },
    { key: 'bioParagraphs', label: 'Bio Paragraphs', type: 'string_array' },
    { key: 'subHeadline', label: 'Sub-Headline', type: 'text' },
    { key: 'closingStatement', label: 'Closing Statement', type: 'text' },
    { key: 'timelineLabel', label: 'Timeline Label', type: 'text' },
    {
      key: 'timeline', label: 'Timeline', type: 'object_array',
      fields: [
        { key: 'year', label: 'Year', type: 'text' },
        { key: 'event', label: 'Event', type: 'text' },
        { key: 'highlight', label: 'Highlight', type: 'boolean' },
      ],
    },
    { key: 'portraitImage', label: 'Portrait Image Path', type: 'text' },
    { key: 'portraitWebp', label: 'Portrait WebP Path', type: 'text' },
  ],

  outcomes: [
    { key: 'walkAwayHeadlineWords', label: 'Walk Away Headline Words', type: 'string_array' },
    {
      key: 'walkAwayItems', label: 'Walk Away Items', type: 'object_array',
      fields: [
        { key: 'marker', label: 'Marker', type: 'text' },
        { key: 'text', label: 'Text (HTML)', type: 'richtext' },
        { key: 'isStar', label: 'Is Star Item', type: 'boolean' },
      ],
    },
    { key: 'twentyYearsHeadlineWords', label: '20 Years Headline Words', type: 'string_array' },
    { key: 'twentyYearsItems', label: '20 Years Items (HTML)', type: 'string_array' },
  ],

  what_this_is: [
    { key: 'sectionNumber', label: 'Section Number', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'passageWords', label: 'Passage Words', type: 'string_array' },
    { key: 'notLeadText', label: 'Not Lead Text', type: 'text' },
    { key: 'notItems', label: 'Not Items', type: 'string_array' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
    { key: 'sessionsEyebrow', label: 'Sessions Eyebrow', type: 'text' },
    { key: 'sessionsHeadlineWords', label: 'Sessions Headline Words', type: 'string_array' },
    {
      key: 'sessions', label: 'Sessions', type: 'object_array',
      fields: [
        { key: 'id', label: 'ID', type: 'text' },
        { key: 'num', label: 'Number Label', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'richtext' },
      ],
    },
  ],

  testimonials: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    {
      key: 'testimonials', label: 'Testimonials', type: 'object_array',
      fields: [
        { key: 'id', label: 'ID', type: 'text' },
        { key: 'tag', label: 'Tag', type: 'text' },
        { key: 'quote', label: 'Quote', type: 'richtext' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'details', label: 'Details', type: 'text' },
      ],
    },
  ],

  mid_cta: [
    { key: 'sectionNumber', label: 'Section Number', type: 'text' },
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
  ],

  primary_path: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'bodyParagraphs', label: 'Body Paragraphs', type: 'string_array' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
    { key: 'scarcityText', label: 'Scarcity Text', type: 'text' },
    {
      key: 'items', label: 'Items', type: 'object_array',
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'richtext' },
      ],
    },
    { key: 'investmentLabel', label: 'Investment Label', type: 'text' },
    { key: 'investmentPrice', label: 'Investment Price', type: 'text' },
    { key: 'investmentNote', label: 'Investment Note', type: 'text' },
  ],

  alliance: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    { key: 'introParagraph', label: 'Intro Paragraph (HTML)', type: 'richtext' },
    { key: 'applyCtaText', label: 'Apply CTA Text', type: 'text' },
    { key: 'includedLabel', label: 'Included Label', type: 'text' },
    { key: 'includedItems', label: 'Included Items', type: 'string_array' },
    { key: 'applicationNote', label: 'Application Note (HTML)', type: 'richtext' },
    { key: 'modalTitle', label: 'Modal Title', type: 'text' },
    { key: 'modalBody', label: 'Modal Body (HTML)', type: 'richtext' },
    { key: 'modalButtonText', label: 'Modal Button Text', type: 'text' },
  ],

  cta_text_3: [
    {
      key: 'lines', label: 'Lines', type: 'object_array',
      fields: [
        { key: 'text', label: 'Text (markdown syntax supported)', type: 'text' },
        { key: 'className', label: 'CSS Class', type: 'text' },
      ],
    },
  ],

  faq: [
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headlineWords', label: 'Headline Words', type: 'string_array' },
    {
      key: 'items', label: 'FAQ Items', type: 'object_array',
      fields: [
        { key: 'id', label: 'ID', type: 'text' },
        { key: 'question', label: 'Question', type: 'text' },
        { key: 'answer', label: 'Answer (HTML)', type: 'richtext' },
      ],
    },
  ],

  decision: [
    { key: 'sectionNumber', label: 'Section Number', type: 'text' },
    { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
    { key: 'headline', label: 'Headline (markdown syntax supported)', type: 'text' },
    { key: 'subHeadline', label: 'Sub-Headline', type: 'text' },
    { key: 'bodyParagraphs', label: 'Body Paragraphs', type: 'string_array' },
    { key: 'ctaText', label: 'CTA Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
  ],

  final_word: [
    { key: 'lines', label: 'Lines', type: 'string_array' },
    { key: 'signatureName', label: 'Signature Name', type: 'text' },
    { key: 'signatureTitles', label: 'Signature Titles', type: 'text' },
    { key: 'portraitImage', label: 'Portrait Image Path', type: 'text' },
    { key: 'portraitWebp', label: 'Portrait WebP Path', type: 'text' },
  ],

  checkout: [
    { key: 'sectionLabel', label: 'Section Label', type: 'text' },
    { key: 'headline', label: 'Headline', type: 'text' },
    { key: 'checklistItems', label: 'Checklist Items', type: 'string_array' },
    { key: 'investmentLabel', label: 'Investment Label', type: 'text' },
    { key: 'investmentPrice', label: 'Investment Price', type: 'text' },
    { key: 'investmentNote', label: 'Investment Note', type: 'text' },
    {
      key: 'formLabels', label: 'Form Labels', type: 'object',
      fields: [
        { key: 'firstName', label: 'First Name Label', type: 'text' },
        { key: 'lastName', label: 'Last Name Label', type: 'text' },
        { key: 'email', label: 'Email Label', type: 'text' },
        { key: 'phone', label: 'Phone Label', type: 'text' },
        { key: 'profile', label: 'Profile Label', type: 'text' },
      ],
    },
    { key: 'profileOptions', label: 'Profile Options', type: 'string_array' },
    { key: 'submitText', label: 'Submit Text', type: 'text' },
    { key: 'formNote', label: 'Form Note', type: 'text' },
    { key: 'successIcon', label: 'Success Icon', type: 'text' },
    { key: 'successHeadline', label: 'Success Headline', type: 'text' },
    { key: 'successBody', label: 'Success Body', type: 'text' },
    { key: 'resetButtonText', label: 'Reset Button Text', type: 'text' },
  ],

  footer: [
    { key: 'wordmark', label: 'Wordmark', type: 'text' },
    { key: 'wordmarkAccentStart', label: 'Wordmark Accent Start (index)', type: 'number' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    {
      key: 'legalLinks', label: 'Legal Links', type: 'object_array',
      fields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'href', label: 'Href', type: 'text' },
      ],
    },
  ],
};
