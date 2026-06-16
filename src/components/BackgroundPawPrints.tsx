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

interface DroppedPaw {
  id: number;
  x: number;
  y: number;
  rotate: number;
  duration: number;
}

/** Fixed distance between paw centers along the path (% of viewport diagonal units). */
const STRIDE_DISTANCE = 9;
const LATERAL_OFFSET = 2.1;
/** Time between each paw landing along the path. */
const STEP_INTERVAL = 0.52;
/** Each paw fades in and out once — does not share the full crossing duration. */
const PAW_DURATION = 0.5;
const PAUSE_AFTER_CROSSING = 2.8;
const CURSOR_IDLE_MS = 60_000;
/** After the last mousemove, treat the cursor as stopped. */
const CURSOR_MOVE_GRACE_MS = 80;
/** Pixels traveled before the next paw lands. */
const CURSOR_STRIDE_PX = 58;
const CURSOR_LATERAL_PCT = 1.6;
const SPOTLIGHT_FADE_MS = 1400;
const SPOTLIGHT_LERP = 0.18;

function crossingDurationForStepCount(stepCount: number): number {
  return (stepCount - 1) * STEP_INTERVAL + PAW_DURATION;
}

function cycleSecondsForStepCount(stepCount: number): number {
  return crossingDurationForStepCount(stepCount) + PAUSE_AFTER_CROSSING;
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function clampPercent(value: number): number {
  return Math.max(1, Math.min(99, value));
}

/** Faster movement → shorter fade so paws step in quicker succession. */
function fadeDurationForSpeed(pxPerMs: number): number {
  const min = 0.24;
  const max = 0.7;
  const normalized = Math.min(1, pxPerMs / 0.9);
  return max - normalized * (max - min);
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
  const [droppedPaws, setDroppedPaws] = useState<DroppedPaw[]>([]);
  const [followsCursor, setFollowsCursor] = useState(false);
  const [isCursorMoving, setIsCursorMoving] = useState(false);
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const cursorRef = useRef<Point | null>(null);
  const prevCursorRef = useRef<Point | null>(null);
  const lastMoveAtRef = useRef(0);
  const lastMoveEventAtRef = useRef(0);
  const followsCursorRef = useRef(false);
  const isCursorMovingRef = useRef(false);
  const moveStopTimerRef = useRef<number | null>(null);
  const strideAccumulatorRef = useRef(0);
  const pawSideRef = useRef(1);
  const pawIdRef = useRef(0);
  const spotlightModeRef = useRef<'cursor' | 'autonomous'>('autonomous');
  const autonomousWalkRef = useRef({
    path,
    crossingDuration: crossingDurationForStepCount(2),
    startedAt: performance.now(),
  });

  const walk = useMemo(() => buildCrossingWalk(path), [path]);

  const beginAutonomousSpotlight = useCallback(
    (nextPath: WalkPath, crossingDuration: number) => {
      spotlightModeRef.current = 'autonomous';
      autonomousWalkRef.current = {
        path: nextPath,
        crossingDuration,
        startedAt: performance.now(),
      };
    },
    [],
  );

  const removeDroppedPaw = useCallback((id: number) => {
    setDroppedPaws((paws) => paws.filter((paw) => paw.id !== id));
  }, []);

  const clearDroppedPaws = useCallback(() => {
    setDroppedPaws([]);
    strideAccumulatorRef.current = 0;
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const dropPaw = (point: Point, angleDeg: number, speedPxPerMs: number) => {
      const perpRad = ((angleDeg + 90) * Math.PI) / 180;
      const side = pawSideRef.current;
      pawSideRef.current *= -1;

      const paw: DroppedPaw = {
        id: ++pawIdRef.current,
        x: clampPercent(
          point.x + Math.cos(perpRad) * CURSOR_LATERAL_PCT * side,
        ),
        y: clampPercent(
          point.y + Math.sin(perpRad) * CURSOR_LATERAL_PCT * side,
        ),
        rotate: angleDeg + 60,
        duration: fadeDurationForSpeed(speedPxPerMs),
      };

      setDroppedPaws((paws) => [...paws, paw]);
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const next: Point = {
        x: clampPercent((e.clientX / window.innerWidth) * 100),
        y: clampPercent((e.clientY / window.innerHeight) * 100),
      };
      const prev = prevCursorRef.current;

      cursorRef.current = next;
      spotlightModeRef.current = 'cursor';
      lastMoveAtRef.current = now;

      if (moveStopTimerRef.current !== null) {
        window.clearTimeout(moveStopTimerRef.current);
      }
      if (!isCursorMovingRef.current) {
        isCursorMovingRef.current = true;
        setIsCursorMoving(true);
      }
      moveStopTimerRef.current = window.setTimeout(() => {
        isCursorMovingRef.current = false;
        setIsCursorMoving(false);
        clearDroppedPaws();
        moveStopTimerRef.current = null;
      }, CURSOR_MOVE_GRACE_MS);

      if (!followsCursorRef.current) {
        followsCursorRef.current = true;
        spotlightModeRef.current = 'cursor';
        setFollowsCursor(true);
        strideAccumulatorRef.current = 0;
        pawSideRef.current = 1;
      }

      setSpotlight({ x: next.x, y: next.y, opacity: 1 });

      if (prev) {
        const dxPx = ((next.x - prev.x) / 100) * window.innerWidth;
        const dyPx = ((next.y - prev.y) / 100) * window.innerHeight;
        const distPx = Math.hypot(dxPx, dyPx);
        const deltaMs = Math.max(now - lastMoveEventAtRef.current, 8);
        const speedPxPerMs = distPx / deltaMs;

        if (distPx > 0.5) {
          const angleDeg = (Math.atan2(dyPx, dxPx) * 180) / Math.PI;
          strideAccumulatorRef.current += distPx;

          if (strideAccumulatorRef.current >= CURSOR_STRIDE_PX) {
            strideAccumulatorRef.current %= CURSOR_STRIDE_PX;
            dropPaw(next, angleDeg, speedPxPerMs);
          }
        }
      } else {
        dropPaw(next, 0, 0);
      }

      prevCursorRef.current = next;
      lastMoveEventAtRef.current = now;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (moveStopTimerRef.current !== null) {
        window.clearTimeout(moveStopTimerRef.current);
      }
    };
  }, [reduceMotion, clearDroppedPaws]);

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      if (!followsCursorRef.current) return;
      if (performance.now() - lastMoveAtRef.current <= CURSOR_IDLE_MS) return;

      followsCursorRef.current = false;
      isCursorMovingRef.current = false;
      setFollowsCursor(false);
      setIsCursorMoving(false);
      clearDroppedPaws();
      cursorRef.current = null;
      prevCursorRef.current = null;
      const nextPath = generateRandomPath();
      const nextWalk = buildCrossingWalk(nextPath);
      beginAutonomousSpotlight(nextPath, nextWalk.crossingDuration);
      setPath(nextPath);
      setWalkId((walk) => walk + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [reduceMotion, clearDroppedPaws, beginAutonomousSpotlight]);

  useEffect(() => {
    if (reduceMotion || followsCursor) return;

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
  }, [
    reduceMotion,
    followsCursor,
    walk.steps.length,
    beginAutonomousSpotlight,
  ]);

  useEffect(() => {
    if (reduceMotion || followsCursor) return;
    beginAutonomousSpotlight(path, walk.crossingDuration);
  }, [
    walkId,
    path,
    walk.crossingDuration,
    reduceMotion,
    followsCursor,
    beginAutonomousSpotlight,
  ]);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;

    const tick = (now: number) => {
      if (spotlightModeRef.current === 'cursor' && cursorRef.current) {
        const target = cursorRef.current;
        setSpotlight((spot) => ({
          x: isCursorMovingRef.current
            ? spot.x + (target.x - spot.x) * SPOTLIGHT_LERP
            : target.x,
          y: isCursorMovingRef.current
            ? spot.y + (target.y - spot.y) * SPOTLIGHT_LERP
            : target.y,
          opacity: 1,
        }));
      } else if (spotlightModeRef.current === 'autonomous') {
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
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

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
            transition: followsCursor
              ? undefined
              : `opacity ${SPOTLIGHT_FADE_MS}ms ease-in-out`,
          }}
        />
      )}

      <div
        className='absolute inset-0'
        style={{ opacity: 'var(--paw-strength, 1)' }}
      >
        {followsCursor && isCursorMoving
          ? droppedPaws.map((paw) => (
              <DroppedPawMarker
                key={paw.id}
                paw={paw}
                reduceMotion={!!reduceMotion}
                onComplete={removeDroppedPaw}
              />
            ))
          : !followsCursor
            ? walk.steps.map((step) => (
                <AutonomousPawMarker
                  key={`${walkId}-${step.index}`}
                  step={step}
                  rotate={walk.rotate}
                  reduceMotion={!!reduceMotion}
                />
              ))
            : null}
      </div>
    </div>
  );
};

const DroppedPawMarker: React.FC<{
  paw: DroppedPaw;
  reduceMotion: boolean;
  onComplete: (id: number) => void;
}> = ({ paw, reduceMotion, onComplete }) => {
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(() => onComplete(paw.id), paw.duration * 1000);
    return () => window.clearTimeout(id);
  }, [paw.id, paw.duration, onComplete, reduceMotion]);

  return (
    <div
      className='absolute -translate-x-1/2 -translate-y-1/2'
      style={{ left: `${paw.x}%`, top: `${paw.y}%` }}
    >
      <div className='relative z-[1]' style={{ rotate: `${paw.rotate}deg` }}>
        <div
          className={`text-secondary ${
            reduceMotion ? 'opacity-[0.12]' : 'animate-paw-print-step'
          }`}
          style={
            reduceMotion ? undefined : { animationDuration: `${paw.duration}s` }
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
