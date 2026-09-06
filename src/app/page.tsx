'use client';
import { useState, useCallback } from 'react';
import { useLenis } from '@/lib/lenis';
import LoadingScreen from '@/components/loading/LoadingScreen';
import CinematicCursor from '@/components/cursor/CinematicCursor';
import FloatingNav from '@/components/navigation/FloatingNav';
import FloatingContactDock from '@/components/ui/FloatingContactDock';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Experience from '@/components/experience/Experience';
import AISection from '@/components/ai/AISection';
import Hardware from '@/components/hardware/Hardware';
import Services from '@/components/services/Services';
import Testimonials from '@/components/testimonials/Testimonials';
import Highlights from '@/components/highlights/Highlights';
import Architecture from '@/components/architecture/Architecture';
import Contact from '@/components/contact/Contact';
import ATSResume from '@/components/ats/ATSResume';

function PortfolioContent() {
  useLenis();
  return (
    <>
      <CinematicCursor />
      <FloatingNav />
      <FloatingContactDock />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AISection />
        <Hardware />
        <Services />
        <Testimonials />
        <Highlights />
        <Architecture />
        <Contact />
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2rem 6.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'var(--bg)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          © {new Date().getFullYear()} Chirag Shyani · Senior Flutter Developer & Technical Lead
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted-2)', textTransform: 'uppercase' }}>
          Next.js · GSAP · Framer Motion · Lenis
        </span>
      </footer>
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <ATSResume />
      {!loaded && <LoadingScreen onComplete={handleComplete} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          visibility: loaded ? 'visible' : 'hidden',
        }}
      >
        {loaded && <PortfolioContent />}
      </div>
    </>
  );
}
