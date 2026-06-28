import { PAW_DURATION, STEP_INTERVAL } from './ambient.const';
import type { PawStep, WalkPath } from './ambient.type';

interface CrossingWalk {
  crossingDuration: number;
  /** Same rotation for every paw — aligned with travel direction. */
  rotate: number;
  steps: PawStep[];
}

/** Fixed distance between paw centers along the path (% of viewport diagonal units). */
const STRIDE_DISTANCE = 9;
const LATERAL_OFFSET = 2.1;
const PAUSE_AFTER_CROSSING = 2.8;

export function crossingDurationForStepCount(stepCount: number): number {
  return (stepCount - 1) * STEP_INTERVAL + PAW_DURATION;
}

export function cycleSecondsForStepCount(stepCount: number): number {
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

export function generateRandomPath(): WalkPath {
  const build =
    OPPOSITE_PATH_BUILDERS[
      Math.floor(Math.random() * OPPOSITE_PATH_BUILDERS.length)
    ];
  return build();
}

export function buildCrossingWalk(path: WalkPath): CrossingWalk {
  const { end, start } = path;
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
      index: i,
      left: `${cx + Math.cos(perpRad) * LATERAL_OFFSET * side}%`,
      top: `${cy + Math.sin(perpRad) * LATERAL_OFFSET * side}%`,
    };
  });

  return {
    crossingDuration: crossingDurationForStepCount(stepCount),
    rotate: angleDeg + 60,
    steps,
  };
}
