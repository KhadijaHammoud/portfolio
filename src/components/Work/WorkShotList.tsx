import { motion } from 'framer-motion';
import { useState } from 'react';
import { WorkShot } from '../../types';
import ImageViewer from '../shared/ImageViewer';

type WorkShotListProps = {
  shots: readonly WorkShot[];
  viewerTitle: string;
  projectIndex?: number;
};

const WorkShotList = ({
  shots,
  viewerTitle,
  projectIndex = 0,
}: WorkShotListProps) => {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      {viewerIndex !== null && (
        <ImageViewer
          images={shots}
          index={viewerIndex}
          onIndexChange={setViewerIndex}
          onClose={() => setViewerIndex(null)}
          title={viewerTitle}
        />
      )}

      <div
        className='space-y-14 md:space-y-20'
        role='region'
        aria-label={`${viewerTitle} product screenshots`}
      >
        {shots.map((shot, i) => {
          const imageFirst = i % 2 === 0;
          const isMobile = shot.variant === 'mobile';

          return (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className='grid items-center gap-6 md:grid-cols-2 md:gap-12'
            >
              <button
                type='button'
                onClick={() => setViewerIndex(i)}
                className={`group cursor-pointer rounded-xl bg-transparent p-0 text-left transition-opacity hover:opacity-95 ${
                  imageFirst ? 'md:order-1' : 'md:order-2'
                } ${
                  isMobile
                    ? 'mx-auto w-full max-w-[13rem] justify-self-center sm:max-w-[15rem]'
                    : ''
                }`}
                aria-label={`View full size: ${shot.alt}`}
              >
                <figure className='overflow-hidden rounded-xl border border-line/10 bg-bg-card shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)]'>
                  <img
                    src={shot.src}
                    alt=''
                    width={isMobile ? 240 : 640}
                    height={isMobile ? 520 : 400}
                    draggable={false}
                    className={
                      isMobile
                        ? 'h-auto w-full object-contain'
                        : 'w-full object-cover object-top'
                    }
                    loading={projectIndex === 0 && i < 2 ? 'eager' : 'lazy'}
                  />
                </figure>
              </button>

              <div
                className={`min-w-0 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}
              >
                <p className='font-mono text-xs uppercase tracking-wider text-accent'>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className='mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl'>
                  {shot.alt}
                </h4>
                {shot.caption && (
                  <p className='mt-3 text-base leading-relaxed text-ink-muted'>
                    {shot.caption}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default WorkShotList;
