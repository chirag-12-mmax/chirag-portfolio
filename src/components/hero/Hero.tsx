'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const introLabelRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const expLineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomMicroLeftRef = useRef<HTMLDivElement>(null);

  const artworkLayerRef = useRef<HTMLDivElement>(null);
  const glowOverlayRef = useRef<HTMLDivElement>(null);
  const scriptTextRef = useRef<HTMLDivElement>(null);
  const warmSpotlightRef = useRef<HTMLDivElement>(null);
  const bottomRightMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: 'power4.out' },
      });

      // 1. Warm studio atmosphere & 3D master layer entrance
      tl.fromTo(
        [artworkLayerRef.current, warmSpotlightRef.current],
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out' }
      );

      // 2. HELLO, I'M label
      tl.fromTo(
        introLabelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.9'
      );

      // 3. Main title text lines mask reveal
      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power4.out',
        },
        '-=0.65'
      );

      // 4. Experience line & description
      tl.fromTo(
        expLineRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.55'
      );
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

      // 5. CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.45'
      );

      // 6. Right side cursive script & micro tags
      tl.fromTo(
        [scriptTextRef.current, bottomMicroLeftRef.current],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', stagger: 0.08 },
        '-=0.4'
      );

      // Scroll Exit Parallax
      gsap.to(artworkLayerRef.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(leftContentRef.current, {
        y: -30,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    // Desktop Mouse Parallax
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isFinePointer && sectionRef.current) {
      const quickArtX = gsap.quickTo(artworkLayerRef.current, 'x', {
        duration: 1.2,
        ease: 'power2.out',
      });
      const quickArtY = gsap.quickTo(artworkLayerRef.current, 'y', {
        duration: 1.2,
        ease: 'power2.out',
      });

      const quickScriptX = gsap.quickTo(scriptTextRef.current, 'x', {
        duration: 1.0,
        ease: 'power2.out',
      });
      const quickScriptY = gsap.quickTo(scriptTextRef.current, 'y', {
        duration: 1.0,
        ease: 'power2.out',
      });

      const handleMouseMove = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;

        quickArtX(normX * 6);
        quickArtY(normY * 4.5);

        quickScriptX(normX * 9);
        quickScriptY(normY * 6);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      {/* ── BASE DARK STUDIO ENVIRONMENT ── */}
      <div className="hero-dark-base" />

      {/* ── RIGHT-SIDE WARM AMBIENT BACKLIGHT SPOTLIGHT ── */}
      <div ref={warmSpotlightRef} className="hero-right-spotlight" aria-hidden="true" />

      {/* ── 3D RIGHT-SIDE ARTWORK MASTER SCENE ── */}
      <div ref={artworkLayerRef} className="hero-artwork-canvas" aria-hidden="true">
        <Image
          src="/images/hero-clean-master.png"
          alt="Chirag Shyani leaning on giant 3D illuminated letters"
          fill
          priority
          sizes="100vw"
          className="hero-artwork-img"
        />
      </div>

      {/* ── TOP-RIGHT SIGNATURE CURSIVE SCRIPT (Fills upper-right space) ── */}
      <div ref={scriptTextRef} className="hero-script-tag" aria-hidden="true">
        Build Create Scale
        <svg className="script-flourish" width="125" height="12" viewBox="0 0 120 12" fill="none">
          <path
            d="M2 7 C30 2, 70 12, 118 3"
            stroke="rgba(223, 190, 153, 0.42)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── LEFT SHADOW / VIGNETTE GRADIENT (Guarantees 100% text readability on any desktop resolution) ── */}
      <div ref={glowOverlayRef} className="hero-left-vignette" aria-hidden="true" />

      {/* ── RIGHT-SIDE BLUR & GRADIENT FADE (Blends right edge seamlessly into the screen) ── */}
      <div className="hero-right-edge-blur" aria-hidden="true" />

      {/* ── ZONE 1: LEFT EDITORIAL DEVELOPER CONTENT (Editable & Live HTML) ── */}
      <div ref={leftContentRef} className="hero-left-zone">
        {/* Eyebrow / Intro */}
        <div ref={introLabelRef} className="hero-intro-label">
          <span className="hero-intro-dot" />
          HELLO, I&apos;M
        </div>

        {/* Main Role Title */}
        <h1 className="hero-main-title">
          <span className="title-mask">
            <span ref={titleLine1Ref} className="title-line">
              Senior Flutter &amp;
            </span>
          </span>
          <span className="title-mask">
            <span ref={titleLine2Ref} className="title-line title-warm-accent">
              Mobile App Developer
            </span>
          </span>
        </h1>

        {/* Experience Line with Vertical Golden Accent Bar */}
        <div ref={expLineRef} className="hero-experience-line">
          <span className="exp-bar" />
          <span className="exp-text">5+ Years of Experience</span>
        </div>

        {/* Description */}
        <p ref={descRef} className="hero-description-text">
          Building scalable mobile, web and enterprise applications with
          Flutter, modern architecture, AI integrations and production-grade
          engineering.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="hero-cta-buttons">
          <a
            href="#projects"
            className="hero-btn-primary"
            data-cursor="PROJECTS"
          >
            View Projects <span className="btn-arrow">→</span>
          </a>
          <a
            href="#about"
            className="hero-btn-secondary"
            data-cursor="ABOUT"
          >
            About Me
          </a>
        </div>

        {/* Bottom-Left Micro Tag */}
        <div ref={bottomMicroLeftRef} className="hero-bottom-left-tag" aria-hidden="true">
          TURNING IDEAS INTO INTELLIGENT APPS <span className="tag-dash">—</span>
        </div>
      </div>

      {/* ── CSS STYLING OPTIMIZED FOR ALL DESKTOP DEVICES ── */}
      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          height: 100vh;
          max-height: 1080px;
          width: 100%;
          background: #050507;
          overflow: hidden;
          display: flex;
          align-items: center;
          user-select: none;
        }

        /* Pure Dark Studio Room Base */
        .hero-dark-base {
          position: absolute;
          inset: 0;
          background: #050507;
          z-index: 0;
        }

        /* Warm Studio Lighting in Right Background (Resolves blank darkness) */
        .hero-right-spotlight {
          position: absolute;
          top: 32%;
          right: 12%;
          width: clamp(450px, 45vw, 850px);
          height: clamp(450px, 45vw, 850px);
          background: radial-gradient(
            circle at 50% 50%,
            rgba(214, 168, 108, 0.15) 0%,
            rgba(180, 120, 60, 0.06) 38%,
            rgba(120, 75, 38, 0.02) 60%,
            transparent 75%
          );
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        /* 3D Artwork Layer: Fills the entire visual stage, dynamically centered/fitted with soft edge blur fade */
        .hero-artwork-canvas {
          position: absolute;
          inset: 0;
          top: clamp(8px, 2.5vh, 26px);
          width: 100%;
          height: calc(100% - clamp(8px, 2.5vh, 26px));
          z-index: 1;
          pointer-events: none;
          transform-origin: center right;
          mask-image: linear-gradient(
            to right,
            black 0%,
            black 82%,
            rgba(0, 0, 0, 0.8) 90%,
            rgba(0, 0, 0, 0.25) 96%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            black 0%,
            black 82%,
            rgba(0, 0, 0, 0.8) 90%,
            rgba(0, 0, 0, 0.25) 96%,
            transparent 100%
          );
        }

        :global(.hero-artwork-img) {
          object-fit: contain !important;
          object-position: 70% bottom !important;
          width: 100% !important;
          height: 100% !important;
        }

        @media (min-width: 1600px) {
          :global(.hero-artwork-img) {
            object-position: 74% bottom !important;
          }
        }

        @media (min-width: 1024px) and (max-width: 1366px) {
          :global(.hero-artwork-img) {
            object-position: 68% bottom !important;
          }
        }

        /* Right-edge soft blur/fade overlay matching page background */
        .hero-right-edge-blur {
          position: absolute;
          top: 0;
          right: 0;
          width: clamp(100px, 15vw, 260px);
          height: 100%;
          background: linear-gradient(
            to left,
            #050507 0%,
            rgba(5, 5, 7, 0.92) 28%,
            rgba(5, 5, 7, 0.5) 65%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Top-Right Decorative Cursive Script (Fills upper-right space) */
        .hero-script-tag {
          position: absolute;
          top: clamp(14%, 18vh, 22%);
          right: clamp(6%, 13vw, 17%);
          font-family: 'Caveat', cursive, sans-serif;
          font-size: clamp(2.3rem, 3.2vw, 3.8rem);
          color: rgba(223, 190, 153, 0.42);
          transform: rotate(-7.5deg);
          letter-spacing: 0.04em;
          pointer-events: none;
          z-index: 10;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-shadow: 0 0 25px rgba(223, 190, 153, 0.18);
        }

        .script-flourish {
          margin-top: -6px;
        }

        /* Bottom-Right Micro Meta Text */
        .hero-bottom-right-meta {
          position: absolute;
          bottom: clamp(1.8rem, 3.8vh, 3.2rem);
          right: clamp(2rem, 4.5vw, 4.5rem);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.45rem;
          pointer-events: none;
          z-index: 10;
        }

        .meta-words {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.55rem, 0.65vw, 0.68rem);
          letter-spacing: 0.28em;
          line-height: 1.45;
          color: rgba(160, 152, 140, 0.65);
          text-transform: uppercase;
        }

        .meta-hairline {
          width: 32px;
          height: 1.5px;
          background: rgba(214, 168, 108, 0.4);
          margin-top: 2px;
        }

        /* Left subtle vignette: softens the left wall background for crystal clear text legibility */
        .hero-left-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: clamp(380px, 44vw, 700px);
          height: 100%;
          background: linear-gradient(
            90deg,
            #050507 0%,
            rgba(5, 5, 7, 0.94) 38%,
            rgba(5, 5, 7, 0.65) 60%,
            rgba(5, 5, 7, 0.15) 84%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ── ZONE 1: LEFT EDITORIAL CONTENT ── */
        .hero-left-zone {
          position: relative;
          z-index: 10;
          margin-left: clamp(2rem, 5vw, 5.5rem);
          max-width: clamp(400px, 36vw, 560px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: clamp(2rem, 4vh, 4.5rem);
          padding-bottom: clamp(2rem, 4vh, 3.5rem);
        }

        .hero-intro-label {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.72rem, 0.85vw, 0.82rem);
          letter-spacing: 0.28em;
          color: var(--red, #E31E24);
          text-transform: uppercase;
          margin-bottom: clamp(0.8rem, 1.6vh, 1.35rem);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .hero-intro-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--red, #E31E24);
          box-shadow: 0 0 10px var(--red, #E31E24);
        }

        .hero-main-title {
          margin: 0 0 clamp(1rem, 2vh, 1.6rem) 0;
          padding: 0;
          font-family: var(--font-head, 'Space Grotesk', sans-serif);
          font-size: clamp(2.2rem, 3.6vw, 4.3rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--white, #FAFAFA);
          display: flex;
          flex-direction: column;
        }

        .title-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }

        .title-line {
          display: block;
          will-change: transform, opacity;
        }

        .title-warm-accent {
          color: var(--red, #E31E24);
          text-shadow: 0 0 32px rgba(227, 30, 36, 0.4);
        }

        /* Experience Line with Vertical Red Accent Bar */
        .hero-experience-line {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: clamp(1rem, 1.8vh, 1.45rem);
        }

        .exp-bar {
          display: inline-block;
          width: 2.5px;
          height: clamp(1.2rem, 1.8vh, 1.45rem);
          background: var(--red, #E31E24);
          border-radius: 1px;
          box-shadow: 0 0 12px rgba(227, 30, 36, 0.65);
        }

        .exp-text {
          font-family: var(--font-head, 'Space Grotesk', sans-serif);
          font-size: clamp(0.95rem, 1.1vw, 1.12rem);
          font-weight: 500;
          color: var(--white, #FAFAFA);
          letter-spacing: -0.01em;
        }

        /* Description */
        .hero-description-text {
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: clamp(0.85rem, 0.95vw, 0.98rem);
          line-height: 1.62;
          color: rgba(250, 250, 250, 0.68);
          margin: 0 0 clamp(1.5rem, 2.8vh, 2.2rem) 0;
          max-width: 440px;
          font-weight: 400;
        }

        /* CTA Buttons matching project branding */
        .hero-cta-buttons {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.82rem 1.85rem;
          border-radius: 9999px;
          background: var(--red, #E31E24);
          color: #ffffff;
          font-family: var(--font-head, 'Space Grotesk', sans-serif);
          font-size: clamp(0.84rem, 0.95vw, 0.92rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 24px rgba(227, 30, 36, 0.38);
          border: 1px solid transparent;
        }

        .hero-btn-primary:hover {
          background: #c01519;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(227, 30, 36, 0.6);
        }

        .btn-arrow {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.82rem 1.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03);
          color: var(--white, #FAFAFA);
          border: 1.2px solid rgba(255, 255, 255, 0.16);
          font-family: var(--font-head, 'Space Grotesk', sans-serif);
          font-size: clamp(0.84rem, 0.95vw, 0.92rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-btn-secondary:hover {
          border-color: var(--red, #E31E24);
          color: #ffffff;
          background: rgba(227, 30, 36, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(227, 30, 36, 0.2);
        }

        /* Bottom-Left Micro Tag */
        .hero-bottom-left-tag {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.65rem, 0.72vw, 0.72rem);
          letter-spacing: 0.22em;
          color: rgba(250, 250, 250, 0.38);
          text-transform: uppercase;
          margin-top: clamp(1.8rem, 3.5vh, 3.2rem);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .tag-dash {
          color: var(--red, #E31E24);
          font-weight: 700;
          margin-left: 0.2rem;
        }

        /* ── RESPONSIVE COMPACT LAPTOPS & TABLETS ── */
        @media (max-height: 800px) {
          .hero-main-title {
            font-size: clamp(2rem, 3.2vw, 3.4rem);
          }
          .hero-description-text {
            margin-bottom: 1.2rem;
            line-height: 1.5;
          }
          .hero-bottom-left-tag {
            margin-top: 1.2rem;
          }
          .hero-script-tag {
            top: 13%;
            font-size: clamp(2rem, 2.8vw, 3.2rem);
          }
        }

        @media (max-width: 1024px) {
          .hero-section {
            height: auto;
            min-height: 100vh;
            max-height: none;
            padding-top: 6rem;
            padding-bottom: 5rem;
            flex-direction: column;
            justify-content: flex-start;
          }
          .hero-artwork-canvas {
            position: relative;
            width: 100%;
            height: 48vh;
            min-height: 320px;
            order: 2;
            margin-top: 1.5rem;
          }
          :global(.hero-artwork-img) {
            object-fit: contain !important;
            object-position: center bottom !important;
          }
          .hero-left-vignette,
          .hero-right-spotlight,
          .hero-script-tag,
          .hero-bottom-right-meta {
            display: none;
          }
          .hero-left-zone {
            order: 1;
            margin-left: 1.5rem;
            margin-right: 1.5rem;
            max-width: 100%;
            padding: 0;
          }
          .hero-main-title {
            font-size: clamp(2.4rem, 6.5vw, 3.8rem);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 5.5rem;
            padding-bottom: 3rem;
          }
          .hero-left-zone {
            margin-left: 1.25rem;
            margin-right: 1.25rem;
          }
          .hero-main-title {
            font-size: clamp(2rem, 7.8vw, 2.75rem);
            line-height: 1.12;
          }
          .hero-artwork-canvas {
            height: 38vh;
            min-height: 260px;
            max-width: 100%;
            overflow: hidden;
            margin-top: 1rem;
          }
          :global(.hero-artwork-img) {
            object-fit: contain !important;
            object-position: 50% bottom !important;
          }
          .hero-description-text {
            font-size: 0.88rem;
            line-height: 1.55;
            margin-bottom: 1.4rem;
          }
          .hero-cta-buttons {
            gap: 0.75rem;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 0.72rem 1.35rem;
            font-size: 0.8rem;
          }
          .hero-bottom-left-tag {
            font-size: 0.56rem;
            letter-spacing: 0.14em;
            margin-top: 1.4rem;
          }
        }
      `}</style>
    </section>
  );
}
