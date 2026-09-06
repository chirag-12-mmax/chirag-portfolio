'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { personal, navItems } from '@/lib/data';

export default function FloatingNav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      {/* Floating bar */}
      <nav className="floating-nav" style={{ pointerEvents: 'none', opacity: open ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <div className="nav-left-group" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'all' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}
            aria-label="Chirag Shyani — Back to top"
          >
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              color: 'var(--white, #FAFAFA)',
              lineHeight: 1,
              textShadow: '0 0 15px rgba(227, 30, 36, 0.35)',
            }}>
              <span style={{ color: 'var(--red, #E31E24)' }}>C</span>S
            </span>
          </button>

          {/* Left-Aligned Nav Links matching reference */}
          <div className="nav-center-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {[
              { label: 'Home', href: '#hero', active: true },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "var(--font-head, 'Space Grotesk', sans-serif)",
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: link.active ? '#ffffff' : 'rgba(250, 250, 250, 0.6)',
                  paddingBottom: '3px',
                  borderBottom: link.active ? '2px solid var(--red, #E31E24)' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  if (!link.active) e.currentTarget.style.borderBottomColor = 'rgba(227, 30, 36, 0.4)';
                }}
                onMouseLeave={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.color = 'rgba(250, 250, 250, 0.6)';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'all' }}>
          <span
            className="nav-right-meta"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              color: 'rgba(250, 250, 250, 0.4)',
              textTransform: 'uppercase',
            }}
          >
            IDEAS &nbsp;/&nbsp; APPS &nbsp;/&nbsp; IMPACT
          </span>
          <a
            href={personal.resumeUrl}
            download
            className="nav-resume-btn"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            Resume ↓
          </a>
          <button
            onClick={() => setOpen(true)}
            data-cursor="MENU"
            style={{
              background: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.18em', color: 'var(--white)', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <span style={{ color: 'var(--red)' }}>☰</span> Menu
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            className="menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ zIndex: 999, overflowY: 'auto' }} // Ensure it's above everything and scrollable
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 10,
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.15em', color: 'var(--white)', textTransform: 'uppercase',
              }}
            >
              × Close
            </button>

            {/* Nav items */}
            <div className="container" style={{ width: '100%' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                    data-cursor="GO"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'baseline', gap: '1.5rem',
                      padding: '1.25rem 0',
                      borderBottom: '1px solid var(--border)',
                      textAlign: 'left',
                    }}
                    whileHover={{ x: 12 }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                      color: 'var(--red)', letterSpacing: '0.12em',
                    }}>
                      {item.num}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: 700, color: 'var(--white)',
                      textTransform: 'uppercase', letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}>
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Contact quick links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                  marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
                }}
              >
                {[
                  { label: 'LinkedIn', href: personal.linkedin },
                  { label: 'GitHub', href: personal.github },
                  { label: 'Email', href: `mailto:${personal.email}` },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                      color: 'var(--muted)', letterSpacing: '0.12em', textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                    data-cursor="OPEN"
                  >
                    ↗ {link.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-left-group {
          gap: 3.2rem;
        }
        .nav-right-group {
          gap: 2.2rem;
        }
        @media (max-width: 768px) {
          .nav-left-group {
            gap: 1rem;
          }
          .nav-right-group {
            gap: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
