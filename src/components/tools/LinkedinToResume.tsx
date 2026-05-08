'use client';

import { useState } from 'react';

interface ParsedResume {
  name: string;
  title: string;
  location: string;
  about: string;
  skills: string[];
  experience: { title: string; company: string; dates: string; bullets: string[] }[];
  education: { degree: string; school: string; dates: string }[];
}

const cleanLine = (s: string) => s.replace(/\s+/g, ' ').trim();

function parseLinkedIn(raw: string): ParsedResume {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const result: ParsedResume = { name: '', title: '', location: '', about: '', skills: [], experience: [], education: [] };

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!result.name && /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(l)) {
      result.name = l;
      if (lines[i + 1] && !/^(About|Experience|Education|Skills|Contact)/i.test(lines[i + 1])) {
        result.title = cleanLine(lines[i + 1]);
      }
      if (lines[i + 2] && /(?:,|\sArea)/.test(lines[i + 2]) && !/^(About|Experience|Education|Skills)/i.test(lines[i + 2])) {
        result.location = cleanLine(lines[i + 2]);
      }
      break;
    }
  }

  const findSection = (header: RegExp) => {
    const start = lines.findIndex(l => header.test(l));
    if (start === -1) return [] as string[];
    const nextHeader = lines.slice(start + 1).findIndex(l => /^(About|Experience|Education|Skills|Licenses|Certifications|Volunteer|Languages|Recommendations|Activity|Interests|Contact)/i.test(l));
    const end = nextHeader === -1 ? lines.length : start + 1 + nextHeader;
    return lines.slice(start + 1, end);
  };

  result.about = findSection(/^About$/i).join('\n').trim();

  const skillLines = findSection(/^Skills$/i);
  result.skills = skillLines.flatMap(l => l.split(/[,•·]/)).map(cleanLine).filter(s => s.length > 1 && s.length < 50 && !/^(Skills|See more|Show all|endorsement)/i.test(s));
  result.skills = [...new Set(result.skills)].slice(0, 25);

  const expLines = findSection(/^Experience$/i);
  let curExp: ParsedResume['experience'][number] | null = null;
  for (const l of expLines) {
    if (/^(Show|See more|See less)/i.test(l)) continue;
    const dateMatch = l.match(/^(.+?)\s+[·•]?\s*(.+?\d{4}.*?(?:Present|\d{4}|months?|years?|yrs?|mos?))/i);
    const looksLikeRole = /^[A-Z]/.test(l) && l.length < 120 && !l.startsWith('•') && !l.startsWith('-');
    if (looksLikeRole && !curExp) {
      curExp = { title: l, company: '', dates: '', bullets: [] };
    } else if (curExp && !curExp.company && looksLikeRole) {
      curExp.company = l;
    } else if (curExp && !curExp.dates && /\d{4}/.test(l)) {
      curExp.dates = l;
    } else if (curExp && /^[•\-*]/.test(l)) {
      curExp.bullets.push(l.replace(/^[•\-*]\s*/, ''));
    } else if (curExp && curExp.title && curExp.company && curExp.dates) {
      if (l.length > 30) curExp.bullets.push(l);
      else if (looksLikeRole) {
        result.experience.push(curExp);
        curExp = { title: l, company: '', dates: '', bullets: [] };
      }
    }
    if (dateMatch) { /* swallow */ }
  }
  if (curExp && curExp.title) result.experience.push(curExp);

  const eduLines = findSection(/^Education$/i);
  let curEdu: ParsedResume['education'][number] | null = null;
  for (const l of eduLines) {
    if (/^(Show|See more|Activities)/i.test(l)) continue;
    const looksLikeSchool = /University|College|School|Institute|Academy/i.test(l);
    if (looksLikeSchool && !curEdu) {
      curEdu = { school: l, degree: '', dates: '' };
    } else if (curEdu && !curEdu.degree) {
      curEdu.degree = l;
    } else if (curEdu && !curEdu.dates && /\d{4}/.test(l)) {
      curEdu.dates = l;
      result.education.push(curEdu);
      curEdu = null;
    }
  }
  if (curEdu && curEdu.school) result.education.push(curEdu);

  return result;
}

export function LinkedinToResume() {
  const [raw, setRaw] = useState('');
  const [parsed, setParsed] = useState<ParsedResume | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const run = () => {
    if (!raw.trim()) return;
    setParsed(parseLinkedIn(raw));
  };

  const print = () => window.print();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4 print:hidden">
        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 text-sm">
          <p className="font-semibold mb-1">How to copy your LinkedIn profile</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Open your LinkedIn profile in a browser</li>
            <li>Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-xs">Ctrl/Cmd + A</kbd> to select all</li>
            <li>Copy with <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-xs">Ctrl/Cmd + C</kbd></li>
            <li>Paste into the box below and click Parse</li>
          </ol>
          <button onClick={() => setShowHelp(!showHelp)} className="text-xs text-purple-700 dark:text-purple-400 underline mt-2">{showHelp ? 'Hide' : 'Show'} parser tips</button>
          {showHelp && <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">The parser looks for section headings (About, Experience, Education, Skills) and tries to assign content under each. If it misses something, edit the resume in the right preview after parsing — or use the Resume Builder for full control. Nothing is uploaded; parsing happens entirely in your browser.</p>}
        </div>

        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={20} placeholder="Paste your full LinkedIn profile here…" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono" />

        <div className="flex gap-3">
          <button onClick={run} disabled={!raw.trim()} className="flex-1 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium transition">Parse</button>
          {parsed && <button onClick={print} className="py-3 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition">Print → PDF</button>}
        </div>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit print:m-0 print:p-0 print:shadow-none">
        <h2 className="text-xl font-bold mb-3 print:hidden">Live Preview</h2>
        {!parsed ? (
          <div className="p-12 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-800 text-center text-sm text-gray-500">
            Paste your LinkedIn profile and click Parse to see a preview here.
          </div>
        ) : (
          <div id="resume-preview" className="p-12 rounded-xl bg-white text-gray-900 shadow-md max-w-[8.5in] mx-auto print:shadow-none print:rounded-none">
            <header className="mb-6 pb-4 border-b border-gray-200">
              <div className="text-3xl font-bold mb-1">{parsed.name || 'Your Name'}</div>
              <p className="text-base text-gray-700">{parsed.title || 'Your Title'}</p>
              <p className="text-sm text-gray-600 mt-1">{parsed.location}</p>
            </header>

            {parsed.about && (
              <section className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Summary</h3>
                <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">{parsed.about}</p>
              </section>
            )}

            {parsed.experience.length > 0 && (
              <section className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Experience</h3>
                {parsed.experience.map((e, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline gap-2 flex-wrap">
                      <p className="font-semibold">{e.title} <span className="text-gray-600 font-normal">· {e.company}</span></p>
                      <p className="text-xs text-gray-600">{e.dates}</p>
                    </div>
                    {e.bullets.length > 0 && (
                      <ul className="text-sm mt-1 list-disc pl-5 text-gray-800">
                        {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {parsed.education.length > 0 && (
              <section className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Education</h3>
                {parsed.education.map((e, i) => (
                  <div key={i} className="flex justify-between items-baseline mb-1">
                    <p className="text-sm"><span className="font-semibold">{e.school}</span> · {e.degree}</p>
                    <p className="text-xs text-gray-600">{e.dates}</p>
                  </div>
                ))}
              </section>
            )}

            {parsed.skills.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Skills</h3>
                <p className="text-sm text-gray-800">{parsed.skills.join(' · ')}</p>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
