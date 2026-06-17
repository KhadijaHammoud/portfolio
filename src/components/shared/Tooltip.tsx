import type { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom';

const PLACEMENT_CLASSES: Record<TooltipPlacement, string> = {
  top: 'bottom-[calc(100%+0.5rem)]',
  bottom: 'top-[calc(100%+0.5rem)]',
};

type TooltipProps = {
  label: string;
  children: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
};

const Tooltip = ({
  label,
  children,
  placement = 'bottom',
  className = 'inline-flex',
}: TooltipProps) => (
  <span className={`group/tooltip relative ${className}`}>
    {children}
    <span
      role='tooltip'
      className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line/10 bg-bg/95 px-2.5 py-1 text-xs font-medium text-ink opacity-0 shadow-card backdrop-blur-sm transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100 ${PLACEMENT_CLASSES[placement]}`}
    >
      {label}
    </span>
  </span>
);

export default Tooltip;
