'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { Project } from '@/types';

interface ProjectNavigatorProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
}

export default function ProjectNavigator({
  projects,
  activeProjectId,
  onSelectProject,
}: ProjectNavigatorProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoDriftTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(true);

  // Scroll active item into view when activeProjectId changes
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const activeItem = rail.querySelector<HTMLElement>(`[data-nav-id="${activeProjectId}"]`);
    if (activeItem) {
      const railRect = rail.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetScroll =
        rail.scrollLeft +
        (itemRect.left - railRect.left) -
        (railRect.width / 2 - itemRect.width / 2);

      rail.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [activeProjectId]);

  // Pause auto-drift on interaction and resume after 2.5s
  const pauseAutoDrift = useCallback(() => {
    setIsIdle(false);
    if (autoDriftTimeoutRef.current) clearTimeout(autoDriftTimeoutRef.current);
    autoDriftTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 2500);
  }, []);

  // Subtle auto-drift when idle (approx 3-4px/sec)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animFrame: number;
    let lastTime = performance.now();

    const drift = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isIdle && !isHovered && !isDraggingRef.current) {
        if (rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1) {
          rail.scrollLeft = 0; // Wrap gently
        } else {
          rail.scrollLeft += delta * 18; // approx 18px / sec
        }
      }

      animFrame = requestAnimationFrame(drift);
    };

    animFrame = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(animFrame);
  }, [isIdle, isHovered]);

  // Non-hijacking Wheel scrolling: only intercept when rail can scroll horizontally
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    const delta = e.deltaY || e.deltaX;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const canScrollRight = delta > 0 && rail.scrollLeft < maxScroll - 1;
    const canScrollLeft = delta < 0 && rail.scrollLeft > 1;

    if (canScrollRight || canScrollLeft) {
      e.preventDefault();
      rail.scrollLeft += delta * 1.2;
      pauseAutoDrift();
    }
  };

  // Pointer drag events for desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;
    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - rail.offsetLeft;
    scrollLeftRef.current = rail.scrollLeft;
    dragDistanceRef.current = 0;
    pauseAutoDrift();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const rail = railRef.current;
    if (!rail) return;
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    rail.scrollLeft = scrollLeftRef.current - walk;
    dragDistanceRef.current = Math.abs(walk);
  };

  const handlePointerUpOrCancel = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  // Previous / Next button handlers
  const handlePrev = () => {
    pauseAutoDrift();
    const currentIndex = projects.findIndex((p) => p.id === activeProjectId);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIndex].id);
  };

  const handleNext = () => {
    pauseAutoDrift();
    const currentIndex = projects.findIndex((p) => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIndex].id);
  };

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 70,
        width: '100%',
        padding: '1.5rem 1rem 2rem',
        background: 'linear-gradient(to top, rgba(3,3,3,0.95) 0%, rgba(5,5,5,0.8) 70%, transparent 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '1360px',
        }}
      >
        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          style={{
            flexShrink: 0,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            transition: 'border-color 0.2s, background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--red)';
            e.currentTarget.style.color = 'var(--red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--white)';
          }}
        >
          ←
        </button>

        {/* Horizontal Project Rail */}
        <div
          ref={railRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handlePointerUpOrCancel();
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: isGrabbing ? 'grabbing' : 'grab',
            userSelect: 'none',
            padding: '1rem 0',
          }}
        >
          {projects.map((project) => {
            const isActive = project.id === activeProjectId;

            return (
              <button
                key={project.id}
                type="button"
                data-nav-id={project.id}
                onClick={() => {
                  // Prevent click if user was dragging
                  if (dragDistanceRef.current > 6) return;
                  pauseAutoDrift();
                  onSelectProject(project.id);
                }}
                aria-label={`Switch to project ${project.index} - ${project.name}`}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '4px',
                  background: isActive ? 'rgba(227, 30, 36, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isActive
                    ? '1px solid rgba(227, 30, 36, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  opacity: isActive ? 1 : 0.55,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.opacity = '0.55';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  }
                }}
              >
                {/* Index / Accent Indicator */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isActive ? 'var(--red)' : 'var(--muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {project.index}
                </div>

                {/* Minimal divider line */}
                <div
                  style={{
                    width: '1px',
                    height: '24px',
                    background: isActive ? 'var(--red)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                />

                {/* Title & Domain */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--white)' : '#bbb',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {project.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: isActive ? 'var(--red)' : 'var(--muted)',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.businessDomain || project.subtitle}
                  </div>
                </div>

                {/* Active Underline indicator */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: '10%',
                      right: '10%',
                      height: '2px',
                      background: 'var(--red)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          style={{
            flexShrink: 0,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            transition: 'border-color 0.2s, background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--red)';
            e.currentTarget.style.color = 'var(--red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--white)';
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
