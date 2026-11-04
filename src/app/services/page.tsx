import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data';
import PageShell, { Breadcrumbs, ProjectCTA, TEXT, card, sectionLabel } from '@/components/site/PageShell';

export const metadata: Metadata = {
  title: 'Services — Web, Mobile, Desktop, AI, Shopify, CRM & Payroll Development',
  description:
    'Hire Chirag Shyani for website & web app development (Next.js, Vue.js, Node.js, Python), Android & iOS apps, desktop software, AI automation, AI image generation, Shopify apps, CRM & payroll systems, and tech lead mentoring.',
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
      <div style={sectionLabel}>What I Offer</div>
      <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', color: 'var(--white)', lineHeight: 1, margin: '0 0 1rem' }}>
        Services
      </h1>
      <p style={{ color: TEXT, lineHeight: 1.75, maxWidth: 760, margin: '0 0 2.5rem' }}>
        Web, mobile, desktop, AI and business software — planned, built, launched and supported by one accountable tech lead with 8+
        years of experience.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1rem' }}>
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} style={{ ...card, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.6rem' }} aria-hidden="true">{s.icon}</span>
            <h2 style={{ color: 'var(--white)', fontSize: '1.15rem', margin: 0 }}>{s.title}</h2>
            <p style={{ color: TEXT, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{s.description}</p>
            <span style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: 'auto' }}>Learn more →</span>
          </Link>
        ))}
      </div>
      <ProjectCTA />
    </PageShell>
  );
}
