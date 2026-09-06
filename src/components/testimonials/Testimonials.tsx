'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        {/* Header */}
        <div className="testimonials-heading label" style={{ marginBottom: '1rem' }}>Client Feedback</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="testimonials-heading display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}>
            TESTIMONIALS
          </h2>
          <p className="testimonials-heading" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', maxWidth: 280 }}>
            What clients and colleagues say about working with me.
          </p>
        </div>

        {/* Testimonials grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: '2rem',
                border: '1px solid var(--border)',
                borderRadius: 4,
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(227,30,36,0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {/* Large quote mark */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1.5rem',
                fontFamily: 'serif', fontSize: '5rem', lineHeight: 1,
                color: 'rgba(227,30,36,0.08)', fontWeight: 700, userSelect: 'none',
                pointerEvents: 'none',
              }}>
                "
              </div>

              {/* Star rating */}
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                {Array.from({ length: Math.round(t.rating) }).map((_, si) => (
                  <span key={si} style={{ color: '#F59E0B', fontSize: '0.85rem' }}>★</span>
                ))}
              </div>

              {/* Content */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--muted)', lineHeight: 1.75, flex: 1,
                fontStyle: 'italic',
              }}>
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--border)' }} />

              {/* Person */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {/* Avatar */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `${t.accentColor}22`,
                  border: `1px solid ${t.accentColor}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: t.accentColor, fontWeight: 700, flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--white)', fontWeight: 600 }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
