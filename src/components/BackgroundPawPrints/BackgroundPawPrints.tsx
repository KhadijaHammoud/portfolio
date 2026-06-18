import { useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AutonomousPawMarker from './AutonomousPawMarker';
import {
  buildCrossingWalk,
  crossingDurationForStepCount,
  cycleSecondsForStepCount,
  generateRandomPath,
  IDLE_BEFORE_PAWS_MS,
  SPOTLIGHT_HIDE_MS,
  type WalkPath,
} from './pawWalk.util';

interface SpotlightState {
  opacity: number;
  x: number;
  y: number;
}

const BackgroundPawPrints = () => {
  const reduceMotion = useReducedMotion();
  const [path, setPath] = useState(generateRandomPath);
  const [walkId, setWalkId] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    opacity: 0,
    x: 0,
    y: 0,
  });

  const isIdleRef = useRef(false);
  const moveStopTimerRef = useRef<number | null>(null);
  const autonomousWalkRef = useRef({
    crossingDuration: crossingDurationForStepCount(2),
    path,
    startedAt: performance.now(),
  });

  const walk = useMemo(() => buildCrossingWalk(path), [path]);

  const beginAutonomousSpotlight = useCallback(
    (nextPath: WalkPath, crossingDuration: number) => {
      autonomousWalkRef.current = {
        crossingDuration,
        path: nextPath,
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
        crossingDuration,
        path: autoPath,
        startedAt,
      } = autonomousWalkRef.current;
      const elapsed = (now - startedAt) / 1000;

      if (elapsed >= crossingDuration) {
        setSpotlight((spot) => ({ ...spot, opacity: 0 }));
      } else {
        const t = elapsed / crossingDuration;
        const fadeIn = Math.min(1, elapsed / 0.35);
        setSpotlight({
          opacity: fadeIn,
          x: autoPath.start.x + (autoPath.end.x - autoPath.start.x) * t,
          y: autoPath.start.y + (autoPath.end.y - autoPath.start.y) * t,
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
            opacity: isIdle
              ? `calc(${spotlight.opacity} * var(--spotlight-peak, 0.6))`
              : 0,
            top: `${spotlight.y}%`,
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
              reduceMotion={!!reduceMotion}
              rotate={walk.rotate}
              step={step}
            />
          ))}
      </div>
    </div>
  );
};

export default BackgroundPawPrints;
