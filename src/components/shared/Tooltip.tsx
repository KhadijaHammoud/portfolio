import {
  useCallback,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../utils';

export type TooltipPlacement = 'top' | 'bottom' | 'right';

const PLACEMENT_CLASSES: Record<TooltipPlacement, string> = {
  top: 'bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2',
  bottom: 'top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2',
  right: 'left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2',
};

/** Invisible hover bridge so the pointer can reach the tooltip without closing it. */
const BRIDGE_CLASSES: Record<TooltipPlacement, string> = {
  top: 'before:absolute before:-bottom-2 before:left-0 before:h-2 before:w-full before:content-[""]',
  bottom:
    'before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-[""]',
  right:
    'before:absolute before:-left-2 before:top-0 before:h-full before:w-2 before:content-[""]',
};

const LEAVE_DELAY_MS = 120;

type TooltipProps = {
  children: ReactNode;
  label: ReactNode;
  className?: string;
  placement?: TooltipPlacement;
};

const Tooltip = ({
  children,
  className = 'inline-flex',
  label,
  placement = 'bottom',
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const show = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setOpen(false), LEAVE_DELAY_MS);
  }, []);

  const handleBlur = useCallback((event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      hide();
    }
  }, [hide]);

  return (
    <span
      className={cn('relative', className)}
      onBlur={handleBlur}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      <span
        role='tooltip'
        onMouseEnter={show}
        onMouseLeave={hide}
        className={cn(
          'absolute z-50 whitespace-nowrap rounded-lg border border-line/10 bg-bg/95 px-2.5 py-1 text-xs font-medium text-ink shadow-card backdrop-blur-sm transition-opacity duration-150',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
          PLACEMENT_CLASSES[placement],
          BRIDGE_CLASSES[placement],
        )}
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
