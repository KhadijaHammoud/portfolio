import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Accent = 'accent',
}

const BUTTON_STYLES: Record<
  ButtonVariant,
  { shell: string; text: string; icon: string }
> = {
  [ButtonVariant.Primary]: {
    shell:
      'group rounded-full bg-accent text-white shadow-glow transition-all hover:bg-accent-soft disabled:opacity-60',
    text: 'inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-medium',
    icon: 'grid h-9 w-9 place-items-center',
  },
  [ButtonVariant.Secondary]: {
    shell:
      'rounded-full border border-line/10 bg-line/[0.03] text-ink transition-all hover:border-line/30 disabled:opacity-60',
    text: 'inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-medium',
    icon: 'grid h-9 w-9 place-items-center',
  },
  [ButtonVariant.Ghost]: {
    shell:
      'rounded-full border border-line/10 bg-line/[0.03] text-ink-muted transition-all hover:border-accent/60 hover:text-ink disabled:opacity-60',
    text: 'inline-flex h-9 items-center gap-2 whitespace-nowrap px-3.5 text-sm font-medium',
    icon: 'grid h-9 w-9 place-items-center',
  },
  [ButtonVariant.Accent]: {
    shell:
      'rounded-full border border-accent/30 bg-accent/10 text-ink transition-all hover:border-accent/50 hover:bg-accent/15 disabled:opacity-60',
    text: 'inline-flex w-full items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-medium',
    icon: 'grid h-8 w-8 place-items-center text-accent',
  },
};

function buttonLinkClasses(
  variant: ButtonVariant,
  iconOnly: boolean,
): string {
  const styles = BUTTON_STYLES[variant];
  return `${styles.shell} ${iconOnly ? styles.icon : styles.text}`;
}

type ButtonLinkProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  iconOnly?: boolean;
  unstyled?: boolean;
  href?: string;
  download?: string;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  ariaLabel?: string;
  showArrow?: boolean;
  className?: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  variant = ButtonVariant.Primary,
  iconOnly = false,
  unstyled = false,
  href,
  download,
  disabled = false,
  onClick,
  ariaLabel,
  showArrow = false,
  className = '',
}) => {
  const classes = [
    unstyled ? '' : buttonLinkClasses(variant, iconOnly),
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const isExternal = href?.startsWith('http') && !download;

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight className='h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
      )}
    </>
  );

  if (!href) {
    return (
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      download={download}
      onClick={onClick}
      aria-label={ariaLabel}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={classes}
    >
      {content}
    </a>
  );
};

export default ButtonLink;
