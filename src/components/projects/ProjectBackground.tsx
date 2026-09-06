'use client';

export default function ProjectBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Deep dark cinematic base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, #0d0d12 0%, #060608 55%, #030304 100%)',
        }}
      />

      {/* Subtle radial spotlight at focal center */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(500px, 65vw, 1000px)',
          height: 'clamp(400px, 50vh, 700px)',
          background: 'radial-gradient(ellipse, rgba(227, 30, 36, 0.07) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Ambient lower glow near navigator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '180px',
          background: 'radial-gradient(ellipse at bottom, rgba(227, 30, 36, 0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.025,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Vignette edge shadows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.85)',
        }}
      />
    </div>
  );
}
