'use client';

import { useState } from 'react';

interface Tpl {
  id: string;
  label: string;
  audience: string;
  body: (vars: Vars) => string;
}

interface Vars {
  yourName: string;
  company: string;
  role: string;
  hiringManager: string;
  yourTitle: string;
  years: string;
  skills: string;
  achievement: string;
}

const TEMPLATES: Tpl[] = [
  {
    id: 'classic',
    label: 'Classic — direct and professional',
    audience: 'Most roles. Best for traditional industries.',
    body: ({ yourName, company, role, hiringManager, yourTitle, years, skills, achievement }) =>
`Dear ${hiringManager || 'Hiring Manager'},

I'm writing to apply for the ${role} role at ${company}. With ${years} years of experience as a ${yourTitle}, I bring proven expertise in ${skills} and a track record of delivering results.

In my most recent role, ${achievement || 'I led initiatives that produced measurable outcomes for the team and the business'}. I'm drawn to ${company} specifically because of your reputation for ${'innovation and quality'} — and I believe my background is a strong match for what the team needs.

I'd welcome the chance to discuss how my experience could contribute to your goals. Thank you for considering my application.

Sincerely,
${yourName || '[Your Name]'}`,
  },
  {
    id: 'startup',
    label: 'Startup — energetic and outcome-focused',
    audience: 'Early-stage companies. Founders read these.',
    body: ({ yourName, company, role, yourTitle, years, skills, achievement }) =>
`Hi ${company} team,

I want to be your next ${role}. Here's why:

I've spent ${years} years as a ${yourTitle} working across ${skills}. ${achievement || 'I shipped, broke, and rebuilt enough to know what matters and what doesn\'t.'}

What I love about ${company} is that you're solving a real problem with a small team — that's where I do my best work. Less politics, more shipping.

I'd rather show than tell. Happy to send a sample of work or jump on a 20-minute call whenever you're free.

— ${yourName || '[Your Name]'}`,
  },
  {
    id: 'career-change',
    label: 'Career change — transferable skills',
    audience: 'When pivoting roles or industries.',
    body: ({ yourName, company, role, yourTitle, years, skills, achievement }) =>
`Dear Hiring Team,

I'm applying for the ${role} position at ${company} as a deliberate career step. My ${years} years as a ${yourTitle} taught me ${skills} — skills that translate directly to this role even though my title was different.

A few examples: ${achievement || 'I built systems, managed stakeholders, and made decisions under uncertainty — the same fundamentals this role demands.'}

I'm not asking ${company} to take a chance on me. I'm telling you my background is a fit, and I have specific examples to back it up. Looking forward to walking through them.

Best,
${yourName || '[Your Name]'}`,
  },
  {
    id: 'referral',
    label: 'Referral — warm intro mentioned',
    audience: 'When someone inside the company referred you.',
    body: ({ yourName, company, role, hiringManager, yourTitle, years, skills, achievement }) =>
`Dear ${hiringManager || 'Hiring Manager'},

[Referrer name] suggested I reach out about the ${role} role at ${company}. After looking at the team and the work, I agree it's a strong match.

I've been a ${yourTitle} for ${years} years, focused on ${skills}. ${achievement || 'My most recent project landed well and I\'m looking for the next thing.'}

[Referrer name] can speak to how I work day-to-day. I'd love the chance to take it from there in an interview.

Thank you,
${yourName || '[Your Name]'}`,
  },
  {
    id: 'entry-level',
    label: 'Entry-level — recent grad or first job',
    audience: 'Internships and new-grad roles.',
    body: ({ yourName, company, role, hiringManager, skills, achievement }) =>
`Dear ${hiringManager || 'Hiring Manager'},

I'm applying for the ${role} role at ${company}. I recently graduated and am ready to bring fresh skills and serious work ethic to the team.

During my studies and projects, I built capability in ${skills}. ${achievement || 'A capstone project pushed me to ship something real, learn from feedback, and iterate.'} I learn fast and ask good questions.

${company} is the kind of place where I want to start because the work is challenging and the team is talented. I'd appreciate the chance to interview.

Sincerely,
${yourName || '[Your Name]'}`,
  },
  {
    id: 'remote',
    label: 'Remote-first — async-comfortable',
    audience: 'Distributed teams and remote roles.',
    body: ({ yourName, company, role, yourTitle, years, skills, achievement }) =>
`Hello ${company} team,

Applying for the ${role} role. I've worked remotely for ${years} years as a ${yourTitle}, with ${skills} as my core stack.

A few things I bring to a distributed team: clear written communication, comfort with async-first work, and a habit of over-documenting decisions so nothing lives only in someone's head. ${achievement || 'My last team trusted me to own end-to-end without daily standups, and that\'s how I do my best work.'}

Looking forward to talking.

— ${yourName || '[Your Name]'}`,
  },
  {
    id: 'executive',
    label: 'Senior / Executive — leadership tone',
    audience: 'Director, VP, and exec roles.',
    body: ({ yourName, company, role, hiringManager, yourTitle, years, skills, achievement }) =>
`Dear ${hiringManager || 'Hiring Committee'},

I'm submitting my candidacy for the ${role} role. After ${years} years leading teams as a ${yourTitle}, I'm specifically looking for a position where strategic depth and operational discipline both matter — which is what drew me to ${company}.

My focus areas — ${skills} — align with where ${company} appears to be investing. ${achievement || 'In my last role I led an organization through a measurable shift in outcomes, and I\'m ready to do that again.'}

I'd value a conversation about your priorities for the next 12-18 months and how this role contributes to them.

Regards,
${yourName || '[Your Name]'}`,
  },
  {
    id: 'gap',
    label: 'After a gap — confident re-entry',
    audience: 'Returning after time away.',
    body: ({ yourName, company, role, yourTitle, years, skills, achievement }) =>
`Dear Hiring Manager,

I'm applying for the ${role} role at ${company}. Some context up front: I took time away from ${yourTitle} work for personal reasons, and I'm now re-entering the field with full focus.

My ${years} years before the break covered ${skills}. During the gap I kept current through reading, side projects, and selective consulting. ${achievement || 'I\'m sharper for the time off, not rusty.'}

I'd love to discuss how my experience and current motivation map to what ${company} needs.

Sincerely,
${yourName || '[Your Name]'}`,
  },
];

