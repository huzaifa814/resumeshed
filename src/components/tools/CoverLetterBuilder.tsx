'use client';

import { useState } from 'react';

export function CoverLetterBuilder() {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [hiringManager, setHiringManager] = useState('Hiring Manager');
  const [company, setCompany] = useState('Acme Corp');
  const [jobTitle, setJobTitle] = useState('Senior Product Manager');
  const [opening, setOpening] = useState(`I'm excited to apply for the Senior Product Manager role at Acme Corp. Your work on consumer payments resonates with my background — over 8 years building high-engagement consumer products at YC-backed startups, I've shipped features that drove 30%+ retention lift and led the launch of a payments product that hit $5M ARR in 8 months.`);
  const [middle, setMiddle] = useState(`At my current role, I lead a team of 12 engineers and designers shipping the core checkout experience for 2M+ monthly users. The work I'm proudest of: rebuilding our onboarding flow, which moved D7 retention from 28% to 41% — the kind of step-change improvement I see Acme aiming for in its 2026 roadmap. I bring strong instincts around quantitative experimentation (200+ A/B tests) and clear product communication that aligns engineering, design, and exec leadership.`);
  const [closing, setClosing] = useState(`I'd love the chance to discuss how I can contribute to Acme's growth. I'm available for a conversation at your convenience. Thank you for your time.`);

  const print = () => window.print();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6 print:hidden">
        <h2 className="text-xl font-bold">Edit Your Cover Letter</h2>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Your Info</h3>
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Job Details</h3>
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Hiring Manager Name" value={hiringManager} onChange={(e) => setHiringManager(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </div>
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Opening Paragraph</h3>
          <p className="text-xs text-gray-500">Why you&apos;re applying + 1 specific thing about the company that resonates.</p>
          <textarea rows={5} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" value={opening} onChange={(e) => setOpening(e.target.value)} />
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Middle Paragraph</h3>
          <p className="text-xs text-gray-500">2-3 specific accomplishments with numbers. Connect to what they need.</p>
          <textarea rows={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" value={middle} onChange={(e) => setMiddle(e.target.value)} />
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Closing Paragraph</h3>
          <p className="text-xs text-gray-500">Polite call to action. Keep it short.</p>
          <textarea rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" value={closing} onChange={(e) => setClosing(e.target.value)} />
        </div>

        <button onClick={print} className="w-full py-3 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition">Download as PDF (Print → Save as PDF)</button>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit print:m-0 print:p-0 print:shadow-none">
        <h2 className="text-xl font-bold mb-3 print:hidden">Live Preview</h2>
        <div id="cover-letter-preview" className="p-12 rounded-xl bg-white text-gray-900 shadow-md max-w-[8.5in] mx-auto print:shadow-none print:rounded-none">
          <header className="mb-6">
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-sm text-gray-700">{email} · {phone}</p>
          </header>
          <p className="text-sm mb-6">{date}</p>
          <div className="text-sm mb-6">
            <p>{hiringManager}</p>
            <p>{company}</p>
          </div>
          <p className="text-sm mb-4">Dear {hiringManager.includes(' ') ? hiringManager.split(' ').pop() : hiringManager},</p>
          <p className="text-sm mb-4 leading-relaxed">{opening}</p>
          <p className="text-sm mb-4 leading-relaxed">{middle}</p>
          <p className="text-sm mb-6 leading-relaxed">{closing}</p>
          <p className="text-sm mb-1">Sincerely,</p>
          <p className="text-sm font-semibold">{name}</p>
        </div>
        <p className="text-xs text-gray-500 mt-3 print:hidden">💡 Tip: Click &quot;Download as PDF&quot; → &quot;Save as PDF&quot; → margins set to None for cleanest result.</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { margin: 0.75in; }
          body * { visibility: hidden; }
          #cover-letter-preview, #cover-letter-preview * { visibility: visible; }
          #cover-letter-preview { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; padding: 0; }
        }
      `}</style>
    </div>
  );
}
