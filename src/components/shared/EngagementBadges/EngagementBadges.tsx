import type { EngagementBadge } from '../../../types';
import EngagementBadgeItem from './EngagementBadgeItem';

type EngagementBadgesProps = {
  badges?: readonly EngagementBadge[];
};

const EngagementBadges = ({ badges }: EngagementBadgesProps) => {
  if (!badges?.length) return null;

  return (
    <>
      {badges.map((badge) => (
        <EngagementBadgeItem key={badge.label} badge={badge} />
      ))}
    </>
  );
};

export default EngagementBadges;
