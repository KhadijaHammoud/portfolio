import type { useAlignable } from '../../features';
import { AlignCardFrame } from '../../features';
import { cn } from '../../utils';
import HeroStatsGrid from './HeroStatsGrid';

type HeroStatsPanelProps = {
  alignProps: ReturnType<typeof useAlignable>['alignProps'];
  dragging: boolean;
  isGameEnabled: boolean;
  yearsOfExperience: string;
};

const HeroStatsPanel = ({
  alignProps,
  dragging,
  isGameEnabled,
  yearsOfExperience,
}: HeroStatsPanelProps) => {
  if (!isGameEnabled) {
    return (
      <div className='overflow-hidden rounded-2xl border border-line/5 bg-line/[0.04]'>
        <HeroStatsGrid yearsOfExperience={yearsOfExperience} />
      </div>
    );
  }

  return (
    <AlignCardFrame dragging={dragging}>
      <div
        {...alignProps}
        className={cn(
          'relative rounded-2xl border border-line/5 bg-line/[0.04]',
          alignProps.className,
        )}
      >
        <div className='overflow-hidden rounded-2xl'>
          <HeroStatsGrid yearsOfExperience={yearsOfExperience} />
        </div>
      </div>
    </AlignCardFrame>
  );
};

export default HeroStatsPanel;
