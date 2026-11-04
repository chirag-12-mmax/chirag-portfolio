import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';
import PageShell, { Breadcrumbs, ProjectCTA, TEXT, card, sectionLabel } from '@/components/site/PageShell';

export const metadata: Metadata = {
  title: 'Projects & Case Studies — Web, Mobile, Desktop & Enterprise Apps',
  description:
    'Case studies by Chirag Shyani: Shoppozone B2B wholesale commerce, Magicrete BuildMart (100K+ downloads), Pulpit Mobility, ZingHR, MyRCloud and more — web, Android & iOS, desktop and enterprise software.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsIndex() {
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
      <div style={sectionLabel}>Selected Work</div>
      <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', color: 'var(--white)', lineHeight: 1, margin: '0 0 1rem' }}>
        Projects &amp; Case Studies
      </h1>
      <p style={{ color: TEXT, lineHeight: 1.75, maxWidth: 760, margin: '0 0 2.5rem' }}>
        {projects.length} products I have built or led — from B2B commerce and construction marketplaces to HR, finance, maritime and
        transportation platforms across web, Android, iOS and desktop.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '1rem' }}>
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} style={{ ...card, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {p.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.coverImage} alt={p.name} width={800} height={500} loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: 4 }} />
            )}
            <div style={{ ...sectionLabel, marginBottom: 0, fontSize: '0.62rem' }}>
              {p.index} · {p.status === 'in-development' ? 'Currently Building' : p.businessDomain}
            </div>
            <h2 style={{ color: 'var(--white)', fontSize: '1.2rem', margin: 0 }}>{p.name}</h2>
            <p style={{ color: TEXT, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{p.subtitle}</p>
            <span style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: 'auto' }}>Read case study →</span>
          </Link>
        ))}
      </div>
      <ProjectCTA />
    </PageShell>
  );
}
