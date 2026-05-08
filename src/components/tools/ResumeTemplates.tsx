'use client';

import Link from 'next/link';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Clean two-column layout with subtle accent. Best for tech, design, and creative roles.', best: 'Tech · Design · Marketing' },
  { id: 'classic', name: 'Classic', desc: 'Traditional single-column. ATS-safe and widely accepted in conservative industries.', best: 'Finance · Law · Healthcare' },
  { id: 'minimalist', name: 'Minimalist', desc: 'Black-and-white, plenty of whitespace. Lets your content do the talking.', best: 'Senior roles · Executives' },
  { id: 'compact', name: 'Compact', desc: 'Dense single-page format. Perfect when you have a lot to fit and the bar is high.', best: 'Engineering · Academia' },
];

export function ResumeTemplates() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {TEMPLATES.map(t => (
          <div key={t.id} className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition">
            <div className="aspect-[8.5/11] bg-gray-50 dark:bg-slate-950 p-6 flex items-start">
              <div className="w-full text-[6px] text-gray-700 dark:text-gray-300 leading-tight">
                <div className="font-bold text-[10px] mb-1">JANE DOE</div>
                <div className="text-[5px] text-gray-500 mb-3">jane@example.com · linkedin.com/in/jane</div>
                <div className="border-t border-gray-300 dark:border-slate-700 my-2" />
                <div className="font-semibold text-[7px] mb-1">EXPERIENCE</div>
                <div className="mb-2"><div className="font-medium">Senior Engineer · Acme</div><div className="text-[5px] text-gray-500">Jan 2022 - Present</div><div className="mt-0.5">— Shipped 3 products from concept to first paying customer</div><div>— Led migration to a new platform, cutting infra cost 40%</div></div>
                <div className="mb-2"><div className="font-medium">Engineer · Initech</div><div className="text-[5px] text-gray-500">2019 - 2021</div><div className="mt-0.5">— Built core analytics pipeline used by 50+ team members</div></div>
                <div className="font-semibold text-[7px] mb-1 mt-2">EDUCATION</div>
                <div>BS Computer Science · State University · 2019</div>
                <div className="font-semibold text-[7px] mb-1 mt-2">SKILLS</div>
                <div>TypeScript · React · Python · AWS · PostgreSQL</div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 dark:border-slate-800">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <span className="text-xs text-gray-500">{t.best}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t.desc}</p>
              <Link href="/tools/resume-builder" className="inline-block w-full text-center px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition">Use this template →</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h2 className="font-semibold mb-3">Which template should I pick?</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-5">
          <li><strong>Big company, traditional industry?</strong> Classic. ATS won&apos;t trip on it and recruiters won&apos;t roll their eyes.</li>
          <li><strong>Startup or modern tech?</strong> Modern or Minimalist. Visual polish signals you care about details.</li>
          <li><strong>10+ years of experience?</strong> Compact lets you show range without bleeding to page 2.</li>
          <li><strong>Not sure?</strong> Start with Classic. It&apos;s the safest default and easiest to retheme later.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3"><strong>All templates are ATS-friendly.</strong> No tables, no images, no fonts that fall apart in parsers — just clean text the way applicant tracking systems expect to see it.</p>
      </div>
    </div>
  );
}
