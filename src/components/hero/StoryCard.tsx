'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function StoryCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(cardRef.current, {
        y: -15,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Story progress bar animation
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: 'linear', repeat: -1 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="story-card-wrapper"
      style={{
        position: 'relative',
        width: '280px',
        height: '498px', // 9:16 aspect ratio
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        transform: 'rotate(-4deg)',
        background: '#111',
      }}
    >
      {/* Story Progress Bar */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          height: '3px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '3px',
          zIndex: 10,
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: '100%',
            width: '100%',
            background: '#fff',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Profile Info Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '12px',
          right: '12px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            padding: '2px',
          }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', overflow: 'hidden' }}>
             <Image src="/user_portrait.png" alt="Avatar" width={32} height={32} style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>chirag_shyani</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Portfolio Update • 2h</div>
        </div>
      </div>

      {/* Image */}
      <Image
        src="/user_portrait.png"
        alt="Chirag Shyani"
        fill
        sizes="(max-width: 768px) 280px, 300px"
        style={{ objectFit: 'cover' }}
        priority
      />

      {/* Gradient Overlay for text readability at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          zIndex: 5,
        }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '16px',
          right: '16px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>
            ✨ New Portfolio Update
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)' }}>
            Enterprise apps scaled to 100K+ downloads. Scroll to explore my work! 🚀
          </div>
        </div>
      </div>
    </div>
  );
}