export function CoverLetterTemplate() {
  const [tplId, setTplId] = useState('classic');
  const [vars, setVars] = useState<Vars>({
    yourName: '',
    company: 'Acme Corp',
    role: 'Software Engineer',
    hiringManager: '',
    yourTitle: 'Software Engineer',
    years: '5',
    skills: 'React, Node.js, AWS',
    achievement: '',
  });

  const tpl = TEMPLATES.find(t => t.id === tplId) || TEMPLATES[0];
  const text = tpl.body(vars);
  const setVar = (k: keyof Vars, v: string) => setVars(prev => ({ ...prev, [k]: v }));

  const copy = () => navigator.clipboard.writeText(text);
  const download = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cover-letter-${vars.company.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-2 md:grid-cols-4">
        {TEMPLATES.map(t => (
          <button key={t.id} onClick={() => setTplId(t.id)} className={`p-3 rounded-lg border text-left transition ${tplId === t.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' : 'border-gray-200 dark:border-slate-800 hover:border-gray-300'}`}>
            <p className="text-sm font-medium">{t.label.split(' — ')[0]}</p>
            <p className="text-xs text-gray-500 mt-1">{t.audience}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block"><span className="block text-sm font-medium mb-1">Your name</span><input value={vars.yourName} onChange={(e) => setVar('yourName', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block"><span className="block text-sm font-medium mb-1">Company</span><input value={vars.company} onChange={(e) => setVar('company', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block"><span className="block text-sm font-medium mb-1">Role applying for</span><input value={vars.role} onChange={(e) => setVar('role', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block"><span className="block text-sm font-medium mb-1">Hiring manager (optional)</span><input value={vars.hiringManager} onChange={(e) => setVar('hiringManager', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block"><span className="block text-sm font-medium mb-1">Your current title</span><input value={vars.yourTitle} onChange={(e) => setVar('yourTitle', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block"><span className="block text-sm font-medium mb-1">Years experience</span><input value={vars.years} onChange={(e) => setVar('years', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block md:col-span-2"><span className="block text-sm font-medium mb-1">Key skills</span><input value={vars.skills} onChange={(e) => setVar('skills', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
        <label className="block md:col-span-2"><span className="block text-sm font-medium mb-1">Notable achievement (optional)</span><input value={vars.achievement} onChange={(e) => setVar('achievement', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
      </div>

      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">{tpl.label}</h3>
          <div className="flex gap-2">
            <button onClick={copy} className="text-sm px-3 py-1.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition">Copy</button>
            <button onClick={download} className="text-sm px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition">Download .txt</button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed text-gray-800 dark:text-gray-200">{text}</pre>
      </div>
    </div>
  );
}
