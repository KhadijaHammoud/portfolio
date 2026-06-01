import { useReducedMotion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface WalkPath {
  start: Point;
  end: Point;
}

interface PawStep {
  left: string;
  top: string;
  index: number;
}

interface CrossingWalk {
  steps: PawStep[];
  /** Same rotation for every paw — aligned with travel direction. */
  rotate: number;
  crossingDuration: number;
}

/** Fixed distance between paw centers along the path (% of viewport diagonal units). */
const STRIDE_DISTANCE = 9;
const LATERAL_OFFSET = 2.1;
/** Time between each paw landing along the path. */
const STEP_INTERVAL = 0.52;
/** Each paw fades in and out once — does not share the full crossing duration. */
const PAW_DURATION = 0.5;
const PAUSE_AFTER_CROSSING = 2.8;

function crossingDurationForStepCount(stepCount: number): number {
  return (stepCount - 1) * STEP_INTERVAL + PAW_DURATION;
}

function cycleSecondsForStepCount(stepCount: number): number {
  return crossingDurationForStepCount(stepCount) + PAUSE_AFTER_CROSSING;
}
const SPOTLIGHT_FADE_MS = 1400;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** Each path crosses the full viewport between opposite ends. */
const OPPOSITE_PATH_BUILDERS: Array<() => WalkPath> = [
  () => ({
    start: { x: randomBetween(1, 5), y: randomBetween(18, 82) },
    end: { x: randomBetween(95, 99), y: randomBetween(18, 82) },
  }),
  () => ({
    start: { x: randomBetween(95, 99), y: randomBetween(18, 82) },
    end: { x: randomBetween(1, 5), y: randomBetween(18, 82) },
  }),
  () => ({
    start: { x: randomBetween(18, 82), y: randomBetween(1, 5) },
    end: { x: randomBetween(18, 82), y: randomBetween(95, 99) },
  }),
  () => ({
    start: { x: randomBetween(18, 82), y: randomBetween(95, 99) },
    end: { x: randomBetween(18, 82), y: randomBetween(1, 5) },
  }),
  () => ({
    start: { x: randomBetween(1, 8), y: randomBetween(1, 8) },
    end: { x: randomBetween(92, 99), y: randomBetween(92, 99) },
  }),
  () => ({
    start: { x: randomBetween(92, 99), y: randomBetween(92, 99) },
    end: { x: randomBetween(1, 8), y: randomBetween(1, 8) },
  }),
  () => ({
    start: { x: randomBetween(92, 99), y: randomBetween(1, 8) },
    end: { x: randomBetween(1, 8), y: randomBetween(92, 99) },
  }),
  () => ({
    start: { x: randomBetween(1, 8), y: randomBetween(92, 99) },
    end: { x: randomBetween(92, 99), y: randomBetween(1, 8) },
  }),
];

function generateRandomPath(): WalkPath {
  const build =
    OPPOSITE_PATH_BUILDERS[
      Math.floor(Math.random() * OPPOSITE_PATH_BUILDERS.length)
    ];
  return build();
}

function buildCrossingWalk(path: WalkPath): CrossingWalk {
  const { start, end } = path;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const pathLength = Math.hypot(dx, dy);
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  const perpRad = ((angleDeg + 90) * Math.PI) / 180;
  const unitX = pathLength > 0 ? dx / pathLength : 0;
  const unitY = pathLength > 0 ? dy / pathLength : 0;

  const stepCount = Math.max(2, Math.floor(pathLength / STRIDE_DISTANCE) + 1);

  const steps = Array.from({ length: stepCount }, (_, i) => {
    const along = Math.min(i * STRIDE_DISTANCE, pathLength);
    const cx = start.x + unitX * along;
    const cy = start.y + unitY * along;
    const side = i % 2 === 0 ? 1 : -1;

    return {
      left: `${cx + Math.cos(perpRad) * LATERAL_OFFSET * side}%`,
      top: `${cy + Math.sin(perpRad) * LATERAL_OFFSET * side}%`,
      index: i,
    };
  });

  return {
    steps,
    rotate: angleDeg + 60,
    crossingDuration: crossingDurationForStepCount(stepCount),
  };
}

interface SpotlightState {
  x: number;
  y: number;
  opacity: number;
}

export const BackgroundPawPrints: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [path, setPath] = useState(generateRandomPath);
  const [walkId, setWalkId] = useState(0);
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const walk = useMemo(() => buildCrossingWalk(path), [path]);

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setPath(generateRandomPath());
      setWalkId((id) => id + 1);
    }, cycleSecondsForStepCount(walk.steps.length) * 1000);

    return () => window.clearInterval(id);
  }, [reduceMotion, walk.steps.length]);

  useEffect(() => {
    if (reduceMotion) {
      setSpotlight({ x: path.start.x, y: path.start.y, opacity: 0 });
      return;
    }

    let raf = 0;
    let fadeInRaf = 0;
    const started = performance.now();

    setSpotlight({
      x: path.start.x,
      y: path.start.y,
      opacity: 0,
    });

    fadeInRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSpotlight((s) => ({ ...s, opacity: 1 }));
      });
    });

    const tick = (now: number) => {
      const elapsed = (now - started) / 1000;

      if (elapsed >= walk.crossingDuration) {
        setSpotlight((s) => ({ ...s, opacity: 0 }));
        return;
      }

      const t = elapsed / walk.crossingDuration;
      setSpotlight((s) => ({
        ...s,
        x: path.start.x + (path.end.x - path.start.x) * t,
        y: path.start.y + (path.end.y - path.start.y) * t,
      }));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeInRaf);
    };
  }, [walkId, path, reduceMotion, walk.crossingDuration]);

  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-0 overflow-hidden'
    >
      {!reduceMotion && (
        <div
          aria-hidden
          className='spotlight-blob absolute h-[500px] w-[min(900px,92vw)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]'
          style={{
            left: `${spotlight.x}%`,
            top: `${spotlight.y}%`,
            opacity: `calc(${spotlight.opacity} * var(--spotlight-peak, 0.6))`,
            transition: `opacity ${SPOTLIGHT_FADE_MS}ms ease-in-out`,
          }}
        />
      )}

      <div
        className='absolute inset-0'
        style={{ opacity: 'var(--paw-strength, 1)' }}
      >
      {walk.steps.map((step) => (
        <div
          key={`${walkId}-${step.index}`}
          className='absolute -translate-x-1/2 -translate-y-1/2'
          style={{ left: step.left, top: step.top }}
        >
          <div className='relative z-[1]' style={{ rotate: `${walk.rotate}deg` }}>
            <div
              className={`text-secondary ${
                reduceMotion ? 'opacity-[0.12]' : 'animate-paw-print-step'
              }`}
              style={
                reduceMotion
                  ? undefined
                  : {
                      animationDuration: `${PAW_DURATION}s`,
                      animationDelay: `${step.index * STEP_INTERVAL}s`,
                    }
              }
            >
              <PawPrint
                aria-hidden
                fill='currentColor'
                stroke='currentColor'
                strokeWidth={1.25}
                className='paw-print-filled h-12 w-12 sm:h-16 sm:w-16'
              />
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
