'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { engineeringExpertise } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// SKILL DEFINITIONS
// depth: 0=far · 1=middle · 2=front
// x,y: % position in skill field canvas (0-100)
// amp: idle float amplitude (px) · spd: idle float speed multiplier
// ─────────────────────────────────────────────────────────────────────────────
interface Skill {
  id: string; label: string; cat: string;
  depth: 0 | 1 | 2; x: number; y: number;
  amp?: number; spd?: number;
}

const SKILLS: Skill[] = [
  // ── Mobile Development ──────────────────────────────────────────────────────
  { id: 'flutter',     label: 'Flutter',           cat: 'mobile',    depth: 2, x: 7,  y: 14, amp: 10, spd: 0.70 },
  { id: 'dart',        label: 'Dart',              cat: 'mobile',    depth: 1, x: 3,  y: 36, amp: 8,  spd: 0.90 },
  { id: 'android',     label: 'Android SDK',       cat: 'mobile',    depth: 2, x: 14, y: 56, amp: 9,  spd: 0.80 },
  { id: 'ios',         label: 'iOS',               cat: 'mobile',    depth: 0, x: 4,  y: 74, amp: 6,  spd: 1.00 },
  { id: 'kotlin',      label: 'Kotlin',            cat: 'mobile',    depth: 1, x: 19, y: 88, amp: 7,  spd: 1.10 },
  // ── Architecture & State ────────────────────────────────────────────────────
  { id: 'clean',       label: 'Clean Architecture',cat: 'arch',      depth: 1, x: 24, y: 20, amp: 8,  spd: 0.85 },
  { id: 'mvvm',        label: 'MVVM',              cat: 'arch',      depth: 2, x: 30, y: 42, amp: 10, spd: 0.90 },
  { id: 'getx',        label: 'GetX',              cat: 'arch',      depth: 0, x: 21, y: 63, amp: 5,  spd: 1.20 },
  { id: 'bloc',        label: 'BLoC',              cat: 'arch',      depth: 2, x: 33, y: 81, amp: 9,  spd: 0.95 },
  { id: 'riverpod',    label: 'Riverpod',          cat: 'arch',      depth: 1, x: 15, y: 30, amp: 7,  spd: 0.85 },
  { id: 'provider',    label: 'Provider',          cat: 'arch',      depth: 0, x: 10, y: 49, amp: 6,  spd: 1.05 },
  // ── Backend & APIs ──────────────────────────────────────────────────────────
  { id: 'rest',        label: 'REST API',          cat: 'backend',   depth: 2, x: 42, y: 7,  amp: 11, spd: 0.75 },
  { id: 'nodejs',      label: 'Node.js',           cat: 'backend',   depth: 1, x: 48, y: 28, amp: 8,  spd: 1.00 },
  { id: 'ws',          label: 'WebSocket',         cat: 'backend',   depth: 2, x: 38, y: 48, amp: 10, spd: 1.00 },
  { id: 'graphql',     label: 'GraphQL',           cat: 'backend',   depth: 0, x: 52, y: 66, amp: 6,  spd: 1.30 },
  { id: 'php',         label: 'PHP / Laravel',     cat: 'backend',   depth: 1, x: 44, y: 84, amp: 7,  spd: 0.95 },
  { id: 'python',      label: 'Python',            cat: 'backend',   depth: 0, x: 35, y: 26, amp: 5,  spd: 0.95 },
  // ── Cloud & Firebase ────────────────────────────────────────────────────────
  { id: 'firebase',    label: 'Firebase',          cat: 'cloud',     depth: 2, x: 62, y: 12, amp: 10, spd: 0.80 },
  { id: 'firestore',   label: 'Firestore',         cat: 'cloud',     depth: 1, x: 68, y: 34, amp: 8,  spd: 1.00 },
  { id: 'fcm',         label: 'FCM',               cat: 'cloud',     depth: 0, x: 57, y: 54, amp: 5,  spd: 1.10 },
  { id: 'gcloud',      label: 'Google Cloud',      cat: 'cloud',     depth: 2, x: 72, y: 70, amp: 9,  spd: 0.90 },
  { id: 'cloudflare',  label: 'Cloudflare',        cat: 'cloud',     depth: 1, x: 64, y: 86, amp: 7,  spd: 1.00 },
  { id: 'sqlite',      label: 'SQLite',            cat: 'cloud',     depth: 0, x: 55, y: 38, amp: 6,  spd: 1.20 },
  { id: 'offline',     label: 'Offline Sync',      cat: 'cloud',     depth: 0, x: 27, y: 76, amp: 5,  spd: 1.00 },
  // ── AI & Intelligent Features ────────────────────────────────────────────────
  { id: 'ai-int',      label: 'AI Integration',    cat: 'ai',        depth: 2, x: 82, y: 16, amp: 11, spd: 0.70 },
  { id: 'google-ai',   label: 'Google AI',         cat: 'ai',        depth: 1, x: 88, y: 38, amp: 8,  spd: 1.00 },
  { id: 'ai-search',   label: 'AI Search',         cat: 'ai',        depth: 0, x: 78, y: 56, amp: 6,  spd: 1.10 },
  { id: 'vto',         label: 'Virtual Try-On',    cat: 'ai',        depth: 2, x: 86, y: 74, amp: 10, spd: 0.95 },
  { id: 'cf-ai',       label: 'Cloudflare AI',     cat: 'ai',        depth: 1, x: 93, y: 54, amp: 7,  spd: 0.90 },
  // ── Security ────────────────────────────────────────────────────────────────
  { id: 'oauth',       label: 'OAuth 2.0',         cat: 'security',  depth: 1, x: 34, y: 60, amp: 8,  spd: 1.00 },
  { id: 'biometric',   label: 'Biometric Auth',    cat: 'security',  depth: 2, x: 55, y: 20, amp: 9,  spd: 0.85 },
  { id: 'encrypt',     label: 'Encryption',        cat: 'security',  depth: 0, x: 25, y: 7,  amp: 5,  spd: 1.00 },
  { id: '2fa',         label: '2FA',               cat: 'security',  depth: 1, x: 74, y: 46, amp: 7,  spd: 1.00 },
  { id: 'face',        label: 'Face Verify',       cat: 'security',  depth: 0, x: 48, y: 76, amp: 6,  spd: 1.20 },
  // ── Payments ────────────────────────────────────────────────────────────────
  { id: 'razorpay',    label: 'Razorpay',          cat: 'payment',   depth: 1, x: 38, y: 92, amp: 7,  spd: 0.95 },
  { id: 'applepay',    label: 'Apple Pay',         cat: 'payment',   depth: 0, x: 58, y: 92, amp: 5,  spd: 1.05 },
  { id: 'phonepe',     label: 'PhonePe',           cat: 'payment',   depth: 2, x: 48, y: 94, amp: 9,  spd: 0.80 },
  // ── Hardware & Device Integration ───────────────────────────────────────────
  { id: 'bt',          label: 'Bluetooth Printer', cat: 'hardware',  depth: 1, x: 78, y: 88, amp: 7,  spd: 1.00 },
  { id: 'smart',       label: 'Smart Home',        cat: 'hardware',  depth: 2, x: 90, y: 88, amp: 10, spd: 0.90 },
  { id: 'gmaps',       label: 'Google Maps',       cat: 'hardware',  depth: 0, x: 93, y: 28, amp: 6,  spd: 1.10 },
  // ── Testing & Performance ───────────────────────────────────────────────────
  { id: 'unit',        label: 'Unit Testing',      cat: 'testing',   depth: 0, x: 11, y: 6,  amp: 5,  spd: 1.00 },
  { id: 'widget',      label: 'Widget Testing',    cat: 'testing',   depth: 1, x: 32, y: 6,  amp: 7,  spd: 0.90 },
  { id: 'perf',        label: 'Performance',       cat: 'testing',   depth: 0, x: 66, y: 6,  amp: 5,  spd: 1.00 },
  // ── Leadership & Delivery ────────────────────────────────────────────────────
  { id: 'git',         label: 'Git / GitHub',      cat: 'leadership',depth: 1, x: 82, y: 6,  amp: 7,  spd: 1.00 },
  { id: 'cicd',        label: 'CI/CD',             cat: 'leadership',depth: 2, x: 72, y: 22, amp: 9,  spd: 0.85 },
  { id: 'team',        label: 'Team Leadership',   cat: 'leadership',depth: 0, x: 56, y: 80, amp: 5,  spd: 1.10 },
  { id: 'shopify',     label: 'Shopify Dev',       cat: 'leadership',depth: 1, x: 90, y: 10, amp: 7,  spd: 1.00 },
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY COLOR STYLES
// ─────────────────────────────────────────────────────────────────────────────
const CAT: Record<string, { color: string; border: string; glow: string }> = {
  mobile:    { color: '#ff6b6b', border: 'rgba(255,107,107,0.25)', glow: 'rgba(255,107,107,0.14)' },
  arch:      { color: '#a0a0ff', border: 'rgba(160,160,255,0.25)', glow: 'rgba(160,160,255,0.14)' },
  backend:   { color: '#38bdf8', border: 'rgba(56,189,248,0.25)',  glow: 'rgba(56,189,248,0.14)'  },
  cloud:     { color: '#6bcfcf', border: 'rgba(107,207,207,0.25)', glow: 'rgba(107,207,207,0.14)' },
  ai:        { color: '#c084fc', border: 'rgba(192,132,252,0.25)', glow: 'rgba(192,132,252,0.14)' },
  security:  { color: '#86efac', border: 'rgba(134,239,172,0.25)', glow: 'rgba(134,239,172,0.14)' },
  payment:   { color: '#f0c060', border: 'rgba(240,192,96,0.25)',  glow: 'rgba(240,192,96,0.14)'  },
  hardware:  { color: '#fb923c', border: 'rgba(251,146,60,0.25)',  glow: 'rgba(251,146,60,0.14)'  },
  testing:   { color: '#4ade80', border: 'rgba(74,222,128,0.25)',  glow: 'rgba(74,222,128,0.14)'  },
  leadership:{ color: '#94a3b8', border: 'rgba(148,163,184,0.25)', glow: 'rgba(148,163,184,0.14)' },
};

const MOBILE_CATEGORIES = [
  { id: 'mobile', label: 'Mobile Engineering', color: '#ff6b6b' },
  { id: 'arch', label: 'Architecture & State', color: '#a0a0ff' },
  { id: 'backend', label: 'Backend & APIs', color: '#38bdf8' },
  { id: 'cloud', label: 'Cloud & Database', color: '#6bcfcf' },
  { id: 'ai', label: 'AI & Intelligence', color: '#c084fc' },
  { id: 'security', label: 'Security & Auth', color: '#86efac' },
  { id: 'payment', label: 'Payments', color: '#f0c060' },
  { id: 'hardware', label: 'Hardware & Device SDKs', color: '#fb923c' },
  { id: 'testing', label: 'Testing & Performance', color: '#4ade80' },
  { id: 'leadership', label: 'Leadership & CI/CD', color: '#94a3b8' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEPTH LAYER CONFIG
// parallaxMult: how much scene-wide parallax shifts this layer
// repelMult:    how strongly cursor repels this layer
// scale:        base visual scale of chip
// opacity:      base opacity
// ─────────────────────────────────────────────────────────────────────────────
const LAYER = [
  { scale: 0.79, opacity: 0.45, parallaxMult: 0.35, repelMult: 0.38 }, // depth 0 — far
  { scale: 0.91, opacity: 0.70, parallaxMult: 0.65, repelMult: 0.68 }, // depth 1 — middle
  { scale: 1.02, opacity: 0.92, parallaxMult: 1.00, repelMult: 1.00 }, // depth 2 — front
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef  = useRef<HTMLElement>(null);
  const fieldRef    = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  // Ref array — one entry per skill, points to the skill's transform wrapper
  const skillElsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const field   = fieldRef.current;
    const glow    = glowRef.current;
    if (!section || !field) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice  = window.matchMedia('(pointer: coarse)').matches;

    // ── Entrance animations (GSAP / ScrollTrigger) ──────────────────────────
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-heading-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );
      gsap.fromTo('.skill-chip-inner',
        { opacity: 0, y: 18, scale: 0.85 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.022, duration: 0.55, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: field, start: 'top 82%' },
        }
      );
    }, section);

    // ── Mobile / Reduced motion: simple idle float only ─────────────────────
    if (prefersReduced || isTouchDevice) {
      if (!prefersReduced) {
        let af: number;
        const floatLoop = (ts: number) => {
          const t = ts / 1000;
          skillElsRef.current.forEach((el, i) => {
            if (!el) return;
            const s = SKILLS[i];
            const floatY = Math.sin(t * (s.spd ?? 1) * 0.6 + i * 0.65) * (s.amp ?? 8);
            el.style.transform = `translate3d(0,${floatY.toFixed(2)}px,0)`;
          });
          af = requestAnimationFrame(floatLoop);
        };
        af = requestAnimationFrame(floatLoop);
        return () => { ctx.revert(); cancelAnimationFrame(af); };
      }
      return () => ctx.revert();
    }

    // ── Desktop: full interactive cursor force-field ─────────────────────────
    const INTERACTION_RADIUS = 230; // px — how far cursor force reaches
    const MAX_REPEL          = 28;  // px — max displacement at zero distance
    const LERP_SKILL         = 0.09; // spring speed per skill
    const LERP_GLOW          = 0.13; // spring speed for cursor glow

    // All mutable state lives in refs — NEVER triggers React re-render
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;

    // Cursor glow interpolation state
    let glowTgtX = 0.5, glowTgtY = 0.5;
    let glowCurX = 0.5, glowCurY = 0.5;
    let glowBg   = `radial-gradient(circle 400px at center, rgba(255,107,107,0.10) 0%, transparent 70%)`;

    // Per-skill spring state
    const state = SKILLS.map(() => ({
      curX: 0, curY: 0, curRot: 0,
      phase: Math.random() * Math.PI * 2, // for staggered idle float
    }));

    let raf: number;
    let simTime = 0;
    let lastTs  = 0;

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTs) / 1000, 0.05);
      lastTs = timestamp;
      simTime += dt;

      const rect = field.getBoundingClientRect();
      const fw = rect.width;
      const fh = rect.height;

      // Scene normalized mouse offset from center [-1..1]
      const normX = mouseActive ? (mouseX - fw * 0.5) / (fw * 0.5) : 0;
      const normY = mouseActive ? (mouseY - fh * 0.5) / (fh * 0.5) : 0;

      // ── Update cursor glow ──────────────────────────────────────────────
      glowCurX += (glowTgtX - glowCurX) * LERP_GLOW;
      glowCurY += (glowTgtY - glowCurY) * LERP_GLOW;

      if (glow) {
        glow.style.left    = `${(glowCurX * fw).toFixed(1)}px`;
        glow.style.top     = `${(glowCurY * fh).toFixed(1)}px`;
        glow.style.opacity = mouseActive ? '1' : '0';
        glow.style.background = glowBg;
      }

      // ── Animate each skill ──────────────────────────────────────────────
      skillElsRef.current.forEach((el, i) => {
        if (!el) return;

        const s   = SKILLS[i];
        const cfg = LAYER[s.depth];
        const st  = state[i];

        // Skill's base center in px (used only for distance calc)
        const skillCX = (s.x / 100) * fw;
        const skillCY = (s.y / 100) * fh;

        // ── Scene parallax (applied per-layer, independent of individual repulsion) ──
        const parallaxX = normX * -14 * cfg.parallaxMult;
        const parallaxY = normY * -8  * cfg.parallaxMult;

        // ── Cursor repulsion force ──────────────────────────────────────
        let targetDX  = 0;
        let targetDY  = 0;
        let targetRot = 0;

        if (mouseActive) {
          const dx   = mouseX - skillCX;
          const dy   = mouseY - skillCY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INTERACTION_RADIUS && dist > 1) {
            const raw      = 1 - dist / INTERACTION_RADIUS;
            const strength = raw * raw * cfg.repelMult; // quadratic falloff — gentler far, stronger close
            const angle    = Math.atan2(dy, dx);

            // Push away from cursor
            targetDX  = -Math.cos(angle) * strength * MAX_REPEL;
            targetDY  = -Math.sin(angle) * strength * MAX_REPEL;
            // Subtle rotation — tilts slightly away from the cursor direction
            targetRot = (dx > 0 ? -1 : 1) * strength * 2.2;
          }
        }

        // ── Smooth spring lerp (no snapping) ───────────────────────────
        st.curX   += (targetDX  - st.curX)   * LERP_SKILL;
        st.curY   += (targetDY  - st.curY)   * LERP_SKILL;
        st.curRot += (targetRot - st.curRot) * LERP_SKILL;

        // ── Idle organic float ──────────────────────────────────────────
        const floatAmp   = s.amp ?? 8;
        const floatSpeed = s.spd ?? 1.0;
        const floatY = Math.sin(simTime * floatSpeed * 0.60 + st.phase) * floatAmp;
        // Secondary small horizontal drift for organic feel
        const floatX = Math.cos(simTime * floatSpeed * 0.35 + st.phase + 1.2) * (floatAmp * 0.25);

        // ── Combine: parallax + repulsion + idle float ──────────────────
        // All live on the SAME element → no nested transform conflict
        const finalX = st.curX + parallaxX + floatX;
        const finalY = st.curY + parallaxY + floatY;

        el.style.transform =
          `translate3d(${finalX.toFixed(2)}px,${finalY.toFixed(2)}px,0)` +
          ` rotate(${st.curRot.toFixed(3)}deg)`;
      });

      raf = requestAnimationFrame(loop);
    };

    // Kick off — seed lastTs so first frame dt is zero
    raf = requestAnimationFrame((ts) => { lastTs = ts; raf = requestAnimationFrame(loop); });

    // ── Pointer event handlers ─────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;

      glowTgtX = mouseX / rect.width;
      glowTgtY = mouseY / rect.height;

      // Pick glow color = nearest skill's category
      const fw = rect.width;
      const fh = rect.height;
      let minDist = Infinity;
      let nearGlow = 'rgba(255,107,107,0.12)';

      SKILLS.forEach((s) => {
        const d = Math.hypot((s.x / 100) * fw - mouseX, (s.y / 100) * fh - mouseY);
        if (d < minDist) {
          minDist   = d;
          nearGlow  = CAT[s.cat]?.glow ?? 'rgba(255,107,107,0.12)';
        }
      });
      glowBg = `radial-gradient(circle 400px at center, ${nearGlow} 0%, transparent 70%)`;
    };

    const onPointerLeave = () => {
      mouseActive = false;
    };

    // Listen on the SECTION (not just field) to handle mouse entering from edges
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section" style={{ overflow: 'hidden' }}>
      {/* ── Section header ────────────────────────────────────────────────────── */}
      <div className="container">
        <div className="skill-heading-anim label" style={{ marginBottom: '1rem' }}>
          Tech Stack
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '3rem',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <h2
            className="skill-heading-anim display"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)' }}
          >
            CORE SKILLS
          </h2>
          <p
            className="skill-heading-anim"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--muted)', maxWidth: 300, lineHeight: 1.55,
            }}
          >
            Technologies I use to design, build and scale production applications.
          </p>
        </div>
      </div>

      {/* ── Interactive skill field (Desktop) ─────────────────────────────────── */}
      <div
        ref={fieldRef}
        className="skill-desktop-field"
        aria-label="Interactive skills canvas"
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(560px, 65vh, 740px)',
          cursor: 'crosshair',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        {/* Dark vignette — fades edges so floating items fade gracefully */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 22%, var(--bg) 88%)',
        }} />

        {/* Cursor glow — color-matched to nearest skill category */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0,
            borderRadius: '50%',
            transition: 'opacity 0.45s ease',
            mixBlendMode: 'screen',
          }}
        />

        {/* Background watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 2, textAlign: 'center', pointerEvents: 'none',
          }}
        >
          <div className="display" style={{
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.025)',
            lineHeight: 1,
          }}>
            SKILLS
          </div>
        </div>

        {/* ── Skill nodes ────────────────────────────────────────────────────── */}
        {SKILLS.map((s, i) => {
          const cfg = LAYER[s.depth];
          const cst = CAT[s.cat] ?? CAT.mobile;

          return (
            /*
             * TWO-LAYER STRUCTURE PER SKILL:
             *
             * Layer 1 — skillElsRef[i] (transform wrapper)
             *   Receives: translate3d (repulsion + parallax + float) + rotate
             *   Positioned absolutely at base x%,y%
             *
             * Layer 2 — .skill-chip-inner (visual chip button)
             *   Receives: hover scale only (via JS, not CSS)
             *   No transform conflict with layer 1
             */
            <div
              key={s.id}
              ref={(el) => { skillElsRef.current[i] = el; }}
              style={{
                position: 'absolute',
                left: `${s.x}%`,
                top: `${s.y}%`,
                zIndex: 3 + s.depth,
                willChange: 'transform',
              }}
            >
              <button
                className="skill-chip-inner"
                aria-label={s.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: `${0.28 + s.depth * 0.04}rem ${0.7 + s.depth * 0.06}rem`,
                  borderRadius: '4px',
                  background: 'rgba(8,8,12,0.58)',
                  border: `1px solid ${cst.border}`,
                  color: cst.color,
                  fontFamily: 'var(--font-mono)',
                  fontSize: `${0.58 + s.depth * 0.065}rem`,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  // Base scale from depth (no transition on transform — RAF handles movement)
                  transform: `scale(${cfg.scale})`,
                  opacity: cfg.opacity,
                  // Only border/shadow/color transitions — NOT transform (avoids fighting RAF)
                  transition: 'border-color 0.22s, box-shadow 0.22s, opacity 0.22s, color 0.18s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = '1';
                  el.style.borderColor = cst.color;
                  el.style.color = '#fff';
                  el.style.boxShadow = `0 0 20px ${cst.glow}, 0 0 6px ${cst.glow}`;
                  // Scale up slightly — safe on this element (RAF moves parent)
                  el.style.transform = `scale(${Math.min(cfg.scale * 1.10, 1.13)})`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = `${cfg.opacity}`;
                  el.style.borderColor = cst.border;
                  el.style.color = cst.color;
                  el.style.boxShadow = 'none';
                  el.style.transform = `scale(${cfg.scale})`;
                }}
              >
                {s.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Mobile Categorized View: Clean, structured and 100% visible ── */}
      <div className="skill-mobile-field container">
        {MOBILE_CATEGORIES.map((cat) => {
          const categorySkills = SKILLS.filter((s) => s.cat === cat.id);
          if (categorySkills.length === 0) return null;
          const cst = CAT[cat.id] ?? CAT.mobile;

          return (
            <div
              key={cat.id}
              className="skill-mobile-cat-group"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '8px',
                padding: '1.1rem 1.25rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: cat.color,
                  marginBottom: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: cat.color,
                    boxShadow: `0 0 8px ${cat.color}`,
                  }}
                />
                <span>{cat.label}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.35rem 0.7rem',
                      borderRadius: '4px',
                      background: 'rgba(10, 10, 14, 0.75)',
                      border: `1px solid ${cst.border}`,
                      color: cst.color,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Engineering Expertise grid ─────────────────────────────────────────── */}
      <div className="container skill-competencies-container" style={{ marginTop: '5rem' }}>
        <div
          className="skill-heading-anim label"
          style={{ marginBottom: '1.5rem' }}
        >
          Core Competencies
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
        }}>
          {engineeringExpertise?.map((exp, i) => (
            <div
              key={i}
              className="skill-heading-anim"
              style={{
                padding: '2rem',
                border: '1px solid var(--border)',
                borderRadius: 4,
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <h3 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {exp.title}
              </h3>
              <p style={{
                color: 'var(--muted)', fontSize: '0.85rem',
                lineHeight: 1.6, marginBottom: '1.5rem', flex: 1,
              }}>
                {exp.tagline}
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        padding: '0.3rem 0.6rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border)',
                        borderRadius: 2, color: 'var(--muted)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--red)',
                borderTop: '1px solid var(--border)', paddingTop: '1rem', letterSpacing: '0.05em',
              }}>
                ✦ {exp.proofBadge}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skill-mobile-field {
          display: none;
        }
        .skill-desktop-field {
          display: block;
        }
        @media (max-width: 768px) {
          .skill-desktop-field {
            display: none !important;
          }
          .skill-mobile-field {
            display: flex !important;
            flex-direction: column;
            gap: 1rem;
          }
          .skill-competencies-container {
            margin-top: 3.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
