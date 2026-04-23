import React from 'react';

type IconButtonProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export const IconButton: React.FC<IconButtonProps> = ({
  href,
  icon,
  label,
}) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      aria-label={label}
      className='grid h-10 w-10 place-items-center rounded-full border border-line/10 bg-line/[0.03] text-ink-muted transition-all hover:border-accent/60 hover:text-ink'
    >
      {icon}
    </a>
  );
};
