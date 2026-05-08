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
  { slug: 'cover-letter-builder', title: 'Cover Letter Builder', description: 'Match your resume style. Write once, customize per role.', icon: '✉️', category: 'cover-letter', available: false },
  { slug: 'ats-checker', title: 'ATS Resume Checker', description: 'Score your resume against ATS systems. Find keyword gaps.', icon: '🎯', category: 'optimize', available: false },
  { slug: 'resume-templates', title: 'Resume Templates', description: 'Browse professional templates. Pick one, customize, download.', icon: '🎨', category: 'examples', available: false },
  { slug: 'resume-keywords', title: 'Keyword Optimizer', description: 'Match your resume to a job description. Boost interview rate.', icon: '🔍', category: 'optimize', available: false },
  { slug: 'linkedin-to-resume', title: 'LinkedIn to Resume', description: 'Import LinkedIn profile, format as a polished PDF resume.', icon: '🔗', category: 'builder', available: false },
  { slug: 'resume-summary-generator', title: 'Resume Summary Generator', description: 'Write a strong professional summary in seconds. AI-assisted.', icon: '✨', category: 'optimize', available: false },
  { slug: 'cover-letter-template', title: 'Cover Letter Templates', description: 'Pre-written templates by industry and role.', icon: '📝', category: 'examples', available: false },
  { slug: 'resume-pdf-converter', title: 'Resume to PDF', description: 'Convert Word resume to clean PDF. Preserves formatting.', icon: '📑', category: 'builder', available: false },
];

export const getTool = (slug: string) => tools.find(t => t.slug === slug);
export const getAvailableTools = () => tools.filter(t => t.available);
