'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/types';

interface FloatingProjectCardProps {
  project: Project;
  isActive: boolean;
  onSelect: (id: string) => void;
  onOpenDetails?: () => void;
  cardWidth?: number;
  cardHeight?: number;
  style?: React.CSSProperties;
}

export const CARD_WIDTH = 300;
export const CARD_HEIGHT = 175;

function getDomainTheme(category?: string, domain?: string, name?: string) {
  const text = `${category || ''} ${domain || ''} ${name || ''}`.toLowerCase();
  if (text.includes('real estate') || text.includes('living')) {
    return {
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.28)',
      badge: 'PROPTECH // RESIDENTIAL',
      icon: '🏢',
      metric: '+60% Ops Efficiency',
    };
  }
  if (text.includes('finance') || text.includes('investment') || text.includes('sah')) {
    return {
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.28)',
      badge: 'FINTECH // ASSET MGMT',
      icon: '📈',
      metric: 'Bank-Grade Security',
    };
  }
  if (text.includes('ferry') || text.includes('maritime') || text.includes('sea')) {
    return {
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.28)',
      badge: 'MARITIME // LOGISTICS',
      icon: '⚓',
      metric: '<120ms Gate Sync',
    };
  }
  if (text.includes('hr') || text.includes('recruitment') || text.includes('zinghr') || text.includes('myrcloud')) {
    return {
      color: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.28)',
      badge: 'AI // HR ECOSYSTEM',
      icon: '⚡',
      metric: '2.5M+ Active Users',
    };
  }
  if (text.includes('fashion') || text.includes('ecommerce') || text.includes('manier')) {
    return {
      color: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.28)',
      badge: 'E-COMMERCE // LUXURY',
      icon: '✨',
      metric: '-35% Abandonment',
    };
  }
  if (text.includes('mobility') || text.includes('transport') || text.includes('pulpit')) {
    return {
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.28)',
      badge: 'MOBILITY // DISPATCH',
      icon: '🚗',
      metric: 'Real-Time Telemetry',
    };
  }
  if (text.includes('buildmart') || text.includes('sarthak') || text.includes('magicrete')) {
    return {
      color: '#eab308',
      glow: 'rgba(234, 179, 8, 0.28)',
      badge: 'CONSTRUCTION // B2B',
      icon: '🏗️',
      metric: '₹40Cr+ Volume Sync',
    };
  }
  return {
    color: 'var(--red)',
    glow: 'rgba(227, 30, 36, 0.28)',
    badge: 'ENTERPRISE PLATFORM',
    icon: '💻',
    metric: 'Enterprise Architecture',
  };
}

