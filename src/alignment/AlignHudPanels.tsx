import { motion } from 'framer-motion';
import {
  AlignHorizontalJustifyCenter,
  BrushCleaning,
  ChevronUp,
  RotateCcw,
  ScanSearch,
  X,
} from 'lucide-react';
import {
  ButtonGroup,
  IconButton,
  IconButtonSize,
  TextButton,
  TextButtonSize,
  TextButtonVariant,
} from '../components/shared';
import { cn } from '../utils';

export const FIND_CROOKED_LABEL = 'Find crooked';
export const EXPAND_HINT_LABEL = 'Show instructions';
export const COMPACT_HUD_ROW_CLASS = 'flex min-h-14 items-center gap-2 p-2';

export const COMPACT_MOTION_PROPS = {
  className:
    'pointer-events-auto w-fit max-w-[calc(100vw-2rem)] rounded-2xl border border-line/10 bg-bg/95 shadow-card backdrop-blur-md',
} as const;

export function formatAlignProgress(
  cardAligned: number,
  cardTotal: number,
  chipGroupAligned: number,
  chipGroupTotal: number,
): string {
  const cards = `${cardAligned}/${cardTotal} cards`;
  if (chipGroupTotal === 0) return cards;
  return `${cards} · ${chipGroupAligned}/${chipGroupTotal} chip groups`;
}

export function minimizedStatusLabel(remaining: number): string {
  if (remaining === 1) return '1 thing still crooked';
  return `${remaining} still crooked`;
}

type AlignHudHintCardProps = {
  reduceMotion: boolean | null;
  progress: number;
  progressLabel: string;
  remaining: number;
  canSweep: boolean;
  sweeping: boolean;
  onFindCrooked: () => void;
  onSweep: () => void;
  onDismiss: () => void;
};

export function AlignHudHintCard({
  reduceMotion,
  progress,
  progressLabel,
  remaining,
  canSweep,
  sweeping,
  onFindCrooked,
  onSweep,
  onDismiss,
}: AlignHudHintCardProps) {
  return (
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
            Drag cards into place and hover skill chips to straighten them.
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
          <ButtonGroup className='mt-3' equalWidth={canSweep}>
            <TextButton
              variant={TextButtonVariant.Ghost}
              size={TextButtonSize.Sm}
              onClick={onFindCrooked}
              icon={<ScanSearch aria-hidden />}
              className={canSweep ? 'w-full' : undefined}
            >
              {FIND_CROOKED_LABEL}
            </TextButton>
            {canSweep && (
              <TextButton
                variant={TextButtonVariant.Accent}
                size={TextButtonSize.Sm}
                onClick={onSweep}
                disabled={sweeping}
                icon={
                  <BrushCleaning
                    aria-hidden
                    className={cn('text-accent', sweeping && 'broom-sweeping')}
                  />
                }
                className='w-full'
              >
                <span className='truncate'>Sweep all</span>
                <span className='shrink-0 font-mono text-xs text-ink-muted'>
                  ({remaining})
                </span>
              </TextButton>
            )}
          </ButtonGroup>
        </div>
        <IconButton
          icon={<X aria-hidden />}
          label='Minimize'
          size={IconButtonSize.Sm}
          onClick={onDismiss}
          tooltipPlacement='top'
          className='shrink-0'
        />
      </div>
    </motion.div>
  );
}

type AlignHudCompactActionsProps = {
  canSweep: boolean;
  sweeping: boolean;
  onFindCrooked: () => void;
  onSweep: () => void;
};

function AlignHudCompactActions({
  canSweep,
  sweeping,
  onFindCrooked,
  onSweep,
}: AlignHudCompactActionsProps) {
  return (
    <ButtonGroup className='shrink-0 border-l border-line/10 pl-2'>
      <IconButton
        icon={<ScanSearch aria-hidden />}
        label={FIND_CROOKED_LABEL}
        size={IconButtonSize.Sm}
        onClick={onFindCrooked}
        tooltipPlacement='top'
      />
      {canSweep && (
        <IconButton
          icon={
            <BrushCleaning
              aria-hidden
              className={cn(sweeping && 'broom-sweeping')}
            />
          }
          label='Sweep all into place'
          size={IconButtonSize.Sm}
          onClick={onSweep}
          disabled={sweeping}
          variant={TextButtonVariant.Accent}
          tooltipPlacement='top'
        />
      )}
    </ButtonGroup>
  );
}

type AlignHudCompactProgressProps = {
  reduceMotion: boolean | null;
  remaining: number;
  progress: number;
  canSweep: boolean;
  sweeping: boolean;
  onShowHint: () => void;
  onFindCrooked: () => void;
  onSweep: () => void;
};

export function AlignHudCompactProgress({
  reduceMotion,
  remaining,
  progress,
  canSweep,
  sweeping,
  onShowHint,
  onFindCrooked,
  onSweep,
}: AlignHudCompactProgressProps) {
  return (
    <motion.div
      key='progress'
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
      {...COMPACT_MOTION_PROPS}
    >
      <div className={COMPACT_HUD_ROW_CLASS}>
        <button
          type='button'
          onClick={onShowHint}
          className='flex min-h-10 items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-line/[0.04]'
          aria-label={EXPAND_HINT_LABEL}
        >
          <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent'>
            <AlignHorizontalJustifyCenter className='h-3.5 w-3.5' aria-hidden />
          </span>
          <span className='min-w-[9rem]'>
            <span className='block text-sm font-medium text-ink'>
              {minimizedStatusLabel(remaining)}
            </span>
            <span className='mt-1.5 block h-1 overflow-hidden rounded-full bg-line/10'>
              <motion.span
                className='block h-full rounded-full bg-accent'
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </span>
          </span>
          <ChevronUp
            className='h-3.5 w-3.5 shrink-0 text-ink-faint'
            aria-hidden
          />
        </button>
        <AlignHudCompactActions
          canSweep={canSweep}
          sweeping={sweeping}
          onFindCrooked={onFindCrooked}
          onSweep={onSweep}
        />
      </div>
    </motion.div>
  );
}

type AlignHudCompactCompleteProps = {
  reduceMotion: boolean | null;
  onScrambleAgain: () => void;
};

export function AlignHudCompactComplete({
  reduceMotion,
  onScrambleAgain,
}: AlignHudCompactCompleteProps) {
  return (
    <motion.div
      key='progress'
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
      {...COMPACT_MOTION_PROPS}
    >
      <div className={COMPACT_HUD_ROW_CLASS}>
        <div className='flex min-h-10 items-center gap-2.5 px-2 py-1.5'>
          <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent'>
            <AlignHorizontalJustifyCenter className='h-3.5 w-3.5' aria-hidden />
          </span>
          <p className='whitespace-nowrap text-sm font-medium text-ink'>
            Everything&apos;s in place. Nice eye.
          </p>
        </div>
        <ButtonGroup className='shrink-0 border-l border-line/10 pl-2'>
          <TextButton
            variant={TextButtonVariant.Ghost}
            size={TextButtonSize.Sm}
            onClick={onScrambleAgain}
            icon={<RotateCcw aria-hidden />}
          >
            Scramble again
          </TextButton>
        </ButtonGroup>
      </div>
    </motion.div>
  );
}
