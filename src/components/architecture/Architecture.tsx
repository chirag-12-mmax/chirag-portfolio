'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  { id: 'app', label: 'Mobile App', x: 50, y: 5, color: '#E31E24' },
  { id: 'api', label: 'API Layer', x: 50, y: 25, color: '#fff' },
  { id: 'auth', label: 'Auth', x: 20, y: 45, color: '#a0a0ff' },
  { id: 'rest', label: 'REST', x: 50, y: 45, color: '#a0a0ff' },
  { id: 'ws', label: 'WebSocket', x: 80, y: 45, color: '#a0a0ff' },
  { id: 'db', label: 'Database', x: 50, y: 65, color: '#6bcfcf' },
  { id: 'cloud', label: 'Cloud', x: 20, y: 85, color: '#86efac' },
  { id: 'storage', label: 'Storage', x: 50, y: 85, color: '#86efac' },
  { id: 'aifn', label: 'AI', x: 80, y: 85, color: '#c084fc' },
];

const edges = [
  ['app', 'api'], ['api', 'auth'], ['api', 'rest'], ['api', 'ws'],
  ['auth', 'db'], ['rest', 'db'], ['ws', 'db'],
  ['db', 'cloud'], ['db', 'storage'], ['db', 'aifn'],
];

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const pos = (id: string) => nodes.find(n => n.id === id)!;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.arch-node', { opacity: 0, scale: 0.5 }, {
        opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.fromTo('.arch-edge', { strokeDashoffset: 200, opacity: 0 }, {
        strokeDashoffset: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        delay: 0.8,
      });
      // Pulse data along edges
      gsap.to('.arch-pulse', {
        strokeDashoffset: -40, duration: 1.5, ease: 'none', repeat: -1,
        stagger: { each: 0.4, repeat: -1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="architecture" ref={sectionRef} className="section">
      <div className="container">
        <div style={{ marginBottom: '0.75rem' }} className="label">Architecture</div>
        <h2 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: '0.5rem' }}>
          SYSTEM DESIGN
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '3rem', maxWidth: 500 }}>
          A glimpse at how I architect production mobile systems — from the app layer to AI endpoints.
        </p>

        <div style={{
          border: '1px solid var(--border)', borderRadius: 8,
          background: 'var(--bg-card)', padding: '2rem', overflow: 'hidden',
        }}>
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            style={{ width: '100%', maxHeight: 500 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,255,255,0.15)" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map(([from, to]) => {
              const f = pos(from); const t = pos(to);
              const len = Math.hypot(t.x - f.x, t.y - f.y);
              return (
                <g key={`${from}-${to}`}>
                  <line
                    className="arch-edge"
                    x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.3"
                    strokeDasharray="200"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    className="arch-pulse"
                    x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                    stroke="rgba(227,30,36,0.6)"
                    strokeWidth="0.4"
                    strokeDasharray="4 36"
                    strokeDashoffset="0"
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <g key={node.id} className="arch-node" style={{ transformOrigin: `${node.x}% ${node.y}%` }}>
                <circle
                  cx={node.x} cy={node.y} r={node.id === 'app' ? 4.5 : 3.5}
                  fill="var(--bg)" stroke={node.color} strokeWidth="0.5"
                />
                <circle cx={node.x} cy={node.y} r={1.2} fill={node.color} opacity={0.8} />
                <text
                  x={node.x} y={node.y + 6.5}
                  textAnchor="middle"
                  fontSize="2.8"
                  fill={node.color}
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
