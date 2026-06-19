import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils';
import { ButtonSize, ButtonVariant } from './Button.type';

export function buttonIconClass(size: ButtonSize = ButtonSize.MD): string {
  return size === ButtonSize.SM ? 'h-3.5 w-3.5' : 'h-4 w-4';
}

const BUTTON_SIZE_CLASS: Record<
  ButtonSize,
  { iconOnly: string; text: string }
> = {
  [ButtonSize.MD]: {
    iconOnly: 'h-9 w-9',
    text: 'h-9 text-sm',
  },
  [ButtonSize.SM]: {
    iconOnly: 'h-8 w-8',
    text: 'h-8 text-xs',
  },
};

/**
 * Variant styles — see `ButtonVariant` in `Button.type.ts` for when to use each.
 *
 * - **Primary** — main CTA in a button group or section.
 * - **Secondary** — paired alternative next to primary; reads as a real button at rest.
 * - **Ghost** — tertiary/compact actions and icon-only controls; quieter until hovered.
 * - **Accent** — special tinted action that should read as part of the accent/game layer.
 */
const BUTTON_STYLES: Record<ButtonVariant, { shell: string; text: string }> = {
  // Primary — filled accent CTA
  [ButtonVariant.PRIMARY]: {
    shell:
      'group rounded-full bg-accent text-white shadow-glow transition-all hover:bg-accent-soft disabled:opacity-60',
    text: 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
  },
  // Secondary — outline pill beside primary; full ink, neutral hover
  [ButtonVariant.SECONDARY]: {
    shell:
      'rounded-full border border-line/10 bg-line/[0.03] text-ink transition-all hover:border-line/30 disabled:opacity-60',
    text: 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
  },
  // Ghost — muted tertiary / default IconButton; accent hover
  [ButtonVariant.GHOST]: {
    shell:
      'rounded-full border border-line/10 bg-line/[0.03] text-ink-muted transition-all hover:border-accent/60 hover:text-ink disabled:opacity-60',
    text: 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
  },
  // Accent — tinted accent shell for standout in-context actions (e.g. sweep)
  [ButtonVariant.ACCENT]: {
    shell:
      'rounded-full border border-accent/30 bg-accent/10 text-ink transition-all hover:border-accent/50 hover:bg-accent/15 disabled:opacity-60',
    text: 'inline-flex w-full items-center justify-center gap-2 whitespace-nowrap font-medium',
  },
};

function buttonTextPadding(variant: ButtonVariant, size: ButtonSize): string {
  if (size === ButtonSize.SM) {
    return 'px-3';
  }

  return variant === ButtonVariant.GHOST ? 'px-3.5' : 'px-5';
}

function buttonTextSizeClass(
  _variant: ButtonVariant,
  size: ButtonSize,
): string {
  return BUTTON_SIZE_CLASS[size].text;
}

function buttonLinkClasses(
  variant: ButtonVariant,
  iconOnly: boolean,
  size: ButtonSize,
): string {
  const styles = BUTTON_STYLES[variant];
  const sizeClass = BUTTON_SIZE_CLASS[size];

  if (iconOnly) {
    return cn(
      styles.shell,
      'grid shrink-0 place-items-center',
      sizeClass.iconOnly,
      variant === ButtonVariant.ACCENT && 'text-accent',
    );
  }

  return cn(
    styles.shell,
    styles.text,
    buttonTextSizeClass(variant, size),
    buttonTextPadding(variant, size),
  );
}

type ButtonLinkProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MD,
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
  const classes = cn(
    !unstyled && buttonLinkClasses(variant, iconOnly, size),
    className,
  );
  const isExternal = href?.startsWith('http') && !download;

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight
          className={cn(
            buttonIconClass(size),
            'transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
          )}
        />
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
