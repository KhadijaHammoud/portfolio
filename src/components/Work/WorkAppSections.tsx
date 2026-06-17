import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { WorkAppSection } from '../../types';
import { LinkedText } from '../shared';
import WorkHighlightList from './WorkHighlightList';
import WorkWalkthroughSection from './WorkWalkthroughSection';

type WorkAppSectionsProps = {
  apps: readonly WorkAppSection[];
  projectSlug: string;
  company: string;
};

const WorkAppSections = ({
  apps,
  projectSlug,
  company,
}: WorkAppSectionsProps) => {
  const reduceMotion = useReducedMotion();
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set([]),
  );
  const [walkthroughOpenIndexes, setWalkthroughOpenIndexes] = useState<
    Set<number>
  >(() => new Set([]));

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleWalkthrough = (index: number) => {
    setWalkthroughOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className='mt-8 space-y-2 border-t border-line/5 pt-8'>
      {apps.map((app, i) => {
        const isOpen = openIndexes.has(i);
        const isWalkthroughOpen = walkthroughOpenIndexes.has(i);
        const panelId = `work-${projectSlug}-app-${i}`;
        const hasShots = (app.shots?.length ?? 0) > 0;

        return (
          <div
            key={app.title}
            className='overflow-hidden rounded-xl border border-line/5 bg-line/[0.02]'
          >
            <button
              type='button'
              id={`${panelId}-trigger`}
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className='flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-line/[0.03] md:px-5 md:py-5'
            >
              <div className='min-w-0'>
                <h4 className='text-lg font-semibold tracking-tight text-ink md:text-xl'>
                  {app.title}
                </h4>
                <p className='mt-1 text-sm text-ink-muted'>{app.scope}</p>
              </div>
              <ChevronDown
                aria-hidden
                className={`mt-0.5 h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ${
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
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className='overflow-hidden'
                >
                  <div className='border-t border-line/5 px-4 pb-5 pt-4 md:px-5 md:pb-6'>
                    {app.summary && (
                      <p className='text-base leading-relaxed text-ink-muted'>
                        <LinkedText>{app.summary}</LinkedText>
                      </p>
                    )}
                    <WorkHighlightList
                      items={app.highlights}
                      className={app.summary ? 'mt-4' : ''}
                    />
                    {hasShots && (
                      <WorkWalkthroughSection
                        shots={app.shots!}
                        viewerTitle={`${company} — ${app.title}`}
                        panelId={`${panelId}-walkthrough`}
                        index={i}
                        isOpen={isWalkthroughOpen}
                        onToggle={() => toggleWalkthrough(i)}
                        className='mt-6 border-t border-line/5 pt-6'
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default WorkAppSections;