export default function FloatingProjectCard({
  project,
  isActive,
  onSelect,
  onOpenDetails,
  cardWidth = CARD_WIDTH,
  cardHeight = CARD_HEIGHT,
  style,
}: FloatingProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = getDomainTheme(project.category, project.businessDomain, project.name);

  const handleClick = () => {
    if (isActive && onOpenDetails) {
      onOpenDetails();
    } else {
      onSelect(project.id);
    }
  };

  // Monogram for sleek branding
  const monogram =
    project.name
      .split(/[\s()_-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'PJ';

  return (
    <div
      style={{
        position: 'relative',
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`View project ${project.index} - ${project.name}`}
        className="cylinder-project-card"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
          padding: 0,
          background: '#0c0d15',
          border: isHovered
            ? '2px solid var(--red)'
            : isActive
            ? '2px solid rgba(227, 30, 36, 0.95)'
            : '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isHovered
            ? '0 28px 65px rgba(0, 0, 0, 0.95), 0 0 35px rgba(227, 30, 36, 0.45), inset 0 0 20px rgba(227, 30, 36, 0.15)'
            : isActive
            ? '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(227, 30, 36, 0.4), inset 0 0 16px rgba(227, 30, 36, 0.12)'
            : '0 16px 36px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.6)',
          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
          opacity: isHovered ? 1 : isActive ? 1 : 0.92,
          transition:
            'transform 0.25s cubic-bezier(0.2, 0, 0, 1), opacity 0.3s ease, border-color 0.25s ease, box-shadow 0.3s ease',
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient Domain Glow in Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Card Background: Cover Image OR Technical Mesh */}
        {project.coverImage && !imageError ? (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
            <Image
              src={project.coverImage}
              alt={project.name}
              fill
              sizes="380px"
              className="object-cover"
              style={{
                opacity: isHovered || isActive ? 0.72 : 0.60,
                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.4s ease, opacity 0.3s ease',
              }}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 80% 20%, #1c1c2a 0%, #0d0d16 100%)',
              overflow: 'hidden',
              zIndex: 0,
            }}
          >
            {/* Subtle Monogram Watermark */}
            <span
              style={{
                position: 'absolute',
                right: '-10px',
                bottom: '-20px',
                fontFamily: 'var(--font-head)',
                fontSize: '5.5rem',
                fontWeight: 900,
                color: 'rgba(255, 255, 255, 0.04)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {monogram}
            </span>
          </div>
        )}

        {/* Ambient Gradient Vignette with Open Center for Rich Visual Clarity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(10, 10, 18, 0.76) 0%, rgba(10, 10, 18, 0.16) 36%, rgba(10, 10, 18, 0.16) 64%, rgba(10, 10, 18, 0.92) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Unified Card Details Layout */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '0.65rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            textAlign: 'left',
            zIndex: 3,
          }}
        >
          {/* Top Bar: Project Index & Category/Domain Pill */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--red)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background: 'rgba(0, 0, 0, 0.82)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(227, 30, 36, 0.5)',
                padding: '2px 7px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              {project.index}
            </span>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(6px)',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                maxWidth: '180px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'right',
              }}
            >
              {project.businessDomain || project.category}
            </span>
          </div>

          {/* Center Showcase: High-Tech Telemetry & Architecture Preview */}
          <div
            style={{
              background: 'rgba(12, 14, 22, 0.65)',
              backdropFilter: 'blur(6px)',
              border: `1px solid ${isActive ? 'rgba(227, 30, 36, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '7px',
              padding: '0.4rem 0.6rem',
              margin: '0.2rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45)',
            }}
          >
            {/* Telemetry Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.72rem', flexShrink: 0 }}>{theme.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.53rem',
                    color: theme.color,
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {theme.badge}
                </span>
              </div>

              {/* Dynamic Equalizer Wave Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '12px', flexShrink: 0 }}>
                <span style={{ width: '2px', height: '6px', background: theme.color, borderRadius: '1px', opacity: 0.7 }} />
                <span style={{ width: '2px', height: '12px', background: theme.color, borderRadius: '1px' }} />
                <span style={{ width: '2px', height: '8px', background: theme.color, borderRadius: '1px', opacity: 0.85 }} />
                <span style={{ width: '2px', height: '10px', background: theme.color, borderRadius: '1px', opacity: 0.95 }} />
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div style={{ display: 'flex', gap: '0.3rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {(project.stack || ['Flutter', 'REST API', 'Node.js']).slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.92)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.2,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Architecture Sub-readout */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'rgba(255, 255, 255, 0.65)',
                paddingTop: '1px',
              }}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                {project.role || 'Lead Mobile Dev'}
              </span>
              <span style={{ color: theme.color, fontWeight: 600, flexShrink: 0 }}>
                {theme.metric}
              </span>
            </div>
          </div>

          {/* Bottom Area: Project Name, Metric Tag & View Action */}
          <div>
            {/* Project Name */}
            <div
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--white)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)',
                marginBottom: '0.25rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.name}
            </div>

            {/* Sub-bar: Highlight Metric Tag + View Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {/* Highlight Metric / Tag */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  color: 'var(--red)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  background: 'rgba(227, 30, 36, 0.12)',
                  border: '1px solid rgba(227, 30, 36, 0.28)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  maxWidth: '180px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                ↑ {project.metrics || project.subtitle}
              </span>

              {/* View Affordance */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: isHovered || isActive ? 'var(--white)' : 'rgba(255, 255, 255, 0.65)',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  flexShrink: 0,
                }}
              >
                <span>VIEW</span>
                <span style={{ color: 'var(--red)' }}>→</span>
              </span>
            </div>
          </div>
        </div>

        {/* Selected Project Glow Ring */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '2px solid var(--red)',
              borderRadius: '12px',
              pointerEvents: 'none',
              boxShadow: '0 0 25px rgba(227, 30, 36, 0.4), inset 0 0 15px rgba(227, 30, 36, 0.15)',
            }}
          />
        )}
      </button>
    </div>
  );
}

