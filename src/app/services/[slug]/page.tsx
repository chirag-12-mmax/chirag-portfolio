import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { engagementModels, processSteps, services } from '@/lib/data';
import { SITE_URL } from '@/lib/site';
import PageShell, { Breadcrumbs, ProjectCTA, TEXT, card, h2Style, sectionLabel } from '@/components/site/PageShell';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

function faqsFor(title: string) {
  const t = title.toLowerCase();
  return [
    {
      q: `How much does ${t} cost?`,
      a: 'It depends on scope. After a free discovery call I send a written scope with milestones and a fixed quote, so you know the full cost before any work starts. Ongoing work can also be done on a monthly retainer.',
    },
    {
      q: 'How long will it take?',
      a: 'The timeline is agreed in the quote and split into milestones. Work runs in short sprints, and you see a working demo build every week, so progress is never a surprise.',
    },
    {
      q: 'Will you support the product after launch?',
      a: 'Yes. I handle deployment and go-live checks, and stay on for bug fixes, updates and new features — either per task or on a monthly support plan.',
    },
    {
      q: 'Can you work with my existing team or codebase?',
      a: 'Yes. As a tech lead I regularly join existing projects — reviewing code, fixing architecture problems, mentoring developers and taking features to production.',
    },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${s.seoTitle} — Hire Chirag Shyani`;
  return {
    title,
    description: s.description,
    keywords: [s.title, s.seoTitle, ...s.features, 'hire developer India', 'freelance developer'],
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title, description: s.description, url: `/services/${s.slug}` },
    twitter: { card: 'summary_large_image', title, description: s.description },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = (service.relatedProjects ?? [])
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const others = services.filter((s) => s.slug !== service.slug);
  const faqs = faqsFor(service.title);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.seoTitle,
        description: service.description,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { '@id': `${SITE_URL}/#person` },
        areaServed: 'Worldwide',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]} />

      <div style={sectionLabel}>{service.stat}</div>
      <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.4rem)', color: 'var(--white)', lineHeight: 1.02, margin: '0 0 1rem' }}>
        <span aria-hidden="true">{service.icon} </span>
        {service.title}
      </h1>
      <p style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', color: '#e4e4e7', lineHeight: 1.65, maxWidth: 820, margin: '0 0 2.5rem' }}>
        {service.description}
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={h2Style}>What You Get</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {service.features.map((f) => (
            <div key={f} style={{ ...card, color: '#e4e4e7' }}>
              <span style={{ color: 'var(--red)', marginRight: '0.5rem', fontSize: '0.6rem' }}>◆</span>
              {f}
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Related Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '0.75rem' }}>
            {related.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} style={{ ...card, textDecoration: 'none' }}>
                <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>{p.name}</h3>
                <p style={{ color: TEXT, fontSize: '0.88rem', lineHeight: 1.55, margin: '0 0 0.6rem' }}>{p.subtitle}</p>
                <span style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>Read case study →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={h2Style}>How We&apos;ll Work Together</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          {processSteps.map((s) => (
            <div key={s.step} style={card}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--red)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{s.step}</div>
              <h3 style={{ color: 'var(--white)', fontSize: '1rem', margin: '0 0 0.5rem' }}>{s.title}</h3>
              <p style={{ color: TEXT, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={h2Style}>Ways to Hire Me</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {engagementModels.map((m) => (
            <div key={m.title} style={card}>
              <h3 style={{ color: 'var(--white)', fontSize: '1.05rem', margin: '0 0 0.25rem' }}>{m.title}</h3>
              <div style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', marginBottom: '0.6rem' }}>{m.bestFor}</div>
              <p style={{ color: TEXT, fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={h2Style}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {faqs.map((f) => (
            <details key={f.q} style={card}>
              <summary style={{ color: 'var(--white)', fontWeight: 600, cursor: 'pointer' }}>{f.q}</summary>
              <p style={{ color: TEXT, lineHeight: 1.7, margin: '0.75rem 0 0' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 style={h2Style}>Other Services</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {others.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="btn btn-outline">
              {s.icon} {s.title}
            </Link>
          ))}
        </div>
      </section>

      <ProjectCTA topic={service.title.toLowerCase()} />
    </PageShell>
  );
}
