import { LucideProps } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import ButtonLink, { ButtonSize, ButtonVariant, buttonIconClass } from './ButtonLink';

export { ButtonVariant as TextButtonVariant };
export { ButtonSize as TextButtonSize };

type TextButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  download?: string;
  href?: string;
  icon?: React.ReactElement<LucideProps>;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  showArrow?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const TextButton: React.FC<TextButtonProps> = ({
  children,
  className,
  disabled = false,
  download,
  href,
  icon,
  onClick,
  showArrow = false,
  size = ButtonSize.Md,
  variant = ButtonVariant.Primary,
}) => (
  <ButtonLink
    className={className}
    disabled={disabled}
    download={download}
    href={href}
    onClick={onClick}
    showArrow={showArrow}
    size={size}
    variant={variant}
  >
    {icon &&
      React.cloneElement(icon, {
        className: cn(buttonIconClass(size), icon.props.className),
      })}
    {children}
  </ButtonLink>
);

export default TextButton;
