import { useReducedMotion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useAlignment } from '../contexts';

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: `sparkle-${i}`,
  left: `${6 + ((i * 11) % 88)}%`,
  size: 10 + (i % 7) * 3,
  delay: i * 0.08,
  duration: 1.9 + (i % 5) * 0.28,
  drift: i % 2 === 0 ? -22 : 26,
}));

const CELEBRATION_MS = 4500;

const AlignCelebration = () => {
  const reduceMotion = useReducedMotion();
  const { isGameEnabled, celebrationEpoch } = useAlignment();
  const [active, setActive] = useState(false);
  const lastCelebrationRef = useRef(0);

  useEffect(() => {
    if (!isGameEnabled || reduceMotion === true) return;
    if (
      celebrationEpoch === 0 ||
      celebrationEpoch === lastCelebrationRef.current
    ) {
      return;
    }

    lastCelebrationRef.current = celebrationEpoch;
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), CELEBRATION_MS);
    return () => window.clearTimeout(timer);
  }, [celebrationEpoch, isGameEnabled, reduceMotion]);

  if (!isGameEnabled || !active) return null;

  return (
    <div
      key={celebrationEpoch}
      className='align-celebration pointer-events-none fixed inset-0 z-[60] overflow-hidden'
      aria-hidden
    >
      {SPARKLES.map((sparkle) => (
        <span
          key={sparkle.id}
          className='align-celebration-sparkle text-accent'
          style={
            {
              left: sparkle.left,
              '--sparkle-drift': `${sparkle.drift}px`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            } as CSSProperties
          }
        >
          <Sparkle
            size={sparkle.size}
            fill='currentColor'
            stroke='currentColor'
            strokeWidth={1.25}
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
};

export default AlignCelebration;
