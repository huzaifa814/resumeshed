'use client';

import { useState } from 'react';

const STOP_WORDS = new Set('a an the and or but if then so to of for in on at by with as is are was were be been being have has had do does did will would should could may might must can shall this that these those it its i you he she we they me him her us them my your his their our its'.split(/\s+/));

const ATS_RED_FLAGS = [
  { test: (t: string) => /\b(image|graphic|chart|table)\b/i.test(t), msg: 'Avoid embedded images, charts, or complex tables — many ATS strip them.', tip: 'Use plain text, bullet points, and standard headings instead.' },
  { test: (t: string) => t.split(/\n/).some(line => line.length > 200), msg: 'Some lines are very long — likely a paragraph instead of bullets.', tip: 'Break dense paragraphs into bullet points starting with action verbs.' },
  { test: (t: string) => !/\b(experience|work history|employment)\b/i.test(t), msg: 'Missing a clear "Experience" or "Work History" section heading.', tip: 'ATS look for standard section names — use "Experience", "Education", "Skills".' },
  { test: (t: string) => !/\b(education|degree|university|college|bachelor|master|phd)\b/i.test(t), msg: 'No education section detected.', tip: 'Add an Education section even for entry-level roles.' },
  { test: (t: string) => !/\b(skills|technologies|tools|proficient|expertise)\b/i.test(t), msg: 'No skills section detected.', tip: 'Add a dedicated Skills section listing tools and technologies.' },
  { test: (t: string) => !/\b\d{4}\b/.test(t), msg: 'No years (4-digit dates) found.', tip: 'Include start and end years for each job — ATS use these to compute experience.' },
  { test: (t: string) => /[•●◆■]/.test(t), msg: 'Custom bullet characters detected (●◆■) — some ATS render them as garbage.', tip: 'Use plain hyphens or asterisks instead, or trust the builder default.' },
];

export function AtsChecker() {
  const [resume, setResume] = useState('');
  const [job, setJob] = useState('');
  const [scored, setScored] = useState(false);

  const tokenize = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !STOP_WORDS.has(w));

  const resumeTokens = new Set(tokenize(resume));
  const jobTokens = tokenize(job);
  const jobTokenSet = new Set(jobTokens);
  const jobFreq: Record<string, number> = {};
  for (const t of jobTokens) jobFreq[t] = (jobFreq[t] || 0) + 1;

  const matched = [...jobTokenSet].filter(t => resumeTokens.has(t));
  const missing = [...jobTokenSet]
    .filter(t => !resumeTokens.has(t))
    .sort((a, b) => (jobFreq[b] || 0) - (jobFreq[a] || 0))
    .slice(0, 20);

  const keywordScore = jobTokenSet.size > 0 ? Math.round((matched.length / jobTokenSet.size) * 100) : 0;
  const wordCount = resume.split(/\s+/).filter(Boolean).length;
  const lengthScore = wordCount < 300 ? 40 : wordCount > 1200 ? 60 : 100;
  const flags = ATS_RED_FLAGS.filter(f => f.test(resume));
  const formatScore = Math.max(0, 100 - flags.length * 15);
  const overallScore = Math.round(keywordScore * 0.5 + formatScore * 0.3 + lengthScore * 0.2);

  const grade = overallScore >= 85 ? 'A' : overallScore >= 70 ? 'B' : overallScore >= 55 ? 'C' : overallScore >= 40 ? 'D' : 'F';
  const gradeColor = overallScore >= 70 ? '#10b981' : overallScore >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="block text-sm font-medium mb-2">Paste Your Resume</label>
          <textarea value={resume} onChange={(e) => { setResume(e.target.value); setScored(false); }} rows={14} placeholder="Paste resume content as plain text…" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono" />
          <p className="text-xs text-gray-500 mt-1">{wordCount} words</p>
        </div>
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <label className="block text-sm font-medium mb-2">Paste Job Description</label>
          <textarea value={job} onChange={(e) => { setJob(e.target.value); setScored(false); }} rows={14} placeholder="Paste the job posting…" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono" />
          <p className="text-xs text-gray-500 mt-1">{jobTokenSet.size} unique keywords</p>
        </div>
      </div>

      <button onClick={() => setScored(true)} disabled={!resume || !job} className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium transition">Score Resume</button>

      {scored && resume && job && (
        <>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-7xl font-bold" style={{ color: gradeColor }}>{grade}</div>
                <div className="text-sm text-gray-500 mt-1">{overallScore}/100</div>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>Keyword match</span><span className="font-mono">{keywordScore}%</span></div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-purple-500" style={{ width: `${keywordScore}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>ATS formatting</span><span className="font-mono">{formatScore}%</span></div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-purple-500" style={{ width: `${formatScore}%` }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>Length</span><span className="font-mono">{lengthScore}%</span></div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-purple-500" style={{ width: `${lengthScore}%` }} /></div>
                </div>
              </div>
            </div>
          </div>

          {missing.length > 0 && (
            <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
              <h3 className="font-semibold mb-3">🎯 Top missing keywords from job description</h3>
              <div className="flex flex-wrap gap-2">
                {missing.map(k => <span key={k} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-sm">{k}</span>)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">Add these (truthfully, in context) to your Skills, Experience, or Summary sections.</p>
            </div>
          )}

          {flags.length > 0 && (
            <div className="p-6 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
              <h3 className="font-semibold mb-3">⚠️ Formatting issues</h3>
              <ul className="space-y-3 text-sm">
                {flags.map((f, i) => (
                  <li key={i}>
                    <p className="font-medium">{f.msg}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{f.tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {flags.length === 0 && missing.length < 5 && keywordScore >= 75 && (
            <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 text-sm">
              ✅ Strong ATS profile. Your resume covers the job description well and uses standard formatting.
            </div>
          )}
        </>
      )}
    </div>
  );
}
