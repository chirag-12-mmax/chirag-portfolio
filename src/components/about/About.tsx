'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personal, stats } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.fromTo('.about-reveal', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      // Count-up for each stat
      stats.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        ScrollTrigger.create({
          trigger: sectionRef.current, start: 'top 70%', once: true,
          onEnter: () => {
            const obj = { v: 0 };
            gsap.to(obj, {
              v: stat.value,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        {/* Label */}
        <div className="about-reveal label" style={{ marginBottom: '1rem' }}>About</div>

        {/* Hero statement */}
        <div className="about-reveal" style={{ marginBottom: '3rem', maxWidth: 800 }}>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: 'var(--white)',
              marginBottom: '0.1em',
            }}
          >
            I BUILD DIGITAL
          </h2>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
            }}
          >
            PRODUCTS THAT MOVE.
          </h2>
        </div>

        {/* Two-col */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: story and lines */}
          <div className="about-reveal">
            <div style={{ marginBottom: '2rem' }}>
              {personal.aboutStory?.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: '1rem', 
                  lineHeight: 1.8, 
                  color: 'var(--muted)', 
                  marginBottom: '1.2rem' 
                }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${personal.email}`} className="btn btn-red" data-cursor="EMAIL">
                Let&apos;s Talk
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer"
                className="btn btn-outline" data-cursor="OPEN">
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="about-reveal">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statsRef.current[i] = el; }}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    background: 'var(--bg-card)',
                  }}
                >
                  <div className="stat-num">
                    <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
                    <span style={{ color: 'var(--red)' }}>{stat.suffix}</span>
                  </div>
                  <div className="label-muted" style={{ marginTop: '0.35rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Core Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="label-muted" style={{ marginBottom: '0.5rem' }}>Core Pillars</div>
              {personal.aboutPillars?.map((pillar, i) => (
                <div key={i} style={{ 
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 4,
                  background: 'var(--bg-card)', transition: 'border-color 0.2s'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{pillar.icon}</div>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{pillar.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Identity tags row */}
        <div className="about-reveal" style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            'Android', 'iOS', 'Flutter Web', 'Desktop', 'SaaS',
            'AI APIs', 'Cloud', 'Real-Time', 'Clean Architecture',
            'Biometrics', 'Payment Gateways', 'Hardware SDKs', 'CI/CD', 'Team Lead',
          ].map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', padding: '0.4rem 0.85rem',
                border: '1px solid var(--border)', borderRadius: 2,
                color: 'var(--muted)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--red)';
                (e.currentTarget as HTMLElement).style.color = 'var(--white)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Specializations list */}
        <div className="about-reveal" style={{ marginTop: '2.5rem' }}>
          <div className="label-muted" style={{ marginBottom: '0.75rem' }}>Specializations</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {personal.specializations?.map((spec, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.06em',
                  padding: '0.3rem 0.7rem',
                  background: 'rgba(227,30,36,0.04)',
                  border: '1px solid rgba(227,30,36,0.2)',
                  borderRadius: 2,
                  color: 'var(--muted)',
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
