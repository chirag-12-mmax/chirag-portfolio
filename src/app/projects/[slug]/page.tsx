import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { services } from '@/lib/data';
import { SITE_URL } from '@/lib/site';
import PageShell, { Breadcrumbs, ProjectCTA, TEXT, card, h2Style, sectionLabel } from '@/components/site/PageShell';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

function getProject(slug: string) {
  return projects.find((p) => p.id === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.subtitle} | Case Study`;
  const description = project.shortDescription ?? project.description;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    keywords: [project.name, project.subtitle, project.businessDomain ?? '', ...project.stack].filter(Boolean),
    openGraph: { title, description, url: `/projects/${project.id}`, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.55rem' }}>
      {items.map((it) => (
        <li key={it} style={{ display: 'flex', gap: '0.6rem', color: '#e4e4e7', lineHeight: 1.6 }}>
          <span style={{ color: 'var(--red)', fontSize: '0.6rem', marginTop: '0.45rem' }}>◆</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const relatedServices = services.filter((s) => s.relatedProjects?.includes(project.id));
  const inDev = project.status === 'in-development';

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Platforms', value: project.platforms?.join(' · ') },
    { label: 'Domain', value: project.businessDomain },
    { label: 'Timeline', value: inDev ? 'Ongoing' : project.timeline },
    { label: 'Team', value: project.teamSize },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: `${project.name} — ${project.subtitle}`,
        description: project.description,
        url: `${SITE_URL}/projects/${project.id}`,
        image: project.coverImage ? `${SITE_URL}${project.coverImage}` : undefined,
        creator: { '@id': `${SITE_URL}/#person` },
        keywords: project.stack.join(', '),
        genre: project.businessDomain,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
          { '@type': 'ListItem', position: 3, name: project.name, item: `${SITE_URL}/projects/${project.id}` },
        ],
      },
    ],
  };

  const links = [
    project.liveUrl && { href: project.liveUrl, label: 'Visit Live Website ↗', primary: true },
    project.demoUrl && { href: project.demoUrl, label: 'View Demo ↗', primary: true },
    project.playStoreUrl && { href: project.playStoreUrl, label: 'Google Play ↗' },
    project.appStoreUrl && { href: project.appStoreUrl, label: 'App Store ↗' },
  ].filter(Boolean) as { href: string; label: string; primary?: boolean }[];

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: project.name }]} />

      <div style={sectionLabel}>
        Project {project.index} · {inDev ? 'Currently Building' : 'Case Study'}
      </div>
      <h1 className="display" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', color: 'var(--white)', lineHeight: 1, margin: '0 0 0.75rem' }}>
        {project.name}
      </h1>
      <p style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', color: '#e4e4e7', margin: '0 0 1.25rem' }}>{project.subtitle}</p>
      {inDev && (
        <span
          style={{
            display: 'inline-block',
            marginBottom: '1.25rem',
            padding: '0.3rem 0.8rem',
            borderRadius: 999,
            border: '1px solid rgba(249,115,22,0.45)',
            background: 'rgba(249,115,22,0.1)',
            color: '#fdba74',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          ● In active development
        </span>
      )}
      <p style={{ color: TEXT, lineHeight: 1.75, maxWidth: 820, margin: '0 0 2rem' }}>{project.description}</p>

      {links.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={l.primary ? 'btn btn-red' : 'btn btn-outline'}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      {project.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.coverImage}
          alt={`${project.name} — ${project.subtitle}`}
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', borderRadius: 8, border: '1px solid var(--border)', marginBottom: '2.5rem' }}
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '3rem' }}>
        {facts.map((f) => (
          <div key={f.label} style={card}>
            <div style={{ ...sectionLabel, color: TEXT, marginBottom: '0.35rem', fontSize: '0.62rem' }}>{f.label}</div>
            <div style={{ color: 'var(--white)', fontWeight: 600 }}>{f.value}</div>
          </div>
        ))}
      </div>

      {(project.problem || project.solution) && (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {project.problem && (
            <div style={card}>
              <h2 style={{ ...h2Style, fontSize: '1.2rem' }}>The Challenge</h2>
              <p style={{ color: TEXT, lineHeight: 1.7, margin: 0 }}>{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div style={card}>
              <h2 style={{ ...h2Style, fontSize: '1.2rem' }}>The Solution</h2>
              <p style={{ color: TEXT, lineHeight: 1.7, margin: 0 }}>{project.solution}</p>
            </div>
          )}
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Key Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.6rem' }}>
            {project.features.map((f) => (
              <div key={f} style={{ ...card, padding: '0.85rem 1rem', color: '#e4e4e7' }}>
                <span style={{ color: 'var(--red)', marginRight: '0.5rem', fontSize: '0.6rem' }}>◆</span>
                {f}
              </div>
            ))}
          </div>
        </section>
      )}

      {project.featureModules && project.featureModules.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Feature Modules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {project.featureModules.map((m) => (
              <div key={m.title} style={card}>
                <h3 style={{ color: 'var(--white)', fontSize: '1rem', margin: '0 0 0.85rem' }}>{m.title}</h3>
                <List items={m.items} />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.roadmap && project.roadmap.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>{inDev ? 'Goals & Roadmap' : 'Project Goals'}</h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
            {project.roadmap.map((g, i) => (
              <li key={g} style={{ display: 'flex', gap: '1rem', color: '#e4e4e7', lineHeight: 1.6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--red)', fontSize: '0.78rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{g}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.architecture && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Architecture</h2>
          <p style={{ ...card, color: TEXT, lineHeight: 1.75, margin: 0 }}>{project.architecture}</p>
        </section>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Engineering Challenges</h2>
          <List items={project.challenges} />
        </section>
      )}

      {((project.results && project.results.length > 0) || project.businessImpact) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Results & Impact</h2>
          {project.results && project.results.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              {project.results.map((r) => (
                <div key={r.metric} style={card}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--red)' }}>{r.value}</div>
                  <div style={{ color: TEXT, fontSize: '0.85rem' }}>{r.metric}</div>
                </div>
              ))}
            </div>
          )}
          {project.businessImpact && <p style={{ color: TEXT, lineHeight: 1.75, margin: 0 }}>{project.businessImpact}</p>}
        </section>
      )}

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={h2Style}>Technology Stack</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.stack.map((t) => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '0.4rem 0.8rem', border: '1px solid var(--border-red)', borderRadius: 4, color: '#e4e4e7' }}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={h2Style}>Related Services</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {relatedServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="btn btn-outline">
                {s.icon} {s.title} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <Link href={`/projects/${prev.id}`} style={{ color: TEXT, textDecoration: 'none' }}>← {prev.name}</Link>
        <Link href={`/projects/${next.id}`} style={{ color: TEXT, textDecoration: 'none' }}>{next.name} →</Link>
      </nav>

      <ProjectCTA topic={project.name} />
    </PageShell>
  );
}
