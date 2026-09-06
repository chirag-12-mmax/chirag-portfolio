'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Props { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: Props) {
  const screenRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(5);

  useEffect(() => {
    const tl = gsap.timeline();
    const letters = lettersRef.current?.querySelectorAll('.load-letter');
    const countEl = countRef.current;
    const subEl = subRef.current;

    // Letters appear staggered
    tl.fromTo(letters ?? [], { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out',
    });

    // Countdown
    tl.fromTo(countEl, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '+=0.2');
    [5, 4, 3, 2, 1].forEach((n, i) => {
      tl.call(() => setCount(n), [], `+=0.18`);
    });

    // Sub text
    tl.fromTo(subEl, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');

    // Fade out loading screen
    tl.to(screenRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in', delay: 0.3 });
    tl.call(() => onComplete());

    return () => { tl.kill(); };
  }, [onComplete]);

  const name = 'CHIRAG';

  return (
    <div ref={screenRef} className="loading-screen" style={{ fontFamily: 'var(--font-head)' }}>
      {/* Letters */}
      <div ref={lettersRef} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
        {name.split('').map((l, i) => (
          <span
            key={i}
            className="load-letter"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--white)',
            }}
          >
            {l}
          </span>
        ))}
      </div>

      {/* Countdown */}
      <div ref={countRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 700,
            color: 'var(--red)',
            lineHeight: 1,
            minWidth: '1.2ch',
            textAlign: 'center',
          }}
        >
          0{count}
        </span>
        <div
          style={{
            width: 120,
            height: 1,
            background: 'var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              background: 'var(--red)',
              width: `${((5 - count) / 4) * 100}%`,
              transition: 'width 0.18s linear',
            }}
          />
        </div>
      </div>

      {/* Sub text */}
      <div
        ref={subRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}
      >
        Initializing Experience
      </div>
    </div>
  );
}
