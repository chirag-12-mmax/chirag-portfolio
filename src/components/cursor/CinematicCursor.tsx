'use client';
import { useEffect, useRef, useState } from 'react';

export default function CinematicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only on non-touch devices
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
      label.style.left = `${mx}px`; label.style.top = `${my + 30}px`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      rx = lerp(rx, mx, 0.1); ry = lerp(ry, my, 0.1);
      if (ring) { ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    const showLabel = (text: string) => {
      if (!dot || !ring || !label) return;
      label.textContent = text;
      label.style.opacity = '1';
      label.style.transform = 'translate(-50%, 0) translateY(0)';
      dot.style.opacity = '0';
      ring.style.width = '70px';
      ring.style.height = '70px';
    };
    const hideLabel = () => {
      if (!dot || !ring || !label) return;
      label.style.opacity = '0';
      label.style.transform = 'translate(-50%, 0) translateY(10px)';
      dot.style.opacity = '1';
      ring.style.width = '40px';
      ring.style.height = '40px';
    };

    const attachHandlers = () => {
      document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = 'true';
        el.addEventListener('mouseenter', () => showLabel(el.dataset.cursor!));
        el.addEventListener('mouseleave', hideLabel);
      });
    };

    attachHandlers();
    const observer = new MutationObserver(attachHandlers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
