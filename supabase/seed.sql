-- Seed: page_sections
-- 24 rows matching ALL_SECTION_DEFAULTS keys from src/data/pageContent.ts
-- Safe to re-run: each statement uses DO NOTHING on section_key conflict

INSERT INTO page_sections (section_key, content) VALUES ('hero', '{
  "eyebrow": "BREAKTHROUGH WITH FRANK MONDEOSE",
  "headlineWords": ["THE", "DOJO", "FOR", "MEN", "ON", "THE", "CUSP", "OF IMPACT"],
  "subtitleLine1": "THE GAP IS NOT YOUR POTENTIAL.",
  "subtitleLine2": "It’s the distance between the man you’re living as and the man you know you can be.",
  "ctaText": "Begin Your Breakthrough",
  "ctaLink": "#checkout",
  "backgroundImages": [
    {"src": "/bg_forest.png", "webp": "/bg_forest.webp", "name": "The Forest"},
    {"src": "/bg_dojo.png",   "webp": "/bg_dojo.webp",   "name": "The Dojo"},
    {"src": "/bg_cabin.png",  "webp": "/bg_cabin.webp",  "name": "The Cabin"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('header', '{
  "brandName":  "BREAKTHROUGH",
  "descriptor": "6 Sessions · 1:1 with Frank",
  "ctaText":    "Begin Your Breakthrough →",
  "ctaLink":    "#checkout"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('vision', '{
  "phrases": [
    {"text": "FOR OVER",         "register": "connective"},
    {"text": "TWENTY YEARS",     "register": "substantive"},
    {"text": "I’VE HELPED MEN", "register": "connective"},
    {"text": "CLOSE THAT GAP",   "register": "substantive"},
    {"text": "THROUGH",          "register": "declarative"},
    {"text": "STRUCTURE,",       "register": "substantive"},
    {"text": "ACCOUNTABILITY,",  "register": "substantive"},
    {"text": "AND HONEST",       "register": "connective"},
    {"text": "LEADERSHIP",       "register": "declarative"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('authority_bar', '{
  "stats": [
    {"value": "20",        "suffix": "+", "label": "YEARS OF LEADERSHIP",            "isCounter": true},
    {"value": "MONDE OSÉ",          "label": "FOUNDER",                         "isCounter": false},
    {"value": "75",        "suffix": "+", "label": "INTERNATIONAL TRAININGS",        "isCounter": true},
    {"value": "TEACHER",               "label": "OF TEACHERS",                       "isCounter": false},
    {"value": "BUILDER",               "label": "OF INTENTIONAL COMMUNITIES",        "isCounter": false}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('anchor_quote', '{
  "sectionNumber": "01",
  "eyebrow": "From the first step you take",
  "headlineWords": [
    "I", "am", "invested", "in", "you",
    "the", "entire", "way.",
    "I", "am", "in", "the", "arena",
    "with", "you."
  ],
  "quoteLine1": "I know who you are. I’ve sat with you a thousand times.",
  "quoteLine2": "You’re not broken.",
  "quoteLine3": "You’re simply living beneath your potential."
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('men_i_meet', '{
  "eyebrow": "The Men I Meet",
  "headlineWords": ["FOR", "TWENTY", "YEARS.", "THE", "SAME", "MAN."],
  "introLine1": "Different stories. Different conversations. The same realization: You already know there is more.",
  "introLine2": "You simply haven’t been challenged, developed, or held accountable to that version of yourself.",
  "profiles": [
    {
      "id": "p1",
      "num": "PROFILE 01",
      "title": "SUCCESSFUL<br />BUT LACKING<br />SOMETHING",
      "body": "The income is real. The achievements are real. The respect is real. Yet somewhere between the last goal and the next one, life started feeling thinner than it should. <strong>Now you’re looking for something success couldn’t provide.</strong>",
      "image": "/profile_01.png"
    },
    {
      "id": "p2",
      "num": "PROFILE 02",
      "title": "PASSIONATE<br />BUT STILL<br />STRUGGLING",
      "body": "Your fire isn’t the problem. You have the vision. You have the ambition. You have the drive. What you lack is a structure strong enough to turn potential into consistent action. <strong>Most men don’t need more motivation. They need accountability.</strong>",
      "image": "/profile_02.png"
    },
    {
      "id": "p3",
      "num": "PROFILE 03",
      "title": "THE MAN<br />IN EXISTENTIAL<br />CRISIS",
      "body": "Something has fallen apart. A marriage. A business. A future you counted on. That feeling isn’t failure. It’s the first sign that your old way of living no longer works. <strong>The crisis is not the end. It’s the beginning.</strong>",
      "image": "/profile_03.png"
    }
  ],
  "closerHeadline": "DIFFERENT STORIES.\nSAME CHALLENGE.",
  "closerBody": "<p>This is not potential you lack.</p><p>This is a lack of structure, accountability, and guidance equal to the man trying to emerge.</p><p><strong>That’s the gap. <span style=\"font-family: var(--fd); font-style: italic; font-weight: bold;\">Breakthrough was built to close it.</span></strong></p>"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('real_enemy', '{
  "sectionNumber": "02",
  "eyebrow": "The Real Enemy",
  "headlineWords": [
    {"word": "MOST"},
    {"word": "MEN",      "br": true},
    {"word": "AREN’T",  "br": true},
    {"word": "LIVING",   "sv": true, "br": true},
    {"word": "THEIR",    "br": true},
    {"word": "LIVES."}
  ],
  "narrativeBlocks": [
    {"id": "b1", "html": "<p><strong>They’re performing it.</strong></p>"},
    {"id": "b2", "html": "<p class=\"text-[var(--sv)]\">Performing success. Performing confidence. Performing strength.</p>"},
    {"id": "b3", "html": "<p>Eventually the performance becomes so convincing that <span class=\"text-white\">even you forget who you are</span></p>"},
    {"id": "b4", "html": "<p><strong>underneath it.</strong></p>"},
    {"id": "b5", "html": "<p style=\"font-family: var(--fd); font-weight: bold; font-style: italic;\">Breakthrough begins when the performance ends.</p>"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('cta_text_1', '{
  "lines": [
    {"text": "THE MAN",                 "className": "cta-ln-center cta-reg-mono-med"},
    {"text": "YOU ARE PERFORMING",      "className": "cta-ln-center cta-reg-serif-hero"},
    {"text": "IS NOT THE MAN",          "className": "cta-ln-center cta-reg-serif-whisper"},
    {"text": "THEY NEED.",              "className": "cta-ln-center cta-reg-sans-hero"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('identity_gap', '{
  "sectionNumber": "03",
  "eyebrow": "The Identity Gap",
  "headlineWords": [
    "THE", "GAP", "BETWEEN",
    "THE", "MAN", "YOU", "ARE", "PERFORMING",
    "AND", "THE", "SOVEREIGN", "MAN", "YOU", "ARE."
  ],
  "bodyWords": [
    "That", "gap", "shows", "up", "in", "highly", "predictable,", "silent,", "and", "destructive", "ways."
  ],
  "gapRows": [
    {
      "id": "g1",
      "num": "01 ·",
      "title": "Seeking Validation",
      "body": "You adjust for approval. You know you’re doing it. You do it anyway.",
      "highlight": "Strong men don’t need agreement. They need alignment."
    },
    {
      "id": "g2",
      "num": "02 ·",
      "title": "Chasing “Success”",
      "body": "The next win. The next achievement. The finish line keeps moving.",
      "highlight": "The performance man chases. The grounded man chooses."
    },
    {
      "id": "g3",
      "num": "03 ·",
      "title": "The Moving Bar",
      "body": "Nothing feels like enough for long. Not because you’re ambitious. Because achievement became your identity.",
      "highlight": "<em>An identity built on output is one bad quarter away from collapse.</em>"
    },
    {
      "id": "g4",
      "num": "04 ·",
      "title": "Velocity Trap",
      "body": "You’re moving fast, working hard, producing results.",
      "highlight": "But every so often you wonder: “Is this even where I want to go?”"
    }
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('aligned_other_side', '{
  "eyebrow": "The Man on the Other Side",
  "headlineWords": [
    {"word": "NOT"},  {"word": "PERFECT.", "br": true},
    {"word": "NOT"},  {"word": "FINISHED.", "br": true},
    {"word": "JUST"}, {"word": "ALIGNED.",  "sv": true}
  ],
  "subtitle": "That is the man this work is designed to develop.",
  "bulletItems": [
    "A man who trusts himself.",
    "A man whose word carries weight.",
    "A man who stops negotiating with what he knows is true.",
    "A man who leads his family, business, and life from conviction rather than reaction."
  ],
  "coda": "This is who you already are.\nThe work is closing the gap."
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('cta_text_2', '{
  "lines": [
    {"text": "Most men don’t need more information.",                                                      "className": "cta-l2-premise"},
    {"text": "They need [structure.](sans,italic,accent,glow)",                                             "className": "cta-l2-need cta-l2-step1"},
    {"text": "They need [accountability.](sans,italic,accent,glow)",                                       "className": "cta-l2-need cta-l2-step2"},
    {"text": "They need someone willing to hold them to [who they can become.](sans,italic,accent,glow)",  "className": "cta-l2-resolve"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('meet_frank', '{
  "eyebrow": "Meet Frank",
  "headlineWords": [
    "I", "DID", "NOT", "BUILD",
    "THIS", "FROM", "THEORY.",
    "I", "EARNED", "IT",
    "THROUGH", "EXPERIENCE."
  ],
  "badgeName":  "FRANK MONDEOSE",
  "badgeTitle": "Teacher of Teachers · Mentor to Men on the Cusp of Impact",
  "bioParagraphs": [
    "For over twenty years, I have worked in some of the most demanding arenas of human development: Entrepreneurship. Leadership. Men’s Work. Cultural Architecture. Development of Visionary Land-Based Projects.",
    "I have founded companies. Produced large-scale events. Developed curriculum. Trained facilitators. Mentored leaders. Built communities. And sat with men through loss, reinvention, success, failure, and breakthrough.",
    "What I bring into this work is not information. It is perspective earned through experience.",
    "For twenty years, men have arrived at my door carrying different stories but the same question: <em>“Why am I not living the life I know I’m capable of?”</em> I’ve asked that question myself.",
    "Not because men need fixing. Because too many capable men settle for less than they know is possible.",
    "Over two decades, one truth has become clear: Most men do not need more advice. They need structure. They need accountability. They need someone capable of seeing the man they can become and refusing to negotiate with anything less."
  ],
  "subHeadline":        "That’s why this work matters to me.",
  "closingStatement":   "I do not work with men who want to be fixed. I work with men who are ready to lead.",
  "timelineLabel":      "The path that built Breakthrough",
  "timeline": [
    {"year": "2005", "event": "Founded Monde Osé"},
    {"year": "2013", "event": "The Spiritual Playboy"},
    {"year": "2015", "event": "International Facilitation Begins"},
    {"year": "2019", "event": "Brotherhood Development"},
    {"year": "2020", "event": "Curriculum & Faculty Leadership"},
    {"year": "2023", "event": "Caracara Village + Nature Reserve"},
    {"year": "2026", "event": "Breakthrough", "highlight": true}
  ],
  "portraitImage": "/frank_founder_updated.jpg",
  "portraitWebp":  "/frank_founder_updated.webp"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('outcomes', '{
  "walkAwayHeadlineWords": ["WHAT", "YOU", "WALK", "AWAY", "WITH"],
  "walkAwayItems": [
    {"marker": "✓", "text": "Greater self-trust."},
    {"marker": "✓", "text": "Clearer direction."},
    {"marker": "✓", "text": "Stronger boundaries."},
    {"marker": "✓", "text": "More consistent action."},
    {"marker": "✓", "text": "A brotherhood of accountability."},
    {"marker": "✓", "text": "A practical path forward."},
    {"marker": "◈", "text": "Most importantly: a <strong>deeper relationship with yourself.</strong>", "isStar": true}
  ],
  "twentyYearsHeadlineWords": ["WHAT", "TWENTY", "YEARS", "HAVE", "TAUGHT", "ME"],
  "twentyYearsItems": [
    "Men do not rise to their potential. <strong>They rise to the standards they are willing to uphold.</strong>",
    "Most men don’t need more information. <strong>They need structure.</strong>",
    "<strong>Accountability is one of the highest forms of respect.</strong>",
    "The quality of a man’s life is directly related to <strong>the quality of the standards he is willing to accept.</strong>",
    "<strong>Brotherhood is where excuses go to die.</strong>"
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('what_this_is', '{
  "sectionNumber": "04",
  "headlineWords": [
    "THIS", "IS", "NOT",
    "A", "PROGRAM",
    "IT’S", "A", "STRUCTURED",
    "PATH", "TO", "CLOSE",
    "THE", "PERFORMANCE",
    "GAP", "FOR", "GOOD."
  ],
  "passageWords": [
    "Breakthrough", "is", "six", "weeks", "of", "focused", "attention", "on", "the", "man", "behind", "your",
    "current", "results.", "The", "goal", "is", "simple:", "to", "help", "you", "become", "the", "man", "you",
    "already", "know", "you", "are", "capable", "of", "being."
  ],
  "notLeadText": "BREAKTHROUGH IS NOT…",
  "notItems": [
    "Therapy",
    "A mastermind",
    "A weekend retreat",
    "Another course",
    "Another collection of theories"
  ],
  "ctaText":             "BEGIN YOUR BREAKTHROUGH",
  "ctaLink":             "#checkout",
  "sessionsEyebrow":     "The Path",
  "sessionsHeadlineWords": ["SIX", "SESSIONS.", "ONE", "DIRECTION."],
  "sessions": [
    {"id": "s1", "num": "01 ·", "title": "THE DIAGNOSTIC",   "description": "We identify where your energy is going. What’s serving you. What’s costing you. What needs to change."},
    {"id": "s2", "num": "02 ·", "title": "THE GAP",          "description": "We name the distance between your current reality and your potential. Clearly. Directly. Without excuses."},
    {"id": "s3", "num": "03 ·", "title": "THE INTERRUPTION", "description": "The patterns holding you back are challenged. Blind spots become visible. Standards rise."},
    {"id": "s4", "num": "04 ·", "title": "THE RETURN",       "description": "Clarity returns. Direction returns. Self-trust returns. The man underneath the performance begins leading again."},
    {"id": "s5", "num": "05 ·", "title": "THE ANCHOR",       "description": "What you’ve discovered becomes stable. Not something you perform. Something you stand on."},
    {"id": "s6", "num": "06 ·", "title": "THE INTEGRATION",  "description": "The work moves into real life. Relationships. Business. Leadership. Brotherhood. The goal is not insight. The goal is embodiment."}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('testimonials', '{
  "eyebrow":      "The Men Who Did the Work",
  "headlineWords": ["WHAT", "THE", "MEN", "SAY."],
  "testimonials": [
    {
      "id": "t1",
      "tag": "The Successful Man",
      "quote": "I had achieved almost everything I set out to achieve. Yet I felt disconnected from myself. Frank helped me see what success had been distracting me from.",
      "name": "J.M.",
      "details": "CEO · New York"
    },
    {
      "id": "t2",
      "tag": "The Struggling Builder",
      "quote": "I thought I needed more discipline. What I actually needed was accountability and a structure strong enough to hold my vision.",
      "name": "D.R.",
      "details": "Entrepreneur · Austin"
    },
    {
      "id": "t3",
      "tag": "The Man in Crisis",
      "quote": "My marriage ended and so did the identity I had built around it. This wasn’t coaching. It was a turning point.",
      "name": "M.T.",
      "details": "Father · Chicago"
    }
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('mid_cta', '{
  "sectionNumber": "05",
  "eyebrow": "The Decision Point",
  "headlineWords": [
    "THE", "MAN",
    "YOU", "WANT",
    "TO", "BECOME",
    "IS", "NOT", "WAITING",
    "IN", "THE", "FUTURE."
  ],
  "subtitle": "He is waiting on the other side of a decision.",
  "ctaText": "Begin Your Breakthrough",
  "ctaLink": "#checkout"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('primary_path', '{
  "eyebrow":      "The Primary Path",
  "headlineWords": ["SIX", "PRIVATE", "ONE-on-ONE", "SESSIONS", "WITH", "FRANK"],
  "bodyParagraphs": [
    "Direct access. No team members. No handoffs. Focused attention on the man and the challenge in front of him.",
    "I do not read from a playbook. I respond to what I see. Every session is live, present, and built around the man in front of me."
  ],
  "ctaText":      "Begin Your\nBreakthrough",
  "ctaLink":      "#checkout",
  "scarcityText": "Limited spots available this cycle — Frank works with few men at depth",
  "items": [
    {"title": "The Diagnostic",          "desc": "First session. Precise identification of where your energy is going and what needs to change."},
    {"title": "Between-Session Access",  "desc": "Direct contact when the real work surfaces in your actual life, not when it’s convenient for a calendar."},
    {"title": "Direct Feedback",         "desc": "Unfiltered. What I see is what I say, not what you want to hear, but what the man underneath needs to be shown."},
    {"title": "Brotherhood Introduction","desc": "Men who hold you to who you actually are, across time."},
    {"title": "Practical Integration",   "desc": "The work moves into real life. Relationships. Business. Leadership."},
    {"title": "Lasting Accountability",  "desc": "Not a subscription. A standard you now hold yourself to."}
  ],
  "investmentLabel": "Investment",
  "investmentPrice": "$2,500",
  "investmentNote":  "Single Payment · 6 Private Sessions · Direct with Frank"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('alliance', '{
  "eyebrow":       "The Deeper Path",
  "headlineWords": ["THE", "ALLIANCE"],
  "introParagraph": "For men seeking a deeper level of mentorship, accountability, and access. This is where the real work becomes a way of life.",
  "applyCtaText":   "Apply For\nThe Alliance",
  "includedLabel":  "What’s Included",
  "includedItems": [
    "Extended 1:1 support",
    "Full Brotherhood Membership",
    "Purpose & Legacy Architecture",
    "Long-term strategic mentorship"
  ],
  "applicationNote":  "Application required. Discernment on both sides. The Alliance is not for every man. It is for the man who has closed the initial gap and is ready to go further.",
  "modalTitle":       "ALLIANCE DISCERNING",
  "modalBody":        "Alliance applications are processed manually. Please secure your first 1:1 <strong>&quot;Breakthrough&quot; session</strong> with Frank, or contact our leadership board directly to register your legacy interest.",
  "modalButtonText":  "Acknowledge and Close"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('cta_text_3', '{
  "lines": [
    {"text": "THIS IS YOUR [DECISION.](sans,italic,accent,glow,xl)",                              "className": "cta-l3-prompt"},
    {"text": "[PERFORMANCE](recede,accent) [OR](recede) [EMBODIMENT.](sans,italic,accent,glow,advance)", "className": "cta-l3-options"},
    {"text": "ONE REPEATS THE PAST.",                                                             "className": "cta-l3-past"},
    {"text": "[THE OTHER IS](bodoni) [BREAKTHROUGH.](accent,glow,italic)",                       "className": "cta-l3-climax"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('faq', '{
  "eyebrow":      "Real Questions",
  "headlineWords": ["WHAT", "I", "GET", "ASKED.", "WHAT", "I", "ACTUALLY", "SAY."],
  "items": [
    {
      "id": "f1",
      "question": "Is this coaching?",
      "answer": "No. And that distinction matters. Coaching is a methodology. What I do is mentorship built on lived experience I have founded companies, built communities, trained facilitators, and developed curriculum across two decades. I do not give you a framework. I give you a direct encounter with a man who has been where you’re standing, made the hard choices, and stayed in the arena. <strong>If you’re looking for a coach, this is not it. If you’re looking for someone who has lived the gap and closed it, read on.</strong>"
    },
    {
      "id": "f2",
      "question": "What happens in the six sessions?",
      "answer": "Each session follows the arc: Diagnostic, Gap, Interruption, Return, Anchor, Integration. But it’s not a formula. Session one, I read where your energy is going. I name what I see. <strong>What I see is what I say, not what you want to hear, but what the man underneath your current results needs to be shown.</strong> Every session after that builds on honest ground, not managed impressions. The work gets more precise as we go."
    },
    {
      "id": "f3",
      "question": "How is this different from therapy?",
      "answer": "Therapy is designed to help you understand. This is designed to hold you accountable. Many of the men I work with have done years of excellent therapy. <strong>They understand their patterns completely, and keep repeating them.</strong> Understanding the gap and closing the gap are two different acts. This work is about the second one."
    },
    {
      "id": "f4",
      "question": "I’ve tried other programs. What makes this different?",
      "answer": "Most programs give you information and tools. This gives you direct access to a man who has spent twenty years in the field, not studying human development, but living it. <strong>I founded companies. I built communities. I trained facilitators. I sat with men in their worst moments and their best ones.</strong> What I bring isn’t a better framework. It’s two decades of earned perspective, applied directly to you and your specific gap."
    },
    {
      "id": "f5",
      "question": "What if I’m not sure I’m ready?",
      "answer": "The hesitation you feel is usually the pattern, not the reality. I’d ask you one question instead: what’s the cost of waiting another year? Not in money, in the version of yourself you’re not yet living. <strong>Ready doesn’t mean comfortable. It means willing to be seen.</strong> If you can answer yes to that, you’re ready enough."
    },
    {
      "id": "f6",
      "question": "What does between-session access actually mean?",
      "answer": "It means I’m available when the real work surfaces in your actual life, not when it’s convenient for a scheduled call. <strong>Between-session access is direct contact with me when something real is happening.</strong> A decision that can’t wait. A pattern showing up in a way you need to name right now. Not unlimited. Real presence when it counts."
    },
    {
      "id": "f7",
      "question": "What’s The Alliance, and how do I know which is right?",
      "answer": "Breakthrough is the entry point: six sessions, direct 1:1, focused work. The Alliance is deeper access across all life domains, full Brotherhood membership, purpose and legacy architecture, long-term strategic mentorship. Application required on both sides. <strong>If you’re new to this work, Breakthrough is the right door.</strong> The Alliance is for men who have demonstrated they’re building something meant to outlast them and are ready to go deep. Start here."
    }
  ]
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('decision', '{
  "sectionNumber": "06",
  "eyebrow":       "The Decision",
  "headline":      "THE MAN YOU WANT TO BECOME IS NOT WAITING IN THE [FUTURE.](accent,glow)",
  "subHeadline":   "He is waiting on the other side of your decision.",
  "bodyParagraphs": [
    "Five years from now, you’ll either be living closer to the man you know you can be, or explaining why you never became him.",
    "The question isn’t whether you’re ready. The question is how much longer you’re willing to tolerate what you know isn’t true."
  ],
  "ctaText": "Begin Your Breakthrough",
  "ctaLink":  "#checkout"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('final_word', '{
  "lines": [
    "I’ve watched men wait years for the right moment.",
    "The right moment never arrives.",
    "It is created.",
    "You already know what needs to happen.",
    "The only question is:",
    "Are you willing to act on what you know?"
  ],
  "signatureName":   "Frank Mondeose",
  "signatureTitles": "Teacher of Teachers\nMentor to Men on the\nCusp of Impact",
  "portraitImage":   "/frank_founder_updated.jpg",
  "portraitWebp":    "/frank_founder_updated.webp"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('checkout', '{
  "sectionLabel": "SECURE YOUR PLACE",
  "headline":     "BREAKTHROUGH",
  "checklistItems": [
    "6 live 1:1 sessions with Frank directly",
    "The Diagnostic — session one",
    "Between-session access — real presence",
    "Brotherhood introduction",
    "Practical integration into real life",
    "Lasting accountability"
  ],
  "investmentLabel": "INVESTMENT",
  "investmentPrice": "$2,500",
  "investmentNote":  "Breakthrough · Single Payment · Direct with Frank",
  "formLabels": {
    "firstName": "First Name",
    "lastName":  "Last Name",
    "email":     "Email Address",
    "phone":     "Phone (optional)",
    "profile":   "Which profile resonates? (optional)"
  },
  "profileOptions": [
    "Successful But Lacking Something",
    "Passionate But Struggling",
    "A Man in Crisis"
  ],
  "submitText": "Begin Your Breakthrough",
  "formNote":   "Secure checkout · Frank’s team confirms your first session within 24 hours",
  "successIcon":        "◈",
  "successHeadline":    "You’re in.",
  "successBody":        "Frank’s team will be in touch with you at {email} within 24 hours to confirm your first session. You’ve made the decision. That was the hardest part.",
  "resetButtonText":    "Register Another Account"
}') ON CONFLICT (section_key) DO NOTHING;

INSERT INTO page_sections (section_key, content) VALUES ('footer', '{
  "wordmark":            "BREAKTHROUGH",
  "wordmarkAccentStart": 5,
  "subtitle":            "Monde Osé · Breakthrough · Caracara Village + Nature Reserve",
  "legalLinks": [
    {"label": "Privacy Policy", "href": "/privacy"},
    {"label": "Terms",          "href": "/terms"},
    {"label": "Disclaimer",     "href": "/disclaimer"},
    {"label": "Contact",        "href": "mailto:admin@mondeose.com"}
  ]
}') ON CONFLICT (section_key) DO NOTHING;
