/**
 * Legal document content — Privacy Policy, Terms & Conditions, Disclaimer.
 *
 * Source of truth lives here (verbatim from the approved BREAKTHROUGH legal
 * copy — the wording is NOT rewritten, only structured for rendering). The
 * `body` is lightweight markdown rendered by `renderLegalBody` in LegalPage:
 *   `## …`  → section heading (rendered as <h2> for a single-h1-per-page outline)
 *   `- …`   → bullet list item
 *   `---`   → editorial divider rule
 *   `**…**` → bold emphasis (inline)
 * Blank lines separate blocks; every other non-empty line is a paragraph.
 */

export type LegalSlug = "privacy" | "terms" | "disclaimer";

export interface LegalDoc {
  slug: LegalSlug;
  /** Visible page heading (h1) + basis for <title>. */
  title: string;
  /** <title> contents. */
  metaTitle: string;
  /** <meta name="description">. */
  description: string;
  /** Absolute canonical URL. */
  canonical: string;
  /** Human-readable last-updated date. */
  lastUpdated: string;
  /** Markdown body (see module doc for the supported subset). */
  body: string;
}

const ORIGIN = "https://frankmondeose.com";

export const LEGAL_DOCS: Record<LegalSlug, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy — BREAKTHROUGH",
    description:
      "How BREAKTHROUGH collects, uses, stores, and protects your personal information when you use our website and coaching services.",
    canonical: `${ORIGIN}/privacy`,
    lastUpdated: "June 30, 2026",
    body: `## Introduction

BREAKTHROUGH ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us.

This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, submit a form, schedule a consultation, purchase a coaching program, or otherwise interact with our services.

By using this website, you acknowledge that you have read and understood this Privacy Policy.

---

## Information We Collect

We may collect information that you voluntarily provide, as well as certain technical information collected automatically during your visit.

## Information You Provide

Depending on how you interact with us, you may provide information including:

- Full name
- Email address
- Phone number
- Billing information
- Payment details (processed securely by third-party payment providers)
- Information submitted through contact forms
- Information shared during applications or discovery calls
- Coaching questionnaires
- Messages you send to us
- Feedback or testimonials you choose to provide

Providing this information is voluntary, although certain services may not be available without it.

---

## Information Collected Automatically

When you visit our website, we may automatically collect information such as:

- IP address
- Browser type
- Device information
- Operating system
- Pages viewed
- Referral source
- Time spent on pages
- Date and time of visits
- General location information
- Cookie identifiers

This information helps us understand how visitors use our website and improve the overall experience.

---

## How We Use Your Information

We use information we collect for legitimate business purposes, including to:

- Respond to inquiries
- Schedule consultations
- Deliver coaching programs and services
- Process purchases
- Provide customer support
- Send confirmations and administrative communications
- Deliver requested resources
- Improve our website and services
- Analyze website performance
- Maintain security
- Detect fraud or misuse
- Comply with legal obligations

We only use personal information for purposes consistent with this Privacy Policy.

---

## Coaching Communications

If you register for a consultation, coaching program, newsletter, or downloadable resource, we may communicate with you regarding:

- Appointment confirmations
- Program information
- Service updates
- Educational resources
- Administrative announcements
- Relevant offers related to our services

You may unsubscribe from promotional emails at any time using the unsubscribe link included in those communications.

Administrative emails relating to purchases or active coaching services may still be sent when necessary.

---

## Payment Processing

We do not store complete payment card information on our servers.

Payments are processed securely through trusted third-party payment providers. Those providers maintain their own privacy and security practices, and your payment information is subject to their respective policies.

---

## Third-Party Services

To operate our business, we may use trusted third-party providers that assist with website functionality and business operations.

These may include services for:

- Payment processing
- Appointment scheduling
- Website hosting
- Analytics
- Email communications
- Customer relationship management (CRM)
- Form submissions
- Marketing automation

These providers receive only the information reasonably necessary to perform their services.

---

## Cookies

Our website may use cookies and similar technologies to improve functionality and understand visitor behavior.

Cookies may help us:

- Remember preferences
- Analyze website traffic
- Improve performance
- Enhance user experience
- Measure marketing effectiveness

Most browsers allow you to control or disable cookies through browser settings.

Disabling cookies may affect certain website functionality.

---

## Analytics

We may use analytics tools to better understand how visitors interact with our website.

Analytics information may include:

- Pages visited
- Navigation patterns
- Device information
- Browser information
- Approximate geographic region
- Time spent on pages

This information is generally aggregated and does not personally identify individual visitors.

---

## How We Share Information

We do not sell, rent, or trade your personal information.

We may share information only when reasonably necessary, including:

- With trusted service providers assisting our business
- To process payments
- To schedule appointments
- To deliver requested services
- To comply with legal obligations
- To protect our rights, property, or safety
- As part of a business transfer, merger, or acquisition

All service providers are expected to handle information responsibly and only as necessary to provide their services.

---

## Data Retention

We retain personal information only for as long as reasonably necessary to:

- Provide services
- Maintain business records
- Comply with legal obligations
- Resolve disputes
- Enforce agreements

When information is no longer needed, we take reasonable steps to securely delete or anonymize it.

---

## Data Security

We implement reasonable administrative, technical, and organizational safeguards designed to protect personal information against unauthorized access, disclosure, alteration, or destruction.

However, no method of transmitting or storing information electronically is completely secure. While we strive to protect your information, we cannot guarantee absolute security.

---

## International Visitors

If you access our website from outside the country in which our business operates, your information may be transferred to, stored, or processed in jurisdictions with different data protection laws.

By using this website, you consent to such transfers where permitted by applicable law.

---

## Your Rights

Depending on your location and applicable law, you may have rights regarding your personal information, including the right to:

- Request access to your information
- Request correction of inaccurate information
- Request deletion of certain information
- Withdraw consent where applicable
- Object to certain processing
- Request data portability where available

To exercise these rights, please contact us using the information below.

We may request verification of your identity before responding to certain requests.

---

## Children's Privacy

Our services are intended for adults.

We do not knowingly collect personal information from children under the age of 18.

If we become aware that information has been collected from a child without appropriate authorization, we will take reasonable steps to remove that information.

---

## External Websites

Our website may contain links to third-party websites or services.

We are not responsible for the privacy practices, policies, or content of external websites.

We encourage you to review the privacy policies of any third-party websites you visit.

---

## Testimonials

If you voluntarily provide a testimonial, review, or success story, we may request permission to publish all or part of that content.

We will not publish private coaching information without your permission.

---

## Business Transfers

If BREAKTHROUGH undergoes a merger, acquisition, sale of assets, restructuring, or similar business transaction, your information may be transferred as part of that transaction, subject to applicable law.

---

## Changes to This Privacy Policy

We may update this Privacy Policy periodically to reflect changes in our business, legal requirements, or services.

The updated version will be posted on this page with a revised "Last Updated" date.

Continued use of the website after changes become effective constitutes acceptance of the revised Privacy Policy.

---

## Contact Us

If you have questions about this Privacy Policy or wish to make a privacy-related request, please contact us through the contact information provided on our website.

We will make reasonable efforts to respond in a timely manner.

---

## Your Consent

By accessing or using this website, submitting forms, scheduling appointments, purchasing services, or otherwise interacting with BREAKTHROUGH, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of information as described herein.`,
  },

  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    metaTitle: "Terms & Conditions — BREAKTHROUGH",
    description:
      "The terms and conditions governing your use of the BREAKTHROUGH website, coaching programs, consultations, and related services.",
    canonical: `${ORIGIN}/terms`,
    lastUpdated: "June 30, 2026",
    body: `## Agreement to These Terms

Welcome to BREAKTHROUGH ("BREAKTHROUGH," "we," "our," or "us").

These Terms & Conditions ("Terms") govern your access to and use of this website, including any coaching services, programs, consultations, digital resources, events, workshops, and other materials made available by BREAKTHROUGH.

By accessing this website or purchasing any service, you acknowledge that you have read, understood, and agree to be bound by these Terms.

If you do not agree to these Terms, you should discontinue use of this website and refrain from purchasing or participating in our services.

---

## Eligibility

By using this website or purchasing our services, you represent that you:

- Are at least 18 years of age.
- Have the legal capacity to enter into a binding agreement.
- Will use this website in compliance with all applicable laws.

---

## Our Services

BREAKTHROUGH provides professional coaching, mentorship, educational experiences, workshops, retreats, digital resources, and related services designed to support personal growth, leadership, accountability, and personal development.

Our services are educational and developmental in nature.

Participation in any coaching relationship requires your own commitment, judgment, and personal responsibility.

---

## Coaching Relationship

By participating in coaching services, you understand and agree that:

- Coaching is a collaborative process.
- Coaching is not psychotherapy.
- Coaching is not mental health treatment.
- Coaching is not medical treatment.
- Coaching is not legal advice.
- Coaching is not financial advice.
- Coaching is not crisis intervention.

You remain solely responsible for your decisions, actions, and implementation of any insights gained through coaching.

---

## No Guaranteed Results

Every individual enters coaching with different experiences, goals, and circumstances.

For this reason, BREAKTHROUGH makes no guarantees regarding specific outcomes, financial results, career advancement, relationship improvements, personal transformation, or any other measurable result.

Testimonials, client stories, or examples presented on this website are intended to illustrate individual experiences and should not be interpreted as promises or guarantees.

Your results depend upon numerous factors, including your own effort, consistency, decisions, and circumstances outside our control.

---

## Personal Responsibility

You acknowledge that:

- You are responsible for your own decisions.
- You remain responsible for implementing any recommendations.
- You accept responsibility for the consequences of your actions.
- You participate voluntarily.

Nothing provided through BREAKTHROUGH should replace your own judgment or the advice of appropriately licensed professionals.

---

## Website Content

All content on this website is provided for informational and educational purposes only.

While we strive to keep information accurate and current, we make no warranties regarding:

- Accuracy
- Completeness
- Reliability
- Availability
- Suitability
- Timeliness

Content may change without notice.

---

## Intellectual Property

Unless otherwise stated, all content available through BREAKTHROUGH is the exclusive intellectual property of BREAKTHROUGH.

This includes, but is not limited to:

- Written content
- Coaching frameworks
- Methodologies
- Worksheets
- Exercises
- Videos
- Audio recordings
- Graphics
- Logos
- Branding
- Downloads
- PDFs
- Course materials
- Presentations
- Website design
- Visual assets

These materials are protected by applicable copyright, trademark, and intellectual property laws.

---

## Limited License

You are granted a limited, non-exclusive, non-transferable, revocable license to access and use our materials solely for your personal, non-commercial use.

This license does not transfer ownership of any intellectual property.

---

## Prohibited Uses

Without our prior written permission, you may not:

- Copy our materials.
- Reproduce coaching content.
- Republish website content.
- Sell or resell our materials.
- Distribute coaching resources.
- Modify proprietary materials.
- Create derivative works.
- Record coaching sessions where prohibited.
- Share member-only resources.
- Remove copyright notices.
- Use our content for commercial purposes.

Unauthorized use may result in legal action.

---

## User Conduct

You agree not to:

- Violate any applicable laws.
- Attempt unauthorized access to our systems.
- Introduce malicious software.
- Interfere with website operation.
- Harass or abuse other users.
- Misrepresent your identity.
- Submit false information.
- Use automated tools to scrape website content.
- Engage in fraudulent activity.

We reserve the right to suspend or terminate access for violations of these Terms.

---

## Purchases and Payments

Certain services require payment.

By purchasing a service, you agree to:

- Provide accurate payment information.
- Pay all applicable fees.
- Authorize payment processing through our payment provider.

Prices are subject to change without prior notice.

Price changes do not affect purchases already completed.

---

## Refund Policy

Refunds, payment plans, cancellations, and related policies may vary depending on the specific coaching program, event, retreat, digital product, or service purchased.

Unless otherwise stated in a separate written agreement or program-specific policy, all sales are considered final.

Where a separate purchase agreement or enrollment agreement exists, that agreement governs refund eligibility.

---

## Scheduling and Appointments

Consultations and coaching sessions are scheduled through our designated booking system.

Clients are responsible for:

- Attending scheduled appointments.
- Providing accurate contact information.
- Rescheduling within any applicable notice period.

Missed appointments may be considered forfeited unless otherwise agreed.

---

## Digital Products

Where applicable, access to digital products may be granted immediately following purchase.

Because digital materials are delivered electronically, refunds may be limited or unavailable once access has been provided, except where required by applicable law.

---

## Events, Workshops, and Retreats

Participation in events, workshops, or retreats may be subject to additional agreements or policies communicated during registration.

Participants are responsible for:

- Their own travel arrangements.
- Personal insurance where appropriate.
- Physical readiness for participation.
- Compliance with event guidelines.

Additional cancellation policies may apply.

---

## Third-Party Services

Our website may integrate with or link to third-party services, including payment processors, scheduling platforms, analytics providers, and communication tools.

We are not responsible for the policies, content, or practices of third-party providers.

Your use of those services is governed by their respective terms and privacy policies.

---

## Disclaimer of Warranties

This website and all services are provided on an "as is" and "as available" basis.

To the fullest extent permitted by law, BREAKTHROUGH disclaims all warranties, whether express or implied, including warranties of:

- Merchantability
- Fitness for a particular purpose
- Non-infringement
- Availability
- Accuracy
- Reliability

We do not warrant that the website will operate uninterrupted or be free of errors.

---

## Limitation of Liability

To the fullest extent permitted by law, BREAKTHROUGH and its owners, employees, contractors, affiliates, and representatives shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages arising out of or relating to:

- Use of this website
- Participation in coaching
- Purchases
- Business decisions
- Personal decisions
- Lost profits
- Lost opportunities
- Emotional distress
- Technical interruptions

Where liability cannot be excluded by law, our maximum aggregate liability shall not exceed the total amount you paid directly to BREAKTHROUGH for the specific service giving rise to the claim.

---

## Indemnification

You agree to indemnify, defend, and hold harmless BREAKTHROUGH and its owners, affiliates, employees, contractors, successors, and representatives from any claims, damages, liabilities, costs, or expenses arising from:

- Your use of the website.
- Your violation of these Terms.
- Your misuse of coaching materials.
- Your violation of another person's rights.
- Your unlawful conduct.

---

## Privacy

Your use of this website is also governed by our Privacy Policy.

Please review that document to understand how we collect, use, and protect personal information.

---

## Force Majeure

BREAKTHROUGH shall not be liable for delays or failures in performance resulting from events beyond our reasonable control, including but not limited to:

- Natural disasters
- Severe weather
- Government actions
- Public health emergencies
- Internet outages
- Power failures
- Labor disputes
- Acts of terrorism
- War

---

## Termination

We reserve the right to suspend or terminate access to this website or our services at any time if:

- These Terms are violated.
- Fraudulent activity is suspected.
- Continued participation would negatively impact our business or other participants.
- Required by law.

Termination does not relieve you of payment obligations already incurred.

---

## Governing Law

These Terms shall be governed and interpreted in accordance with the laws applicable in the jurisdiction in which BREAKTHROUGH operates, without regard to conflict of law principles.

Any disputes arising under these Terms shall be resolved in the appropriate courts of that jurisdiction unless otherwise required by applicable law.

---

## Severability

If any provision of these Terms is determined to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.

---

## Entire Agreement

These Terms, together with our Privacy Policy, Disclaimer, and any separate written agreements applicable to a specific service or program, constitute the entire agreement between you and BREAKTHROUGH regarding your use of the website and our services.

---

## Changes to These Terms

We may update these Terms from time to time.

The revised version will become effective upon posting to this website with an updated "Last Updated" date.

Your continued use of the website after changes become effective constitutes acceptance of the revised Terms.

---

## Contact

Questions regarding these Terms may be directed to us using the contact information provided on the BREAKTHROUGH website.`,
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    metaTitle: "Disclaimer — BREAKTHROUGH",
    description:
      "Important disclaimers regarding BREAKTHROUGH coaching and educational content — including medical, mental health, financial, and results disclaimers.",
    canonical: `${ORIGIN}/disclaimer`,
    lastUpdated: "June 30, 2026",
    body: `## General Disclaimer

The information, coaching, educational materials, digital resources, programs, workshops, retreats, consultations, and content provided by BREAKTHROUGH ("BREAKTHROUGH," "we," "our," or "us") are intended solely for educational, informational, and personal development purposes.

By accessing this website or participating in any BREAKTHROUGH service, you acknowledge and agree to the terms outlined in this Disclaimer.

---

## Personal Responsibility

You acknowledge that you are solely responsible for your own decisions, actions, and results.

Any decisions you make based on information, coaching, conversations, exercises, or educational materials provided through BREAKTHROUGH are made voluntarily and at your own discretion.

You accept full responsibility for the consequences of your choices and understand that no coaching relationship can replace your own judgment or personal responsibility.

---

## Coaching Disclaimer

BREAKTHROUGH provides coaching, mentorship, accountability, and educational guidance.

Coaching is intended to support personal growth, leadership development, self-awareness, goal clarification, and personal accountability.

Coaching is **not**:

- Therapy
- Counseling
- Psychology
- Psychiatry
- Mental health treatment
- Medical treatment
- Legal advice
- Financial advice
- Investment advice
- Tax advice

Participation in coaching does not establish a therapist-client, physician-patient, attorney-client, financial advisor-client, or any other licensed professional relationship.

---

## No Professional Advice

Nothing presented through this website or any BREAKTHROUGH service should be interpreted as professional medical, psychological, legal, financial, tax, or other licensed professional advice.

If you require assistance in any of these areas, you should consult an appropriately licensed professional.

---

## Medical Disclaimer

The information provided by BREAKTHROUGH is not intended to diagnose, treat, cure, or prevent any medical condition.

Do not disregard professional medical advice or delay seeking medical care because of information obtained through this website or coaching services.

If you believe you are experiencing a medical emergency, contact your physician or emergency services immediately.

---

## Mental Health Disclaimer

BREAKTHROUGH does not provide mental health treatment or crisis intervention.

If you are experiencing severe emotional distress, suicidal thoughts, or a mental health crisis, seek immediate assistance from a licensed mental health professional or your local emergency services.

Coaching is not a substitute for therapy or psychological treatment.

---

## Financial Disclaimer

Any discussions relating to business, career, income, entrepreneurship, or financial matters are provided for educational purposes only.

BREAKTHROUGH makes no guarantees regarding:

- Income
- Revenue
- Business performance
- Career advancement
- Investment outcomes
- Financial success

You remain solely responsible for your financial decisions.

---

## Results Disclaimer

Every individual begins coaching with different experiences, goals, levels of commitment, and life circumstances.

Because of these differences, we make no guarantees regarding specific outcomes.

Testimonials, client stories, reviews, or examples presented on this website reflect individual experiences and should not be interpreted as typical results or promises of future success.

Your outcomes depend on many factors outside our control, including your own effort, consistency, decisions, and circumstances.

---

## Educational Purposes Only

All materials provided by BREAKTHROUGH—including articles, videos, downloads, worksheets, exercises, coaching conversations, presentations, and digital resources—are intended solely for educational and informational purposes.

You are responsible for evaluating whether any information is appropriate for your individual situation.

---

## Assumption of Risk

Participation in coaching, workshops, retreats, events, exercises, or personal development activities involves personal reflection and, at times, emotional discomfort.

By participating, you voluntarily assume all risks associated with your participation and release BREAKTHROUGH from liability to the fullest extent permitted by law.

---

## External Links

This website may contain links to third-party websites, products, or services.

These links are provided solely for your convenience.

BREAKTHROUGH does not control, endorse, or guarantee the accuracy, availability, or reliability of third-party websites or their content.

Your use of any third-party website is governed by its own policies and terms.

---

## Website Information

While we make reasonable efforts to maintain accurate and current information, we do not warrant that all content on this website will always be complete, current, or error-free.

Content may be updated, modified, or removed without prior notice.

---

## Testimonials

Testimonials and success stories featured on this website represent the personal experiences of individual clients.

They are shared with permission where applicable.

Individual experiences vary, and testimonials should not be interpreted as guarantees of future performance or outcomes.

---

## Limitation of Liability

To the fullest extent permitted by applicable law, BREAKTHROUGH shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from:

- Your use of this website.
- Participation in coaching.
- Participation in programs or events.
- Reliance upon website content.
- Decisions made based on information provided by BREAKTHROUGH.

You acknowledge that your use of our services is voluntary and undertaken at your own risk.

---

## Changes to This Disclaimer

We may update this Disclaimer periodically to reflect changes in our services, business practices, or legal requirements.

The revised version will become effective upon posting to this website with an updated "Last Updated" date.

Your continued use of this website after changes become effective constitutes acceptance of the revised Disclaimer.

---

## Contact

If you have questions regarding this Disclaimer, please contact us using the contact information provided on the BREAKTHROUGH website.

---

## Acknowledgment

By accessing this website, scheduling a consultation, purchasing a program, participating in coaching, attending an event, or otherwise engaging with BREAKTHROUGH, you acknowledge that you have read, understood, and agreed to this Disclaimer.`,
  },
};
