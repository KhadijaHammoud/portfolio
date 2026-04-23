import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export enum TextButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Ghost = 'ghost',
}

type TextButtonProps = {
  children: React.ReactNode;
  href: string;
  leadingIcon?: React.ReactNode;
  showArrow?: boolean;
  variant?: TextButtonVariant;
};

const VARIANT_CLASSES: Record<TextButtonVariant, string> = {
  [TextButtonVariant.Primary]:
    'group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-glow transition-all hover:bg-accent-soft',
  [TextButtonVariant.Secondary]:
    'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line/10 bg-line/[0.03] px-5 py-3 text-sm font-medium text-ink transition-all hover:border-line/30',
  [TextButtonVariant.Ghost]:
    'inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line/10 bg-line/[0.03] px-4 py-2 text-sm font-medium text-ink-muted transition-all hover:border-accent/60 hover:text-ink',
};

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  href,
  leadingIcon,
  showArrow = false,
  variant = TextButtonVariant.Primary,
}) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={VARIANT_CLASSES[variant]}
    >
      {leadingIcon}
      {children}
      {showArrow && (
        <ArrowUpRight className='h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
      )}
    </a>
  );
};
