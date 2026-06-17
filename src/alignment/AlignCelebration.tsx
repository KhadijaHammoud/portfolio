import { useReducedMotion } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useAlignment } from './AlignmentContext';

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
  const { isGameEnabled, isComplete } = useAlignment();
  const [active, setActive] = useState(false);
  const wasCompleteRef = useRef(false);

  useEffect(() => {
    if (!isGameEnabled || reduceMotion) return;

    if (!isComplete) {
      wasCompleteRef.current = false;
      return;
    }

    if (wasCompleteRef.current) return;
    wasCompleteRef.current = true;

    setActive(true);
    const timer = window.setTimeout(() => setActive(false), CELEBRATION_MS);
    return () => window.clearTimeout(timer);
  }, [isComplete, isGameEnabled, reduceMotion]);

  if (!isGameEnabled || !active) return null;

  return (
    <div
      className='align-celebration pointer-events-none fixed inset-0 z-[45] overflow-hidden'
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
