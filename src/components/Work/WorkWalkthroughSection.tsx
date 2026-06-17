import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WorkShot } from '../../types';
import WorkShotList from './WorkShotList';

type WorkWalkthroughSectionProps = {
  shots: readonly WorkShot[];
  viewerTitle: string;
  panelId: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
};

const WorkWalkthroughSection = ({
  shots,
  viewerTitle,
  panelId,
  index,
  isOpen,
  onToggle,
  className = 'mt-8 border-t border-line/5 pt-8',
}: WorkWalkthroughSectionProps) => {
  const reduceMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIsOpenRef = useRef(isOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const isToggling = prevIsOpenRef.current !== isOpen;

  useEffect(() => {
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => setContentHeight(node.offsetHeight);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [shots]);

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

      <motion.div
        id={panelId}
        role='region'
        aria-labelledby={`${panelId}-trigger`}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? contentHeight : 0 }}
        transition={{
          height: {
            duration: reduceMotion || !isToggling ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className='overflow-hidden'
        style={{ pointerEvents: isOpen ? undefined : 'none' }}
      >
        <div ref={contentRef} className='pt-8'>
          <WorkShotList
            shots={shots}
            viewerTitle={viewerTitle}
            projectIndex={index}
            revealOnMount
          />
        </div>
      </motion.div>
    </div>
  );
};

export default WorkWalkthroughSection;
