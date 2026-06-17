import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'framer-motion';
import { Expand } from 'lucide-react';
import { useMemo, useState } from 'react';
import { WorkShot } from '../../types';
import { ButtonLink, ButtonVariant } from '../shared';
import ImageViewer from '../shared/ImageViewer';

type WorkPolaroidStackProps = {
  shots: readonly WorkShot[];
  viewerTitle: string;
  projectIndex?: number;
};

const STACK_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
};

const POLAROID_WIDTH_REM = 24;
const STACK_OFFSET_PX = 8;
/** Room below the pile for drop shadows, rotation, and hover fan. */
const STACK_SHADOW_BUFFER_REM = 2.75;

function stackDepthFromTop(index: number, topIndex: number, total: number) {
  return (index - topIndex + total) % total;
}

function polaroidAspect(shot: WorkShot) {
  return shot.variant === 'mobile' ? 9 / 16 : 4 / 3;
}

function polaroidHeightRem(shot: WorkShot, widthRem = POLAROID_WIDTH_REM) {
  const aspect = polaroidAspect(shot);
  return widthRem / aspect;
}

function stackSlotHeightRem(shots: readonly WorkShot[]) {
  return Math.max(...shots.map((shot) => polaroidHeightRem(shot)));
}

function stackContainerHeightRem(slotHeightRem: number, stackDepth: number) {
  const stackOffsetRem = (stackDepth * STACK_OFFSET_PX) / 16;
  return slotHeightRem + stackOffsetRem + STACK_SHADOW_BUFFER_REM;
}

function fanOffsetX(fanOpen: boolean, depthFromTop: number, shotIndex: number) {
  const sway = Math.sin(shotIndex * 1.37);
  if (!fanOpen) return sway * 2.75;

  const fanDirection = shotIndex % 2 === 0 ? -1 : 1;
  return fanDirection * depthFromTop * 14 + sway * 12;
}

function stackPose(
  shotIndex: number,
  depthFromTop: number,
  total: number,
  fanOpen: boolean,
) {
  const isTop = depthFromTop === 0;
  const tilt = Math.cos(shotIndex * 0.91) * 3.5 - 1.5;

  return {
    x: isTop ? 0 : fanOffsetX(fanOpen, depthFromTop, shotIndex),
    y: isTop
      ? 0
      : depthFromTop * (fanOpen ? STACK_OFFSET_PX * 1.75 : STACK_OFFSET_PX),
    rotate: isTop ? tilt * 0.55 : fanOpen ? tilt * 1.15 : tilt,
    scale: isTop ? 1 : 1 - depthFromTop * 0.025,
    zIndex: total - depthFromTop,
  };
}

