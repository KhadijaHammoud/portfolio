import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { WorkShot } from '../../types';
import FeaturedShotList from './FeaturedShotList';

type FeaturedWalkthroughSectionProps = {
  shots: readonly WorkShot[];
  viewerTitle: string;
  panelId: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

const FeaturedWalkthroughSection: React.FC<FeaturedWalkthroughSectionProps> = ({
  shots,
  viewerTitle,
  panelId,
  index,
  isOpen,
  onToggle,
  className = 'mt-8 border-t border-line/5 pt-8',
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <button
        type='button'
        id={`${panelId}-trigger`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className='flex w-full items-center justify-between gap-4 rounded-xl border border-line/5 bg-line/[0.02] px-4 py-4 text-left transition-colors hover:bg-line/[0.03] md:px-5'
      >
        <div className='min-w-0'>
          <h4 className='text-lg font-semibold tracking-tight text-ink md:text-xl'>
            Product walkthrough
          </h4>
          <p className='mt-1 text-sm text-ink-muted'>
            {isOpen ? 'Hide' : 'View'} inline screenshots and captions.
          </p>
        </div>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role='region'
            aria-labelledby={`${panelId}-trigger`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className='overflow-hidden'
          >
            <div className='pt-8'>
              <FeaturedShotList
                shots={shots}
                viewerTitle={viewerTitle}
                projectIndex={index}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturedWalkthroughSection;
