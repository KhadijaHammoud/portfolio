import { LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import { ButtonSize, ButtonVariant } from './Button.type';
import ButtonLink, { buttonIconClass } from './ButtonLink';

type TextButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  download?: string;
  href?: string;
  icon?: React.ReactElement<LucideProps>;
  showArrow?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
};

const TextButton: React.FC<TextButtonProps> = ({
  children,
  className,
  disabled = false,
  download,
  href,
  icon,
  showArrow = false,
  size = ButtonSize.MD,
  variant = ButtonVariant.PRIMARY,
  onClick,
}) => (
  <ButtonLink
    className={className}
    disabled={disabled}
    download={download}
    href={href}
    showArrow={showArrow}
    size={size}
    variant={variant}
    onClick={onClick}
  >
    {icon &&
      React.cloneElement(icon, {
        className: cn(buttonIconClass(size), icon.props.className),
      })}
    {children}
  </ButtonLink>
);

export default TextButton;
