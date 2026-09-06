'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { Project } from '@/types';
import FloatingProjectCard, { CARD_WIDTH, CARD_HEIGHT } from './FloatingProjectCard';
import ActiveProject from './ActiveProject';

interface FloatingProjectStageProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (id: string) => void;
  onOpenDetails: () => void;
  isPaused?: boolean;
}

// 4 distinct vertical height tiers for the 12 orbital slots
const Y_TIERS = [-180, 150, -80, 80];

// Diverse, enlarged dimensions across projects for impressive 3D moving card presence
const PROJECT_CARD_DIMENSIONS: { width: number; height: number }[] = [
  { width: 380, height: 224 }, // 01 LIVING (Featured enterprise)
  { width: 340, height: 204 }, // 02 SAH Investment (Compact fintech)
  { width: 360, height: 214 }, // 03 Yoneti (Normal)
  { width: 385, height: 226 }, // 04 Magicrete BuildMart (Featured)
  { width: 345, height: 206 }, // 05 DG Ferry Agent (Compact)
  { width: 355, height: 212 }, // 06 Manier De Voir (Normal)
  { width: 375, height: 222 }, // 07 ZingHR Onboarding (Featured)
  { width: 340, height: 204 }, // 08 DG Sea Connect (Compact)
  { width: 365, height: 216 }, // 09 Pulpit Mobility (Normal)
  { width: 390, height: 230 }, // 10 MyRCloud Recruitment (Featured)
  { width: 350, height: 210 }, // 11 Magicrete Sarthak (Normal)
  { width: 370, height: 220 }, // 12 NCH Enterprise (Normal)
];

