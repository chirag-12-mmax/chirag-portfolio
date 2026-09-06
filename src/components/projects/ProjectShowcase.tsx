'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProjects, moreProjects } from '@/lib/data';
import ProjectBackground from './ProjectBackground';
import FloatingProjectStage from './FloatingProjectStage';
import ProjectNavigator from './ProjectNavigator';
import ProjectDetailsModal from './ProjectDetailsModal';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>(
    featuredProjects[0]?.id || ''
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive active project
  const activeProject =
    featuredProjects.find((p) => p.id === activeProjectId) || featuredProjects[0];

  // Previous & Next handlers for modal & navigator
  const handlePrev = () => {
    const currentIndex = featuredProjects.findIndex((p) => p.id === activeProjectId);
    const prevIndex = (currentIndex - 1 + featuredProjects.length) % featuredProjects.length;
    setActiveProjectId(featuredProjects[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = featuredProjects.findIndex((p) => p.id === activeProjectId);
    const nextIndex = (currentIndex + 1) % featuredProjects.length;
    setActiveProjectId(featuredProjects[nextIndex].id);
  };

  // Section Header Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#040406',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Cinematic Ambient Spotlight Background */}
      <ProjectBackground />

      {/* Section Header */}
      <div
        style={{
          position: 'relative',
          zIndex: 15,
          padding: '1.25rem 0 0.25rem',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            className="showcase-heading label"
            style={{
              marginBottom: '0.2rem',
              letterSpacing: '0.22em',
              fontSize: '0.72rem',
            }}
          >
            02 // WORK
          </div>
          <h2
            className="showcase-heading display"
            style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            SELECTED PROJECT
          </h2>
        </div>
      </div>

      {/* Main Floating Interactive Stage with 3D Orbit Movement */}
      <FloatingProjectStage
        projects={featuredProjects}
        activeProject={activeProject}
        onSelectProject={(id) => setActiveProjectId(id)}
        onOpenDetails={() => setIsModalOpen(true)}
        isPaused={isModalOpen}
      />

      {/* Bottom Horizontal Project Rail Navigator */}
      <ProjectNavigator
        projects={featuredProjects}
        activeProjectId={activeProject.id}
        onSelectProject={(id) => setActiveProjectId(id)}
      />

      {/* Full Restored Project Details Case-Study Modal */}
      <ProjectDetailsModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Additional Specialized Work */}
      {moreProjects && moreProjects.length > 0 && (
        <div
          style={{
            position: 'relative',
            zIndex: 15,
            padding: '4rem 0 6rem',
            background: 'rgba(5, 5, 8, 0.85)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div className="container">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 1,
                  background: 'var(--border-red)',
                  display: 'inline-block',
                }}
              />
              Additional Specialized Work & Explorations
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {moreProjects.map((p) => (
                <div
                  key={p.name}
                  style={{
                    padding: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.02)',
                    transition: 'border-color 0.25s, transform 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-red)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: '0.92rem',
                      color: 'var(--white)',
                      marginBottom: '0.35rem',
                      fontFamily: 'var(--font-head)',
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--red)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {p.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
