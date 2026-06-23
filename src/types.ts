export interface ProfileItem {
  id: string;
  num: string;
  title: string;
  body: string;
  /** Optional duotone header-band image (path under /public) */
  image?: string;
}

export interface GapRowItem {
  id: string;
  num: string;
  title: string;
  body: string;
  highlight: string;
}

export interface SessionItem {
  id: string;
  num: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  tag: string;
  quote: string;
  name: string;
  details: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
