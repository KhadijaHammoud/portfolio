import { WorkShot } from '../../types';
import { cn } from '../../utils';
import WorkPolaroidStack from './WorkPolaroidStack';

type WorkScreenshotsSectionProps = {
  index: number;
  shots: readonly WorkShot[];
  viewerTitle: string;
  className?: string;
};

const WorkScreenshotsSection = ({
  className = 'mt-8 border-t border-line/5 pt-8',
  index,
  shots,
  viewerTitle,
}: WorkScreenshotsSectionProps) => {
  return (
    <div className={cn('overflow-visible', className)}>
      <div className='mb-8 max-w-2xl'>
        <h4 className='text-lg font-semibold tracking-tight text-ink md:text-xl'>
          Product screenshots
        </h4>
        <p className='mt-1 text-sm text-ink-muted'>
          {shots.length > 1
            ? 'Prints stacked in a pile. Click to flip through.'
            : 'Click expand or view full size to enlarge.'}
        </p>
      </div>

      <WorkPolaroidStack
        shots={shots}
        viewerTitle={viewerTitle}
        projectIndex={index}
      />
    </div>
  );
};

export default WorkScreenshotsSection;
