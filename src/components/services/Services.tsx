'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { services } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div className="services-heading label" style={{ marginBottom: '1rem' }}>What I Offer</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="services-heading display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}>
            SERVICES
          </h2>
          <p className="services-heading" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', maxWidth: 320 }}>
            End-to-end mobile engineering — from architecture and development to deployment and leadership.
          </p>
        </div>

        {/* Services grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                cursor: 'default',
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
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--red), transparent)' }} />

              {/* Icon + Stat row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2rem' }}>{service.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
                  color: 'var(--red)', padding: '0.3rem 0.6rem',
                  border: '1px solid rgba(227,30,36,0.3)', borderRadius: 2,
                }}>
                  {service.stat}
                </div>
              </div>

              {/* Title */}
              <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', fontFamily: 'var(--font-head)', fontWeight: 700, lineHeight: 1.2 }}>
                {service.title}
              </h3>

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7, flex: 1 }}>
                {service.description}
              </p>

              {/* Features list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                {service.features.map((feature, fi) => (
                  <div key={fi} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--red)', fontSize: '0.4rem', flexShrink: 0 }}>◆</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '3rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a href="#contact" className="btn btn-red" data-cursor="CONTACT">
            Discuss Your Project →
          </a>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
            Response within {`< 24 hours`}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
