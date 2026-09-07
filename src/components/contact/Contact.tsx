'use client';
import { motion } from 'framer-motion';
import { personal } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)', minHeight: '85vh', display: 'flex', alignItems: 'center', paddingBottom: '8.5rem' }}>
      <div className="container" style={{ width: '100%' }}>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="label" style={{ marginBottom: '2rem' }}>Let&apos;s Connect</div>

          <h2 className="display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: 'var(--white)', lineHeight: 0.9, marginBottom: '0.05em' }}>
            LET&apos;S BUILD
          </h2>
          <h2 className="display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.18)', lineHeight: 0.9, marginBottom: '0.05em' }}>
            SOMETHING
          </h2>
          <h2 className="display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: 'var(--red)', lineHeight: 0.9, marginBottom: '3rem' }}>
            GREAT.
          </h2>

          {/* Available for */}
          <div style={{ marginBottom: '3rem' }}>
            <div className="label-muted" style={{ marginBottom: '1rem' }}>Available for</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {personal.availability.map(a => (
                <span key={a} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', padding: '0.5rem 1rem',
                  border: '1px solid var(--border-red)', borderRadius: 2,
                  color: 'var(--white)',
                }}>{a}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center', marginBottom: '3rem' }}>
            <a
              href={`mailto:${personal.email}`}
              className="btn btn-red"
              data-cursor="EMAIL"
              style={{ fontSize: '0.8rem' }}
            >
              Let&apos;s Talk →
            </a>
            <a
              href={personal.resumePdfUrl || '/resume.pdf'}
              download="Chirag_Shyani_Resume.pdf"
              className="btn btn-outline"
              data-cursor="DOWNLOAD"
            >
              Download Resume (PDF) ↓
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              data-cursor="OPEN"
            >
              1-Page Resume ↗
            </a>
            <a
              href={personal.cvUrl || '/cv.html'}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              data-cursor="OPEN"
            >
              Detailed CV ↗
            </a>
          </div>

          {/* Links row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            {[
              { label: 'LinkedIn', href: personal.linkedin },
              { label: 'GitHub', href: personal.github },
              { label: 'Email', href: `mailto:${personal.email}` },
              { label: 'Portfolio (Legacy)', href: personal.portfolio },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor="OPEN"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--white)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
              >
                ↗ {link.label}
              </a>
            ))}
          </div>

          {/* Location */}
          <div style={{
            marginTop: '2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.12em', color: 'var(--muted-2)', textTransform: 'uppercase',
          }}>
            📍 {personal.location} · Open to remote &amp; relocation
          </div>
        </motion.div>
      </div>
    </section>
  );
}
