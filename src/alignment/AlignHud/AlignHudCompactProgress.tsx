import { motion } from 'framer-motion';
import { AlignHorizontalJustifyCenter, ChevronUp } from 'lucide-react';
import AlignHudCompactActions from './AlignHudCompactActions';
import {
  COMPACT_HUD_ROW_CLASS,
  COMPACT_MOTION_PROPS,
  EXPAND_HINT_LABEL,
} from './alignHud.const';
import { minimizedStatusLabel } from './alignHud.util';

type AlignHudCompactProgressProps = {
  canSweep: boolean;
  onFindCrooked: () => void;
  onShowHint: () => void;
  onSweep: () => void;
  progress: number;
  reduceMotion: boolean | null;
  remaining: number;
  sweeping: boolean;
};

const AlignHudCompactProgress = ({
  canSweep,
  onFindCrooked,
  onShowHint,
  onSweep,
  progress,
  reduceMotion,
  remaining,
  sweeping,
}: AlignHudCompactProgressProps) => (
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
        onFindCrooked={onFindCrooked}
        onSweep={onSweep}
        sweeping={sweeping}
      />
    </div>
  </motion.div>
);

export default AlignHudCompactProgress;
