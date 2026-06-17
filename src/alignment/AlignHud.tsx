import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlignHorizontalJustifyCenter,
  BrushCleaning,
  RotateCcw,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ButtonLink, ButtonVariant, Tooltip } from '../components/shared';
import { cn } from '../utils';
import { useAlignment } from './AlignmentContext';

const SWEEP_MS = 650;

const sweepTooltip = (remaining: number) =>
  `Sweep all into place (${remaining} left)`;

const MINIMIZE_BUTTON_CLASS =
  'rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-line/5 hover:text-ink';

function formatAlignProgress(
  cardAligned: number,
  cardTotal: number,
  chipGroupAligned: number,
  chipGroupTotal: number,
): string {
  const cards = `${cardAligned}/${cardTotal} cards`;
  if (chipGroupTotal === 0) return cards;
  return `${cards} · ${chipGroupAligned}/${chipGroupTotal} chip groups`;
}

const AlignHud = () => {
  const reduceMotion = useReducedMotion();
  const {
    isGameEnabled,
    total,
    alignedCount,
    cardTotal,
    cardAligned,
    chipGroupTotal,
    chipGroupAligned,
    isComplete,
    hintDismissed,
    dismissHint,
    resetGame,
    alignAll,
  } = useAlignment();
  const [sweeping, setSweeping] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [hideHud, setHideHud] = useState(false);

  const remaining = total - alignedCount;
  const canSweep = isGameEnabled && total > 0 && !isComplete;

  const sweep = useCallback(() => {
    if (sweeping || !canSweep) return;

    setSweeping(true);
    alignAll();
    document.documentElement.classList.add('align-sweep-active');
    window.setTimeout(() => {
      document.documentElement.classList.remove('align-sweep-active');
      setSweeping(false);
    }, SWEEP_MS);
  }, [alignAll, canSweep, sweeping]);

  const progress = total > 0 ? alignedCount / total : 0;
  const progressLabel = formatAlignProgress(
    cardAligned,
    cardTotal,
    chipGroupAligned,
    chipGroupTotal,
  );
  const showHint = !hintDismissed && total > 0 && !isComplete;

  useEffect(() => {
    if (!isComplete) {
      setCelebrated(false);
      setHideHud(false);
      return;
    }

    if (celebrated) return;
    setCelebrated(true);
    const timer = window.setTimeout(() => setHideHud(true), 4500);
    return () => window.clearTimeout(timer);
  }, [isComplete, celebrated]);

  if (!isGameEnabled || total === 0 || hideHud) return null;

  return (
    <div className='pointer-events-none fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 md:bottom-6'>
      <AnimatePresence mode='wait'>
        {showHint ? (
          <motion.div
            key='hint'
            initial={reduceMotion ? false : { opacity: 0, y: 16, x: -12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className='pointer-events-auto w-full max-w-md rounded-2xl border border-line/10 bg-bg/95 p-4 shadow-card backdrop-blur-md'
          >
            <div className='flex items-start gap-3'>
              <span className='mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent'>
                <AlignHorizontalJustifyCenter className='h-4 w-4' aria-hidden />
              </span>
              <div className='min-w-0 flex-1'>
                <p className='text-sm font-semibold text-ink'>
                  Something's crooked on purpose.
                </p>
                <p className='mt-1 text-sm leading-relaxed text-ink-muted'>
                  Drag cards into place and hover skill chips to straighten
                  them.
                </p>
                <div className='mt-3 h-1.5 overflow-hidden rounded-full bg-line/10'>
                  <motion.div
                    className='h-full rounded-full bg-accent'
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
                <p className='mt-2 font-mono text-xs text-ink-faint'>
                  {progressLabel}
                </p>
                {canSweep && (
                  <ButtonLink
                    variant={ButtonVariant.Accent}
                    onClick={sweep}
                    disabled={sweeping}
                    className='mt-3'
                  >
                    <BrushCleaning
                      className={cn(
                        'h-4 w-4 text-accent',
                        sweeping && 'broom-sweeping',
                      )}
                      aria-hidden
                    />
                    Sweep all into place
                    <span className='font-mono text-xs text-ink-muted'>
                      ({remaining} left)
                    </span>
                  </ButtonLink>
                )}
              </div>
              <Tooltip label='Minimize' placement='top' className='shrink-0'>
                <ButtonLink
                  unstyled
                  iconOnly
                  onClick={dismissHint}
                  ariaLabel='Minimize'
                  className={MINIMIZE_BUTTON_CLASS}
                >
                  <X className='h-4 w-4' />
                </ButtonLink>
              </Tooltip>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='progress'
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
            className='pointer-events-auto inline-flex items-center gap-3 rounded-full border border-line/10 bg-bg/95 px-4 py-2.5 shadow-card backdrop-blur-md'
          >
            {isComplete ? (
              <>
                <span className='text-sm font-medium text-ink'>
                  Everything&apos;s in place. Nice eye.
                </span>
                <ButtonLink
                  variant={ButtonVariant.Ghost}
                  onClick={resetGame}
                  className='!h-8 !px-3 !py-0 text-xs'
                >
                  <RotateCcw className='h-3.5 w-3.5' aria-hidden />
                  Scramble again
                </ButtonLink>
              </>
            ) : (
              <>
                <AlignHorizontalJustifyCenter
                  className='h-4 w-4 shrink-0 text-accent'
                  aria-hidden
                />
                <span className='text-sm text-ink-muted'>
                  <span className='font-medium text-ink'>Align</span>
                  <span className='mx-1.5 text-ink-faint' aria-hidden>
                    ·
                  </span>
                  <span className='font-mono text-xs'>{progressLabel}</span>
                </span>
                <div className='h-1.5 w-24 overflow-hidden rounded-full bg-line/10'>
                  <motion.div
                    className='h-full rounded-full bg-accent'
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
                {canSweep && (
                  <Tooltip
                    label={sweepTooltip(remaining)}
                    placement='top'
                    className='inline-flex'
                  >
                    <ButtonLink
                      variant={ButtonVariant.Accent}
                      iconOnly
                      onClick={sweep}
                      disabled={sweeping}
                      ariaLabel={sweepTooltip(remaining)}
                    >
                      <BrushCleaning
                        className={cn('h-4 w-4', sweeping && 'broom-sweeping')}
                        aria-hidden
                      />
                    </ButtonLink>
                  </Tooltip>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlignHud;
