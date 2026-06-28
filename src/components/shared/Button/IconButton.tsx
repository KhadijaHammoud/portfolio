import { LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import Tooltip, { type TooltipPlacement } from '../Tooltip';
import { ButtonSize, ButtonVariant } from './Button.type';
import ButtonLink, { buttonIconClass } from './ButtonLink';

type IconButtonProps = {
  icon: React.ReactElement<LucideProps>;
  label: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  size?: ButtonSize;
  tooltipPlacement?: TooltipPlacement;
  variant?: ButtonVariant;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  className,
  disabled = false,
  href,
  size = ButtonSize.MD,
  tooltipPlacement,
  variant = ButtonVariant.GHOST,
  onClick,
}) => (
  <Tooltip className='inline-flex' label={label} placement={tooltipPlacement}>
    <ButtonLink
      ariaLabel={label}
      className={className}
      disabled={disabled}
      href={href}
      iconOnly
      size={size}
      variant={variant}
      onClick={onClick}
    >
      {React.cloneElement(icon, {
        className: cn(buttonIconClass(size), icon.props.className),
      })}
    </ButtonLink>
  </Tooltip>
);

export default IconButton;
