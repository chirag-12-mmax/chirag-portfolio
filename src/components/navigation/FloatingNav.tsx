'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { personal, navItems } from '@/lib/data';

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      {/* Floating bar */}
      <nav
        className="floating-nav"
        style={{
          pointerEvents: 'none',
          opacity: open ? 0 : 1,
          visibility: open ? 'hidden' : 'visible',
          transition: 'opacity 0.3s ease, visibility 0.3s',
        }}
      >
        <div
          className="nav-left-group"
          style={{ display: 'flex', alignItems: 'center', pointerEvents: open ? 'none' : 'all' }}
        >
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

        <div
          className="nav-right-group"
          style={{ display: 'flex', alignItems: 'center', pointerEvents: open ? 'none' : 'all' }}
        >
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
          <div
            className="nav-resume-container"
            style={{ position: 'relative' }}
            onMouseEnter={() => setResumeMenuOpen(true)}
            onMouseLeave={() => setResumeMenuOpen(false)}
          >
            <button
              onClick={() => setResumeMenuOpen(prev => !prev)}
              className="nav-resume-btn"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                transition: 'color 0.2s', padding: '0.35rem 0.5rem',
                borderRadius: '4px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              data-cursor="RESUME"
              aria-expanded={resumeMenuOpen}
              aria-haspopup="true"
            >
              Resume <span style={{ fontSize: '0.5rem', opacity: 0.7, transform: resumeMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
            </button>

            <AnimatePresence>
              {resumeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.35rem',
                    background: '#0d0d12',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
                    borderRadius: '8px',
                    padding: '0.35rem',
                    minWidth: '210px',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <a
                    href="/resume.html"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setResumeMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.5rem 0.7rem', borderRadius: '6px',
                      textDecoration: 'none', color: '#e0e0e0',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#e0e0e0';
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>📄</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em' }}>Short Resume</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)' }}>1-Page Overview</div>
                    </div>
                  </a>

                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setResumeMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.5rem 0.7rem', borderRadius: '6px',
                      textDecoration: 'none', color: '#e0e0e0',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#e0e0e0';
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>📋</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em' }}>Detailed CV</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)' }}>Comprehensive Profile</div>
                    </div>
                  </a>

                  <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '0.2rem 0' }} />

                  <a
                    href="/resume.pdf"
                    download="Chirag_Shyani_Resume.pdf"
                    onClick={() => setResumeMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.65rem',
                      padding: '0.5rem 0.7rem', borderRadius: '6px',
                      textDecoration: 'none', color: '#FF7B7B',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(227, 30, 36, 0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontSize: '1rem' }}>⬇</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em' }}>Download PDF</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'rgba(255, 123, 123, 0.75)' }}>Direct File (.pdf)</div>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              overflowY: 'auto',
              background: '#050507',
              pointerEvents: 'all',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              data-cursor="CLOSE"
              aria-label="Close navigation menu"
              style={{
                position: 'fixed',
                top: '1.5rem',
                right: '2rem',
                zIndex: 100000,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: '#ffffff',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(227, 30, 36, 0.25)';
                e.currentTarget.style.borderColor = '#E31E24';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={{ color: 'var(--red, #E31E24)', fontWeight: 'bold', fontSize: '1rem', lineHeight: 1 }}>✕</span>
              <span>CLOSE</span>
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

              {/* Resume & CV quick links for mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.85rem',
                  }}
                >
                  Resume &amp; CV Options
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxWidth: '360px' }}>
                  <a
                    href="/resume.html"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.65rem 1rem', background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--white)', textDecoration: 'none',
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    }}
                  >
                    <span>📄</span>
                    <span>Short Resume (1 Page) ↗</span>
                  </a>
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.65rem 1rem', background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--white)', textDecoration: 'none',
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    }}
                  >
                    <span>📋</span>
                    <span>Detailed CV (4 Pages) ↗</span>
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Chirag_Shyani_Resume.pdf"
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.65rem 1rem', background: 'rgba(227, 30, 36, 0.12)',
                      borderRadius: '6px', border: '1px solid rgba(227, 30, 36, 0.3)',
                      color: '#FF6B6B', textDecoration: 'none',
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600,
                    }}
                  >
                    <span>⬇</span>
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>
              </motion.div>

              {/* Contact quick links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                style={{
                  marginTop: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
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
