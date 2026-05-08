'use client';

import { useState, useRef } from 'react';

export function ResumePdfConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    if (!/\.docx?$/i.test(f.name)) { setErr('Please pick a .docx or .doc file'); return; }
    setErr(null); setBusy(true); setFile(f); setHtml(null);
    try {
      const mammoth = await import('mammoth');
      const buf = await f.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: buf });
      setHtml(result.value || '<p>(empty document)</p>');
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Conversion failed');
    } finally {
      setBusy(false);
    }
  };

  const downloadPdf = async () => {
    if (!html) return;
    setBusy(true); setErr(null);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      const wrap = document.createElement('div');
      wrap.style.cssText = 'width:540pt;font-family:Helvetica,Arial,sans-serif;font-size:11pt;line-height:1.4;color:#000';
      wrap.innerHTML = html;
      document.body.appendChild(wrap);
      await doc.html(wrap, {
        x: 36, y: 36,
        width: 540,
        windowWidth: 540,
        autoPaging: 'text',
      });
      document.body.removeChild(wrap);
      const base = (file?.name || 'resume').replace(/\.[^.]+$/, '');
      doc.save(`${base}.pdf`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'PDF export failed');
    } finally {
      setBusy(false);
    }
  };

  const printIt = () => window.print();

  return (
    <div className="space-y-6">
      <div onClick={() => fileInput.current?.click()} onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }} onDragOver={(e) => e.preventDefault()} className="cursor-pointer p-12 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-purple-500 bg-gray-50 dark:bg-slate-900/50 text-center transition print:hidden">
        <input ref={fileInput} type="file" accept=".docx,.doc" onChange={(e) => onFile(e.target.files?.[0] ?? undefined)} className="hidden" />
        {!file ? (<><div className="text-5xl mb-3">📑</div><p className="text-lg font-medium mb-1">Drop a .docx file or click to browse</p><p className="text-sm text-gray-500">Microsoft Word document → clean PDF, 100% in your browser</p></>) : (<><div className="text-5xl mb-3">{busy ? '⏳' : '✅'}</div><p className="text-lg font-medium">{file.name}</p><p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p></>)}
      </div>

      {err && <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">{err}</div>}

      {html && (
        <>
          <div className="flex flex-wrap gap-3 print:hidden">
            <button onClick={downloadPdf} disabled={busy} className="flex-1 min-w-[200px] py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium transition">{busy ? 'Building PDF…' : 'Download PDF'}</button>
            <button onClick={printIt} className="py-3 px-6 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition">Print → Save as PDF</button>
          </div>

          <div id="docx-preview" className="p-12 rounded-xl bg-white text-gray-900 shadow-md max-w-[8.5in] mx-auto print:shadow-none print:rounded-none print:p-0 print:m-0">
            <div className="prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </>
      )}

      {!file && (
        <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400 print:hidden">
          <strong className="text-gray-900 dark:text-white">Tip:</strong> The PDF preserves your text, headings, and bullet points but uses a clean default font. For pixel-perfect formatting, use Word&apos;s built-in &quot;Save as PDF&quot;. For ATS-friendly output, this tool is ideal — most ATS prefer simple, well-structured PDFs over heavily-styled ones.
        </div>
      )}
    </div>
  );
}
