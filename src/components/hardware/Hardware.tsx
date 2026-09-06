'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { hardwareIntegration } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, string> = {
  Security: '#a0a0ff',
  Device: '#6bcfcf',
  Camera: '#f0c060',
  Platform: '#86efac',
  IoT: '#c084fc',
  Native: '#fb923c',
};

export default function Hardware() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hardware-heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.hardware-chip', { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Group by category
  const grouped = hardwareIntegration.reduce<Record<string, typeof hardwareIntegration>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section id="hardware" ref={sectionRef} className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        {/* Header */}
        <div className="hardware-heading label" style={{ marginBottom: '1rem' }}>Device & Native</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="hardware-heading display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}>
            HARDWARE & DEVICE
          </h2>
          <p className="hardware-heading" style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', maxWidth: 320 }}>
            Native device integrations, hardware SDKs, and platform-channel expertise for real-world production apps.
          </p>
        </div>

        {/* Category groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(grouped).map(([category, items]) => {
            const color = categoryColors[category] ?? '#888';
            return (
              <div key={category}>
                {/* Category label */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em',
                  color: color, textTransform: 'uppercase', marginBottom: '0.75rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ width: 20, height: 1, background: color, display: 'inline-block' }} />
                  {category}
                </div>

                {/* Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {items.map((item) => (
                    <motion.div
                      key={item.label}
                      className="hardware-chip"
                      whileHover={{ borderColor: color, scale: 1.02 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.55rem 1rem',
                        border: '1px solid var(--border)',
                        borderRadius: 3,
                        background: 'var(--bg-card)',
                        cursor: 'default',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div style={{
          marginTop: '3rem', padding: '1.25rem', border: '1px solid var(--border)',
          borderLeft: '3px solid var(--red)', paddingLeft: '1.5rem',
          background: 'rgba(227,30,36,0.03)',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            These integrations are battle-tested across production applications — from biometric authentication in financial apps
            and Bluetooth printer integration in POS systems, to QR gate verification for enterprise communities and hardware SDK
            bridges via Flutter platform channels.
          </p>
        </div>
      </div>
    </section>
  );
}
