export interface Alternative {
  slug: string;
  competitor: string;
  title: string;
  metaDescription: string;
  intro: string;
  pros: string[];
  cons: string[];
  ourAdvantages: string[];
  whenToUseThem: string;
  whenToUseUs: string;
  publishedAt: string;
}

export const alternatives: Alternative[] = [
  {
    slug: 'zety',
    competitor: 'Zety',
    title: 'ResumeShed vs Zety — Which Resume Builder?',
    metaDescription: 'Zety produces polished resumes but locks downloads behind a paywall. ResumeShed is fully free with no watermark or trial.',
    intro: 'Zety is one of the better-known online resume builders. The templates are sharp and the editor is polished. The catch: downloading your resume requires a $2.95 trial that auto-renews to $24/month if you forget to cancel. ResumeShed is always free with no watermark.',
    pros: ['Polished, designer-quality templates', 'Strong editor with content suggestions', 'Trusted brand, decade-plus in market'],
    cons: ['Free download is a misleading $2.95 trial that auto-renews to $24/mo', 'Downloads gated even on basic templates', 'Aggressive upsells throughout the editor'],
    ourAdvantages: ['Genuinely free — no trial, no auto-renewal, no payment info required', 'Instant PDF download via browser print', 'No watermark on output'],
    whenToUseThem: 'You want a single polished template fast, are OK paying $24-60, and you\'ll remember to cancel.',
    whenToUseUs: 'You want a working resume in 5 minutes with no payment risk and full control of the output.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'resume-genius',
    competitor: 'Resume Genius',
    title: 'ResumeShed vs Resume Genius',
    metaDescription: 'Resume Genius offers AI-assisted resume building with paid downloads. ResumeShed gives you full control free, with ATS scoring built in.',
    intro: 'Resume Genius pioneered AI resume content suggestions. Their template gallery is large and their content library is genuinely useful. But like most paid builders, downloads require a paid plan ($2.95 trial → $24/month). ResumeShed gives you the same outputs free, plus an ATS Checker most paid builders don\'t include.',
    pros: ['Massive template library (40+ designs)', 'AI-suggested bullet points and skills', 'Job-tracker and cover-letter integrated'],
    cons: ['$2.95 → $24/mo paywall for downloads', 'AI suggestions sometimes generic and need heavy editing', 'Account required for any meaningful use'],
    ourAdvantages: ['No account, no payment, no watermark', 'Built-in ATS Checker scores your resume against any JD', 'Browser-based — your data never leaves your device'],
    whenToUseThem: 'You want extensive AI bullet suggestions and you\'re prepared to pay or trial-cancel-cancel.',
    whenToUseUs: 'You can write your own bullets and want a fast, free, ATS-friendly output.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'canva-resume',
    competitor: 'Canva Resume Builder',
    title: 'ResumeShed vs Canva Resume Builder',
    metaDescription: 'Canva makes beautiful visually-designed resumes that often fail ATS. ResumeShed prioritizes ATS-pass rates over visual flair.',
    intro: 'Canva\'s resume templates are gorgeous. They\'re also disastrous for ATS — multi-column layouts, decorative fonts, and embedded graphics break parsing. Canva is excellent for creative-industry resumes that humans will look at first; ResumeShed is built for everyone else.',
    pros: ['Stunning visual templates', 'Drag-drop editor, infinite customization', 'Free for personal use, $13/month for Pro features'],
    cons: ['Most templates fail ATS parsing — multi-column, text in tables, decorative fonts', 'PDF export sometimes embeds images instead of text', 'Easy to over-design and look juvenile'],
    ourAdvantages: ['Single-column, ATS-safe by default', 'Built-in ATS Checker validates against real JDs', 'Output is parseable plain-text PDF, not image-embedded'],
    whenToUseThem: 'Creative roles (design, marketing, video) where visual portfolio matters and resumes are reviewed by humans first.',
    whenToUseUs: 'Engineering, finance, healthcare, government — any role where ATS comes first and visual flair isn\'t evaluated.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'novoresume',
    competitor: 'NovoResume',
    title: 'ResumeShed vs NovoResume',
    metaDescription: 'NovoResume is a polished European builder with a free tier limited to one page. ResumeShed has no length cap and is always free.',
    intro: 'NovoResume\'s free tier is more generous than most — single-page download with no watermark, plus a paid tier for premium templates and unlimited length. ResumeShed has no tiers; everything is free.',
    pros: ['Free tier includes one-page PDF download (no watermark)', 'Premium ($16-24/mo) unlocks more templates and 2+ page resumes', 'European-flavored design language (clean, sans-serif)'],
    cons: ['One-page limit on free tier blocks senior/leadership resumes', 'Premium templates locked behind paywall', 'Account required even for free tier'],
    ourAdvantages: ['No page limit — write a 1-page entry-level or 2-page senior resume free', 'No account required, no email collected', 'Built-in ATS Checker, Keyword Optimizer, and Cover Letter Templates included'],
    whenToUseThem: 'You want a designer-curated single-page template and don\'t mind creating an account.',
    whenToUseUs: 'You\'re senior or leadership, want unlimited length, or value privacy/no-signup workflow.',
    publishedAt: '2026-05-08',
  },
];

export const getAlternative = (slug: string) => alternatives.find(a => a.slug === slug);