const DETAIL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const WorkPolaroidStack = ({
  shots,
  viewerTitle,
  projectIndex = 0,
}: WorkPolaroidStackProps) => {
  const reduceMotion = useReducedMotion();
  const [topIndex, setTopIndex] = useState(0);
  const [fanOpen, setFanOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const orderedIndices = useMemo(
    () =>
      shots
        .map((_, index) => index)
        .sort(
          (a, b) =>
            stackDepthFromTop(b, topIndex, shots.length) -
            stackDepthFromTop(a, topIndex, shots.length),
        ),
    [shots, topIndex],
  );

  const activeShot = shots[topIndex];
  const slotHeightRem = stackSlotHeightRem(shots);
  const stackDepth = Math.max(0, shots.length - 1);
  const stackAnchorTop = slotHeightRem / 2;
  const containerHeightRem = stackContainerHeightRem(slotHeightRem, stackDepth);
  const fanEnabled = fanOpen && !reduceMotion;

  const goNext = () => {
    setTopIndex((index) => (index + 1) % shots.length);
  };

  const openViewer = (index: number = topIndex) => {
    setViewerIndex(index);
  };

  const handleStackClick = () => {
    if (shots.length > 1) goNext();
  };

  return (
    <>
      {viewerIndex !== null && (
        <ImageViewer
          images={shots}
          index={viewerIndex}
          onIndexChange={(nextIndex) => {
            setViewerIndex(nextIndex);
            setTopIndex(nextIndex);
          }}
          onClose={() => setViewerIndex(null)}
          title={viewerTitle}
        />
      )}

      <div className='grid gap-10 md:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] md:items-start md:gap-10 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-14'>
        <div className='flex min-w-0 justify-end overflow-visible'>
          <div
            className='relative w-full max-w-[24rem] cursor-pointer overflow-visible px-10 pb-4 sm:max-w-[26rem]'
            style={{ height: `${containerHeightRem}rem` }}
            role='button'
            tabIndex={0}
            onClick={handleStackClick}
            onMouseEnter={() => setFanOpen(true)}
            onMouseLeave={() => setFanOpen(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleStackClick();
              }
            }}
            aria-label={
              shots.length > 1
                ? `Screenshot stack, showing ${activeShot.alt}. Activate to show next.`
                : `Screenshot: ${activeShot.alt}`
            }
          >
            {orderedIndices.map((shotIndex) => {
              const shot = shots[shotIndex];
              const depthFromTop = stackDepthFromTop(
                shotIndex,
                topIndex,
                shots.length,
              );
              const isTop = depthFromTop === 0;
              const pose = stackPose(
                shotIndex,
                depthFromTop,
                shots.length,
                fanEnabled,
              );

              return (
                <motion.div
                  key={shot.src}
                  aria-hidden
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${pose.x}px)`,
                    y: `calc(-50% + ${pose.y}px)`,
                    rotate: pose.rotate,
                    scale: pose.scale,
                  }}
                  transition={reduceMotion ? { duration: 0 } : STACK_TRANSITION}
                  className='polaroid-frame pointer-events-none absolute left-1/2 w-[min(100%,24rem)] text-left sm:w-[min(100%,26rem)]'
                  style={{
                    top: `${stackAnchorTop}rem`,
                    zIndex: pose.zIndex,
                  }}
                >
                  <div
                    className='overflow-hidden bg-bg-card'
                    style={{ aspectRatio: polaroidAspect(shot) }}
                  >
                    <img
                      src={shot.src}
                      alt=''
                      width={shot.variant === 'mobile' ? 390 : 1280}
                      height={shot.variant === 'mobile' ? 844 : 800}
                      draggable={false}
                      className='h-full w-full object-contain'
                      loading={
                        projectIndex === 0 && shotIndex < 2 ? 'eager' : 'lazy'
                      }
                    />
                  </div>
                  {isTop && (
                    <ButtonLink
                      unstyled
                      iconOnly
                      onClick={(event) => {
                        event.stopPropagation();
                        openViewer(shotIndex);
                      }}
                      ariaLabel={`View full size: ${shot.alt}`}
                      className='pointer-events-auto absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border border-line/10 bg-bg/90 text-ink-muted shadow-sm backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent'
                    >
                      <Expand className='h-4 w-4' aria-hidden />
                    </ButtonLink>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          key={topIndex}
          variants={reduceMotion ? undefined : DETAIL_VARIANTS}
          initial={reduceMotion ? false : 'hidden'}
          animate='show'
          className='min-w-0 md:pl-8 md:pt-2 lg:pl-12'
        >
          <p className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>
            {String(topIndex + 1).padStart(2, '0')} /{' '}
            {String(shots.length).padStart(2, '0')}
          </p>
          <h4 className='mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl'>
            {activeShot.alt}
          </h4>
          {activeShot.caption && (
            <p className='mt-3 text-base leading-relaxed text-ink-muted'>
              {activeShot.caption}
            </p>
          )}
          <ButtonLink
            variant={ButtonVariant.Secondary}
            onClick={() => openViewer(topIndex)}
            className='mt-5'
          >
            <Expand className='h-4 w-4' aria-hidden />
            View full size
          </ButtonLink>
        </motion.div>
      </div>
    </>
  );
};

export default WorkPolaroidStack;
