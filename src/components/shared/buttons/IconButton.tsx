import { LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import Tooltip, { type TooltipPlacement } from '../Tooltip';
import ButtonLink, { ButtonSize, ButtonVariant, buttonIconClass } from './ButtonLink';

export { ButtonSize as IconButtonSize };

type IconButtonProps = {
  icon: React.ReactElement<LucideProps>;
  label: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  size?: ButtonSize;
  tooltipPlacement?: TooltipPlacement;
  variant?: ButtonVariant;
};

const IconButton: React.FC<IconButtonProps> = ({
  className,
  disabled = false,
  href,
  icon,
  label,
  onClick,
  size = ButtonSize.Md,
  tooltipPlacement = 'bottom',
  variant = ButtonVariant.Ghost,
}) => (
  <Tooltip className='inline-flex' label={label} placement={tooltipPlacement}>
    <ButtonLink
      ariaLabel={label}
      className={className}
      disabled={disabled}
      href={href}
      iconOnly
      onClick={onClick}
      size={size}
      variant={variant}
    >
      {React.cloneElement(icon, {
        className: cn(buttonIconClass(size), icon.props.className),
      })}
    </ButtonLink>
  </Tooltip>
);

export default IconButton;