export default function FloatingProjectStage({
  projects,
  activeProject,
  onSelectProject,
  onOpenDetails,
  isPaused = false,
}: FloatingProjectStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth transition interpolation for each card (0 = on cylinder orbit, 1 = centered in focus)
  const cardTransitionRefs = useRef<number[]>(new Array(12).fill(0));

  // Time and rotation tracking
  const timeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isHoveredRef = useRef(false);

  // Responsive Elliptical Cylinder Radii (radiusZ: 160px for elegant recessed orbit)
  const [radii, setRadii] = useState({ radiusX: 560, radiusZ: 160 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      // Wide horizontal radius on desktop; compact contained radius on mobile
      const rx = isMobile ? Math.min(w * 0.38, 140) : Math.min(Math.max(w * 0.44, 480), 720);
      const rz = isMobile ? 80 : 160;
      setRadii({ radiusX: rx, radiusZ: rz });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Main 3D Cylindrical Continuous Orbit Loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Active Card Focus Coordinates (centered directly ABOVE the details panel)
    const xCenter = 0;
    const yCenter = isMobile ? -185 : -145; // Moved further up on mobile to leave abundant space for details HUD
    const targetActiveWidth = isMobile
      ? Math.min(window.innerWidth - 44, 335)
      : 420; // Matches details HUD width
    const zCenter = 140; // Elevated forward in depth (+140px)
    const opacityCenter = 1.0;
    const zIndexCenter = 500; // Unconditionally higher than all cylinder cards (max 60) and details HUD (300)

    // Orbit cylinder depth center (recessed backwards so orbiting cards stay behind)
    const orbitCenterZ = isMobile ? -140 : -220;

    // Synchronized angular velocity (one complete 2PI revolution in ~45 seconds)
    const angularVelocity = (2 * Math.PI) / 45;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Advance rotation unless paused (e.g. modal open)
      if (!isPaused && !prefersReducedMotion) {
        const timeScale = isHoveredRef.current ? 0.3 : 1.0;
        timeRef.current += deltaTime * timeScale;
      }

      const { radiusX, radiusZ } = radii;
      const count = projects.length;

      projects.forEach((project, i) => {
        const el = cardWrapperRefs.current[i];
        if (!el) return;

        const isActive = project.id === activeProject.id;
        const cardDim = PROJECT_CARD_DIMENSIONS[i] || { width: 360, height: 215 };

        // Base angle for slot i (evenly distributed 360 deg / count)
        const baseAngle = (2 * Math.PI * i) / count;
        const currentAngle = baseAngle + timeRef.current * angularVelocity;

        // Elliptical cylinder coordinates
        const xCyl = Math.sin(currentAngle) * radiusX;
        const zCyl = orbitCenterZ + Math.cos(currentAngle) * radiusZ;

        // Vertical height from tiered slot with subtle organic floating bob
        const baseTierY = Y_TIERS[i % Y_TIERS.length];
        const yCyl = baseTierY + Math.sin(timeRef.current * 1.4 + i * 0.8) * 8;

        // Depth mapping factor u in [0, 1] (0 = farthest back, 1 = closest front of cylinder)
        const minZ = orbitCenterZ - radiusZ;
        const maxZ = orbitCenterZ + radiusZ;
        const u = Math.min(Math.max((zCyl - minZ) / (maxZ - minZ), 0), 1);

        // Noticeable 3D depth scaling: Small in back (0.58), expanding to full prominence in front (1.08)
        const scaleCyl = 0.58 + u * 0.50; // Back: 0.58, Front: 1.08
        // On mobile, keep background cylinder cards invisible so they don't bleed past mobile screen
        const opacityCyl = isMobile ? 0 : 0.30 + u * 0.65;
        const zIndexCyl = Math.round(15 + u * 45); // Back: 15, Front: 60 (strictly < 300 HUD and < 500 active card)
        const blurCyl = (1 - u) * 2.0; // Back: 2.0px, Front: 0px
        const brightnessCyl = 0.60 + u * 0.40; // Back: 0.60, Front: 1.0

        // Target active scale dynamically computed so active card matches 520px width of details HUD below
        const scaleCenterForCard = targetActiveWidth / cardDim.width;

        // Smoothly interpolate between cylinder orbit and active focus position
        const targetT = isActive ? 1.0 : 0.0;
        const currentT = cardTransitionRefs.current[i] ?? 0;
        const step = isActive ? 0.085 : 0.075;
        const nextT = currentT + (targetT - currentT) * step;
        cardTransitionRefs.current[i] = Math.abs(targetT - nextT) < 0.001 ? targetT : nextT;
        const t = cardTransitionRefs.current[i];

        // Linear interpolation
        const x = xCyl * (1 - t) + xCenter * t;
        const y = yCyl * (1 - t) + yCenter * t;
        const z = zCyl * (1 - t) + zCenter * t;
        const scale = scaleCyl * (1 - t) + scaleCenterForCard * t;
        const opacity = opacityCyl * (1 - t) + opacityCenter * t;
        const zIndex = t > 0.15 ? zIndexCenter : zIndexCyl;
        const blur = blurCyl * (1 - t);
        const brightness = brightnessCyl * (1 - t) + 1.0 * t;

        // Apply GPU transform
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        el.style.opacity = `${opacity.toFixed(3)}`;
        el.style.zIndex = `${zIndex}`;
        el.style.filter =
          blur > 0.15
            ? `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`
            : `brightness(${brightness.toFixed(2)})`;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [projects, activeProject.id, radii, isPaused]);

  // Card hover handling
  const handleCardMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  // Card click handling
  const handleCardClick = useCallback(
    (id: string) => {
      if (id === activeProject.id) {
        onOpenDetails();
      } else {
        onSelectProject(id);
      }
    },
    [activeProject.id, onOpenDetails, onSelectProject]
  );

  return (
    <div
      ref={stageRef}
      className="project-stage"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        height: 'clamp(700px, 85vh, 900px)',
        overflow: 'hidden',
        perspective: '1400px',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D CYLINDRICAL ORBIT STATUS HINT (BOTTOM - Desktop only) */}
      <div
        className="cylindrical-orbit-hint"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 400,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--red)',
            boxShadow: '0 0 8px var(--red)',
          }}
        />
        3D CYLINDRICAL ORBIT ACTIVE
      </div>

      {/* 3D CYLINDRICAL ORBITING PROJECT CARDS (Stage Center Reference at 50% 50%) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
          pointerEvents: 'auto',
        }}
      >
        {projects.map((project, i) => {
          const isActive = project.id === activeProject.id;
          const cardDim = PROJECT_CARD_DIMENSIONS[i % PROJECT_CARD_DIMENSIONS.length];

          return (
            <div
              key={project.id}
              ref={(el) => {
                cardWrapperRefs.current[i] = el;
              }}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transformStyle: 'preserve-3d',
                transform: 'translate3d(0, 0, 0) scale(1)',
                willChange: 'transform, opacity, filter',
                cursor: 'pointer',
              }}
            >
              {/* Perfectly centered card anchor at (0, 0) using exact card dimensions */}
              <div
                style={{
                  position: 'absolute',
                  width: `${cardDim.width}px`,
                  height: `${cardDim.height}px`,
                  left: `-${cardDim.width / 2}px`,
                  top: `-${cardDim.height / 2}px`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <FloatingProjectCard
                  project={project}
                  isActive={isActive}
                  onSelect={() => handleCardClick(project.id)}
                  onOpenDetails={onOpenDetails}
                  cardWidth={cardDim.width}
                  cardHeight={cardDim.height}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* FOREGROUND ACTIVE PROJECT EDITORIAL HUD (CENTERED DIRECTLY BELOW ACTIVE CARD) */}
      <div
        className="project-editorial-hud"
        style={{
          position: 'absolute',
          top: 'calc(50% + 14px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '560px',
          zIndex: 180,
          pointerEvents: 'auto',
          padding: '0 0.5rem',
        }}
      >
        <ActiveProject
          project={activeProject}
          onOpenDetails={onOpenDetails}
          showCoverImage={false}
        />
      </div>

      <style jsx>{`
        .cylindrical-orbit-hint {
          display: flex;
        }
        @media (max-width: 768px) {
          :global(.project-stage) {
            min-height: 840px !important;
            height: 870px !important;
          }
          .cylindrical-orbit-hint {
            display: none !important;
          }
          .project-editorial-hud {
            top: calc(50% - 24px) !important;
            padding: 0 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
