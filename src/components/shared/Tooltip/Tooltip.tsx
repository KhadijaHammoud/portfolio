import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils';
import { TooltipPlacement } from './Tooltip.type';
import { resolveTooltipPlacement } from './tooltip.util';
export type { TooltipPlacement };

const PLACEMENT_CLASSES: Record<TooltipPlacement, string> = {
  [TooltipPlacement.TOP]:
    'bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2',
  [TooltipPlacement.BOTTOM]:
    'top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2',
  [TooltipPlacement.RIGHT]: 'left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2',
  [TooltipPlacement.LEFT]: 'right-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2',
};

/** Invisible hover bridge so the pointer can reach the tooltip without closing it. */
const BRIDGE_CLASSES: Record<TooltipPlacement, string> = {
  [TooltipPlacement.TOP]:
    'before:absolute before:-bottom-2 before:left-0 before:h-2 before:w-full before:content-[""]',
  [TooltipPlacement.BOTTOM]:
    'before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-[""]',
  [TooltipPlacement.RIGHT]:
    'before:absolute before:-left-2 before:top-0 before:h-full before:w-2 before:content-[""]',
  [TooltipPlacement.LEFT]:
    'before:absolute before:-right-2 before:top-0 before:h-full before:w-2 before:content-[""]',
};

const LEAVE_DELAY_MS = 120;
const FALLBACK_PLACEMENT = TooltipPlacement.BOTTOM;

type TooltipProps = {
  children: ReactNode;
  label: ReactNode;
  className?: string;
  placement?: TooltipPlacement;
};

const Tooltip = ({
  children,
  label,
  className = 'inline-flex',
  placement,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [autoPlacement, setAutoPlacement] =
    useState<TooltipPlacement>(FALLBACK_PLACEMENT);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const rootRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const activePlacement = placement ?? autoPlacement;

  const updateAutoPlacement = useCallback(() => {
    if (placement || !rootRef.current || !tooltipRef.current) return;
    setAutoPlacement(
      resolveTooltipPlacement(rootRef.current, tooltipRef.current),
    );
  }, [placement]);

  useLayoutEffect(() => {
    if (!open || placement) return;

    updateAutoPlacement();

    window.addEventListener('resize', updateAutoPlacement);
    window.addEventListener('scroll', updateAutoPlacement, true);

    return () => {
      window.removeEventListener('resize', updateAutoPlacement);
      window.removeEventListener('scroll', updateAutoPlacement, true);
    };
  }, [label, open, placement, updateAutoPlacement]);

  const show = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setOpen(false), LEAVE_DELAY_MS);
  }, []);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLSpanElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        hide();
      }
    },
    [hide],
  );

  return (
    <span
      ref={rootRef}
      className={cn('relative', className)}
      onBlur={handleBlur}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      <span
        ref={tooltipRef}
        role='tooltip'
        onMouseEnter={show}
        onMouseLeave={hide}
        className={cn(
          'absolute z-50 whitespace-nowrap rounded-lg border border-line/10 bg-bg/95 px-2.5 py-1 text-xs font-medium text-ink shadow-card backdrop-blur-sm transition-opacity duration-150',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
          PLACEMENT_CLASSES[activePlacement],
          BRIDGE_CLASSES[activePlacement],
        )}
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
