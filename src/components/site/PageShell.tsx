import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { BOOK_CALL_URL, EMAIL, whatsappUrl } from '@/lib/site';

/* Shared styles for the static SEO pages (projects / services). */
export const TEXT = '#b4b4bb';
export const sectionLabel: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--red)',
  marginBottom: '1rem',
};
export const card: CSSProperties = {
  padding: '1.25rem 1.4rem',
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 6,
};
export const h2Style: CSSProperties = {
  fontFamily: 'var(--font-head)',
  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  color: 'var(--white)',
  margin: '0 0 1.25rem',
};

const navLink: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: TEXT,
  textDecoration: 'none',
};

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: TEXT, marginBottom: '1.75rem' }}>
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 && <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>}
          {it.href ? (
            <Link href={it.href} style={{ color: TEXT, textDecoration: 'none' }}>
              {it.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--white)' }}>{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function ProjectCTA({ topic }: { topic?: string }) {
  const msg = topic
    ? `Hi Chirag, I'd like to discuss a project (${topic}).`
    : "Hi Chirag, I'd like to discuss a project.";
  return (
    <section
      style={{
        ...card,
        marginTop: '4rem',
        padding: 'clamp(1.75rem, 4vw, 3rem)',
        borderColor: 'var(--border-red)',
        background: 'linear-gradient(135deg, rgba(227,30,36,0.08), rgba(255,255,255,0.02))',
      }}
    >
      <div style={sectionLabel}>Have a project in mind?</div>
      <h2 style={{ ...h2Style, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>Let&apos;s build it together.</h2>
      <p style={{ color: TEXT, lineHeight: 1.7, maxWidth: 620, margin: '0 0 1.75rem' }}>
        Tell me what you want to build. I&apos;ll reply within 24 hours with questions, a suggested approach and next steps — no
        obligation.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
        <a href={whatsappUrl(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-red">
          Chat on WhatsApp ↗
        </a>
        <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          Book a Call ↗
        </a>
        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(topic ? `Project enquiry: ${topic}` : 'Project enquiry')}`} className="btn btn-outline">
          Email Me
        </a>
      </div>
    </section>
  );
}

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--white)' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'rgba(5,5,5,0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1rem', flexWrap: 'wrap' }}
        >
          <Link href="/" style={{ fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--white)', textDecoration: 'none' }}>
            <span style={{ color: 'var(--red)' }}>CS</span> Chirag Shyani
          </Link>
          <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/projects" style={navLink}>Projects</Link>
            <Link href="/services" style={navLink}>Services</Link>
            <Link href="/#contact" style={navLink}>Contact</Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" style={{ ...navLink, color: 'var(--white)' }}>
              Start a Project ↗
            </a>
          </nav>
        </div>
      </header>
      <main className="container" style={{ padding: 'clamp(2rem, 5vw, 4rem) 1rem 4rem' }}>
        {children}
      </main>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 1rem' }}>
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT }}
        >
          <span>© {new Date().getFullYear()} Chirag Shyani · Tech Lead &amp; Senior Full-Stack Developer</span>
          <span>
            <Link href="/projects" style={{ color: TEXT }}>Projects</Link> ·{' '}
            <Link href="/services" style={{ color: TEXT }}>Services</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
