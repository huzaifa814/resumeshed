import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { tools, getTool } from '@/config/tools';
import { siteConfig } from '@/config/site';
import { ResumeBuilder } from '@/components/tools/ResumeBuilder';
import { CoverLetterBuilder } from '@/components/tools/CoverLetterBuilder';
import { ComingSoon } from '@/components/tools/ComingSoon';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `${siteConfig.url}/tools/${slug}` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.url}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.title, item: `${siteConfig.url}/tools/${slug}` },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="text-sm text-gray-500 mb-4 print:hidden">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link> ·{' '}
          <Link href="/tools" className="hover:text-gray-900 dark:hover:text-white">Tools</Link> ·{' '}
          <span className="text-gray-900 dark:text-white">{tool.title}</span>
        </nav>
        <header className="mb-8 print:hidden">
          <div className="text-4xl mb-3">{tool.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{tool.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{tool.description}</p>
        </header>

        {slug === 'resume-builder' && <ResumeBuilder />}
        {slug === 'cover-letter-builder' && <CoverLetterBuilder />}
        {!tool.available && <ComingSoon toolTitle={tool.title} />}
      </main>
      <Footer />
    </>
  );
}
