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

const CARD_SNAP_THRESHOLD_PX = 42;

type CardNudge = (typeof CARD_NUDGES)[number];

function getCardNudge(index: number): CardNudge {
  return CARD_NUDGES[index % CARD_NUDGES.length];
}

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
  onSnap: () => void;
};

export function useCardDragAlign({
  enabled,
  aligned,
  index,
  gameEpoch,
  onSnap,
}: UseCardDragAlignOptions) {
  const nudge = getCardNudge(index);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, deltaX: 0, deltaY: 0 });
  const hasDraggedRef = useRef(false);

  const totalX = nudge.x + delta.x;
  const totalY = nudge.y + delta.y;

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

    const distance = Math.hypot(totalX, totalY);
    if (distance <= CARD_SNAP_THRESHOLD_PX) {
      onSnap();
      resetDrag();
      return;
    }

    setDragging(false);
    pointerIdRef.current = null;
    setDelta({ x: 0, y: 0 });
  }, [dragging, onSnap, resetDrag, totalX, totalY]);

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
  totalX,
  totalY,
  animateRelease,
}: {
  enabled: boolean;
  aligned: boolean;
  dragging: boolean;
  nudge: CardNudge;
  totalX: number;
  totalY: number;
  animateRelease: boolean;
}): CSSProperties | undefined {
  if (!enabled || aligned) return undefined;

  const rotate = getCardDragRotation(nudge, totalX, totalY);

  return {
    transform: `translate(${totalX}px, ${totalY}px) rotate(${rotate}deg)`,
    transition:
      dragging || !animateRelease
        ? 'none'
        : 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
    touchAction: 'none',
  };
}
