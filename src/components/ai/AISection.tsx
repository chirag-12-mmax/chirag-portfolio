'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { aiCapabilities, aiTools } from '@/lib/data';

export default function AISection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="ai" ref={sectionRef} className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="label" style={{ marginBottom: '1rem' }}>AI Engineering</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.1em', flexWrap: 'wrap' }}>
            <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)' }}>
              AI
            </h2>
            <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--red)' }}>
              ×
            </h2>
            <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)' }}>
              PRODUCT
            </h2>
          </div>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.15)',
              marginBottom: '2.5rem',
            }}
          >
            ENGINEERING
          </h2>
          <div className="red-line" />
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'var(--muted)', lineHeight: 1.8, maxWidth: 600, marginBottom: '3rem',
          }}>
            I use AI to accelerate product engineering and build AI-powered product experiences —
            not just as a developer tool, but as a core part of the product itself.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', marginBottom: '4rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {aiCapabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ background: 'rgba(227,30,36,0.06)' } as never}
              data-cursor="EXPLORE"
              style={{
                padding: '1.75rem 1.5rem',
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{cap.icon}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.1em', color: 'var(--white)', textTransform: 'uppercase',
              }}>
                {cap.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="label-muted" style={{ marginBottom: '1.25rem' }}>Tools & Platforms</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {aiTools.map((tool, i) => (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  padding: '0.85rem 1.25rem',
                  border: '1px solid var(--border)', borderRadius: 4,
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-head)', fontSize: '1rem',
                  fontWeight: 700, color: 'var(--white)', marginBottom: '0.2rem',
                }}>
                  {tool.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  letterSpacing: '0.1em', color: 'var(--red)',
                }}>
                  {tool.category}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
