import { useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import { useAlignChipFieldId } from './AlignChipField';
import { useAlignment } from './AlignmentContext';
import { useCardDragAlign } from './useCardDragAlign';

type AlignableVariant = 'card' | 'chip';

const CHIP_NUDGES = [
  { rotate: '-5.5deg', x: '9px', y: '7px' },
  { rotate: '4.8deg', x: '-10px', y: '-6px' },
  { rotate: '-4.5deg', x: '7px', y: '-9px' },
  { rotate: '5.2deg', x: '-8px', y: '8px' },
  { rotate: '-4deg', x: '11px', y: '5px' },
  { rotate: '5.8deg', x: '-7px', y: '-10px' },
] as const;

type UseAlignableOptions = {
  id: string;
  index: number;
  variant: AlignableVariant;
};

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
    className: variant === 'chip' ? 'chip' : '',
  };
}

export function useAlignable({ id, index, variant }: UseAlignableOptions) {
  const {
    isGameEnabled,
    registerCard,
    unregisterCard,
    registerChip,
    unregisterChip,
    align,
    isAligned,
    gameEpoch,
  } = useAlignment();
  const chipGroupId = useAlignChipFieldId();
  const reduceMotion = useReducedMotion();
  const aligned = isAligned(id);
  const gameActive = isGameEnabled && !reduceMotion;

  const dragEnabled = gameActive && variant === 'card' && !aligned;
  const hoverEnabled = gameActive && variant === 'chip' && !aligned;

  useEffect(() => {
    if (!isGameEnabled) return;

    if (variant === 'chip') {
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

  const { dragging, dragStyle, dragHandlers } = useCardDragAlign({
    enabled: dragEnabled,
    aligned,
    index,
    gameEpoch,
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
      dragging: false,
      alignProps: passiveAlignProps(variant),
    };
  }

  const crooked = !aligned && !reduceMotion;
  const chipStyle: CSSProperties | undefined =
    crooked && variant === 'chip' ? chipNudgeStyle(index) : undefined;

  const className = [
    variant === 'card' ? 'card-settle' : 'chip chip-nudge',
    crooked ? 'align-crooked' : '',
    aligned ? 'is-aligned' : '',
    dragEnabled ? 'align-draggable' : '',
    dragging ? 'is-dragging' : '',
    hoverEnabled ? 'align-hoverable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: CSSProperties | undefined =
    variant === 'card' && crooked
      ? { ...dragStyle, zIndex: index + 1 }
      : chipStyle;

  return {
    dragging,
    alignProps: {
      className,
      style: mergedStyle,
      onMouseLeave: hoverEnabled ? handleMouseLeave : undefined,
      onFocus: hoverEnabled ? handleFocus : undefined,
      onPointerDown: hoverEnabled
        ? handlePointerDown
        : dragHandlers.onPointerDown,
      onPointerMove: dragEnabled ? dragHandlers.onPointerMove : undefined,
      onPointerUp: dragEnabled ? dragHandlers.onPointerUp : undefined,
      onPointerCancel: dragEnabled ? dragHandlers.onPointerCancel : undefined,
      'aria-label': !aligned
        ? variant === 'chip'
          ? 'Hover to straighten'
          : 'Click or drag into place to straighten'
        : undefined,
      'data-aligned': aligned ? 'true' : 'false',
      ...(hoverEnabled ? { 'data-align-chip': 'true' as const } : {}),
    },
  };
}
