'use client';

import { useState } from 'react';

const STOP_WORDS = new Set('a an the and or but if then so to of for in on at by with as is are was were be been being have has had do does did will would should could may might must can shall this that these those it its i you he she we they me him her us them my your his their our its also more than just from into about over under across between among such very own only same too any each every all both other another some many much most few less least first last next now here there when where why how what which who whom whose looking seeking want wants needs need needed work works working worked years year experience experiences experienced strong skills skill role roles position positions team teams company companies new join joining great good better best required requirement requirements ability abilities including include includes included plus bonus preferred ideal'.split(/\s+/));

export function KeywordOptimizer() {
  const [resume, setResume] = useState('');
  const [job, setJob] = useState('');

  const tokenize = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, ' ').split(/\s+/)
      .map(w => w.replace(/^[.\-]+|[.\-]+$/g, ''))
      .filter(w => w.length >= 3 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));

  const jobFreq: Record<string, number> = {};
  for (const t of tokenize(job)) jobFreq[t] = (jobFreq[t] || 0) + 1;
  const resumeSet = new Set(tokenize(resume));

  const ranked = Object.entries(jobFreq)
    .filter(([, n]) => n >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);

  const matched = ranked.filter(([w]) => resumeSet.has(w));
  const missing = ranked.filter(([w]) => !resumeSet.has(w));
  const matchPct = ranked.length > 0 ? Math.round((matched.length / ranked.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="block text-sm font-medium mb-2">Your Resume</label>
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} rows={12} placeholder="Paste resume…" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono" />
        </div>
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <textarea value={job} onChange={(e) => setJob(e.target.value)} rows={12} placeholder="Paste job posting…" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono" />
        </div>
      </div>

      {ranked.length > 0 && (
        <>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20">
            <div className="flex items-baseline gap-4">
              <div className="text-5xl font-bold" style={{ color: '#8b5cf6' }}>{matchPct}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{matched.length} of top {ranked.length} keywords found</div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full bg-purple-500 transition-all" style={{ width: `${matchPct}%` }} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20">
              <h3 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-400">✅ In your resume ({matched.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {matched.map(([w, n]) => <span key={w} className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-xs">{w} <span className="text-emerald-600 dark:text-emerald-400">×{n}</span></span>)}
                {matched.length === 0 && <span className="text-sm text-gray-500">None yet — paste your resume.</span>}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
              <h3 className="font-semibold mb-3 text-red-700 dark:text-red-400">❌ Missing ({missing.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {missing.map(([w, n]) => <span key={w} className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-red-300 dark:border-red-700 text-xs">{w} <span className="text-red-600 dark:text-red-400">×{n}</span></span>)}
                {missing.length === 0 && <span className="text-sm text-gray-500">All covered.</span>}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400">
            <p><strong className="text-gray-900 dark:text-white">Tip:</strong> Don&apos;t keyword-stuff. Weave missing terms into real bullet points where they naturally describe what you did. ATS reward context, not lists.</p>
          </div>
        </>
      )}
    </div>
  );
}
