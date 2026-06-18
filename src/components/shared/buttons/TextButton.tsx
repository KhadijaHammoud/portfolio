import { LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import ButtonLink, { ButtonSize, ButtonVariant, buttonIconClass } from './ButtonLink';

export { ButtonVariant as TextButtonVariant };
export { ButtonSize as TextButtonSize };

type TextButtonProps = {
  children: React.ReactNode;
  href?: string;
  download?: string;
  icon?: React.ReactElement<LucideProps>;
  showArrow?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  disabled?: boolean;
  className?: string;
};

const TextButton: React.FC<TextButtonProps> = ({
  children,
  href,
  download,
  icon,
  showArrow = false,
  variant = ButtonVariant.Primary,
  size = ButtonSize.Md,
  onClick,
  disabled = false,
  className,
}) => (
  <ButtonLink
    href={href}
    download={download}
    variant={variant}
    size={size}
    showArrow={showArrow}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {icon &&
      React.cloneElement(icon, {
        className: cn(buttonIconClass(size), icon.props.className),
      })}
    {children}
  </ButtonLink>
);

export default TextButton;
