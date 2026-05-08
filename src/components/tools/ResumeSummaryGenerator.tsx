'use client';

import { useState } from 'react';

const TEMPLATES = [
  ({ role, years, skills, industry }: Args) =>
    `${cap(role)} with ${years} year${years === '1' ? '' : 's'} of experience in ${industry || 'high-growth environments'}, specializing in ${skills}. Proven track record of delivering measurable results through clear communication and disciplined execution.`,
  ({ role, years, skills, achievement }: Args) =>
    `Results-driven ${role} bringing ${years}+ year${years === '1' ? '' : 's'} of hands-on experience across ${skills}. ${achievement || 'Recognized for shipping reliable, scalable work on tight deadlines.'} Looking to apply this momentum at a company that values ownership and craft.`,
  ({ role, skills, industry, strength }: Args) =>
    `${cap(role)} who turns ${strength || 'complex requirements'} into shipped product. Deep familiarity with ${skills}${industry ? `, particularly in the ${industry} space` : ''}. Equally comfortable working independently or leading cross-functional collaboration.`,
  ({ role, years, skills, achievement }: Args) =>
    `${cap(role)} (${years} year${years === '1' ? '' : 's'}) blending ${skills} with a bias toward action. ${achievement || 'Consistent history of moving the metric that matters.'} Excited to take on problems that demand both technical depth and pragmatic judgment.`,
];

interface Args {
  role: string;
  years: string;
  skills: string;
  industry: string;
  achievement: string;
  strength: string;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ResumeSummaryGenerator() {
  const [role, setRole] = useState('Software Engineer');
  const [years, setYears] = useState('5');
  const [skills, setSkills] = useState('TypeScript, React, Node.js, AWS');
  const [industry, setIndustry] = useState('SaaS');
  const [achievement, setAchievement] = useState('Shipped 3 products from zero to first paying customer.');
  const [strength, setStrength] = useState('ambiguous problems');

  const args: Args = { role, years, skills, industry, achievement, strength };
  const summaries = TEMPLATES.map(fn => fn(args));

  const copy = (s: string) => {
    navigator.clipboard.writeText(s);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Role / Title</span>
          <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Years of experience</span>
          <input value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium mb-2">Top skills (comma-separated)</span>
          <input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Industry (optional)</span>
          <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="SaaS, fintech, healthcare…" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Strength / specialty (optional)</span>
          <input value={strength} onChange={(e) => setStrength(e.target.value)} placeholder="messy requirements, scaling teams…" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium mb-2">Notable achievement (optional)</span>
          <input value={achievement} onChange={(e) => setAchievement(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
      </div>

      <div className="space-y-3">
        {summaries.map((s, i) => (
          <div key={i} className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 mb-2">
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Variation {i + 1}</span>
              <button onClick={() => copy(s)} className="text-xs px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition">Copy</button>
            </div>
            <p className="text-sm leading-relaxed">{s}</p>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400">
        <p><strong className="text-gray-900 dark:text-white">Tip:</strong> A great summary is 2-4 lines, mentions years + role + 2-3 specific skills, and ends with a clear value prop. Edit any variation above to fit your voice.</p>
      </div>
    </div>
  );
}
