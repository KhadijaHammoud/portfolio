import { ArrowUpRight } from 'lucide-react';
import type { EngagementBadge } from '../../../types';

type EngagementBadgeItemProps = {
  badge: EngagementBadge;
};

const EngagementBadgeItem = ({ badge }: EngagementBadgeItemProps) => {
  if (badge.href) {
    return (
      <a
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
    );
  }

  return <span className='chip-badge'>{badge.label}</span>;
};

export default EngagementBadgeItem;
