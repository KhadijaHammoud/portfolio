import { LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import Tooltip, { type TooltipPlacement } from '../Tooltip';
import ButtonLink, { ButtonSize, ButtonVariant, buttonIconClass } from './ButtonLink';

export { ButtonSize as IconButtonSize };

type IconButtonProps = {
  icon: React.ReactElement<LucideProps>;
  label: string;
  href?: string;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  size = ButtonSize.Md,
  disabled = false,
  tooltipPlacement = 'bottom',
  className,
}) => (
  <Tooltip label={label} placement={tooltipPlacement} className='inline-flex'>
    <ButtonLink
      href={href}
      onClick={onClick}
      variant={variant}
      size={size}
      iconOnly
      disabled={disabled}
      ariaLabel={label}
      className={className}
    >
      {React.cloneElement(icon, {
        className: cn(buttonIconClass(size), icon.props.className),
      })}
    </ButtonLink>
  </Tooltip>
);

export default IconButton;
