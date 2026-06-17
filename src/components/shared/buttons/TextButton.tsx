import { LucideProps } from 'lucide-react';
import React from 'react';
import ButtonLink, { ButtonVariant } from './ButtonLink';

export { ButtonVariant as TextButtonVariant };

type TextButtonProps = {
  children: React.ReactNode;
  href: string;
  download?: string;
  icon?: React.ReactElement<LucideProps>;
  showArrow?: boolean;
  variant?: ButtonVariant;
};

const TextButton: React.FC<TextButtonProps> = ({
  children,
  href,
  download,
  icon,
  showArrow = false,
  variant = ButtonVariant.Primary,
}) => (
  <ButtonLink
    href={href}
    download={download}
    variant={variant}
    showArrow={showArrow}
  >
    {icon &&
      React.cloneElement(icon, {
        className: ['h-4 w-4', icon.props.className].filter(Boolean).join(' '),
      })}
    {children}
  </ButtonLink>
);

export default TextButton;
