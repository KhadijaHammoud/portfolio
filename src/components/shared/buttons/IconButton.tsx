import React from 'react';
import ButtonLink, { ButtonVariant } from './ButtonLink';

type IconButtonProps = {
  icon: React.ReactElement;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  href,
  onClick,
  variant = ButtonVariant.Ghost,
}) => (
  <span className='group/icon relative inline-flex'>
    <ButtonLink
      href={href}
      onClick={onClick}
      variant={variant}
      iconOnly
      ariaLabel={label}
    >
      {icon}
    </ButtonLink>
    <span
      role='tooltip'
      className='pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line/10 bg-bg/95 px-2.5 py-1 text-xs font-medium text-ink opacity-0 shadow-card backdrop-blur-sm transition-opacity duration-150 group-hover/icon:opacity-100 group-focus-within/icon:opacity-100'
    >
      {label}
    </span>
  </span>
);

export default IconButton;
