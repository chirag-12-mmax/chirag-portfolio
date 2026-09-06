'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';
import { getLenis } from '@/lib/lenis';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: ProjectDetailsModalProps) {
  const [imageError, setImageError] = useState(false);
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  // Body and document scroll lock with Lenis pause and layout-shift prevention
  useEffect(() => {
    if (isOpen) {
      // Strictly pause smooth-scroll library (Lenis) so it doesn't intercept wheel events
      getLenis()?.stop();

      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      // Block touchmove on outer document to strictly prevent background page movement
      const preventTouchMove = (e: TouchEvent) => {
        if ((e.target as HTMLElement)?.closest('.modal-scrollable-body')) return;
        e.preventDefault();
      };
      document.addEventListener('touchmove', preventTouchMove, { passive: false });

      // Focus the scroll body so keyboard page up / page down / arrows scroll immediately
      setTimeout(() => {
        scrollBodyRef.current?.focus();
      }, 50);

      return () => {
        // Resume Lenis smooth scroll upon modal close
        getLenis()?.start();
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.removeEventListener('touchmove', preventTouchMove);
      };
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape to close, Arrow keys to switch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!project || !isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.75rem, 2.5vw, 2rem)',
          overflow: 'hidden',
        }}
      >
        {/* Dark blurred backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            cursor: 'pointer',
          }}
        />

        {/* Modal Case Study Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            zIndex: 10,
            width: 'min(94vw, 1140px)',
            height: 'min(92vh, 900px)',
            maxHeight: '92vh',
            background: '#0a0a0f',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(227, 30, 36, 0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              flexShrink: 0,
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.1rem 2rem',
              background: 'rgba(10, 10, 15, 0.98)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--red)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  background: 'rgba(227, 30, 36, 0.1)',
                  border: '1px solid rgba(227, 30, 36, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                }}
              >
                PROJECT {project.index}
              </span>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>/</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--white)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {project.businessDomain || project.subtitle}
              </span>
            </div>

            {/* Nav & Close Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous project"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--red)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              >
                ← PREV
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next project"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--red)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
              >
                NEXT →
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                style={{
                  background: 'var(--red)',
                  border: 'none',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  padding: '0.45rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginLeft: '0.4rem',
                }}
              >
                <span>× CLOSE</span>
              </button>
            </div>
          </div>

          {/* Modal Body: ALL RESTORED DETAILS */}
          <div
            ref={scrollBodyRef}
            tabIndex={0}
            data-lenis-prevent="true"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            className="modal-scrollable-body"
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              outline: 'none',
            }}
          >
            {/* Hero Cover Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '240px',
                aspectRatio: '21/9',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#12121c',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '2rem',
              }}
            >
              {project.coverImage && !imageError ? (
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 90vw, 1100px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #181824 0%, #0d0d14 100%)',
                  }}
                >
                  <h3 className="display" style={{ fontSize: '2.5rem', color: 'var(--white)' }}>
                    {project.name}
                  </h3>
                </div>
              )}
            </div>

            {/* Title & Subtitle */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--red)',
                  letterSpacing: '0.2em',
                  marginBottom: '0.5rem',
                }}
              >
                PROJECT {project.index} // CASE STUDY
              </div>
              <h2
                id="modal-project-title"
                className="display"
                style={{
                  fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                  color: 'var(--white)',
                  lineHeight: 1,
                  marginBottom: '0.6rem',
                }}
              >
                {project.name}
              </h2>
              <div
                style={{
                  color: 'var(--red)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                }}
              >
                {project.subtitle} · {project.meta}
              </div>
            </div>

            {/* Metadata Grid (Role, Team, Timeline, Domain, Category, Type, Platforms, Downloads) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1.25rem',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                marginBottom: '2.5rem',
              }}
            >
              {project.role && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    My Role
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>
                    {project.role}
                  </div>
                </div>
              )}
              {project.teamSize && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Team Size
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>
                    {project.teamSize}
                  </div>
                </div>
              )}
              {project.timeline && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Timeline
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>
                    {project.timeline}
                  </div>
                </div>
              )}
              {project.businessDomain && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Business Domain
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>
                    {project.businessDomain}
                  </div>
                </div>
              )}
              {project.category && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Category
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>
                    {project.category}
                  </div>
                </div>
              )}
              {project.projectType && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Project Type
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>
                    {project.projectType}
                  </div>
                </div>
              )}
              {project.platforms && project.platforms.length > 0 && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Platforms
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                    {project.platforms.map((plat) => (
                      <span
                        key={plat}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--white)',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          padding: '1px 6px',
                          borderRadius: '3px',
                        }}
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.downloads && (
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Downloads
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--red)' }}>
                    {project.downloads}
                  </div>
                </div>
              )}
            </div>

            {/* External Action Links */}
            <div
              style={{
                display: 'flex',
                gap: '0.85rem',
                flexWrap: 'wrap',
                marginBottom: '3rem',
              }}
            >
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.65rem 1.4rem',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  Google Play Store ↗
                </a>
              )}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.65rem 1.4rem',
                    border: '1px solid var(--border)',
                    borderRadius: '3px',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--red)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  Apple App Store ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.65rem 1.4rem',
                    background: 'var(--red)',
                    borderRadius: '3px',
                    color: 'var(--white)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Live Application ↗
                </a>
              )}
            </div>

            {/* Problem & Solution (2-Column Grid) */}
            {(project.problem || project.solution) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2.5rem',
                }}
              >
                {project.problem && (
                  <div
                    style={{
                      padding: '1.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        color: 'var(--red)',
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      The Problem
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#ccc', lineHeight: 1.75 }}>
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div
                    style={{
                      padding: '1.75rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        color: 'var(--red)',
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      The Solution
                    </div>
                    <p style={{ fontSize: '0.92rem', color: '#ccc', lineHeight: 1.75 }}>
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Full Detailed Description */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Overview
              </div>
              <p style={{ fontSize: '1rem', color: '#ddd', lineHeight: 1.85 }}>
                {project.description}
              </p>
            </div>

            {/* Technical Architecture */}
            {project.architecture && (
              <div
                style={{
                  padding: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  marginBottom: '2.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Technical Architecture
                </div>
                <p style={{ fontSize: '0.92rem', color: '#ccc', lineHeight: 1.75 }}>
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Features Grid */}
            {project.features && project.features.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Key Features
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.85rem 1.1rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                        color: '#eee',
                      }}
                    >
                      <span style={{ color: 'var(--red)', fontSize: '0.65rem' }}>◆</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Engineering Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Key Engineering Challenges
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {project.challenges.map((challenge, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        fontSize: '0.92rem',
                        color: '#bbb',
                        lineHeight: 1.65,
                      }}
                    >
                      <span style={{ color: 'var(--red)', marginTop: '0.2rem' }}>—</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results & Impact Metrics */}
            {(project.metrics || (project.results && project.results.length > 0)) && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Results & Business Impact
                </div>

                {project.results && project.results.length > 0 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {project.results.map((res, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '1.25rem',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.02)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '1.85rem',
                            color: 'var(--white)',
                            fontWeight: 700,
                            lineHeight: 1,
                            marginBottom: '0.4rem',
                          }}
                        >
                          {res.value}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--red)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {res.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Strategic Business Impact */}
            {project.businessImpact && (
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderLeft: '3px solid var(--red)',
                  background: 'rgba(227, 30, 36, 0.05)',
                  borderRadius: '0 4px 4px 0',
                  marginBottom: '2.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--red)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.4rem',
                  }}
                >
                  Strategic Impact
                </div>
                <p style={{ fontSize: '0.94rem', color: '#ccc', lineHeight: 1.7 }}>
                  {project.businessImpact}
                </p>
              </div>
            )}

            {/* Complete Tech Stack */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                }}
              >
                Complete Technology Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      padding: '0.4rem 0.9rem',
                      border: '1px solid rgba(227, 30, 36, 0.3)',
                      borderRadius: '3px',
                      background: 'rgba(227, 30, 36, 0.06)',
                      color: 'var(--white)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
