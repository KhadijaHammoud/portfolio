import { useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

const SETTLE_VIEWPORT = { once: true, margin: '-80px' } as const;

const SETTLE_EASE = [0.22, 1, 0.36, 1] as const;

export function useSettleMotion(delay = 0) {
  const reduceMotion = useReducedMotion();

  return getSettleMotion(reduceMotion, delay);
}

export function getSettleMotion(
  reduceMotion: boolean | null | undefined,
  delay = 0,
) {
  return {
    initial: reduceMotion
      ? { opacity: 0, y: 8 }
      : { opacity: 0, y: 14, x: 14, rotate: 0.8 },
    whileInView: { opacity: 1, y: 0, x: 0, rotate: 0 },
    viewport: SETTLE_VIEWPORT,
    transition: {
      duration: reduceMotion ? 0.35 : 0.55,
      delay,
      ease: SETTLE_EASE,
    },
  } as const;
}

/** Fade-only settle — avoids fighting alignment nudge transforms on mount. */
export function settleWithoutOffset<T extends HTMLMotionProps<'div'>>(settle: T): T {
  return {
    ...settle,
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  };
}
