'use client';
import { motion } from 'framer-motion';
import { engagementModels, processSteps } from '@/lib/data';
import { BOOK_CALL_URL } from '@/lib/site';

const BODY = '#a1a1aa';

export default function Process() {
  return (
    <section id="process" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="label" style={{ marginBottom: '1rem' }}>How I Work</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}>
            FROM IDEA TO LAUNCH
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: BODY, maxWidth: 340 }}>
            A clear, simple process — you always know what is being built, what it costs and when it ships.
          </p>
        </div>

        {/* Steps */}
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1rem',
          }}
        >
          {processSteps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border)',
                borderTop: '2px solid var(--red)',
                borderRadius: 4,
                background: 'var(--bg-card)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', color: 'var(--red)', marginBottom: '0.75rem' }}>{s.step}</div>
              <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>{s.title}</h3>
              <p style={{ color: BODY, fontSize: '0.85rem', lineHeight: 1.65 }}>{s.description}</p>
            </motion.li>
          ))}
        </ol>

        {/* Engagement models */}
        <div className="label-muted" style={{ margin: '4rem 0 1.25rem' }}>Ways to hire me</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
          {engagementModels.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 4, background: 'var(--bg-card)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: '1.15rem', marginBottom: '0.3rem' }}>{m.title}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em', color: 'var(--red)', marginBottom: '0.85rem' }}>
                {m.bestFor}
              </div>
              <p style={{ color: BODY, fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem' }}>{m.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.4rem' }}>
                {m.points.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#d4d4d8' }}>
                    <span style={{ color: 'var(--red)' }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="btn btn-red" data-cursor="CALL">
            Book a Free Discovery Call ↗
          </a>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: BODY, letterSpacing: '0.08em' }}>
            No obligation · Reply within 24 hours
          </span>
        </div>
      </div>
    </section>
  );
}
