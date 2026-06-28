import { useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import { useAlignment } from '../contexts';
import { cn } from '../utils';
import { AlignableVariant, NudgeProfile } from '../types';
import { useAlignChipFieldId } from './AlignChipFieldContext';

const CHIP_NUDGES = [
  { rotate: '-5.5deg', x: '9px', y: '7px' },
  { rotate: '4.8deg', x: '-10px', y: '-6px' },
  { rotate: '-4.5deg', x: '7px', y: '-9px' },
  { rotate: '5.2deg', x: '-8px', y: '8px' },
  { rotate: '-4deg', x: '11px', y: '5px' },
  { rotate: '5.8deg', x: '-7px', y: '-10px' },
] as const;

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

type CardNudge = {
  readonly rotate: number;
  readonly x: number;
  readonly y: number;
};

const CARD_SNAP_THRESHOLD_PX = 42;

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-align-chip], [data-align-ignore]';

type UseAlignableOptions = {
  id: string;
  index: number;
  variant: AlignableVariant;
  /** `stack` keeps rotation-only nudges for vertically stacked cards. */
  nudgeProfile?: NudgeProfile;
};

function getCardNudge(index: number, profile: NudgeProfile): CardNudge {
  const pool = profile === NudgeProfile.STACK ? STACK_CARD_NUDGES : CARD_NUDGES;
  return pool[index % pool.length];
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

function chipNudgeStyle(index: number): CSSProperties {
  const nudge = CHIP_NUDGES[index % CHIP_NUDGES.length];
  return {
    '--chip-rotate': nudge.rotate,
    '--chip-x': nudge.x,
    '--chip-y': nudge.y,
  } as CSSProperties;
}

function passiveAlignProps(variant: AlignableVariant) {
  return {
    className: cn(variant === AlignableVariant.CHIP && 'chip'),
  };
}

function buildDragStyle({
  aligned,
  animateRelease,
  dragging,
  enabled,
  nudge,
  nudgeProfile,
  totalX,
  totalY,
}: {
  aligned: boolean;
  animateRelease: boolean;
  dragging: boolean;
  enabled: boolean;
  nudge: CardNudge;
  nudgeProfile: NudgeProfile;
  totalX: number;
  totalY: number;
}): CSSProperties | undefined {
  if (!enabled || aligned) return undefined;

  const rotate =
    nudgeProfile === NudgeProfile.STACK
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

function useCardDragAlign({
  aligned,
  enabled,
  gameEpoch,
  index,
  nudgeProfile = NudgeProfile.SPREAD,
  onSnap,
}: {
  aligned: boolean;
  enabled: boolean;
  gameEpoch: number;
  index: number;
  nudgeProfile?: NudgeProfile;
  onSnap: () => void;
}) {
  const nudge = getCardNudge(index, nudgeProfile);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartRef = useRef({ deltaX: 0, deltaY: 0, x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const totalX =
    nudgeProfile === NudgeProfile.STACK ? delta.x : nudge.x + delta.x;
  const totalY =
    nudgeProfile === NudgeProfile.STACK ? delta.y : nudge.y + delta.y;

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
      nudgeProfile === NudgeProfile.STACK
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
        deltaX: delta.x,
        deltaY: delta.y,
        x: event.clientX,
        y: event.clientY,
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
    aligned,
    animateRelease: hasDraggedRef.current,
    dragging,
    enabled,
    nudge,
    nudgeProfile,
    totalX,
    totalY,
  });

  return {
    dragging,
    dragStyle,
    dragHandlers: enabled
      ? {
          onPointerCancel: handlePointerEnd,
          onPointerDown: handlePointerDown,
          onPointerMove: handlePointerMove,
          onPointerUp: handlePointerEnd,
        }
      : {},
  };
}

export function useAlignable({
  id,
  index,
  variant,
  nudgeProfile = NudgeProfile.SPREAD,
}: UseAlignableOptions) {
  const {
    gameEpoch,
    isGameEnabled,
    align,
    isAligned,
    registerCard,
    registerChip,
    unregisterCard,
    unregisterChip,
  } = useAlignment();
  const chipGroupId = useAlignChipFieldId();
  const reduceMotion = useReducedMotion();
  const aligned = isAligned(id);
  const gameActive = isGameEnabled && !reduceMotion;

  const dragEnabled = gameActive && variant === AlignableVariant.CARD && !aligned;
  const hoverEnabled = gameActive && variant === AlignableVariant.CHIP && !aligned;

  useEffect(() => {
    if (!isGameEnabled) return;

    if (variant === AlignableVariant.CHIP) {
      if (!chipGroupId) return;
      registerChip(chipGroupId, id);
      return () => unregisterChip(chipGroupId, id);
    }

    registerCard(id);
    return () => unregisterCard(id);
  }, [
    chipGroupId,
    id,
    isGameEnabled,
    registerCard,
    registerChip,
    unregisterCard,
    unregisterChip,
    variant,
  ]);

  const snap = useCallback(() => {
    if (!aligned) align(id);
  }, [align, aligned, id]);

  const { dragging, dragHandlers, dragStyle } = useCardDragAlign({
    aligned,
    enabled: dragEnabled,
    gameEpoch,
    index,
    nudgeProfile,
    onSnap: snap,
  });

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!hoverEnabled) return;
      event.stopPropagation();
    },
    [hoverEnabled],
  );

  const handleMouseLeave = useCallback(() => {
    if (!hoverEnabled) return;
    snap();
  }, [hoverEnabled, snap]);

  const handleFocus = useCallback(() => {
    if (!hoverEnabled) return;
    snap();
  }, [hoverEnabled, snap]);

  if (!isGameEnabled) {
    return {
      alignProps: passiveAlignProps(variant),
      dragging: false,
    };
  }

  const crooked = !aligned && !reduceMotion;
  const chipStyle: CSSProperties | undefined =
    crooked && variant === AlignableVariant.CHIP ? chipNudgeStyle(index) : undefined;

  const className = cn(
    variant === AlignableVariant.CARD ? 'card-settle' : 'chip chip-nudge',
    crooked && 'align-crooked',
    aligned && 'is-aligned',
    dragEnabled && 'align-draggable',
    dragging && 'is-dragging',
    hoverEnabled && 'align-hoverable',
  );

  const mergedStyle: CSSProperties | undefined =
    variant === AlignableVariant.CARD && crooked
      ? {
          ...dragStyle,
          zIndex: nudgeProfile === NudgeProfile.STACK ? 20 - index : index + 1,
        }
      : chipStyle;

  return {
    alignProps: {
      'aria-label': !aligned
        ? variant === AlignableVariant.CHIP
          ? 'Hover to straighten'
          : 'Click or drag into place to straighten'
        : undefined,
      className,
      'data-aligned': aligned ? 'true' : 'false',
      ...(hoverEnabled ? { 'data-align-chip': 'true' as const } : {}),
      style: mergedStyle,
      onFocus: hoverEnabled ? handleFocus : undefined,
      onMouseLeave: hoverEnabled ? handleMouseLeave : undefined,
      onPointerCancel: dragEnabled ? dragHandlers.onPointerCancel : undefined,
      onPointerDown: hoverEnabled
        ? handlePointerDown
        : dragHandlers.onPointerDown,
      onPointerMove: dragEnabled ? dragHandlers.onPointerMove : undefined,
      onPointerUp: dragEnabled ? dragHandlers.onPointerUp : undefined,
    },
    dragging,
  };
}
