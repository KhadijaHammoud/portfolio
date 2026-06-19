import React from 'react';
import { cn } from '../../../utils';

type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Stretch children to equal width in a row. */
  equalWidth?: boolean;
  wrap?: boolean;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  equalWidth = false,
  wrap = false,
}) => (
  <div
    className={cn(
      'flex items-center gap-2',
      wrap && 'flex-wrap',
      equalWidth && '[&>*]:min-w-0 [&>*]:flex-1',
      className,
    )}
  >
    {children}
  </div>
);

export default ButtonGroup;
