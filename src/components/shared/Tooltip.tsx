import type { ReactNode } from 'react';
import { cn } from '../../utils';

export type TooltipPlacement = 'top' | 'bottom';

const PLACEMENT_CLASSES: Record<TooltipPlacement, string> = {
  top: 'bottom-[calc(100%+0.5rem)]',
  bottom: 'top-[calc(100%+0.5rem)]',
};

type TooltipProps = {
  children: ReactNode;
  label: string;
  className?: string;
  placement?: TooltipPlacement;
};

const Tooltip = ({
  children,
  className = 'inline-flex',
  label,
  placement = 'bottom',
}: TooltipProps) => (
  <span className={cn('group/tooltip relative', className)}>
    {children}
    <span
      role='tooltip'
      className={cn(
        'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line/10 bg-bg/95 px-2.5 py-1 text-xs font-medium text-ink opacity-0 shadow-card backdrop-blur-sm transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100',
        PLACEMENT_CLASSES[placement],
      )}
    >
      {label}
    </span>
  </span>
);

export default Tooltip;
