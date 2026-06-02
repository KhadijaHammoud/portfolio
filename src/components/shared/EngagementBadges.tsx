import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import type { EngagementBadge } from '../../constants/portfolio.constants';

type EngagementBadgesProps = {
  badges?: readonly EngagementBadge[];
};

export const EngagementBadges: React.FC<EngagementBadgesProps> = ({
  badges,
}) => {
  if (!badges?.length) return null;

  return (
    <>
      {badges.map((badge) =>
        badge.href ? (
          <a
            key={badge.label}
            href={badge.href}
            target='_blank'
            rel='noreferrer'
            className='chip-badge inline-flex items-center gap-1 transition-colors hover:border-accent/40 hover:text-accent hover:[&_svg]:-translate-y-px hover:[&_svg]:translate-x-px hover:[&_svg]:opacity-100'
          >
            {badge.label}
            <ArrowUpRight
              className='h-3 w-3 shrink-0 opacity-70 transition-transform'
              aria-hidden
            />
          </a>
        ) : (
          <span key={badge.label} className='chip-badge'>
            {badge.label}
          </span>
        ),
      )}
    </>
  );
};
