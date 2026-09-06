'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { highlights } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.highlights-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Cards stagger
      gsap.fromTo('.highlight-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="highlights" ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div className="highlights-heading label" style={{ marginBottom: '1rem' }}>Career Milestones</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="highlights-heading display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}>
            HIGHLIGHTS
          </h2>
          <p className="highlights-heading" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', maxWidth: 300 }}>
            Key achievements and milestones from 5+ years of engineering.
          </p>
        </div>

        {/* Highlights grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="highlight-card"
              ref={(el) => { statRefs.current[i] = el; }}
              style={{
                padding: '2rem',
                border: '1px solid var(--border)',
                borderRadius: 4,
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.25s, transform 0.25s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(227,30,36,0.4)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Large decorative stat */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1.5rem',
                fontFamily: 'var(--font-head)', fontSize: '3.5rem', lineHeight: 1,
                color: 'rgba(227,30,36,0.07)', fontWeight: 900,
                userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.02em',
              }}>
                {h.stat}
              </div>

              {/* Icon */}
              <div style={{ fontSize: '2rem' }}>{h.icon}</div>

              {/* Stat badge */}
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.6rem',
                color: 'var(--red)', fontWeight: 700, letterSpacing: '-0.01em',
                lineHeight: 1,
              }}>
                {h.stat}
              </div>

              {/* Title */}
              <h3 style={{
                color: 'var(--white)', fontSize: '1rem',
                fontFamily: 'var(--font-body)', fontWeight: 600, lineHeight: 1.3,
              }}>
                {h.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                color: 'var(--muted)', lineHeight: 1.7,
              }}>
                {h.description}
              </p>

              {/* Bottom line accent */}
              <div style={{ height: 1, background: 'linear-gradient(90deg, var(--red), transparent)', marginTop: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
