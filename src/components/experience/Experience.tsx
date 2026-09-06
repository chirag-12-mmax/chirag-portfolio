'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize horizontal GSAP scroll if screen is desktop/tablet width (>= 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.exp-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Horizontal scroll
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalWidth = track.scrollWidth - track.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section" style={{ padding: 0, background: 'var(--bg)' }}>
      <div style={{ padding: '5rem 0 2rem' }}>
        <div className="container">
          <div className="exp-heading label" style={{ marginBottom: '1rem' }}>Career</div>
          <h2 className="exp-heading display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}>
            EXPERIENCE
          </h2>
        </div>
      </div>

      {/* Horizontal scrollable wrapper (Desktop) */}
      <div ref={wrapperRef} className="exp-desktop-wrapper" style={{ overflow: 'hidden', paddingLeft: '2rem', paddingBottom: '5rem' }}>
        <div
          ref={trackRef}
          className="h-timeline-wrapper"
          style={{ paddingRight: '20vw', paddingTop: '2rem' }}
        >
          {/* Leading line */}
          <div style={{ width: 80, height: 1, background: 'var(--border)', flexShrink: 0, alignSelf: 'center' }} />

          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              className="h-timeline-item"
              style={{ borderLeftColor: exp.current ? 'var(--red)' : 'var(--border)' }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -5, top: '50%', transform: 'translateY(-50%)',
                width: 10, height: 10, borderRadius: '50%',
                background: exp.current ? 'var(--red)' : 'var(--muted-2)',
                boxShadow: exp.current ? '0 0 20px var(--red-glow)' : 'none',
              }} />

              {/* Year */}
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                letterSpacing: '0.15em', color: 'var(--red)', marginBottom: '1rem',
              }}>
                {exp.year} {exp.current && <span>— PRESENT</span>}
              </div>

              {/* Company + Role */}
              <h3 className="display" style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                color: 'var(--white)', marginBottom: '0.15em',
                lineHeight: 1.1, whiteSpace: 'pre-line',
              }}>
                {exp.company}
              </h3>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: exp.current ? 'var(--red)' : 'var(--muted)',
                marginBottom: '0.25rem', fontWeight: 500,
              }}>
                {exp.role.replace('\n', ' ')}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '1.5rem',
              }}>
                {exp.duration} · {exp.domain}
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ color: 'var(--red)', flexShrink: 0, marginTop: '0.25rem', fontSize: '0.5rem' }}>◆</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Metrics */}
              {exp.metrics && exp.metrics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  {exp.metrics.map((m, mi) => (
                    <div key={mi} style={{
                      padding: '0.3rem 0.65rem',
                      border: '1px solid rgba(227,30,36,0.25)',
                      borderRadius: 2,
                      background: 'rgba(227,30,36,0.04)',
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--red)', fontWeight: 600 }}>{m.value}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--muted)', marginLeft: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {exp.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.06em', padding: '2px 7px',
                    border: '1px solid var(--border)', borderRadius: 2,
                    color: 'var(--muted)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Vertical Timeline: Clean, normal view with full details ── */}
      <div className="exp-mobile-wrapper container">
        <div style={{ position: 'relative', paddingLeft: '1.75rem', paddingBottom: '3.5rem' }}>
          {/* Continuous vertical red accent line */}
          <div
            style={{
              position: 'absolute',
              left: '5px',
              top: '12px',
              bottom: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--red) 0%, rgba(227,30,36,0.3) 70%, var(--border) 100%)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp) => (
              <div
                key={exp.company}
                style={{
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: exp.current ? '1px solid rgba(227, 30, 36, 0.35)' : '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                }}
              >
                {/* Timeline node dot aligned with card top */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-1.75rem',
                    top: '1.4rem',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: exp.current ? 'var(--red)' : '#1a1a1f',
                    border: `2px solid ${exp.current ? 'var(--red)' : 'var(--muted-2)'}`,
                    boxShadow: exp.current ? '0 0 12px var(--red-glow)' : 'none',
                    zIndex: 2,
                  }}
                />

                {/* Year Badge */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    color: 'var(--red)',
                    marginBottom: '0.6rem',
                    fontWeight: 600,
                  }}
                >
                  {exp.year} {exp.current && <span>— PRESENT</span>}
                </div>

                {/* Company & Role */}
                <h3
                  className="display"
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--white)',
                    marginBottom: '0.2rem',
                    lineHeight: 1.15,
                  }}
                >
                  {exp.company}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: exp.current ? 'var(--red)' : '#bbb',
                    marginBottom: '0.2rem',
                    fontWeight: 500,
                  }}
                >
                  {exp.role.replace('\n', ' ')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.06em',
                    marginBottom: '1rem',
                  }}
                >
                  {exp.duration} · {exp.domain}
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.1rem' }}>
                  {exp.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'flex-start',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'rgba(250, 250, 250, 0.72)',
                        lineHeight: 1.55,
                        marginBottom: '0.45rem',
                      }}
                    >
                      <span style={{ color: 'var(--red)', flexShrink: 0, marginTop: '0.28rem', fontSize: '0.45rem' }}>◆</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.75rem' }}>
                    {exp.metrics.map((m, mi) => (
                      <div
                        key={mi}
                        style={{
                          padding: '0.25rem 0.55rem',
                          border: '1px solid rgba(227,30,36,0.25)',
                          borderRadius: 3,
                          background: 'rgba(227,30,36,0.04)',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--red)', fontWeight: 600 }}>{m.value}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--muted)', marginLeft: '0.3rem', textTransform: 'uppercase' }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {exp.stack.map(s => (
                    <span
                      key={s}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        padding: '2px 6px',
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        color: 'var(--muted)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .exp-mobile-wrapper {
          display: none;
        }
        .exp-desktop-wrapper {
          display: block;
        }
        @media (max-width: 768px) {
          .exp-desktop-wrapper {
            display: none !important;
          }
          .exp-mobile-wrapper {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
