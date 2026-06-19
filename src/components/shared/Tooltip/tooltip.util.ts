import { TooltipPlacement } from './Tooltip.type';

const GAP_PX = 8;
const VIEWPORT_MARGIN = 8;

const AUTO_PLACEMENT_ORDER: TooltipPlacement[] = [
  TooltipPlacement.BOTTOM,
  TooltipPlacement.TOP,
  TooltipPlacement.RIGHT,
  TooltipPlacement.LEFT,
];

type TooltipSize = {
  height: number;
  width: number;
};

function expectedBounds(
  placement: TooltipPlacement,
  trigger: DOMRect,
  size: TooltipSize,
) {
  const centerX = trigger.left + trigger.width / 2;
  const centerY = trigger.top + trigger.height / 2;

  switch (placement) {
    case TooltipPlacement.BOTTOM:
      return {
        bottom: trigger.bottom + GAP_PX + size.height,
        left: centerX - size.width / 2,
        right: centerX + size.width / 2,
        top: trigger.bottom + GAP_PX,
      };
    case TooltipPlacement.TOP:
      return {
        bottom: trigger.top - GAP_PX,
        left: centerX - size.width / 2,
        right: centerX + size.width / 2,
        top: trigger.top - GAP_PX - size.height,
      };
    case TooltipPlacement.RIGHT:
      return {
        bottom: centerY + size.height / 2,
        left: trigger.right + GAP_PX,
        right: trigger.right + GAP_PX + size.width,
        top: centerY - size.height / 2,
      };
    case TooltipPlacement.LEFT:
      return {
        bottom: centerY + size.height / 2,
        left: trigger.left - GAP_PX - size.width,
        right: trigger.left - GAP_PX,
        top: centerY - size.height / 2,
      };
  }
}

function overflowAmount(bounds: {
  bottom: number;
  left: number;
  right: number;
  top: number;
}) {
  return Math.max(
    VIEWPORT_MARGIN - bounds.left,
    VIEWPORT_MARGIN - bounds.top,
    bounds.right - (window.innerWidth - VIEWPORT_MARGIN),
    bounds.bottom - (window.innerHeight - VIEWPORT_MARGIN),
    0,
  );
}

/** Pick a side that fits the viewport, preferring bottom → top → right → left. */
export function resolveTooltipPlacement(
  trigger: HTMLElement,
  tooltip: HTMLElement,
): TooltipPlacement {
  const triggerRect = trigger.getBoundingClientRect();
  const size = {
    height: tooltip.offsetHeight,
    width: tooltip.offsetWidth,
  };

  let bestPlacement = AUTO_PLACEMENT_ORDER[0];
  let leastOverflow = Infinity;

  for (const placement of AUTO_PLACEMENT_ORDER) {
    const bounds = expectedBounds(placement, triggerRect, size);
    const overflow = overflowAmount(bounds);

    if (overflow === 0) return placement;

    if (overflow < leastOverflow) {
      leastOverflow = overflow;
      bestPlacement = placement;
    }
  }

  return bestPlacement;
}
