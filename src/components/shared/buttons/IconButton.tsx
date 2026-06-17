import React from 'react';
import Tooltip, { type TooltipPlacement } from '../Tooltip';
import ButtonLink, { ButtonVariant } from './ButtonLink';

type IconButtonProps = {
  icon: React.ReactElement;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  tooltipPlacement?: TooltipPlacement;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  href,
  onClick,
  variant = ButtonVariant.Ghost,
  disabled = false,
  tooltipPlacement = 'bottom',
  className,
}) => (
  <Tooltip label={label} placement={tooltipPlacement} className='inline-flex'>
    <ButtonLink
      href={href}
      onClick={onClick}
      variant={variant}
      iconOnly
      disabled={disabled}
      ariaLabel={label}
      className={className}
    >
      {icon}
    </ButtonLink>
  </Tooltip>
);

export default IconButton;
