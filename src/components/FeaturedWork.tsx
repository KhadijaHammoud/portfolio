import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FEATURED_WORK } from '../constants';
import type { WorkProject } from '../types';
import {
  EngagementBadges,
  ImageViewer,
  ImpactTags,
  LinkedText,
} from './shared';

const AUTO_ADVANCE_MS = 4500;
const SLIDE_MS = 0.55;
const SLIDE_EASE = [0.22, 1, 0.36, 1] as const;
/** Matches Tailwind `gap-7` (1.75rem). */
const TRACK_GAP_PX = 28;

function slideSlotWidthPx(): number {
  if (typeof window === 'undefined') return 448;
  return window.matchMedia('(min-width: 768px)').matches ? 464 : 448;
}

function offsetForIndex(index: number, viewportWidth: number): number {
  const slot = slideSlotWidthPx() + TRACK_GAP_PX;
  return index * slot + slideSlotWidthPx() / 2 - viewportWidth / 2;
}

function scaleForDistance(distance: number): number {
  if (distance === 0) return 1.1;
  if (distance === 1) return 0.96;
  return 0.9;
}

export const FeaturedWork: React.FC = () => {
  return (
    <section id='work' className='relative py-24 md:py-32'>
      <div className='container-page mb-12 md:mb-16'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='section-heading'>Work</div>
          <h2 className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl'>
            Products I've helped ship<span className='text-accent'>.</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-ink-muted'>
            Scope, impact, and stack for each product.
          </p>
        </motion.div>
      </div>

      <div className='space-y-16 md:space-y-24'>
        {FEATURED_WORK.map((project, i) => (
          <FeaturedProject key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

type FeaturedProjectProps = {
  project: WorkProject;
  index: number;
};

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  index,
}) => {
  const shots = project.shots ?? [];
  const hasShots = shots.length > 0;

  return (
    <div id={`work-${project.slug}`} className='scroll-mt-28'>
      <div className='container-page'>
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: index * 0.05 }}
          className='card p-6 md:p-10'
        >
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-muted'>
            <span className='font-medium text-ink'>{project.company}</span>
            <EngagementBadges badges={project.badges} />
            <ImpactTags tags={project.impacts} />
            <span aria-hidden>·</span>
            <span>{project.period}</span>
          </div>
          <h3 className='mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl'>
            {project.title}
          </h3>
          <p className='mt-1 text-base text-ink-muted'>{project.scope}</p>
          <p className='mt-4 max-w-3xl text-base leading-relaxed text-ink-muted'>
            <LinkedText>{project.summary}</LinkedText>
          </p>
          <ul className='mt-5 space-y-2.5'>
            {project.highlights.map((h) => (
              <li
                key={h}
                className='relative max-w-3xl pl-5 text-base leading-relaxed text-ink-muted'
              >
                <span className='absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent/60' />
                <LinkedText>{h}</LinkedText>
              </li>
            ))}
          </ul>
          <div className='mt-5 flex flex-wrap gap-2'>
            {project.stack.map((s) => (
              <span key={s} className='chip'>
                {s}
              </span>
            ))}
          </div>
        </motion.article>
      </div>

      {hasShots && (
        <FeaturedThumbnailCarousel project={project} index={index} />
      )}
    </div>
  );
};

type FeaturedThumbnailCarouselProps = {
  project: WorkProject;
  index: number;
};

const FeaturedThumbnailCarousel: React.FC<FeaturedThumbnailCarouselProps> = ({
  project,
  index,
}) => {
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [instantTrack, setInstantTrack] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const shots = project.shots!;
  const shotCount = shots.length;
  /** Middle copy of a 3× buffer — end slides sit to the left at start. */
  const [positionIndex, setPositionIndex] = useState<number>(shotCount);

  const extendedShots = useMemo(() => [...shots, ...shots, ...shots], [shots]);

  const trackOffset = offsetForIndex(positionIndex, viewportWidth);

  const measureViewport = useCallback(() => {
    const width = viewportRef.current?.offsetWidth ?? 0;
    if (width) setViewportWidth(width);
  }, []);

  const normalizePosition = useCallback(() => {
    setPositionIndex((p) => {
      if (p >= shotCount * 2) {
        setInstantTrack(true);
        return shotCount + (p % shotCount);
      }
      if (p < shotCount) {
        setInstantTrack(true);
        return shotCount + p;
      }
      return p;
    });
  }, [shotCount]);

  useEffect(() => {
    if (!instantTrack) return;
    const id = requestAnimationFrame(() => setInstantTrack(false));
    return () => cancelAnimationFrame(id);
  }, [positionIndex, instantTrack]);

  const moveBy = useCallback((delta: number) => {
    setPositionIndex((p) => p + delta);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const wrapped = ((target % shotCount) + shotCount) % shotCount;
      setPositionIndex(shotCount + wrapped);
    },
    [shotCount],
  );

  const goPrev = useCallback(() => moveBy(-1), [moveBy]);
  const goNext = useCallback(() => moveBy(1), [moveBy]);

  useLayoutEffect(() => {
    measureViewport();
  }, [measureViewport, shotCount]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => measureViewport());
    observer.observe(viewport);

    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener('change', measureViewport);

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', measureViewport);
    };
  }, [measureViewport]);

  const openViewer = useCallback(
    (shotIndex: number) => {
      setViewerIndex(shotIndex);
      setPositionIndex(shotCount + shotIndex);
    },
    [shotCount],
  );

  useEffect(() => {
    if (reduceMotion || hovering || viewerIndex !== null) return;

    const id = window.setInterval(() => moveBy(1), AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, hovering, moveBy, viewerIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const arrowClass = `absolute top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line/10 bg-bg/90 text-ink shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-accent/50 ${
    hovering
      ? 'pointer-events-auto opacity-100'
      : 'pointer-events-none opacity-0'
  }`;

  return (
    <>
      {viewerIndex !== null && (
        <ImageViewer
          images={shots}
          index={viewerIndex}
          onIndexChange={(i) => {
            setViewerIndex(i);
            setPositionIndex(shotCount + i);
          }}
          onClose={() => setViewerIndex(null)}
          title={project.company}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className='relative mt-10 w-full'
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className='relative left-1/2 w-screen -translate-x-1/2 py-4 md:py-6'>
          <div
            ref={viewportRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={`relative py-10 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-4 focus-visible:ring-offset-bg md:py-12 ${
              reduceMotion ? 'overflow-x-auto' : 'overflow-visible'
            }`}
            role='region'
            aria-roledescription='carousel'
            aria-label={`${project.company} product screenshots`}
          >
            <button
              type='button'
              onClick={goPrev}
              className={`${arrowClass} left-4 md:left-10`}
              aria-label='Previous screenshot'
              tabIndex={hovering ? 0 : -1}
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <button
              type='button'
              onClick={goNext}
              className={`${arrowClass} right-4 md:right-10`}
              aria-label='Next screenshot'
              tabIndex={hovering ? 0 : -1}
            >
              <ChevronRight className='h-5 w-5' />
            </button>

            <motion.div
              className='flex w-max items-center gap-7'
              animate={{ x: -trackOffset }}
              transition={
                reduceMotion || instantTrack
                  ? { duration: 0 }
                  : { duration: SLIDE_MS, ease: SLIDE_EASE }
              }
              onAnimationComplete={() => {
                if (!reduceMotion) normalizePosition();
              }}
            >
              {extendedShots.map((shot, slideIndex) => {
                const shotIndex = slideIndex % shotCount;
                const distance = Math.abs(slideIndex - positionIndex);
                const isActive = slideIndex === positionIndex;
                const scale = scaleForDistance(distance);

                return (
                  <div
                    key={`${shot.src}-${slideIndex}`}
                    className='flex w-[28rem] shrink-0 items-center justify-center md:w-[29rem]'
                  >
                    <button
                      type='button'
                      onClick={() =>
                        isActive ? openViewer(shotIndex) : goTo(shotIndex)
                      }
                      aria-label={
                        isActive
                          ? `View screenshot ${shotIndex + 1} of ${shotCount} full size`
                          : `Show screenshot ${shotIndex + 1} of ${shotCount}`
                      }
                      aria-current={isActive ? 'true' : undefined}
                      aria-hidden={!isActive && distance > 2}
                      className='cursor-pointer rounded-xl bg-transparent p-0 transition-opacity hover:opacity-95'
                    >
                      <motion.figure
                        className={`overflow-visible rounded-xl shadow-[0_28px_56px_-12px_rgba(0,0,0,0.22)] ${
                          isActive
                            ? 'border border-line/10'
                            : 'border border-transparent'
                        }`}
                        animate={{ scale }}
                        transition={
                          reduceMotion || instantTrack
                            ? { duration: 0 }
                            : { duration: SLIDE_MS, ease: SLIDE_EASE }
                        }
                        style={{ zIndex: isActive ? 20 : 10 - distance }}
                      >
                        <div className='h-[15rem] w-[24rem] overflow-hidden rounded-[11px] md:h-[17rem] md:w-[27rem]'>
                          <img
                            src={shot.src}
                            alt={isActive ? shot.alt : ''}
                            width={432}
                            height={272}
                            draggable={false}
                            className='h-full w-full object-cover object-top'
                            loading={
                              index === 0 &&
                              slideIndex >= shotCount &&
                              slideIndex < shotCount + 3
                                ? 'eager'
                                : 'lazy'
                            }
                          />
                        </div>
                      </motion.figure>
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
