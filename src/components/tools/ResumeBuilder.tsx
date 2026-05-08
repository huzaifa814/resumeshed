'use client';

import { useState } from 'react';

interface Experience { title: string; company: string; dates: string; bullets: string }
interface Education { degree: string; school: string; dates: string }

export function ResumeBuilder() {
  const [name, setName] = useState('Jane Doe');
  const [title, setTitle] = useState('Senior Product Manager');
  const [email, setEmail] = useState('jane@example.com');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [location, setLocation] = useState('San Francisco, CA');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/janedoe');
  const [summary, setSummary] = useState('Product manager with 8+ years building consumer apps used by millions. Led 0→1 launches at two YC-backed startups, shipped features driving 30%+ retention lift.');
  const [skills, setSkills] = useState('Product Strategy, User Research, A/B Testing, SQL, Figma, Roadmapping, OKRs, Agile/Scrum');

  const [experiences, setExperiences] = useState<Experience[]>([
    { title: 'Senior Product Manager', company: 'Acme Corp', dates: '2022 — Present', bullets: '• Led launch of new payments product, hit $5M ARR in 8 months\n• Grew weekly active users 60% via onboarding redesign\n• Managed cross-functional team of 12 engineers and designers' },
    { title: 'Product Manager', company: 'StartupCo', dates: '2019 — 2022', bullets: '• Owned core consumer app, 2M+ MAU\n• Shipped 40+ features, drove retention from 28% to 41%\n• Established A/B testing program, 200+ experiments run' },
  ]);

  const [education, setEducation] = useState<Education[]>([
    { degree: 'B.S. Computer Science', school: 'University of California, Berkeley', dates: '2015 — 2019' },
  ]);

  const addExp = () => setExperiences([...experiences, { title: '', company: '', dates: '', bullets: '' }]);
  const updExp = (i: number, k: keyof Experience, v: string) => setExperiences(experiences.map((e, idx) => idx === i ? { ...e, [k]: v } : e));
  const delExp = (i: number) => setExperiences(experiences.filter((_, idx) => idx !== i));

  const addEdu = () => setEducation([...education, { degree: '', school: '', dates: '' }]);
  const updEdu = (i: number, k: keyof Education, v: string) => setEducation(education.map((e, idx) => idx === i ? { ...e, [k]: v } : e));
  const delEdu = (i: number) => setEducation(education.filter((_, idx) => idx !== i));

  const print = () => window.print();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6 print:hidden">
        <h2 className="text-xl font-bold">Edit Your Resume</h2>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Personal Info</h3>
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="LinkedIn / Website" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Summary</h3>
          <textarea rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Experience</h3>
            <button onClick={addExp} className="text-sm px-3 py-1 rounded-lg bg-violet-500 text-white hover:bg-violet-600">+ Add</button>
          </div>
          {experiences.map((exp, i) => (
            <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">#{i + 1}</span>
                <button onClick={() => delExp(i)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
              </div>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Job Title" value={exp.title} onChange={(e) => updExp(i, 'title', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Company" value={exp.company} onChange={(e) => updExp(i, 'company', e.target.value)} />
                <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Dates" value={exp.dates} onChange={(e) => updExp(i, 'dates', e.target.value)} />
              </div>
              <textarea rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="• Bullet 1&#10;• Bullet 2" value={exp.bullets} onChange={(e) => updExp(i, 'bullets', e.target.value)} />
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Education</h3>
            <button onClick={addEdu} className="text-sm px-3 py-1 rounded-lg bg-violet-500 text-white hover:bg-violet-600">+ Add</button>
          </div>
          {education.map((edu, i) => (
            <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/50 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500">#{i + 1}</span><button onClick={() => delEdu(i)} className="text-xs text-red-500 hover:text-red-600">Remove</button></div>
              <input className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Degree" value={edu.degree} onChange={(e) => updEdu(i, 'degree', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="School" value={edu.school} onChange={(e) => updEdu(i, 'school', e.target.value)} />
                <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Dates" value={edu.dates} onChange={(e) => updEdu(i, 'dates', e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 space-y-3">
          <h3 className="font-semibold">Skills</h3>
          <textarea rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" value={skills} onChange={(e) => setSkills(e.target.value)} />
          <p className="text-xs text-gray-500">Comma-separated</p>
        </div>

        <button onClick={print} className="w-full py-3 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition">Download as PDF (Print → Save as PDF)</button>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit print:m-0 print:p-0 print:shadow-none">
        <h2 className="text-xl font-bold mb-3 print:hidden">Live Preview</h2>
        <div id="resume-preview" className="p-8 rounded-xl bg-white text-gray-900 shadow-md max-w-[8.5in] mx-auto print:shadow-none print:rounded-none print:p-12">
          <header className="border-b-2 border-gray-900 pb-4 mb-4">
            <h1 className="text-3xl font-bold mb-1">{name}</h1>
            <p className="text-lg text-gray-700">{title}</p>
            <p className="text-sm text-gray-600 mt-2">{email} · {phone} · {location} · {linkedin}</p>
          </header>
          {summary && <section className="mb-4"><h2 className="text-sm font-bold uppercase tracking-wide mb-1">Summary</h2><p className="text-sm leading-relaxed">{summary}</p></section>}
          {experiences.length > 0 && <section className="mb-4"><h2 className="text-sm font-bold uppercase tracking-wide mb-2">Experience</h2>{experiences.map((exp, i) => (
            <div key={i} className="mb-3"><div className="flex items-baseline justify-between"><div><strong className="text-sm">{exp.title}</strong>{exp.company && <span className="text-sm"> · {exp.company}</span>}</div><span className="text-xs text-gray-600">{exp.dates}</span></div>{exp.bullets && <pre className="text-sm whitespace-pre-wrap font-sans mt-1 leading-relaxed">{exp.bullets}</pre>}</div>
          ))}</section>}
          {education.length > 0 && <section className="mb-4"><h2 className="text-sm font-bold uppercase tracking-wide mb-2">Education</h2>{education.map((edu, i) => (
            <div key={i} className="mb-2 flex items-baseline justify-between"><div><strong className="text-sm">{edu.degree}</strong>{edu.school && <span className="text-sm"> · {edu.school}</span>}</div><span className="text-xs text-gray-600">{edu.dates}</span></div>
          ))}</section>}
          {skills && <section><h2 className="text-sm font-bold uppercase tracking-wide mb-1">Skills</h2><p className="text-sm">{skills}</p></section>}
        </div>
        <p className="text-xs text-gray-500 mt-3 print:hidden">💡 Tip: Click &quot;Download as PDF&quot; → Choose &quot;Save as PDF&quot; in print dialog → adjust margins to &quot;None&quot;.</p>
      </div>

      <style jsx global>{`
        @media print {
          @page { margin: 0.5in; }
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
