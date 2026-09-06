'use client';
import { useEffect, useState } from 'react';

export default function TypingAnimation({ strings, delay = 2000 }: { strings: string[], delay?: number }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const currentStr = strings[index % strings.length];
    if (!currentStr) return;

    if (subIndex === currentStr.length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, Math.random() * 150));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, strings, delay]);

  if (!strings || strings.length === 0) return null;
  const currentStr = strings[index % strings.length] ?? '';

  return (
    <span style={{ display: 'inline-block', minWidth: '280px' }}>
      {`${currentStr.substring(0, subIndex)}${blink ? '|' : ' '}`}
    </span>
  );
}
