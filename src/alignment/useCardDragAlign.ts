import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react';

const CARD_NUDGES = [
  { rotate: -6.5, x: -32, y: 18 },
  { rotate: 5.8, x: 36, y: -16 },
  { rotate: -5.2, x: -22, y: 24 },
  { rotate: 6.2, x: 28, y: -20 },
] as const;

/** Rotation-only nudges for vertically stacked cards (e.g. Experience timeline). */
const STACK_CARD_NUDGES = [
  { rotate: -4.5, x: 0, y: 0 },
  { rotate: 4, x: 0, y: 0 },
  { rotate: -3.5, x: 0, y: 0 },
  { rotate: 4.5, x: 0, y: 0 },
] as const;

type CardNudgeProfile = 'spread' | 'stack';

type CardNudge = {
  readonly rotate: number;
  readonly x: number;
  readonly y: number;
};

function getCardNudge(index: number, profile: CardNudgeProfile): CardNudge {
  const pool = profile === 'stack' ? STACK_CARD_NUDGES : CARD_NUDGES;
  return pool[index % pool.length];
}

const CARD_SNAP_THRESHOLD_PX = 42;

function getCardDragRotation(
  nudge: CardNudge,
  totalX: number,
  totalY: number,
): number {
  const distance = Math.hypot(totalX, totalY);
  const origin = Math.hypot(nudge.x, nudge.y) || 1;
  const progress = Math.min(1, distance / origin);
  return nudge.rotate * progress;
}

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-align-chip], [data-align-ignore]';

type UseCardDragAlignOptions = {
  enabled: boolean;
  aligned: boolean;
  index: number;
  gameEpoch: number;
  nudgeProfile?: CardNudgeProfile;
  onSnap: () => void;
};

export function useCardDragAlign({
  enabled,
  aligned,
  index,
  gameEpoch,
  nudgeProfile = 'spread',
  onSnap,
}: UseCardDragAlignOptions) {
  const nudge = getCardNudge(index, nudgeProfile);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, deltaX: 0, deltaY: 0 });
  const hasDraggedRef = useRef(false);

  const totalX = nudgeProfile === 'stack' ? delta.x : nudge.x + delta.x;
  const totalY = nudgeProfile === 'stack' ? delta.y : nudge.y + delta.y;

  const resetDrag = useCallback(() => {
    setDragging(false);
    pointerIdRef.current = null;
    hasDraggedRef.current = false;
    setDelta({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetDrag();
  }, [gameEpoch, resetDrag]);

  const finishDrag = useCallback(() => {
    if (!dragging) return;

    const snapDistance =
      nudgeProfile === 'stack'
        ? Math.hypot(delta.x, delta.y)
        : Math.hypot(totalX, totalY);

    if (snapDistance <= CARD_SNAP_THRESHOLD_PX) {
      onSnap();
      resetDrag();
      return;
    }

    setDragging(false);
    pointerIdRef.current = null;
    setDelta({ x: 0, y: 0 });
  }, [
    delta.x,
    delta.y,
    dragging,
    nudgeProfile,
    onSnap,
    resetDrag,
    totalX,
    totalY,
  ]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!enabled || aligned || event.button !== 0) return;
      if ((event.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;

      pointerIdRef.current = event.pointerId;
      hasDraggedRef.current = true;
      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        deltaX: delta.x,
        deltaY: delta.y,
      };
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [aligned, delta.x, delta.y, enabled],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!dragging || pointerIdRef.current !== event.pointerId) return;

      const dx = event.clientX - dragStartRef.current.x;
      const dy = event.clientY - dragStartRef.current.y;

      setDelta({
        x: dragStartRef.current.deltaX + dx,
        y: dragStartRef.current.deltaY + dy,
      });
    },
    [dragging],
  );

  const handlePointerEnd = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (pointerIdRef.current !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      finishDrag();
    },
    [finishDrag],
  );

  const dragStyle = buildDragStyle({
    enabled,
    aligned,
    dragging,
    nudge,
    nudgeProfile,
    totalX,
    totalY,
    animateRelease: hasDraggedRef.current,
  });

  return {
    dragging,
    dragStyle,
    dragHandlers: enabled
      ? {
          onPointerDown: handlePointerDown,
          onPointerMove: handlePointerMove,
          onPointerUp: handlePointerEnd,
          onPointerCancel: handlePointerEnd,
        }
      : {},
  };
}

function buildDragStyle({
  enabled,
  aligned,
  dragging,
  nudge,
  nudgeProfile,
  totalX,
  totalY,
  animateRelease,
}: {
  enabled: boolean;
  aligned: boolean;
  dragging: boolean;
  nudge: CardNudge;
  nudgeProfile: CardNudgeProfile;
  totalX: number;
  totalY: number;
  animateRelease: boolean;
}): CSSProperties | undefined {
  if (!enabled || aligned) return undefined;

  const rotate =
    nudgeProfile === 'stack'
      ? nudge.rotate
      : getCardDragRotation(nudge, totalX, totalY);

  return {
    transform: `translate(${totalX}px, ${totalY}px) rotate(${rotate}deg)`,
    transition:
      dragging || !animateRelease
        ? 'none'
        : 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
    touchAction: 'none',
  };
}
