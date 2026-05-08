export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: 'builder' | 'cover-letter' | 'optimize' | 'examples';
  available: boolean;
}

export const tools: Tool[] = [
  { slug: 'resume-builder', title: 'Resume Builder', description: 'Create an ATS-friendly resume in 5 minutes. Live preview, instant PDF download.', icon: '📄', category: 'builder', available: true },
  { slug: 'resume-templates', title: 'Resume Templates', description: 'Browse professional templates. Pick one, customize, download.', icon: '🎨', category: 'examples', available: true },
  { slug: 'cover-letter-builder', title: 'Cover Letter Builder', description: 'Match your resume style. Write once, customize per role.', icon: '✉️', category: 'cover-letter', available: true },
  { slug: 'cover-letter-template', title: 'Cover Letter Templates', description: '8 pre-written templates by role and audience. Fill blanks, copy, send.', icon: '📝', category: 'examples', available: true },
  { slug: 'ats-checker', title: 'ATS Resume Checker', description: 'Score your resume against ATS systems. Find keyword gaps and formatting issues.', icon: '🎯', category: 'optimize', available: true },
  { slug: 'resume-keywords', title: 'Keyword Optimizer', description: 'Match your resume to a job description. Boost interview rate.', icon: '🔍', category: 'optimize', available: true },
  { slug: 'resume-summary-generator', title: 'Resume Summary Generator', description: 'Write a strong professional summary in seconds. 4 variations.', icon: '✨', category: 'optimize', available: true },
  { slug: 'linkedin-to-resume', title: 'LinkedIn to Resume', description: 'Paste your LinkedIn profile, get a clean ATS-friendly PDF resume.', icon: '🔗', category: 'builder', available: true },
  { slug: 'resume-pdf-converter', title: 'Word to PDF Resume', description: 'Convert .docx Word resume to clean PDF. Preserves formatting, browser-only.', icon: '📑', category: 'builder', available: true },
];

export const getTool = (slug: string) => tools.find(t => t.slug === slug);
export const getAvailableTools = () => tools.filter(t => t.available);
