import { useReducedMotion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
/** Mouse must be still this long before idle paws and spotlight resume. */
const IDLE_BEFORE_PAWS_MS = 10000;
const SPOTLIGHT_HIDE_MS = 280;

function crossingDurationForStepCount(stepCount: number): number {
  return (stepCount - 1) * STEP_INTERVAL + PAW_DURATION;
}

function cycleSecondsForStepCount(stepCount: number): number {
  return crossingDurationForStepCount(stepCount) + PAUSE_AFTER_CROSSING;
}

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

const BackgroundPawPrints = () => {
  const reduceMotion = useReducedMotion();
  const [path, setPath] = useState(generateRandomPath);
  const [walkId, setWalkId] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const isIdleRef = useRef(false);
  const moveStopTimerRef = useRef<number | null>(null);
  const autonomousWalkRef = useRef({
    path,
    crossingDuration: crossingDurationForStepCount(2),
    startedAt: performance.now(),
  });

  const walk = useMemo(() => buildCrossingWalk(path), [path]);

  const beginAutonomousSpotlight = useCallback(
    (nextPath: WalkPath, crossingDuration: number) => {
      autonomousWalkRef.current = {
        path: nextPath,
        crossingDuration,
        startedAt: performance.now(),
      };
    },
    [],
  );

  const resumeAutonomousWalk = useCallback(() => {
    isIdleRef.current = true;
    setIsIdle(true);
    const nextPath = generateRandomPath();
    const nextWalk = buildCrossingWalk(nextPath);
    beginAutonomousSpotlight(nextPath, nextWalk.crossingDuration);
    setPath(nextPath);
    setWalkId((walk) => walk + 1);
  }, [beginAutonomousSpotlight]);

  useEffect(() => {
    if (reduceMotion) return;

    const scheduleResume = () => {
      if (moveStopTimerRef.current !== null) {
        window.clearTimeout(moveStopTimerRef.current);
      }
      moveStopTimerRef.current = window.setTimeout(() => {
        resumeAutonomousWalk();
        moveStopTimerRef.current = null;
      }, IDLE_BEFORE_PAWS_MS);
    };

    const onActivity = () => {
      if (isIdleRef.current) {
        isIdleRef.current = false;
        setIsIdle(false);
      }
      setSpotlight((spot) => ({ ...spot, opacity: 0 }));
      scheduleResume();
    };

    scheduleResume();

    window.addEventListener('mousemove', onActivity, { passive: true });
    window.addEventListener('scroll', onActivity, { passive: true });
    document.addEventListener('scroll', onActivity, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('scroll', onActivity);
      document.removeEventListener('scroll', onActivity);
      if (moveStopTimerRef.current !== null) {
        window.clearTimeout(moveStopTimerRef.current);
      }
    };
  }, [reduceMotion, resumeAutonomousWalk]);

  useEffect(() => {
    if (reduceMotion || !isIdle) return;

    const id = window.setInterval(
      () => {
        const nextPath = generateRandomPath();
        const nextWalk = buildCrossingWalk(nextPath);
        beginAutonomousSpotlight(nextPath, nextWalk.crossingDuration);
        setPath(nextPath);
        setWalkId((walk) => walk + 1);
      },
      cycleSecondsForStepCount(walk.steps.length) * 1000,
    );

    return () => window.clearInterval(id);
  }, [reduceMotion, isIdle, walk.steps.length, beginAutonomousSpotlight]);

  useEffect(() => {
    if (reduceMotion || !isIdle) return;
    beginAutonomousSpotlight(path, walk.crossingDuration);
  }, [
    walkId,
    path,
    walk.crossingDuration,
    reduceMotion,
    isIdle,
    beginAutonomousSpotlight,
  ]);

  useEffect(() => {
    if (reduceMotion || !isIdle) return;

    let raf = 0;

    const tick = (now: number) => {
      const {
        path: autoPath,
        crossingDuration,
        startedAt,
      } = autonomousWalkRef.current;
      const elapsed = (now - startedAt) / 1000;

      if (elapsed >= crossingDuration) {
        setSpotlight((spot) => ({ ...spot, opacity: 0 }));
      } else {
        const t = elapsed / crossingDuration;
        const fadeIn = Math.min(1, elapsed / 0.35);
        setSpotlight({
          x: autoPath.start.x + (autoPath.end.x - autoPath.start.x) * t,
          y: autoPath.start.y + (autoPath.end.y - autoPath.start.y) * t,
          opacity: fadeIn,
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, isIdle]);

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
            opacity: isIdle
              ? `calc(${spotlight.opacity} * var(--spotlight-peak, 0.6))`
              : 0,
            transition: isIdle
              ? 'none'
              : `opacity ${SPOTLIGHT_HIDE_MS}ms ease-out`,
          }}
        />
      )}

      <div
        className='absolute inset-0'
        style={{ opacity: 'var(--paw-strength, 1)' }}
      >
        {isIdle &&
          walk.steps.map((step) => (
            <AutonomousPawMarker
              key={`${walkId}-${step.index}`}
              step={step}
              rotate={walk.rotate}
              reduceMotion={!!reduceMotion}
            />
          ))}
      </div>
    </div>
  );
};

const AutonomousPawMarker: React.FC<{
  step: PawStep;
  rotate: number;
  reduceMotion: boolean;
}> = ({ step, rotate, reduceMotion }) => (
  <div
    className='absolute -translate-x-1/2 -translate-y-1/2'
    style={{ left: step.left, top: step.top }}
  >
    <div className='relative z-[1]' style={{ rotate: `${rotate}deg` }}>
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
          className='paw-print-filled h-9 w-9 sm:h-11 sm:w-11'
        />
      </div>
    </div>
  </div>
);

export default BackgroundPawPrints;
