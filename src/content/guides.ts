export interface GuideStep { title: string; body: string }
export interface GuideFAQ { q: string; a: string }
export interface Guide {
  slug: string;
  title: string;
  query: string;
  metaDescription: string;
  intro: string;
  steps: GuideStep[];
  tips: string[];
  faq: GuideFAQ[];
  relatedTool: string;
  keywords: string[];
  publishedAt: string;
}

export const guides: Guide[] = [
  {
    slug: 'how-to-write-resume-summary',
    title: 'How to Write a Resume Summary That Gets Interviews',
    query: 'how to write resume summary',
    metaDescription: 'Write a resume summary that recruiters read in 6 seconds. Templates, formulas, and 3 example summaries.',
    intro: 'Recruiters spend an average of 7 seconds on first-pass resume review. Your summary — those 2-4 lines at the top — decides whether you make it past the pass. This guide covers the exact formula and provides 3 templates you can adapt.',
    steps: [
      { title: 'Skip the objective', body: 'Resume objectives ("seeking a challenging role…") are dated. Modern resumes lead with a summary that pitches what you bring, not what you want.' },
      { title: 'Use the formula: title + years + 2-3 skills + value', body: 'Example: "Senior Software Engineer with 8 years building consumer apps. Strong in TypeScript, React, and AWS. Shipped 3 zero-to-one products at YC startups." Title, tenure, stack, proof.' },
      { title: 'Quantify when possible', body: '"Drove 40% retention lift" beats "improved retention." Numbers signal seriousness and make claims falsifiable.' },
      { title: 'Match the job description', body: 'Read the JD\'s top 5 keywords. Weave them into your summary if they\'re truthful. ATS scoring rewards keyword overlap.' },
      { title: 'Use the Summary Generator', body: 'Our Resume Summary Generator gives 4 templated variations from your inputs. Pick the one closest to your voice and edit.' },
    ],
    tips: [
      'Keep it 2-4 lines. Five-line summaries get skimmed; one-liners feel thin.',
      'Lead with a strong noun ("Senior Engineer", "Marketing Director") not a self-descriptor ("hardworking", "passionate").',
      'Avoid jargon nobody outside your last company would recognize.',
    ],
    faq: [
      { q: 'Should everyone have a summary?', a: 'Yes for mid-career and above. Entry-level can skip it; their education + projects do the same job.' },
      { q: 'Is a summary the same as a profile?', a: 'Effectively yes. Some templates call the section "Profile" or "About"; the function is identical.' },
      { q: 'Can I use the same summary across applications?', a: 'Customize the keywords for each application. The framing stays the same; the words shift slightly toward each JD.' },
    ],
    relatedTool: 'resume-summary-generator',
    keywords: ['resume summary', 'professional summary', 'resume opening', 'resume profile'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'ats-friendly-resume-format',
    title: 'ATS-Friendly Resume Format (What Actually Works in 2026)',
    query: 'ats friendly resume format',
    metaDescription: 'Format a resume that passes ATS screening: standard sections, simple fonts, no tables, no headers/footers. Free ATS checker included.',
    intro: '75% of resumes are filtered by ATS (Applicant Tracking Systems) before any human reads them. Most rejections happen because of formatting choices, not content. Here\'s exactly what works in 2026 and what to avoid.',
    steps: [
      { title: 'Use a single-column layout', body: 'Two-column resumes look fancy but ATS often parse them wrong — your contact info ends up mixed with your experience. Single column is boring and bulletproof.' },
      { title: 'Use standard section names', body: 'ATS look for "Experience", "Education", "Skills". Don\'t get clever with "My Journey" or "Things I\'ve Done." Match what ATS expects to find.' },
      { title: 'Stick to standard fonts', body: 'Arial, Calibri, Helvetica, Times New Roman, or Georgia. Cursive, decorative, or icon fonts get rendered as garbage by some ATS.' },
      { title: 'No headers, footers, tables, or text boxes', body: 'ATS often ignore content in headers/footers, and text boxes/tables scramble parsing. Put everything in the main body.' },
      { title: 'Save as PDF (modern ATS) or .docx (older systems)', body: '95% of ATS read PDF correctly in 2026. If the JD says ".doc only", save .docx. Skip .pages, .rtf, or images.' },
      { title: 'Run through the ATS Checker', body: 'Paste your resume and the job description into our ATS Checker. It scores keyword match and flags formatting red flags.' },
    ],
    tips: [
      'Avoid emoji and special unicode characters in section headings — some ATS strip them entirely along with the heading.',
      'Use bullet points starting with action verbs. "Led", "Built", "Shipped" beat "Was responsible for".',
      'No graphics, no photos. Even when allowed, they don\'t add value and risk ATS errors.',
    ],
    faq: [
      { q: 'Are creative resumes ever OK?', a: 'For design and creative roles, sometimes — but submit BOTH a creative version and an ATS-friendly version. Most large companies route everything through ATS first.' },
      { q: 'Does font size matter?', a: '10-12pt for body text, 14-16pt for section headings. Anything smaller is illegible; anything larger looks juvenile.' },
      { q: 'How long should a resume be?', a: '1 page for <10 years experience, 2 pages for senior/leadership roles. Never 3+ unless academic CV.' },
    ],
    relatedTool: 'ats-checker',
    keywords: ['ats friendly resume', 'ats compatible', 'resume format', 'applicant tracking system'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'resume-keywords-software-engineer',
    title: 'Resume Keywords for Software Engineer Roles (2026)',
    query: 'software engineer resume keywords',
    metaDescription: 'The 30 most-searched keywords for software engineer resumes in 2026, by role type. Plus how to use them ATS-correctly.',
    intro: 'ATS for software roles look for tech stack matches first. Hiring managers look for impact second. Here are the keyword categories that matter and how to weave them in without keyword-stuffing.',
    steps: [
      { title: 'Mirror the job description\'s tech stack', body: 'If the JD says React, TypeScript, AWS, GraphQL — your resume should mention each (truthfully, in context of work you actually did). ATS reward direct overlap.' },
      { title: 'Include both spelled-out and acronym forms', body: 'Some ATS index "Amazon Web Services" but not "AWS" or vice versa. Use both: "AWS (Amazon Web Services)" the first time.' },
      { title: 'Cover the four keyword tiers', body: 'Languages (TypeScript, Python, Go), frameworks (React, Django), platforms (AWS, GCP), and methodologies (Agile, TDD, CI/CD).' },
      { title: 'Use the Keyword Optimizer', body: 'Paste your resume + the job description into the Keyword Optimizer. It ranks missing keywords by how often they appear in the JD.' },
      { title: 'Add keywords to bullet points, not just skills section', body: 'A "Skills" wall of buzzwords looks weak. Working keywords into your accomplishments ("Built TypeScript+React frontend serving 50k DAU") signals real experience.' },
    ],
    tips: [
      'Don\'t list every language you\'ve touched — be honest about depth. Listing 30 skills suggests you\'re strong at none.',
      'For senior roles, leadership keywords matter too: "led", "mentored", "architected", "scaled team".',
      'Industry-specific tools count: "Stripe" for payments, "Shopify" for ecommerce, "HIPAA" for healthtech, etc.',
    ],
    faq: [
      { q: 'How many keywords should I aim for?', a: 'Cover 70-80% of the JD\'s top keywords. 100% match looks like keyword stuffing; less than 60% rarely passes ATS scoring.' },
      { q: 'Do certifications count as keywords?', a: 'Yes — AWS SAA, GCP Professional, etc. include the cert name and issuing org. ATS often look for these directly.' },
      { q: 'What about soft skills?', a: 'Soft skills barely register in ATS scoring but matter to humans. Use them sparingly in your summary, not bulleted out as "skills".' },
    ],
    relatedTool: 'resume-keywords',
    keywords: ['software engineer keywords', 'tech resume keywords', 'ats keywords', 'engineer resume'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'cover-letter-no-experience',
    title: 'How to Write a Cover Letter With No Experience',
    query: 'cover letter no experience',
    metaDescription: 'Write a cover letter that overcomes lack of experience. Templates for new grads, career changers, and first-time applicants.',
    intro: 'No experience is normal — for new grads, career changers, returning parents, immigrants getting their first US job. The trick is to argue from what you do have: skills, projects, motivation, and proof you ship work.',
    steps: [
      { title: 'Lead with relevant capability, not lack of experience', body: 'Don\'t apologize for missing direct experience. Open with a specific skill or project that maps to the job: "I built a 3,000-user side project in Next.js while finishing my CS degree."' },
      { title: 'Use the entry-level template', body: 'Our Cover Letter Templates includes an "Entry-level" variant that sidesteps experience and emphasizes ramp speed.' },
      { title: 'Show proof of work', body: 'Link a GitHub, portfolio, design Behance, or writing samples. A real project trumps a credential.' },
      { title: 'Acknowledge the gap, then redirect', body: 'One sentence: "While my professional title hasn\'t been [role] before, I\'ve been doing the work in [project/internship/coursework]." Then move on.' },
      { title: 'End with specific interest, not generic enthusiasm', body: 'Mention a specific product, post, or person at the company. "I read [name]\'s talk on [topic]" beats "I love your mission."' },
    ],
    tips: [
      'Length: 3-4 paragraphs, 250-400 words. Cover letters are skimmed, not studied.',
      'Match tone to company. Startups want energy; banks want polish; agencies want craft.',
      'Get one trusted reader to review before sending — typos and awkward phrasing tank otherwise-good letters.',
    ],
    faq: [
      { q: 'Is "Dear Hiring Manager" OK?', a: 'Acceptable but generic. Spending 5 minutes finding the recruiter\'s name on LinkedIn and using it shows effort.' },
      { q: 'Should I attach the cover letter as PDF?', a: 'Yes if uploading separately. If the application is text-paste-only, paste it as plain text and skip formatting.' },
      { q: 'Do cover letters still matter?', a: 'For competitive roles and small companies, yes. For high-volume roles routed through ATS, less so but they don\'t hurt.' },
    ],
    relatedTool: 'cover-letter-template',
    keywords: ['cover letter no experience', 'entry level cover letter', 'first job cover letter', 'recent grad cover letter'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'resume-for-career-change',
    title: 'How to Write a Resume for a Career Change',
    query: 'resume for career change',
    metaDescription: 'Career-change resume template that emphasizes transferable skills. Frame your experience for a new field credibly.',
    intro: 'Career changes are common — and resumes designed for one career hurt you applying to another. The fix is to reframe your experience around skills and outcomes that translate, not titles and tenure that don\'t.',
    steps: [
      { title: 'Lead with a strong career-change summary', body: 'Open by stating the transition explicitly. "Marketing manager pivoting to product management — same instincts (customer research, prioritization, cross-functional leadership), new craft."' },
      { title: 'Reframe experience around transferable skills', body: 'Don\'t list "ran ad campaigns." Reframe as "owned $2M budget, prioritized initiatives by expected ROI, made go/no-go calls weekly" — skills that map to PM work.' },
      { title: 'Emphasize relevant projects, courses, or self-directed work', body: 'A career-change resume needs evidence you\'ve already started. Side projects, certifications, or coursework specific to the new field carry more weight than years in the old field.' },
      { title: 'Use a functional or hybrid format selectively', body: 'Pure functional resumes (skills-grouped, no chronology) trigger ATS warnings. Hybrid (chronological with a skills block at the top) is safer.' },
      { title: 'Add a "Why I\'m Changing" line at the bottom of the summary', body: 'One sentence reasoning the move makes sense — not a sob story. "After leading marketing for two SaaS products, I want to own the upstream product decisions that drive that work."' },
    ],
    tips: [
      'Don\'t hide your old career. Hiring managers see through it. Frame it as a deliberate progression.',
      'Network into the new field — most career changers land via warm intros, not cold applications.',
      'Don\'t take the salary cut harder than necessary. Career changes don\'t mean entry-level pay if your background brings real leverage.',
    ],
    faq: [
      { q: 'Should I list my old job titles or new equivalents?', a: 'Old titles, accurately. Lying gets caught at reference check. The reframing happens in your bullet points, not in the title field.' },
      { q: 'Is functional resume format dangerous?', a: 'Yes for ATS — they expect chronological. Use hybrid (chronological with a top skills block) instead.' },
      { q: 'How do I explain the change in a cover letter?', a: 'One short paragraph: what you\'re leaving, what you\'re seeking, and why your background is a fit. Don\'t over-explain.' },
    ],
    relatedTool: 'resume-builder',
    keywords: ['career change resume', 'transferable skills', 'career pivot', 'changing careers'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'how-many-pages-should-resume-be',
    title: 'How Many Pages Should a Resume Be? (2026 Rules)',
    query: 'how long should resume be',
    metaDescription: 'One page or two? Page-length rules for resumes by experience level, industry, and country. Plus when to break the rules.',
    intro: 'The "one-page resume" rule is half-right. New grads should be one page; senior leaders shouldn\'t cram 25 years into one. Here\'s the actual rule by situation.',
    steps: [
      { title: 'Under 5 years experience: one page', body: 'No exceptions for new grads. Even with internships, projects, and coursework — you can fit it on one page if you\'re ruthless about cuts.' },
      { title: '5-10 years: one page if possible, two if needed', body: 'One page wins if you can fit the relevant story. Two pages OK if cutting would lose meaningful experience.' },
      { title: '10+ years senior/leadership: two pages standard', body: 'Two pages is fine. Stop at two — three pages signal you can\'t prioritize.' },
      { title: 'Academic CV (research, professorships): no page limit', body: 'Different format entirely. Lists publications, talks, grants, teaching — can run 5-15 pages depending on tenure.' },
      { title: 'Federal/government roles: 3-5 pages expected', body: 'US federal resumes have a specific format and require detail most other resumes cut. Page limits often mandated by the application system.' },
    ],
    tips: [
      'If you\'re overflowing onto a second page by 3-4 lines, cut. Trailing onto page 2 with one paragraph looks worse than a tight one-page.',
      'Use 0.5" margins instead of 1" if you need to fit more. Don\'t shrink font below 10pt.',
      'For two-page resumes, put the most important content on page 1. Recruiters often don\'t turn the page.',
    ],
    faq: [
      { q: 'Does country matter?', a: 'US/Canada: 1-2 pages. UK: 1-2 pages. Germany/Switzerland: longer CVs with photo are normal. Australia/NZ: 2-3 pages OK.' },
      { q: 'What about LinkedIn vs resume?', a: 'LinkedIn can be longer — it\'s a profile, not a resume. People expect to scroll. Resume should be the curated subset.' },
      { q: 'Can a recent grad have a 2-page resume?', a: 'Almost never. If you think you need 2 pages right out of school, you\'re probably padding.' },
    ],
    relatedTool: 'resume-builder',
    keywords: ['resume length', 'resume page count', 'one page resume', 'two page resume'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'linkedin-to-resume',
    title: 'How to Convert Your LinkedIn Profile to a Resume',
    query: 'linkedin to resume',
    metaDescription: 'Turn your LinkedIn profile into a clean resume PDF in under 2 minutes. Free tool, no signup.',
    intro: 'Your LinkedIn profile already has 80% of what your resume needs — you just have to extract it cleanly. Here\'s the fastest workflow.',
    steps: [
      { title: 'Open your LinkedIn profile', body: 'Go to linkedin.com/in/yourname while signed in.' },
      { title: 'Select all + copy', body: 'Press Ctrl/Cmd+A to select the whole page, then Ctrl/Cmd+C to copy. (Don\'t use LinkedIn\'s built-in "Save to PDF" — it produces a noisy, hard-to-edit document.)' },
      { title: 'Open the LinkedIn-to-Resume tool', body: 'Paste the copied content into our LinkedIn-to-Resume tool. The parser identifies sections automatically.' },
      { title: 'Review the parsed result', body: 'The right pane shows a clean resume preview. Check that name, title, experience, education, and skills look right.' },
      { title: 'Print to PDF', body: 'Click "Print → PDF". Use Chrome\'s "Save as PDF" destination for clean output.' },
    ],
    tips: [
      'After conversion, run through the ATS Checker against your target job description to confirm keyword coverage.',
      'For more control, copy the parsed content into the Resume Builder where you can edit each section directly.',
      'LinkedIn doesn\'t expose all skill endorsements in the public copy — manually add anything missing.',
    ],
    faq: [
      { q: 'Is my LinkedIn data uploaded?', a: 'No. Parsing happens entirely in your browser. Your profile content never leaves your device.' },
      { q: 'What if the parser misreads a section?', a: 'Click into the Resume Builder and edit manually. The parser is a head start, not a final answer.' },
      { q: 'Does this work with LinkedIn\'s "Save to PDF" export?', a: 'Yes — but the cleaner workflow is copy-paste from the live profile. Saved PDFs include navigation chrome the parser would have to filter out.' },
    ],
    relatedTool: 'linkedin-to-resume',
    keywords: ['linkedin to resume', 'linkedin resume', 'linkedin profile pdf', 'resume from linkedin'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'resume-action-verbs',
    title: 'Action Verbs for Resumes (200+ Strong Alternatives)',
    query: 'resume action verbs',
    metaDescription: '200+ action verbs to start resume bullets. Replace weak verbs (managed, worked) with stronger alternatives by category.',
    intro: 'Strong resume bullets start with action verbs. Weak ones start with "responsible for" or "worked on." Here\'s a curated list of action verbs by category, plus the verbs to avoid.',
    steps: [
      { title: 'Audit your current bullets', body: 'Open your resume. Count how many bullets start with "responsible for", "worked on", or "managed." If more than two, you\'re leaning on filler.' },
      { title: 'Replace weak verbs with strong ones', body: 'Use the categories below. Pick verbs that match what you actually did — strong but accurate beats strong-sounding-but-vague.' },
      { title: 'Vary verbs across bullets', body: 'Avoid using the same verb three times in a row. The eye picks up repetition and the bullets blur together.' },
      { title: 'Lead with impact when possible', body: 'Some bullets work better starting with the result: "$2M ARR delivered through new payments product." Both formats are valid.' },
    ],
    tips: [
      'Leadership: led, directed, oversaw, championed, spearheaded, mobilized, mentored.',
      'Building: built, designed, engineered, architected, prototyped, developed, deployed, shipped, launched.',
      'Improving: optimized, accelerated, streamlined, refactored, automated, reduced, doubled, tripled.',
      'Analyzing: analyzed, measured, audited, identified, diagnosed, forecasted, modeled.',
      'Negotiating: negotiated, secured, closed, partnered, persuaded, brokered.',
      'Communicating: presented, authored, published, taught, trained, briefed, advised.',
    ],
    faq: [
      { q: 'Should every bullet start with a different verb?', a: 'Ideally yes within a single role. Across multiple roles, repetition is fine if the work was genuinely similar.' },
      { q: 'Are past-tense verbs always right?', a: 'For previous roles: past tense. For current role: present tense. Don\'t mix tenses within a single role\'s bullets.' },
      { q: 'What verbs should I avoid?', a: '"Responsible for", "worked on", "helped with", "involved in", "assisted with". They describe presence, not contribution.' },
    ],
    relatedTool: 'resume-builder',
    keywords: ['resume action verbs', 'resume verbs', 'strong resume words', 'resume bullets'],
    publishedAt: '2026-05-08',
  },
];

export const getGuide = (slug: string) => guides.find(g => g.slug === slug);
