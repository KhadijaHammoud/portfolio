import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Bubble {
  size: number;
  color: string;
  top: string;
  left: string;
  duration: number;
  delay: number;
  xRange: number;
  yRange: number;
  hideOnMobile?: boolean;
}

const makeBubble = (rgb: string) =>
  `radial-gradient(circle at 50% 50%, rgba(${rgb}, 1) 0%, rgba(${rgb}, 0.7) 30%, rgba(${rgb}, 0.25) 55%, rgba(${rgb}, 0) 75%)`;

const bubbles: Bubble[] = [
  {
    size: 560,
    color: makeBubble('124, 92, 255'),
    top: '5%',
    left: '-5%',
    duration: 28,
    delay: 0,
    xRange: 160,
    yRange: 100,
  },
  {
    size: 480,
    color: makeBubble('165, 139, 255'),
    top: '15%',
    left: '65%',
    duration: 34,
    delay: 2,
    xRange: -180,
    yRange: 120,
  },
  {
    size: 620,
    color: makeBubble('91, 61, 255'),
    top: '55%',
    left: '-8%',
    duration: 42,
    delay: 4,
    xRange: 140,
    yRange: -100,
    hideOnMobile: true,
  },
  {
    size: 400,
    color: makeBubble('213, 112, 255'),
    top: '35%',
    left: '40%',
    duration: 30,
    delay: 1,
    xRange: -120,
    yRange: 140,
  },
  {
    size: 520,
    color: makeBubble('108, 141, 255'),
    top: '70%',
    left: '60%',
    duration: 38,
    delay: 3,
    xRange: -140,
    yRange: -90,
    hideOnMobile: true,
  },
];

export const BackgroundBubbles: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
      style={{ opacity: 'var(--bubble-strength, 1)' }}
    >
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, b.xRange, 0, -b.xRange * 0.6, 0],
                  y: [0, b.yRange, -b.yRange * 0.5, b.yRange * 0.4, 0],
                }
          }
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            backgroundImage: b.color,
            filter: 'blur(30px)',
          }}
          className={`absolute rounded-full ${
            b.hideOnMobile ? 'hidden md:block' : ''
          }`}
        />
      ))}
    </div>
  );
};
