'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';

interface ActiveProjectProps {
  project: Project;
  onOpenDetails: () => void;
  showCoverImage?: boolean;
}

export default function ActiveProject({
  project,
  onOpenDetails,
}: ActiveProjectProps) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 180,
        width: 'clamp(320px, 90vw, 560px)',
        margin: '0 auto',
        pointerEvents: 'auto',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            // Ultra-transparent crystalline glass so cards rotating behind are clearly visible through the panel
            background: 'linear-gradient(135deg, rgba(14, 14, 24, 0.16) 0%, rgba(8, 8, 14, 0.12) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.09)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Top Indicator & Business Domain */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.64rem',
              letterSpacing: '0.12em',
              color: 'var(--red)',
              marginBottom: '0.15rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              textShadow: '0 1px 6px rgba(0,0,0,0.9)',
            }}
          >
            <span style={{ fontSize: '0.5rem' }}>●</span>
            <span>PROJECT {project.index}</span>
            {project.businessDomain && (
              <>
                <span style={{ opacity: 0.4 }}>//</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                  {project.businessDomain}
                </span>
              </>
            )}
          </div>

          {/* Project Name */}
          <h3
            className="display"
            style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '0.15rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.95)',
            }}
          >
            {project.name}
          </h3>

          {/* Subtitle, Role & Platforms */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.35rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              }}
            >
              {project.subtitle}
            </span>
            {project.role && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  color: 'var(--red)',
                  background: 'rgba(227, 30, 36, 0.16)',
                  border: '1px solid rgba(227, 30, 36, 0.4)',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                }}
              >
                {project.role}
              </span>
            )}
            {project.platforms && project.platforms.length > 0 && (
              <span style={{ display: 'inline-flex', gap: '0.2rem' }}>
                {project.platforms.map((plat) => (
                  <span
                    key={plat}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      padding: '1px 5px',
                      borderRadius: '3px',
                    }}
                  >
                    {plat}
                  </span>
                ))}
              </span>
            )}
          </div>

          {/* Short Punchy Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.82)',
              lineHeight: 1.45,
              marginBottom: '0.45rem',
              maxWidth: '520px',
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}
          >
            {project.shortDescription || project.description}
          </p>

          {/* Tech Stack Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.3rem',
              marginBottom: '0.65rem',
            }}
          >
            {project.stack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.04em',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 6 && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  padding: '2px 5px',
                  color: 'var(--muted)',
                }}
              >
                +{project.stack.length - 6}
              </span>
            )}
          </div>

          {/* Action Buttons with Pretty Icons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            {/* Primary View More Details button */}
            <button
              type="button"
              onClick={onOpenDetails}
              className="btn"
              style={{
                background: 'var(--red)',
                color: 'var(--white)',
                border: 'none',
                padding: '0.65rem 1.45rem',
                cursor: 'pointer',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(227, 30, 36, 0.45)',
                transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(227, 30, 36, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(227, 30, 36, 0.45)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>VIEW MORE DETAILS</span>
              <span>→</span>
            </button>

            {/* Google Play Store with Official Styled SVG Logo */}
            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.05rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'rgba(255, 255, 255, 0.92)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(4px)',
                  transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00e676';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(0, 230, 118, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a1.99 1.99 0 0 1-.22-.924V2.738c0-.34.08-.654.22-.924zM15.207 13.414l2.457 2.457-11.45 6.467 8.993-8.924zm0-2.828L6.214 1.662l11.45 6.467-2.457 2.457zm1.414 1.414l3.197 1.805c.813.459.813 1.205 0 1.664l-3.197 1.805-2.121-2.121 2.121-2.121z" />
                </svg>
                <span>Play Store</span>
                <span style={{ opacity: 0.6 }}>↗</span>
              </a>
            )}

            {/* Apple App Store with Official Apple Logo */}
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.05rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'rgba(255, 255, 255, 0.92)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(4px)',
                  transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#29b6f6';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(41, 182, 246, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.03.62-2.68 1.39-.58.67-1.08 1.76-.94 2.81 1.03.08 2.06-.52 2.68-1.27z" />
                </svg>
                <span>App Store</span>
                <span style={{ opacity: 0.6 }}>↗</span>
              </a>
            )}

            {/* Live Site / Web Application Link */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.05rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  color: 'rgba(255, 255, 255, 0.92)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(4px)',
                  transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--red)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(227, 30, 36, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>Live Site</span>
                <span style={{ opacity: 0.6 }}>↗</span>
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
