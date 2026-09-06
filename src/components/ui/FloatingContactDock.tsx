'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { contactDockItems, type ContactDockItem } from '@/data/contactDock';

export default function FloatingContactDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tileWrapperRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isTransformed, setIsTransformed] = useState(false);
  const isTouchDeviceRef = useRef(false);
  const isTouchOpenRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);

  // Initialize GSAP Timeline & Responsive / Motion preferences
  useEffect(() => {
    if (!dockRef.current) return;

    // Detect touch capability
    isTouchDeviceRef.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Initial entrance animation of the dock container
    gsap.fromTo(
      dockRef.current,
      { opacity: 0, y: 24, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        delay: 0.9,
        ease: 'power3.out',
      }
    );

    // Create the master reversible timeline for tile morphing
    const tl = gsap.timeline({
      paused: true,
      onStart: () => setIsTransformed(true),
      onReverseComplete: () => {
        setIsTransformed(false);
        setActiveTooltip(null);
      },
    });

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      if (prefersReducedMotion) {
        // Reduced motion: simple opacity crossfade
        const front = card.querySelector<HTMLElement>('.tile-front');
        const back = card.querySelector<HTMLElement>('.tile-back');
        if (front && back) {
          tl.to(
            front,
            { opacity: 0, duration: 0.15, ease: 'power2.out' },
            index * 0.04
          ).to(
            back,
            { opacity: 1, duration: 0.15, ease: 'power2.out' },
            index * 0.04
          );
        }
      } else {
        // Premium 3D flip along the X axis
        tl.to(
          card,
          {
            rotateX: 180,
            duration: 0.28,
            ease: 'power2.inOut',
          },
          index * 0.055 // Left-to-right sequential stagger
        );
      }
    });

    timelineRef.current = tl;

    // Outside tap/click listener to collapse dock on mobile/touch
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        isTouchOpenRef.current &&
        dockRef.current &&
        !dockRef.current.contains(e.target as Node)
      ) {
        isTouchOpenRef.current = false;
        timelineRef.current?.reverse();
      }
    };

    window.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      window.removeEventListener('pointerdown', handleOutsideClick);
      tl.kill();
    };
  }, []);

  // Pointer Enter Dock (Desktop Hover)
  const handleDockPointerEnter = useCallback(() => {
    isHoveredRef.current = true;
    timelineRef.current?.play();
  }, []);

  // Pointer Leave Dock (Desktop Hover)
  const handleDockPointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    // Clear individual tile magnetic positions
    tileWrapperRefs.current.forEach((wrapper) => {
      if (wrapper) {
        gsap.to(wrapper, { x: 0, y: 0, scale: 1, duration: 0.24, ease: 'power2.out' });
      }
    });
    setActiveTooltip(null);

    // Only reverse if not currently focused by keyboard or held open by touch
    if (!isFocusedRef.current && !isTouchOpenRef.current) {
      timelineRef.current?.reverse();
    }
  }, []);

  // Touch / Click Handler for Mobile
  const handleDockClick = useCallback((e: React.MouseEvent) => {
    if (isTouchDeviceRef.current && !isTouchOpenRef.current) {
      // First tap transforms CONTACT -> Icons without triggering any link navigation
      e.preventDefault();
      isTouchOpenRef.current = true;
      timelineRef.current?.play();
    }
  }, []);

  // Keyboard Focus Handling
  const handleFocusCapture = useCallback(() => {
    isFocusedRef.current = true;
    timelineRef.current?.play();
  }, []);

  const handleBlurCapture = useCallback((e: React.FocusEvent) => {
    if (!dockRef.current?.contains(e.relatedTarget as Node)) {
      isFocusedRef.current = false;
      setActiveTooltip(null);
      if (!isHoveredRef.current && !isTouchOpenRef.current) {
        timelineRef.current?.reverse();
      }
    }
  }, []);

  // Subtle Magnetic Micro-interaction per Tile
  const handleTilePointerMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>, index: number) => {
      if (e.pointerType === 'touch') return;
      const target = tileWrapperRefs.current[index];
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      // Limit magnetic movement to ±3px
      const clampedX = Math.max(-3, Math.min(3, relX * 0.16));
      const clampedY = Math.max(-3, Math.min(3, relY * 0.16));

      gsap.to(target, {
        x: clampedX,
        y: clampedY,
        scale: 1.04,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
    []
  );

  const handleTilePointerLeave = useCallback((index: number) => {
    const target = tileWrapperRefs.current[index];
    if (!target) return;
    gsap.to(target, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    setActiveTooltip((current) => (current === contactDockItems[index].id ? null : current));
  }, []);

  const handleTilePointerEnter = useCallback((item: ContactDockItem) => {
    setActiveTooltip(item.id);
  }, []);

  return (
    <>
      <nav
        ref={dockRef}
        aria-label="Contact and Social Profiles"
        className="floating-contact-dock"
        onPointerEnter={handleDockPointerEnter}
        onPointerLeave={handleDockPointerLeave}
        onClick={handleDockClick}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
      >
        <div className="dock-tiles-container">
          {contactDockItems.map((item, index) => {
            const Icon = item.icon;
            const hasRealUrl = Boolean(item.url);
            const isTooltipVisible = activeTooltip === item.id && isTransformed;

            return (
              <a
                key={item.id}
                ref={(el) => {
                  tileWrapperRefs.current[index] = el;
                }}
                href={hasRealUrl ? item.url : '#'}
                target={hasRealUrl && !item.url.startsWith('mailto:') ? '_blank' : undefined}
                rel={hasRealUrl && !item.url.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                aria-label={item.ariaLabel}
                aria-disabled={!hasRealUrl}
                data-cursor={hasRealUrl ? 'OPEN' : 'CONTACT'}
                className={`dock-tile-wrapper ${!hasRealUrl ? 'dock-tile-unlinked' : ''}`}
                onPointerEnter={() => handleTilePointerEnter(item)}
                onPointerMove={(e) => handleTilePointerMove(e, index)}
                onPointerLeave={() => handleTilePointerLeave(index)}
                onFocus={() => {
                  setActiveTooltip(item.id);
                }}
                onClick={(e) => {
                  if (isTouchDeviceRef.current && !isTouchOpenRef.current) {
                    e.preventDefault();
                    isTouchOpenRef.current = true;
                    timelineRef.current?.play();
                    return;
                  }
                  if (!hasRealUrl) {
                    e.preventDefault();
                  }
                }}
              >
                {/* Individual Tooltip */}
                <div
                  role="tooltip"
                  className={`dock-tooltip ${isTooltipVisible ? 'dock-tooltip-visible' : ''}`}
                  aria-hidden={!isTooltipVisible}
                >
                  <span className="dock-tooltip-text">
                    {item.label}
                    {!hasRealUrl && <span className="dock-tooltip-tag"> (SOON)</span>}
                  </span>
                  <span className="dock-tooltip-arrow" />
                </div>

                {/* 3D Morph Card */}
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="dock-tile-card"
                >
                  {/* Front Face: Character Tile */}
                  <div className="tile-face tile-front">
                    <span className="tile-letter">{item.letter}</span>
                  </div>

                  {/* Back Face: Social Vector Icon */}
                  <div className="tile-face tile-back">
                    <Icon className="tile-icon" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Scoped CSS for the Floating Contact Dock */}
      <style jsx>{`
        .floating-contact-dock {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 80;
          height: 52px;
          padding: 6px 8px;
          background: rgba(14, 14, 16, 0.84);
          border: 1px solid rgba(255, 255, 255, 0.09);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          touch-action: manipulation;
        }

        .dock-tiles-container {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dock-tile-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          text-decoration: none;
          outline: none;
          perspective: 600px;
          cursor: pointer;
        }

        .dock-tile-wrapper:focus-visible {
          box-shadow: 0 0 0 2px var(--red, #e31e24);
        }

        .dock-tile-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 9px;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .tile-face {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        /* Front Face (CONTACT Letter) */
        .tile-front {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          transform: rotateX(0deg);
        }

        .tile-letter {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: #fafafa;
          text-transform: uppercase;
        }

        /* Back Face (Social Icon) */
        .tile-back {
          background: #131316;
          border: 1px solid rgba(255, 255, 255, 0.11);
          transform: rotateX(180deg);
        }

        :global(.tile-icon) {
          width: 15px;
          height: 15px;
          color: #fafafa;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        /* Hover states for the active icon tile */
        .dock-tile-wrapper:hover .tile-back {
          border-color: rgba(227, 30, 36, 0.45);
          box-shadow: 0 0 14px rgba(227, 30, 36, 0.22);
        }

        .dock-tile-wrapper:hover :global(.tile-icon) {
          color: #ffffff;
          transform: scale(1.08);
        }

        .dock-tile-unlinked:hover :global(.tile-icon) {
          color: #a0a0a0;
        }

        /* Tooltip */
        .dock-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translate(-50%, 5px) scale(0.94);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.16s ease, transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .dock-tooltip-visible {
          opacity: 1;
          transform: translate(-50%, 0) scale(1);
        }

        .dock-tooltip-text {
          background: #0e0e11;
          color: #fafafa;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 3px 8px;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
        }

        .dock-tooltip-tag {
          font-size: 0.54rem;
          color: var(--red, #e31e24);
          font-weight: 600;
        }

        .dock-tooltip-arrow {
          width: 5px;
          height: 5px;
          background: #0e0e11;
          border-right: 1px solid rgba(255, 255, 255, 0.13);
          border-bottom: 1px solid rgba(255, 255, 255, 0.13);
          transform: rotate(45deg);
          margin-top: -3px;
        }

        /* Responsive Mobile Layout */
        @media (max-width: 640px) {
          .floating-contact-dock {
            bottom: 18px;
            height: 44px;
            padding: 5px 6px;
            border-radius: 13px;
          }

          .dock-tiles-container {
            gap: 4px;
          }

          .dock-tile-wrapper {
            width: 32px;
            height: 32px;
            border-radius: 7px;
          }

          .dock-tile-card,
          .tile-face {
            border-radius: 7px;
          }

          .tile-letter {
            font-size: 0.7rem;
          }

          :global(.tile-icon) {
            width: 13px;
            height: 13px;
          }
        }
      `}</style>
    </>
  );
}
